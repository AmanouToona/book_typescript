FROM node:18

ARG project_dir=/workspace

WORKDIR ${project_dir}

# openssl の version が合わないから怒られるので対応
ENV NODE_OPTIONS --openssl-legacy-provider
RUN npm install -g typescript

CMD [ "bash" ]
