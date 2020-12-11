describe('dragndrops tests', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')
        cy.createBoard('Board')
        cy.createList('List')
    })

    it('drag task between list',() => {
        cy.createTask('Task')
        cy.createList('List 2')

        cy.get('.List_tasks').eq(0).as('firstList')
        cy.get('.List_tasks').eq(1).as('secondList')

        cy.get('@secondList').then(secondList => {
            cy.get('.Task').drag('@secondList')
            cy.wrap(secondList).find('.Task').should('exist')
            cy.get('.Task').drag('@firstList')
            cy.wrap(secondList).find('.Task').should('not.exist')
        })  
    })

    it('drag more tasks between lists', () => {
        cy.createTask('Task 1')
        cy.createTask('Task 2')
        cy.createTask('Task 3')
        cy.createList('List 2')

        cy.get('.List_tasks').eq(0).as('firstList')
        cy.get('.List_tasks').eq(1).as('secondList')

        let counter = 0
        cy.get('.Task').each(task => {
            cy.get('.Task').drag('@secondList')
            cy.get('@secondList').then(secondList => {
                counter++
                cy.wrap(secondList).find('.Task').should('have.length', counter)
            })
        })
    })
})