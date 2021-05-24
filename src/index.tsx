import React from "react"
import ReactDOM from "react-dom"
import { IntlProvider } from "react-intl"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const url = new URL(window.location.href)
const lang = url.searchParams.get("lang") || ""

// TODO: dynamically load translations based on lang and give it to IntlProvider
const messages = {}

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={messages} locale={lang} defaultLocale="en">
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
