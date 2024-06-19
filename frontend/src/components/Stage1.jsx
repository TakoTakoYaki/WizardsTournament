import Scroll from "../img/scroll.png";
import Stamp from "../img/stamp.png";
import Versus from "../img/versus.png";
import {Typography, Box, Button, Fade, Stepper, Step, StepLabel, Grid, Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Participants from "./Participants";
import React from 'react';
import PropTypes from 'prop-types';

export default function Stage1(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const openRef = useRef(null);

    const [activeStep, setActiveStep] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const showResultRef = useRef(null);
    const [dragons, setDragons] = useState([]);
    const [fightingMethods, setFightingMethods] = useState([]);
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [results, setResults] = useState([]);

    const handleOpen = () => {
        if (activeStep < 3) {
            setShowResult(false);
        } else if (showResult) {
            setOpen(true);
        }
    }

    const hasWon = (i) => {
        if (fightingMethods[i].vulnerability === vulnerabilities[i].id) {
            props.participants[i].points += 40;
            return true;
        } else if (Math.random() <= dragons[i].losingChance) {
            props.participants[i].points += 30 + Math.round(10 * (1 - dragons[i].losingChance));
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (openRef.current) {
            setFadeIn(false);
        }
        openRef.current = open;
    }, [open]);

    useEffect(() => {
        if (!fadeIn) {
            props.updateParticipants();
            setTimeout(() => navigate("/stage2"), 1000);
        }
    }, [fadeIn]);

    useEffect(() => {
        if (showResultRef.current) {
            setActiveStep(activeStep + 1);
        }
        showResultRef.current = showResult;
    }, [showResult]);

    useEffect(() => {
        if (dragons.length === 0) {
            fetch('http://localhost:8080/api/dragons/get').then((response) => response.json()).then((json) => {
                setDragons(json);
            });
        } else {
            let ids = [];
            dragons.forEach((dragon) => ids.push(dragon.vulnerability));
            fetch('http://localhost:8080/api/vulnerabilities/get', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ids)
            }).then((response) => response.json()).then((json) => {
                setVulnerabilities(json);
            });
        }
    }, [dragons]);

    useEffect(() => {
        if (vulnerabilities.length > 0) {
            let names = [];
            props.participants.forEach((participant) => names.push(participant.fightingMethod));
            fetch('http://localhost:8080/api/fighting_methods/get', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(names)
            }).then((response) => response.json()).then((json) => {
                setFightingMethods(json);
            });
        }
    }, [vulnerabilities]);

    useEffect(() => {
        if (fightingMethods.length > 0) {
            let results = [];
            for (let i = 0; i < 4; i++) {
                results.push(hasWon(i));
            }
            setResults(results);
        }
    }, [fightingMethods]);

    return (
        <>
            <Fade in={fadeIn} timeout={{enter: 1000, exit: 1000}}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        width: '60vw',
                        aspectRatio: '16 / 11',
                        minWidth: '1032px',
                        minHeight: '710px',
                        backgroundImage: `url(${Scroll})`,
                        backgroundSize: '100% 100%',
                        animation: 'big-magical-glow-blue 2s infinite alternate',
                    }}>
                        <Box sx={{
                            pt: '12%',
                            px: '12%',
                            height: '100%',
                            boxSizing: 'border-box',
                        }}>
                            <Typography variant="h3" sx={{
                                color: 'black',
                                textAlign: 'center',
                                fontFamily: 'Harry Potter',
                                letterSpacing: '0.2rem',
                                height: '12%',
                            }}>
                                ПЕРВЫЙ ЭТАП - БИТВА С ДРАКОНОМ
                            </Typography>
                            <Box sx={{
                                height: '60%',
                            }}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {props.participants.map((participant, index) => (
                                        <Step key={index} sx={{
                                            '&.MuiStep-root > .MuiStepConnector-root.Mui-active > .MuiStepConnector-line': {
                                                borderColor: 'black',
                                            },
                                            '&.MuiStep-root > .MuiStepConnector-root.Mui-completed > .MuiStepConnector-line': {
                                                borderColor: 'black',
                                            }
                                        }}>
                                            <StepLabel sx={{
                                                '&.MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiStepLabel-label': {
                                                    fontSize: 'large',
                                                },
                                                '&.MuiStepLabel-root > .MuiStepLabel-iconContainer > .MuiStepIcon-root': {
                                                    '&.Mui-active, &.Mui-completed': {
                                                        color: 'black',
                                                    },
                                                    '&.Mui-active': {
                                                        filter: 'drop-shadow(0 0 1px #fdfaa4) drop-shadow(0 0 3px #ffeb00) drop-shadow(0 0 5px #ffb700) drop-shadow(0 0 6px #ec1819) drop-shadow(0 0 7px #5e262b)',
                                                    }
                                                }
                                            }}>{participant.name}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                {results.length > 0 ? <Grid container spacing={1} mt={2}>
                                    <Grid item xs={5} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <Avatar alt={props.participants[activeStep].name}
                                                src={"img/students/" + props.participants[activeStep].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 165,
                                                    height: 165,
                                                    animation: `${showResult && results[activeStep] ? 'magical-glow-winner 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Box
                                            onClick={() => setShowResult(true)}
                                            sx={{
                                                width: 130,
                                                height: 130,
                                                backgroundImage: `url(${Versus})`,
                                                backgroundSize: '100% 100%',
                                                animation: `${showResult ? 'none' : 'magical-glow-versus 2s infinite alternate'}`,
                                                cursor: `${showResult ? 'default' : 'pointer'}`,
                                            }}
                                            aria-label="versus"
                                        />
                                    </Grid>
                                    <Grid item xs={5} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <Avatar alt={dragons[activeStep].name}
                                                src={"img/dragons/" + dragons[activeStep].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 165,
                                                    height: 165,
                                                    animation: `${showResult && !results[activeStep] ? 'magical-glow-winner 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                    </Grid>
                                    <Grid item xs={5} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                        }}>
                                            {props.participants[activeStep].name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}/>
                                    <Grid item xs={5} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {dragons[activeStep].name}
                                        </Typography>
                                    </Grid>
                                    {showResult ? <Grid item xs={12}>
                                        <Typography fontSize={"large"}>
                                            Участник использовал <b>{fightingMethods[activeStep].name}</b>
                                            {fightingMethods[activeStep].vulnerability === vulnerabilities[activeStep].id ? (<>
                                                &nbsp;и угадал уязвимость дракона
                                                (<b>{vulnerabilities[activeStep].description}</b>)!{" "}
                                            </>) : ". "}
                                            {results[activeStep] ? "Участник победил!" : "Дракон победил!"}
                                        </Typography>
                                    </Grid> : null}
                                </Grid> : null}
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                height: '12%',
                            }}>
                                <Button
                                    onClick={handleOpen}
                                    sx={{
                                        backgroundImage: `url(${Stamp})`,
                                        backgroundSize: '100% 100%',
                                        color: '#7f120c',
                                        fontFamily: 'Harry Potter',
                                        fontWeight: 'bold',
                                        fontSize: '2.125rem',
                                        letterSpacing: '0.2rem',
                                        px: '1.5rem',
                                        transform: 'rotate(-3deg)',
                                    }}
                                    role="button"
                                    aria-label={activeStep < 3 ? "СЛЕД. БИТВА➤" : "ЭТАП 2➤"}
                                >
                                    {activeStep < 3 ? "СЛЕД. БИТВА➤" : "ЭТАП 2➤"}
                                </Button>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
            {props.participants && props.schools && props.participants.length === 4 && props.schools.length === 4 ?
                <Participants {...props} open={open} setOpen={setOpen} /> : null}
        </>
    );
}

Stage1.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        fightingMethod: PropTypes.string.isRequired,
    })).isRequired,
    updateParticipants: PropTypes.func.isRequired,
    schools: PropTypes.arrayOf(PropTypes.string).isRequired,
};