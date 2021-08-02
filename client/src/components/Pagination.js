import React, { Fragment, useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
// import '../styles/Pagination.css';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const PaginationWrapper = props => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage
  } = props;
  
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTotalPages]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];
  return (
    <Fragment>
      <Pagination>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <PageItem
                href="/"
                key={index}
                onClick={(e) => onPageChanged(e, pageNeighbours * 2 - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </PageItem>
            );

          if (page === RIGHT_PAGE)
            return (
              <PageItem
                href="/"
                key={index}
                onClick={(e) => onPageChanged(e, pageNeighbours * 2 + 3)}
              >
                <span aria-hidden="true">&raquo;</span>
              </PageItem>
            );

          return (
            <PageItem
              className={`page-item${currentPage === page ? " active" : ""}`}
              href="/"
              key={index}
              onClick={(e) => onPageChanged(e, page)}
            >
              {page}
            </PageItem>
          );
        })}
      </Pagination>
    </Fragment>
  );
};

export default PaginationWrapper;
