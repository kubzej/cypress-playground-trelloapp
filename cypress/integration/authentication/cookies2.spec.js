describe('setting cookie for each test', () => {
    before(() => {
        cy.setCookie('testCookie', 'cookieValue')
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('testCookie')

        cy.visit('/')
    })

    it('should have set cookie', () => {
        cy.getCookie('testCookie').should('have.property', 'value', 'cookieValue')
    })

    it('should also have set cookie', () => {
        cy.getCookie('testCookie').should('have.property', 'value', 'cookieValue')
    })
})