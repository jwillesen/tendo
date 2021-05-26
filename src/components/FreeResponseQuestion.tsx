import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { useIntl } from "react-intl"
import { store } from "../pullstate"

export interface Props {
  answerIndex: number
  questionText: string
}

export default function FreeResponseQuestion({
  answerIndex,
  questionText,
}: Props) {
  const intl = useIntl()
  const response = store.useState(s => s.answers[answerIndex])

  const setResponse: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = event => {
    store.update(s => {
      s.answers[answerIndex] = event.target.value
    })
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>{questionText}</Typography>
      </Grid>
      <Grid item>
        <TextField
          id="free-response-field"
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
