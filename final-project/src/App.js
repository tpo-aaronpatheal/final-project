import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Movies from './components/Movies';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import SearchResults from './components/SearchResults';
import MovieDetail from './components/MovieDetail';
import About from './components/About';
import Television from './components/TV'



function App() {
    

    return (
      <>
      <Header />
      <Switch>
        <Route exact path='/signin' component={UserSignIn} />
        <Route exact path='/signup' component={UserSignUp} />
        <Route exact path='/signout' component={UserSignOut} />
        <Route exact path='/about' component={About} />
        <Route exact path='/tv' component={Television} />
        <Route exact path='/' component={Movies} />
        <Route exact path={'/:id'} component={MovieDetail} />
        <Route path='/search/' component={SearchResults} />
      </Switch>
      <Footer />
      </>
    );
}

export default App;
