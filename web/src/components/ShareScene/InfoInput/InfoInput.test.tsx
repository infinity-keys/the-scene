import { render } from "@redwoodjs/testing/web";

import InfoInput from "./InfoInput";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("InfoInput", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<InfoInput />);
    }).not.toThrow();
  });
});
