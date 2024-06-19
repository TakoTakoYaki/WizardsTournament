import {useNavigate} from "react-router-dom";
import Logo from "../img/triwizard_logo.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from 'react';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            position: 'relative',
            top: '10vh',
        }}>
            <Box onClick={() => navigate("/start")} sx={{
                width: 228,
                height: 344,
                backgroundImage: `url(${Logo})`,
                margin: 'auto',
                animation: 'little-magical-glow-blue 2s infinite alternate',
                cursor: 'pointer',
            }} aria-label="logo"
            />
            <Typography variant="h1" sx={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Harry Potter',
                letterSpacing: '0.2rem',
                textShadow: '5px 5px 5px #222',
                wordWrap: 'break-word',
            }}>
                ТУРНИР ТРЁХ ВОЛШЕБНИКОВ
            </Typography>
        </Box>
    );
}