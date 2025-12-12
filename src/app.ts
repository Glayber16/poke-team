import express from "express";
import teamRoutes from "./routes/TeamsRoutes";
import pokeRoutes from "./routes/PokeRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/teams", teamRoutes); //Rota base dos times
app.use("/pokemons", pokeRoutes); //Rota base dos pokemons

export default app;
