module.exports = {
  patients: [
    {
      id: "6739ec3e-93bd-11eb-a8b3-0242ac130003",
      active: true,
      name: [
        {
          text: "Tendo Tenderson",
          family: "Tenderson",
          given: ["Tendo"],
        },
      ],
      contact: [
        {
          system: "phone",
          value: "555-555-2021",
          use: "mobile",
        },
        {
          system: "email",
          value: "tendo@tendoco.com",
          use: "work",
        },
      ],
      gender: "female",
      birthDate: "1955-01-06",
      address: [
        {
          use: "home",
          line: ["2222 Home Street"],
        },
      ],
    },
  ],
  doctors: [
    {
      id: "9bf9e532-93bd-11eb-a8b3-0242ac130003",
      name: [
        {
          family: "Careful",
          given: ["Adam"],
        },
      ],
    },
  ],
  appointments: [
    {
      id: "be142dc6-93bd-11eb-a8b3-0242ac130003",
      status: "finished",
      type: [
        {
          text: "Endocrinologist visit",
        },
      ],
      patient_id: "6739ec3e-93bd-11eb-a8b3-0242ac130003",
      doctor_id: "9bf9e532-93bd-11eb-a8b3-0242ac130003",
      period: {
        start: "2021-04-02T11:30:00Z",
        end: "2021-04-02T12:00:00Z",
      },
    },
  ],
  diagnoses: [
    {
      id: "541a72a8-df75-4484-ac89-ac4923f03b81",
      meta: {
        lastUpdated: "2021-04-02T11:51:03Z",
      },
      status: "final",
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-10",
            code: "E10-E14.9",
            name: "Diabetes without complications",
          },
        ],
      },
      appointment_id: "be142dc6-93bd-11eb-a8b3-0242ac130003",
    },
  ],
}
