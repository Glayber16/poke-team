import { Request, Response } from "express";
import TeamService from "../services/TeamsServices";
export class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();
    return res.status(200).json(teams); //Não retorna mais o array, agora é um banco de dados relacional
  }

  static async createTeam(req: Request, res: Response) {
    const { name } = req.body; //Pega o nome do corpo da requisição
    if (!name || name.trim().length === 0) {
      //Verifica se o nome foi passado e se não é ""
      return res.status(400).json({ message: "Name is required" });
    }
    const newTeam = await TeamService.createTeam(name); //Cria o novo time utilizando o service
    return res.status(201).json(newTeam); //Retorna o novo time com status 201 = criado
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Team id is required" }); //Verficia se o id foi passado (no typescript precisa da verificação pois id pode ser string ou undefined)
    }
    const team = await TeamService.getTeamById(id); //Procura o time pelo id utilizando o service
    if (!team) {
      return res.status(404).json({ message: "Team not found" }); //Se não encontrar retorna 404
    }
    return res.status(200).json(team);
  }

  static async addPokemon(req: Request, res: Response) {
    //async pois faz uma requisição a pokeapi
    const { id } = req.params;
    const { pokemonName } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Team id is required" }); //Verficia se o id foi passado (no typescript precisa da verificação pois id pode ser string ou undefined)
    }
    if (!pokemonName) {
      return res.status(404).json({ message: "Pokemon name is required" }); //Verifica se o nome do pokemon foi passado (no typescript ocorre o processo de verificação pois pode ser string ou undefined)
    }
    try {
      const updatedTeam = await TeamService.addPokemon(id, pokemonName); //Tenta adicionar o pokemon no time utilizando o service/ await pois é async
      return res.status(200).json(updatedTeam); //Retorna o time atualizado com status 200
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unexpected error" });
    }
  }

  static async removePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const { pokemonName } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Team id is required" }); //Verifica id explicado antes
    }
    if (!pokemonName) {
      return res.status(404).json({ message: "Pokemon name is required" }); //Verifica nome do pokemon explicado antes
    }
    try {
      const updatedTeam = await TeamService.removePokemon(id, pokemonName); //Tenta remover o pokemon do time utilizando o service
      return res.status(200).json(updatedTeam);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  static async deleteTeam(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Team id is required" }); //Verifica o id explicado antes
    }
    try {
      await TeamService.deleteTeam(id); //Tenta deletar o time utilizando o service
      return res.status(200).json("Team deleted!!");
    } catch (error) {
      if (error instanceof Error) {
        //instaceof verifica se o error é do tipo error (necessario typescript )
        return res.status(400).json({ message: error.message });
      }
    }
  }
}

export default TeamController;
