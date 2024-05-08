import React, { createContext, useEffect, useState } from "react";
// 在创建好backend后将import all_product from '../Component/Assets/all_product'删掉
// import all_product from '../Component/Assets/all_product'

// 调用 createContext 函数创建上下文对象。createContext 函数接受一个初始值作为参数，
//   这个初始值在没有匹配到 Provider 时将作为默认值传递给消费者组件。在这里，初始值被设置为 null。

// 问题是为什么不直接 export const ShopContext = createContext({all_product}); 这样底下的ShopContextProvider不是就可以不需要了？
export const ShopContext = createContext();

// 创建空的cart，长度为所有product的长度
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

// 创建了一个名为 ShopContextProvider 的组件，它使用 ShopContext.Provider 为整个应用程序提供了一个包含
//    all_product 数据的上下文。
const ShopContextProvider = (props) => {

    const[all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    // 使用API从MongoDB中获取all_product
    useEffect(()=>{
        fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/getcart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }
    },[])
    
    // 导出log看cartItems的内容
    // console.log(cartItems);

    const addToCart = (itemId) => {
        // {...prev} 表示创建了一个先前状态对象的副本。然后，[itemId]: prev[itemId] + 1 这部分是用来更新
            // 指定 itemId 的数量，在副本对象中，增加了 1。最后，通过 setCartItems 将更新后的状态设置为新的购物车项目状态。
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        // 如果localStorage里有auth-token，意味着我们处于登录状态
        if(localStorage.getItem('auth-token')){
            fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/addtocart', {
                method: 'POST',
                headers: {
                    // 在Admin中upload数据的时候用的就是formData
                    Accept: 'application/form-data',
                    // auth-token 就是加密后的userId
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                // 向服务器传送itemId
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        // 如果localStorage里有auth-token，意味着我们处于登录状态
        if(localStorage.getItem('auth-token')){
            fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/removefromcart', {
                method: 'POST',
                headers: {
                    // 在Admin中upload数据的时候用的就是formData
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }

    const deleteFromCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:0}))
        // 如果localStorage里有auth-token，意味着我们处于登录状态
        if(localStorage.getItem('auth-token')){
            fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/deletefromcart', {
                method: 'POST',
                headers: {
                    // 在Admin中upload数据的时候用的就是formData
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        all_product.map((e) => {
            if(cartItems[e.id]>0){
                totalAmount = totalAmount + cartItems[e.id] * e.new_price
            }
        })
        return totalAmount
    }

    // 另一种计算total amount的方法
    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for(const item in cartItems){
    //         if(cartItems[item]>0){
    //             let iteminfo = all_product.find((product)=>product.id===Number(item))
    //             totalAmount += iteminfo.new_price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }

    const getTotalCartItems = () =>{
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems += cartItems[item]
            }
        }
        return totalItems
    }

    const getShipingFee = () =>{
        let shippingFee = 7;
        let totalAmount = 0;
        let totalItems = 0;
        all_product.map((e) => {
            if(cartItems[e.id]>0){
                totalItems += cartItems[e.id]
                totalAmount = totalAmount + cartItems[e.id] * e.new_price
            }
        })
        if(totalAmount>25 || totalItems===0){
            shippingFee = 0;
        }
        return shippingFee
    }

    // 将all_product, cartItem, addToCart function 和 removeFromCart function 的所有信息储存于变量contextValue
    const contextValue = {all_product, cartItems, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount, getTotalCartItems, getShipingFee};

    return (
        // 使用 ShopContext.Provider 来为 ShopContext 提供值
        // 使用 ShopContext.Provider 来包裹 props.children。ShopContext.Provider 是 ShopContext 上下文提供者，
        //     它接受一个名为 value 的属性，用于传递上下文的值给消费者组件。在这个例子中，value 被设置为 contextValue，
        //     这意味着所有在 ShopContext.Provider 内部的组件都能够访问到 all_product 的值。最后，通过 { props.children } 
        //     来渲染 ShopContext.Provider 内部的所有子组件，确保它们能够正确地获取到上下文的值
        < ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider >
    )
}

// 直接导出 ShopContextProvider 组件作为默认导出
export default ShopContextProvider