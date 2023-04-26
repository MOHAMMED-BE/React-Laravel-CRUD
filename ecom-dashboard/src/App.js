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
  let baseUrl = '';
  let localEnv = true;

  localEnv ? baseUrl = 'http://127.0.0.1:8000' : baseUrl = 'https://crud-reactlaravel.herokuapp.com';

  return (
    <div className="App">
      <Router basename="/React-Laravel-CRUD">
        <Header />
        <Routes>

          <Route path='/login' element={
            <ToastProvider autoDismiss >
              <Login baseUrl={baseUrl} />
            </ToastProvider>
          } />

          <Route path='/register' element={
            <ToastProvider autoDismiss>
              <Register baseUrl={baseUrl}/>
            </ToastProvider>
          } />

          <Route path='/add' element={
            <ToastProvider autoDismiss >
              <Protected baseUrl={baseUrl} Cmp={AddProduct } />
            </ToastProvider>
          } />

          <Route path='/update/:id' element={
            <ToastProvider autoDismiss >
              <Protected baseUrl={baseUrl} Cmp={UpdateProduct} />
            </ToastProvider>
          } />

          <Route path='/search' element={
            <ToastProvider autoDismiss >
              <Protected baseUrl={baseUrl} Cmp={SearchProduct} />
            </ToastProvider>
          } />

          <Route path='/' element={
            <ToastProvider autoDismiss >
              <Protected baseUrl={baseUrl} Cmp={ProductList} />
            </ToastProvider>
          } />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
