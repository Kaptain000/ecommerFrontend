import React, { useEffect, useState } from 'react'
import './Popular.css'
// 后端建好后，删掉 import data_product from '../Assets/data''
// import data_product from '../Assets/data'
import { Item } from '../item/Item'


export const Popular = () => {

  const [data_product, setData_Product] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4001/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>setData_Product(data))
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        {/* <hr /> 是 HTML 中的水平线元素，用于在内容中插入一条水平分隔线。 */}
        <hr />
        <div className="popular-item">
            {data_product.map((item,i)=>{
                // 给Item.jsx提供props
                // 这段代码是在使用 React 中的 JSX 语法和 map 方法将 data_product 数组中的每个对象转换为 Item 组件的实例，并为每个实例提供相应的属性（props）。具体来说：
                //   data_product 是一个包含了多个商品信息的数组。
                //   使用 map 方法遍历 data_product 数组中的每个对象。
                //   对于数组中的每个对象，都创建了一个 Item 组件的实例。
                //   每个 Item 实例都会传入对应的商品信息作为属性（props），包括 id、name、image、new_price 和 old_price。
                //   key={i} 用于为每个 Item 组件指定一个唯一的键（key），以帮助 React 识别列表中的每个项，并优化性能。
                //   返回的 JSX 代码会渲染为一系列的 Item 组件，每个组件显示一个商品的信息。
                //   简而言之，这段代码的作用是将 data_product 中的商品信息渲染为一个个的 Item 组件，并将商品的相关信息传递给每个组件作为属性。
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
