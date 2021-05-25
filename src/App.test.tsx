import React from "react"
import { render, waitForApollo } from "./test/utils"
import { screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import { ALL_APPOINTMENTS_QUERY } from "./queries"
import App from "./App"

describe("App", () => {
  it("displays a loading message", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitForApollo()
  })

  it("loads appointment data", async () => {
    const mocks = [
      {
        request: {
          query: ALL_APPOINTMENTS_QUERY,
        },
        result: {
          data: {
            allAppointments: [{ id: "42" }],
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    )
    await waitForApollo()
    expect(screen.getByText(/tada/i)).toBeInTheDocument()
    expect(screen.getByText(/42/i)).toBeInTheDocument()
  })
})
