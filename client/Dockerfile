FROM node:8.7.0
 
RUN npm install -g -s --no-progress yarn@1.2.1

ENV APP_HOME /meethereum
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package.json $APP_HOME/package.json
ADD yarn.lock $APP_HOME/yarn.lock

RUN yarn

EXPOSE 3000

ADD . $APP_HOME
