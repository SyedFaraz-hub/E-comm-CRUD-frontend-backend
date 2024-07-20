import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductlList from './components/ProductlList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
       <Routes>

        {/* PRIVATE  */}
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductlList/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>Logout component</h1>} />
        <Route path='/profile' element={<h1>Profile component</h1>} />
        </Route>


        {/* PUBLIC */}
        <Route path='/Signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
       </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
