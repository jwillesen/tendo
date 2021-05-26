import { useIntl } from "react-intl"
import { FullAppointment } from "../../queries"
import { findDiagnosisName } from "../../utils/names"
import FreeResponseQuestion from "../FreeResponseQuestion"

export interface Props {
  appointment: FullAppointment
}

const QUESTION_INDEX = 2

export default function DiagnosisExplanation({ appointment }: Props) {
  const intl = useIntl()
  return (
    <FreeResponseQuestion
      answerIndex={QUESTION_INDEX}
      questionText={intl.formatMessage(
        {
          defaultMessage:
            'We appreciate the feedback, one last question: how do you feel about being diagnosed with "{diagnosisName}?"',
        },
        {
          diagnosisName: findDiagnosisName(appointment.Diagnoses),
        }
      )}
    />
  )
}
