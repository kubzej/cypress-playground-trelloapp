describe('other tests', () => {
    beforeEach(() => {
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
})