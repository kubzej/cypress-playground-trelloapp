describe('authentication tests by request', () => {
    beforeEach(() => {
        cy.request('DELETE', '/users')
        cy.cleanDB()
        cy.visit('/')
    })

    it('register user by custom command', () => {
        cy.signUp()
        cy.getCookie('is_user_registered').should('have.property', 'value', 'yes')
    })
})