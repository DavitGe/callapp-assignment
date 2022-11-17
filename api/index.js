const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = Router();

const data = require("./data.json");
const cors = require("@koa/cors");

app.use(cors());

router.get("/", async (ctx, next) => {
  ctx.body = data;
});

app.use(router.routes());

app.listen(3001);
