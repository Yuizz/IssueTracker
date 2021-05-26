from django.db.models import fields
from .models import User, Issue, Project, Comment
from rest_framework import serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    projects = serializers.HyperlinkedRelatedField(many=True, view_name= 'project', read_only=True)
    
    class Meta:
        model = User
        fields = ['id','username', 'email', 'first_name', 'last_name', 'projects']
        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'username':{'write_only':True},
            'password':{'write_only':True}
            }
    
class IssueSerializer(serializers.HyperlinkedModelSerializer, DynamicFieldsModelSerializer):
    author = UserSerializer(read_only=True)
    # author = serializers.ReadOnlyField(source='author.username')
    label = serializers.ReadOnlyField(source='label.name')
    # label = serializers.HyperlinkedRelatedField(many=True, view_name=)
    
    class Meta:
        model = Issue
        fields = ['url','id','title', 'description', 'author','label', 'status', 'created_at', 'updated_at']
        extra_kwargs = {'url':{'view_name':'issue'}}
        
class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    # issues = serializers.HyperlinkedRelatedField(view_name = 'issue',many=True, read_only=True)
    issues = IssueSerializer(read_only=True, many=True, fields=('url','id','title', 'label','updated_at', 'status'))
    
    class Meta:
        model = Project
        fields = ['url', 'id', 'name', 'status','issues', 'created_at', 'updated_at', 'users']
        extra_kwargs = {'url':{'view_name':'project'}}
        
    def to_representation(self, instance):
        self.fields['users'] = ProjectSerializer(write_only=True)
        return super(ProjectSerializer, self).to_representation(instance)
        
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    issue_title = serializers.ReadOnlyField(source='issue.title')
    
    class Meta:
        model = Comment
        fields = ['id','username','issue_title','issue','content','created_at', 'updated_at']
    
    def to_representation(self, instance):
        self.fields['issue'] = IssueSerializer(write_only=True)
        return super(CommentSerializer, self).to_representation(instance)    
    
class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    projects = ProjectSerializer(read_only=True, many=True)
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name','username', 'email', 'updated_at', 'projects']
