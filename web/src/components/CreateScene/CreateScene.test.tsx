import { render } from "@redwoodjs/testing/web";

import CreateScene from "./CreateScene";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateScene", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<CreateScene />);
    }).not.toThrow();
  });
});
