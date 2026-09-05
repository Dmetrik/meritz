import { z } from "zod";
import { db } from "../db/client.js";
import { requireStaff } from "../middleware/auth.js";
import { notifySlack } from "../lib/notify.js";

const OrderInput = z.object({
  menuId: z.number().int(),
  size: z.enum(["tall", "grande"]),
  note: z.string().max(100).optional(),
});

export function registerOrderRoutes(app) {
  // 주문 생성 — 사내 구성원 누구나
  app.post("/api/orders", (req, res) => {
    const parsed = OrderInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid_input" });

    const order = db.createOrder({ ...parsed.data, userId: req.user.id });
    notifySlack(`새 주문 #${order.id}`);
    res.status(201).json(order);
  });

  // 내 주문 목록
  app.get("/api/orders/mine", (req, res) => {
    res.json(db.listOrdersByUser(req.user.id));
  });

  // 주문 취소 — 본인 주문이 아직 준비중일 때만
  app.delete("/api/orders/:id", (req, res) => {
    const order = db.getOrder(Number(req.params.id));
    if (!order) return res.status(404).json({ error: "not_found" });
    if (order.user_id !== req.user.id) {
      return res.status(403).json({ error: "not_your_order" });
    }
    if (order.status !== "preparing") {
      return res.status(409).json({ error: "already_started" });
    }
    notifySlack(`주문 취소 #${order.id}`);
    res.json(db.cancelOrder(order.id));
  });

  // 주문 상태 변경 — 바리스타만
  app.patch("/api/orders/:id/status", requireStaff, (req, res) => {
    const { status } = req.body;
    if (!["preparing", "ready", "picked_up"].includes(status)) {
      return res.status(400).json({ error: "invalid_status" });
    }
    res.json(db.updateOrderStatus(Number(req.params.id), status));
  });
}
