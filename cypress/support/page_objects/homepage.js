
export class Homepage{

    createNewBoard(name) {

        // cy.get('[data-cy="create-board"] input').type(`${name}` + '{enter}', {force: true})

        cy.get('[data-cy=create-board]').then(boardItem => {
            cy.wrap(boardItem).click()
            cy.wrap(boardItem).find('input').type(name)
            cy.wrap(boardItem).find('button').click()
        })
    }

}


export const onHomepage = new Homepage()