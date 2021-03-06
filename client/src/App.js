import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import NoResults from './components/NoResults';
import PaginationWrapper from './components/Pagination';
import SearchBar from './components/SearchBar';
import SearchItem from './components/SearchItem';
/* import CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const apiRoutes = {
  'search': '/api/search/repositories',
  'top': '/api/top/repositories'
};
const pageLimit = 20;

// Main app component
const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('top');

  const prevValues = useRef({page, searchTerm, searchType});
  const repoSearchRequest = { searchTerm, page, per_page: pageLimit };

  // Fetches repos
  const fetchRepos = async () => {
    setIsLoading(true);
    const reqObj = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(repoSearchRequest)
    };
    try {
      const res = await fetch(apiRoutes[searchType], reqObj);
      const data = await res.json();
      setData(data);
    } catch(error) {
      console.error(error);
    }
    setIsLoading(false);
    // handle for search term
    if (isSubmitting) setIsSubmitting(false);
  };

  // Handles typing into search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // handles submit button for search bar
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handles case when searching multiple times and when user enters a blank search
    if (searchTerm.length > 0) {
      setIsSubmitting(true);
      setPage(1);
      setSearchType('search');
    } else {
      setIsSubmitting(false);
      setPage(1);
      setSearchType('top');
    }
  }

  // Creates <SearchItem /> components for each github data
  const mapSearchItems = () => {
    if (data && data.githubData) {
      const { items } = data.githubData;
      if (items.length > 0) {
        return (
          items.map((item, idx) => <SearchItem key={idx} item={item} /> )
        );
      } else {
        return (
          <NoResults searchTerm={searchTerm} />
        );
      }
    } else {
      return (
        <ErrorScreen />
      );
    }
  }

  // Handler for changing pages
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setPage(page);
    },
    [setPage]
  );

  useEffect(() => { 
    // User search 
    if (!!isSubmitting && searchType === 'search' && (prevValues.current.searchTerm !== searchTerm)) {
      prevValues.current.searchTerm = searchTerm;
      prevValues.current.page = page;
      fetchRepos();
    }

    // Basic default search
    if ((!isSubmitting) && (searchType === 'top')) {
      prevValues.current.page = page;
      prevValues.current.searchType = searchType;
      fetchRepos();
    }

    // Page Change
    if (prevValues.current.page !== page) {
      prevValues.current.page = page;
      fetchRepos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, page, searchType]);

  return (
    <div className="app-main">
      <SearchBar
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
        searchTerm= {searchTerm}
      />
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
          <Fragment>
            {mapSearchItems()}
            {
              data && data.githubData &&
              <PaginationWrapper
                currentPage={page}
                onPageChanged={onPageChanged}
                pageLimit={pageLimit}
                pageNeighbours={2}
                totalRecords={data.githubData.total_count}
              />
            }

          </Fragment>
        )
      }
    </div>
  );
}

export default App;
