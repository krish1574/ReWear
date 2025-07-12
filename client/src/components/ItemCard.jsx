import React from 'react';
const ItemCard = ({ item }) => (
  <div className="border p-4 rounded">
    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
    <h2 className="font-bold mt-2">{item.title}</h2>
    <p>{item.description}</p>
  </div>
);
export default ItemCard;