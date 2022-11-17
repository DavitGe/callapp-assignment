const Koa = require("koa");
const app = new Koa();

const data = require("./data.json");
const cors = require("cors");

app.use(async (ctx) => {
  ctx.body = data;
});

app.use(cors());

app.listen(3001);
