from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import *

urlpatterns=[
    path('issues/', IssueList.as_view(), name='issues'),
    path('issues/<int:pk>/', IssueDetail.as_view(), name='issue'),
    path("users/", UserList.as_view(), name="users"),
    path("users/<int:pk>/", UserDetail.as_view(), name='user'),
    path("projects/", ProjectList.as_view(), name='projects'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project'),
    path("comments/", CommentList.as_view(), name='comments'),
    path('comments/<int:pk>/', CommentDetail.as_view(), name='comment'),
    path('labels/', LabelList.as_view(), name='labels'),

    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('profile/<slug:username>/', Profile.as_view(), name='profile'),
    path('newissuedata/<int:pk>/', NewIssueView.as_view(), name='new_issue_data'),
]
