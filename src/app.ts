import express from "express";
import teamRoutes from "./routes/TeamsRoutes";
import pokeRoutes from "./routes/PokeRoutes";

const app = express();
app.use(express.json());

app.use("/teams", teamRoutes); //Rota base dos times
app.use("/pokemons", pokeRoutes); //Rota base dos pokemons

export default app;
