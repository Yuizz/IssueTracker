from django.db.models import fields
from .models import User, Issue, Project, Comment
from rest_framework import serializers


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
    
class IssueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Issue
        fields = ['id','title', 'status', 'created_at', 'updated_at']
        
class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = serializers.HyperlinkedRelatedField(many=True, view_name = 'user', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'status','users', 'created_at', 'updated_at']
        
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    issue_title = serializers.ReadOnlyField(source='issue.title')
    
    class Meta:
        model = Comment
        fields = ['id','username','issue_title','issue','content','created_at', 'updated_at']
    
    def to_representation(self, instance):
        self.fields['issue'] = IssueSerializer(write_only=True)
        return super(CommentSerializer, self).to_representation(instance)    
