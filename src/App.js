
import './App.css';
import { Navbar } from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Component/Footer/Footer';
import men_banner from './Component/Assets/banner_mens.png'
import women_banner from './Component/Assets/banner_women.png'
import kid_banner from './Component/Assets/banner_kids.png'

function App() {
  return (
    <div>
      {/* BrowserRouter 组件使用 HTML5 的 History API（pushState()，replaceState() 和 popstate 事件）来处理页面导航，
      而不需要进行页面刷新。 BrowserRouter 是一个容器，用于包装整个应用程序，并提供 HTML5 的路由功能。而路由规则（routes）
      则是通过 Route 组件来定义的，这些 Route 组件通常嵌套在 BrowserRouter 内部。*/} 
      <BrowserRouter>
      {/* put Navbar inside BrowserRouter so the Navbar will be avaliable to all the components */}
      <Navbar/>
      <Routes>
        {/* set Route with the path and its corresponding page(inside the pages file) */}
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
          {/* add product id path */}
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
