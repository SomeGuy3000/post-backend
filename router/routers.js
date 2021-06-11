const router = require("./api/api");

router.get('/', (ctx, next) => {
    ctx.body = 'Frontpage';
});
  
module.exports = router;