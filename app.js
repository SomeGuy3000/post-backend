const Koa = require('koa');
const json = require('koa-json');
const path = require("path");

const app = new Koa();
const router = require('./router/routers');

app
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async ctx => {
    ctx.body = {
      status: 404
    };
  });

if (process.env.APP_PORT) {
  app.listen(process.env.APP_PORT);
  console.info(" App is listening on:", process.env.APP_PORT);
} else {
  app.listen(3000);
  console.info(" App is listening on: 3000 \n To change app port setup it in dotenv file!")
}