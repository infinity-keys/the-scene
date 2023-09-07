import { render } from "@redwoodjs/testing/web";

import RatingSlider from "./RatingSlider";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("RatingSlider", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<RatingSlider />);
    }).not.toThrow();
  });
});
