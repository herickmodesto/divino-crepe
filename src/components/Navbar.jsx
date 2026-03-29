import { useState } from "react";
import { CONFIG } from "../data/config";

function isStoreOpen() {
  const now = new Date();
  if (CONFIG.closedDays && CONFIG.closedDays.includes(now.getDay())) return false;
  const [openStr, closeStr] = CONFIG.hours.split("–").map((s) => s.trim());
  const [openH, openM] = openStr.split(":").map(Number);
  const [closeH, closeM] = closeStr.split(":").map(Number);
  const total = (h, m) => h * 60 + m;
  const cur = total(now.getHours(), now.getMinutes());
  return cur >= total(openH, openM) && cur < total(closeH, closeM);
}

export default function Navbar({ activeSection, setActiveSection, cartCount, favorites = [] }) {
  const [hoveredNav, setHoveredNav] = useState(null);

  const navItems = [
    {
      id: "home",
      name: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" height="20" width="21" className="nav-icon">
          <path fill="inherit" d="M18.9999 6.01002L12.4499 0.770018C11.1699 -0.249982 9.16988 -0.259982 7.89988 0.760018L1.34988 6.01002C0.409885 6.76002 -0.160115 8.26002 0.0398848 9.44002L1.29988 16.98C1.58988 18.67 3.15988 20 4.86988 20H15.4699C17.1599 20 18.7599 18.64 19.0499 16.97L20.3099 9.43002C20.4899 8.26002 19.9199 6.76002 18.9999 6.01002ZM10.9199 16C10.9199 16.41 10.5799 16.75 10.1699 16.75C9.75988 16.75 9.41988 16.41 9.41988 16V13C9.41988 12.59 9.75988 12.25 10.1699 12.25C10.5799 12.25 10.9199 12.59 10.9199 13V16Z"></path>
        </svg>
      ),
    },
    {
      id: "menu",
      name: "Cardápio",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20" height="20" width="18" className="nav-icon">
          <path fill="inherit" d="M16.8035 6.96427C16.1335 6.22427 15.1235 5.79427 13.7235 5.64427V4.88427C13.7235 3.51427 13.1435 2.19427 12.1235 1.27427C11.6202 0.812823 11.025 0.462927 10.3771 0.247511C9.72909 0.032095 9.04292 -0.0439787 8.3635 0.0242742C5.9735 0.254274 3.9635 2.56427 3.9635 5.06427V5.64427C2.5635 5.79427 1.5535 6.22427 0.883496 6.96427C-0.0865043 8.04427 -0.0565042 9.48427 0.0534958 10.4843L0.753496 16.0543C0.963496 18.0043 1.7535 20.0043 6.0535 20.0043H11.6335C15.9335 20.0043 16.7235 18.0043 16.9335 16.0643L17.6335 10.4743C17.7435 9.48427 17.7635 8.04427 16.8035 6.96427ZM8.5035 1.41427C8.98813 1.36559 9.47758 1.41913 9.94023 1.57143C10.4029 1.72372 10.8284 1.97138 11.1894 2.29841C11.5503 2.62544 11.8387 3.02456 12.0357 3.46998C12.2328 3.91539 12.3343 4.39721 12.3335 4.88427V5.58427H5.3535V5.06427C5.3535 3.28427 6.8235 1.57427 8.5035 1.41427ZM5.2635 11.1543H5.2535C4.7035 11.1543 4.2535 10.7043 4.2535 10.1543C4.2535 9.60427 4.7035 9.15427 5.2535 9.15427C5.8135 9.15427 6.2635 9.60427 6.2635 10.1543C6.2635 10.7043 5.8135 11.1543 5.2635 11.1543ZM12.2635 11.1543H12.2535C11.7035 11.1543 11.2535 10.7043 11.2535 10.1543C11.2535 9.60427 11.7035 9.15427 12.2535 9.15427C12.8135 9.15427 13.2635 9.60427 13.2635 10.1543C13.2635 10.7043 12.8135 11.1543 12.2635 11.1543Z"></path>
        </svg>
      ),
    },
    {
      id: "favorites",
      name: "Favoritos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="nav-icon">
          <path fill="inherit" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      ),
    },
    {
      id: "planos",
      name: "Combos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="nav-icon">
          <path fill="inherit" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
        </svg>
      ),
    },
    {
      id: "about",
      name: "Sobre Nós",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="nav-icon">
          <path fill="inherit" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
        </svg>
      ),
    },
  ];

  const handleNavChange = (sectionId) => {
    setActiveSection(sectionId);
    setHoveredNav(sectionId);
    setTimeout(() => setHoveredNav(null), 2000);
  };

  return (
    <nav className="navbar-top">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src="/images/logo.png" alt="Divino Crepe" className="navbar-logo-img" />
          </div>
          <div className="navbar-brand-text">
            <img src="/images/nome.png" alt={CONFIG.storeName} className="navbar-store-logo" />
            <small className={`navbar-status-text${isStoreOpen() ? " open" : ""}`}>
              <span className={`navbar-status-dot${isStoreOpen() ? "" : " closed"}`} />
              {isStoreOpen() ? "Aberto agora" : "Fechado"}
              <span className="navbar-status-hours">· {CONFIG.hours}</span>
            </small>
          </div>
        </div>

        {/* Navigation Section */}
        <section className="nav-section">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeSection === item.id ? "active" : ""} ${hoveredNav === item.id ? "hovered" : ""}`}
              onClick={() => handleNavChange(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              title={item.name}
            >
              <span className="nav-icon-wrapper">
                {item.icon}
              </span>
              <span className="nav-label">{item.name}</span>
              <span className="nav-underline"></span>
            </button>
          ))}
        </section>

        {/* WhatsApp e Instagram */}
        <div className="navbar-actions">
          <a
            href={`https://wa.me/${CONFIG.phoneE164}`}
            className="whatsapp-btn"
            target="_blank"
            rel="noreferrer"
          >
            <div className="wa-sign">
              <svg className="wa-svg" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" fill="white"></path>
              </svg>
            </div>
            <div className="wa-text">Whatsapp</div>
          </a>

          <button
            className="Btn"
            onClick={() => window.open(`https://instagram.com/${CONFIG.instagram.replace("@", "")}`, "_blank")}
            title="Seguir no Instagram"
          >
            <span className="svgContainer">
              <svg fill="white" className="svgIcon" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"></path>
              </svg>
            </span>
            <span className="BG"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}