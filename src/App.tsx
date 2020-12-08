import React from 'react';
//components
import {Product,ProductCart} from './components/index';
///style.css
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="shopping">Shopping Basket</h1>
    <Product />
    <ProductCart />
    </div>
  );
}

export default App;
