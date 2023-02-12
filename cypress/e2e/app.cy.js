describe("Navigation", () => {
  it("Navigates to game screen and welcomes the user", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input").type("Jake");
    cy.get("button").click();
    cy.url().should("include", "/game");
    cy.get("h1").contains("Jake");
  });
});

describe("Require username", () => {
  it("Requires username to proceed", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("p").contains("You need to input your name");
  });
});
