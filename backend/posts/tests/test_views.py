from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from posts.models import Post

User = get_user_model()


class PostAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="1234abcd")
        self.client.login(username="testuser", password="1234abcd")  # 세션 로그인 방식
        self.token_url = reverse(
            "token_obtain_pair"
        )  # "token_obtain_pair"는 DRF JWT에서 제공하는 토큰 발급 URL
        # 또는 JWT로 로그인 후 토큰을 헤더에 세팅하는 방법도 가능

        # Obtain JWT token
        response = self.client.post(
            self.token_url,
            {"username": "testuser", "password": "1234abcd"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data["access"]

    def test_create_post(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        url = reverse("post-list")  # posts/urls.py에서 router로 등록한 basename이 'post'
        data = {"title": "Test Title", "content": "Test Content"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.first().title, "Test Title")

    def test_list_posts(self):
        Post.objects.create(author=self.user, title="Post 1", content="Content 1")
        Post.objects.create(author=self.user, title="Post 2", content="Content 2")

        url = reverse("post-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
