import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, AlertCircle, Calendar as CalendarIcon, Package } from 'lucide-react';
import './MonitorExpired.css';

const MonitorExpired = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    expiryDate: ''
  });

  const [products, setProducts] = useState([
    { id: 1, productName: 'Susu Ultra Milk', category: 'Dairy', expiryDate: '2025-12-10', status: 'warning' },
    { id: 2, productName: 'Roti Tawar Sari Roti', category: 'Bakery', expiryDate: '2025-12-08', status: 'danger' },
    { id: 3, productName: 'Yogurt Cimory', category: 'Dairy', expiryDate: '2025-12-15', status: 'safe' },
    { id: 4, productName: 'Keju Kraft', category: 'Dairy', expiryDate: '2025-12-06', status: 'critical' },
    { id: 5, productName: 'Telur Ayam', category: 'Fresh', expiryDate: '2025-12-12', status: 'warning' },
    { id: 6, productName: 'Daging Sapi', category: 'Meat', expiryDate: '2025-12-07', status: 'danger' },
    { id: 7, productName: 'Ikan Salmon', category: 'Seafood', expiryDate: '2025-12-20', status: 'safe' },
    { id: 8, productName: 'Sayuran Organik', category: 'Vegetables', expiryDate: '2025-12-09', status: 'warning' },
  ]);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date('2025-12-05');
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days <= 1) return 'critical';
    if (days <= 3) return 'danger';
    if (days <= 7) return 'warning';
    return 'safe';
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: products.length,
    critical: products.filter(p => getStatus(p.expiryDate) === 'critical').length,
    danger: products.filter(p => getStatus(p.expiryDate) === 'danger').length,
    warning: products.filter(p => getStatus(p.expiryDate) === 'warning').length,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      ...formData,
      status: getStatus(formData.expiryDate)
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    setFormData({ productName: '', category: '', expiryDate: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'status-critical';
      case 'danger': return 'status-danger';
      case 'warning': return 'status-warning';
      case 'safe': return 'status-safe';
      default: return 'status-safe';
    }
  };

  const getStatusText = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires Today';
    if (days === 1) return '1 Day Left';
    return `${days} Days Left`;
  };

  return (
    <div className="monitor-expired-page">
      <div className="monitor-header">
        <div>
          <h1>Monitor Expired Products</h1>
          <p>Track and manage product expiration dates</p>
        </div>
        <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        
        <div className="stat-card critical">
          <div className="stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Critical (≤1 day)</span>
            <span className="stat-value">{stats.critical}</span>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Danger (≤3 days)</span>
            <span className="stat-value">{stats.danger}</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <CalendarIcon size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Warning (≤7 days)</span>
            <span className="stat-value">{stats.warning}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-box-monitor">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`product-card ${getStatusColor(getStatus(product.expiryDate))}`}>
            <div className="product-header">
              <h3>{product.productName}</h3>
              <div className="product-actions">
                <button className="action-btn edit" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(product.id)} title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Expiry Date:</span>
                <span className="detail-value">{product.expiryDate}</span>
              </div>
            </div>

            <div className={`expiry-status ${getStatusColor(getStatus(product.expiryDate))}`}>
              <AlertCircle size={18} />
              {getStatusText(product.expiryDate)}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <AlertCircle size={48} />
          <p>No products found</p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Meat">Meat</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorExpired;
