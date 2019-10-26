context("GameTest", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/')
    })

    it("AllowsSignUp", () => {
        //Grabs the name and password input fields and input:
        //name: CypressTestName - Password: CypressTestPassword
        cy.get("#userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get("#password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
        cy.url().should("contain", "app")
    })

    it("AllowsSignIn", () => {
        cy.get("#userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get("#password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
        cy.url().should("contain", "app")
    })

    it("RefusesWrongPasswords", () => {
        cy.get("#userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get("#password")
            .type("VeryWrongPassword")
            .should('have.value', "VeryWrongPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "Invalid credentials")
    })

    it("RefusesEmptyname", () => {
        cy.get("#password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "Username can not be empty")
    })

    it("RefusesEmptyPassword", () => {
        cy.get("#userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get(".loginForm").submit()
            .next().should('contain', "Password can not be empty")
    })
})