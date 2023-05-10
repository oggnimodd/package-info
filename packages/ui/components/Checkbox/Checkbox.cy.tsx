import React from "react";

import CheckBox from "./Checkbox";

describe("Checkbox", () => {
  it("should render label", () => {
    cy.mount(
      <CheckBox>
        <p className="label">Label</p>
      </CheckBox>,
    );

    cy.get(".label").should("have.length", 1);
  });

  it("should call onChange when children is clicked", () => {
    const clickSpy = cy.spy().as("clickSpy");
    cy.mount(
      <CheckBox onChange={clickSpy}>
        <p className="label">Label</p>
      </CheckBox>,
    );

    cy.get(".label").click();
    cy.get("@clickSpy").should("be.calledOnce");
  });

  it("shouldn't render indicator when isSelected is false", () => {
    cy.mount(<CheckBox isSelected={false} />);

    cy.get("[aria-hidden=true]").children().should("not.have.length");
  });

  it("should render indicator when isSelected is true", () => {
    cy.mount(<CheckBox isSelected={true} />);

    cy.get("[aria-hidden=true]").children().should("not.be.undefined");
  });
});
