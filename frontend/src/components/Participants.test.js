import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Participants from './Participants';

describe('Participants Component', () => {
    const mockSetOpen = jest.fn();
    const participants = [
        { name: 'Гарри Поттер', points: 100 },
        { name: 'Флёр Делакур', points: 90 },
        { name: 'Виктор Крам', points: 80 },
        { name: 'Рон Уизли', points: 70 },
    ];
    const schools = ['Хогвартс', 'Шармбатон', 'Дурмстранг', 'Хогвартс'];

    const props = {
        open: true,
        setOpen: mockSetOpen,
        participants: participants,
        schools: schools,
    };

    it('renders the component', () => {
        render(<Participants {...props} />);

        participants.forEach(participant => {
            expect(screen.getByText(participant.name)).toBeInTheDocument();
        });
    });


    it('checks for correct colors and animations in Typography elements based on school', () => {
        render(<Participants {...props} />);

        participants.forEach((participant, index) => {
            const typographyElements = screen.getAllByText(participant.name);

            typographyElements.forEach(typography => {
                const { color } = getAnimationAndColor(schools[index]);

                expect(typography).toHaveStyle(`color: ${color}`);
            });
        });
    });
});

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
        default:
            return {};
    }
};
