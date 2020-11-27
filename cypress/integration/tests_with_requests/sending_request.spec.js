describe('tests using request() method', () => {
    beforeEach(() => {
        cy.cleanDB()
    })

    it('creates board by request', () => {
        // uses configuration 'baseUrl' url as a host
        cy.request('POST', '/api/boards', {"name":"XXX Board"})
        
        
        // uses cy.visit() url as a host
        cy.visit('/')
        cy.request('POST', '/api/boards', {"name":"XXX Board"}).then(req => {
            cy.get('.board_item').then(boards => {
                cy.wrap(boards).each((board) => {
                    expect(board).to.contain('XXX Board')
                })
            })
        })
    })

    it('asserts request using its() method', () => {
        cy.visit('/')
        cy.request('POST', '/api/boards', {"name":"XXX Board"}).its('status').should('equal', 201)
        cy.request('POST', '/api/boards', {"name":"XXX Board"}).its('body').then(body => {
            expect(body.name).to.equal('XXX Board')
        })
    })

    it('asserts request using alias and should()', () => {
        cy.visit('/')
        cy.request('POST', '/api/boards', {"name":"XXX Board"}).as('req')
        cy.get('@req').should((response) => {
            console.log(response)
            expect(response.statusText).to.equal('Created')
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal('XXX Board')
        })
    })
})