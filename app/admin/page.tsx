'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../lib/api';

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  quantity: number;
  inStock: boolean;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  allLowStockProducts: Product[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [orderFilter, setOrderFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [editingStock, setEditingStock] = useState<{ productId: string; value: number } | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Continental',
    imageUrl: ''
  });

  // Protect admin route with better logging
  useEffect(() => {
    console.log('Admin page - Auth state:', { user, loading, role: user?.role });
    
    if (!loading) {
      if (!user) {
        console.log('No user logged in, redirecting to login');
        router.push('/login?redirect=/admin');
      } else if (user.role !== 'admin') {
        console.log('User is not admin, role is:', user.role);
        // Don't redirect immediately, just show the access denied message
      } else {
        console.log('User is admin, loading dashboard');
        fetchOrders();
        fetchInventory();
        fetchStats();
      }
    }
  }, [user, loading, router]);

  // Fetch inventory when inventory tab is activated
  useEffect(() => {
    if (activeTab === 'inventory') {
      const token = localStorage.getItem('token');
      fetch(apiUrl('/api/admin/inventory'), {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProducts(data.products);
          }
        })
        .catch(error => console.error('Error fetching inventory:', error));
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl('/api/admin/orders'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl('/api/admin/inventory'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl('/api/admin/stats'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl(`/api/admin/orders/${orderId}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
        setMessage('Order status updated!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setMessage('Failed to update order');
    }
  };

  const updateProductStock = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl(`/api/admin/products/${productId}/stock`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (data.success) {
        fetchInventory();
        setEditingStock(null);
        setMessage('Stock updated!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      setMessage('Failed to update stock');
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl(`/api/admin/products/${productId}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        fetchInventory();
        setEditingProduct(null);
        setMessage('Product updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl(`/api/admin/products/${productId}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchInventory();
        setMessage('Product deleted!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl('/api/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });
      if (res.ok) {
        setMessage('Product added successfully!');
        setFormData({ name: '', description: '', price: '', category: 'Bread', imageUrl: '' });
        fetchInventory();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error adding product');
    }
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(o => o.orderStatus === orderFilter);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authenticated user...</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Not Logged In</h1>
          <p className="text-stone-600 mb-6">Please login to access admin panel.</p>
          <button onClick={() => router.push('/login?redirect=/admin')} className="bg-stone-900 text-white px-6 py-2 rounded">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-center p-8 bg-white rounded-lg border border-stone-200 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-stone-600 mb-2">You don&apos;t have admin privileges.</p>
          <p className="text-stone-600 mb-6">
            <strong>Current role:</strong> {user.role}<br/>
            <strong>Current email:</strong> {user.email}
          </p>
          <button 
            onClick={() => { localStorage.clear(); router.push('/login'); }} 
            className="bg-stone-900 text-white px-6 py-2 rounded mr-3"
          >
            Login as Different User
          </button>
          <button onClick={() => router.push('/')} className="bg-stone-200 text-stone-900 px-6 py-2 rounded">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white p-8">
        <h1 className="text-4xl font-serif font-bold">Café Relish Admin</h1>
        <p className="text-stone-400 mt-2">Manage orders, inventory, and products</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex gap-4 px-8">
          {['dashboard', 'orders', 'inventory', 'products'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold uppercase tracking-wide text-sm transition ${
                activeTab === tab
                  ? 'border-b-2 border-amber-700 text-stone-900'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-3">
          {message}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-8">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Dashboard Overview</h2>
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                  <p className="text-stone-600 font-semibold text-sm">Total Orders</p>
                  <p className="text-4xl font-bold text-stone-900 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                  <p className="text-stone-600 font-semibold text-sm">Total Revenue</p>
                  <p className="text-4xl font-bold text-amber-700 mt-2">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                  <p className="text-stone-600 font-semibold text-sm">Pending Orders</p>
                  <p className="text-4xl font-bold text-red-600 mt-2">{stats.pendingOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                  <p className="text-stone-600 font-semibold text-sm">Low Stock Items</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.lowStockProducts}</p>
                </div>
              </div>
            )}

            {/* Low Stock Alerts */}
            {stats && stats.allLowStockProducts.length > 0 && (
              <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
                <h3 className="font-bold text-orange-900 mb-4">⚠️ Low Stock Alert</h3>
                <div className="space-y-2">
                  {stats.allLowStockProducts.map(product => (
                    <div key={product._id} className="flex justify-between">
                      <span className="text-orange-800">{product.name}</span>
                      <span className="font-bold text-orange-900">{product.quantity} left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Orders Management</h2>

            {/* Filter */}
            <div className="mb-6 flex gap-2 flex-wrap">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-4 py-2 rounded text-sm font-semibold uppercase tracking-wide transition ${
                    orderFilter === status
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-200 text-stone-900 hover:bg-stone-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-stone-200 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-100 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredOrders.map(order => (
                    <tr key={order._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p className="font-semibold text-stone-900">{order.customerName}</p>
                          <p className="text-stone-600">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-stone-900">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`px-3 py-1 rounded text-sm font-semibold border-none cursor-pointer ${
                            order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => window.alert(`Order Details:\n\n${order.items.map(i => `${i.name} x${i.quantity}`).join('\n')}\n\nPhone: ${order.customerPhone}`)}
                          className="text-amber-700 hover:text-amber-900 font-semibold text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Inventory Management</h2>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg border border-stone-200 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-100 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map(product => (
                    <tr key={product._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 text-sm font-semibold text-stone-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-stone-900">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        {editingStock?.productId === product._id ? (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={editingStock.value}
                              onChange={(e) => setEditingStock({ productId: product._id, value: parseInt(e.target.value) })}
                              className="border border-stone-300 px-2 py-1 rounded w-16 text-sm"
                              min="0"
                            />
                            <button
                              onClick={() => updateProductStock(product._id, editingStock.value)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingStock(null)}
                              className="bg-stone-300 text-stone-900 px-3 py-1 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingStock({ productId: product._id, value: product.quantity })}
                            className={`px-3 py-1 rounded text-sm font-semibold cursor-pointer ${
                              product.quantity < 5 ? 'bg-red-100 text-red-800' :
                              product.quantity < 10 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {product.quantity}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-amber-700 hover:text-amber-900 font-semibold text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900 font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-stone-900 mb-6">Edit Product</h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Product Name</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={editingProduct.imageUrl || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                        className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                        placeholder="https://..."
                      />
                      {editingProduct.imageUrl && (
                        <div className="mt-2">
                          <img src={editingProduct.imageUrl} alt={editingProduct.name} className="w-24 h-24 object-cover rounded" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">Description</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                          className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Quantity</label>
                        <input
                          type="number"
                          value={editingProduct.quantity}
                          onChange={(e) => setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) })}
                          className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Category</label>
                        <select
                          value={editingProduct.category || 'Bread'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                        >
                          <option value="Bread">Bread</option>
                          <option value="Pastry">Pastry</option>
                          <option value="Cake">Cake</option>
                          <option value="Beverage">Beverage</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => updateProduct(editingProduct._id, {
                        name: editingProduct.name,
                        description: editingProduct.description,
                        price: editingProduct.price,
                        category: editingProduct.category,
                        imageUrl: editingProduct.imageUrl,
                        quantity: editingProduct.quantity
                      })}
                      className="flex-1 bg-stone-900 text-white py-3 rounded-lg font-semibold hover:bg-stone-800 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 bg-stone-200 text-stone-900 py-3 rounded-lg font-semibold hover:bg-stone-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === 'products' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Add New Product</h2>

            <form onSubmit={addProduct} className="bg-white p-8 rounded-lg border border-stone-200 max-w-2xl">
              <div className="space-y-5">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                />

                <textarea
                  required
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                  rows={3}
                />

                <input
                  required
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                >
                  <option value="Continental">Continental</option>
                  <option value="Quick Bites">Quick Bites</option>
                  <option value="Pizzas">Pizzas</option>
                  <option value="Pastas">Pastas</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Rolls & Sandwiches">Rolls & Sandwiches</option>
                  <option value="Chinese & Sizzler">Chinese & Sizzler</option>
                  <option value="Hot Beverages">Hot Beverages</option>
                  <option value="Cold Beverages">Cold Beverages</option>
                  <option value="Pop'n'Sip">Pop'n'Sip</option>
                </select>

                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Image URL (optional)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full border border-stone-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                />

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-3 rounded-lg font-semibold hover:bg-stone-800 transition"
                >
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
