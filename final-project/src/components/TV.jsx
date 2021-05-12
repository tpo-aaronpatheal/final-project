import React, { useContext } from 'react';
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

const Television = () => {

    const { value } = useContext(Context);  

    return (
        <main className="main-content">
        <div className="container">
            <div className="page">
                <div className="row">
                    <div className="col-md-12">
                        <motion.div
                            variants={courseCardVariant}
                            initial="hidden"
                            animate="show"
                        >  
                                <div className="slider">
                                <h2>Search Results:</h2>
                                    <ul className="slides">
                                        {value.tvShows.map(show => {
                                        return <li className='col-md-4' key={show.id}><NavLink to={`/${show.id}`}><img src={`https://image.tmdb.org/t/p/original${show.image}`} alt={show.name}></img>
                                        <p /><h4 className='maintitle'>{show.name}</h4></NavLink>
                                        </li>
                                        })}
                                    </ul> 
                                </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    );
}

export default Television;