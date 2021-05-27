import { useState } from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { FullAppointment } from "../queries"
import DoctorRating from "./questions/DoctorRating"
import DiagnosisExplanation from "./questions/DiagnosisExplanation"
import DiagnosisFeeling from "./questions/DiagnosisFeeling"
import { FormattedMessage, useIntl } from "react-intl"
import { store } from "../pullstate"
import AnswerSummary from "./questions/AnswerSummary"
import FinalThanks from "./questions/FinalThanks"

const MIN_STEP = 0
const MAX_STEP = 4

export interface Props {
  appointment: FullAppointment
}

export default function QuestionWizard({ appointment }: Props) {
  const intl = useIntl()

  const [step, setStep] = useState(0)
  const answers = store.useState(s => s.answers)

  function incrementStep() {
    setStep(s => s + 1)
  }

  function decrementStep() {
    setStep(s => s - 1)
  }

  function canContinue() {
    return !!answers[step] || step === 3
  }

  function renderQuestion() {
    switch (step) {
      case 0:
        return <DoctorRating appointment={appointment} />
      case 1:
        return <DiagnosisExplanation appointment={appointment} />
      case 2:
        return <DiagnosisFeeling appointment={appointment} />
      case 3:
        return <AnswerSummary appointment={appointment} />
      case 4:
        return <FinalThanks appointment={appointment} />
      default:
        throw new Error("step index is out of range in QuestionWizard")
    }
  }

  const primaryButtonText =
    step === 3
      ? intl.formatMessage({ defaultMessage: "Submit" })
      : intl.formatMessage({ defaultMessage: "Continue" })

  const displayButtons = step !== MAX_STEP

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{renderQuestion()}</Grid>
      {displayButtons && (
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
              {primaryButtonText}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
