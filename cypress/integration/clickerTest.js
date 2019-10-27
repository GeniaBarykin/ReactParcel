context("GameTest", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/')
        cy.get("#userName")
            .type("CypressTestName")

        cy.get("#password")
            .type("CypressTestPassword")

        cy.get("#loginForm").submit()
        cy.visit("http://localhost:5000/game")
        })


    it("Counts clicks", () => {
        cy.get('#clickerButton').then(($btn) => {
            const before = $btn.text()

            cy.get('#clickerButton').click()

            cy.get('#clickerButton').should(($btn2) => {
                expect($btn2.text()).not.to.eq(before)
            })
        })
    })
    it("Allows logout", ()=>{
        cy.get(".buttonOverlay")
            .click()
        cy.url().should("eq", "http://localhost:5000/")
    })
})