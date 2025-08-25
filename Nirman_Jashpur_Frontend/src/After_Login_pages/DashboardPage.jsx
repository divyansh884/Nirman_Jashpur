import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  CheckSquare,
  ClipboardCheck,
  FileSignature,
  Briefcase,
  ClipboardList,
  Hammer,
  CheckCircle,
  XCircle,
  Lock,
  Clock,
  ImageOff,
} from "lucide-react"; // icons
import "./DashboardPage.css";

export default function DashboardPage({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Breadcrumbs
  const crumbs = React.useMemo(() => {
    const parts = location.pathname
      .split("/")
      .filter(Boolean)
      .map((s) =>
        s.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())
      );
    return [...parts].join(" / ");
  }, [location.pathname]);

  // ✅ Set page title
  useEffect(() => {
    document.title = "निर्माण | डैशबोर्ड";
  }, []);

  const handleLogout = () => {
    if (window.confirm("क्या आप लॉगआउट करना चाहते हैं?")) {
      navigate("/");
    }
  };

  const topStats = [
    { label: "दर्ज कार्य", count: 3, route: "/work", icon: <FileText size={28} />, color: "stat-blue" },
    { label: "आरंभ", count: 3, route: "/work", icon: <CheckSquare size={28} />, color: "stat-cyan" },
    { label: "तकनीकी स्वीकृति", count: 3, route: "/technical-approval", icon: <ClipboardCheck size={28} />, color: "stat-green" },
    { label: "प्रशासकीय स्वीकृति", count: 3, route: "/administrative-approval", icon: <FileSignature size={28} />, color: "stat-yellow" },
    { label: "निविदा स्तर पर", count: 3, route: "/tender", icon: <Briefcase size={28} />, color: "stat-purple" },
    { label: "कार्य आदेश लंबित", count: 3, route: "/work-order", icon: <ClipboardList size={28} />, color: "stat-pink" },
    { label: "कार्य आदेश जारी", count: 3, route: "/work", icon: <ClipboardList size={28} />, color: "stat-indigo" },
    { label: "कार्य प्रगति पर", count: 3, route: "/work-in-progress", icon: <Hammer size={28} />, color: "stat-orange" },
    { label: "कार्य पूर्ण", count: 3, route: "/work", icon: <CheckCircle size={28} />, color: "stat-green-dark" },
    { label: "कार्य निरस्त", count: 3, route: "/work", icon: <XCircle size={28} />, color: "stat-red" },
    { label: "कार्य बंद", count: 3, route: "/work", icon: <Lock size={28} />, color: "stat-gray" },
    { label: "30 दिनों से लंबित कार्य", count: 3, route: "/work", icon: <Clock size={28} />, color: "stat-brown" },
    { label: "फोटो रहित कार्य", count: 3, route: "/work", icon: <ImageOff size={28} />, color: "stat-teal" },
  ];

  // Dummy data for tables
  const financialYearData = [
    { year: "2024-25", total: 49, pending: 48, progress: 1 },
    { year: "2022-23", total: 2, pending: 2, progress: 0 },
  ];

  const agencyData = [
    { agency: "जनपद पंचायत बगीचा", total: 27, pending: 27, progress: 0 },
    { agency: "जनपद पंचायत फरसबहार", total: 1, pending: 0, progress: 1 },
    { agency: "जनपद पंचायत कुनकुरी", total: 6, pending: 6, progress: 0 },
  ];

  const blockData = [
    { block: "Pharsabahar", total: 1, pending: 0, progress: 1 },
    { block: "Patthalgaon", total: 5, pending: 5, progress: 0 },
    { block: "Kunkuri", total: 6, pending: 6, progress: 0 },
    { block: "Jashpur", total: 10, pending: 10, progress: 0 },
    { block: "Duldula", total: 2, pending: 2, progress: 0 },
    { block: "Bagicha", total: 27, pending: 27, progress: 0 },
  ];

  return (
    <div className="dashboard-page">
      {/* ✅ Top bar reused from example */}
      <div className="header">
        <div className="top">
          <div className="brand">
            <div className="crumbs" id="crumbs">{crumbs}</div>
            <h1>निर्माण</h1>
          </div>
          <div className="right-top">
            <div className="user">
              <div className="ic" title="User">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 
                  2.686-5 6 2.239 6 5 6zm0 2c-5.33 0-10 
                  2.239-10 5v3h20v-3c0-2.761-4.67-5-10-5z" />
                </svg>
              </div>
              <button
                className="logout"
                aria-label="Logout"
                type="button"
                onClick={onLogout || handleLogout}
              >
                <i className="fa-solid fa-power-off" />
              </button>
            </div>
          </div>
        </div>
        <div className="subbar">
          <span className="dot" />
          <h2>डैशबोर्ड</h2>
        </div>
      </div>

      {/* ✅ Dashboard content */}
      <div className="dashboard-stats-grid">
        {topStats.map((stat, idx) => (
          <div
            key={idx}
            className={`dashboard-stat-card ${stat.color}`}
            onClick={() => navigate(stat.route)}
          >
            <div className="dashboard-stat-info">
              <div className="dashboard-stat-count">{stat.count}</div>
              <div className="dashboard-stat-label">{stat.label}</div>
            </div>
            <div className="dashboard-stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Financial Year Stats */}
      <div className="dashboard-section">
        <h3>वित्तीय वर्ष के आँकड़े</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>वित्तीय वर्ष</th>
              <th>कुल कार्य</th>
              <th>कार्य आदेश लंबित</th>
              <th>कार्य प्रगति पर</th>
            </tr>
          </thead>
          <tbody>
            {financialYearData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.year}</td>
                <td>{row.total}</td>
                <td>{row.pending}</td>
                <td>{row.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agency-wise Info */}
      <div className="dashboard-section">
        <h3>कार्य एजेंसीवार जानकारी</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>एजेंसी</th>
              <th>कुल कार्य</th>
              <th>कार्य आदेश लंबित</th>
              <th>कार्य प्रगति पर</th>
            </tr>
          </thead>
          <tbody>
            {agencyData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.agency}</td>
                <td>{row.total}</td>
                <td>{row.pending}</td>
                <td>{row.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Block-wise Info */}
      <div className="dashboard-section">
        <h3>ब्लॉकवार जानकारी</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ब्लॉक</th>
              <th>कुल कार्य</th>
              <th>कार्य आदेश लंबित</th>
              <th>कार्य प्रगति पर</th>
            </tr>
          </thead>
          <tbody>
            {blockData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.block}</td>
                <td>{row.total}</td>
                <td>{row.pending}</td>
                <td>{row.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
