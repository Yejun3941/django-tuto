from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # AbstractUser is a built-in Django model that we can extend to add more fields
    # default fields: username, first_name, last_name, email, password
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    # If want to use email alternative to username, email field should be unique

    def __str__(self):
        return self.username
