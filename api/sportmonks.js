import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SPORTMONKS_BASE_URL = "https://api.sportmonks.com/v3/football";

function parseEnvValue(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function loadEnvFile(fileName) {
  const envPath = resolve(process.cwd(), fileName);

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, "utf8");

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = parseEnvValue(trimmed.slice(separatorIndex + 1));

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile(".env.local");
loadEnvFile(".env");

function getToken() {
  return process.env.SPORTMONKS_API_TOKEN || process.env.VITE_SPORTMONKS_API_TOKEN || "";
}

function isValidPath(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !path.includes("://");
}

export default async function handler(request, response) {
  const token = getToken();

  if (!token) {
    response.status(500).json({
      message: "Configure SPORTMONKS_API_TOKEN nas variaveis de ambiente do servidor."
    });
    return;
  }

  const path = request.query?.path;

  if (!isValidPath(path)) {
    response.status(400).json({ message: "Parametro path invalido." });
    return;
  }

  const target = new URL(`${SPORTMONKS_BASE_URL}${path}`);

  Object.entries(request.query || {}).forEach(([key, value]) => {
    if (key === "path" || value === undefined || value === null) {
      return;
    }

    target.searchParams.set(key, Array.isArray(value) ? value[0] : value);
  });

  target.searchParams.set("api_token", token);

  try {
    const sportmonksResponse = await fetch(target);
    const body = await sportmonksResponse.text();

    response.setHeader("Content-Type", sportmonksResponse.headers.get("content-type") || "application/json");
    response.setHeader("Cache-Control", "no-store");
    response.status(sportmonksResponse.status).send(body);
  } catch {
    response.status(502).json({ message: "Nao foi possivel conectar na Sportmonks." });
  }
}
