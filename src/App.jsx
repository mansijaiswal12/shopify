import React  from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Addproducts from './pages/Addproducts'
import AddproductsWomen from './pages/AddproductsWomen'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Products from './pages/Products'
import Categories from './pages/Categories'
import AddCatMens from './pages/AddCatMens'
import AddCatWomens from './pages/AddCatWomens'
import ProductDetails from './pages/ProductDetails'


const App = () => {
  return (

    <>
    <Navbar/>

    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<Signup/>}/>
        <Route path='/addprouductmen' element={<Addproducts/>}/>
        <Route path='/addproductswomen' element={<AddproductsWomen/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/addcatmens' element={<AddCatMens/>}/>
        <Route path='/addcatmens' element={<AddCatWomens/>}/>
        <Route path='/details/:id' element={<ProductDetails />}/>
       
        {/* <Route path='/card' element={<Card/>}/> */}
         
       
    </Routes>
    <Footer/>  
    </>  
  )

}

export default App

