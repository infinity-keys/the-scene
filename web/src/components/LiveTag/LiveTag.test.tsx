import { render } from "@redwoodjs/testing/web";

import LiveTag from "./LiveTag";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("LiveTag", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<LiveTag />);
    }).not.toThrow();
  });
});
