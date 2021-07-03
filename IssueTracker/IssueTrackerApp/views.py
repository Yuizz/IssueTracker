from django.http.response import Http404
from .models import Comment, Project, User, Issue, UserProject, Assignee, Label
from .serializers import ProfileSerializer, RegisterSerializer, IssueSerializer, \
    UserSerializer, ProjectSerializer, CommentSerializer, LabelSerializer
from .utils import standard_response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status, permissions

class Register(APIView):
    """
    Post to a register, validation, and token return
    """
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            res = standard_response(data={'token':token.key})
            return Response(res, status=status.HTTP_201_CREATED)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
    
class Profile(APIView):
    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None
        
    def get(self, request, username, format=None):
        user = self.get_object(username=username)
        
        if not user:
            res = standard_response(
                errors={'error':'The user does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileSerializer(user, context = {'request':request})
        if(request.user == user):
            res = standard_response(data = serializer.data, links={'canEdit' : True})
            return Response(res)
        
        res = standard_response(data=serializer.data, links={'canEdit' : False})
        return Response(res)
class LabelList(APIView):
    """
    List all labels
    """
    def get(self, request, format=None):
        labels = Label.objects.all()
        serializer = LabelSerializer(labels, many=True, context={'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)

class NewIssueView(APIView):
    """
    Return required values to POST a new issue
    """
    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        if not project:
            res = standard_response(
                errors={'error': 'The project does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        labels = Label.objects.all()
        users = project.users.all()

        labelsSerializer = LabelSerializer(labels, many=True, context={'request': request})
        usersSerializer = UserSerializer(users, many=True, context={'request': request})

        res = standard_response(data={
            "labels": labelsSerializer.data,
            "users": usersSerializer.data
        })

        return Response(res)


class UserList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True, context = {'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status.HTTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        if not user:
            res = standard_response(
                errors={'error':'The user does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, context = {'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        if not user:
            res = standard_response(
                errors={'error':'The user does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            res = standard_response(data=serializer.data)
            return Response(res)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        if not user:
            res = standard_response(
                errors={'error':'The user does not exist'}
            )
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        user.delete()
        return Response(standard_response(), status=status.HTTP_204_NO_CONTENT)

class ProjectList(APIView):
    """
    List all projects, or create a new project.
    """
    def get(self, request, format=None):
        user = request.user
        projects = user.projects.all()
        serializer = ProjectSerializer(projects, many=True, context = {'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            UserProject.objects.create(user=request.user, project=serializer.save())
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetail(APIView):
    """
    Retrieve, update or delete a project instance.
    """
    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        if not project:
            res = standard_response(
                errors={'error':'The project does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProjectSerializer(project, context = {'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)
    
    def put(self, request, pk, format=None):
        project = self.get_object(pk)
        if not project:
            res = standard_response(
                errors={'error':'The project does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProjectSerializer(project, data=request.data, context={'request':request})
        user = request.user
        can_modify_project = user.projects.filter(id=project.id).count() > 0
        if serializer.is_valid() and can_modify_project:
            serializer.save()
            res = standard_response(data=serializer.data)
            return Response(res)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        project = self.get_object(pk)
        if not project:
            res = standard_response(
                errors={'error':'The project does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        can_delete_project = user.projects.filter(id=project.id).count() > 0
        if can_delete_project:
            project.delete()
            return Response(standard_response(), status=status.HTTP_204_NO_CONTENT)
        
        return Response(standard_response(), status=status.HTTP_400_BAD_REQUEST)

class IssueList(APIView):
    """
    List all issues, or create a new issue.
    """
    def get_label(self, label_id):
        try:
            return Label.objects.get(pk=label_id)
        except Label.DoesNotExist:
            return None


    def get(self, request, format=None):
        user = request.user
        issues = user.issues.all()[:3]
        serializer = IssueSerializer(issues, many=True, context={'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)

    def post(self, request, format=None):
        serializer = IssueSerializer(data=request.data, context={'request':request})

        label = self.get_label(request.data['label_id'])
        assignees = request.data['assignees']

        if serializer.is_valid():
            issue = serializer.save(author=request.user, label=label)

            for id in assignees:
                assignee = User.objects.get(pk=id)
                is_in_project = assignee.projects.filter(id=issue.project.id).count() > 0
                if is_in_project:
                    Assignee.objects.create(issue=issue, assignee=assignee)

            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
    
class IssueDetail(APIView):
    """
    Retrieve, update or delete a issue instance.
    """
    def get_object(self, pk):
        try:
            return Issue.objects.get(pk=pk)
        except Issue.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        issue = self.get_object(pk)
        if not issue:
            res = standard_response(
                errors={'error':'The issue does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)

        serializer = IssueSerializer(issue, context={'request':request})

        res = standard_response(data=serializer.data)
        return Response(res)
        
        # return Response(standard_response(), status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        issue = self.get_object(pk)
        if not issue:
            res = standard_response(
                errors={'error':'The issue does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        serializer = IssueSerializer(issue, data=request.data)
        can_modify_issue = user.issues.filter(id=issue.id).count() > 0
        if serializer.is_valid() and can_modify_issue:
            serializer.save()
            res = standard_response(data=serializer.data)
            return Response(res)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        issue = self.get_object(pk)
        if not issue:
            res = standard_response(
                errors={'error':'The issue does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
            
        user = request.user
        can_delete_issue = user.issues.filter(id=issue.id).count() > 0
        if can_delete_issue:
            issue.delete()
            return Response(standard_response(), status=status.HTTP_204_NO_CONTENT)
        
        return Response(standard_response(), status=status.HTTP_400_BAD_REQUEST)

class CommentList(APIView):
    """
    List all comments, or create a new comment.
    """
    def get(self, request, format=None):
        user = request.user
        comments = user.comments.all()
        serializer = CommentSerializer(comments, many=True, context = {'request':request})
        res = standard_response(data=serializer.data)
        return Response(res)

    def post(self, request, format=None):
        serializer = CommentSerializer(data=request.data)
        issue = Issue.objects.get(id=serializer.initial_data['issue'])
        can_view_issue = request.user.projects.filter(id=issue.project.id).count() > 0
        if serializer.is_valid() and can_view_issue:
            serializer.save(user=request.user)
            res = standard_response(data=serializer.data)
            return Response(res, status=status.HTTP_201_CREATED)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)
    
class CommentDetail(APIView):
    """
    Retrieve, update or delete a comment instance.
    """
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        comment = self.get_object(pk)
        if not comment:
            res = standard_response(
                errors={'error':'The comment does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        serializer = CommentSerializer(comment)
        can_view_comment = user.comments.filter(id=comment.id).count() > 0
        if can_view_comment:
            res = standard_response(data=serializer.data)
            return Response(res)
        
        return Response(standard_response(), status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        comment = self.get_object(pk)
        if not comment:
            res = standard_response(
                errors={'error':'The comment does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        serializer = CommentSerializer(comment, data=request.data)
        can_modify_comment = user.comments.filter(id=comment.id).count() > 0
        if serializer.is_valid() and can_modify_comment:
            serializer.save()
            res = standard_response(data=serializer.data)
            return Response(res)
        
        res = standard_response(errors=serializer.errors)
        return Response(res, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment = self.get_object(pk)
        if not comment:
            res = standard_response(
                errors={'error':'The comment does not exist'})
            return Response(res, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        can_delete_comment = user.comments.filter(id=comment.id).count() > 0
        if can_delete_comment:
            comment.delete()
            return Response(standard_response(), status=status.HTTP_204_NO_CONTENT)
        return Response(standard_response(), status=status.HTTP_400_BAD_REQUEST)
