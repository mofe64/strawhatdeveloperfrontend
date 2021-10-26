import Header from "../components/Header";
import Footer from "../components/Footer";
import Thumbnail from "../components/Thumbnail";
import '../css/pages/Search.css';


const Search = function () {
    return (
        <>
            <Header />
            <div className='search-page wrapper'>
                <div className='search-header'>
                <p>Search</p>
                </div>
                <div className='search-form'>
                    <input type='search' placeholder='what are you looking for ?' />
                    <button>
                        Search
                    </button>
                </div>
                <div className='thumbnail-rack'>
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Search;