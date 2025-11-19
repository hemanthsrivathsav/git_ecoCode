// src/components/CommitDetailsModal.tsx

import {
  TrendingDown,
  TrendingUp,
  Cpu,
  Zap,
  HardDrive,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";

interface CommitDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  commitHash: string;
  previousCommitHash: string;
}

// Mock code for demonstration
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

  // Mock sustainability scores
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

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className="eco-modal-overlay" onClick={handleOverlayClick}>
      <div className="eco-modal" onClick={handleModalClick}>
        {/* HEADER */}
        <header className="eco-modal-header">
          <div>
            <h2>Commit Comparison</h2>
            <p>Analyzing sustainability impact between commits</p>
          </div>
          <button
            className="eco-modal-close"
            onClick={onClose}
            aria-label="Close commit comparison"
          >
            <X size={18} />
          </button>
        </header>

        {/* BODY: two panels */}
        <div className="eco-modal-body">
          {/* LEFT: previous commit */}
          <section className="eco-modal-panel">
            <div>
              <div className="eco-modal-panel-title">Previous Commit</div>
              <div style={{ marginTop: 6 }}>
                <span className="eco-modal-hash">{previousCommitHash}</span>
              </div>
            </div>

            <div className="eco-code-window">
              <div className="eco-code-scroll">
                <pre className="eco-code-block">{previousCode}</pre>
              </div>
            </div>

            <div>
              <div className="eco-metrics-title">
                Sustainability Metrics (Before)
              </div>
              <div className="eco-metrics-card eco-metrics-card--before">
                <div className="eco-metrics-main">
                  <div className="eco-metrics-main-left">
                    <span style={{ color: "#dc2626" }}>
                      +{previousMetrics.carbonEmissions}
                    </span>
                    <p>Carbon emissions (gCO₂)</p>
                  </div>
                  <div className="eco-metrics-tag eco-metrics-tag--danger">
                    High Impact
                  </div>
                </div>

                <div className="eco-metrics-grid">
                  <div className="eco-metric-pill eco-metric-pill--warm">
                    <div className="eco-metric-pill-label">
                      <HardDrive size={13} />
                      <span>RAM Power</span>
                    </div>
                    <div>{previousMetrics.ramPower}W</div>
                  </div>

                  <div className="eco-metric-pill eco-metric-pill--warm">
                    <div className="eco-metric-pill-label">
                      <Cpu size={13} />
                      <span>CPU Power</span>
                    </div>
                    <div>{previousMetrics.cpuPower}W</div>
                  </div>

                  <div className="eco-metric-pill eco-metric-pill--warm">
                    <div className="eco-metric-pill-label">
                      <Zap size={13} />
                      <span>Total Energy</span>
                    </div>
                    <div>{previousMetrics.totalElectricity}Wh</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* divider */}
          <div className="eco-modal-divider" />

          {/* RIGHT: current commit */}
          <section className="eco-modal-panel">
            <div>
              <div className="eco-modal-panel-title">Current Commit</div>
              <div style={{ marginTop: 6 }}>
                <span className="eco-modal-hash">{commitHash}</span>
              </div>
            </div>

            <div className="eco-code-window">
              <div className="eco-code-scroll">
                <pre className="eco-code-block">{currentCode}</pre>
              </div>
            </div>

            <div>
              <div className="eco-metrics-title">
                Sustainability Metrics (After)
              </div>
              <div className="eco-metrics-card eco-metrics-card--after">
                <div className="eco-metrics-main">
                  <div className="eco-metrics-main-left">
                    <span style={{ color: "#059669" }}>
                      {currentMetrics.carbonEmissions}
                    </span>
                    <p>Carbon emissions (gCO₂)</p>
                  </div>
                  <div className="eco-metrics-tag eco-metrics-tag--success">
                    Optimized
                  </div>
                </div>

                <div className="eco-metrics-grid">
                  <div className="eco-metric-pill eco-metric-pill--cool">
                    <div className="eco-metric-pill-label">
                      <HardDrive size={13} />
                      <span>RAM Power</span>
                    </div>
                    <div>{currentMetrics.ramPower}W</div>
                  </div>

                  <div className="eco-metric-pill eco-metric-pill--cool">
                    <div className="eco-metric-pill-label">
                      <Cpu size={13} />
                      <span>CPU Power</span>
                    </div>
                    <div>{currentMetrics.cpuPower}W</div>
                  </div>

                  <div className="eco-metric-pill eco-metric-pill--cool">
                    <div className="eco-metric-pill-label">
                      <Zap size={13} />
                      <span>Total Energy</span>
                    </div>
                    <div>{currentMetrics.totalElectricity}Wh</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="eco-modal-footer">
          <div className="eco-modal-footer-chip">
            {isImprovement ? (
              <>
                <TrendingDown size={16} />
                <span>{Math.abs(scoreDifference)} gCO₂ saved</span>
              </>
            ) : (
              <>
                <TrendingUp size={16} />
                <span>{Math.abs(scoreDifference)} gCO₂ increase</span>
              </>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
