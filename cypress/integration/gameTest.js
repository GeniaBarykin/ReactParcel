context("GameTest", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/login')
    })

    it("AllowsSignUp", () => {
        //Grabs the name and password input fields and input:
        //name: CypressTestName - Password: CypressTestPassword
        cy.get(".userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get(".password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "CypressTestName")
    })

    it("AllowsSignIn", () => {
        cy.get(".userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get(".password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "CypressTestName")
    })

    it("RefusesWrongPasswords", () => {
        cy.get(".userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get(".password")
            .type("VeryWrongPassword")
            .should('have.value', "VeryWrongPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "Invalid password")
    })

    it("RefusesEmptyname", () => {
        cy.get(".password")
            .type("CypressTestPassword")
            .should('have.value', "CypressTestPassword")

        cy.get(".loginForm").submit()
            .next().should('contain', "Invalid password")
    })

    it("RefusesEmptyPassword", () => {
        cy.get(".userName")
            .type("CypressTestName")
            .should('have.value', "CypressTestName")

        cy.get(".loginForm").submit()
            .next().should('contain', "Invalid password")
    })

})