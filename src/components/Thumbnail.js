import '../css/components/Thumbnail.css';
const Thumbnail = ({goToFunction=f=>f}) => {
    return (
        <div className='thumbnail'>
            <div className='thumbnail-header'>
                <h2 onClick={goToFunction}>Setting up a Decentralized Website (ENS + IPFS =dWeb)</h2>
                <div className='thumbnail-meta'>
                    <p className='thumbnail-date'>jun 18, 2021</p>
                    <p className='thumbnail-tag'>  &#x2615; web3</p>
                </div>
            </div>
            <div className='thumbnail-body'>
                <p>
                    One thing that I’ve been really into lately has been ENS names. As someone who’s already obsessed with buying domain names, ENS names have been an even greater obsession (mostly because of emoji names, like ✊🏾✊🏾✊🏾.eth)! So what are ENS names, exactly? And what is a “decentralised website”..
                </p>
            </div>
        </div>
    )
}

export default Thumbnail;