describe('tests using boardID set in beforeEach hook', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')

        cy.request('POST', '/api/boards', {"name":"Testing Board"}).its('body').then(body => {
            cy.wrap(body.id).as('boardID')
        })
    })

    it('gets id only when it is not an arrow function', function () {
        // need to use the regular function () {} syntax
        cy.log(this.boardID)
    })
})