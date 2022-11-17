const Koa = require("koa");
const app = new Koa();

const data = require("./data.json");

app.use(async (ctx) => {
  ctx.body = data;
});

app.listen(3001);
