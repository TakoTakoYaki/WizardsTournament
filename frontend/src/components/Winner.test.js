import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Winner from './Winner';
import { SnackbarProvider } from 'notistack';

describe('Winner Component', () => {
    const participants = [
        { name: 'Гарри Поттер', points: 50, school: 'Хогвартс' },
        { name: 'Флёр Делакур', points: 60, school: 'Шармбатон' },
        { name: 'Виктор Крам', points: 70, school: 'Дурмстранг' },
        { name: 'Рон Уизли', points: 40, school: 'Хогвартс' },
    ];

    const props = {
        winner: 0,
        participants: participants,
    };

    it('renders the title correctly', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <Winner {...props} />
            </SnackbarProvider>
        );

        // Проверка наличия заголовка
        expect(screen.getByText('ВСТРЕЧАЙТЕ ПОБЕДИТЕЛЯ!')).toBeInTheDocument();
    });

    it('renders the winner\'s image and name correctly', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <Winner {...props} />
            </SnackbarProvider>
        );

        const participant = participants[0];

        // Проверка наличия картинки победителя
        const winnerImage = screen.getByAltText(participant.name);
        expect(winnerImage).toBeInTheDocument();
        expect(winnerImage).toHaveAttribute('src', `img/students/${participant.name}.jpg`);

        // Проверка наличия имени победителя
        expect(screen.getByText(participant.name)).toBeInTheDocument();
    });
});
