import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 1rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination(props) {
  const { pageSize, totalCount, currentPage, skip, base } = props;
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationStyles>
      <Link to={`/${base}/${currentPage - 1}`} disabled={!hasPrevPage}>
        &ShortLeftArrow; Prev
      </Link>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link to={`/${base}/${i > 0 ? i + 1 : ''}`}>{i + 1}</Link>
      ))}
      <Link to={`/${base}/${currentPage + 1}`} disabled={!hasNextPage}>
        Next &rightarrow;
      </Link>
    </PaginationStyles>
  );
}
