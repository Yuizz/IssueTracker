from django.http.response import Http404
from .models import Comment, Project, User, Issue
from .serializers import IssueSerializer, UserSerializer, ProjectSerializer, CommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class UserList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True, context = {'request':request})
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, context = {'request':request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProjectList(APIView):
    """
    List all projects, or create a new project.
    """
    def get(self, request, format=None):
        user = request.user
        projects = user.projects.all()
        serializer = ProjectSerializer(projects, many=True, context = {'request':request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetail(APIView):
    """
    Retrieve, update or delete a project instance.
    """
    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        project = self.get_object(pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IssueList(APIView):
    """
    List all issues, or create a new issue.
    """
    def get(self, request, format=None):
        user = request.user
        issues = user.issues.all()
        serializer = IssueSerializer(issues, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class IssueDetail(APIView):
    """
    Retrieve, update or delete a issue instance.
    """
    def get_object(self, pk):
        try:
            return Issue.objects.get(pk=pk)
        except Issue.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        issue = self.get_object(pk)
        serializer = IssueSerializer(issue)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        issue = self.get_object(pk)
        serializer = IssueSerializer(issue, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        issue = self.get_object(pk)
        issue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentList(APIView):
    """
    List all comments, or create a new comment.
    """
    def get(self, request, format=None):
        user = request.user
        comments = user.comments.all()
        serializer = CommentSerializer(comments, many=True, context = {'request':request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CommentSerializer(data=request.data)
        issue = Issue.objects.get(id=serializer.initial_data['issue'])
        can_view_issue = request.user.projects.filter(id=issue.project.id).count() > 0
        if serializer.is_valid() and can_view_issue:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentDetail(APIView):
    """
    Retrieve, update or delete a comment instance.
    """
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment = self.get_object(pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
