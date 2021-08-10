
import * as texts from '../fixtures/texts.js'

Cypress.Commands.add('searchCarToRent', (country, city, model, pickup, dropoff) => {
    cy.get('#country').select(country)
    cy.get('#city').select(city)
    cy.get('#model').type(model)
    cy.get('#pickup').type(pickup)
    cy.get('#dropoff').type(dropoff)
    cy.get('[type="submit"]').click()
  });

Cypress.Commands.add('fillClientPersonalData', (name, surname, cartNumber, email) => {
    cy.get('#name').type(name)
    cy.get('#last_name').type(surname)
    cy.get('#card_number').type(cartNumber)
    cy.get('#email').type(email)
    cy.get('[type="submit"]').click()
  });

