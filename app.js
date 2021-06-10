const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

if (process.env.APP_PORT) {
  app.listen(process.env.APP_PORT);
  console.info("The application is listening on the port: ", process.env.APP_PORT);
} else {
  console.info("To start app you have to specify port in dotenv!")
}