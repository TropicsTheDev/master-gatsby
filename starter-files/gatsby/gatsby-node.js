import path from 'path';

async function turnPizzasIntoPages(params) {
  const { graphql, actions } = params;
  // Make page template
  const pizzaTemplate = path.resolve('./src/tepmlates/Pizza.js');
  // Query all pizzas
  const {
    data: {
      pizzas: { nodes: pizzas },
    },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // Loop over each pizza and make a page
  pizzas.forEach((pizza) => {
    actions.createPage({
      // url for the new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        tropics: 'is cool',
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages(params) {
  const { graphql, actions } = params;
  // Make page template
  const toppingTemplate = path.resolve('./src/tepmlates/Pizza.js');
  // Query all pizzas
  const {
    data: {
      toppings: { nodes: toppings },
    },
  } = await graphql(`
    query {
      toppings: allSanityToppings {
        nodes {
          id
          name
        }
      }
    }
  `);
  // Loop over each topping and make a page
  toppings.forEach((topping) => {
    actions.createPage({
      // url for the new page
      path: `topping/${topping.slug.current}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes(params) {
  const { actions, createNodeId, createContentDigest } = params;
  // Fetch a list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // Loop over list
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // Create a node for the beer
}

async function turnSlicemastersIntoPages(params) {
  const { grapql, actions } = params;
  // Query the slicemasters
  const {
    data: { slicemasters },
  } = await grapql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO turn each slicemaster into a page
  // Figure out how many there are and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(slicemasters.totalCount / pageSize);
  console.log(
    `There are ${slicemasters.totalCount} total people, and there ${pageCount} pages with ${pageSize} per page`
  );
  // Loop from 1 to n
  for (let i = 0; i < pageCount; i += 1) {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  }

  // Another way to do the above loop
  // Array.from({ length: pageCount }).forEach((_, i) => {});
}

export async function sourceNodes(params) {
  // fetch the beers and source to Gatsby
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // Pizzas
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // Toppings
  // Slicemasters
}
