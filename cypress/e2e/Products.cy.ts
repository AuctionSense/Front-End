describe("Products lenght is equal to 8'", () => {
    beforeEach(() => {
        cy.visit("/c/Games");
    })

    it("Should be loaded on page.", () => {
        cy.get('[data-testid="product-with-name"]').should("have.length", 8)
    })
});