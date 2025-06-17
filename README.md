## Docker Dekstop 镜像源

```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "debug": true,
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "https://wyw4gzzo.mirror.aliyuncs.com",
    "http://hub-mirror.c.163.com"
  ]
}
```

## Install Docker Compose

```sh
# 下载最新版（替换版本号）
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose -v
```

## Install git

```sh
sudo yum install -y git

# 验证安装
git -v
```

## Server git init

### SSH Key

#### 1. 生成 SSH 密钥

```sh
ssh-keygen -t rsa -b 4096 -C "454451758@qq.com"

# Your public key has been saved in /root/.ssh/id_rsa.pub.
/root/.ssh/id_rsa.pub
cat /root/.ssh/id_rsa.pub
```

#### 2. 添加 SSH 密钥到 SSH 代理

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

#### 3. 复制 SSH 公钥

```sh
cat ~/.ssh/id_rsa.pub
```

#### 4. 添加 SSH 密钥到 GitHub

1. 登录 GitHub。
2. 进入 Settings > SSH and GPG keys。
3. 点击 New SSH key，粘贴复制的公钥并保存。

### Install Node

#### 1. 下载并安装 nvm

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

#### 2. 配置环境变量

安装完成后，将 nvm 添加到 shell 配置文件中（如 ~/.bashrc、~/.zshrc 或 ~/.profile）

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

运行以下命令使配置生效：

```sh
source ~/.bashrc
```

#### 3. 安装 Node.js

```sh
nvm install 18
node -v

npm install pnpm@8 -g
pnpm -v
```

## How to make local docker

docker-compose -f mall/docker-compose-local.yaml up -d --build
docker-compose -f mall/docker-compose.yaml up -d --build
docker-compose -f storefront/docker-compose.yaml up -d --build

## Docker create network

```
docker network ls
docker network create mall-network
```

## 进入docker容器

```sh
curl -w "
DNS解析  : %{time_namelookup}s
TCP连接  : %{time_connect}s
SSL握手  : %{time_appconnect}s (HTTPS)
首包等待: %{time_starttransfer}s
重定向  : %{time_redirect}s
总时间  : %{time_total}s
" -o /dev/null -s http://127.0.0.1:3000
```

```sh
# cd nginx
docker exec -it mall_nginx sh
curl http://127.0.0.1:3000

# OR
docker exec -it mall_nginx curl -v http://172.17.31.89:3000

docker exec -it mall_postgres sh

# restart nignx
docker restart mall_nginx

# 验证 Nginx 配置
docker exec -it mall_nginx nginx -t
docker exec -it mall_nginx nginx -s reload

# 验证Api
docker exec -it mall_backend bash

# cd postgres
docker exec -it mall_postgres bash

# 进入数据库权限
psql -U postgres -d blogs

# 查看所有数据库表
\d

# 查看用户表
select * from public.user;
# 查看公司表
select * from public.company;
# 更新数据
UPDATE public.company
SET "companyPhone" = '18181992053',
    "updatedAt" = NOW()
WHERE id = 2;

# 检查Nest Api
docker exec -it mall_backend bash
```

## deploy nest node

```bash
prisma db push --accept-data-loss && pm2 start dist/main.js -n Blog-API -i 2 --no-daemon
```

## 启动docker

```bash
docker-compose -f blogs/docker-compose.yaml up -d --build

# 重新制作某个容器
docker-compose up -d --build mall_nginx
docker-compose up -d --build mall_backend
docker restart mall_nginx

docker exec -it mall_nginx nginx -T
```

## Docker 的默认网络配置：

```sh
# 可通过
docker network inspect bridge
```

## 阿里云docker磁盘空间占用过多（使用docker-compose up -d --build此命令造成）

### 检查

```sh
# 检查宿主机磁盘空间
df -h

# 检查 Docker 磁盘使用情况
docker system df
```

#### 处理办法

```sh
# 删除所有未被容器使用的镜像（包括 dangling 和未标记的镜像）
docker image prune -a

# 专门清理构建缓存（显示占用 432.9MB）
docker builder prune
```

## Docker Command

```bash
docker ps
docker logs <container_name>
```

<container_name>: docker容器的名称

# Database Migration

- 1. 备份数据库：

```bash
docker exec <postgres_container_name> pg_dump -U <username> -d <database_name> > backup.sql
```

<postgres_container_name>: PostgreSQL容器的名称
<username>: 数据库的用户名
<database_name>: 要备份的数据库名称
backup.sql: 备份的文件名

- 2. 将备份文件传到目标机器：可以使用scp 、 lftp、rsync等文件传输命令将备份文件传输到目标机器:

```bash
scp backup.sql <user>@<target_host>:<path_to_backup>
```

or

```bash
rsync -avz backup.sql <user>@<target_host>:<path_to_backup>
```

<user>: 目标机器的登录用户名
<target_host>: 目标机器的IP地址或主机名
<path_to_backup>: 备份文件在目标机器上的路径

- 3. 在目标机器上创建PostgreSQL容器:

```bash
docker run --name <postgres_container_name> -e POSTGRES_PASSWORD=<password> -d postgres
```

<postgres_container_name>: 要创建的容器的名称
<password>: 要设置的PostgreSQL管理员密码

- 4. 将备份文件导入到PostgreSQL容器中:

```bash
cat backup.sql | docker exec -i <postgres_container_name> psql -U postgres
```

<postgres_container_name>: 新的PostgreSQL容器的名称

完成以上步骤后, 新的PostgreSQL容器应该就恢复了原来的数据库.
