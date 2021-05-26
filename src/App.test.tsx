import { render as intlRender, waitForApollo } from "./test/utils"
import { fireEvent, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { FullAppointmentQuery, defaultAppointmentId } from "./queries"
import { store, initialState } from "./pullstate"
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
  afterEach(() => {
    cleanup()
    store.replace(initialState)
  })

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

    it("disables the back button", () => {
      expect(screen.getByText(/back/i).closest("button")).toBeDisabled()
    })

    describe("diagnosis explanation", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText(/continue/i))
      })

      it("requires a response to continue", () => {
        expect(screen.getByText(/continue/i).closest("button")).toBeDisabled()
      })

      it("goes back", () => {
        fireEvent.click(screen.getByText("Back"))
        expect(screen.getByText(/scale of 1-10/)).toBeInTheDocument()
      })

      it("records the response", () => {
        const responseField = screen.getByLabelText(/response/i)
        const message = "Yes it was"
        userEvent.type(responseField, message)
        expect(responseField).toHaveValue(message)
        expect(store.getRawState().answers[1]).toBe(message)
      })

      describe("diagnosis feeling", () => {
        beforeEach(() => {
          userEvent.type(
            screen.getByLabelText(/response/i),
            "explanation response"
          )
          fireEvent.click(screen.getByText(/continue/i))
        })

        it("goes back", () => {
          fireEvent.click(screen.getByText("Back"))
          expect(screen.getByText(/explain how to manage/)).toBeInTheDocument()
        })

        it("requires a response to continue", () => {
          expect(screen.getByText(/continue/i).closest("button")).toBeDisabled()
        })

        it("records the response", () => {
          const responseField = screen.getByLabelText(/response/i)
          const message = "I feel ok"
          userEvent.type(responseField, message)
          expect(responseField).toHaveValue(message)
          expect(store.getRawState().answers[2]).toBe(message)
        })

        describe("summary", () => {
          beforeEach(() => {
            userEvent.type(
              screen.getByLabelText(/response/i),
              "feeling response"
            )
            fireEvent.click(screen.getByText(/continue/i))
          })

          it("displays answer summaries", () => {
            expect(screen.getByText(/5/i)).toBeInTheDocument()
            expect(
              screen.getByText(/explanation response/i)
            ).toBeInTheDocument()
            expect(screen.getByText(/feeling response/i)).toBeInTheDocument()
          })

          it("goes back", () => {
            fireEvent.click(screen.getByText("Back"))
            expect(screen.getByText(/how do you feel/)).toBeInTheDocument()
          })

          describe("final thanks", () => {
            beforeEach(() => {
              fireEvent.click(screen.getByText("Submit"))
            })

            it("removes buttons", () => {
              expect(screen.queryByText(/continue|submit/i)).toBeNull()
              expect(screen.queryByText("Back")).toBeNull()
            })
          })
        })
      })
    })
  })
})
