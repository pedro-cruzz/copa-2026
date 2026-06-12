const SPORTMONKS_BASE_URL = "https://api.sportmonks.com/v3/football";

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
