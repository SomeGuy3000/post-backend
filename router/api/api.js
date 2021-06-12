const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });
const recordController = require("../../controllers/records");

api.get('/records', (ctx, next) => recordController.getAllRecords(ctx));

api.post('/records', (ctx, next) => recordController.addRecord(ctx));

api.put('/records', (ctx, next) => recordController.editRecord(ctx));

api.delete('/records', (ctx, next) => recordController.deleteRecords(ctx));

module.exports = api;