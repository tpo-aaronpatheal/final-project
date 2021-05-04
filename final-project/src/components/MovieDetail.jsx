import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../context';
import { motion } from "framer-motion";

//animation variants from framer-motion
const courseCardVariant = {
	hidden: { x: "100vw", opacity: 0, transition: { staggerChildren: 4 } },
	show: {
		x: 0,
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			type: "spring",
			stiffness: 35,
			ease: "easeOut",
			duration: 0.25
		}
	}
};

const MovieDetail = () => {

    const {value} = useContext(Context);

    return (
        <main className="main-content">
            <div className="container">
                <div className="page">
                    <div className="breadcrumbs">
                        <NavLink to='/'>Home</NavLink>
                        <span>{value.movieDetails.title}</span>
                    </div>

                    <motion.div
                        variants={courseCardVariant}
                        initial="hidden"
                        animate="show"
                    > 
                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <figure className="movie-poster"><img src={`https://image.tmdb.org/t/p/original${value.movieDetails.image}`} alt={value.movieDetails.title}></img></figure>
                            </div>
                            <div className="col-md-6">
                                <h2 className="movie-title">{value.movieDetails.title}</h2>
                                <div className="movie-summary">
                                    <p>{value.movieDetails.overview}</p>
                                </div>
                                <ul className="movie-meta">
                                    <li><strong>Rating:</strong> 
                                        <span className="starring"><span><strong> {value.movieDetails.rating}</strong> out of 10</span></span>
                                    </li>
                                    <li><strong>Length:</strong> {`${value.movieDetails.runningTime} Minutes`}</li>
                                </ul>
                                <ul className="starring">
                                    <li><strong>Director:</strong> {value.movieDetails.director} </li>
                                    <li><strong>Stars:</strong> {value.movieDetails.actors.map(actor => { return `${actor} | `})} </li> 
                                </ul>
                                <hr />
                                <div className="entry-content">
                                    <h3>Reviews:</h3>
                                    {value.movieDetails.reviews.length > 0 ? 
                                        value.movieDetails.reviews.map(review => {
                                            return <><p>- {review}</p></>
                                        })
                                        :
                                        <h3>Sorry There Are No Reviews...I Guess You Will Have To Go Watch The Movie And Decide For Yourself.</h3>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>    
                </div>
            </div>
        </main>
    );
}

export default MovieDetail;