import {before,Given,When,And,Then} from "cypress-cucumber-preprocessor/steps";
var token = "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";
var baseUrl = `https://api.github.com`;

// Create A repo

Given("Make a post request with the resource '{word}'",(Resource)=>{
    cy.request({
        method:"POST",
        url:baseUrl+Resource,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        header:"application/json",
        body:{
            name: 'Api-Testing-Repo',
            description: 'This is your first repo!',
        }
    }).then((response) => {
        Cypress.env("StatusCode", response.status);
        let body = JSON.parse(JSON.stringify(response.body))
        Cypress.env('MyResponse',JSON.stringify(body));
    });
})
When("Print the response in console",()=>{
    cy.log(Cypress.env("MyResponse"));
})
Then("Store Necessary data in the variable",()=>{
    Cypress.env("RepoName",(JSON.parse(Cypress.env("MyResponse")).name));  
})
And("The response status code should be '{word}'",(StatusCode)=>{
    const sta = +(Cypress.env("StatusCode"));
    expect(sta).to.eql(+StatusCode)
})
Then("Check Wether the RepoName is stored in variable '{word}'",(Repo)=>{
    expect(Cypress.env("RepoName")).to.eql(Repo)
})

// Update the name of the repo

Given("Make a patch request with resource '{word}'", (Resource) => {
    cy.request({
      method: "PATCH",
      url: baseUrl + Resource,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      header: "application/json",
      body: {
        name: "Updated-Repo-Testing",
      },
    }).then((response) => {
      Cypress.env("StatusCode", response.status);
      let body = JSON.parse(JSON.stringify(response.body));
      Cypress.env("MyResponse", JSON.stringify(body));
    });
  });
  When("Print the response in console", () => {
    cy.log(Cypress.env("MyResponse"));
  });
  Then("Store Necessary data in the variable", () => {
    Cypress.env("RepoName", JSON.parse(Cypress.env("MyResponse")).name);
  });
  And("The response status code should be '{word}'", (StatusCode) => {
    const sta = +Cypress.env("StatusCode");
    expect(sta).to.eql(+StatusCode);
  });
  Then("Check the Updated RepoName '{word}'", (Repo) => {
    expect(Cypress.env("RepoName")).to.eql(Repo);
    cy.log(Repo);
  });
//    Get Repo
Given("Make a GET request with resource '{word}'", (Resource) => {
    cy.request({
      method: "GET",
      url: baseUrl + Resource + Cypress.env("RepoName"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      header: "application/json",
    }).then((response) => {
      Cypress.env("StatusCode", response.status);
      let body = JSON.parse(JSON.stringify(response.body));
      Cypress.env("MyResponse", JSON.stringify(body));
    });
  });
  Then("Print the response in console", () => {
    cy.log(Cypress.env("MyResponse"));
  });
  Then("The response status code should be '{word}'", (StatusCode) => {
    const sta = +Cypress.env("StatusCode");
    expect(sta).to.eql(+StatusCode);
  });
  
//   Create File Content

Given("Make a PUT request with the resource '{word}'",(Resource)=>{
    cy.request({
        method:"PUT",
        url:baseUrl+Resource,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        header:"application/json",
        body:{
            message:"File Successfully Created",
            content:"SGVsbG8gV29ybGQ="
        }
    }).then((response) => {
        Cypress.env("StatusCode", response.status);
        let body = JSON.parse(JSON.stringify(response.body))
        Cypress.env('MyResponse',JSON.stringify(body));
    });
})
Then("Print the response in console",()=>{
    cy.log(Cypress.env("MyResponse"));
})
Then("Store Necessary data in the variable",()=>{
    Cypress.env("ShaValue",(JSON.parse(Cypress.env("MyResponse")).content.sha));  
})
Then("The response status code should be '{word}'",(StatusCode)=>{
    const sta = +(Cypress.env("StatusCode"));
    expect(sta).to.eql(+StatusCode)
})
Then("Check Wether the sha value is stored in variable",()=>{
    cy.log(Cypress.env("ShaValue"))
})
//  Delete Repo
Given("Make a Delete request with the resource '{word}'",(Resource)=>{
    cy.request({
        method:"DELETE",
        url:baseUrl+Resource,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        Cypress.env("StatusCode", response.status);
    });
})
Then("The Delete response status code should be '{word}'",(StatusCode)=>{
    const sta = Cypress.env("StatusCode");
    expect(sta).to.eql(+StatusCode)
})