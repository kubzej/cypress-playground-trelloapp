describe('other tests', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')
    })

    it('retries test and fail at the end',{
        "retries": {
            "runMode": 2,
            "openMode": 2
        }
    }, () => {
        cy.get('XXX')
    })

    it('it tries to to get item with 10s timeout', () => {
        cy.get('XXX', {timeout: 10000})
    })

    it('using destructuring', () => {
        cy.request('POST', '/api/boards', {"name":"XXX Board"}).as('req')
        cy.get('@req').then( ({ statusText, status, body }) =>  {
            expect(statusText).to.equal('Created')
            expect(status).to.equal(201)
            expect(body.name).to.equal('XXX Board')
        })
    })
})