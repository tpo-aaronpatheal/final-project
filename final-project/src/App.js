import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail';
//import Context from './context';


function App() {
    
  //const { value } = useContext(Context);

    return (
      <>
      <Header />
      <Switch>
        <Route exact path='/' component={Movies} />
        <Route exact path={'/:id'} component={MovieDetail} />
      </Switch>
      </>
    );
}

export default App;
