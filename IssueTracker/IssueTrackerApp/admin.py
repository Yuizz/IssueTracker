from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Issue, Project, Label, Assignee, UserProject
# Register your models here.
class AssigneeInline(admin.TabularInline):
    model = Assignee
    extra = 1
    
class UserProjectInline(admin.TabularInline):
    model = UserProject
    extra = 1
    
class IssueAdmin(admin.ModelAdmin):
    inlines = ( AssigneeInline,)
    list_display = ('id', 'title', 'status', 'label', 'project')

class ProjectAdmin(admin.ModelAdmin):
    inlines = ( UserProjectInline, )
    list_display = ('id', 'name', 'status')

class LabelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

    

admin.site.register(User, UserAdmin)
admin.site.register(Issue, IssueAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Label, LabelAdmin)
