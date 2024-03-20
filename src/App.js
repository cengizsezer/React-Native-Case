import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import CharacterDetailPage from './CharacterDetailPage'; // Örnek olarak ekledim, gerçek dosyanızın adı ile değiştirin

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
