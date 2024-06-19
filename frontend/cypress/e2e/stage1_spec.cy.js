describe('Intercept and modify backend request', () => {
    beforeEach(() => {
        cy.visit('/');
        let resq = false;

        // Intercept the API call
        cy.intercept('POST', 'http://localhost:8080/api/participants/update', (req) => {
            if (!resq && Array.isArray(req.body) && req.body.length > 0) {
                req.body[0].points = 80;
                resq = true;
            }
            req.continue();
            console.log(req);
        }).as('updateParticipant');
    });

    const performBattleSteps = () => {
        cy.get('div[aria-label="versus"]').click();
    };
    it('should intercept the API call and modify the response', () => {
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
