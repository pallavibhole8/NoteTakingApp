// AddNoteScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet ,TouchableOpacity} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNoteScreen = ({ navigation, route }) => {
    //const { clients, categories, notes } = route.params;
    //const [client, setClient] = useState(route.params.client[0]);
    const [category, setCategory] = useState(route.params.categories);
    const [noteText, setNoteText] = useState('');
    const [editedText, setEditedText] = useState(noteText);

    console.log("route.params edit",route.params.categoriesEdit)
    const handleSaveNote = async () => {
        console.log("await",await AsyncStorage.getItem('notes'))
        try {
            const existingNotes = await AsyncStorage.getItem('notes');
            const parsedNotes = existingNotes ? JSON.parse(existingNotes) : [];

            parsedNotes.push({
                "id": Date.now(),
                "category": category,
                "noteText": noteText
            });

            await AsyncStorage.setItem('notes', JSON.stringify(parsedNotes));

            navigation.replace('Notes');
        } catch (error) {
            console.error('Error saving note to storage:', error);
        }

    };

    const  editNoteA = async () => { 
        console.log("press")
    }
    return (
        <View style={{padding:20}}>
       
            <Text style={styles.headerText}>Category:</Text>
            <View style={styles.pickerHeader}>
            <Picker 
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
        >
            {route.params.categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
            ))}
        </Picker>
            </View>
           
            <Text style={styles.headerText}>Note Text:</Text>
            <TextInput
                value={noteText}
                placeholder="Enter your note"
                onChangeText={(text) => setNoteText(text)}
                style={[styles.input, { height: 100 }]}
                multiline
            />
            <Button title="Save Note" onPress={() => handleSaveNote()} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
      },
      headerText: {
        fontSize:18,
        color:"#000",
        fontWeight: 'bold',
      },
      pickerHeader:{
        borderWidth:1,
        margin:5,
        borderColor: 'gray', 
      },
      input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
      },
    });

export default AddNoteScreen;
