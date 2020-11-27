describe('tests with cookies', () => {
    beforeEach(() => {

        cy.fixture('credentials.json').then(credentials => {
            cy.wrap(credentials.email).as('email')
            cy.wrap(credentials.password).as('password')
        })
        
        cy.request('DELETE', '/users')
        cy.visit('/')
        
    })

    it('register user and save token to cookie', function () {
        cy.get('[class="Nav_user Nav_button"]').first().click()
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(this.email)
        cy.get('#signupPassword').type(this.password)
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {

            const token = signUp.response.body.accessToken
            cy.setCookie('trello_token', token)
            
            cy.getCookie('trello_token').should('have.property', 'value', token)
            // or
            cy.getCookie('trello_token').its('value').then(cookieValue => {
                expect(cookieValue).to.equal(token)
            })
            
        })
    })
    
})