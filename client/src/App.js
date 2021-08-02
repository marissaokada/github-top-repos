import React, { Fragment, useCallback, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import PaginationWrapper from './components/Pagination';
import SearchBar from './components/SearchBar';
import SearchItem from './components/SearchItem';
/* import CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const apiRoutes = {
  'search': 'api/search/repositories',
  'top': '/api/top/repositories'
};
const pageLimit = 20;


const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('top');
  const repoSearchRequest = { searchTerm, page, per_page: pageLimit };

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
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setSearchType('search');
    fetchRepos();
  }

  const mapSearchItems = () => {
    const { items } = data.githubData;
    return (
      items.map((item, idx) => <SearchItem key={idx} item={item} /> )
    )
  }

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setPage(page);
    },
    [setPage]
  );

  useEffect(() => {
    fetchRepos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


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
            <PaginationWrapper
              currentPage={page}
              onPageChanged={onPageChanged}
              pageLimit={pageLimit}
              pageNeighbours={2}
              totalRecords={data.githubData.total_count}
            />
          </Fragment>
        )
      }
    </div>
  );
}

export default App;
