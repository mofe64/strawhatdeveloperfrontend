import React, { useState, useRef, useEffect, useCallback } from "react";
import { Editor } from '@tinymce/tinymce-react';
import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import DOMPurify from 'dompurify';
import '../../css/pages/admin/CreatePost.css';
import { updatePost,getAPost } from '../../actions/postActions';
import { useHistory } from 'react-router-dom';
import LoadingAnimation from "../../components/LoadingAnimation";
// eslint-disable-next-line
import Prisim from 'prismjs';


const UpdatePost = function ({ match }) {
    const history = useHistory();
    const slug = match.params.slug;
    let preLoadedPost = JSON.parse(window.sessionStorage.getItem(slug));
    if (!preLoadedPost) {
        console.log('no preloaded post')
        preLoadedPost = null;
    };
    const [postSlug] = useState(slug);
    const [postToUpdate,setPostToUpdate] = useState(preLoadedPost)
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const getPostToEdit = useCallback(async () => {
        if (!preLoadedPost) {
        setLoading(true);
        getAPost(postSlug)
            .then((data) => {
                const postToEdit = data['post'];
                setPostToUpdate(postToEdit);
            })
            .then(() => { setLoading(false) })
            .catch(err => { console.log(err) });
        } 
    },[postSlug, preLoadedPost])
    const updatePostValues = (key, value) => {
        const updated = { ...postToUpdate };
        updated[key] = value;
        setPostToUpdate(updated);
    }
    const log = () => {
        if (editorRef.current) {
            const htmlString = editorRef.current.getContent();
            setValue(htmlString);
            console.log(editorRef.current.getContent());
        }
    };
    const publishToDrafts = async () => {
        const post = {
            title: postToUpdate['title'],
            preview: postToUpdate['preview'],
            body: value,
            tags: postToUpdate['tags'],
            draft: true
        };
        setLoading(true);
        updatePost(postSlug,post).then(() => {
            setLoading(false);
            history.push('/admin/drafts')
        });
    }

    const publishLive = async () => {
        const post = {
           title: postToUpdate['title'],
            preview: postToUpdate['preview'],
            body: value,
            tags: postToUpdate['tags'],
            draft: false
        };
        setLoading(true);
        updatePost(postSlug,post).then(() => {
            setLoading(false);
            history.push('/admin/all')
        });
    }
    useEffect(() => {
        getPostToEdit();
    },[getPostToEdit])
    if (loading) {
        return (
            <>
                <AdminHeader/>
                <div className='wrapper'>
                    <div className='post-rte-container'>
                        <h1>Create Post</h1>
                        <LoadingAnimation/>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <AdminHeader/>
            <div className='wrapper'>
                <div className='post-rte-container'>
                    <h1>Update Post</h1>
                     <div className='post-details'>
                        <div className='post-title'>
                            <label>
                                <p> Title </p>    
                            </label>
                            <input
                                type='text'
                                value={postToUpdate['title']}
                                placeholder='Post Title'
                                onChange={(e) => {
                                    updatePostValues('title', e.target.value);
                                }}
                            />
                        </div>
                        <div className='post-title'>
                            <label>
                                <p> Tags (comma seperated) </p>    
                            </label>
                            <input
                                type='text'
                                placeholder='Post Tag'
                                value={postToUpdate['tags']}
                                onChange={(e) => {
                                    updatePostValues('tags', e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>
                                <p>
                                    Intro Text
                                </p>
                            </label>
                            <textarea
                                placeholder='Short Intro text'
                                value={postToUpdate['preview']}
                                onChange={(e) => {
                                    updatePostValues('preview', e.target.value);
                                }}
                            />
                        </div>  
                    </div>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='8d70t180vjz98lqcpzn1p79fydbhgghd89rby8ela9cd6ts0'
                        initialValue={postToUpdate['body']}
                        init={{
                            height: 500,
                            menubar: 'tools',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount codesample'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | code | codesample' ,
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button onClick={log}>Preview</button>
                    <div className='post-preview'>
                        <div className='preview-header'>
                            <h3>Here's a preview of the post</h3>
                        </div>
                        
                        {(value === '') ? <h1>Nothing yet</h1> : <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}></div>}
                        <div className='preview-actions'>
                            <button
                                className='preview-draft preview-action'
                                onClick={publishToDrafts}
                            >
                                Publish to Drafts
                            </button>
                            <button
                                className='preview-publish preview-action'
                                onClick={publishLive}
                            >
                                Publish Live
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};


export default UpdatePost;
