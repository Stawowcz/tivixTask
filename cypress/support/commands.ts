Cypress.Commands.add('searchCarToRent', (country:string, city:string, model:string, pickup:string, dropoff:string):void => {
    cy.get('#country').select(country)
    cy.get('#city').select(city)
    cy.get('#model').type(model)
    cy.get('#pickup').type(pickup)
    cy.get('#dropoff').type(dropoff)
    cy.get('[type="submit"]').click()
  });

Cypress.Commands.add('fillClientPersonalData', (name:string, surname:string, cartNumber:string, email:string):void => {
    cy.get('#name').type(name)
    cy.get('#last_name').type(surname)
    cy.get('#card_number').type(cartNumber)
    cy.get('#email').type(email)
    cy.get('[type="submit"]').click()
  });

