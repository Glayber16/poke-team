export class PokeServices {
  static async getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!response.ok) {
      throw new Error("Error no fetch dos pokemons");
    }
    return response.json();
  }

  static async getPokemonByName(name: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    if (!response.ok) {
      throw new Error("Error no nome do pokemon");
    }
    return response.json();
  }
  static async getPokemonsByType(name: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${name}/`);
    if (!response.ok) {
      throw new Error("Error no fetch do type");
    }
    return response.json();
  }
}
