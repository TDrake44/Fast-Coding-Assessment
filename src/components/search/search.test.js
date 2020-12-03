import { render, fireEvent } from "@testing-library/react";
import Search from "./index";

describe("Search", () => {
  it("renders without crashing", () => {
    render(<Search />);
  });

  it("runs onSearch when enter pressed", () => {
    const onSearch = jest.fn();
    const container = render(<Search onSearch={onSearch} />);
    fireEvent.keyDown(container.getByTestId("search-input"), {
      key: "Enter",
      code: "Enter",
    });
    expect(onSearch).toHaveBeenCalled();
  });

  it("does not run onSearch when any other key is pressed", () => {
    const onSearch = jest.fn();
    const container = render(<Search onSearch={onSearch} />);
    fireEvent.keyDown(container.getByTestId("search-input"), {
      key: "A",
      code: "KeyA",
    });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("runs onSearch when button clicked", () => {
    const onSearch = jest.fn();
    const container = render(<Search onSearch={onSearch} />);
    fireEvent.click(container.getByTestId("search-button"));
    expect(onSearch).toHaveBeenCalled();
  });

  it("changes on input", () => {
    const container = render(<Search />);
    fireEvent.change(container.getByTestId("search-input"), {
      target: { value: "test" },
    });
    expect(container.getByTestId("search-input").value).toEqual("test");
  });
});
