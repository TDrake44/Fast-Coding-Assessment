import { render, fireEvent } from "@testing-library/react";
import Bag from "./index";

describe("Bag", () => {
  it("renders without crashing", () => {
    render(<Bag>Test</Bag>);
  });

  it("expands when clicked and children present", () => {
    const container = render(<Bag>Test</Bag>);
    fireEvent.click(container.getByTestId("bag-trigger"));
    expect(container.getByTestId("bag-content")).toBeVisible();
  });

  it("does not expand when clicked and children are not present", () => {
    const container = render(<Bag />);
    fireEvent.click(container.getByTestId("bag-trigger"));
    expect(container.queryByTestId("bag-content")).toBeNull();
  });
});
