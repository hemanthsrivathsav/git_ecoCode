// src/components/PullRequestsTab.tsx

import React, { useState } from "react";
import {
  GitPullRequest,
  GitMerge,
  XCircle,
  MessageSquare,
  Plus,
  Minus,
  Triangle,
} from "lucide-react";

type PullRequest = {
  id: number;
  title: string;
  number: number;
  author: string;
  labels: string[];
  comments: number;
  createdAt: string;
  state: "open" | "merged" | "closed";
  additions: number;
  deletions: number;
  carbonBefore: number;
  carbonAfter: number;
};

const pullRequests: PullRequest[] = [
  {
    id: 1,
    title: "feat: Add lazy loading to reduce initial bundle size",
    number: 89,
    author: "alex-codes",
    labels: ["feature", "frontend"],
    comments: 7,
    createdAt: "1 day ago",
    state: "open",
    additions: 342,
    deletions: 28,
    carbonBefore: 847,
    carbonAfter: 623,
  },
  {
    id: 2,
    title: "fix: Optimize database queries to reduce server load",
    number: 88,
    author: "jordan-dev",
    labels: ["bug", "high-priority"],
    comments: 12,
    createdAt: "2 days ago",
    state: "open",
    additions: 56,
    deletions: 89,
    carbonBefore: 1245,
    carbonAfter: 892,
  },
  {
    id: 3,
    title: "refactor: Remove unused dependencies",
    number: 87,
    author: "taylor-tech",
    labels: ["refactor"],
    comments: 18,
    createdAt: "3 days ago",
    state: "merged",
    additions: 234,
    deletions: 456,
    carbonBefore: 2341,
    carbonAfter: 1876,
  },
  {
    id: 4,
    title: "perf: Add caching layer to API endpoints",
    number: 86,
    author: "morgan-codes",
    labels: ["documentation"],
    comments: 4,
    createdAt: "1 week ago",
    state: "merged",
    additions: 128,
    deletions: 34,
    carbonBefore: 1567,
    carbonAfter: 1134,
  },
];

export function PullRequestsTab() {
  const [filter, setFilter] = useState<"open" | "merged">("open");

  const filteredPRs = pullRequests.filter((pr) => pr.state === filter);
  const openCount = pullRequests.filter((pr) => pr.state === "open").length;
  const mergedCount = pullRequests.filter((pr) => pr.state === "merged").length;

  return (
    <div>
      {/* HEADER ROW */}
      <div className="eco-pr-header">
        {/* search */}
        <div className="eco-commits-search">
          <div style={{ position: "relative" }}>
            <input
              className="eco-commits-search-input"
              placeholder="Search pull requests..."
            />
          </div>
        </div>

        {/* tabs */}
        <div className="eco-pr-tabs">
          <button
            className={
              "eco-pr-tab-btn " +
              (filter === "open" ? "eco-pr-tab-btn--active" : "")
            }
            onClick={() => setFilter("open")}
          >
            <GitPullRequest size={14} style={{ marginRight: 6 }} />
            Open ({openCount})
          </button>
          <button
            className={
              "eco-pr-tab-btn " +
              (filter === "merged" ? "eco-pr-tab-btn--active" : "")
            }
            onClick={() => setFilter("merged")}
          >
            <GitMerge size={14} style={{ marginRight: 6 }} />
            Merged ({mergedCount})
          </button>
        </div>

        {/* new PR button
        <button className="eco-btn-primary">
          <Plus size={16} />
          New Pull Request
        </button> */}
      </div>

      {/* LIST */}
      <div className="eco-pr-list">
        {filteredPRs.map((pr) => {
          const decreased = pr.carbonAfter < pr.carbonBefore;
          const diffPct = Math.round(
            Math.abs((pr.carbonAfter - pr.carbonBefore) / pr.carbonBefore) * 100
          );

          const changeClass =
            "eco-pr-carbon-change " +
            (decreased
              ? "eco-pr-carbon-change--down"
              : "eco-pr-carbon-change--up");

          return (
            <div className="eco-pr-row" key={pr.id}>
              {/* LEFT ICON */}
              <div style={{ marginTop: 4, marginRight: 8 }}>
                {pr.state === "open" && (
                  <GitPullRequest size={20} color="#059669" />
                )}
                {pr.state === "merged" && <GitMerge size={20} color="#0ea5e9" />}
                {pr.state === "closed" && <XCircle size={20} color="#ef4444" />}
              </div>

              {/* MAIN COLUMN */}
              <div className="eco-pr-main">
                <div className="eco-pr-title">
                  {pr.title} <span className="text-gray-500">#{pr.number}</span>
                </div>

                <div className="eco-pr-submeta">
                  opened {pr.createdAt} by {pr.author}
                </div>

                <div className="eco-pr-labels">
                  {pr.labels.map((label) => {
                    let labelClass = "";
                    if (label === "feature") labelClass = "eco-label--feature";
                    else if (label === "bug") labelClass = "eco-label--bug";
                    else if (label === "frontend")
                      labelClass = "eco-label--frontend";
                    else if (label === "high-priority")
                      labelClass = "eco-label--priority";
                    else if (label === "refactor")
                      labelClass = "eco-label--refactor";
                    else if (label === "documentation")
                      labelClass = "eco-label--documentation";

                    return (
                      <span
                        key={label}
                        className={"eco-label-chip " + labelClass}
                      >
                        {label}
                      </span>
                    );
                  })}

                  <span style={{ fontSize: 12, color: "#6b7280" }}>
                    <MessageSquare size={14} style={{ marginRight: 4 }} />
                    {pr.comments}
                  </span>

                  <span className="eco-commit-add">
                    <Plus size={12} /> {pr.additions}
                  </span>
                  <span className="eco-commit-del">
                    <Minus size={12} /> {pr.deletions}
                  </span>
                </div>
              </div>

              {/* RIGHT: CARBON IMPACT */}
              <div className="eco-pr-carbon">
                <div className="eco-pr-carbon-values">
                  <span>
                    {pr.carbonBefore}
                    <span className="eco-pr-carbon-unit">gCO₂</span>
                  </span>
                  <span>→</span>
                  <span>
                    {pr.carbonAfter}
                    <span className="eco-pr-carbon-unit">gCO₂</span>
                  </span>
                </div>

                <div className={changeClass}>
                  {/* red down triangle if decreased, green up if increased  */}
                  {decreased ? (
                    <>
                      <Triangle
                        size={12}
                        fill="currentColor"
                        style={{ transform: "rotate(180deg)" }}
                      />
                      <span>-{diffPct}%</span>
                    </>
                  ) : (
                    <>
                      <Triangle  fill="currentColor" size={12} />
                      <span>+{diffPct}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
