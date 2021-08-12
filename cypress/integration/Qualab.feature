Feature: Qualab
    I want to search for mazda 3

    Scenario: Search for Mazda 3
    Given I navigate to Qualab page
    When  I type in
            | country | city | model  |   pickup  |  dropoff  |
            | France  | Paris| Mazda 3| 2021-08-20| 2021-08-30|
    And   I click on Search button
    Then  I should see only Mazda 3
            | model   | 
            | Mazda 3 |

    Scenario: Rent a Volkswagen Touran from Germany, Berlin and Check if Details Are Ok
    Given I navigate to Qualab page
    When  I type in 
            | country | city  |       model      |   pickup  |  dropoff  |
            | Germainy| Berlin| Volkswagen Touran| 2021-08-20| 2021-08-30|
    And   I click on Search button        
    And   I click on Rent button
            |       model      |   company  |
            | Volkswagen Touran| Adams Group|
    Then  I should see details related to this specific model
            |        model      | country | city   |   pickup   | dropoff |            
            | Volkswagen Touran | Germainy| Berlin | 2021-08-20 | 2021-08-30|
    When  I click on second Rent button
    And   I fill client personal data  
            |  name | surname   |   cardNumber   |     email       |           
            | Jakub | Stawowczyk|1111111111111111| jakub@Gmail.com |
    And   I click on Rent button
    Then  I should see Car is rent successfully

    Scenario: Check Validation Message When Client Personal Data Are Not Filled Up
    Given I navigate to Qualab page
    When  I type in 
            | country | city  |       model      |   pickup  |  dropoff  |
            | Germainy| Berlin| Volkswagen Touran| 2021-08-20| 2021-08-30|
    And   I click on Search button        
    And   I click on Rent button
            |       model      |   company  |
            | Volkswagen Touran| Adams Group|
    And   I click on second Rent button
    And   I click on Rent button
    Then  I should see validation messages



