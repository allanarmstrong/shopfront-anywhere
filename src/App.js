import React, { Component } from 'react';
import { createCheckout } from './checkout';
import PropTypes from 'prop-types';
import ProductList from './ProductList';
import { ProductPage } from './ProductPage';
import { graphql, gql, compose } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };
  }

componentWillMount() {
  this.props.createCheckout(
    { variables: { input: {
      allowPartialAddresses: true,
      shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}
      }}
    }).then((res) => {
    this.setState({
      checkout: res.data.checkoutCreate.checkout
    });
  });
}

  addToCart(productId) {
    console.log(productId);
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading...</div>
    }
    return (
      <main className="App">
        <header className="App__header">
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{data.shop.name}</h1>
            <h2>{data.shop.description}</h2>
          </div>
        </header>
        <div>
          <ProductList products={data.shop.products} addToCart={this.addToCart}/>
        </div>
      </main>
    );
  }
}

const query = gql`
  query query {
	shop {
		name
		moneyFormat
		products(first: 20) {
			edges {
				node {
					id
					title
					options(first: 20) {
						name
						values
					}
					variants(first: 20) {
						edges {
							node {
								id
								title
								image {
									src
								}
								price
								compareAtPrice
							}
						}
					}
					images(first: 10) {
						pageInfo {
							hasNextPage
							hasPreviousPage
						}
						edges {
							node {
								src
							}
						}
					}
				}
			}
		}
	}
} 
`;

const AppWithDataAndMutation = compose(
  graphql(query),
  graphql(createCheckout, {name: "createCheckout"})
)(App);

export default AppWithDataAndMutation;
