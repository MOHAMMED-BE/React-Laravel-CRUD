import './App.css';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Protected from './Protected';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          <Route path='/login' element={
            <ToastProvider autoDismiss >
              <Login />
            </ToastProvider>
          } />

          <Route path='/register' element={
            <ToastProvider autoDismiss>
              <Register />
            </ToastProvider>
          } />

          <Route path='/add' element={
            <ToastProvider autoDismiss >
              <Protected Cmp={AddProduct} />
            </ToastProvider>
          } />

          <Route path='/update/:id' element={
            <ToastProvider autoDismiss >
              <Protected Cmp={UpdateProduct} />
            </ToastProvider>
          } />

          <Route path='/search' element={
            <ToastProvider autoDismiss >
              <Protected Cmp={SearchProduct} />
            </ToastProvider>
          } />

          <Route path='/' element={
            <ToastProvider autoDismiss >
              <Protected Cmp={ProductList} />
            </ToastProvider>
          } />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
