describe('tests using boardID set in beforeEach hook', () => {
    beforeEach('create board and get its ID', () => {
        cy.cleanDB()
        cy.visit('/')

        cy.request('POST', '/api/boards', {"name":"Testing Board"}).its('body').then(body => {
            cy.wrap(body.id).as('boardID')
        })
    })

    it('gets id only when it is not an arrow function', function () {
        // need to use the regular function () {} syntax
        cy.log(this.boardID)
    })

    it('delete board by boardID', function () {
    
        cy.request('DELETE', '/api/boards/' + this.boardID)
        cy.get('.board_item').should('not.exist')
        
    })

    it('stubs list to board', function () {
        cy.intercept('api/boards/' + this.boardID, {
            "name": "Testing Board",
            "user": 0,
            "id": this.boardID,
            "starred": false,
            "created": "2020-11-27",
            "lists": [
              {
                "boardId": this.boardID,
                "title": "List 1",
                "id": 22860429193,
                "created": "2020-11-27"
              }
            ],
            "tasks": []
          }).as('board')
        cy.get('.board_item').click()
        cy.wait('@board').then(xhr => {
            expect(xhr.response.body.lists[0].boardId).to.equal(this.boardID)
        })
    })

    it('stubs 3 lists to board using fixture with corret boardIds', function () {
        cy.fixture('boardWithList').then(fxt => {
            fxt.id = this.boardID
            cy.wrap(fxt.lists).each((list) => {
                list.boardId = this.boardID
            })
            
            cy.intercept('api/boards/' + this.boardID, fxt).as('board')
            cy.get('.board_item').click()
            cy.wait('@board').then(xhr => {
            cy.wrap(xhr.response.body.lists).should('have.length', 3)
        })
        })
        
    })

})