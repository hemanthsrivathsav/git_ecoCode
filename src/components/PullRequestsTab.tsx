import React from "react";
import { useState } from "react";
import { GitPullRequest, Filter, MessageSquare } from "lucide-react";

export function PullRequestsTab() {
  const [active, setActive] = useState<"open" | "closed">("open");

  const pullRequests = [
    {
      id: 101,
      title: "Add carbon footprint indicator for commits",
      author: "Sarah",
      time: "2 hours ago",
      labels: ["feature", "frontend", "priority"],
      comments: 4,
    },
    {
      id: 102,
      title: "Fix chart rendering issue in insights panel",
      author: "Tom",
      time: "8 hours ago",
      labels: ["bug", "frontend"],
      comments: 2,
    },
    {
      id: 103,
      title: "Implement PR energy impact scoring",
      author: "Alex",
      time: "1 day ago",
      labels: ["feature"],
      comments: 7,
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="eco-pr-header">
        <div className="eco-pr-tabs">
          <button
            className={
              "eco-pr-tab-btn " +
              (active === "open" ? "eco-pr-tab-btn--active" : "")
            }
            onClick={() => setActive("open")}
          >
            Open
          </button>
          <button
            className={
              "eco-pr-tab-btn " +
              (active === "closed" ? "eco-pr-tab-btn--active" : "")
            }
            onClick={() => setActive("closed")}
          >
            Closed
          </button>
        </div>

        <button className="eco-chip">
          <Filter size={14} /> Filters
        </button>
      </div>

      <div className="eco-pr-list">
        {pullRequests.map((pr) => (
          <div className="eco-pr-row" key={pr.id}>
            <div className="eco-pr-main">
              <div className="eco-pr-title">{pr.title}</div>

              <div className="eco-pr-submeta">
                <GitPullRequest size={14} /> PR #{pr.id} • {pr.author} •{" "}
                {pr.time}
              </div>

              <div className="eco-pr-labels">
                {pr.labels.map((label) => (
                  <span
                    key={label}
                    className={
                      "eco-label-chip " +
                      (label === "feature"
                        ? "eco-label--feature"
                        : label === "bug"
                        ? "eco-label--bug"
                        : label === "frontend"
                        ? "eco-label--frontend"
                        : "eco-label--priority")
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: 12, color: "#475569" }}>
                <MessageSquare size={15} /> {pr.comments} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
