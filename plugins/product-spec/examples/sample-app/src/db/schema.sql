CREATE TABLE menu (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  price       INTEGER NOT NULL,
  sold_out    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  user_id     TEXT    NOT NULL,
  menu_id     INTEGER NOT NULL REFERENCES menu(id),
  size        TEXT    NOT NULL,
  note        TEXT,
  status      TEXT    NOT NULL DEFAULT 'preparing', -- preparing / ready / picked_up / canceled
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
