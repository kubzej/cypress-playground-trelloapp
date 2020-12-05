describe('Auth tests using environment variables', () => {
    beforeEach(() => {
        cy.request('DELETE', '/users')
        cy.visit('/')
        cy.get('[class="Nav_user Nav_button"]').first().click()
    })

    it('registration - happy path', function() {
        
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(Cypress.env('email'))
        cy.get('#signupPassword').type(Cypress.env('password'))
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(201)
        })
    })

    it('registration - invalid email', function() {
        
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(Cypress.env('invalid_email'))
        cy.get('#signupPassword').type(Cypress.env('password'))
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(400)
            expect(signUp.response.body).to.contain('Email format is invalid')
        })
    })
})