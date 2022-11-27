describe("Login using keycloak (email=alice@gmail.com password=alice)'", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it("Login using alice account", () => {
        cy.get('[data-testid="login-button"]').click();
        cy.get('[id="username"]').type(Cypress.env('CYPRESS_USERNAME'));
        cy.get('[id="password"]').type(Cypress.env('CYPRESS_PASSWORD'));
        cy.get('[id="kc-login"]').click();
    })
});