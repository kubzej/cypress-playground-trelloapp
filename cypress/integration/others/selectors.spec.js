describe('working with selectors', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('gets elements by different type of selectors', () => {

        // by tag
        cy.get('h1')

        // by ID
        cy.get('#new-board')

        // by class name
        cy.get('.board_title')

        // by attribute 
        cy.get('[placeholder]')

        // by custom command getDataCy which is selecting data-cy attribute
        cy.getDataCy('create-board')

        // by text
        cy.contains('My Boards')

    })

    it('gets elements by combination of selectors', () => {
        
        // by attribute name and value
        cy.get('[placeholder="Create a board..."]')

        // by tag name and class name
        cy.get('h1.background_title')

        // by 2 different attributes
        cy.get('[id="new-board"][data-cy="create-board"]')

        // by tag and attribute names and value
        cy.get('input[placeholder="Create a board..."]')

        // by selector and text
        cy.contains('.board_title', 'Create a board...')
    })

    it('gets elements childs/parents', () => {

        // by get and find
        cy.get('#new-board').find('.board_title')

        // element which is one level under
        cy.get('.background_container > .board')

        // element which is one level under and has text
        cy.get('.background_container > .background_title').contains('My Boards')

        // first element by first()
        cy.get('.background_container h1').first()

        // second element by eq()
        cy.get('.background_container h1').eq(1)

        // last element by last()
        cy.get('.background_container h1').last()

        // immediately following sibling
        cy.get('.background_container > .board').next()

        // immediately previous sibling
        cy.get('.board_addBoard').prev()

        // 1 element which pass the filter
        cy.get('h1').filter('.board_title')

        // 1 element which pass the filter
        cy.get('h1').not('.background_title')
    })

})