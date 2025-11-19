// src/components/CommitsTab.tsx

import { useState } from "react";
import {
  Search,
  GitCommit,
  Calendar,
  Hash,
  ExternalLink,
} from "lucide-react";
import { CommitDetailsModal } from "./CommitDetailsModal";

export interface Commit {
  id: string;
  hash: string;
  message: string;
  author: string;
  authorAvatar: string;
  authorColor: string; // we'll map this to a CSS class
  timestamp: string;
  date: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  branch: string;
}

const commits: Commit[] = [
  {
    id: "1",
    hash: "a7f3d2c",
    message: "feat: reduce CPU cycles with optimized algorithms",
    author: "Sarah Chen",
    authorAvatar: "SC",
    authorColor: "from-emerald-500 to-teal-500",
    timestamp: "2 hours ago",
    date: "Nov 15, 2025",
    filesChanged: 8,
    additions: 234,
    deletions: 45,
    branch: "main",
  },
  {
    id: "2",
    hash: "b92e5f1",
    message:
      "fix: eliminate unnecessary re-renders for better energy efficiency",
    author: "Alex Morgan",
    authorAvatar: "AM",
    authorColor: "from-teal-500 to-cyan-500",
    timestamp: "4 hours ago",
    date: "Nov 15, 2025",
    filesChanged: 3,
    additions: 67,
    deletions: 89,
    branch: "main",
  },
  {
    id: "3",
    hash: "c4d8a91",
    message:
      "refactor: implement lazy loading to reduce initial bundle size",
    author: "Jordan Lee",
    authorAvatar: "JL",
    authorColor: "from-green-500 to-emerald-500",
    timestamp: "6 hours ago",
    date: "Nov 15, 2025",
    filesChanged: 15,
    additions: 456,
    deletions: 387,
    branch: "main",
  },
  {
    id: "4",
    hash: "e1b7c3a",
    message: "perf: optimize images and reduce data transfer",
    author: "Taylor Swift",
    authorAvatar: "TS",
    authorColor: "from-lime-500 to-green-500",
    timestamp: "8 hours ago",
    date: "Nov 14, 2025",
    filesChanged: 12,
    additions: 198,
    deletions: 156,
    branch: "main",
  },
  {
    id: "5",
    hash: "f9a2d4e",
    message: "docs: add green coding best practices guide",
    author: "Morgan Park",
    authorAvatar: "MP",
    authorColor: "from-emerald-600 to-green-600",
    timestamp: "10 hours ago",
    date: "Nov 14, 2025",
    filesChanged: 5,
    additions: 142,
    deletions: 23,
    branch: "main",
  },
  {
    id: "6",
    hash: "g3c5b7f",
    message:
      "test: ensure efficient test execution with minimal resources",
    author: "Sarah Chen",
    authorAvatar: "SC",
    authorColor: "from-emerald-500 to-teal-500",
    timestamp: "1 day ago",
    date: "Nov 14, 2025",
    filesChanged: 6,
    additions: 289,
    deletions: 12,
    branch: "main",
  },
  {
    id: "7",
    hash: "h8d1e9a",
    message: "perf: optimize database queries to reduce server load",
    author: "Alex Morgan",
    authorAvatar: "AM",
    authorColor: "from-teal-500 to-cyan-500",
    timestamp: "1 day ago",
    date: "Nov 14, 2025",
    filesChanged: 9,
    additions: 124,
    deletions: 98,
    branch: "main",
  },
  {
    id: "8",
    hash: "i2f4a6c",
    message: "feat: implement carbon footprint tracking for builds",
    author: "Jordan Lee",
    authorAvatar: "JL",
    authorColor: "from-green-500 to-emerald-500",
    timestamp: "2 days ago",
    date: "Nov 13, 2025",
    filesChanged: 7,
    additions: 312,
    deletions: 34,
    branch: "main",
  },
  {
    id: "9",
    hash: "j5g7b8d",
    message: "fix: reduce unnecessary API calls for sustainability",
    author: "Taylor Swift",
    authorAvatar: "TS",
    authorColor: "from-lime-500 to-green-500",
    timestamp: "2 days ago",
    date: "Nov 13, 2025",
    filesChanged: 2,
    additions: 45,
    deletions: 67,
    branch: "main",
  },
  {
    id: "10",
    hash: "k9h2c1e",
    message: "chore: remove unused dependencies to lighten footprint",
    author: "Morgan Park",
    authorAvatar: "MP",
    authorColor: "from-emerald-600 to-green-600",
    timestamp: "3 days ago",
    date: "Nov 12, 2025",
    filesChanged: 1,
    additions: 34,
    deletions: 28,
    branch: "main",
  },
];

// map the tailwind-y gradient names to our CSS avatar classes
function avatarGradientClass(color: string): string {
  if (color === "from-emerald-500 to-teal-500") return "eco-avatar--green";
  if (color === "from-teal-500 to-cyan-500") return "eco-avatar--blue";
  if (color === "from-green-500 to-emerald-500") return "eco-avatar--purple";
  if (color === "from-lime-500 to-green-500") return "eco-avatar--orange";
  if (color === "from-emerald-600 to-green-600") return "eco-avatar--pink";
  return "eco-avatar--green";
}

export function CommitsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCommits = commits.filter((commit) => {
    const q = searchQuery.toLowerCase();
    return (
      commit.message.toLowerCase().includes(q) ||
      commit.author.toLowerCase().includes(q) ||
      commit.hash.toLowerCase().includes(q)
    );
  });

  const handleCommitClick = (commit: Commit) => {
    setSelectedCommit(commit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCommit(null);
  };

  // simple previous-hash logic
  const getPreviousCommitHash = (currentCommit: Commit) => {
    const currentIndex = commits.findIndex((c) => c.id === currentCommit.id);
    const previousCommit = commits[currentIndex + 1];
    return previousCommit ? previousCommit.hash : "f8a3b2c";
  };

  return (
    <div className="eco-commits-layout">
      {/* header */}
      <div className="eco-commits-header">
        <div className="eco-commits-search">
          <div className="eco-commits-search-wrapper">
            <Search className="eco-commits-search-icon" size={16} />
            <input
              className="eco-commits-search-input"
              placeholder="Search commits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="eco-commits-header-right">
          <div className="eco-commit-count-pill">
            <GitCommit size={14} />
            <span>{commits.length} commits</span>
          </div>
        </div>
      </div>

      {/* list */}
      <div className="eco-commits-list">
        {filteredCommits.map((commit) => (
          <div
            key={commit.id}
            className="eco-commit-row eco-commit-row--clickable"
            onClick={() => handleCommitClick(commit)}
          >
            <div className="eco-commit-avatar-wrap">
              <div
                className={
                  "eco-avatar-circle " +
                  avatarGradientClass(commit.authorColor)
                }
              >
                {commit.authorAvatar}
              </div>
            </div>

            <div className="eco-commit-mainv2">
              <p className="eco-commit-message">{commit.message}</p>

              <div className="eco-commit-meta-line">
                <span className="eco-commit-author">{commit.author}</span>
                <span className="eco-commit-dot">•</span>
                <span className="eco-commit-time">
                  <Calendar size={12} /> {commit.timestamp}
                </span>
                <span className="eco-commit-dot">•</span>
                <span className="eco-commit-hash">
                  <Hash size={12} />
                  <code>{commit.hash}</code>
                </span>
              </div>

              <div className="eco-commit-footer">
                <span className="eco-commit-files">
                  {commit.filesChanged} files changed
                </span>
                <span className="eco-commit-additions">
                  +{commit.additions}
                </span>
                <span className="eco-commit-deletions">
                  -{commit.deletions}
                </span>
              </div>
            </div>

            <button
              className="eco-commit-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCommitClick(commit);
              }}
            >
              <ExternalLink size={16} />
              View
            </button>
          </div>
        ))}

        {filteredCommits.length === 0 && (
          <div className="eco-commits-empty">
            <GitCommit size={32} />
            <p>No commits found matching your search.</p>
          </div>
        )}
      </div>

      {/* modal */}
      {selectedCommit && (
        <CommitDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          commitHash={selectedCommit.hash}
          previousCommitHash={getPreviousCommitHash(selectedCommit)}
        />
      )}
    </div>
  );
}
