const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { clients } = require("./data/clients");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// GET all
app.get("/api/clients", (req, res) => {
  res.json(clients);
});

// GET by id
app.get("/api/clients/:id", (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) return res.status(404).send("Not found");
  res.json(client);
});

// CREATE
app.post("/api/clients", (req, res) => {
  const newClient = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  clients.push(newClient);
  res.status(201).json(newClient);
});

// UPDATE
app.put("/api/clients/:id", (req, res) => {
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).send("Not found");

  clients[index] = { ...clients[index], ...req.body };
  res.json(clients[index]);
});

// DELETE
app.delete("/api/clients/:id", (req, res) => {
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).send("Not found");

  const deleted = clients.splice(index, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Mock API rodando em http://localhost:${PORT}`);
});