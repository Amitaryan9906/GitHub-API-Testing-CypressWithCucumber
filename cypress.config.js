const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
async function setupNodeEvents(on, config) {
  on("file:preprocessor", cucumber());
  // implement node event listeners here
  //This is required for the preprocessor to be generate json,were my test files if it wants run file,pulgin
  return config;
}
module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    //for BDD
    specPattern: "cypress/UAT/features/*.{js,feature}",
    baseUrl: "https://www.thesouledstore.com/",
  },
  chromeWebSecurity: false,
});