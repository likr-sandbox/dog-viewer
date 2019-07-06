import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { IonApp, IonPage, IonReactRouter } from '@ionic/react'

import RootPage from './pages/root'

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <Switch>
            <Route path='/' component={RootPage} />
          </Switch>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
}

render(<App />, document.querySelector('#content'))
