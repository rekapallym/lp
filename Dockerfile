#FROM nginx:latest
FROM nginx:1.19.2-alpine
COPY ./dist/lp/* /usr/share/nginx/html/