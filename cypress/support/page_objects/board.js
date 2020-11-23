
export class Board{

    createNewList(name) {
        cy.get('.CreateList_input').type(name + '{enter}', {force: true})
    }

    deleteAllLists() {
        cy.get('.ListContainer .dropdown').each( list => {
            cy.wrap(list).click({force: true})
            cy.contains('Delete list').click()
        })
    }

}


export const onBoard = new Board()