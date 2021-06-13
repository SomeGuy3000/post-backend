const moment = require('moment');
const knex = require("../database/dbSetup");

module.exports = {
    getAccountData: async ctx => {
        let email = ctx.request.query.email;
        if (email){
            await knex.select("id")
                .select("email")
                .select("createdAt")
                .select("updatedAt")
                .from("users")
                .where("email", email)
                .then(async data => {
                    if(data[0]){
                        ctx.status = 200; ctx.response.body = {"message": data[0],"code": 200}
                    } else {
                        ctx.status = 409; ctx.response.body = {"message": "wrong email","code": 409};
                    }
                })
        } else {
            ctx.status = 409; ctx.response.body = {"message": "email not found","code": 409};
        }
    },
    createNewAccount: async ctx => {
        let timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        let body = ctx.request.body;

        await knex.select("email")
            .from("users")
            .where("email", body.email)
            .then(async email => {
                if (email.length > 0){
                    ctx.status = 409; ctx.response.body = {"message": "email in used","code": 409}
                } else {
                    if (body.email && body.password) {
                        await knex('users').insert([{
                            email: body.email, 
                            password: body.password,
                            createdAt: timestamp, 
                        }])
                            .then(() => {ctx.status = 201; ctx.response.body = {"message": "accept","code": 201}})
                            .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
                    } else {
                        ctx.status = 409; ctx.response.body = {"message": "email or password not found","code": 409};
                    }
                }
            });
    },
    editAccount: async ctx => {
        let body = ctx.request.body;
        let timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        if (body.newemail) {
            await knex.select("email").select("password")
                .from("users")
                .where("email", body.email)
                .then(async accountData => {
                    if (accountData.length > 0) {
                        if (accountData[0].email == body.email && accountData[0].password == body.password) {
                            await knex('users').where({'email': body.email}).update({
                                email: body.newemail,
                                updatedAt: timestamp
                            })
                                .then(() => {ctx.status = 202; ctx.response.body = {"message": "accept","code": 202}})
                                .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
                        } else {
                            ctx.status = 409; ctx.response.body = {"message": "wrong email or password","code": 409};
                        }
                    } else {
                        ctx.status = 409; ctx.response.body = {"message": "email not found","code": 409};
                    }
                })
                    .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
        } else if (body.newpassword) {
            await knex.select("email").select("password")
                .from("users")
                .where("email", body.email)
                .then(async accountData => {
                    if (accountData.length > 0) {
                        if (accountData[0].email == body.email && accountData[0].password == body.password) {
                            await knex('users').where({'email': body.email}).update({
                                password: body.newpassword,
                                updatedAt: timestamp
                            })
                                .then(() => {ctx.status = 202; ctx.response.body = {"message": "accept","code": 202}})
                                .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
                        } else {
                            ctx.status = 409;
                            ctx.response.body = {"message": "wrong email or password","code": 409};
                        }
                    } else {
                        ctx.status = 409;
                        ctx.response.body = {"message": "account not found","code": 409};
                    }
                })
                    .catch(() => {ctx.status = 500; ctx.body = {"message": "error","code": 500}});
        }
    },
}