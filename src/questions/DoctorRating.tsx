import { QuestionComponentProps } from "../useQuestionPack"

export default function DoctorRating({
  appointment,
  answer,
  setAnswer,
}: QuestionComponentProps) {
  return <div>Foo: {answer}</div>
}
