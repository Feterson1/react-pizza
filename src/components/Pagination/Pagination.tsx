import { current } from '@reduxjs/toolkit';
import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const PaginationComponent:React.FC<PaginationProps> = ({ currentPage, onChangePage }) =>{
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
}

export default PaginationComponent;