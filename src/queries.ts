import { gql, DocumentNode } from "@apollo/client"

// Ideally we'd generate these types from the graphql schema

export interface Appointment {
  id: string
}

export interface AllAppointments {
  allAppointments: Appointment[]
}

// TODO: I'm not sure why the cast to DocumentNode is necessary. Some kind of
// type mismatch between graphql and apollo?

export const ALL_APPOINTMENTS_QUERY = gql`
  query GetAppointments {
    allAppointments {
      id
    }
  }
` as DocumentNode
