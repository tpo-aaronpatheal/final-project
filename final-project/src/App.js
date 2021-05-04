import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Movies from './components/Movies';
import SearchResults from './components/SearchResults';
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
        <Route path='/search/' component={SearchResults} />
      </Switch>
      <Footer />
      </>
    );
}

export default App;
