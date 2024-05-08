import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {all_product, cartItems, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount, getShipingFee} = useContext(ShopContext)
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>products</p>
                <p>Title</p>
                <p>price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={e.image} alt="" className='carticon-product-icon' />
                                    <p>{e.name}</p>
                                    <p className='price'>${e.new_price}</p>
                                    <div className="quantity">
                                        <p onClick={() => { addToCart(e.id) }}>+</p>
                                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                        <p onClick={() => { removeFromCart(e.id) }}>-</p>
                                    </div>
                                    <p>${e.new_price * cartItems[e.id]}</p>
                                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { deleteFromCart(e.id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                }
                return null
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>${getShipingFee().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Estimated tax</p>
                            <p>${(getTotalCartAmount() * 0.07).toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${parseFloat((getTotalCartAmount() * 1.07).toFixed(2)) + parseFloat(getShipingFee().toFixed(2))}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
