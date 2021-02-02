
describe('tests using app actions', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('show login modal', () => {
        cy.window().then( ({app}) => {
            console.log(app)
            app.showLoginModule = true
        })
    })

})