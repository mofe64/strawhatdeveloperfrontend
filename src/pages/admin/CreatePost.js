import React, { useState, useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import DOMPurify from 'dompurify';
import '../../css/pages/admin/CreatePost.css';
// eslint-disable-next-line
import Prisim from 'prismjs';
import { addPost } from '../../actions/postActions';
import { useHistory } from 'react-router-dom';
import LoadingAnimation from "../../components/LoadingAnimation";

const CreatePost = function () {
    const history = useHistory();
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [introText, setIntroText] = useState('');
    const [tags, setTags] = useState('');
    const [value, setValue] = useState('');
    const log = () => {
        if (editorRef.current) {
            const htmlString = editorRef.current.getContent();
            setValue(htmlString);
            console.log(editorRef.current.getContent());
        };
    };

    const publishToDrafts = async () => {
        const post = {
            title,
            preview: introText,
            body: value,
            tags,
            draft: true
        };
        setLoading(true);
        addPost(post).then(() => {
            setLoading(false);
            history.push('/admin/drafts')
        });
    }

    const publishLive = async () => {
        const post = {
            title,
            preview: introText,
            body: value,
            tags,
            draft: false
        };
        setLoading(true);
        addPost(post).then(() => {
            setLoading(false);
            history.push('/admin/all')
        });
    }
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
                    <h1>Create Post</h1>
                    <div className='post-details'>
                        <div className='post-title'>
                            <label>
                                <p> Title </p>    
                            </label>
                            <input
                                type='text'
                                value={title}
                                placeholder='Post Title'
                                onChange={(e)=>{setTitle(e.target.value)}}
                            />
                        </div>
                        <div className='post-title'>
                            <label>
                                <p> Tags (comma seperated) </p>    
                            </label>
                            <input
                                type='text'
                                placeholder='Post Tag'
                                value={tags}
                                onChange={(e)=>{setTags(e.target.value)}}
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
                                value={introText}
                                onChange={(e)=>{setIntroText(e.target.value)}}
                            />
                        </div>
                        
                    </div>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='8d70t180vjz98lqcpzn1p79fydbhgghd89rby8ela9cd6ts0'
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: 'tools',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount codesample emoticons'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | code | codesample emoticons' ,
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button onClick={log}>Preview</button>
                    <div className='post-preview'>
                        <div className='preview-header'>
                            <h3>Here's a preview of the new post</h3>
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


export default CreatePost;
