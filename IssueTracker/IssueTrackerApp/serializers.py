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
    class Meta:
        model = Project
        fields = ['id', 'name', 'status', 'created_at', 'updated_at']
        
class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user__name','issue__name', 'created_at', 'updated_at']
        
