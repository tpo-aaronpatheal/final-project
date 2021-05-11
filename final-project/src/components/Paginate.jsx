import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Context from '../context';
import api from '../utils/api';
import ReactPaginate  from 'react-paginate';


const Paginate = () => {

    let path = useLocation().pathname.substring(8);

    const { value } = useContext(Context);



    useEffect( ()=> {
        const pageCount = async () => {
            let response = await api.getSearchResults(path, 1);
            value.actions.setButtonCount(response.data.total_pages);
        }
        pageCount();
    },[path])

    //Handle Page Change
    const changePage = async (e) => {
        let pageNumber = e.selected +1 ;
        let resultsArr = [];
        let response = await api.getSearchResults(path, pageNumber);
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
    }



    return (
        
        <ReactPaginate 
            PreviousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount = {value.buttonCount}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
        /> 
    )
}

export default Paginate;