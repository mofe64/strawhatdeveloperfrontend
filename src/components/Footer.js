import { Link } from 'react-router-dom';
import '../css/components/Footer.css';
const Footer = () => {
    return (
        <footer className='footer-container'> 
            <div className='wrapper footer-box'>
                <div>
                    <p>Eyimofe Ogunbiyi &#10084;</p>
                </div>
                <div className='footer-links'> 
                    <Link>Portfolio</Link>
                    <Link>Socials</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;