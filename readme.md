## 1. 프로젝트 개요

- **프로젝트 목표**: Django 백엔드 + React 프론트엔드를 기반으로, 인증/CRUD/실시간 기능 구현하고, Docker-Compose를 통해 배포 및 모니터링 체계를 구축하는 풀스택 학습 프로젝트.

- **주요 스택**:
  - **Backend**: Python 3.9(slim), Django (MVT), Django REST Framework(DRF), Django Channels  
  - **Frontend**: React (TypeScript), Axios  
  - > Since project dockerized with nginx, need to update. 
  - **DB**: (개발 모드) SQLite,Redis  
  - **배포/환경**: Docker, Docker-Compose, Nginx, Gunicorn, Daphne, Redis  
  - **모니터링/로그**: ELK Stack(Filebeat+Logstash+Elasticsearch+Kibana), Sentry, Prometheus+Grafana

---

## 2. 단계별 진행 내용

### (1) Django + React 연동 (기본 뼈대)
- **Django**: 프로젝트 생성, DRF 설정, 간단한 API(“Hello World”)  
- **React**: Create React App(TypeScript), Axios로 백엔드 API 호출, 기본 라우팅  
- **목표**: 양쪽이 간단한 REST로 통신해 데이터 표시

### (2) 사용자 인증/권한 시스템
- **Custom User** based AbstractUser
- **JWT 인증**(djangorestframework-simplejwt) 
- **React**: 회원가입/로그인 페이지, localStorage로 토큰 관리

### (3) CRUD 기능 + 테스트
- **DRF**에서 ModelViewSet, Serializer 사용  
- **React**: CRUD 페이지 구성  

### (4) 실시간 기능 (Django Channels)
- **Channels**로 WebSocket 실시간 채팅/알림 구현  
- **React**: WebSocket 연결, 실시간 채팅 UI  
- **Redis**: Channel layer, 비동기 메시지 브로드캐스트

### (5) 배포 & 로그 모니터링
- **Docker**: Dockerfile (Gunicorn+Daphne), docker-compose.yml, Redis, etc.  
- **Nginx**: reverse proxy, static 파일 서빙(/static/), WebSocket 라우팅(/ws/)  
- **Sentry**: 애플리케이션 에러 추적(스택 트레이스, Slack/이메일 알림)  
- **ELK Stack**: Filebeat+Logstash+Elasticsearch+Kibana로 로그 통합 & 분석  
- **Prometheus + Grafana**: 시스템/애플리케이션 메트릭 수집 & 대시보드(Exporter, Alertmanager)

---

## 3. 현재 구성 / 예시 디렉토리

```
my_project/
  ├─ backend/
  │   ├─ Dockerfile
  │   ├─ backend/ (config forder, Django settings, asgi.py, etc.) 
  │   ├─ app/ (Django apps: accounts, posts, shop, chat...)
  │   └─ ...
  ├─ frontend/
  │   └─ src/ (React TypeScript code)
  ├─ nginx/
  │   ├─ nginx.conf (rename to default.conf in container)
  │   └─ ...
  ├─ elk/ (ELK config)
  │   ├─ logstash.conf
  │   ├─ filebeat.yml
  │   └─ ...
  ├─ prometheus/ (Prometheus)
  ├─ docker-compose.yml
  └─ ...
```

- **docker-compose.yml**: services(backend, redis, logstash, elasticsearch, kibana, filebeat, prometheus, grafana, node_exporter, etc.)
- **env_file**: `.env`(SENTRY_DSN, DB_PASSWORD 등 환경변수)

---

## 4. 실행 방법 (개발 모드)

1. **Clone** this repo
2. **Install Docker** (v20+ recommended)
3. **docker-compose up -d --build**  
4. **Check**:  
   - Django at `http://localhost:8000` 
   - Kibana at `http://localhost:5601`
   - Prometheus at `http://localhost:9090`
   - Grafana at `http://localhost:3000`

