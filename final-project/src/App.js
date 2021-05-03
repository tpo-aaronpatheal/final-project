import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
//import Movies from './components/Movies';

function App() {
    
  //const { value } = useContext(Context);

    return (
      <>
      <Header />
      <Switch>
        <Route exact path='/' />
      </Switch>
      </>
    );
}

export default App;
