import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

const allowedOrigins = [
  "https://pokedex-blackingg.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/api/pokemon", async (req, res) => {
  try {
    const response = await fetch(`${POKE_API_BASE_URL}/pokemon/?limit=898`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon data" });
  }
});

app.get("/api/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch Pokémon with ID ${id}` });
  }
});

app.get("/api/pokemon-species/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${POKE_API_BASE_URL}/pokemon-species/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch Pokémon species with ID ${id}` });
  }
});

app.get("/api/evolution-chain/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${POKE_API_BASE_URL}/evolution-chain/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch evolution chain with ID ${id}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
