import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import CreateSurvey from './CreateSurvey'
import Survey from './Survey'
import { GlobalStyle } from './App.styles'

const App = () => {
  // app level state
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState([])

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api/'

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/createSurvey">
          <CreateSurvey baseUrl={baseUrl} />
        </Route>
        <Route exact path="/survey/:id">
          <Survey setLoading={setLoading} baseUrl={baseUrl} />
        </Route>
        <Route exact path="/*">
          <Home baseUrl={baseUrl} setSurvey={setSurvey} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
