import React from 'react';
import Pagination from 'react-js-pagination';

 const Paginate = ({total_results,match,history,url,count}) => {

  const {page}=match.params
  const {push}=history
  

  function onPageChange(number){

    push(url+number)
  }




  return (
    <div className='d-flex justify-content-center mt-5'>
      <Pagination
        totalItemsCount={total_results}
        activePage={page?parseInt(page):1}
        itemsCountPerPage={count}
        onChange={onPageChange}
        pageRangeDisplayed={5}
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