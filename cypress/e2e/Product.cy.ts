describe("Product h1 name should equal to 'Minecraft (PC)'", () => {
    beforeEach(() => {
        cy.visit("/c/Games/Minecraft%20(PC)");
    })

    it("Should be loaded on page.", () => {
        cy.get('[data-testid="product-name"]').should("have.text", "Minecraft (PC)")
    })
});