// server.js
import express from "express";
import sportmonksHandler from "./api/sportmonks.js";
import apiSportsHandler from "./api/apisports.js";

const app = express();

// Rota do proxy
app.get("/api/sportmonks", sportmonksHandler);
app.get("/api/apisports", apiSportsHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando em http://localhost:${PORT}`);
});
