describe('tests using stubbing', () => {

    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')
        
    })

    it('stubs app with created board using fixtures', () => {
        cy.intercept('GET', '/api/boards', {fixture: 'board.json'}).as('req')
        cy.reload()
        cy.wait('@req')
        cy.get('.board_item').should('contain', 'Testing Board')
    })

    it('stubs status reponse 500 when creating new board ', () => {
        cy.intercept('POST', '/api/boards', {statusCode: 500}).as('req')
        cy.createBoard('Testing Board')
        cy.wait('@req')
        cy.get('#errorMessage').should('contain', 'There was an error creating board')
    })

    it('stubs empty dashboard', () => {
        cy.createBoard('Testing Board')
        cy.intercept('/api/boards', {}).as('req')
        cy.contains('My Boards').click()
        cy.wait('@req')
        cy.contains('Testing Board').should('not.exist')
    })

    it('gets id of newly created board', () => {
        cy.intercept('POST', '/api/boards').as('newBoard')
        cy.createBoard('Testing Board')
        cy.wait('@newBoard').then(xhr => {
            console.log(xhr)
            expect(xhr.request.body.name).to.equal('Testing Board')
            expect(xhr.response.statusCode).to.equal(201)
            
            const id = xhr.response.body.id
            cy.url().should('contains', id)
            
        })
    })
})