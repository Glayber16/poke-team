import { Request, Response } from "express";
import { PokeServices } from "../services/PokeServices";
import protobuf from "protobufjs";
import * as js2xmlparser from "js2xmlparser";
import path from "path";

export class PokeController {
  //Controlador para lidar com as reqs direta da api externa, manipular os dados retornando apenas o necessario
  static async getPokemons(req: Request, res: Response) {
    try {
      const pokemons = await PokeServices.getPokemons();
      //Formata os dados para que se adeque ao protobuf
      const formattedPokes = {
        results: pokemons.results.map((pokemon: any) => {
          const urlParts = pokemon.url.split("/");
          const id = urlParts[urlParts.length - 2];
          return {
            name: pokemon.name,
            url: pokemon.url,

            sprit: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        }),
      };
      //Identificar o formato como XML ou Proto (Json é padrão)
      const format = req.query.format as string;
      if (format === "xml") {
        const xmlData = js2xmlparser.parse("pokemonList", formattedPokes);
        res.set("Content-Type", "application/xml");
        return res.send(xmlData);
      }
      if (format === "proto") {
        //Pasta onde ta o pokemon.proto (esquema dos dados)
        const root = await protobuf.load(
          path.join(__dirname, "../proto/pokemon.proto"),
        );
        //Procura o pokemonList dentro do pacote pokemon
        const PokemonListSchema = root.lookupType("pokemon.PokemonList");
        //Verifica se os dados passados estão de acordo com o pokemon.proto
        const errMsg = PokemonListSchema.verify(formattedPokes);
        if (errMsg) {
          throw Error(`Erro de validação Protobuf: ${errMsg}`);
        }
        const message = PokemonListSchema.create(formattedPokes);
        //Converte pra binario
        const buffer = PokemonListSchema.encode(message).finish();
        res.set("Content-Type", "application/x-protobuf");
        return res.send(buffer);
      }
      return res.status(200).json(formattedPokes.results);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unexpected error" });
    }
  }

  static async getPokemonByName(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Pokemon name is required" }); //Verficia se o nome foi passado (no typescript precisa da verificação pois id pode ser string ou undefined)
    }
    try {
      const pokemon = await PokeServices.getPokemonByName(name);
      const formattedPoke = {
        id: pokemon.id,
        name: pokemon.name,
        sprit: pokemon.sprites.front_default,
        types: pokemon.types.map((type: any) => type.type.name),
        stats: pokemon.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      };

      return res.status(200).json(formattedPoke);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unexpected error" });
    }
  }
  static async getPokemonsByType(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Type name is required" }); //Verficia se o id foi passado (no typescript precisa da verificação pois id pode ser string ou undefined)
    }
    try {
      const typedata = await PokeServices.getPokemonsByType(name);
      const formattedPokes = typedata.pokemon.map((poke: any) => {
        //Poke é a key do array
        const urlParts = poke.pokemon.url.split("/");
        const id = urlParts[urlParts.length - 2];
        return {
          name: poke.pokemon.name,
          url: poke.pokemon.url,
          sprit: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
      return res.status(200).json(formattedPokes); //Formatar esse json para retornar apenas alguns dados essenciais
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unexpected error" });
    }
  }
}
