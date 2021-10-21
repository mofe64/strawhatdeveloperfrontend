import '../css/components/Subscribe.css';

const Subscribe = () => {
    return (
        <div className='subscribe-div'>
            <div className='sub-box wrapper'>
                <div className='sub-header'>
                    <p>Sometimes I write and on even rarer occasions the stuff i write ends up been cool,stick around and find out what the next episode will bring &#128513;</p>
                </div>
                <div className='sub-body'>
                    <input type='email' placeholder='email here please' />
                    <input type='text' placeholder='firstname here please'/>
                </div>
                <div className='sub-btn'>
                    <button>
                        subscribe
                    </button>
                </div>
                
            </div>
        </div>    
    )
}

export default Subscribe;