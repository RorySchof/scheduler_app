// Imports

import React from "react";
import Application from "components/Application";
import { render, cleanup, fireEvent, waitForElement, getAllByTestId, getByAltText, getByPlaceholderText,  container, debug, getByText, screen, prettyDOM } from "@testing-library/react";

// Testing

afterEach(cleanup);

describe("Application", () => { 

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
  const { container } = render(<Application />);
  console.log(container);
});

});



