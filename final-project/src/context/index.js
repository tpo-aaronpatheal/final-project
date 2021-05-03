 import React, { useState } from 'react';

 const Context = React.createContext();

 export const ContextProvider = props => {

    const [movies, setMovies] = useState([{
        title: '',
        image: '',
        overview: '',
    }]);

    const value = {
        movies,
        actions: {
            setMovies,
        }
    }

    return (
        <Context.Provider value={{ value }}>
            {props.children}
        </Context.Provider>
    )

}

export default Context;