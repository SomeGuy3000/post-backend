const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });
const recordController = require("../../controllers/records");

api.get('/records', (ctx, next) => recordController.getRecord(ctx, next));
api.get('/records/all', (ctx, next) => recordController.getAllRecords(ctx, next));

api.put('/records', (ctx, next) => recordController.editRecord(ctx, next));

api.post('/records', (ctx, next) => recordController.addRecord(ctx, next));

api.delete('/records', (ctx, next) => recordController.deleteRecord(ctx, next));

module.exports = api;