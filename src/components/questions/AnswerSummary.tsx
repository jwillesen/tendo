import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { FormattedMessage } from "react-intl"
import { findDiagnosisName, findFamilyName } from "../../utils/names"
import { FullAppointment } from "../../queries"
import { store } from "../../pullstate"

export interface Props {
  appointment: FullAppointment
}

export default function AnswerSummary({ appointment }: Props) {
  const [doctorRating, diagnosisExplanation, diagnosisFeeling] = store.useState(
    s => s.answers
  )

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography>
          <FormattedMessage defaultMessage="Thanks again! Here's what we heard:" />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <FormattedMessage
            defaultMessage="The likelihood you would recommend Dr. {doctorFamilyName} to a friend or family member is {numericRating, number} out of 10."
            values={{
              numericRating: doctorRating,
              doctorFamilyName: findFamilyName(appointment.Doctor.name),
            }}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <FormattedMessage
            defaultMessage="This is what you said about whether the doctor explained how to manage {diagnosisName}: "
            values={{ diagnosisName: findDiagnosisName(appointment.Diagnoses) }}
          />
        </Typography>
        <Box mx={2} mt={1}>
          <Typography>{diagnosisExplanation}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography>
          <FormattedMessage defaultMessage="This is how you feel about your diagnosis:" />
        </Typography>
        <Box mx={2} mt={1}>
          <Typography>{diagnosisFeeling}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography>
          <FormattedMessage defaultMessage="If all of this is correct, please click the Submit button. If you'd like to change any of your answers, you may use the Back button to go back and change them." />
        </Typography>
      </Grid>
    </Grid>
  )
}
