import { type Team } from "../models/Team";
import { randomUUID } from "crypto";
export class TeamService {
  private static teams: Team[] = []; //Time em memoria sendo um array vazio.

  static getAllTeams() {
    return this.teams; // Retorna o array de times local
  }

  static createTeam(name: string) {
    const newTeam: Team = { name, id: randomUUID(), pokemons: [] }; //Cria um novo time onde o usuario passa o nome, mas o id é automatico e array de pokemons vazios
    this.teams.push(newTeam); //Adiciona o novo time no array de times
    return newTeam;
  }

  static deleteTeam(id: string) {
    const size = this.teams.length; //Tamanho inicial do array (pode usar some())
    this.teams = this.teams.filter((team) => team.id !== id); //Filtra o array removendo o time com o id passado
    if (this.teams.length === size) {
      throw new Error("Team not found"); //Se o tamanho do array continuar o mesmo é pq o time não existia/nao foi encontrado
    }
    return;
  }

  static getTeamById(id: string) {
    return this.teams.find((team) => team.id === id); //Procura e retorna o time com o id passado
  }

  static async addPokemon(id: string, pokemonName: string) {
    const team = this.getTeamById(id); //Reutiliza o getbyid assim pegando o time passado pelo id
    pokemonName = pokemonName.trim().toLowerCase(); //Formata o nome do pokemon

    if (!team) {
      throw new Error("Team not found"); //Se o time não existir lança o erro
    }
    if (team.pokemons.length >= 6) {
      throw new Error("Team is full"); //Se o time ja tiver 6 pokemons lança erro
    }
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`, //Busca o pokemon na pokeapi
    );
    if (!response.ok) {
      throw new Error("Pokemon not found"); //Se der erro lança que não achou o pokemon
    }
    const pokedata = await response.json(); //Pega os dados da resposta
    team.pokemons.push({ id: pokedata.id, name: pokedata.name }); //Adiciona o pokemon no array de pokemons propio do time
    return team;
  }

  static removePokemon(id: string, pokemonName: string) {
    const team = this.getTeamById(id); //Procura e retorna o time com o id passado
    pokemonName = pokemonName.trim().toLowerCase(); 
    if (!team) {
      throw new Error("Team not found"); //Repete um pouco da logica do addPokemon
    }
    if (!team.pokemons.some(p => p.name === pokemonName)) {
      throw new Error("Pokemon not found in team"); //Verifica antes se o pokemon existe no time, se não existir lança um erro
    }

    team.pokemons = team.pokemons.filter(
      (pokemon) => pokemon.name !== pokemonName, //Filtra o array removendo o nome passado
    );
    return team;
  }
}
export default TeamService;
