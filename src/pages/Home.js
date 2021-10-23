import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
import '../css/pages/Home.css';
import LoadingAnimation from "../components/LoadingAnimation";
import {getAllPosts } from '../actions/postActions';
import { useHistory } from 'react-router-dom';


const Home = function () {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setDataLoaded(false);
        getAllPosts(page)
            .then((data) => {
                setPosts(data['posts']);
            })
            .then(() => { setDataLoaded(true); })
            .catch(() => {
                console.log('error caught ')
            });
    }, [page]);

    const goToPost = (slug) => {
        history.push(`post/${slug}`);
    };

    if (!dataLoaded) {
        return (
            <>
                <Header />
                <div className='wrapper'>
                    <LoadingAnimation />
                </div>
                <Subscribe />
                <Footer />
            </>
        );
    }
    if (posts.length === 0) {
        return (
            <>
                <Header />
                <div className='wrapper'>
                    <div style={{textAlign: 'center', marginTop:'3rem', minHeight: '30vh'}}>
                        <h1>No Posts yet, check back later or subscribe below to be the first to find out</h1>
                    </div>
                    
                </div>
                <Subscribe />
                <Footer />
            </>
        );
    }
    return (
        <>
            <Header/>
            <div className='wrapper thumbnail-rack'>
                {posts.map((post, index) => {
                    return <Thumbnail
                        key={index}
                        post={post}
                        goToFunction={() => {
                            goToPost(post['slug'])
                        }}
                    />
                })}
            </div>
            <Subscribe/>
            <Footer/>
        </>
    );
};

export default Home;