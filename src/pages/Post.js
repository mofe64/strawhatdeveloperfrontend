import React, {useEffect, useState, useCallback} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAPost } from '../actions/postActions';
import '../css/pages/Post.css';
import LoadingAnimation from "../components/LoadingAnimation";
import DOMPurify from "dompurify";
import moment from 'moment';
import Subscribe from "../components/Subscribe";

const Post = function ({ match }) {
    const slug = match.params.slug;
    let preLoadedPost = JSON.parse(window.sessionStorage.getItem(slug));
    if (!preLoadedPost) {
        console.log('no preloaded post')
        preLoadedPost = null;
    }
    const [postSlug] = useState(slug);
    const [post, setPost] = useState(preLoadedPost);
    const [dataLoaded, setDataLoaded] = useState(true);
    
    const loadPost = useCallback(async () => {
        if (!preLoadedPost) {
            console.log("about to make api call")
            setDataLoaded(false);
            getAPost(postSlug)
                .then((data) => {
                    console.log("making api call for post")
                    window.sessionStorage.setItem(postSlug, JSON.stringify(data['post']))
                    setPost(data['post']);
                })
                .then(() => { setDataLoaded(true);})
                .catch((err) => {
                    console.log(err);
                });
                
        } 
    },[postSlug, preLoadedPost]);

    useEffect(() => {
        loadPost()
    },[loadPost])

    if (!dataLoaded) {
        return (
            <>
                <Header />
                <div className='wrapper'>
                    <LoadingAnimation/>
                </div>
                <Footer />
            </>
        );
    }
    return (
        <>
            <Header />
            <div className='wrapper'>
                <div className='post-container'>
                    <div className='post-headerinfo'>
                        <h1>{ post['title']}</h1>
                    </div>
                    <div className='post-metainfo'>
                        <p>{moment(post['createdAt']).format('MMMM Do YYYY')}</p>
                    </div>
                    <div
                        className='post-content'
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post['body'])}}
                    >

                    </div>
                    </div>
            </div>
            <Subscribe/>
            <Footer/>
        </>
    )
}

export default Post;