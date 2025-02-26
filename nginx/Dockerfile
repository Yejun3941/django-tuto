FROM nginx:latest

# Nginx 설정파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# SSL 인증서가 있다면 cert 폴더 복사
# COPY cert/* /etc/nginx/ssl/

EXPOSE 80
# EXPOSE 443 (SSL)
