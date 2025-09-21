FROM registry.szyh-smart.cn/edu/nginx:1.25.5-alpine3.19-slim

LABEL maintainer="<zhangrilong@szyh-smart.com>"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
ADD server-admin/  /usr/share/nginx/html/
