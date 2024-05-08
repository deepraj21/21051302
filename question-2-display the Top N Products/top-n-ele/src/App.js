import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Router>
        <Route path="/" exact component={AllProductsPage} />
        <Route path="/product/:productId" component={ProductDetailsPage} />
    </Router>
  );
}

export default App;