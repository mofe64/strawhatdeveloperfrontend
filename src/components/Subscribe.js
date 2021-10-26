import React,{useState} from 'react';
import '../css/components/Subscribe.css';
import { subscribe } from '../actions/subscribeActions';

const Subscribe = () => {
    const hasSubbedCheck = window.sessionStorage.getItem('strawhatdev-subbed');
    const hasDismissedCheck = window.sessionStorage.getItem('hasDismissed');
    const [hasSubbed, setHasSubbed] = useState(hasSubbedCheck);
    const [confirmed, setConfirmed] = useState(hasDismissedCheck);
    const [firstname, setfirstname] = useState('');
    const [email, setEmail] = useState('');
    const dismiss = () => {
        window.sessionStorage.setItem('hasDismissed',true)
        setConfirmed(true);
    };

    const subscribeFunction = () => {
        const details = { firstname, email };
        subscribe(details)
            .then(data => {
                window.sessionStorage.setItem('strawhatdev-subbed', true);
                setHasSubbed(true);
            })
            .catch(err => {
                console.log(err);
            });
        
    };
    if (hasSubbed) {
        return (
            <div
                className='subscribe-div'
                style={(confirmed) ? { display: 'none' } : { display: 'flex' }}
            >
                <div className='sub-box wrapper'>
                    <div className='confirmation'>
                        <h1>Thanks for subscribing ❤</h1>
                        <br/>
                        <p
                            onClick={dismiss}
                        >
                            dismiss
                        </p>
                    </div>
                </div>
               
            </div>
        )
    }
    return (
        <div className='subscribe-div'>
            <div className='sub-box wrapper'>
                <div className='sub-header'>
                    <p>Sometimes I write and on even rarer occasions the stuff i write ends up been cool,stick around and find out what the next episode will bring &#128513;</p>
                </div>
                <div className='sub-body'>
                    <input
                        type='email'
                        placeholder='email here please'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='firstname here please'
                        value={firstname}
                        onChange={e=> setfirstname(e.target.value)}
                    />
                </div>
                <div className='sub-btn'>
                    <button
                        onClick={subscribeFunction}
                    >
                        subscribe
                    </button>
                </div>
                
            </div>
        </div>    
    )
}

export default Subscribe;