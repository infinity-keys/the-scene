import { render } from "@redwoodjs/testing/web";

import PaperTitle from "./PaperTitle";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("PaperTitle", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<PaperTitle />);
    }).not.toThrow();
  });
});
