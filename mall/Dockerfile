# 初始化环境Node
FROM node:18.18.2-buster-slim

# 设置 pnpm 环境变量
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 设置 npm 镜像环境变量
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/

# 安装指定版本的 pnpm (v8)
RUN corepack enable

WORKDIR /usr/src/app

COPY . /usr/src/app

# RUN apt-get update -y && apt-get install -y openssl
# mirrors.aliyun.com 阿里镜像源
# mirrors.tuna.tsinghua.edu.cn 清华镜像源
RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org|mirrors.tuna.tsinghua.edu.cn/debian-security|g' /etc/apt/sources.list && \
    apt-get update -y && \
    apt-get install -y openssl

# 安装系统依赖（关键）
RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org|mirrors.tuna.tsinghua.edu.cn/debian-security|g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y \
    openssl \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 也可以在这里设置 pnpm 的镜像源（如果需要）
RUN pnpm config set registry https://registry.npmmirror.com/
RUN pnpm add pm2 -g
RUN pnpm install --no-frozen-lockfile

WORKDIR /usr/src/app/apps/api
RUN pnpm postgres:generate-prod
RUN pnpm build-prod

# 设置环境变量
ENV NODE_ENV production
ENV PORT 8000

# 暴露端口
EXPOSE 8000

# 使用PM2启动应用
CMD pnpm run postgres:migrate-prod && \
    # pnpm run prisma:seed-prod && \
    # pnpm run prisma:regions-prod && \
    # pnpm run prisma:cms-prod && \
    pm2 restart pm2.config.js --no-daemon
