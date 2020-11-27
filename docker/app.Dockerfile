FROM node:11

# Building Vue app
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/package.json
# RUN npm install
# RUN npm install -g @vue/cli-service-global
# RUN npm install node-sass
# RUN npm rebuild node-sass --force
RUN yarn global add @vue/cli
RUN  yarn global add @vue/cli-service
RUN yarn add node-sass


COPY . /app/
EXPOSE 8081
RUN yarn install
CMD ["yarn","serve"]
# CMD ["npm","run","serve"]