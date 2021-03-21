from .models import User, Issue, Project, Comment
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'first_name', 'last_name']
        
class IssueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Issue
        fields = ['id','title', 'status', 'created_at', 'updated_at']
        
class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = serializers.HyperlinkedRelatedField(many=True, view_name = 'user', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'status','users', 'created_at', 'updated_at']
        
class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    issue = serializers.ReadOnlyField(source='issue.title')
    
    class Meta:
        model = Comment
        fields = ['id','user','issue', 'created_at', 'updated_at']
        
