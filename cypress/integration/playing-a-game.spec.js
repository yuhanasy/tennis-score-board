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

describe("playing a game", () => {
  before(() => {
    cy.visit("/");
  });
  it("player A win a game", () => {
    cy.get(playerAscore).should("have.text", "0");
    cy.get(playerAset0).should("have.text", "0");
    cy.get(playerAButton).click();
    cy.get(playerAscore).should("have.text", "15");
    cy.get(playerAButton).click();
    cy.get(playerAscore).should("have.text", "30");
    cy.get(playerAButton).click();
    cy.get(playerAscore).should("have.text", "40");
    cy.get(playerAButton).click();
    cy.get(playerAset0).should("have.text", "1");
  });
  it("player B win a game", () => {
    cy.get(playerBscore).should("have.text", "0");
    cy.get(playerBset0).should("have.text", "0");
    cy.get(playerBButton).click();
    cy.get(playerBscore).should("have.text", "15");
    cy.get(playerBButton).click();
    cy.get(playerBscore).should("have.text", "30");
    cy.get(playerBButton).click();
    cy.get(playerBscore).should("have.text", "40");
    cy.get(playerBButton).click();
    cy.get(playerBset0).should("have.text", "1");
  });
  context("deuce game", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(playerAscore).should("have.text", "0");
      cy.get(playerBscore).should("have.text", "0");
      cy.get(playerAset0).should("have.text", "0");
      cy.get(playerBset0).should("have.text", "0");

      cy.get(playerAButton).click();
      cy.get(playerAscore).should("have.text", "15");
      cy.get(playerBButton).click();
      cy.get(playerBscore).should("have.text", "15");
      cy.get(playerAButton).click();
      cy.get(playerAscore).should("have.text", "30");
      cy.get(playerBButton).click();
      cy.get(playerBscore).should("have.text", "30");
      cy.get(playerAButton).click();
      cy.get(playerAscore).should("have.text", "40");
      cy.get(playerBButton).click();
      cy.get(playerBscore).should("have.text", "40");
    });
    it("player A score a point, so he has adv", () => {
      cy.get(playerAButton).click();
      cy.get(playerAscore).should("have.text", "adv");
    });
    it("player B score a point, so they're back to deuce", () => {
      cy.get(playerAButton).click();
      cy.get(playerAscore).should("have.text", "adv");

      cy.get(playerBButton).click();
      cy.get(playerAscore).should("have.text", "40");
      cy.get(playerBscore).should("have.text", "40");
    });
    it("player B score a point, so he has adv", () => {
      cy.get(playerBButton).click();
      cy.get(playerBscore).should("have.text", "adv");
    });
    it("player B score 2 points in a row, so he wins the game", () => {
      cy.get(playerBset0).then(($div) => {
        const currentSetScore = parseInt($div.text());
        cy.get(playerBButton)
          .click()
          .click()
          .then(() => {
            const newCurrentSetScore = parseInt($div.text());
            expect(newCurrentSetScore).to.eq(currentSetScore + 1);
          });
      });
    });
  });
});
