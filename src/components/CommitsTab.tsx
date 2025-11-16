// src/components/CommitsTab.tsx

import {
  Filter,
  GitCommit,
  Plus,
  Minus,
  Clock,
  GitBranch,
} from "lucide-react";

export function CommitsTab() {
  const commits = [
    {
      id: 1,
      message: "Improve carbon efficiency scoring algorithm",
      author: "S",
      avatarColor: "eco-avatar--green",
      time: "2 hours ago",
      add: 42,
      del: 11,
    },
    {
      id: 2,
      message: "Refactor file explorer component",
      author: "A",
      avatarColor: "eco-avatar--blue",
      time: "5 hours ago",
      add: 18,
      del: 4,
    },
    {
      id: 3,
      message: "Add PR activity energy indicator",
      author: "T",
      avatarColor: "eco-avatar--purple",
      time: "1 day ago",
      add: 64,
      del: 28,
    },
    {
      id: 4,
      message: "Updated README with sustainability benchmarks",
      author: "L",
      avatarColor: "eco-avatar--orange",
      time: "2 days ago",
      add: 10,
      del: 2,
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="eco-commits-header">
        <div className="eco-commits-search">
          <div style={{ position: "relative" }}>
            <input
              className="eco-commits-search-input"
              placeholder="Search commits…"
            />
          </div>
        </div>

        <div className="eco-commits-filters">
          <button className="eco-chip">
            <Filter size={14} /> Filters
          </button>
          <button className="eco-chip">
            <GitBranch size={14} /> Main
          </button>
        </div>
      </div>

      {/* LIST */}
      {commits.map((c) => (
        <div key={c.id} className="eco-commit-row">
          <div className={`eco-avatar-circle ${c.avatarColor}`}>
            {c.author}
          </div>

          <div className="eco-commit-main">
            <div className="eco-commit-title">{c.message}</div>

            <div className="eco-commit-meta">
              <span>
                <GitCommit size={14} /> Commit #{c.id}
              </span>
              <span>
                <Clock size={14} /> {c.time}
              </span>
            </div>

            <div className="eco-commit-stats">
              <span className="eco-commit-add">
                <Plus size={12} /> {c.add}
              </span>
              <span className="eco-commit-del">
                <Minus size={12} /> {c.del}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
