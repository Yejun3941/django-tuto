#!/bin/bash
# init_elasticsearch.sh
# ------------------------------
# Elasticsearch의 보안 초기화를 담당합니다.
# - SSL/TLS 인증서 번들이 없으면 생성합니다.
# - Kibana가 사용할 서비스 계정 토큰을 생성합니다.
# - elastic 사용자 비밀번호를 재설정(옵션)
# ------------------------------

# --- 인증서 생성 ---
CERT_BUNDLE="/usr/share/elasticsearch/config/certs/bundle.zip"
if [ ! -f "$CERT_BUNDLE" ]; then
  echo "Generating SSL certificate bundle..."
  # instances.yml 파일은 미리 구성되어 있어야 하며,
  # Elasticsearch와 Kibana의 호스트 정보를 포함합니다.
  /usr/share/elasticsearch/bin/elasticsearch-certutil cert --silent --pem --out "$CERT_BUNDLE" --in /usr/share/elasticsearch/config/certs/instances.yml
fi

# --- 서비스 계정 토큰 생성 ---
# Kibana가 사용할 서비스 계정 토큰 파일 경로
# This code run when xpack.security.enabled: true

# TOKEN_FILE="/usr/share/elasticsearch/config/service_tokens/kibana-service-token"
# if [ ! -f "$TOKEN_FILE" ]; then
#   TOKEN=$(/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana)
#   echo "$TOKEN" > /usr/share/elasticsearch/config/service_tokens/kibana-service-token
# fi

# --- 비밀번호 재설정 (옵션) ---
# 비밀번호 재설정이 이미 완료되었는지 확인하는 플래그 파일
PASSWORD_FLAG="/usr/share/elasticsearch/config/certs/password_set"
if [ ! -f "$PASSWORD_FLAG" ]; then
  echo "Resetting password for elastic user..."
  # --batch 모드로 비밀번호 재설정 (환경변수 ELASTIC_PASSWORD 사용)
  /usr/share/elasticsearch/bin/elasticsearch-reset-password --username elastic --batch --password "$ELASTIC_PASSWORD"
  # 재설정 완료 후 플래그 파일 생성
  touch "$PASSWORD_FLAG"
fi
