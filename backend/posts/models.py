from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, # settings.py에 AUTH_USER_MODEL 호출
        on_delete=models.CASCADE,
        related_name="posts",
    )
    title = models.CharField(max_length=150,verbose_name="제목")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return {"title",self.title,"author",self.author.username}
    
    