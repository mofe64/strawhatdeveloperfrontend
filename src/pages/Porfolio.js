import Header from "../components/Header";
import Footer from "../components/Footer"
import Project from "../components/Project";
import '../css/pages/Portfolio.css';

const Portfolio = function () {
    return (
        <>
            <Header />
            <div className='wrapper'>
                <div className='portfolio-header'>
                    <h2>Some of the stuff I've worked on </h2>
                </div>
                <Project />
                <Project />
                <Project />
            </div>
            <Footer/>
        </>
    );
};

export default Portfolio;