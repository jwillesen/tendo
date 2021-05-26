import React from "react"
import ReactDOM from "react-dom"
import { IntlProvider } from "react-intl"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

const url = new URL(window.location.href)
const lang = url.searchParams.get("lang") || "en"

// TODO: dynamically load translations based on lang and give it to IntlProvider
const messages = {}

const graphqlClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
})

// I'd rather have a dark theme, but for some reason the theming isn't working
// and it's always using the main colors instead of the light/dark colors. The
// light backgrounds look better with the main colors so we'll go with that for
// now
const theme = createMuiTheme({
  palette: {
    type: "light",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={messages} locale={lang} defaultLocale="en">
      <ApolloProvider client={graphqlClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
