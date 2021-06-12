module.exports = {
    getRecord: function (ctx, next) {
        ctx.body = {
            "message": "hi",
            "code": 200
        };
    },
    getAllRecords: function (ctx, next) {
        ctx.body = {
            "message": "all",
            "code": 200
        };
    },
    addRecord: function (ctx, next) {
        ctx.body = {
            "message": "put",
            "code": 200
        };
    },
    editRecord: function (ctx, next) {
        ctx.body = {
            "message": "post",
            "code": 200
        };
    },
    deleteRecord: function (ctx, next) {
        ctx.body = {
            "message": "delete",
            "code": 200
        };
    },
    deleteBatchRecords: function (ctx, next) {
        ctx.body = {
            "message": "deleteBatch",
            "code": 200
        };
    },
}