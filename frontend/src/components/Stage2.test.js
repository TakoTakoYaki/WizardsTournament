import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stage2 from './Stage2';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Stage2 Component', () => {
    const mockUpdateParticipants = jest.fn();
    const mockNavigate = jest.fn();

    const participants = [
        { name: 'Гарри Поттер', points: 50, breathingMethod: 'Человек-акула', nameOfSacrifice: 'Драко Малфой' },
        { name: 'Флёр Делакур', points: 60, breathingMethod: 'Аква-фильтриум', nameOfSacrifice: 'Габриэль Делакур' },
        { name: 'Виктор Крам', points: 70, breathingMethod: 'Жабросли', nameOfSacrifice: 'Гермиона Грейнджер' },
        { name: 'Рон Уизли', points: 40, breathingMethod: 'Человек-жаба', nameOfSacrifice: 'Орели Дюмон' },
    ];

    const props = {
        participants: participants,
        setParticipants: jest.fn(),
        getParticipants: jest.fn(),
        updateParticipants: mockUpdateParticipants,
        schools: ['Хогвартс', 'Шармбатон', 'Дурмстранг', 'Хогвартс'],
        setSchools: jest.fn(),
    };

    it('renders the component with correct initial state', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage2 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );

        // Проверка наличия заголовка
        expect(screen.getByText('ВТОРОЙ ЭТАП - СПАСЕНИЕ УЗНИКА')).toBeInTheDocument();

        // Проверка наличия участников
        participants.forEach(participant => {
            expect(screen.getByText(participant.name.split(" ")[0])).toBeInTheDocument();
        });

        // Проверка наличия таймера
        expect(screen.getByText('ТАЙМЕР:')).toBeInTheDocument();
    });

    it('navigates to stage 3 after timer reaches zero', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage2 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );
        waitFor(() => {
            fireEvent.click(screen.getByText('ЭТАП 3➤'));
        }, { timeout: 30000 });

        // Проверка, что навигация произошла
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/stage3'));
    });

    it('renders participants and their avatars correctly', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <MemoryRouter>
                    <Stage2 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );

        // Проверка аватаров участников и их заложников
        participants.forEach(participant => {
            const participantAvatar = screen.getByAltText(participant.name);
            expect(participantAvatar).toBeInTheDocument();

            const sacrificeAvatar = screen.getByAltText(participant.nameOfSacrifice);
            expect(sacrificeAvatar).toBeInTheDocument();
        });
    });
});