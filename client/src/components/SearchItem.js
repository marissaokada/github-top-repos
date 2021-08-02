import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import convertToK from '../utils/convertToK';

const SearchItem = props => {
  const { item } = props;
  return (
    <Fragment>
      <Card>
        <Card.Header>{item.name}</Card.Header>
        <Card.Body>
          <Card.Title>{item.owner.login}</Card.Title>
          <Card.Text>
            <strong>
              {convertToK(item.stargazers_count)}{`\u2B50`}
            </strong>
            <br />
            {item.description}
          </Card.Text>
        </Card.Body>
        <Button
          href={item.html_url}
          rel="noreferrer noopener"
          target="_blank"
          variant="outline-primary"
        >
          View repo
        </Button>
      </Card>
    </Fragment>
  )
};

export default SearchItem;
