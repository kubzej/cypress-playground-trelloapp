describe('authentication tests by UI', () => {
    beforeEach(() => {
        cy.request('DELETE', '/users')

        cy.fixture('credentials.json').then(credentials => {
            cy.wrap(credentials.email).as('email')
            cy.wrap(credentials.invalid_email).as('invalid_email')
            cy.wrap(credentials.non_existing_email).as('non_existing_email')
            cy.wrap(credentials.password).as('password')
            cy.wrap(credentials.short_password).as('short_password')
            cy.wrap(credentials.wrong_password).as('wrong_password')
        })

        cy.visit('/')
        cy.get('[class="Nav_user Nav_button"]').first().click()
        
    })

    it('registration - happy path', function() {
        
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(this.email)
        cy.get('#signupPassword').type(this.password)
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(201)
        })
    })

    it('registration - invalid email', function() {
        
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(this.invalid_email)
        cy.get('#signupPassword').type(this.password)
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(400)
            expect(signUp.response.body).to.contain('Email format is invalid')
        })
    })

    it('registration - short password', function() {
        
        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(this.email)
        cy.get('#signupPassword').type(this.short_password)
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(400)
            expect(signUp.response.body).to.contain('Password is too short')
        })
    })

    it('registration - already existing user', function() {
        
        cy.request('POST', '/signup', {
            "email": this.email,
            "password": this.password
          })

        cy.contains('Sign up here').click()
        cy.get('#signupEmail').type(this.email)
        cy.get('#signupPassword').type(this.password)
        cy.intercept('POST', '/signup').as('signUp')
        cy.get('button').eq(1).click()
        cy.wait('@signUp').then(signUp => {
            expect(signUp.response.statusCode).to.equal(400)
            expect(signUp.response.body).to.contain('Email already exists')
        })
    })

    it('login - happy path', function () {
        
        cy.request('POST', '/signup', {
            "email": this.email,
            "password": this.password
          })

        cy.get('#loginEmail').type(this.email)
        cy.get('#loginPassword').type(this.password)
        cy.intercept('POST', '/login').as('login')
        cy.get('button').eq(0).click()
        cy.wait('@login').then(login => {
            expect(login.response.statusCode).to.equal(200)
        })
    })

    it('login - non-existing email', function () {
        
        cy.get('#loginEmail').type(this.email)
        cy.get('#loginPassword').type(this.password)
        cy.intercept('POST', '/login').as('login')
        cy.get('button').eq(0).click()
        cy.wait('@login').then(login => {
            expect(login.response.statusCode).to.equal(400)
            expect(login.response.body).to.contain('Cannot find user')
        })
    })

    it('login - wrong password', function () {
        
        cy.request('POST', '/signup', {
            "email": this.email,
            "password": this.password
          })

        cy.get('#loginEmail').type(this.email)
        cy.get('#loginPassword').type(this.wrong_password)
        cy.intercept('POST', '/login').as('login')
        cy.get('button').eq(0).click()
        cy.wait('@login').then(login => {
            expect(login.response.statusCode).to.equal(400)
            expect(login.response.body).to.contain('Incorrect password')
        })
    })
})