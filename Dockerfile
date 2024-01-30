FROM node:18-alpine 

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www

COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate

