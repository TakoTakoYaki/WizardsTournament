import Scroll from "../img/scroll.png";
import Stamp from "../img/stamp.png";
import Maze from "../img/maze.png";
import Logo from "../img/triwizard_logo.png";
import Grass from "../img/grass.jpg";
import {Typography, Box, Button, Fade, Grid, Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSnackbar} from "notistack";
import React from 'react';
import PropTypes from 'prop-types';

export default function Stage3(props) {
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(true);

    const [finishedTasks, setFinishedTasks] = useState(0);
    const finishedTasksRef = useRef(finishedTasks);
    const [dangers, setDangers] = useState([]);
    const [eventsByParticipants, setEventsByParticipants] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpen = () => {
        setFadeIn(false);
    }

    const createEvents = (participant) => {
        let events = [];
        events.push({
            message:
                <>
                    <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                    <b>{participant.name}</b>&nbsp;заходит в лабиринт&nbsp;
                </>,
            variant: ""
        });
        for (let i = 0; i < dangers.length; i++) {
            if (Math.random() <= dangers[i].meetingChance) {
                events.push({
                    message:
                        <>
                            <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                            <b>{participant.name}</b>&nbsp;встречает опасность&nbsp;
                            <b>{dangers[i].name}</b>!&emsp;
                            <Avatar alt={dangers[i].name}
                                    src={"img/dangers/" + dangers[i].name + ".jpg"}/>
                        </>,
                    variant: "warning"
                });
                if (Math.random() <= dangers[i].escapingChance) {
                    events.push({
                        message:
                            <>
                                <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                                <b>{participant.name}</b>&nbsp;преодолевает опасность&nbsp;
                                <b>{dangers[i].name}</b>!&emsp;
                                <Avatar alt={dangers[i].name}
                                        src={"img/dangers/" + dangers[i].name + ".jpg"}/>
                            </>,
                        variant: "info"
                    });
                } else {
                    events.push({
                        message:
                            <>
                                <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                                <b>{participant.name}</b>&nbsp;не преодолевает опасность&nbsp;
                                <b>{dangers[i].name}</b>&nbsp;и выбывает!&emsp;
                                <Avatar alt={dangers[i].name}
                                        src={"img/dangers/" + dangers[i].name + ".jpg"}/>
                            </>,
                        variant: "error"
                    });
                    return events;
                }
            }
        }
        events.push({
            message:
                <>
                    <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                    <b>{participant.name}</b>&nbsp;забирает&nbsp;<b>Кубок Огня</b>!
                </>,
            variant: "success",
            hasWon: true
        });
        return events;
    }

    useEffect(() => {
        if (!fadeIn) {
            setTimeout(() => navigate("/winner"), 1000);
        } else {
            // props.getParticipants();
        }
    }, [fadeIn]);

    useEffect(() => {
        if (dangers.length === 0) {
            fetch('http://localhost:8080/api/dangers/maze/get').then((response) => response.json()).then((json) => {
                setDangers(json);
            });
        } else {
            let events = [];
            props.schools.forEach((school, index) => props.participants[index].school = school);
            props.participants.sort((a, b) => b.points - a.points);
            props.participants.forEach((participant, index) => {
                events.push(createEvents(participant, index));
            });
            setEventsByParticipants(events);
        }
    }, [dangers]);

    useEffect(() => {
        if (eventsByParticipants.length > 0) {
            let winnerFound;
            eventsByParticipants.forEach((events, index) => {
                let interval;
                const showEvents = () => {
                    if (events.length === 0 || winnerFound) {
                        setFinishedTasks(finishedTasksRef.current + 1);
                        clearInterval(interval);
                    } else {
                        let event = events.shift();
                        if (event.hasWon) {
                            winnerFound = true;
                            props.setWinner(index);
                            setFinishedTasks(finishedTasksRef.current + 1);
                            clearInterval((interval));
                        }
                        enqueueSnackbar(event.message, {variant: event.variant, autoHideDuration: 3500});
                    }
                }
                setTimeout(() => {
                    showEvents();
                    interval = setInterval(showEvents, 5000);
                }, 500 * index);
            });

        }
    }, [eventsByParticipants]);

    useEffect(() => {
        if (finishedTasks === 4 && props.winner === undefined) {
            props.setWinner(-1);
        }
        finishedTasksRef.current = finishedTasks;
    }, [finishedTasks])

    return (
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
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        mask: `url(${Scroll})`,
                        maskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            backgroundImage: `url(${Grass})`,
                            backgroundRepeat: 'no-repeat',
                            mask: `url(${Maze})`,
                            maskPosition: 'center',
                            maskRepeat: 'no-repeat',
                            opacity: 0.9,
                        }}/>
                    </Box>
                    <Box sx={{
                        pt: '12%',
                        px: '12%',
                        height: '100%',
                        boxSizing: 'border-box',
                        position: 'relative',
                        bottom: '100%',
                    }}>
                        <Typography variant="h3" sx={{
                            textAlign: 'center',
                            fontFamily: 'Harry Potter',
                            letterSpacing: '0.2rem',
                            height: '12%',
                        }}>
                            ФИНАЛ - ЛАБИРИНТ
                        </Typography>
                        <Box sx={{
                            height: '60%',
                        }}>
                            <Grid container spacing={1} sx={{
                                height: '100%',
                            }}>
                                <Grid item container xs={5} sx={{
                                    alignContent: 'space-between',
                                    height: '100%',
                                }}>
                                    <Grid item xs={12} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Avatar alt={props.participants[0].name}
                                                src={"img/students/" + props.participants[0].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    animation: `${props.winner === 0 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                        }}>
                                            {props.participants[0].name.split(" ")[0]}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Avatar alt={props.participants[2].name}
                                                src={"img/students/" + props.participants[2].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    animation: `${props.winner === 2 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                        }}>
                                            {props.participants[2].name.split(" ")[0]}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <img src={Logo} alt={"Кубок"} style={{
                                        animation: 'magical-glow-beauxbatons 2s infinite alternate',
                                        aspectRatio: '228/344',
                                        width: 150,
                                        marginBottom: 13,
                                    }}/>
                                </Grid>
                                <Grid item container xs={5} sx={{
                                    alignContent: 'space-between',
                                    height: '100%',
                                }}>
                                    <Grid item xs={12} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Avatar alt={props.participants[1].name}
                                                src={"img/students/" + props.participants[1].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    animation: `${props.winner === 1 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                        }}>
                                            {props.participants[1].name.split(" ")[0]}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Avatar alt={props.participants[3].name}
                                                src={"img/students/" + props.participants[3].name + ".jpg"}
                                                variant="round"
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    animation: `${props.winner === 3 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none'}`,
                                                }}
                                        />
                                        <Typography sx={{
                                            textAlign: 'center',
                                            fontFamily: 'Harry Potter',
                                            fontWeight: 'bold',
                                            fontSize: '2rem',
                                            letterSpacing: '0.2rem',
                                        }}>
                                            {props.participants[3].name.split(" ")[0]}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: '12%',
                        }}>
                            <Button onClick={handleOpen} disabled={props.winner === undefined} sx={{
                                backgroundImage: `url(${Stamp})`,
                                backgroundSize: '100% 100%',
                                color: '#7f120c',
                                fontFamily: 'Harry Potter',
                                fontWeight: 'bold',
                                fontSize: '2.125rem',
                                letterSpacing: '0.2rem',
                                px: '1.5rem',
                            }}role="button"
                                    aria-label="ИТОГИ ТУРНИРА➤">
                                ИТОГИ ТУРНИРА➤
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fade>
    );
}

Stage3.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        school: PropTypes.string,
    })).isRequired,
    schools: PropTypes.arrayOf(PropTypes.string).isRequired,
    setWinner: PropTypes.func.isRequired,
    winner: PropTypes.number,
};
