import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
      <div id="webcrumbs"> 
        	<div className="w-[1200px] mx-auto bg-white min-h-screen">
	  <header  className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
	    <div className="flex items-center justify-between">
	      <div className="flex items-center space-x-2">
	        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
	          <span  className="material-symbols-outlined text-white text-xl">landscape</span>
	        </div>
	        <h1 className="text-2xl font-bold text-gray-900">ReWear</h1>
	      </div>
	      <nav className="hidden md:flex items-center space-x-8">
	        <a href="#" className="text-gray-700 hover:text-primary-500 transition-colors">Browse Items</a>
	        <a href="#" className="text-gray-700 hover:text-primary-500 transition-colors">My Dashboard</a>
	        <a href="#" className="text-gray-700 hover:text-primary-500 transition-colors">How It Works</a>
	        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
	          List an Item
	        </button>
          <Link to="/signup" className="text-gray-700 hover:text-primary-500 transition-colors">
  Sign up
</Link>

<Link
  to="/login"
  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
>
  Login
</Link>
	      </nav>
	      <div className="flex items-center space-x-4">
	        <div className="relative">
	          <details className="relative">
	            <summary className="flex items-center space-x-2 cursor-pointer">
	              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
	                <span className="material-symbols-outlined text-gray-600 text-sm">person</span>
	              </div>
	              <span className="material-symbols-outlined text-gray-600">expand_more</span>
	            </summary>
	            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
	              <div className="py-2">
	                <a  href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</a>
	                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Settings</a>
	                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Logout</a>
	              </div>
	            </div>
	          </details>
	        </div>
	      </div>
	    </div>
	  </header>
	
	  <main  className="px-6 py-8">
	    <section className="text-center mb-16">
	      <h2  className="text-5xl font-bold text-gray-900 mb-6">
	        Give Your Clothes a Second Life
	      </h2>
	      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
	        Exchange unused clothing through direct swaps or our point-based system. Promote sustainable fashion and reduce textile waste.
	      </p>
	      <div className="flex flex-col sm:flex-row gap-4 justify-center">
	        <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors transform hover:scale-105">
	          Start Swapping
	        </button>
	        <button className="border border-primary-500 text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
	          Browse Items
	        </button>
	        <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
	          List an Item
	        </button>
	      </div>
	    </section>
	
	    <section className="mb-16">
	      <div className="flex items-center justify-between mb-8">
	        <h3 className="text-3xl font-bold text-gray-900">Featured Items</h3>
	        <div className="flex space-x-2">
	          <button  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
	            <span className="material-symbols-outlined">chevron_left</span>
	          </button>
	          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
	            <span className="material-symbols-outlined">chevron_right</span>
	          </button>
	        </div>
	      </div>
	      
	      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
	        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
	          <div className="relative">
	            <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop" alt="Vintage Denim Jacket" keywords="vintage, denim, jacket, clothing" className="w-full h-48 object-cover" />
	            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
	              Available
	            </div>
	          </div>
	          <div  className="p-4">
	            <h4 className="font-semibold text-gray-900 mb-1">Vintage Denim Jacket</h4>
	            <p className="text-sm text-gray-600 mb-2">Size: M • Excellent condition</p>
	            <div className="flex items-center justify-between">
	              <span className="text-primary-500 font-semibold">50 Points</span>
	              <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600 transition-colors">
	                Swap
	              </button>
	            </div>
	          </div>
	        </div>
	
	        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
	          <div className="relative">
	            <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop" alt="Summer Dress" keywords="summer, dress, floral, clothing" className="w-full h-48 object-cover" />
	            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
	              Available
	            </div>
	          </div>
	          <div className="p-4">
	            <h4 className="font-semibold text-gray-900 mb-1">Floral Summer Dress</h4>
	            <p className="text-sm text-gray-600 mb-2">Size: S • Good condition</p>
	            <div className="flex items-center justify-between">
	              <span className="text-primary-500 font-semibold">35 Points</span>
	              <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600 transition-colors">
	                Swap
	              </button>
	            </div>
	          </div>
	        </div>
	
	        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
	          <div className="relative">
	            <img src="https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=400&h=300&fit=crop" alt="Leather Boots" keywords="leather, boots, brown, shoes" className="w-full h-48 object-cover" />
	            <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
	              Pending
	            </div>
	          </div>
	          <div className="p-4">
	            <h4 className="font-semibold text-gray-900 mb-1">Leather Ankle Boots</h4>
	            <p className="text-sm text-gray-600 mb-2">Size: 8 • Very good condition</p>
	            <div  className="flex items-center justify-between">
	              <span className="text-primary-500 font-semibold">60 Points</span>
	              <button className="bg-gray-300 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed">
	                Swap
	              </button>
	            </div>
	          </div>
	        </div>
	
	        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
	          <div className="relative">
	            <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=300&fit=crop" alt="Cozy Sweater" keywords="sweater, knit, cozy, winter" className="w-full h-48 object-cover" />
	            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
	              Available
	            </div>
	          </div>
	          <div className="p-4">
	            <h4 className="font-semibold text-gray-900 mb-1">Cozy Knit Sweater</h4>
	            <p className="text-sm text-gray-600 mb-2">Size: L • Excellent condition</p>
	            <div className="flex items-center justify-between">
	              <span className="text-primary-500 font-semibold">45 Points</span>
	              <button className="bg-primary-500 text-white px-3 py-1 rounded text-sm hover:bg-primary-600 transition-colors">
	                Swap
	              </button>
	            </div>
	          </div>
	        </div>
	      </div>
	    </section>
	
	    <section className="mb-16">
	      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
	      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
	        <div className="text-center">
	          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
	            <span className="material-symbols-outlined text-primary-500 text-2xl">upload</span>
	          </div>
	          <h4 className="text-xl font-semibold text-gray-900 mb-2">List Your Items</h4>
	          <p className="text-gray-600">Upload photos and details of clothes you no longer wear. Set swap preferences or point values.</p>
	        </div>
	        
	        <div className="text-center">
	          <div  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
	            <span className="material-symbols-outlined text-primary-500 text-2xl">swap_horiz</span>
	          </div>
	          <h4 className="text-xl font-semibold text-gray-900 mb-2">Make Swaps</h4>
	          <p className="text-gray-600">Browse items from other users and request swaps. Use points earned from successful exchanges.</p>
	        </div>
	        
	        <div className="text-center">
	          <div  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
	            <span className="material-symbols-outlined text-primary-500 text-2xl">landscape</span>
	          </div>
	          <h4 className="text-xl font-semibold text-gray-900 mb-2">Reduce Waste</h4>
	          <p className="text-gray-600">Give clothes a second life while building a sustainable wardrobe. Every swap helps the environment.</p>
	        </div>
	      </div>
	    </section>
	
	    <section className="bg-gray-50 rounded-2xl p-8 mb-16">
	      <div className="text-center mb-8">
	        <h3  className="text-3xl font-bold text-gray-900 mb-4">Your Dashboard Preview</h3>
	        <p className="text-gray-600">Track your swaps, points, and listed items all in one place.</p>
	      </div>
	      
	      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
	        <div className="bg-white rounded-lg p-6 shadow-sm">
	          <div className="flex items-center justify-between mb-4">
	            <h4 className="font-semibold text-gray-900">Profile Overview</h4>
	            <span className="material-symbols-outlined text-gray-400">person</span>
	          </div>
	          <div className="space-y-3">
	            <div className="flex justify-between">
	              <span  className="text-gray-600">Total Points</span>
	              <span className="font-semibold text-primary-500">125</span>
	            </div>
	            <div className="flex justify-between">
	              <span className="text-gray-600">Items Listed</span>
	              <span  className="font-semibold">8</span>
	            </div>
	            <div className="flex justify-between">
	              <span className="text-gray-600">Successful Swaps</span>
	              <span  className="font-semibold">12</span>
	            </div>
	          </div>
	        </div>
	        
	        <div className="bg-white rounded-lg p-6 shadow-sm">
	          <div className="flex items-center justify-between mb-4">
	            <h4 className="font-semibold text-gray-900">Recent Activity</h4>
	            <span className="material-symbols-outlined text-gray-400">history</span>
	          </div>
	          <div className="space-y-3">
	            <div className="flex items-center space-x-3">
	              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
	              <span className="text-sm text-gray-600">Swap completed: Blue Jeans</span>
	            </div>
	            <div className="flex items-center space-x-3">
	              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
	              <span className="text-sm text-gray-600">New swap request received</span>
	            </div>
	            <div className="flex items-center space-x-3">
	              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
	              <span className="text-sm text-gray-600">Item listed: Red Sweater</span>
	            </div>
	          </div>
	        </div>
	        
	        <div className="bg-white rounded-lg p-6 shadow-sm">
	          <div  className="flex items-center justify-between mb-4">
	            <h4 className="font-semibold text-gray-900">Pending Swaps</h4>
	            <span className="material-symbols-outlined text-gray-400">pending</span>
	          </div>
	          <div className="space-y-3">
	            <div  className="flex items-center justify-between">
	              <span className="text-sm text-gray-600">Winter Coat</span>
	              <span  className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
	            </div>
	            <div className="flex items-center justify-between">
	              <span  className="text-sm text-gray-600">Running Shoes</span>
	              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Requested</span>
	            </div>
	            <div className="flex items-center justify-between">
	              <span className="text-sm text-gray-600">Summer Dress</span>
	              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Approved</span>
	            </div>
	          </div>
	        </div>
	      </div>
	    </section>
	
	    <section className="text-center">
	      <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Swapping?</h3>
	      <p className="text-xl text-gray-600 mb-8">Join thousands of users already making sustainable fashion choices.</p>
	      <div className="flex flex-col sm:flex-row gap-4 justify-center">
	        <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors transform hover:scale-105">
	          Create Account
	        </button>
	        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
	          Learn More
	        </button>
	      </div>
	    </section>
	  </main>
	
	  <footer className="bg-gray-900 text-white px-6 py-12 mt-16">
	    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
	      <div>
	        <div className="flex items-center space-x-2 mb-4">
	          <div  className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
	            <span className="material-symbols-outlined text-white text-sm">landscape</span>
	          </div>
	          <h4 className="text-xl font-bold">ReWear</h4>
	        </div>
	        <p className="text-gray-400">Making sustainable fashion accessible to everyone through community clothing exchange.</p>
	      </div>
	      
	      <div>
	        <h5 className="font-semibold mb-4">Platform</h5>
	        <div className="space-y-2">
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">Browse Items</a>
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">List an Item</a>
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">Points System</a>
	        </div>
	      </div>
	      
	      <div >
	        <h5  className="font-semibold mb-4">Support</h5>
	        <div className="space-y-2">
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
	          <a  href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">Safety Guidelines</a>
	          <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community Rules</a>
	        </div>
	      </div>
	      
	      <div>
	        <h5 className="font-semibold mb-4">Connect</h5>
	        <div className="flex space-x-3">
	          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
	            <i className="fa-brands fa-facebook text-white"></i>
	          </a>
	          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
	            <i className="fa-brands fa-twitter text-white"></i>
	          </a>
	          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
	            <i className="fa-brands fa-instagram text-white"></i>
	          </a>
	        </div>
	      </div>
	    </div>
	    
	    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
	      <p>&copy; 2024 ReWear. All rights reserved. | Privacy Policy | Terms of Service</p>
	    </div>
	  </footer>
	  
	  
	  {/* Next: "Add item detail modal with image gallery" */}
	  {/* Next: "Add add new item form component" */}
	  {/* Next: "Add user dashboard with swap management" */}
	  
	</div> 
        </div>
         } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
