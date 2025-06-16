## 备份Docker postgres数据库到本地

```sh
# 查找PostgreSQL容器的NAME或ID
docker ps

# docker exec -it 你的容器名 pg_dump -U 用户名 -d 数据库名 > backup.sql
docker exec -it 154cb553d666 pg_dump -U postgres -d blogs > backup.sql
```

## 恢复数据库

```sh
# cat backup.sql | docker exec -i 你的容器名 psql -U 用户名 -d 数据库名
cat backup.sql | docker exec -i 154cb553d666 psql -U postgres -d blogs
```

## Primsa初始数据库自动脚本, 配置package.json

```
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
```
