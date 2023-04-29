import React from "react";

// import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";


afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

// new testing below. w8d2 debugging.

// const { container, debug } = render(<Application />);

// describe("Application", () => {
//   it("should show 'Saving' when a new appointment is being saved", async () => {
//     const { getByText, container } = render(<Application />);
//     await waitForElement(() => getByText("Monday"));

//     // click the "Add" button
//     fireEvent.click(getByText("Add"));

//     // enter the name and select an interviewer
//     fireEvent.change(getByPlaceholderText("Enter Student Name"), {
//       target: { value: "Lydia Miller-Jones" },
//     });

//     fireEvent.click(getByAltText("Sylvia Palmer"));

//     // click the "Save" button
//     fireEvent.click(getByText("Save"));

//     // assert that the appointment element contains the text "Saving"
//     expect(getByText("Saving")).toBeInTheDocument();

//     // wait for the appointment element to disappear from the screen
//     await waitForElement(() => getByText("Lydia Miller-Jones"));

//     // assert that the new appointment is rendered with the correct text and interviewer
//     expect(getByText("Lydia Miller-Jones")).toBeInTheDocument();
//     expect(getByText("Sylvia Palmer")).toBeInTheDocument();
//   });
// });

