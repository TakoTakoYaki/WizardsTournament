describe('Triwizard Tournament End-to-End Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const performBattleSteps = () => {
        cy.get('div[aria-label="versus"]').click();
    };

    it('should navigate through the entire tournament', () => {
        // Welcome Page
        cy.contains('ТУРНИР ТРЁХ ВОЛШЕБНИКОВ');
        cy.get('div[aria-label="logo"]').click();

        cy.get('tbody').should('not.be.empty');

        // Ожидание завершения запроса и небольшой задержки
        cy.contains('ЖЕРЕБЬЕВКА➤').click();
        cy.wait(2000);
        cy.get('body').type('{esc}');

        // Stage 1 Page
        cy.contains('ПЕРВЫЙ ЭТАП - БИТВА С ДРАКОНОМ');
        cy.wait(2000);
        cy.get('img').should('be.visible');
        performBattleSteps();
        for (let i = 0; i < 3; i++) {
            cy.contains('СЛЕД. БИТВА➤').click();
            performBattleSteps();
        }
        cy.contains('ЭТАП 2➤').click();
        cy.wait(2000);
        cy.get('body').type('{esc}');

        // Stage 2 Page
        cy.contains('ВТОРОЙ ЭТАП - СПАСЕНИЕ УЗНИКА');
        cy.wait(31000);
        cy.contains('ЭТАП 3➤').should('not.be.disabled').click();

        cy.wait(2000);
        cy.get('body').type('{esc}');

        // Stage 3 Page
        cy.contains('ФИНАЛ - ЛАБИРИНТ');
        cy.wait(21000);
        cy.contains('ИТОГИ ТУРНИРА➤').should('not.be.disabled').click();

        // Winner Page
        cy.contains('ВСТРЕЧАЙТЕ ПОБЕДИТЕЛЯ!');
    });
});
