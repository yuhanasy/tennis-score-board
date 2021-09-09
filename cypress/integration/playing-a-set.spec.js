const playerAButton = "#player-a-btn";
const playerBButton = "#player-b-btn";
const resetButton = "#reset-btn";

const playerAset0 = "#player-a-set-0";
const playerAset1 = "#player-a-set-1";
const playerAset2 = "#player-a-set-2";
const playerBset0 = "#player-b-set-0";
const playerBset1 = "#player-b-set-1";
const playerBset2 = "#player-b-set-2";

const playerAscore = "#player-a-score";
const playerBscore = "#player-b-score";
const playerAMatchscore = "#player-a-match-score";
const playerBMatchscore = "#player-b-match-score";

describe("playing a set", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(playerAscore).should("have.text", "0");
    cy.get(playerBscore).should("have.text", "0");
    cy.get(playerAset0).should("have.text", "0");
    cy.get(playerBset0).should("have.text", "0");
    cy.get(playerAButton)
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();
    cy.get(playerBButton)
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();
    cy.get(playerAset0).should("have.text", "4");
    cy.get(playerBset0).should("have.text", "4");
  });
  it("player A win normal set", () => {
    cy.get(playerAButton).click().click().click().click().click().click().click().click();
    cy.get(playerAset0).should("have.text", "6");
    cy.get(playerAMatchscore).should("have.text", "1");
    cy.get(playerAset1).should("exist");
    cy.get(playerBset1).should("exist");
  });
  it("player B win normal set with 7 point", () => {
    cy.get(playerAButton).click().click().click().click();
    cy.get(playerBButton).click().click().click().click();
    cy.get(playerAset0).should("have.text", "5");
    cy.get(playerBset0).should("have.text", "5");
    cy.get(playerBButton).click().click().click().click().click().click().click().click();
    cy.get(playerBset0).should("have.text", "7");
    cy.get(playerBMatchscore).should("have.text", "1");
    cy.get(playerAset1).should("exist");
    cy.get(playerBset1).should("exist");
  });
  it("player A win tiebreaker set", () => {
    cy.get(playerAButton).click().click().click().click();
    cy.get(playerBButton).click().click().click().click();
    cy.get(playerAset0).should("have.text", "5");
    cy.get(playerBset0).should("have.text", "5");
    cy.get(playerAButton).click().click().click().click();
    cy.get(playerBButton).click().click().click().click();
    cy.get(playerAset0).should("have.text", "6");
    cy.get(playerBset0).should("have.text", "6");

    cy.contains("tiebreakers").should("exist");
    cy.get(playerAButton).click().click().click().click().click();
    cy.get(playerBButton).click().click().click().click().click();
    cy.get(playerAButton).click().click();
    cy.contains("tiebreakers").should("not.exist");

    cy.get(playerAset0).should("have.text", "7");
    cy.get(playerAMatchscore).should("have.text", "1");
    cy.get(playerAset1).should("exist");
    cy.get(playerBset1).should("exist");
  });
});
