import React from 'react';

const NoResults = (props) => {
  const { searchTerm } = props;

  return (
    <div className="no-results-container">
      <h1 className="no-results-header">
        Hmm... it seems like we can't find any results with the name "{searchTerm}".
      </h1>
      <p className="no-results-message">
        Please try searching another name.
      </p>
    </div>
  );
};

export default NoResults;
