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

describe("Check all buttons are working", () => {
  before(() => {
    cy.visit("/");
  });

  it("add a point for A", () => {
    cy.get(playerAButton).click();
    cy.get(playerAscore).should("have.text", "15");
  });
  it("add a point for B", () => {
    cy.get(playerBButton).click();
    cy.get(playerBscore).should("have.text", "15");
  });
  it("reset the match score", () => {
    cy.get(resetButton).click();
    cy.get(playerAscore).should("have.text", "0");
    cy.get(playerBscore).should("have.text", "0");
  });
});
