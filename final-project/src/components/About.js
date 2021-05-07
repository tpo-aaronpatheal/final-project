import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';
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

const About = () => {


    return (
        
        <main className="main-content">
                    <div className="container">
                        <div className="page">
                            <div className="breadcrumbs">
                                <a href="/">Home</a>
                                <span href="/about"></span>
                            </div>

                            <motion.div
                                        variants={courseCardVariant}
                                        initial="hidden"
                                        animate="show"
                                    >
                            <div className="row">
                                <div className="col-md-4">
                                    <figure><img src="images/A-money photo.jpg" alt="figure image"></img></figure>
                                </div>
                                <div className="col-md-8">
                                    <p className="leading"> Welcome to A-Money Productions. Let your imagination become reality with the worlds largest selection of movies. We understand that everyone has different taste which is why we have taken it upon ourselves to build the largest 'one stop' website for all of your theaterical needs. So take a seat and enjoy! </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <h2 className="section-title">Vision &amp; Mission</h2>
                                    <p> Our vision has alwasy been and will always be to show you the world of movie entertainment! </p>

                                    <p>The missions of A-Money Productions is to entertain, thrill, and enrich our community by openeing the door to a global library of cinematic entertainment. Providing a safe, fun, and welcoming environment is one of our many top priorities.</p>
                                </div>
                                <div className="col-md-3">
                                    <h2 className="section-title">Useful Links</h2>
                                    <ul className="arrow">
                                        <li><NavLink to="#">Watch at Home</NavLink></li> 
                                        <li><NavLink to="#">Coming Soon</NavLink></li>
                                        <li><NavLink to="#">Editor's Picks</NavLink></li> 
                                        <li><NavLink to="#">In Theaters</NavLink></li> 
                                        <li><NavLink to="#">Fan Favorites</NavLink></li>
                                        <li><NavLink to="#">Your Account</NavLink></li> 
                                        <li><NavLink to="#">Sign in</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                        </div> 
                    </div>
         </main>

    )
}

export default About;