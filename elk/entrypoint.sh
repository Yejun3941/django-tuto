#!/bin/bash
# entrypoint.sh
# Elasticsearch 초기화 자동화 스크립트
# 1. init_elasticsearch.sh 실행하여 인증서 및 비밀번호 초기화 수행
/usr/local/bin/init_elasticsearch.sh

# 2. Elasticsearch 실행 (exec를 통해 PID 1로 전환)
exec bin/elasticsearch
