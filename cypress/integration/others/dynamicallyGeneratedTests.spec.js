describe('working with dynamically generated tests', () => {
    ['Board 1', 'Board 2', 'Board 3'].forEach((board) => {
        it('creates lists', () => {
            cy.cleanDB()
            cy.visit('/')
            cy.createBoard(board)
            cy.get('.boardDetail_title').should('have.value', board)
        })
    })
})