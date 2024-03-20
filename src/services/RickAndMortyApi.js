class RickAndMortyApi {
  static async fetchEpisodes(page = 1) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch episodes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }
  }

  static async fetchCharactersByEpisode(episodeId) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch characters by episode');
      }
      const data = await response.json();
      return data.characters;
    } catch (error) {
      console.error("Error fetching characters by episode:", error);
      throw error;
    }
  }

  static async fetchCharacter(characterId) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch character');
      }
      const data = await response.json();
      console.log("fetchCharacter:", data);
      return data;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  }
}

export default RickAndMortyApi;
