import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// 后端建好后，删掉import new_collection from '../Assets/new_collections'
// import new_collection from '../Assets/new_collections'
import { Item } from '../item/Item'


export const NewCollections = () => {

  const [new_collection, setNew_Collections] = useState([]);

  useEffect(()=>{
    fetch('https://commerceweb-f4f47fbd37d5.herokuapp.com/newcollections')
    .then((res)=>res.json())
    .then((data)=>setNew_Collections(data))
  },[])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
