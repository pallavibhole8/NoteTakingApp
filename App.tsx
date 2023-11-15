import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNoteScreen from './components/AddNoteScreen';
import NotesScreen from './components/NotesScreen';
const Stack = createStackNavigator();


const App = () => {
  const clients = ["Client A", "Client B", "Client C"];
  const categories = ["Goal Evidence", "Support Coordination", "Active Duty"];
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          initialParams={{ categories ,clients}}
        />
        <Stack.Screen name="AddNote" component={AddNoteScreen} initialParams={{ categories ,clients}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
