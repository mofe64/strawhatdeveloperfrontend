import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAPost } from '../actions/postActions';
import '../css/pages/Post.css';
import LoadingAnimation from "../components/LoadingAnimation";
import DOMPurify from "dompurify";
import moment from 'moment';
import Subscribe from "../components/Subscribe";

const Post = function ({ match }) {
    const [postSlug] = useState(match.params.slug);
    const [post, setPost] = useState({});
     const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setDataLoaded(false);
        getAPost(postSlug)
            .then((data) => {
                setPost(data['post']);
            })
            .then(()=>{setDataLoaded(true)})
            .catch((err) => {
                console.log(err);
            });
            
    },[postSlug])

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