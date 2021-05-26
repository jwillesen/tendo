import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import { FormattedMessage, useIntl } from "react-intl"

import { store } from "../../pullstate"
import { FullAppointment } from "../../queries"
import { findGivenName, findFamilyName } from "../../utils/names"

export interface Props {
  appointment: FullAppointment
}

const QUESTION_INDEX = 0

export default function DoctorRating({ appointment }: Props) {
  const intl = useIntl()
  const rating = store.useState(s => s.answers[QUESTION_INDEX]) as number

  function setRating(value: number) {
    store.update(s => {
      s.answers[QUESTION_INDEX] = value
    })
  }

  const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => {
    const mark: any = { value: v }
    if ([1, 5, 10].includes(v)) mark.label = v.toString()
    return mark
  })

  return (
    <div>
      <Typography>
        <FormattedMessage
          defaultMessage="Hi {patientGivenName}, on a scale of 1-10, would you recommend Dr. {doctorFamilyName} to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend"
          values={{
            patientGivenName: findGivenName(appointment.Patient.name),
            doctorFamilyName: findFamilyName(appointment.Doctor.name),
          }}
        />
      </Typography>
      <Slider
        aria-label={intl.formatMessage({
          defaultMessage: "Select recommendation value",
        })}
        marks={marks}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        value={rating}
        onChange={(_e, value) => setRating(value as number)}
      />
    </div>
  )
}
