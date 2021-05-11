import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api';
import ReactPaginate  from 'react-paginate';
import Paginate from '../components/Paginate'

const SearchResults = () => {

    const { value } = useContext(Context);  

     //let path = useLocation().pathname.substring(8);

    //  let buttons = [];

    //  useEffect( ()=> {
    //      const pageCount = async () => {
    //          let response = await api.getSearchResults(path, 1);
    //          console.log(response.data.total_pages);
    //          for(let i = 1; i < response.data.total_pages; i++ ){
    //              buttons.push(i);
    //          }
            
    //        setButtonCount();
    //        console.log(buttonCount)
    //      }
    //      pageCount();
    //  },[])



    return (
            <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="slider">
                            <h2>Search Results:</h2>
                                <ul className="slides">
                                    {value.searchResults.map(movie => {
                                       return <li className='col-md-4' key={movie.id}><NavLink to={`/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.title}></img>
                                       <p /><h4 className='maintitle'>{movie.title}</h4></NavLink>
                                       <p className='maintitle'><strong>Year: </strong>{movie.year.substring(0,4)}</p></li>
                                    })}
                                </ul> 
                            </div>
                            <Paginate/> 
                        </div>
                    </div>
                </div>
            </div>
        </main>
        )
    }

export default SearchResults;