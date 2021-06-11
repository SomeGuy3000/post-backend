const KoaRouter = require('koa-router');

const api = new KoaRouter({ prefix: '/api' })

api.get('/posts', (ctx, next) => {
    ctx.body = {
        "message": "hi",
        "code": 200
    };
});
api.get('/posts/all', (ctx, next) => {
    ctx.body = {
        "message": "all",
        "code": 200
    };
});

api.put('/posts', (ctx, next) => {
    ctx.body = {
        "message": "put",
        "code": 200
    };
});

api.post('/posts', (ctx, next) => {
    ctx.body = {
        "message": "post",
        "code": 200
    };
});

api.delete('/posts', (ctx, next) => {
    ctx.body = {
        "message": "delete",
        "code": 200
    };
});

module.exports = api;