import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown_icon.png'
// const Navbar = () => {
export const Navbar = () => {
    // 使用 React 的 useState 钩子创建了一个名为 menu 的状态变量，并定义了一个用于更新该状态的函数 setMenu。
    //  初始状态值被设置为字符串 "shop"
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    // 创建屏幕缩小时候的下拉栏
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        // menuRef.current 引用的元素的 CSS 类列表中是否包含 nav-menu-visible 进行了切换。如果该元素原先
            // 没有这个类，则添加它；如果已经有了这个类，则移除它。这个操作的效果通常是在菜单的显示和隐藏之间进行切换。
            // menuRef.current 是一个 React 的引用，用于引用 DOM 中的某个特定元素
        menuRef.current.classList.toggle('nav-menu-visible')
        // 将事件对象 e 的目标元素（即触发了事件的元素）的 CSS 类列表中是否包含 open 进行了切换。同样，如果目标元素原先没有这个类，则添加它；
            //e.target.是针对触发了事件的元素（即事件对象 e 的目标元素）进行操作的。
        e.target.classList.toggle('open')
    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER </p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        {/* 链接这个下拉栏与ul tag */}
        <ul ref={menuRef} className="nav-menu">
            {/* hr is a self-closing tag used to create a thematic break or horizontal line between content sections,
            use style={{ textDecoration: 'none '}} to remove the line below the link. */}
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none '}} to ='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{ textDecoration: 'none '}} to ='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{ textDecoration: 'none '}} to ='/womens'>Woman</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none '}} to ='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link style={{ textDecoration: 'none '}} to ='/login'><button>Login</button></Link>}
            <Link style={{ textDecoration: 'none '}} to ='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
