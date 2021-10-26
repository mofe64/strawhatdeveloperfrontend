import React, {useEffect, useState, useCallback} from "react";
import AdminHeader from "../../components/AdminHeader";
import Thumbnail from "../../components/Thumbnail";
import Footer from "../../components/Footer";
import { Link, useHistory } from 'react-router-dom';
import LoadingAnimation from "../../components/LoadingAnimation";
import { getAllPosts } from '../../actions/postActions';

const AllPosts = function () {
    const history = useHistory();
    let preLoadedPosts = JSON.parse(window.sessionStorage.getItem('allposts'));
    if (!preLoadedPosts) {
        preLoadedPosts = []
    }
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(preLoadedPosts);
    const [dataLoaded, setDataLoaded] = useState(true);
    const goToEdit = (slug) => {
        history.push(`/admin/update/${slug}`)
    };
    const loadPosts = useCallback(async () => {
        if (!preLoadedPosts) {
            setDataLoaded(false);
            getAllPosts(page)
                .then((data) => {
                    console.log("making api call")
                    window.sessionStorage.setItem('allposts', JSON.stringify(data['posts']))
                    setPosts(data['posts']);
                })
                .then(() => { setDataLoaded(true); })
                .catch(() => {
                    console.log('error caught ')
                });
        }
    }, [page, preLoadedPosts]);
    
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    if (!dataLoaded) {
        return (
            <>
                <AdminHeader />
                <div className='wrapper'>
                    <LoadingAnimation />
                </div>

                <Footer />
            </>
        );
    };
    if (posts.length === 0) {
        return (
            <>
                <AdminHeader />
                <div className='wrapper'>
                    <div style={{textAlign: 'center', marginTop:'3rem', minHeight: '30vh'}}>
                        <h1>
                            No Posts yet, Create some posts to start
                            <br/>
                            <Link to='/admin/createpost'>
                                start creating
                            </Link>
                        </h1>
                    </div>
                    
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <AdminHeader />
            <div className='wrapper'>
                <div className='drafts-header'>
                    <h1>Latest Posts</h1>
                </div>
                {posts.map((post, index) => {
                    return <Thumbnail
                        key={index}
                        goToFunction={() => {
                            goToEdit(post['slug']);
                        }}
                        post={post}
                    />
                })}
            </div>
            <Footer />
        </>
    );
}

export default AllPosts;