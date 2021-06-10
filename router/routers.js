const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', (ctx, next) => {
    ctx.body = 'Frontpage';
});
router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello, World!';
});
  
module.exports = router;