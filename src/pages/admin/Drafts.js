import React, {useEffect, useState, useCallback} from "react";
import AdminHeader from "../../components/AdminHeader";
import Thumbnail from "../../components/Thumbnail";
import Footer from "../../components/Footer";
import { useHistory,Link } from 'react-router-dom';
import LoadingAnimation from "../../components/LoadingAnimation";
import '../../css/pages/admin/Drafts.css'
import {getAllDrafts } from '../../actions/postActions';

let totalPosts;
const Drafts = function () {
    const history = useHistory();
    let preLoadedDrafts = JSON.parse(window.sessionStorage.getItem('drafts'))
    if (!preLoadedDrafts) {
        preLoadedDrafts = null;
    }
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState(preLoadedDrafts);
    const [dataLoaded, setDataLoaded] = useState(true);
    const goToDraft = (slug) => {
        history.push(`/admin/update/${slug}`)
    };

    const loadPosts = useCallback(async () => {
        if (!preLoadedDrafts) {
            setDataLoaded(false);
            getAllDrafts(page)
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
    }, [page, preLoadedDrafts]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

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
                <AdminHeader />
                <div className='wrapper'>
                    <LoadingAnimation />
                </div>

                <Footer />
            </>
        );
    };

    if (!posts || posts.length === 0) {
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
                    <h1>Posts currently in drafts</h1>
                </div>
                {posts.map((post, index) => {
                    return <Thumbnail
                        key={index}
                        goToFunction={() => {
                            goToDraft(post['slug']);
                        }}
                        post={post}
                    />
                })}
                <div className='pagination'
                style={(hasNextPage())?{display: 'block'}:{display: 'none'}}
                >
                    <button
                        onClick={goToNextPage}
                    >
                        next page
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Drafts;