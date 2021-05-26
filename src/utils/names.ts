import { BasicName, Diagnosis } from "../queries"

// TODO: these could be more robust

export function findGivenName(name: BasicName[]) {
  return name[0].given[0]
}

export function findFamilyName(name: BasicName[]) {
  return name[0].family
}

export function findDiagnosisName(diagnoses: Pick<Diagnosis, "code">[]) {
  return diagnoses[0].code.coding[0].name
}
