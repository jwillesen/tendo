import { gql, DocumentNode } from "@apollo/client"

// Ideally we'd generate a lot of this from the graphql schema and the queries

export interface BasicName {
  family: string
  given: string[]
}

export interface PatientName extends BasicName {
  text: string
}

export type DoctorName = BasicName

export interface Contact {
  system: string
  value: string
  use: string
}

export interface Address {
  use: string
  line: string[]
}

export interface Patient {
  id: string
  active: boolean
  name: PatientName[]
  contact: Contact[]
  gender: string
  birthDate: string
  address: Address[]
}

export interface Doctor {
  id: string
  name: DoctorName[]
}

export interface Diagnosis {
  id: string
  meta: {
    lastUpdated: string
  }
  status: string
  code: Code
}

export interface Coding {
  system: string
  code: string
  name: string
}

export interface Code {
  coding: Coding[]
}

export interface AppointmentType {
  text: string
}

export interface Appointment {
  id: string
  status: string
  type: AppointmentType[]
  period: {
    start: string
    end: string
  }
}

export interface FullAppointmentVars {
  id: string
}

export interface FullAppointment {
  id: string
  Patient: Pick<Patient, "id" | "name">
  Doctor: Pick<Doctor, "id" | "name">
  Diagnoses: Pick<Diagnosis, "id" | "code">[]
}

export interface FullAppointmentResult {
  Appointment: FullAppointment
}

// TODO: I'm not sure why the cast to DocumentNode is necessary. Some kind of
// type mismatch between graphql and apollo?
export const FullAppointmentQuery = gql`
  query FullAppointment($id: ID!) {
    Appointment(id: $id) {
      id
      Patient {
        id
        name
      }
      Doctor {
        id
        name
      }
      Diagnoses {
        id
        code
      }
    }
  }
` as DocumentNode

export const defaultAppointmentId = "be142dc6-93bd-11eb-a8b3-0242ac130003"
