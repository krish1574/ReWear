import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => (
  <nav className="p-4 bg-blue-500 text-white flex justify-between">
    <Link to="/">ReWear</Link>
    <div>
      <Link to="/dashboard" className="mx-2">Dashboard</Link>
      <Link to="/add-item" className="mx-2">Add Item</Link>
    </div>
  </nav>
);
export default Navbar;