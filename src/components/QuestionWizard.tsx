import { useState } from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { FullAppointment } from "../queries"
import DoctorRating from "./questions/DoctorRating"
import { FormattedMessage } from "react-intl"

export interface Props {
  appointment: FullAppointment
}

// const MAX_STEP = 3
const MIN_STEP = 0

export default function QuestionWizard({ appointment }: Props) {
  const [step, setStep] = useState(0)

  function incrementStep() {
    setStep(s => s + 1)
  }

  function decrementStep() {
    setStep(s => s - 1)
  }

  function renderQuestion() {
    switch (step) {
      case 0:
        return <DoctorRating appointment={appointment} />
      default:
        throw new Error("step index is out of range in QuestionWizard")
    }
  }

  return (
    <>
      {renderQuestion()}
      <Grid container justify="space-between">
        <Button
          variant="contained"
          disabled={step === MIN_STEP}
          onClick={decrementStep}
        >
          <FormattedMessage defaultMessage="Back" />
        </Button>
        <Button variant="contained" color="primary" onClick={incrementStep}>
          <FormattedMessage defaultMessage="Continue" />
        </Button>
      </Grid>
    </>
  )
}
