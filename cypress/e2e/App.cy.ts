describe("Login using keycloak (email=alice@gmail.com password=alice)'", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })

    it("Login using alice account", () => {
        cy.get("h1").should("have.text", "Minecraft (PC)")
    })
});