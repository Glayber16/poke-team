import { Router } from "express";
import { TeamController } from "../controllers/TeamsController";

const teamRouter = Router();

teamRouter.get("/", TeamController.getAllTeams); // GET http://localhost:PORT/teams/ -> teams definido no app.ts

teamRouter.post("/", TeamController.createTeam); // POST http://localhost:PORT/teams/

teamRouter.get("/:id", TeamController.getTeamById); // GET EX: http://localhost:PORT/teams/1 (1 = id do time)

teamRouter.post("/:id/pokemon", TeamController.addPokemon); // POST http://localhost:PORT/teams/1/pokemon (nome do pokemon passado no body)

teamRouter.delete("/:id/pokemon/:pokemonName", TeamController.removePokemon); // DELETE http://localhost:PORT/teams/1/pokemon/gengar (nome passado na URL)

teamRouter.delete("/:id", TeamController.deleteTeam); // DELETE EX: http://localhost:PORT/teams/1 (1 = id do time)

export default teamRouter;
