import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stage3 from './Stage3';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Stage3 Component', () => {
    const mockGetParticipants = jest.fn();
    const mockSetWinner = jest.fn();
    const mockNavigate = jest.fn();

    const participants = [
        { name: 'Гарри Поттер', points: 50 },
        { name: 'Флёр Делакур', points: 60 },
        { name: 'Виктор Крам', points: 70 },
        { name: 'Рон Уизли', points: 40 },
    ];

    const props = {
        participants: participants,
        getParticipants: mockGetParticipants,
        setWinner: mockSetWinner,
        winner: undefined,
        schools: ['Хогвартс', 'Шармбатон', 'Дурмстранг', 'Хогвартс'],
    };

    it('renders the component with correct initial state', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage3 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );

        // Проверка наличия заголовка
        expect(screen.getByText('ФИНАЛ - ЛАБИРИНТ')).toBeInTheDocument();

        // Проверка наличия участников
        participants.forEach(participant => {
            expect(screen.getByText(participant.name.split(" ")[0])).toBeInTheDocument();
        });
    });

    it('navigates to winner page after handleOpen is called', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage3 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );
        waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: "ИТОГИ ТУРНИРА➤" }));
        }, { timeout: 30000 });
        // Устанавливаем победителя

        // Проверка, что навигация произошла
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/winner'));
    });

    it('displays events for each participant', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage3 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );

        // Эмулируем создание событий для участников
        waitFor(() => {
            participants.forEach(participant => {
                expect(screen.getByText(`${participant.name} заходит в лабиринт`)).toBeInTheDocument();
            });
        });
    });

});
