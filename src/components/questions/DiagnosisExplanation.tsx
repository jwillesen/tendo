import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { FormattedMessage, useIntl } from "react-intl"

import { store } from "../../pullstate"
import { FullAppointment } from "../../queries"
import { findDiagnosisName, findFamilyName } from "../../utils/names"

export interface Props {
  appointment: FullAppointment
}

const QUESTION_INDEX = 1

export default function DiagnosisExplanation({ appointment }: Props) {
  const intl = useIntl()
  const response = store.useState(s => s.answers[QUESTION_INDEX])

  const setResponse: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = event => {
    store.update(s => {
      s.answers[QUESTION_INDEX] = event.target.value
    })
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography>
          <FormattedMessage
            defaultMessage='Thank you. You were diagnosed with "{diagnosisName}." Did Dr. {doctorFamilyName} explain how to manage this diagnosis in a way you could understand?'
            values={{
              diagnosisName: findDiagnosisName(appointment.Diagnoses),
              doctorFamilyName: findFamilyName(appointment.Doctor.name),
            }}
          />
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id="diagnosis-explanation-response"
          label={intl.formatMessage({
            defaultMessage: "Response",
          })}
          required
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={response}
          onChange={setResponse}
        />
      </Grid>
    </Grid>
  )
}
