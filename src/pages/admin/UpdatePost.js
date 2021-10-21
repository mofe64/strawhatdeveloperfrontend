import React, { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import DOMPurify from 'dompurify';
import '../../css/pages/admin/CreatePost.css';
// eslint-disable-next-line
import Prisim from 'prismjs';


const UpdatePost = function () {
    const postToUpdate = "<p>This is the initial content of the editor.</p>"
    const editorRef = useRef(null);
    const [value, setValue] = useState(postToUpdate);
    const log = () => {
        if (editorRef.current) {
            const htmlString = editorRef.current.getContent();
            setValue(htmlString);
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <AdminHeader/>
            <div className='wrapper'>
                <div className='post-rte-container'>
                    <h1>Create Post</h1>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='8d70t180vjz98lqcpzn1p79fydbhgghd89rby8ela9cd6ts0'
                        initialValue={postToUpdate}
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
                             <button className='preview-draft preview-action'>
                                Publish to Drafts
                            </button>
                            <button className='preview-publish preview-action'>
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
