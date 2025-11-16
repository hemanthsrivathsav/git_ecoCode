import { Search, Bell, Plus, GitBranch } from "lucide-react";

export function Header() {
  return (
    <header className="eco-header">
      <div className="eco-header-inner">
        <div className="eco-logo-wrap">
          <div className="eco-logo-mark">
            <GitBranch size={20} color="#ffffff" />
          </div>
          <div className="eco-logo-text">
            <span className="eco-logo-title">EcoCode</span>
            <span className="eco-logo-sub">Green-first Git hosting</span>
          </div>
        </div>

        <div className="eco-header-search">
          <span className="eco-header-search-icon">
            <Search size={15} />
          </span>
          <input
            className="eco-header-search-input"
            placeholder="Search repositories..."
          />
        </div>

        <div className="eco-header-actions">
          <button className="eco-icon-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="eco-icon-btn" aria-label="Create">
            <Plus size={18} />
          </button>
          <div className="eco-avatar">SC</div>
        </div>
      </div>
    </header>
  );
}
