import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { characterDetailStyle } from '../src/styles/mainStyle'; // Stil dosyasını içe aktar

const CharacterDetailPage = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={characterDetailStyle.container}>
      <Image source={{ uri: character.image }} style={characterDetailStyle.image} />
      <Text style={characterDetailStyle.text}>Name: {character.name}</Text>
      <Text style={characterDetailStyle.text}>Status: {character.status}</Text>
      <Text style={characterDetailStyle.text}>Species: {character.species}</Text>
      <Text style={characterDetailStyle.text}>Gender: {character.gender}</Text>
      <Text style={characterDetailStyle.text}>Location: {character.location.name}</Text>
      {/* Diğer karakter detaylarını buraya ekleyebilirsiniz */}
      <Text style={characterDetailStyle.text}>Episodes:</Text>
      <FlatList
        data={character.episode}
        renderItem={({ item }) => <Text style={characterDetailStyle.text}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CharacterDetailPage;
