import React from "react"
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
import QuestionWizard from "./components/QuestionWizard"

function App() {
  const {
    loading,
    error,
    data: appointmentResult,
  } = useQuery<FullAppointmentResult, FullAppointmentVars>(
    FullAppointmentQuery,
    { variables: { id: defaultAppointmentId } }
  )

  function renderBody() {
    if (loading) {
      return (
        <Grid container justify="center">
          <CircularProgress size={100} />
          <Typography variant="srOnly">
            <FormattedMessage defaultMessage="Loading" />
          </Typography>
        </Grid>
      )
    }

    if (error || !appointmentResult) {
      return (
        <Alert severity="error">
          <Typography>
            <FormattedMessage defaultMessage="There was an error loading your data" />
          </Typography>
        </Alert>
      )
    }

    return <QuestionWizard appointment={appointmentResult.Appointment} />
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
