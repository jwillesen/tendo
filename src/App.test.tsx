import { render as intlRender, waitForApollo } from "./test/utils"
import { fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { FullAppointmentQuery, defaultAppointmentId } from "./queries"
import { store } from "./pullstate"
import App from "./App"

async function render(mocks: any[]) {
  const result = intlRender(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )
  await waitForApollo()
  return result
}

function defaultMocks() {
  return [
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
              name: [{ given: ["Iam"], family: "Patient" }],
            },
            Doctor: { id: "d1", name: [{ given: ["Some"], family: "Doc" }] },
            Diagnoses: [
              {
                id: "diag1",
                code: {
                  coding: [{ name: "Halitosis" }],
                },
              },
            ],
          },
        },
      },
    },
  ]
}

describe("App", () => {
  it("displays a loading message", async () => {
    const waiter = render([])
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waiter
  })

  it("loads appointment data", async () => {
    await render(defaultMocks())
    expect(screen.getByText(/iam/i)).toBeInTheDocument()
  })

  describe("doctor recommendation", () => {
    beforeEach(async () => {
      await render(defaultMocks())
    })

    it("sets the doctor recommendation", async () => {
      const sliderThumb = screen.getByLabelText(/select recommendation/i)
      expect(sliderThumb.getAttribute("aria-valuenow")).toBe("5")
      fireEvent.keyDown(sliderThumb, { key: "ArrowRight" })
      expect(sliderThumb.getAttribute("aria-valuenow")).toBe("6")
      expect(store.getRawState().answers[0]).toBe(6)
    })

    describe("diagnosis explanation", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText(/continue/i))
      })

      it("requires a response to continue", () => {
        expect(screen.getByText(/continue/i).closest("button")).toBeDisabled()
      })

      it("records the response", () => {
        const responseField = screen.getByLabelText(/response/i)
        const message = "Yes it was"
        userEvent.type(responseField, message)
        expect(responseField).toHaveValue(message)
        expect(store.getRawState().answers[1]).toBe(message)
      })
    })
  })
})
