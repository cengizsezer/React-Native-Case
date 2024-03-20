// favoriteCharacterHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favoriteCharacters';

export const saveFavoriteCharacter = async (character) => {
  try {
    const currentFavorites = await getFavoriteCharacters();
    if (currentFavorites.length >= 10) {
      alert("Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.");
      return;
    }
    const updatedFavorites = [...currentFavorites, character];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error saving favorite character:", error);
  }
};

export const removeFavoriteCharacter = async (characterId) => {
  try {
    const currentFavorites = await getFavoriteCharacters();
    const updatedFavorites = currentFavorites.filter(character => character.id !== characterId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite character:", error);
  }
};

export const getFavoriteCharacters = async () => {
  try {
    const favoritesJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (!favoritesJson) return [];
    return JSON.parse(favoritesJson);
  } catch (error) {
    console.error("Error getting favorite characters:", error);
    return [];
  }
};

export const resetFavoriteCharacters = async () => {
  try {
    // Favori karakterleri AsyncStorage'den kaldır
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error resetting favorite characters:", error);
  }
};

export const getFavoriteCharacterColor = async (characterId) => {
  try {
    const favorites = await getFavoriteCharacters();
    const isFavorite = favorites.some(favCharacter => favCharacter.id === characterId);
    return isFavorite ? 'red' : 'green';
  } catch (error) {
    console.error("Error getting favorite character color:", error);
    return 'green';
  }
};
