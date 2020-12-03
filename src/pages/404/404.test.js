import { render } from "@testing-library/react";
import NoPage from "./index";

describe("404", () => {
  it("renders without crashing", () => {
    render(<NoPage />);
  });
});
