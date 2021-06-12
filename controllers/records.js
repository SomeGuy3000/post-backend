const moment = require('moment');
const knex = require("../database/dbSetup")
module.exports = {
    getAllRecords: async (ctx) => {
        if(ctx.request.query.id){
            let ids = ctx.request.query.id.split(',');
            await knex('posts').whereIn('ID', ids).then(result => ctx.body = result)
                .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
        } else {
            await knex('posts').select('*').then(result => ctx.body = result)
                .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
        }
    },
    addRecord: async ctx => {
        let timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        let body = ctx.request.body
  
        await knex('posts').insert([{
            title: body.title, 
            lead: body.lead,
            content: body.content,
            createdAt: timestamp, 
            updatedAt: 'NULL'
        }])
            .then(() => {ctx.status = 201; ctx.response.body = {"message": "accept","code": 201}})
            .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
    },
    editRecord: async ctx => {
        let timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        let id = parseInt(ctx.request.query.id);
        let body = ctx.request.body

        await knex('posts').where({'id': id}).update({
            title: body.title, 
            lead: body.lead, 
            content: body.content,  
            updatedAt: timestamp
          })
            .then(() => {ctx.status = 202; ctx.response.body = {"message": "accept","code": 202}})
            .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
    },
    deleteRecords: async ctx => {
        let ids = ctx.request.query.id.split(',');

        await knex('posts').whereIn('id', ids).del()
            .then(() => {ctx.status = 200; ctx.response.body = {"message": "accept","code": 200}})
            .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
    },
}