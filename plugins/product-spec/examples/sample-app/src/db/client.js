import Database from "better-sqlite3";

const sqlite = new Database(process.env.DATABASE_PATH ?? "./data/coffee.db");

export const db = {
  listAvailableMenu: () =>
    sqlite.prepare("SELECT id, name, price FROM menu WHERE sold_out = 0").all(),

  createOrder: ({ userId, menuId, size, note }) => {
    const info = sqlite
      .prepare(
        "INSERT INTO orders (user_id, menu_id, size, note) VALUES (?, ?, ?, ?)"
      )
      .run(userId, menuId, size, note ?? null);
    return { id: info.lastInsertRowid, status: "preparing" };
  },

  listOrdersByUser: (userId) =>
    sqlite
      .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
      .all(userId),

  getOrder: (id) =>
    sqlite.prepare("SELECT id, user_id, status FROM orders WHERE id = ?").get(id),

  cancelOrder: (id) => {
    sqlite
      .prepare("UPDATE orders SET status = 'canceled' WHERE id = ?")
      .run(id);
    return { id, status: "canceled" };
  },

  updateOrderStatus: (id, status) => {
    sqlite.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
    return { id, status };
  },
};
