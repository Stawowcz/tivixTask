import * as texts from '../fixtures/texts.js'

const rentFormLoc = '#rent_form'
const cardTextLoc = '[class=card-text]'


function checkModel(model){
  cy.get('#search-results').find('tbody').find('tr').its('length').then((length)=>{
    for (let i = 0; i < length; i++) {
      cy.get('#search-results').find('tbody').find('tr').eq(i).find('td').eq(1)
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

describe('Qalab Car for Rent', function() {
  beforeEach(() =>{
    cy.fixture('data').then((data) => {
      this.data = data
    }).then(() => {
    cy.visit('/')
    })
  })

  it('Search for Mazda 3', () => {
    cy.searchCarToRent(this.data.france, this.data.paris, this.data.mazda, this.data.pickup1, this.data.dropoff1)
    checkModel(this.data.mazda)
  })

  it.only('Rent a Volkswagen Touran from Germany, Berlin and Check if Details Are Ok', () => {
    cy.searchCarToRent(this.data.germany, this.data.berlin, this.data.touron, this.data.pickup2, this.data.dropoff2)
    cy.get('#search-results').find('tbody').find('tr').contains(this.data.touron && this.data.adamsGroup).parent().children().last().click()
    checkDetails(this.data.touron, this.data.germany, this.data.berlin, this.data.pickup2, this.data.dropoff2)
    cy.contains(texts.rent).click()
    cy.fillClientPersonalData(this.data.clientName, this.data.clientSurName, this.data.cartNumber, this.data.email)
    cy.contains(texts.successfully).should('be.visible')
  })

  it('Check Validation Message When Client Personal Data Are Not Filled Up', () => {
    cy.searchCarToRent(this.data.germany, this.data.berlin, this.data.touron, this.data.pickup2, this.data.dropoff2)
    cy.contains(this.data.touron).parent()
    .children()
    .last().click()
    cy.contains(texts.rent).click()
    cy.get('[type="submit"]').click()
    checkValidationMessages(texts.nameReq, texts.lastNameReq, texts.emailReq, texts.cardReq)
  })
})


