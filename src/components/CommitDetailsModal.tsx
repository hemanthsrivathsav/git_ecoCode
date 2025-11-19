// src/components/CommitDetailsModal.tsx
import { TrendingDown, TrendingUp, Cpu, Zap, HardDrive, X } from "lucide-react";

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

  return (
    <div className="eco-modal-overlay" onClick={onClose}>
      <div
        className="eco-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="commit-modal-title"
      >
        {/* Header */}
        <div className="eco-modal-header">
          <div>
            <h2 id="commit-modal-title">Commit Comparison</h2>
            <p className="eco-modal-subtitle">
              Analyzing sustainability impact between commits
            </p>
          </div>
          <button
            className="eco-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="eco-modal-body">
          {/* Previous Commit */}
          <div className="eco-modal-column">
            <div className="eco-modal-section-header">
              <h3 className="eco-modal-title-before">Previous Commit</h3>
              <code className="eco-modal-hash eco-modal-hash-before">
                {previousCommitHash}
              </code>
            </div>

            <div className="eco-code-card">
              <div className="eco-code-scroll">
                <pre className="eco-code-pre">
                  <code>{previousCode}</code>
                </pre>
              </div>
            </div>

            <div className="eco-metrics">
              <p className="eco-metrics-label">
                Sustainability Metrics (Before)
              </p>
              <div className="eco-metrics-card eco-metrics-card--before">
                <div className="eco-metrics-main eco-metrics-main--before">
                  <div>
                    <div className="eco-metrics-main-value eco-metrics-main-value--bad">
                      +{previousMetrics.carbonEmissions}
                      <TrendingUp className="eco-metrics-main-icon eco-metrics-main-icon--bad" />
                    </div>
                    <p className="eco-metrics-caption">
                      Carbon emissions (gCO₂)
                    </p>
                  </div>
                  <div className="eco-metrics-chip eco-metrics-chip--bad">
                    High Impact
                  </div>
                </div>

                <div className="eco-metrics-grid">
                  <div className="eco-metrics-mini eco-metrics-mini--warn">
                    <div className="eco-metrics-mini-header">
                      <HardDrive className="eco-metrics-mini-icon eco-metrics-mini-icon--warn" />
                      <span>RAM Power</span>
                    </div>
                    <p>{previousMetrics.ramPower}W</p>
                  </div>

                  <div className="eco-metrics-mini eco-metrics-mini--warn">
                    <div className="eco-metrics-mini-header">
                      <Cpu className="eco-metrics-mini-icon eco-metrics-mini-icon--warn" />
                      <span>CPU Power</span>
                    </div>
                    <p>{previousMetrics.cpuPower}W</p>
                  </div>

                  <div className="eco-metrics-mini eco-metrics-mini--warn">
                    <div className="eco-metrics-mini-header">
                      <Zap className="eco-metrics-mini-icon eco-metrics-mini-icon--warn" />
                      <span>Total Energy</span>
                    </div>
                    <p>{previousMetrics.totalElectricity}Wh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="eco-modal-divider" />

          {/* Current Commit */}
          <div className="eco-modal-column">
            <div className="eco-modal-section-header">
              <h3 className="eco-modal-title-after">Current Commit</h3>
              <code className="eco-modal-hash eco-modal-hash-after">
                {commitHash}
              </code>
            </div>

            <div className="eco-code-card">
              <div className="eco-code-scroll">
                <pre className="eco-code-pre">
                  <code>{currentCode}</code>
                </pre>
              </div>
            </div>

            <div className="eco-metrics">
              <p className="eco-metrics-label">Sustainability Metrics (After)</p>
              <div className="eco-metrics-card eco-metrics-card--after">
                <div className="eco-metrics-main eco-metrics-main--after">
                  <div>
                    <div className="eco-metrics-main-value eco-metrics-main-value--good">
                      {currentMetrics.carbonEmissions}
                      <TrendingDown className="eco-metrics-main-icon eco-metrics-main-icon--good" />
                    </div>
                    <p className="eco-metrics-caption">
                      Carbon emissions (gCO₂)
                    </p>
                  </div>
                  <div className="eco-metrics-chip eco-metrics-chip--good">
                    Optimized
                  </div>
                </div>

                <div className="eco-metrics-grid">
                  <div className="eco-metrics-mini eco-metrics-mini--good">
                    <div className="eco-metrics-mini-header">
                      <HardDrive className="eco-metrics-mini-icon eco-metrics-mini-icon--good" />
                      <span>RAM Power</span>
                    </div>
                    <p>{currentMetrics.ramPower}W</p>
                  </div>

                  <div className="eco-metrics-mini eco-metrics-mini--good">
                    <div className="eco-metrics-mini-header">
                      <Cpu className="eco-metrics-mini-icon eco-metrics-mini-icon--good" />
                      <span>CPU Power</span>
                    </div>
                    <p>{currentMetrics.cpuPower}W</p>
                  </div>

                  <div className="eco-metrics-mini eco-metrics-mini--good">
                    <div className="eco-metrics-mini-header">
                      <Zap className="eco-metrics-mini-icon eco-metrics-mini-icon--good" />
                      <span>Total Energy</span>
                    </div>
                    <p>{currentMetrics.totalElectricity}Wh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="eco-modal-footer">
          <span className="eco-modal-footer-label">
            Total Carbon Reduction:
          </span>
          <div className="eco-modal-footer-pill">
            <TrendingDown size={16} />
            <span>
              {Math.abs(scoreDifference)} gCO₂{" "}
              {isImprovement ? "saved" : "added"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
