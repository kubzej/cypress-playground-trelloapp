import { onHomepage } from "../../support/page_objects/homepage"

describe('tests made with page objects', () => {
    
    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')
    })

    it('should create new board', () => {
        onHomepage.createNewBoard('Testing board')
        cy.get('.boardDetail_title').should('have.value', 'Testing board')
    })

    it('should create base lists to board', () => {
        onHomepage.createNewBoard('Testing board')
        var namesOfLists = ['TO DO', 'IN PROGRESS', 'DONE'] 
        var name
        for (name of namesOfLists){
            onHomepage.createNewList(name)
            cy.get('.taskTitle').last().should('have.value', name)

        }
        
        
    })

})