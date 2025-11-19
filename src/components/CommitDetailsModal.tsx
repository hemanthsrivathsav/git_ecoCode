// src/components/CommitDetailsModal.tsx

import {
  TrendingDown,
  TrendingUp,
  Cpu,
  Zap,
  HardDrive,
  X,
} from "lucide-react";

interface CommitDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  commitHash: string;
  previousCommitHash: string;
}

const previousCode = `// Previous implementation
function calculateUserMetrics(users) {
  const results = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const metrics = {
      id: user.id,
      score: 0
    };
    
    // Inefficient calculation
    for (let j = 0; j < user.activities.length; j++) {
      metrics.score += user.activities[j].points;
    }
    
    // Multiple DOM updates
    document.getElementById('user-' + user.id)
      .innerHTML = metrics.score;
    
    results.push(metrics);
  }
  
  return results;
}

// Unused dependencies
import { heavyLibrary } from 'heavy-package';
import { anotherLib } from 'another-package';

export default calculateUserMetrics;`;

const currentCode = `// Optimized implementation
function calculateUserMetrics(users) {
  // Use map for functional approach
  const results = users.map(user => ({
    id: user.id,
    score: user.activities.reduce(
      (sum, activity) => sum + activity.points, 
      0
    )
  }));
  
  // Batch DOM updates
  const fragment = document.createDocumentFragment();
  results.forEach(({ id, score }) => {
    const element = document.getElementById(\`user-\${id}\`);
    if (element) element.textContent = score;
  });
  
  return results;
}

// Removed unused dependencies

export default calculateUserMetrics;`;

export function CommitDetailsModal({
  isOpen,
  onClose,
  commitHash,
  previousCommitHash,
}: CommitDetailsModalProps) {
  if (!isOpen) return null;

  const previousMetrics = {
    carbonEmissions: 234,
    ramPower: 1.8,
    cpuPower: 45.2,
    totalElectricity: 125.4,
  };

  const currentMetrics = {
    carbonEmissions: 189,
    ramPower: 1.2,
    cpuPower: 32.8,
    totalElectricity: 89.7,
  };

  const scoreDifference =
    previousMetrics.carbonEmissions - currentMetrics.carbonEmissions;
  const isImprovement = scoreDifference > 0;

  return (
    <div className="eco-modal-backdrop" onClick={onClose}>
      <div
        className="eco-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* header */}
        <div className="eco-modal-header">
          <div>
            <h2 className="eco-modal-title">Commit Comparison</h2>
            <p className="eco-modal-subtitle">
              Analyzing sustainability impact between commits
            </p>
          </div>
          <button
            className="eco-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* body: two panels */}
        <div className="eco-modal-body">
          {/* Left: previous */}
          <div className="eco-modal-pane">
            <div className="eco-modal-pane-heading">
              <h3 className="eco-modal-pane-title eco-modal-pane-title--before">
                Previous Commit
              </h3>
              <code className="eco-modal-hash eco-modal-hash--before">
                {previousCommitHash}
              </code>
            </div>

            <div className="eco-modal-code-block">
              <div className="eco-modal-code-scroll">
                <pre>
                  <code>{previousCode}</code>
                </pre>
              </div>
            </div>

            <div className="eco-modal-metrics">
              <p className="eco-modal-metrics-label">
                Sustainability Metrics (Before)
              </p>
              <div className="eco-modal-metrics-card eco-modal-metrics-card--before">
                <div className="eco-modal-metric-main">
                  <div>
                    <div className="eco-modal-metric-main-row">
                      <span className="eco-modal-metric-main-value eco-modal-metric-main-value--bad">
                        +{previousMetrics.carbonEmissions}
                      </span>
                      <TrendingUp className="eco-modal-metric-main-icon eco-modal-metric-main-icon--bad" />
                    </div>
                    <p className="eco-modal-metric-caption">
                      Carbon emissions (gCO₂)
                    </p>
                  </div>
                  <div className="eco-modal-metric-badge eco-modal-metric-badge--bad">
                    High impact
                  </div>
                </div>

                <div className="eco-modal-metrics-grid eco-modal-metrics-grid--warm">
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <HardDrive className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--warm" />
                      <span>RAM Power</span>
                    </div>
                    <p>{previousMetrics.ramPower}W</p>
                  </div>
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <Cpu className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--warm" />
                      <span>CPU Power</span>
                    </div>
                    <p>{previousMetrics.cpuPower}W</p>
                  </div>
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <Zap className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--warm" />
                      <span>Total Energy</span>
                    </div>
                    <p>{previousMetrics.totalElectricity}Wh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="eco-modal-divider" />

          {/* Right: current */}
          <div className="eco-modal-pane">
            <div className="eco-modal-pane-heading">
              <h3 className="eco-modal-pane-title eco-modal-pane-title--after">
                Current Commit
              </h3>
              <code className="eco-modal-hash eco-modal-hash--after">
                {commitHash}
              </code>
            </div>

            <div className="eco-modal-code-block">
              <div className="eco-modal-code-scroll">
                <pre>
                  <code>{currentCode}</code>
                </pre>
              </div>
            </div>

            <div className="eco-modal-metrics">
              <p className="eco-modal-metrics-label">
                Sustainability Metrics (After)
              </p>
              <div className="eco-modal-metrics-card eco-modal-metrics-card--after">
                <div className="eco-modal-metric-main">
                  <div>
                    <div className="eco-modal-metric-main-row">
                      <span className="eco-modal-metric-main-value eco-modal-metric-main-value--good">
                        {currentMetrics.carbonEmissions}
                      </span>
                      <TrendingDown className="eco-modal-metric-main-icon eco-modal-metric-main-icon--good" />
                    </div>
                    <p className="eco-modal-metric-caption">
                      Carbon emissions (gCO₂)
                    </p>
                  </div>
                  <div className="eco-modal-metric-badge eco-modal-metric-badge--good">
                    Optimized
                  </div>
                </div>

                <div className="eco-modal-metrics-grid eco-modal-metrics-grid--cool">
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <HardDrive className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--cool" />
                      <span>RAM Power</span>
                    </div>
                    <p>{currentMetrics.ramPower}W</p>
                  </div>
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <Cpu className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--cool" />
                      <span>CPU Power</span>
                    </div>
                    <p>{currentMetrics.cpuPower}W</p>
                  </div>
                  <div className="eco-modal-metric-chip">
                    <div className="eco-modal-metric-chip-header">
                      <Zap className="eco-modal-metric-chip-icon eco-modal-metric-chip-icon--cool" />
                      <span>Total Energy</span>
                    </div>
                    <p>{currentMetrics.totalElectricity}Wh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="eco-modal-footer">
          <span className="eco-modal-footer-label">
            Total Carbon Reduction:
          </span>
          <div className="eco-modal-footer-pill">
            <TrendingDown size={16} />
            <span>{Math.abs(scoreDifference)} gCO₂ saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
