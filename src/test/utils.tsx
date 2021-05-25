import React from "react"
import { IntlProvider } from "react-intl"
import { act, render as tlRender } from "@testing-library/react"

export function render(elt: React.ReactNode) {
  return tlRender(
    <IntlProvider locale="en" defaultLocale="en">
      {elt}
    </IntlProvider>
  )
}

export function waitForApollo() {
  return act(() => new Promise(resolve => setTimeout(resolve, 0)))
}
