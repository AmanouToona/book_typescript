FROM node:18

ARG project_dir=/workspace

WORKDIR ${project_dir}

RUN npm install -g typescript

CMD [ "bash" ]
