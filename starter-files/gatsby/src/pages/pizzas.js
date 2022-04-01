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
  console.log({ topping });
  return (
    <>
      <ToppingsFilter activeTopping={topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
