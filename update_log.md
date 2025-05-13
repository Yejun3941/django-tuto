1. Code refactoring
2. SSL with openssl & frontend make dist with build
3. Optimizing
   1. ORM optimizing 
      1. N+1 issue - query 를 backend 에서 요청할때 Join한 형태(with select_related,prefetch_related)
      2. Django debug toolbar - in Dev(not Prod)
      3. Index/query tuning - 
         1. model's db_index=True / class Meta:
         2. queryset.explain() 
   2. redis Cache