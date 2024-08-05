import { Pagination } from "react-bootstrap";
import { Article } from "./interfaces";
import { ReactNode, useState } from "react";

interface CustomPaginationProps {
  articles: Article[];
  pageSize: number;
  children: (currentArticles: Article[]) => ReactNode;
}

const CustomPagination = ({ articles, pageSize, children }: CustomPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalArticles = articles?.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = articles.slice(startIndex, endIndex);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageItems = () => {
    const pageItems = [];
    const maxPageItems = 5; // Max number of page items to show
    const halfMaxPageItems = Math.floor(maxPageItems / 2);

    if (totalPages <= maxPageItems) {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage <= halfMaxPageItems + 1) {
        for (let i = 1; i <= halfMaxPageItems + 2; i++) {
          pageItems.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        pageItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
        pageItems.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      } else if (currentPage > totalPages - halfMaxPageItems - 1) {
        pageItems.push(
          <Pagination.Item
            key={1}
            onClick={() => onPageChange(1)}
          >
            1
          </Pagination.Item>
        );
        pageItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
        for (let i = totalPages - halfMaxPageItems - 1; i <= totalPages; i++) {
          pageItems.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
      } else {
        pageItems.push(
          <Pagination.Item
            key={1}
            onClick={() => onPageChange(1)}
          >
            1
          </Pagination.Item>
        );
        pageItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageItems.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        pageItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
        pageItems.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return pageItems;
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {currentArticles.length ? (
        <>
          {children(currentArticles)}
          <Pagination className="mt-3">
            <Pagination.First disabled={currentPage === 1} onClick={() => onPageChange(1)} />
            <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
            {renderPageItems()}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} />
          </Pagination>
        </>
      ) : (
        <>Sorry, no items available!</>
      )}
    </div>
  );
};

export default CustomPagination;
