import '../css/components/Thumbnail.css';
import moment from "moment";
const Thumbnail = ({goToFunction=f=>f, post={}}) => {
    return (
        <div className='thumbnail'>
            <div className='thumbnail-header'>
                <h2 onClick={goToFunction}>{post['title']}</h2>
                <div className='thumbnail-meta'>
                    <p className='thumbnail-date'>
                        {moment(post['createdAt']).format('MMMM Do YYYY')}
                    </p>
                    ☕
                    {
                        post['tags'].map((tag, index) => {
                            return (
                                <p className='thumbnail-tag'
                                    key={index}
                                >
                                    {
                                       (index !== (post['tags'].length -1)? `${tag},`: tag)
                                    }
                                </p>
                            );               
                       })
                    }
                    
                </div>
            </div>
            <div className='thumbnail-body'>
                <p>
                    {post['preview']}
                </p>
            </div>
        </div>
    )
}

export default Thumbnail;