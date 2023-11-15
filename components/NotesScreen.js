// NotesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotesScreen = ({ navigation, route }) => {
    const [notes, setNotes] = useState([]);
   
    useEffect(() => {
        loadNotesFromStorage();
    }, []);


    const loadNotesFromStorage = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes');
           console.log("savedNotes111 : ", storedNotes)
            setNotes(JSON.parse(storedNotes));
        } catch (error) {
            console.error('Error loading notes from storage:', error);
            return [];
        }
    };

    const handleAddNote = () => {
        // Navigate to AddNoteScreen
        navigation.replace('AddNote', {
            categories: route.params.categories,
            client: route.params.client,

        });
    };

    const deleteNote = async (id) => {
      try {

        const existingNotes = await AsyncStorage.getItem('notes');
        const notes = existingNotes ? JSON.parse(existingNotes) : [];
    
        const updatedNotes = notes.filter((n) => n.id !== id);
    
     
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    
     
        loadNotesFromStorage();
      } catch (error) {
        console.error('Error deleting note', error);
      }
    };



    return (
        <View style={styles.container}>
            {notes.length == 0 ? (
                 <View style={styles.noNoteContainer}>
                 <Text style={styles.noNoteText}>No notes available</Text>
               </View>
            ) : (
               
                  <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation:1,
                        marginVertical:10,padding:10,borderRadius:3

                        }}>
                          <View>
                          <Text style={styles.headerText}>{item.category}</Text>
                          <Text style={[styles.noteText]}>{item.noteText}</Text>
                         <View style={{flexDirection:'row',alignContent:"flex-end",alignItems:'flex-end',alignSelf:'flex-end'}}>
                         <TouchableOpacity onPress={() => deleteNote(item.id)}>
                          <Text style={styles.delete}>{"Delete"}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={editNote}>
                          <Text style={[styles.delete,{marginHorizontal:10}]}>{"Edit"}</Text>
                          </TouchableOpacity>
                          </View>
                         </View>
                        </View>
                    )}
                />
                 
            )}
            
            <Button title="ADD Note" onPress={() => handleAddNote()} />
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize:16,
    color:"#000",
    fontWeight: 'bold',
  },
  noteText:{
    fontSize:14,
    color:"#000",
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  noteText: {
    flex: 1,
    marginRight: 10,
  },
  deleteButtonText: {
    color: 'red',
  },
  noNoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNoteText: {
    fontSize: 18,
    color: '#888',
  },
  delete:{
    flexDirection:"row",
    alignContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    color:'red'
  }
});

export default NotesScreen;
