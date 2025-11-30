import { Router } from "express";
import { PokeController } from "../controllers/PokeController";

const pokeRouter = Router();

pokeRouter.get("/", PokeController.getPokemons);

pokeRouter.get("/type/:name", PokeController.getPokemonsByType);

pokeRouter.get("/:name", PokeController.getPokemonByName);


export default pokeRouter;