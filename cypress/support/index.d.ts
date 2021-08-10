declare namespace Cypress {
    interface Chainable {
        fillClientPersonalData(name:string, surname:string, cartNumber:string, email:string):void
        searchCarToRent (country:string, city:string, model:string, pickup:string, dropoff:string):void
    }
  }