import * as texts from '../../fixtures/texts.js'

const rentFormLoc = '#rent_form'
const cardTextLoc = '[class=card-text]'
const searchResultsLoc = '#search-results'

function checkModel(model){
    cy.get(searchResultsLoc).find('tbody').find('tr').its('length').then((length)=>{
      for (let i = 0; i < length; i++) {
        cy.get(searchResultsLoc).find('tbody').find('tr').eq(i).find('td').eq(1)
        .should('have.text', model)
      }
    })
}

function checkValidationMessages(nameReq, lastNameReq, emailReq, cardNumberReq) {
  cy.get(rentFormLoc).find('h5').first().should('have.text', nameReq)
  cy.get(rentFormLoc).find('h5').eq(1).should('have.text', lastNameReq)
  cy.get(rentFormLoc).find('h5').eq(2).should('have.text', emailReq)
  cy.get(rentFormLoc).find('h5').last().should('have.text', cardNumberReq)
}

function checkDetails(brand, country, city, pickUpDate, dropOffDate) {
  cy.get('[class=card-header]').should('contain', brand)
  cy.get('[class=card-title]').should('have.text', texts.adamsGroup)
  cy.get(cardTextLoc).first().should('have.text', texts.pricePerDay)
  cy.get(cardTextLoc).eq(1).should('have.text', texts.location + country + ', ' + city)
  cy.get(cardTextLoc).last().should('have.text', texts.licensePlate)
  cy.get('[class=card-body]').find('h6').first().should('have.text',  texts.pickUpDate + pickUpDate)
  cy.get('[class=card-body]').find('h6').last().should('have.text',  texts.dropOffDate + dropOffDate)
}

//Scenario: Search for Mazda 3
Given('I navigate to Qualab page', () => {
    cy.visit('/')
})

When('I type in', (datatable) => {
    datatable.hashes().forEach(element => {
    cy.searchCarToRent(element.country, element.city, element.model, element.pickup, element.dropoff)
  })
})

When('I click on Search button', () => {
    cy.get('[type="submit"]').click()
})

Then('I should see only Mazda 3', (datatable) => {
    datatable.hashes().forEach(element => {
    checkModel(element.model)
    })
})

//Rent a Volkswagen Touran from Germany, Berlin and Check if Details Are Ok
Given('I navigate to Qualab page', () => {
  cy.visit('/')
})

When('I type in', (datatable) => {
  datatable.hashes().forEach(element => {
  cy.searchCarToRent(element.country, element.city, element.model, element.pickup, element.dropoff)
  })
})

When('I click on Search button', () => {
  cy.get('[type="submit"]').click()
})

When('I click on Rent button', (datatable) => {
  datatable.hashes().forEach(element => {
  cy.get(searchResultsLoc).find('tbody').find('tr').contains(element.model && element.company).parent().children().last().click()
  })
})

Then('I should see details related to this specific model', (datatable) => {
  datatable.hashes().forEach(element => {
    checkDetails(element.model, element.country, element.city, element.pickup, element.dropoff)
  })
})

When('I click on second Rent button', () => {
  cy.contains(texts.rent).click()
})

When('I fill client personal data', (datatable) => {
  datatable.hashes().forEach(element => {
    cy.fillClientPersonalData(element.name, element.surname, element.cardNumber, element.email)
  })
})

When('I click on last Rent button', () => {
  cy.get('[type="submit"]').click()
})

Then('I should see Car is rent successfully', () => {
  cy.contains(texts.successfully).should('be.visible')
})

//Check Validation Message When Client Personal Data Are Not Filled Up
Given('I navigate to Qualab page', () => {
  cy.visit('/')
})

When('I type in', (datatable) => {
  datatable.hashes().forEach(element => {
  cy.searchCarToRent(element.country, element.city, element.model, element.pickup, element.dropoff)
  })
})

When('I click on Search button', () => {
  cy.get('[type="submit"]').click()
})

When('I click on Rent button', (datatable) => {
  datatable.hashes().forEach(element => {
  cy.get(searchResultsLoc).find('tbody').find('tr').contains(element.model && element.company).parent().children().last().click()
  })
})

When('I click on second Rent button', () => {
  cy.contains(texts.rent).click()
})

When('I click on last Rent button', () => {
  cy.get('[type="submit"]').click()
})

Then('I should see validation messages', () => {
  checkValidationMessages(texts.nameReq, texts.lastNameReq, texts.emailReq, texts.cardReq)
})