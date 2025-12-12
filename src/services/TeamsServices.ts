import { type Team } from "../models/Team";
import { PokeServices } from "./PokeServices";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //Instanciando a conexão com o banco
export class TeamService {
  


  static async getAllTeams() {
    return await prisma.team.findMany({
      include:{
        pokemons:true
      },
      orderBy: {
        createdAt: 'asc'
      }
    }); // Retorna o array de times local
  }

  static async createTeam(name: string) {
    const count = await prisma.team.count();
    if(count >= 50){
      const oldest = await prisma.team.findFirst({
        orderBy: {createdAt: 'desc'}
      }); //Logica pra limpar os times para não exagerar na quantidade
      if(oldest){
        await prisma.team.delete({where: {id: oldest.id}})
      }
    }

    return await prisma.team.create({
      data: {
        name: name
      }
    })
  }


  static async deleteTeam(id: string) {
    return await prisma.team.delete({where: {id}})
  }

  static async getTeamById(id: string) {
    return await prisma.team.findUnique({
            where: { id },
            include: { pokemons: true }
        }); //Procura e retorna o time com o id passado
  }

  static async addPokemon(id: string, pokemonName: string) {
    const team = await this.getTeamById(id); //Reutiliza o getbyid assim pegando o time passado pelo id
    pokemonName = pokemonName.trim().toLowerCase(); //Formata o nome do pokemon

    if (!team) {
      throw new Error("Team not found"); //Se o time não existir lança o erro
    }
    if (team.pokemons.length >= 6) {
      throw new Error("Team is full"); //Se o time ja tiver 6 pokemons lança erro
    }
    const pokedata = await PokeServices.getPokemonByName(pokemonName); //Busca o pokemon na pokeapi

    return await prisma.pokemon.create({
            data: {
                name: pokedata.name,
                pokeId: pokedata.id, // Salvamos o ID oficial (ex: 25)
                teamId: id     // Vinculamos ao time (Foreign Key)
            }
        });
  }

  static async removePokemon(id: string, pokemonName: string) {
    const team = await this.getTeamById(id); //Procura e retorna o time com o id passado
    pokemonName = pokemonName.trim().toLowerCase();
    if (!team) {
      throw new Error("Team not found"); //Repete um pouco da logica do addPokemon
    }
    if (!team.pokemons.some((p) => p.name === pokemonName)) {
      throw new Error("Pokemon not found in team"); //Verifica antes se o pokemon existe no time, se não existir lança um erro
    }

    return await prisma.pokemon.deleteMany({
      where: {
        teamId: id,
        name: pokemonName
      }
    })
  }
}
export default TeamService;
