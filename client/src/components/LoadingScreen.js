import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingScreen = () => {
  return (
    <div className="loading-screen-container">
      <Spinner animation="border" size="med" />
      <p className="loading-screen-message">
        Loading data...
      </p>
    </div>
  )
}

export default LoadingScreen;
