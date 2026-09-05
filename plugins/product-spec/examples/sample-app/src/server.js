import express from "express";
import { registerOrderRoutes } from "./api/orders.js";
import { registerMenuRoutes } from "./api/menu.js";
import { requireStaff } from "./middleware/auth.js";

const app = express();
app.use(express.json());

registerMenuRoutes(app);
registerOrderRoutes(app);

// 바리스타용 대기열 화면 (스태프 전용)
app.get("/queue", requireStaff, (req, res) => {
  res.render("queue");
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`coffee-order listening on ${port}`));
