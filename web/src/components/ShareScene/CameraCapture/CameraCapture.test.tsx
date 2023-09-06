import { render } from "@redwoodjs/testing/web";

import CameraCapture from "./CameraCapture";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CameraCapture", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<CameraCapture />);
    }).not.toThrow();
  });
});
