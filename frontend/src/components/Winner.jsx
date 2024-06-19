import {Typography, Box, Grow, Avatar} from "@mui/material";
import React from 'react';
import PropTypes from 'prop-types';

export default function Winner(props) {
    const participant = props.winner >= 0 ? props.participants[props.winner] : props.participants[0];

    return (
        <Grow in={true} timeout={{enter: 1000, exit: 1000}}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h2" sx={{
                    textAlign: 'center',
                    fontFamily: 'Harry Potter',
                    letterSpacing: '0.2rem',
                    ...getAnimationAndColor(participant.school)
                }}>
                    ВСТРЕЧАЙТЕ ПОБЕДИТЕЛЯ!
                </Typography>
                <Box sx={{
                    mt: 5,
                    ...getAnimationAndColor(participant.school)
                }}>
                    <Avatar alt={participant.name} src={"img/students/" + participant.name + ".jpg"}
                            variant="square"
                            sx={{
                                width: 500,
                                height: 500,
                                borderRadius: '10px',
                            }}
                    />
                    <Box sx={{
                        backgroundImage: `url(img/schools/${participant.school}.png)`,
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
                        ...getAnimationAndColor(participant.school)
                    }}>
                        {participant.points}
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
                        ...getAnimationAndColor(participant.school)
                    }}>
                        {participant.name}
                    </Typography>
                </Box>
            </Box>
        </Grow>
    );
}

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

Winner.propTypes = {
    winner: PropTypes.number,
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        school: PropTypes.string.isRequired,
    })).isRequired,
};
