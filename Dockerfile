FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ENV SECRET=${SECRET} \
    PORT=${PORT} \
    DATABASE_URL=${DATABASE_URL}
EXPOSE ${PORT}
# RUN npm run migrate
CMD ["npm", "run", "start"]
