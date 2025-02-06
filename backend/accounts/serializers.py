from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'phone_number', 'password']

    def create(self, validated_data):
        # User 인스턴스 생성 시 비밀번호 해싱 필요
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # 비밀번호 해싱
        user.save()
        return user

# set_password() 메서드는 비밀번호를 해싱하여 저장하는 메서드, AbstractBaseUser 클래스에 정의되어서 상속받음
# set_password() 호출시,password_changed() 함수를 호출하여 비밀번호 변경 이벤트를 발생시킴
# 해싱된 비밀번호는 PBKDF2 알고리즘을 사용하여 해싱됨