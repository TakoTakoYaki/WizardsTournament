import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './Welcome';
import Logo from '../img/triwizard_logo.png';


// Мокаем useNavigate из react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Welcome Component', () => {
    it('renders the component', () => {
        render(
            <BrowserRouter>
                <Welcome />
            </BrowserRouter>
        );

        // Проверка наличия заголовка
        expect(screen.getByText('ТУРНИР ТРЁХ ВОЛШЕБНИКОВ')).toBeInTheDocument();
    });

    it('has correct styles for the title', () => {
        render(
            <BrowserRouter>
                <Welcome />
            </BrowserRouter>
        );

        const title = screen.getByText('ТУРНИР ТРЁХ ВОЛШЕБНИКОВ');
        expect(title).toHaveStyle(`
      font-family: Harry Potter;
    `);
    });

    it('has correct styles for the logo', () => {
        render(
            <BrowserRouter>
                <Welcome />
            </BrowserRouter>
        );

        const logo = screen.getByLabelText('logo');
        expect(logo).toHaveStyle(`
      backgroundImage: 'url("../img/triwizard_logo.png")',
      animation: little-magical-glow-blue 2s infinite alternate;
    `);
    });

    it('navigates to /start on logo click', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <BrowserRouter>
                <Welcome />
            </BrowserRouter>
        );

        // Найти логотип по его стилям
        const logo = screen.getByLabelText('logo');
        fireEvent.click(logo);

        expect(navigate).toHaveBeenCalledWith('/start');
    });
});
