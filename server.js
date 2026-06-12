// server.js
import express from "express";
import sportmonksHandler from "./api/sportmonks.js";

const app = express();

// Rota do proxy
app.get("/api/sportmonks", sportmonksHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor proxy Spotmonks rodando em http://localhost:${PORT}`);
});