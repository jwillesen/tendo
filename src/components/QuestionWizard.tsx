import { useState } from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { FullAppointment } from "../queries"
import DoctorRating from "./questions/DoctorRating"
import DiagnosisExplanation from "./questions/DiagnosisExplanation"
import DiagnosisFeeling from "./questions/DiagnosisFeeling"
import { FormattedMessage } from "react-intl"
import { store } from "../pullstate"

export interface Props {
  appointment: FullAppointment
}

// const MAX_STEP = 3
const MIN_STEP = 0

export default function QuestionWizard({ appointment }: Props) {
  const [step, setStep] = useState(0)
  const answers = store.useState(s => s.answers)

  function incrementStep() {
    setStep(s => s + 1)
  }

  function decrementStep() {
    setStep(s => s - 1)
  }

  function canContinue() {
    return !!answers[step]
  }

  function renderQuestion() {
    switch (step) {
      case 0:
        return <DoctorRating appointment={appointment} />
      case 1:
        return <DiagnosisExplanation appointment={appointment} />
      case 2:
        return <DiagnosisFeeling appointment={appointment} />
      default:
        throw new Error("step index is out of range in QuestionWizard")
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{renderQuestion()}</Grid>
      <Grid item>
        <Grid container justify="space-between">
          <Button
            variant="contained"
            disabled={step === MIN_STEP}
            onClick={decrementStep}
          >
            <FormattedMessage defaultMessage="Back" />
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!canContinue()}
            onClick={incrementStep}
          >
            <FormattedMessage defaultMessage="Continue" />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
