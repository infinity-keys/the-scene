import { render } from "@redwoodjs/testing/web";

import RateScene from "./RateScene";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("RateScene", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<RateScene />);
    }).not.toThrow();
  });
});
