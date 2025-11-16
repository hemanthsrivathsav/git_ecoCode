import { useState } from "react";
import { Header } from "./components/Header";
import { RepositoryHeader } from "./components/RepositoryHeader";
import { FileExplorer } from "./components/FileExplorer";
import { CommitsTab } from "./components/CommitsTab";
import { PullRequestsTab } from "./components/PullRequestsTab";
import { InsightsTab } from "./components/InsightsTab";

export interface FileItem {
  name: string;
  type: "file" | "folder";
  size?: string;
  lastModified: string;
  path: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"code" | "commits" | "pulls" | "insights">("code");

  return (
    <div className="eco-app">
      <Header />

      <div className="eco-app-inner">
        <RepositoryHeader />

        <div className="eco-tabs">
          <div className="eco-tabs-list">
            <button
              className={
                "eco-tab-btn" + (activeTab === "code" ? " eco-tab-btn--active" : "")
              }
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
            <button
              className={
                "eco-tab-btn" + (activeTab === "commits" ? " eco-tab-btn--active" : "")
              }
              onClick={() => setActiveTab("commits")}
            >
              Commits
            </button>
            <button
              className={
                "eco-tab-btn" + (activeTab === "pulls" ? " eco-tab-btn--active" : "")
              }
              onClick={() => setActiveTab("pulls")}
            >
              Pull Requests
            </button>
            <button
              className={
                "eco-tab-btn" + (activeTab === "insights" ? " eco-tab-btn--active" : "")
              }
              onClick={() => setActiveTab("insights")}
            >
              Insights
            </button>
          </div>

          <div className="eco-panel">
            {activeTab === "code" && <FileExplorer />}
            {activeTab === "commits" && <CommitsTab />}
            {activeTab === "pulls" && <PullRequestsTab />}
            {activeTab === "insights" && <InsightsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
