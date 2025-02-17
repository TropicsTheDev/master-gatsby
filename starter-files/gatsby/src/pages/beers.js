import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(autofit, minmax(200px, 1fr));
`;

const BeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

export default function BeersPage(props) {
  const {
    data: {
      beers: { nodes: beers },
    },
  } = props;
  return (
    <>
      <h2 className="center">
        We have {beers.length} Beers available! Dine in Only
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating ? beer.rating.average : 0);
          return (
            <BeerStyles key={beer.id}>
              <img src={beer.img} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating ? beer.rating.reviews : 0})</span>
              </p>
            </BeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
