import {Typography, Box, Modal, Grid, Avatar, Slide} from "@mui/material";
import {useEffect, useState} from "react";
import React from 'react';
import PropTypes from 'prop-types';

export default function Participants(props) {
    const [slideIn, setSlideIn] = useState(true);

    useEffect(() => {
        if (!slideIn) {
            setTimeout(() => props.setOpen(false), 1000);
        }
    }, [slideIn]);

    return (
        <Modal open={props.open} onClose={() => setSlideIn(false)} sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Grid container spacing={5} sx={{
                width: '772px',
            }}>
                <Slide in={slideIn} direction="right" timeout={{enter: 1000, exit: 1000}}>
                    <Grid item xs={6}>
                        <Item participants={props.participants} schools={props.schools} index={0}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="left" timeout={{enter: 1000, exit: 1000}}>
                    <Grid item xs={6}>
                        <Item participants={props.participants} schools={props.schools} index={1}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="right" timeout={{enter: 1000, exit: 1000}}>
                    <Grid item xs={6}>
                        <Item participants={props.participants} schools={props.schools} index={2}/>
                    </Grid>
                </Slide>
                <Slide in={slideIn} direction="left" timeout={{enter: 1000, exit: 1000}}>
                    <Grid item xs={6}>
                        <Item participants={props.participants} schools={props.schools} index={3}/>
                    </Grid>
                </Slide>
            </Grid>
        </Modal>
    );
}

Participants.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
    })).isRequired,
    schools: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const getAnimationAndColor = (school) => {
    switch (school) {
        case "Хогвартс":
            return {
                animation: 'magical-glow-hogwarts 2s infinite alternate',
                color: '#5d4e16'
            };
        case "Шармбатон":
            return {
                animation: 'magical-glow-beauxbatons 2s infinite alternate',
                color: '#1a3f8a'
            };
        case "Дурмстранг":
            return {
                animation: 'magical-glow-durmstrang 2s infinite alternate',
                color: '#257007'
            };
    }
}

function Item(props) {
    return (
        <Box sx={{
            ...getAnimationAndColor(props.schools[props.index])
        }}>
            <Avatar alt={props.participants[props.index].name} src={"img/students/" + props.participants[props.index].name + ".jpg"}
                    variant="square"
                    sx={{
                        width: 350,
                        height: 350,
                        borderRadius: '10px',
                    }}
            />
            <Box sx={{
                backgroundImage: `url(img/schools/${props.schools[props.index]}.png)`,
                backgroundSize: '100% 100%',
                width: '100px',
                height: '100px',
                position: 'absolute',
                top: '-20px',
                left: '-20px',
            }}/>
            <Typography variant="h3" sx={{
                textAlign: 'right',
                fontFamily: 'Harry Potter',
                fontWeight: 'bold',
                letterSpacing: '0.2rem',
                position: 'absolute',
                top: '10px',
                right: '10px',
                ...getAnimationAndColor(props.schools[props.index])
            }}>
                {props.participants[props.index].points}
            </Typography>
            <Typography sx={{
                textAlign: 'center',
                fontFamily: 'Harry Potter',
                fontWeight: 'bold',
                fontSize: '2.7rem',
                letterSpacing: '0.2rem',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                ...getAnimationAndColor(props.schools[props.index])
            }}>
                {props.participants[props.index].name}
            </Typography>
        </Box>
    );
}

Item.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
    })).isRequired,
    schools: PropTypes.arrayOf(PropTypes.string).isRequired,
    index: PropTypes.number.isRequired,
};