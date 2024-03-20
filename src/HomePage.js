import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ImageBackground, Alert, TextInput } from 'react-native';
import Pagination from '../src/component/Pagination';
import RickAndMortyApi from '../src/services/RickAndMortyApi';
import { saveFavoriteCharacter, removeFavoriteCharacter, getFavoriteCharacters } from './FavoriteCharacterHelper';
import { mainStyle } from '../src/styles/mainStyle';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        fetchEpisodes(currentPage);
        loadFavoriteCharacters(); // Favori karakterleri yükle
    }, [currentPage]);



    const fetchEpisodes = async (page) => {
        try {
            const data = await RickAndMortyApi.fetchEpisodes(page);
            setEpisodes(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchCharacterDetails = async (characterURL) => {
        try {
            const response = await fetch(characterURL);
            const characterData = await response.json();
            return characterData;
        } catch (error) {
            console.error("Error fetching character details:", error);
            return null;
        }
    };

    const handleEpisodePress = async (episodeId) => {
        try {
            const charactersData = await RickAndMortyApi.fetchCharactersByEpisode(episodeId);
            setSelectedEpisode(episodeId);
            if (charactersData && charactersData.length > 0) {
                const characterDetailsPromises = charactersData.map(fetchCharacterDetails);
                const characterDetails = await Promise.all(characterDetailsPromises);
                setCharacters(characterDetails);
                setModalVisible(true);
            } else {
                console.error("Characters not found in API response");
                setCharacters([]);
                setModalVisible(false);
            }
        } catch (error) {
            console.error("Error fetching characters:", error);
            setCharacters([]);
            setModalVisible(false);
        }
    };

    const handleCharacterPress = async (character) => {
        try {
            const characterData = await RickAndMortyApi.fetchCharacter(character.id);
            if (characterData) {
                // Karakter ekranına yönlendirme yap
                navigation.navigate('CharacterDetail', { character: characterData });
                // Modal'ı kapat
                setModalVisible(false);
                // Seçili karakteri sıfırla
                setSelectedCharacter(null);
            } else {
                console.error("Character not found in API response");
            }
        } catch (error) {
            console.error("Error fetching character details:", error);
        }
    };
    
      


    const handleFavoriteToggle = async (character) => {
        try {
            const isFavorite = favoriteCharacters.some(favCharacter => favCharacter.id === character.id);
            if (isFavorite) {
                await removeFavoriteCharacter(character.id);
            }
            else {
                console.log("save" + character.name);
                await saveFavoriteCharacter(character);
            }
            // Favori karakterlerin yeniden yüklenmesini bekleyin
            await loadFavoriteCharacters();
            // Favori karakterlerin listesini güncelleyin
            const updatedFavoriteCharacters = isFavorite
                ? favoriteCharacters.filter(favCharacter => favCharacter.id !== character.id)
                : [...favoriteCharacters, character];
            setFavoriteCharacters(updatedFavoriteCharacters);
        } catch (error) {
            console.error("Error toggling favorite character:", error);
        }
    };



    const loadFavoriteCharacters = async () => {
        try {
            const favorites = await getFavoriteCharacters();
            // Favori karakterlerin yüklenmesi sırasında favori olup olmadıklarını kontrol et
            if (favorites) {
                console.log("loadFavoriteCharacters:");
                favorites.forEach(favorite => {
                    console.log(favorite.name);
                });
            } else {
                console.log("No favorite characters loaded.");
            }

            const updatedCharacters = characters.map(character => {
                const isFavorite = favorites.some(favCharacter => favCharacter.id === character.id);
                return { ...character, isFavorite };
            });
            setCharacters(updatedCharacters);
            // Favori karakterlerin listesini güncelleyin
            setFavoriteCharacters(favorites || []); // Eğer favori karakterler yoksa boş dizi ata
        } catch (error) {
            console.error("Error loading favorite characters:", error);
        }
    };





    const renderEpisodeItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleEpisodePress(item.id)}>
            <View style={mainStyle.mainItem}>
                <Text style={mainStyle.mainItemText}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderCharacterItem = ({ item }) => {
        const isFavorite = favoriteCharacters.some(character => character.id === item.id);
        return (
            <TouchableOpacity onPress={() => handleCharacterPress(item)}>
                <View style={mainStyle.characterItem}>
                    <ImageBackground source={{ uri: item.image }} style={mainStyle.characterImage}>
                        <View style={mainStyle.characterOverlay}>
                            <Text style={mainStyle.characterName}>{item.name}</Text>
                        </View>
                    </ImageBackground>
                    <View style={mainStyle.characterDetails}>
                        <Text>Status: {item.status}</Text>
                        <Text>Species: {item.species}</Text>
                        <Text>Gender: {item.gender}</Text>
                        <Text>Location: {item.location.name}</Text>
                        <TouchableOpacity onPress={() => handleFavoriteToggle(item)}>
                            <Text style={[mainStyle.favoriteButton, { backgroundColor: isFavorite ? 'red' : 'green' }]}>
                                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderFavoriteCharacters = () => (
        <FlatList
            data={favoriteCharacters}
            renderItem={renderCharacterItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );

    const resetFavoriteCharacters = async () => {
        try {
            // Favori karakterleri AsyncStorage'den kaldır
            await removeFavoriteCharacter(); // Hatanın olduğu satır düzeltildi
            // Favori karakterler listesini güncelle (boş dizi ataması yaparak sıfırla)
            setFavoriteCharacters([]);
            // Favori karakterlerin favori durumunu güncelle (false olarak ayarla)
            const updatedCharacters = characters.map(character => ({ ...character, isFavorite: false }));
            setCharacters(updatedCharacters);
            console.log("resetFavorite" + updatedCharacters);
        } catch (error) {
            console.error("Error resetting favorite characters:", error);
        }
    };

    // Arama metnini güncelleyen fonksiyon
    const handleSearch = (text) => {
        setSearchText(text);
    };

    // Bölüm veya karakterleri arama metnine göre filtreleyen fonksiyon
    const filterItems = (items) => {
        return items.filter(item => {
            return item.name.toLowerCase().includes(searchText.toLowerCase());
        });
    };

    const renderFilteredEpisodes = () => {
        const filteredEpisodes = filterItems(episodes);
        return (
            <FlatList
                data={filteredEpisodes}
                renderItem={renderEpisodeItem}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    };

    const renderFilteredCharacters = () => {
        const filteredCharacters = filterItems(characters);
        return (
            <FlatList
                data={filteredCharacters}
                renderItem={renderCharacterItem}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    };

    const handleModalClose = () => {
        setSelectedCharacter(null); // Seçili karakteri sıfırla
        setModalVisible(false); // Modal ekranı kapat
        // Input alanının focusunu kaybet
        // Örneğin, TextInput'in ref'ini kullanarak focus'u kaybedebiliriz:
        inputRef.current.blur(); // inputRef, TextInput'in referansı olmalı
      };
    return (
        <View style={mainStyle.container}>
            <View style={mainStyle.header}>
                <Text style={mainStyle.headerText}>EPISODES</Text>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        'Favorite Characters',
                        favoriteCharacters.map(character => character.name).join('\n'),
                        [
                            { text: 'Reset Favorites', onPress: () => resetFavoriteCharacters() },
                            { text: 'Close' }
                        ],
                        { cancelable: true }
                    );
                }}>
                    <Text style={mainStyle.headerButton}>Favorite Characters</Text>
                </TouchableOpacity>
            </View>
            <View style={mainStyle.searchContainer}>
                <TextInput
                    style={mainStyle.searchInput}
                    placeholder="Search..."
                    onChangeText={handleSearch} // Arama metnini güncelleyen fonksiyonu buraya bağladık
                    value={searchText}
                />
            </View>
            <View style={mainStyle.main}>
                {/* Bölümleri arama metnine göre filtreleyip gösteriyoruz */}
                {renderFilteredEpisodes()}
                {/* Karakterleri arama metnine göre filtreleyip gösteriyoruz */}
                {modalVisible && (
                   <Modal
                   visible={modalVisible}
                   animationType="slide"
                   transparent={true}
                   onRequestClose={handleModalClose}
                 >
                        <View style={mainStyle.modalContainer}>
                            <View style={mainStyle.modalContent}>
                                <View style={mainStyle.modalHeader}>
                                    <Text style={mainStyle.ModalHaderText}>CHARACTERS</Text>
                                </View>
                                <View style={mainStyle.modalMain}>
                                    {/* Karakterleri arama metnine göre filtreleyip gösteriyoruz */}
                                    {renderFilteredCharacters()}
                                </View>
                                <TouchableOpacity style={mainStyle.closeButton} onPress={() => setModalVisible(false)}>
                                    <Text style={mainStyle.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
            <View style={mainStyle.footer}>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </View>
        </View>
    );

};

export default HomePage;