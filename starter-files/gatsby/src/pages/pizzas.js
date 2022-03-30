import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzasList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage(props) {
  const {
    data: {
      pizzas: { nodes: pizzas },
    },
    pageContext: { topping },
  } = props;
  return (
    <>
      <ToppingsFilter activeTopping={topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elmMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
