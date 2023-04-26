import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductList from './components/ProductList';
import SearchProduct from './components/SearchProduct'
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
