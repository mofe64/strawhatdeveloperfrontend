import Header from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
import '../css/pages/Home.css';

const Home = function () {
    return (
        <>
            <Header/>
            <div className='wrapper thumbnail-rack'>
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
            </div>
            <Subscribe/>
            <Footer/>
        </>
    );
};

export default Home;