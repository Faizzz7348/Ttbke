import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import './Route.css';

const Route = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample route data
  const allRoutes = [
    { id: 'RT001', routeName: 'Jakarta - Bandung', driver: 'Ahmad Yani', vehicle: 'B 1234 XYZ', distance: '150 km', status: 'Completed', date: '2025-12-01' },
    { id: 'RT002', routeName: 'Surabaya - Malang', driver: 'Budi Santoso', vehicle: 'L 5678 ABC', distance: '90 km', status: 'In Progress', date: '2025-12-02' },
    { id: 'RT003', routeName: 'Medan - Pematang Siantar', driver: 'Citra Dewi', vehicle: 'BB 9012 DEF', distance: '128 km', status: 'Pending', date: '2025-12-03' },
    { id: 'RT004', routeName: 'Semarang - Solo', driver: 'Dedi Kurniawan', vehicle: 'H 3456 GHI', distance: '110 km', status: 'Completed', date: '2025-12-01' },
    { id: 'RT005', routeName: 'Yogyakarta - Semarang', driver: 'Eka Putri', vehicle: 'AB 7890 JKL', distance: '120 km', status: 'In Progress', date: '2025-12-04' },
    { id: 'RT006', routeName: 'Palembang - Jambi', driver: 'Fajar Rahman', vehicle: 'BG 2345 MNO', distance: '220 km', status: 'Completed', date: '2025-12-02' },
    { id: 'RT007', routeName: 'Makassar - Pare-Pare', driver: 'Gita Sari', vehicle: 'DD 6789 PQR', distance: '155 km', status: 'Pending', date: '2025-12-05' },
    { id: 'RT008', routeName: 'Banjarmasin - Balikpapan', driver: 'Hendra Wijaya', vehicle: 'DA 0123 STU', distance: '380 km', status: 'In Progress', date: '2025-12-03' },
    { id: 'RT009', routeName: 'Denpasar - Singaraja', driver: 'Indah Permata', vehicle: 'DK 4567 VWX', distance: '95 km', status: 'Completed', date: '2025-12-01' },
    { id: 'RT010', routeName: 'Manado - Tomohon', driver: 'Joko Susilo', vehicle: 'DB 8901 YZA', distance: '25 km', status: 'Pending', date: '2025-12-04' },
    { id: 'RT011', routeName: 'Pontianak - Singkawang', driver: 'Kartika Sari', vehicle: 'KB 2345 BCD', distance: '145 km', status: 'Completed', date: '2025-12-02' },
    { id: 'RT012', routeName: 'Batam - Tanjung Pinang', driver: 'Lukman Hakim', vehicle: 'BP 6789 EFG', distance: '180 km', status: 'In Progress', date: '2025-12-05' },
    { id: 'RT013', routeName: 'Lampung - Palembang', driver: 'Maya Angelina', vehicle: 'BE 0123 HIJ', distance: '240 km', status: 'Pending', date: '2025-12-03' },
    { id: 'RT014', routeName: 'Padang - Bukittinggi', driver: 'Nanda Pratama', vehicle: 'BA 4567 KLM', distance: '92 km', status: 'Completed', date: '2025-12-01' },
    { id: 'RT015', routeName: 'Pekanbaru - Dumai', driver: 'Oki Setiawan', vehicle: 'BM 8901 NOP', distance: '188 km', status: 'In Progress', date: '2025-12-04' },
  ];

  // Filter by status
  const filteredRoutes = allRoutes.filter(route => {
    const matchesSearch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || route.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoutes.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentRoutes = filteredRoutes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-progress';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="route-page">
      <div className="route-header">
        <h1>Route Management</h1>
        <p>Manage and track all delivery routes</p>
      </div>

      <div className="route-controls">
        <div className="control-left">
          <label>
            Show 
            <select 
              value={entriesPerPage} 
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="entries-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            entries
          </label>
        </div>

        <div className="control-right">
          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={filterStatus} 
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="route-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Route Name</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Distance</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRoutes.length > 0 ? (
              currentRoutes.map((route) => (
                <tr key={route.id}>
                  <td className="route-id">{route.id}</td>
                  <td className="route-name">{route.routeName}</td>
                  <td>{route.driver}</td>
                  <td>{route.vehicle}</td>
                  <td>{route.distance}</td>
                  <td>{route.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No routes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredRoutes.length)} of {filteredRoutes.length} entries
        </div>

        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            // Show first page, last page, current page, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="pagination-dots">...</span>;
            }
            return null;
          })}

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Route;
