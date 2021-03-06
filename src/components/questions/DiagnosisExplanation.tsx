import { useIntl } from "react-intl"
import { FullAppointment } from "../../queries"
import { findDiagnosisName, findFamilyName } from "../../utils/names"
import FreeResponseQuestion from "../FreeResponseQuestion"

export interface Props {
  appointment: FullAppointment
}

const QUESTION_INDEX = 1

export default function DiagnosisExplanation({ appointment }: Props) {
  const intl = useIntl()
  return (
    <FreeResponseQuestion
      answerIndex={QUESTION_INDEX}
      questionText={intl.formatMessage(
        {
          defaultMessage:
            'Thank you. You were diagnosed with "{diagnosisName}." Did Dr. {doctorFamilyName} explain how to manage this diagnosis in a way you could understand?',
        },
        {
          diagnosisName: findDiagnosisName(appointment.Diagnoses),
          doctorFamilyName: findFamilyName(appointment.Doctor.name),
        }
      )}
    />
  )
}
