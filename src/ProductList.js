import React, { Component } from 'react';
import { Product } from './Product';

class ProductList extends Component {
  render() {
    const { products, addToCart } = this.props;
    return (<div>
          { products.edges.map((edge, idx) => {
              return <Product product={edge.node} key={idx} addToCart={addToCart}/>
            })}
        </div>)
  }
}

export default ProductList;