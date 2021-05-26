import { Store } from "pullstate"

export type Answer = number | string

export interface State {
  answers: Answer[]
}

export const initialState: State = {
  answers: [5, "", ""],
}

export const store = new Store<State>(initialState)
