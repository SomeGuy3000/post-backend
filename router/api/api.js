const KoaRouter = require('koa-router');
const api = new KoaRouter({ prefix: '/api' });
const recordController = require("../../controllers/records");
const accountController = require("../../controllers/account");

api.get('/records', (ctx, next) => recordController.getAllRecords(ctx));
api.post('/records', (ctx, next) => recordController.addRecord(ctx));
api.put('/records', (ctx, next) => recordController.editRecord(ctx));
api.delete('/records', (ctx, next) => recordController.deleteRecords(ctx));

api.get('/account', (ctx, next) => accountController.getAccountData(ctx));
api.post('/account', (ctx, next) => accountController.createNewAccount(ctx));
api.put('/account', (ctx, next) => accountController.editAccount(ctx));

module.exports = api;