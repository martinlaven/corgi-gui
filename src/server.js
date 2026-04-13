import express from "express";
import { createDecoder } from "@cardog/corgi";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

let decoder = null;

async function getDecoder() {
  if (!decoder) {
    console.log("Initializing corgi decoder...");
    decoder = await createDecoder();
    console.log("Decoder ready.");
  }
  return decoder;
}

app.get("/api/decode/:vin", async (req, res) => {
  const { vin } = req.params;
  const vinClean = vin.trim().toUpperCase();

  if (vinClean.length !== 17) {
    return res.status(400).json({ error: "VIN måste vara exakt 17 tecken." });
  }

  try {
    const dec = await getDecoder();
    const result = await dec.decode(vinClean, { includePatternDetails: false });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunde inte dekoda VIN.", detail: err.message });
  }
});

app.get("/api/health", (_, res) => res.json({ ok: true }));

getDecoder().catch(console.error);

app.listen(PORT, () => {
  console.log(`Corgi GUI running on http://localhost:${PORT}`);
});
