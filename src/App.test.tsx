import React from "react"
import { render, waitForApollo } from "./test/utils"
import { screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import { FullAppointmentQuery, defaultAppointmentId } from "./queries"
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
          query: FullAppointmentQuery,
          variables: {
            id: defaultAppointmentId,
          },
        },
        result: {
          data: {
            Appointment: {
              id: "a1",
              Patient: {
                id: "p1",
                name: [{ text: "Iam Patient" }],
              },
              Doctor: { id: "d1", name: [] },
              Diagnoses: [],
            },
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
    expect(screen.getByText(/iam patient/i)).toBeInTheDocument()
  })
})
