import { render } from "@redwoodjs/testing/web";

import FormButtonGroup from "./FormButtonGroup";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("FormButtonGroup", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FormButtonGroup />);
    }).not.toThrow();
  });
});
