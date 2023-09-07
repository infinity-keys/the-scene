import { render } from "@redwoodjs/testing/web";

import SceneDetails from "./SceneDetails";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("SceneDetails", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<SceneDetails />);
    }).not.toThrow();
  });
});
