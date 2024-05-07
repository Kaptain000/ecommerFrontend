import React, { useContext } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { Breadcrums } from '../Component/Breadcrums/Breadcrums'
import { ProductDisplay } from '../Component/ProductDisplay/ProductDisplay'
import { DescriptionBox } from '../Component/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Component/RelatedProducts/RelatedProducts'


export const Product = () => {
  const {all_product} = useContext(ShopContext)
  // 使用useParams来获取product_id
  // useParams() 钩子来获取 URL 中的参数。在这里，假设你的路由配置中有一个参数为 product_id 的路径参数。
  // const {product_id} = useParams();

  // 分清楚const {xxx} = ... 和 const xxx = ... 的区别
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id===Number(productId));
  return (
    <div className='product'>
        <Breadcrums product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
    </div>
  )
}
