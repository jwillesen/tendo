import React from "react"
import { FormattedMessage } from "react-intl"
import { useQuery } from "@apollo/client"
import { AllAppointments, ALL_APPOINTMENTS_QUERY } from "./queries"

function App() {
  const { loading, error, data } = useQuery<AllAppointments>(
    ALL_APPOINTMENTS_QUERY
  )

  if (loading) {
    return (
      <div>
        <FormattedMessage defaultMessage="Loading..." />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <FormattedMessage defaultMessage="There was an error loading your data" />
      </div>
    )
  }

  return (
    <div>
      <FormattedMessage defaultMessage="Tada!" />
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default App
