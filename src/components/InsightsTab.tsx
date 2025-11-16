// src/components/InsightsTab.tsx

import { TrendingUp, Flame, Users, GitBranch } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

const weeklyData = [
  { day: "Mon", commits: 9 },
  { day: "Tue", commits: 16 },
  { day: "Wed", commits: 7 },
  { day: "Thu", commits: 22 },
  { day: "Fri", commits: 15 },
  { day: "Sat", commits: 4 },
  { day: "Sun", commits: 3 },
];

const energyData = [
  { week: "Week 1", Sarah: 45, Alex: 30, Jordan: 28 },
  { week: "Week 2", Sarah: 50, Alex: 34, Jordan: 31 },
  { week: "Week 3", Sarah: 47, Alex: 32, Jordan: 27 },
  { week: "Week 4", Sarah: 62, Alex: 40, Jordan: 35 },
];

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
  { name: "Sarah", commits: 52, green: 82, nonGreen: 18 },
  { name: "Tom", commits: 31, green: 70, nonGreen: 30 },
  { name: "Alex", commits: 20, green: 61, nonGreen: 39 },
  { name: "Lina", commits: 15, green: 54, nonGreen: 46 },
];

// Custom tooltip for the bar chart
function WeeklyTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;
  return (
    <div className="eco-tooltip">
      <div className="eco-tooltip-label">{label}</div>
      <div className="eco-tooltip-value">{value} commits</div>
    </div>
  );
}

// Custom tooltip for multi-line energy chart
function EnergyTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="eco-tooltip">
      <div className="eco-tooltip-label">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="eco-tooltip-value">
          {p.dataKey}: {p.value} green score
        </div>
      ))}
    </div>
  );
}

export function InsightsTab() {
  return (
    <div>
      {/* TOP STATS GRID */}
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

      {/* CHARTS ROW */}
      <div className="eco-insights-charts">
        {/* Weekly Contributions / Commit Activity - BAR CHART */}
        <div className="eco-chart-card">
          <div className="eco-chart-title">Weekly Contributions</div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  allowDecimals={false}
                />
                <Tooltip content={<WeeklyTooltip />} />
                <Bar
                  dataKey="commits"
                  radius={[999, 999, 999, 999]}
                  // gradient-ish bar color
                  fill="url(#weeklyGradient)"
                  barSize={26}
                />
                <defs>
                  <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Efficiency Trend - LINE CHART PER CONTRIBUTOR */}
        <div className="eco-chart-card">
          <div className="eco-chart-title">Energy Efficiency Trend</div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={energyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip content={<EnergyTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "#64748b" }}
                  align="left"
                  verticalAlign="bottom"
                />
                <Line
                  type="monotone"
                  dataKey="Sarah"
                  stroke="#ec4899"
                  strokeWidth={2.4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Alex"
                  stroke="#22c55e"
                  strokeWidth={2.4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Jordan"
                  stroke="#0ea5e9"
                  strokeWidth={2.4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

       {/* TOP CONTRIBUTORS WITH GREEN / NON-GREEN BARS */}
      <div className="eco-insights-contrib">
        <h4 style={{ marginBottom: 10 }}>Top Contributors</h4>

        {contributors.map((c) => (
          <div className="eco-contrib-row" key={c.name}>
            <div className="eco-contrib-info">
              <span className="eco-contrib-name">{c.name}</span>
              <span className="eco-contrib-commits">
                {c.commits} commits
              </span>
            </div>

            <div className="eco-contrib-bar-wrap">
              <div className="eco-contrib-bar-bg">
                <div
                  className="eco-contrib-bar-green"
                  style={{ width: `${c.green}%` }}
                />
                <div
                  className="eco-contrib-bar-red"
                  style={{ width: `${c.nonGreen}%` }}
                />
              </div>
              <div className="eco-contrib-bar-labels">
                <span className="eco-contrib-green-label">
                  {c.green}% Sustainable
                </span>
                <span className="eco-contrib-red-label">
                  {c.nonGreen}% non-sustainable
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
