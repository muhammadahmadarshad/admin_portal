import React from 'react';
import Pagination from 'react-js-pagination';

 const Paginate = ({total_results,match,history}) => {

  const {page}=match.params

  const {push,}=history


  function onPageChange(number){
    let a=match.url.split('/')
    push(`/${a[1]}/${number}`)
  }




  return (
    <div className='d-flex justify-content-center'>
      <Pagination
        totalItemsCount={total_results}
        activePage={page?parseInt(page):1}
        itemsCountPerPage={10}
        onChange={onPageChange}
        itemClass='page-item'
        linkClass='page-link'
        nextPageText='Next'
        prevPageText='Prev'
        lastPageText='Last'
        firstPageText='First'
        >

      </Pagination>
    </div>
  );
}

export default Paginate