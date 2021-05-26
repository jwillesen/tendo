import Typography from "@material-ui/core/Typography"
import { FormattedMessage } from "react-intl"
import { FullAppointment } from "../../queries"

export interface Props {
  appointment: FullAppointment
}

export default function FinalThanks(props: Props) {
  return (
    <Typography>
      <FormattedMessage defaultMessage="Thank you for your feedback!" />
    </Typography>
  )
}
