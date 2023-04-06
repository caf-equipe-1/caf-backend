FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ENV SECRET=${SECRET} \
    PORT=${PORT} \
    DATABASE_URL=${DATABASE_URL}
EXPOSE ${PORT}
CMD ["npm", "run", "start"]