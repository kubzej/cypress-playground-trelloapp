function getDateFromCurrentToPast(days){
    var date = new Date()
    date.setDate(date.getDate() - days)
    var finalDate= date.getFullYear() + '-' + String(date.getMonth()).padStart(2, 0) + '-' + String(date.getDate()).padStart(2, 0)
    
    return finalDate
}

export class Task{

    changeDescription(description){
        cy.get('.TaskModule_description').click()
        cy.get('textarea').first().type(description)
        cy.contains('Save').click()
    }

    changeDateToPast(days){
        const finalDate = getDateFromCurrentToPast(days)
        cy.get('[type="date"]').invoke('prop', 'value', finalDate)
        
    }
}

export const onTask = new Task()