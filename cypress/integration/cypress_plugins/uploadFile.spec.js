it('upload a file into task', () => {
    cy.visit('/')
    cy.createBoard('Board')
    cy.createList('List')
    cy.createTask('Task')

    cy.get('.Task').click()
    cy.get('input[type="file"]').attachFile('imageplaceholder.jpg')
})