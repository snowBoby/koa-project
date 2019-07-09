const Koa = require('koa');
const app = new Koa();
const { htmlTpl, ejsTpl,pugTpl } = require('./tpl');
const ejs = require('ejs');
const pug = require('pug');
const views = require('koa-views');
const {resolve} = require('path');

app.use(views(resolve(__dirname,'./views'),{
  extension: 'pug'
}))

app.use(async (ctx,next)=>{
  await ctx.render('index',{
    you:'luke',
    me:'feixue'
  })
})

// app.use(async (ctx, next) => {
//   ctx.type = 'text/html; charset=utf-8';
//   ctx.body = pug.render(pugTpl, {
//     you: 'feixue',
//     me: 'scott'
//   });
//   // ctx.body = ejs.render(ejsTpl, {
//   //   you: 'feixue',
//   //   me: 'scott'
//   // });
//   // ctx.body= htmlTpl;
// });
app.listen(8888);