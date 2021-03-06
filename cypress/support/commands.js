// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getDataCy', (input) => {
    cy.get(`[data-cy=${input}]`)
  })
  
Cypress.Commands.add('cleanDB', () => {
  cy.request('DELETE', '/boards')
})

Cypress.Commands.add('createBoard', (name) => {
  cy.get('[data-cy="create-board"] input').type(`${name}` + '{enter}', {force: true})
})

Cypress.Commands.add('createList', (name) => {
  cy.get('.CreateList_input').type(name + '{enter}', {force: true})
})

Cypress.Commands.add('createTask', (name) => {
  cy.get('[data-id="newTaskTitle"]').type(name + '{enter}', {force: true})
})

Cypress.Commands.add('signUp', () => {
  cy.request('POST', '/signup', {
    "email": "test@test.com",
    "password": "password"
  }).then(req => {
    cy.setCookie('trello_token', req.body.accessToken)
    cy.setCookie('is_user_registered', 'yes')
  })
})