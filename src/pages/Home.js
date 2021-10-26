import React, {useCallback, useEffect, useState} from "react";
import Header from "../components/Header";
import Thumbnail from "../components/Thumbnail";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
import '../css/pages/Home.css';
import LoadingAnimation from "../components/LoadingAnimation";
import {getAllPosts } from '../actions/postActions';
import { useHistory } from 'react-router-dom';

let totalPosts;
const Home = function () {
   
    const history = useHistory();
    let preLoadedPosts = JSON.parse(window.sessionStorage.getItem('allposts'));
    if (!preLoadedPosts) {
        preLoadedPosts = null;
    }
    // console.log( preLoadedPosts);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(preLoadedPosts);
    const [dataLoaded, setDataLoaded] = useState(true);

    const loadPosts = useCallback(async () => {
        if (!preLoadedPosts) {
            setDataLoaded(false);
            getAllPosts(page)
                .then((data) => {
                    console.log("making api call")
                    window.sessionStorage.setItem('allposts', JSON.stringify(data['posts']))
                    totalPosts = data['count'];
                    setPosts(data['posts']);
                })
                .then(() => { setDataLoaded(true); })
                .catch(() => {
                    console.log('error caught ')
                });
            }
    },[page,preLoadedPosts])
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const goToPost = (slug) => {
        history.push(`post/${slug}`);
    };
    const hasNextPage = () => {
        const totalCount = totalPosts;
        const pageContent = 20;
        const contentLoadedSoFar = page * pageContent
        const remainder = totalCount - contentLoadedSoFar;
        return remainder > 0;
    };
    const goToNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
    }

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
    if (!posts || posts.length === 0) {
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
                <div className='pagination'
                    
                style={(hasNextPage())?{display: 'block'}:{display: 'none'}}
                >
                    <button
                        onClick={() => {
                            console.log("total posts from be")
                            console.log(totalPosts)
                            goToNextPage()
                        }}
                    >
                        next page
                    </button>
                </div>
            </div>
           
            <Subscribe/>
            <Footer/>
        </>
    );
};

export default Home;