import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import CreateSurvey from './CreateSurvey'
import Survey from './Survey'
import { GlobalStyle } from './App.styles'

const App = (props) => {
  // app level states
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState([])

  console.log('survey is', survey)
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home setSurvey={setSurvey} />
        </Route>
        <Route exact path="/createSurvey">
          <CreateSurvey />
        </Route>
        <Route exact path="/survey/:id" setLoading={setLoading}>
          <Survey />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
