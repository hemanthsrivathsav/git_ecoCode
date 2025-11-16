// src/components/InsightsTab.tsx

import { TrendingUp, Flame, Users, GitBranch } from "lucide-react";

export function InsightsTab() {
  const stats = [
    {
      label: "Carbon Saved",
      value: "231g",
      delta: "+14%",
      icon: <Flame size={20} />,
    },
    {
      label: "Commits",
      value: "128",
      delta: "+6%",
      icon: <GitBranch size={20} />,
    },
    {
      label: "PR Merges",
      value: "42",
      delta: "+9%",
      icon: <TrendingUp size={20} />,
    },
    {
      label: "Contributors",
      value: "12",
      delta: "+3%",
      icon: <Users size={20} />,
    },
  ];

  const contributors = [
    { name: "Sarah", commits: 52 },
    { name: "Tom", commits: 31 },
    { name: "Alex", commits: 20 },
    { name: "Lina", commits: 15 },
  ];

  return (
    <div>
      {/* TOP GRID */}
      <div className="eco-insights-grid">
        {stats.map((s) => (
          <div key={s.label} className="eco-stat-card">
            {s.icon}
            <div className="eco-stat-label">{s.label}</div>
            <div className="eco-stat-value">{s.value}</div>
            <div className="eco-stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="eco-insights-charts">
        <div className="eco-chart-card">
          <div className="eco-chart-title">Weekly Contributions</div>
          <div className="eco-mini-bars">
            {[45, 60, 30, 75, 90, 50, 40].map((v, i) => (
              <div
                key={i}
                className="eco-mini-bar"
                style={{ height: v }}
              />
            ))}
          </div>
        </div>

        <div className="eco-chart-card">
          <div className="eco-chart-title">Energy Efficiency Trend</div>
          <div className="eco-mini-bars">
            {[20, 40, 80, 65, 50, 55, 30].map((v, i) => (
              <div
                key={i}
                className="eco-mini-bar"
                style={{ height: v, background: "linear-gradient(180deg,#059669,#10b981)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTRIBUTORS */}
      <div className="eco-insights-contrib">
        <h4 style={{ marginBottom: 10 }}>Top Contributors</h4>

        {contributors.map((c) => (
          <div className="eco-contrib-row" key={c.name}>
            <span>{c.name}</span>
            <span>{c.commits} commits</span>
          </div>
        ))}
      </div>
    </div>
  );
}
