import React from "react"
import { render } from "./test/utils"
import { screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/tada/i)
  expect(linkElement).toBeInTheDocument()
})
