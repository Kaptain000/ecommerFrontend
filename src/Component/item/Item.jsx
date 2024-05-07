import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

// 这段代码定义了一个名为 Item 的 React 组件。这是一个无状态函数式组件，接受一个名为 props 的参数，其中包含了组件的属性。
// 该组件的作用是渲染一个商品项目，具体的结构包括：
// 一个带有 item 类名的 div 元素。
// 一个图片元素 (img)，其 src 属性由 props.image 提供，alt 属性为空字符串。
// 一个包含商品名称的 p 元素，其内容由 props.name 提供。
// 一个包含商品价格的 div 元素，其类名为 item-prices。
// 其中包含一个新价格 (item-price-new)，其内容由 props.new_price 提供。
// 还包含一个旧价格 (item-price-old)，其内容由 props.old_price 提供。

// 通过将这个组件与不同的属性一起使用，可以在页面上显示不同的商品信息。
// 示例用法可能是这样的：
//   <Item
//     image="path/to/image.jpg"
//     name="Product Name"
//     new_price="50.00"
//     old_price="75.00"
//   />
export const Item = (props) => {
  return (
    <div className='item'>
      {/* ${} 语法可以插入 JavaScript 表达式的值 注意如果在path前加. 即{`./product/${props.id}`}则会将前面的category也添加进去。
      
          加入onClick={window.scrollTo(0,0)}时每次点击都会滚动到窗口最上方。
          因此使用onClick={() => window.scrollTo(0,0)}这样只有点击图片时，屏幕才会滚动到窗口最上方
        */}
        <Link to = {`/product/${props.id}`}><img onClick={() => window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}