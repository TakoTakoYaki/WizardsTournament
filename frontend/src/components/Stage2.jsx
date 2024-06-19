import Scroll from "../img/scroll.png";
import Underwater from "../img/underwater.png";
import Stamp from "../img/stamp.png";
import {Typography, Box, Button, Fade, Grid, Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Participants from "./Participants";
import {useSnackbar} from "notistack";
import React from 'react';
import PropTypes from 'prop-types';

export default function Stage2(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const openRef = useRef(null);

    const [dangers, setDangers] = useState([]);
    const [results, setResults] = useState([]);
    const [eventsByParticipants, setEventsByParticipants] = useState([]);
    const [time, setTime] = useState(30);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpen = () => {
        setOpen(true);
    }

    const getAnimation = (time, i) => {
        switch (i) {
            case 0:
                return {
                    animation: time > 18 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                };
            case 1:
                return {
                    animation: time > 22 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                };
            case 2:
                return {
                    animation: time > 26 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                };
            case 3:
                return {
                    animation: time > 22 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                };
        }
    }

    const getAnimationAndColor = (time, i) => {
        switch (i) {
            case 0:
                return {
                    animation: time > 14 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                    color: time > 14 ? 'white' : 'black'
                };
            case 1:
                return {
                    animation: time > 20 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                    color: time > 20 ? 'white' : 'black'
                };
            case 2:
                return {
                    animation: time > 24 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                    color: time > 24 ? 'white' : 'black'
                };
            case 3:
                return {
                    animation: time > 20 ? 'magical-glow-beauxbatons 2s infinite alternate' : 'none',
                    color: time > 20 ? 'white' : 'black'
                };
        }
    }

    const createEvents = (participant, index) => {
        let events = [];
        events.push({
            message:
                <>
                    <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                    <b>{participant.name}</b>&nbsp;будет использвать метод&nbsp;
                    <b>{participant.breathingMethod}</b>&nbsp;для дыхания под водой
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
                    return {events: events, result: {success: false, steps: events.length - 1}};
                }
            }
        }
        props.participants[index].points += 15 + (30 - 5 * (events.length));
        events.push({
            message:
                <>
                    <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}/>&emsp;
                    <b>{participant.name}</b>&nbsp;освобождает узника&nbsp;
                    <b>{participant.nameOfSacrifice}</b>!&emsp;
                    <Avatar alt={participant.nameOfSacrifice}
                            src={"img/students/" + participant.nameOfSacrifice + ".jpg"}/>
                </>,
            variant: "success"
        });
        return {events: events, result: {success: true, steps: events.length - 1}};
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
            setTimeout(() => navigate("/stage3"), 1000);
        } else {
            // props.getParticipants();
        }
    }, [fadeIn]);

    useEffect(() => {
        if (results)
            setTimeout(() => {
                if (time > 0) {
                    setTime(time - 1);
                }
            }, 1000)
    }, [time]);

    useEffect(() => {
        if (dangers.length === 0) {
            fetch('http://localhost:8080/api/dangers/water/get').then((response) => response.json()).then((json) => {
                setDangers(json);
            });
        } else {
            let events = [];
            let results = [];
            props.participants.forEach((participant, index) => {
                let response = createEvents(participant, index);
                events.push(response.events);
                results.push(response.result);
            })
            setEventsByParticipants(events);
            setResults(results);
        }
    }, [dangers]);

    useEffect(() => {
        eventsByParticipants.forEach((events, index) => {
            let interval;
            const showEvents = () => {
                if (events.length === 0) {
                    clearInterval(interval);
                } else {
                    let event = events.shift();
                    enqueueSnackbar(event.message, {variant: event.variant, autoHideDuration: 3500});
                }
            }
            setTimeout(() => {
                showEvents();
                interval = setInterval(showEvents, 5000);
            }, 250 * index);
        });
    }, [eventsByParticipants]);

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
                        "&::after": {
                            display: 'block',
                            content: `''`,
                            backgroundImage: `url(${Underwater})`,
                            backgroundSize: '100% 70%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom -275px center',
                            animation: 'sink-water 30s',
                            animationIterationCount: '1',
                            mask: `url(${Scroll})`,
                            maskSize: '100% 100%',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            opacity: 0.6,
                            pointerEvents: 'none',
                        }
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
                                ВТОРОЙ ЭТАП - СПАСЕНИЕ УЗНИКА
                            </Typography>
                            <Box sx={{
                                height: '60%',
                            }}>
                                <Grid container spacing={1} sx={{
                                    height: '100%',
                                }}>
                                    {props.participants.map((participant, index) => (
                                        <Grid key={index} item container xs={3} sx={{
                                            alignContent: 'space-between',
                                            height: '100%',
                                        }}>
                                            <Grid item xs={12} sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Avatar alt={participant.name}
                                                        src={"img/students/" + participant.name + ".jpg"}
                                                        variant="round"
                                                        sx={{
                                                            width: 100,
                                                            height: 100,
                                                        }}
                                                />
                                                <Typography sx={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Harry Potter',
                                                    fontWeight: 'bold',
                                                    fontSize: '2rem',
                                                    letterSpacing: '0.2rem',
                                                }}>
                                                    {participant.name.split(" ")[0]}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {results.length > 0 && (time <= 30 - results[index].steps * 5) ? (
                                                    <Typography sx={{
                                                        textAlign: 'center',
                                                        fontFamily: 'Harry Potter',
                                                        fontWeight: 'bold',
                                                        fontSize: '2rem',
                                                        letterSpacing: '0.2rem',
                                                        color: `${results[index].success ? '#257007' : '#6c0b0b'}`,
                                                        animation: `${results[index].success ? 'magical-glow-durmstrang 2s infinite alternate' : 'magical-glow-fail 2s infinite alternate'}`,
                                                    }}>
                                                        0:{results[index].steps * 5 < 10 ? "0" : ""}{results[index].steps * 5}
                                                    </Typography>
                                                ) : null}
                                            </Grid>
                                            <Grid item xs={12} sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Avatar alt={participant.nameOfSacrifice}
                                                        src={"img/students/" + participant.nameOfSacrifice + ".jpg"}
                                                        variant="round"
                                                        sx={{
                                                            width: 100,
                                                            height: 100,
                                                            ...getAnimation(time, index),
                                                        }}
                                                />
                                                <Typography sx={{
                                                    textAlign: 'center',
                                                    fontFamily: 'Harry Potter',
                                                    fontWeight: 'bold',
                                                    fontSize: '2rem',
                                                    letterSpacing: '0.2rem',
                                                    ...getAnimationAndColor(time, index),
                                                }}>
                                                    {participant.nameOfSacrifice.split(" ")[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '12%',
                            }}>
                                <Typography variant="h4" sx={{
                                    mt: '1rem',
                                    color: 'black',
                                    textAlign: 'center',
                                    fontFamily: 'Harry Potter',
                                    letterSpacing: '0.2rem',
                                    height: '12%',
                                }}>
                                    ТАЙМЕР: <b>{time}</b>
                                </Typography>
                                <Button onClick={handleOpen} disabled={time !== 0} sx={{
                                    backgroundImage: `url(${Stamp})`,
                                    backgroundSize: '100% 100%',
                                    color: '#7f120c',
                                    fontFamily: 'Harry Potter',
                                    fontWeight: 'bold',
                                    fontSize: '2.125rem',
                                    letterSpacing: '0.2rem',
                                    px: '1.5rem',
                                    transform: 'rotate(-3deg)',
                                }} role="button"
                                        aria-label="ЭТАП 3➤"
                                >
                                    ЭТАП 3➤
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
            {props.participants && props.schools && props.participants.length === 4 && props.schools.length === 4 ?
                <Participants {...props} open={open} setOpen={setOpen}/> : null}
        </>
    );
}

Stage2.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        breathingMethod: PropTypes.string.isRequired,
        nameOfSacrifice: PropTypes.string.isRequired,
    })).isRequired,
    updateParticipants: PropTypes.func.isRequired,
    schools: PropTypes.arrayOf(PropTypes.string).isRequired,
};