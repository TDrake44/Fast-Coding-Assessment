import { render } from "@testing-library/react";
import Card from "./index";

describe("Card", () => {
  it("renders without crashing", () => {
    render(<Card heading="Test">Test</Card>);
  });

  it("renders the proper value in heading", () => {
    const container = render(<Card heading="Test" />);
    expect(container.getByText("Test").className).toEqual("card-heading");
  });

  it("renders the proper value in body", () => {
    const container = render(<Card heading="Test">Testing</Card>);
    expect(container.getByText("Testing").className).toEqual("card-content");
  });
});
