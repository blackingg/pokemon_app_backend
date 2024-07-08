import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

app.use(
  cors({
    origin: "https://pokedex-blackingg.netlify.app/",
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
