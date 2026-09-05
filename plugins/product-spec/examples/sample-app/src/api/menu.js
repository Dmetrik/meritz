import { db } from "../db/client.js";

export function registerMenuRoutes(app) {
  // 오늘의 메뉴 — 품절 항목 제외
  app.get("/api/menu", (req, res) => {
    res.json(db.listAvailableMenu());
  });
}
