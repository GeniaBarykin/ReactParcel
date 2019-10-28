context("HallOfFameTest", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/')
        cy.get("#userName")
            .type("CypressTestName")

        cy.get("#password")
            .type("CypressTestPassword")

        cy.get("#loginForm").submit()
        cy.get('#listWrapper')
        cy.visit('http://localhost:5000/hall')
    })

    it("Highlights current user", ()=>{
        cy.get("#name").then(($name) => {
            const name = $name.text()
            cy.get("#currentUser").should(($btn2) => {
                expect($btn2.text()).contain(name)
            })
        })
    })

    it("Orders the list", ()=>{
        cy.get('ul>li').each(($el, index, $list) => {
            cy.get($el).invoke("attr", "value").then(($ele) => {
                var score = $ele
                if(cy.get($el).index<$list.length) {
                    cy.get($el)
                        .next()
                        .invoke("attr", "value").then(($el2) => {
                        expect(parseInt($el2) - 1).to.be.lessThan(parseInt(score))
                    })
                }
            })
        })
    })
    it("Allows logout", ()=>{
        cy.get(".buttonOverlay")
            .click()
        cy.url().should("eq", "http://localhost:5000/")
    })
})