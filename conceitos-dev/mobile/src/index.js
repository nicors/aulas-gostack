import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            const project = response.data;
            console.log(project);
            setProjects(project);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Project ${Date.now()}`,
            owner: 'Nico'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            < SafeAreaView  style={styles.container}>
                <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item : project }) => (
                    <Text style={styles.project}> {project.title} </Text>

                )}
                />
                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject} >
                    <Text style={styles.buttonText}>Add project</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
     
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
    },

    project: {
        color: '#fff',
        fontSize: 32,
    },

    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight:'bold',
        fontSize: 16
    }

})