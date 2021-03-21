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
from django.urls import path, include
from IssueTrackerApp import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'issues', views.IssueViewSet)

urlpatterns = [
    #path('', include(router.urls)),
    path('issues/', views.IssueList.as_view(), name='issues'),
    path('issues/<int:pk>', views.IssueDetail.as_view(), name='issue'),
    path("users/", views.UserList.as_view(), name="users"),
    path("users/<int:pk>", views.UserDetail.as_view(), name="user"),
    path('users/<int:pk>', views.UserDetail.as_view(), name='project'),
    path("projects/", views.ProjectList.as_view(), name="projects"),
    path('projects/<int:pk>', views.ProjectDetail.as_view(), name='project'),
    path("comments/", views.CommentList.as_view(), name="comments"),
    path('comments/<int:pk>', views.CommentDetail.as_view(), name='comment'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    

]
