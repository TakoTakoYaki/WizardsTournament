import {MemoryRouter, Routes, Route} from "react-router-dom";
import Welcome from "./Welcome"
import Start from "./Start"
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Winner from "./Winner";
import {useState} from "react";
import {SnackbarProvider} from "notistack";
import React from 'react';

export default function App() {
    const [participants, setParticipants] = useState([]);
    const [schools, setSchools] = useState([]);
    const [winner, setWinner] = useState();

    const updateParticipants = () => {
        console.log(JSON.stringify(participants))
        fetch('http://localhost:8080/api/participants/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participants)
        }).then();
    }

    const participantProps = {
        participants: participants,
        setParticipants: setParticipants,
        updateParticipants: updateParticipants,
        schools: schools,
        setSchools: setSchools
    }

    return (
        <SnackbarProvider maxSnack={4} hideIconVariant>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/start" element={
                        <Start {...participantProps}/>
                    }/>
                    <Route path="/stage1" element={
                        <Stage1 {...participantProps}/>
                    }/>
                    <Route path="/stage2" element={
                        <Stage2 {...participantProps}/>
                    }/>
                    <Route path="/stage3" element={
                        <Stage3 {...participantProps} winner={winner} setWinner={setWinner}/>
                    }/>
                    <Route path="/winner" element={
                        <Winner {...participantProps} winner={winner}/>
                    }/>
                </Routes>
            </MemoryRouter>
        </SnackbarProvider>
    );
}