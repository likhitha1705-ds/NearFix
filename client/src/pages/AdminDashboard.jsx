import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCategories: 3,
    totalProviders: 9,
    totalCustomers: 1,
    totalRequests: 1,
  });
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fallbacks
  const fallbackCategories = [
    { id: 1, name: 'Electrician', slug: 'electrician', description: 'Electrical installation and repair.', icon: '⚡' },
    { id: 2, name: 'Plumber', slug: 'plumber', description: 'Water leaks, taps, and pipe repairs.', icon: '🔧' },
    { id: 3, name: 'AC Repair', slug: 'ac-repair', description: 'Air-conditioner servicing and repair.', icon: '❄️' },
  ];

  const fallbackProviders = [
    // 3 Electricians
    {
      id: 1,
      name: 'Rahul Sharma',
      service_category: 'Electrician',
      locality: 'Andheri West, Mumbai',
      experience_years: 3,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 11001',
      demo_email: 'rahul.sharma@nearfix.in',
      icon: '⚡',
    },
    {
      id: 2,
      name: 'Kiran Verma',
      service_category: 'Electrician',
      locality: 'Bandra West, Mumbai',
      experience_years: 5,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 11002',
      demo_email: 'kiran.verma@nearfix.in',
      icon: '⚡',
    },
    {
      id: 3,
      name: 'Sanjay Rao',
      service_category: 'Electrician',
      locality: 'Dadar, Mumbai',
      experience_years: 4,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 11003',
      demo_email: 'sanjay.rao@nearfix.in',
      icon: '⚡',
    },

    // 3 Plumbers
    {
      id: 4,
      name: 'Amit Patil',
      service_category: 'Plumber',
      locality: 'Dadar, Mumbai',
      experience_years: 4,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 22001',
      demo_email: 'amit.patil@nearfix.in',
      icon: '🔧',
    },
    {
      id: 5,
      name: 'Ganesh Shinde',
      service_category: 'Plumber',
      locality: 'Andheri West, Mumbai',
      experience_years: 6,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 22002',
      demo_email: 'ganesh.shinde@nearfix.in',
      icon: '🔧',
    },
    {
      id: 6,
      name: 'Prashant More',
      service_category: 'Plumber',
      locality: 'Bandra West, Mumbai',
      experience_years: 3,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 22003',
      demo_email: 'prashant.more@nearfix.in',
      icon: '🔧',
    },

    // 3 AC Repairs
    {
      id: 7,
      name: 'Neha Deshmukh',
      service_category: 'AC Repair',
      locality: 'Bandra West, Mumbai',
      experience_years: 3,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 33001',
      demo_email: 'neha.deshmukh@nearfix.in',
      icon: '❄️',
    },
    {
      id: 8,
      name: 'Sameer Khan',
      service_category: 'AC Repair',
      locality: 'Andheri West, Mumbai',
      experience_years: 5,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 33002',
      demo_email: 'sameer.khan@nearfix.in',
      icon: '❄️',
    },
    {
      id: 9,
      name: 'Vikram Joshi',
      service_category: 'AC Repair',
      locality: 'Dadar, Mumbai',
      experience_years: 4,
      availability_status: 'Available',
      is_active: 1,
      demo_phone: '+91 98200 33003',
      demo_email: 'vikram.joshi@nearfix.in',
      icon: '❄️',
    },
  ];

  const fallbackCustomers = [
    {
      id: 5,
      full_name: 'Pooja Kulkarni',
      email: 'customer@demo.in',
      phone: '+91 98200 44004',
      locality: 'Andheri West, Mumbai',
      created_at: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const res = await api.admin.getStats();
        if (res.success) {
          setStats(res.stats);
          setCategories(res.categories || fallbackCategories);
          setProviders(res.providers || fallbackProviders);
          setCustomers(res.customers || fallbackCustomers);
          setRequests(res.requests || []);
        } else {
          setCategories(fallbackCategories);
          setProviders(fallbackProviders);
          setCustomers(fallbackCustomers);
        }
      } catch (err) {
        console.warn('Admin stats load error:', err.message);
        setCategories(fallbackCategories);
        setProviders(fallbackProviders);
        setCustomers(fallbackCustomers);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const handleToggleProvider = async (providerId, currentActive) => {
    const newStatus = !currentActive;
    try {
      await api.admin.toggleProviderStatus(providerId, newStatus);
      setProviders((prev) =>
        prev.map((p) => (p.id === providerId ? { ...p, is_active: newStatus ? 1 : 0 } : p))
      );
      setActionMessage(`Provider ${newStatus ? 'activated & approved' : 'deactivated'} successfully.`);
    } catch (err) {
      // Local fallback
      setProviders((prev) =>
        prev.map((p) => (p.id === providerId ? { ...p, is_active: newStatus ? 1 : 0 } : p))
      );
      setActionMessage(`Provider status updated locally.`);
    } finally {
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading administrator dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        {/* Admin Header */}
        <div className="card admin-header-card">
          <div className="admin-title-row">
            <div className="admin-badge">Admin Console</div>
            <h1>System Administration</h1>
            <p className="admin-sub">
              Logged in as: <strong>{user?.full_name}</strong> ({user?.email})
            </p>
          </div>
        </div>

        {actionMessage && <div className="alert alert-success">{actionMessage}</div>}
        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        {/* 1. Stat Cards Row */}
        <div className="stats-row">
          <div className="card stat-card">
            <span className="stat-label">Total Categories</span>
            <span className="stat-number">{stats.totalCategories}</span>
            <span className="stat-sub">Active Services</span>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Service Providers</span>
            <span className="stat-number">{stats.totalProviders}</span>
            <span className="stat-sub">Verified Profiles</span>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Registered Customers</span>
            <span className="stat-number">{customers.length}</span>
            <span className="stat-sub">Active Accounts</span>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Service Requests</span>
            <span className="stat-number">{stats.totalRequests || requests.length}</span>
            <span className="stat-sub">Total Bookings</span>
          </div>
        </div>

        {/* 2. Provider Management Section */}
        <div className="admin-section">
          <div className="section-header-row">
            <h2>Provider Management</h2>
          </div>
          <div className="card table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Provider Name</th>
                    <th>Service Category</th>
                    <th>Locality</th>
                    <th>Experience</th>
                    <th>Availability</th>
                    <th>System Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong>{p.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {p.demo_phone || '+91 98200 11001'}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-service">{p.service_category}</span>
                      </td>
                      <td>{p.locality}</td>
                      <td>{p.experience_years} Years</td>
                      <td>
                        <span
                          className={`badge ${
                            p.availability_status === 'Available'
                              ? 'badge-available'
                              : p.availability_status === 'Busy'
                              ? 'badge-busy'
                              : 'badge-leave'
                          }`}
                        >
                          {p.availability_status}
                        </span>
                      </td>
                      <td>
                        {p.is_active ? (
                          <span style={{ color: '#166534', fontWeight: 600 }}>● Active & Approved</span>
                        ) : (
                          <span style={{ color: '#991b1b', fontWeight: 600 }}>○ Deactivated</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`btn btn-sm ${p.is_active ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={() => handleToggleProvider(p.id, Boolean(p.is_active))}
                        >
                          {p.is_active ? 'Deactivate' : 'Approve & Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Service Category Management Section */}
        <div className="admin-section">
          <div className="section-header-row">
            <h2>Service Categories</h2>
            <span className="badge badge-service">
              3 Core Services
            </span>
          </div>
          <div className="grid-3">
            {categories.map((c) => (
              <div key={c.id} className="card category-admin-card">
                <div className="cat-icon">{c.icon}</div>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem' }}>{c.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Customer Management Section */}
        <div className="admin-section">
          <div className="section-header-row">
            <h2>Registered Customers</h2>
            <span className="badge badge-service">{customers.length} Accounts</span>
          </div>
          <div className="card table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                    <th>Locality</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.full_name}</strong></td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>📍 {c.locality}</td>
                      <td>
                        <span className="badge" style={{ backgroundColor: '#f1f5f9' }}>
                          Customer
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard-page {
          padding: 40px 0 80px;
        }

        .admin-header-card {
          padding: 28px;
          margin-bottom: 28px;
          background: linear-gradient(135deg, #ffffff 60%, var(--primary-teal-bg) 100%);
        }

        .admin-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-teal);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .admin-header-card h1 {
          font-size: 1.85rem;
          margin: 0 0 6px;
        }

        .admin-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .stat-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--primary-teal);
          line-height: 1.2;
          margin: 4px 0;
        }

        .stat-sub {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .admin-section {
          margin-bottom: 40px;
        }

        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .section-header-row h2 {
          font-size: 1.35rem;
          margin: 0;
        }

        .table-card {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .admin-table th {
          background-color: #f8fafc;
          padding: 14px 18px;
          font-weight: 600;
          color: var(--text-dark);
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-body);
        }

        .admin-table tbody tr:last-child td {
          border-bottom: none;
        }

        .admin-table tbody tr:hover {
          background-color: #f8fafc;
        }

        .category-admin-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
        }

        .cat-icon {
          font-size: 2rem;
        }

        @media (max-width: 992px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .stats-row {
            grid-template-columns: 1fr;
          }

          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
