"""IssueTracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from IssueTrackerApp import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'issues', views.IssueViewSet)

urlpatterns = [
    #path('', include(router.urls)),
    path('issues/', views.IssueList.as_view(), name='issues'),
    path('issues/<int:pk>/', views.IssueDetail.as_view(), name='issue'),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/<int:pk>/", views.UserDetail.as_view(), name='user'),
    path("projects/", views.ProjectList.as_view(), name='projects'),
    path('projects/<int:pk>/', views.ProjectDetail.as_view(), name='project'),
    path("comments/", views.CommentList.as_view(), name='comments'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment'),
    path('labels/', views.LabelList.as_view(), name='labels'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('auth_token/', views.CustomAuthToken.as_view(), name="auth_token"),
    
    path('login/', obtain_auth_token, name='login'),
    path('register/', views.Register.as_view(), name='register'),
    path('profile/<slug:username>/', views.Profile.as_view(), name='profile'),
    path('newissuedata/<int:pk>/', views.NewIssueView.as_view(), name='new_issue_data'),

]
