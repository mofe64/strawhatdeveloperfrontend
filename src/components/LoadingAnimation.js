import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { pulse } from 'react-animations';
import '../css/components/animation.css';

const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

export default class LoadingAnimation extends Component {
    render() {
        return (
            <Pulse>
                <div className="animation-div">
                    <h1 className="animation-text">Loading...</h1>
                </div>
            </Pulse>
        );
    }
}