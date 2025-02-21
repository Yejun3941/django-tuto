FROM python:3.9-slim

# 작업 디렉터리 설정
WORKDIR /backend

# 시스템 패키지 & 라이브러리 업데이트
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/* #

# requirements.txt 복사 & 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스코드 복사
COPY . .
 

# 포트 정의 (Gunicorn or Daphne 구동 시)
# gunicon: 8000, daphne: 8001
EXPOSE 8000 
EXPOSE 8001

# CMD나 ENTRYPOINT에서 Gunicorn or Daphne 실행
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
# Channels/ASGI 구동 시엔:
# CMD ["daphne", "backend.asgi:application", "--port", "8001", "--bind", "0.0.0.0"]

# asgi, wsgi 둘다 위 조건으로 구동하고싶다면?
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:8000 backend.wsgi:application & daphne backend.asgi:application --port 8001 --bind 0.0.0.0"]