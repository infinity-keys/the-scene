import { render } from "@redwoodjs/testing/web";

import InfoCard from "./InfoCard";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("InfoCard", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<InfoCard />);
    }).not.toThrow();
  });
});
