import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Stage1 from './Stage1';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Stage1 Component', () => {
    const mockUpdateParticipants = jest.fn();

    const participants = [
        { name: 'Гарри Поттер', points: 50, fightingMethod: 'Призыв метлы' },
        { name: 'Флёр Делакур', points: 60, fightingMethod: 'Конъюнктивитус' },
        { name: 'Виктор Крам', points: 70, fightingMethod: 'Превращение камня в собаку' },
        { name: 'Рон Уизли', points: 40, fightingMethod: 'Ввод в транс' },
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
                    <Stage1 {...props} />
                </MemoryRouter>
            </SnackbarProvider>
        );

        // Проверка наличия заголовка
        expect(screen.getByText('ПЕРВЫЙ ЭТАП - БИТВА С ДРАКОНОМ')).toBeInTheDocument();

        // Проверка наличия участников
        participants.forEach(participant => {
            expect(screen.getByText(participant.name)).toBeInTheDocument();
        });
    });
});
