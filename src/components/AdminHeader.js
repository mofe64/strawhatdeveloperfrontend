import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import '../css/components/Header.css';
const AdminHeader = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const history = useHistory();

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };
    const goToSearch = () => {
        history.push('/search')
    };
    const goHome = () => {
        history.push('/');
    };

    return (
        <>
            <div className='nav-container'>
                <div className='nav-top wrapper'
                style={(showDrawer===true)? {paddingTop: '3.1rem'}:{paddingTop: '0'}}
                >
                    <div className='nav-left'>
                        <FontAwesomeIcon icon={
                            (showDrawer === false) ? faBars : faTimes
                        } className='ham-icon icon' onClick={toggleDrawer}/>
                    </div>
                    <div className='nav-middle'>
                        <p className='nav-text'
                            onClick={goHome}
                        >
                            StrawhatDeveloper
                        </p>
                    </div>
                    <div className='nav-right'>
                        <FontAwesomeIcon icon={faSearch} className='search-icon icon' onClick={goToSearch}/>
                    </div>
                </div>
                <div className={`nav-bottom wrapper ${(showDrawer === true) ? 'show-flex' : 'hide'}`}>
                    <Link to='/admin/createpost'>Create Post</Link>
                    <Link to='/admin/all'>All Posts</Link>
                    <Link to='/admin/drafts'>Drafts</Link>
                </div>
            </div>
        </>
    )
}

export default AdminHeader;