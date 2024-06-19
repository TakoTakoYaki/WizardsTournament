import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

describe('App Component', () => {
    it('renders Welcome component by default', () => {
        render(
            <SnackbarProvider maxSnack={4} hideIconVariant>
                <App />
            </SnackbarProvider>
        );

        // Проверка наличия заголовка Welcome компонента
        expect(screen.getByText('ТУРНИР ТРЁХ ВОЛШЕБНИКОВ')).toBeInTheDocument();
    });
});
