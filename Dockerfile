FROM node:18-alpine 


# Set working directory
WORKDIR /var/www

COPY . .

RUN npm install

RUN npx prisma migrate deploy
RUN npx prisma generate

CMD [ "npm" , "run build"]

