const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = '你好好吗';
})
app.listen(8888)