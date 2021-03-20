from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE, SET_NULL
from django.db.models.fields import BooleanField, CharField, DateTimeField, PositiveSmallIntegerField
from django.db.models.fields.related import ForeignKey, ManyToManyField

# Create your models here.

class User(AbstractUser):
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
class Project(models.Model):
    name = CharField(max_length=20)
    status = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    users = ManyToManyField(User, through='UserProject', related_name='projects')
    
    def __str__(self):
        return self.name
    
    
class Label(models.Model):
    name = CharField(max_length=20, blank=False)
    description = CharField(max_length=300)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    

class Issue(models.Model):
    class Status(models.IntegerChoices):
        OPEN = 1, 'Open'
        CLOSED = 2, 'Closed'
        MERGED = 3, 'Merged'
    
    author = ForeignKey(User, on_delete=SET_NULL, null=True)
    project =  ForeignKey(Project, on_delete=CASCADE)
    title = CharField(max_length=50, blank=False)
    description = CharField(max_length=300)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    status = PositiveSmallIntegerField(default=Status.OPEN, choices=Status.choices)
    label = ForeignKey(Label, on_delete=SET_NULL, null=True)
    
    assignees = ManyToManyField(User, through='Assignee', related_name='issues')

    def __str__(self):
        return self.title
        
class Comment(models.Model):
    user = ForeignKey(User, on_delete=CASCADE)
    issue = ForeignKey(Issue, on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.email} - {self.issue.title}'
    
class Assignee(models.Model):
    issue = ForeignKey(Issue, on_delete=CASCADE)
    assignee = ForeignKey(User, on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.assignee.email} - {self.issue.title}'
    
    
class UserProject(models.Model):
    project = ForeignKey(Project, on_delete=CASCADE)
    user = ForeignKey(User, on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
        
    def __str__(self):
        return f'{self.user.email} - {self.project.name}'