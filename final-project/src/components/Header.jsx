import React, { useRef, useContext }from 'react';
import Context from '../context';
import { NavLink, useHistory } from 'react-router-dom';
import '../styles/style.css';
import api from '../utils/api';



const Header = () => {

    const searchInput = useRef('');
    const history = useHistory();
    const { value } = useContext(Context);

    const onSubmit = async (e) => {
        e.preventDefault();
            let resultsArr = [];
            let response = await api.getSearchResults(searchInput.current.value);
            for(let i = 0; i < response.data.results.length; i++){
                let movieResults = {
                    id: response.data.results[i].id,
                    title: response.data.results[i].title,
                    year: response.data.results[i].release_date,
                    image: response.data.results[i].poster_path,
                }
                resultsArr.push(movieResults)
            }
            value.actions.setSearchResults(resultsArr);
            history.push(`/search/${searchInput.current.value}`);
    }


    return (
        <header className="site-header">
            <div className="container">
                <NavLink to="index.html" id="branding">
                    <img src="logo.png" alt="" className="logo"></img>
                    <div className="logo-copy">
                        <h1 className="site-title">A-Money Productions</h1>
                        <small className="site-description">Our movie taste is better than yours.</small>
                    </div>
                </NavLink>
                <div className="main-navigation">
                    <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
                    <ul className="menu">
                        <li className="menu-item current-menu-item"><NavLink to="/">Home</NavLink></li>
                        <li className="menu-item"><NavLink to="about.html">About</NavLink></li>
                        <li className="menu-item"><NavLink to="review.html">Movie reviews</NavLink></li>
                        <li className="menu-item"><NavLink to="joinus.html">Join us</NavLink></li>
                        <li className="menu-item"><NavLink to="contact.html">Contact</NavLink></li>
                    </ul>

                    <form action='/search' onSubmit={onSubmit} className="search-form">
                        <input type="text" placeholder="Search..." ref={searchInput}></input>
                        <button ><i className="fa fa-search"/>Find</button>
                    </form>
                </div>

                <div className="mobile-navigation"></div>
        </div>
    </header>
    );
}

export default Header;