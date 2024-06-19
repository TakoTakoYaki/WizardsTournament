import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Импортируем для использования toBeInTheDocument
import { BrowserRouter } from 'react-router-dom';
import Start from './Start';

// Мокаем необходимые зависимости
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Start Component', () => {
    const mockSetSchools = jest.fn();
    const mockSetParticipants = jest.fn();
    const props = {
        setSchools: mockSetSchools,
        setParticipants: mockSetParticipants,
        participants: [],
        schools: [],
    };

    it('renders the component', () => {
        render(
            <BrowserRouter>
                <Start {...props} />
            </BrowserRouter>
        );

        expect(screen.getByText('СПИСОК ЖЕЛАЮЩИХ УЧАСТВОВАТЬ')).toBeInTheDocument();
    });
});