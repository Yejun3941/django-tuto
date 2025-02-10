from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="author.username")
    # author의 username 필드를 author_username으로 변경

    class Meta: 
        model = Post
        fields = ['id', 'author', 'author_username', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at']

        