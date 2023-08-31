import { render } from "@redwoodjs/testing/web";

import FindPage from "./FindPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("FindPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FindPage />);
    }).not.toThrow();
  });
});
