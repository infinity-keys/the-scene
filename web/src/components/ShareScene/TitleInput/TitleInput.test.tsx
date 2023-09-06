import { render } from "@redwoodjs/testing/web";

import TitleInput from "./TitleInput";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("TitleInput", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<TitleInput />);
    }).not.toThrow();
  });
});
