const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());

/* 🔹 RUTA PRINCIPAL */
app.get("/", (req, res) => {
  res.send("API de tienda funcionando correctamente");
});

/* =========================
   🔹 CREATE (Crear producto)
========================= */
app.post("/productos", (req, res) => {
  const { nombre, precio, stock } = req.body;

  if (!nombre || !precio || !stock) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  const sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)";
  db.query(sql, [nombre, precio, stock], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al crear producto" });
    }
    res.json({ mensaje: "Producto creado correctamente" });
  });
});

/* =========================
   🔹 READ (Listar productos)
========================= */
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al obtener productos" });
    }
    res.json(result);
  });
});

/* =========================
   🔹 READ por ID
========================= */
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM productos WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al buscar producto" });
    }
    res.json(result[0]);
  });
});

/* =========================
   🔹 UPDATE
========================= */
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const sql = "UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?";
  db.query(sql, [nombre, precio, stock, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al actualizar producto" });
    }
    res.json({ mensaje: "Producto actualizado correctamente" });
  });
});

/* =========================
   🔹 DELETE
========================= */
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
