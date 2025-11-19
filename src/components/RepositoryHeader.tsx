import { Star, GitFork, Eye, Code2 } from "lucide-react";

export function RepositoryHeader() {
  return (
    <section className="eco-repo-card">
      <div className="eco-repo-top">
        <div className="eco-repo-main">
          <div className="eco-repo-meta">
            <Code2 size={22} color="#059669" />
            <span>sarah-dev</span>
            <span>/</span>
            <span className="eco-repo-name">green-tracker</span>
            <span className="eco-repo-public-badge">Public</span>
          </div>

          <h1 className="eco-repo-title">
            Sustainable code practices tracker
          </h1>
          <p className="eco-repo-sub">
            Measuring and reducing the carbon footprint of software
            development by tracking energy-aware commits and pull requests.
          </p>

          <div className="eco-repo-tags">
            <span className="eco-tag-pill">
              <span className="eco-tag-dot" />
              TypeScript
            </span>
            <span className="eco-tag-pill">Sustainable Dev</span>
            <span className="eco-tag-pill">Analytics</span>
          </div>
        </div>

        <div className="eco-repo-actions">
          <button className="eco-btn-primary">
            <Star size={16} />
            Star
          </button>
          <button className="eco-btn-secondary">
            <Eye size={15} />
            Watching
          </button>
        </div>
      </div>

      <div className="eco-repo-stat-row">
        <span>⭐ 2,431</span>
        <span>👀 124 watchers</span>
        <span>🍴 342 forks</span>
        <span>Last updated 3 hours ago</span>
      </div>
    </section>
  );
}
