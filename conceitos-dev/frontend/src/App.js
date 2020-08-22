import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            "owner": "Nicão da T.I",
            "title": `Projetão ${Date.now()}`
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="ReactJS" />

            <ul>
                {projects.map(project => <li key={project.id}   >{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add project</button>
        </>
    );
}

export default App;