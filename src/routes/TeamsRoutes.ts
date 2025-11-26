import { Router } from "express";
import { TeamController } from "../controllers/TeamsController";

const router = Router();

router.get("/", TeamController.getAllTeams);

router.post("/", TeamController.createTeam);

router.get("/:id", TeamController.getTeamById);

router.post("/:id/pokemon", TeamController.addPokemon);

router.delete("/:id/pokemon/:pokemonName", TeamController.removePokemon);

router.delete("/:id", TeamController.deleteTeam);

export default router;
