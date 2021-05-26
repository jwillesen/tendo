import { ComponentType, useEffect, useState } from "react"
import { FullAppointment } from "./queries"

export type SetAnswerFn = (answer: string) => void

export interface QuestionComponentProps {
  appointment: FullAppointment
  answer: string
  setAnswer: SetAnswerFn
}

export type Question = ComponentType<QuestionComponentProps>
export type QuestionPack = Question[]

export default function useQuestionPack(appointment?: FullAppointment) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const [questionPack, setQuestionPack] = useState<QuestionPack | null>(null)

  useEffect(() => {
    // This could dynamically load a question pack based on some data in the appointment
    if (appointment) {
      import("./default-question-pack")
        .then(m => setQuestionPack(m.default))
        .catch(e => setError(e))
        .finally(() => setLoading(false))
    }
  }, [appointment])

  return { loading, error, questionPack }
}
