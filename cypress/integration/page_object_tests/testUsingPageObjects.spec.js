import { onBoard } from "../../support/page_objects/board"
import { onHomepage } from "../../support/page_objects/homepage"
import { onTask } from "../../support/page_objects/task"

describe('tests made with page objects', () => {
    
    beforeEach(() => {
        cy.cleanDB()
        cy.visit('/')
    })

    it('creates new board', () => {
        onHomepage.createNewBoard('Testing board')
        cy.get('.boardDetail_title').should('have.value', 'Testing board')
    })

    it('creates base lists to board', () => {
        cy.createBoard('Testing board')
        var namesOfLists = ['TO DO', 'IN PROGRESS', 'DONE'] 
        var name
        for (name of namesOfLists){
            onBoard.createNewList(name)
            cy.get('.taskTitle').last().should('have.value', name)

        }
    })

    it('removes all lists from board', () => {
        cy.createBoard('Testing board')
        for (var i=0; i < 3; i++) {
            cy.createList('Testing list')
        }
        onBoard.deleteAllLists()
        cy.contains('Testing list').should('not.exist')

    })

    it('changes description and date of task', () => {
        cy.createBoard('Testing board')
        cy.createList('Testing list')
        cy.createTask('Testing task')
        cy.get('.Task').then(task => {
            cy.wrap(task).click()

            // change and check of description
            const description = 'This is description'
            onTask.changeDescrxiption(description)
            cy.get('.TaskModule_description').should('contain', description)
            
            // change and check of date
            const days = Math.floor(Math.random() * 100)
            onTask.changeDateToPast(days)
            var date = new Date()
            date.setDate(date.getDate() - days)
            var assertDate = date.getFullYear() + '-' + String(date.getMonth()).padStart(2, 0) + '-' + String(date.getDate()).padStart(2, 0)
            cy.get('[type="date"]').should('have.value', assertDate)
        })
        
    })
})