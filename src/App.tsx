import { FormattedMessage } from "react-intl"
import { useQuery } from "@apollo/client"
import Alert from "@material-ui/lab/Alert"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {
  FullAppointmentQuery,
  FullAppointmentVars,
  FullAppointmentResult,
  defaultAppointmentId,
} from "./queries"
import useQuestionPack from "./useQuestionPack"

function App() {
  const {
    loading: loadingAppointment,
    error: appointmentError,
    data: appointmentResult,
  } = useQuery<FullAppointmentResult, FullAppointmentVars>(
    FullAppointmentQuery,
    { variables: { id: defaultAppointmentId } }
  )

  const {
    loading: loadingQuestionPack,
    error: questionPackError,
    questionPack,
  } = useQuestionPack(appointmentResult?.Appointment)

  function renderBody() {
    if (loadingAppointment || loadingQuestionPack) {
      return (
        <Grid container justify="center">
          <CircularProgress size={100} />
          <Typography variant="srOnly">
            <FormattedMessage defaultMessage="Loading" />
          </Typography>
        </Grid>
      )
    }

    if (appointmentError || questionPackError) {
      return (
        <div>
          <Alert severity="error">
            <Typography>
              <FormattedMessage defaultMessage="There was an error loading your data" />
            </Typography>
          </Alert>
        </div>
      )
    }

    return (
      <div>
        <Typography>
          <FormattedMessage
            defaultMessage="Hello {patientFullName}, I have {numQuestions} questions for you"
            values={{
              patientFullName:
                appointmentResult?.Appointment.Patient.name[0]?.text,
              numQuestions: questionPack?.length,
            }}
          />
        </Typography>
      </div>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box mt={2}>
        <Paper>
          <Box p={3}>{renderBody()}</Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
