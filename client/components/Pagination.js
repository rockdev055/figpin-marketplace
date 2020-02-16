import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyle from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    pinsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);
  const count = data.pinsConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);
  const page = props.page;
  return (
    <PaginationStyle>
      <Head>
        <title>
          FiGPiN - Page {page} of {pages}
        </title>
      </Head>
      <Link prefetch href={{ pathname: 'pins', query: { page: page - 1 } }}>
        <a className="prev" aria-disabled={page <= 1}>
          {' '}
          {`<- Prev`}
        </a>
      </Link>
      <p>
        Page {props.page} of {pages}
      </p>
      <Link prefetch href={{ pathname: 'pins', query: { page: page + 1 } }}>
        <a className="next" aria-disabled={page >= pages}>
          {`Next ->`}
        </a>
      </Link>
    </PaginationStyle>
  );
};

export default Pagination;
