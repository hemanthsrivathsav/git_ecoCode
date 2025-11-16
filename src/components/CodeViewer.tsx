// src/components/CodeViewer.tsx
import { ArrowLeft, Copy, Download } from "lucide-react";

interface FileItem {
  name: string;
  content?: string;
}

export function CodeViewer({
  file,
  onBack,
}: {
  file: FileItem;
  onBack: () => void;
}) {
  const content =
    file.content ||
    `// No preview available for this file\n// File: ${file.name}`;

  const copyText = () => navigator.clipboard.writeText(content);

  const downloadText = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name;
    a.click();
  };

  return (
    <div>
      <div className="eco-code-view-header">
        <button className="eco-code-back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="eco-code-toolbar">
          <button onClick={copyText}>
            <Copy size={13} /> Copy
          </button>

          <button onClick={downloadText}>
            <Download size={13} /> Download
          </button>
        </div>
      </div>

      <pre className="eco-code-body">{content}</pre>
    </div>
  );
}
