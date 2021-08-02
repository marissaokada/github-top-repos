import React from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = props => {
  const {
    handleChange,
    handleSubmit,
    searchTerm
  } = props;



  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  // }

  return(
    <div className="feed-search-bar-container">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Repositories"
          aria-label="Search Repositories"
          aria-describedby="search-submit"
          onChange={(event) => handleChange(event)}
          onKeyDown={(event) => handleKeyPress(event)}
          value={searchTerm}
        />
        <Button
          id="search-submit"
          onClick={(event) => handleSubmit(event)}
          type="submit"
          variant="outline-secondary"
        >
          Submit
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
