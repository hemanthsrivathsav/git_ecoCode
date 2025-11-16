// src/components/FileExplorer.tsx

import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, Clock, FileCode } from "lucide-react";
import { CodeViewer } from "./CodeViewer";

interface FileItem {
  name: string;
  type: "file" | "folder";
  size?: string;
  lastModified: string;
  path: string; 
  children?: FileItem[];
  content?: string; // For demo viewing
}

const mockFiles: FileItem[] = [
  {
    name: "src",
    type: "folder",
    lastModified: "1h ago",
    path: "src",
    children: [
      {
        name: "main.tsx",
        type: "file",
        lastModified: "1h ago",
        size: "2.1 KB",
        path: "src/main.tsx",
        content: `export function main() {\n  console.log("Hello world");\n}`
      },
      {
        name: "App.tsx",
        type: "file",
        lastModified: "2h ago",
        size: "3.8 KB",
        path: "src/App.tsx"
      }
    ]
  },
  {
    name: "package.json",
    type: "file",
    size: "1.1 KB",
    lastModified: "3h ago",
    path: "package.json"
  },
  {
    name: "vite.config.ts",
    type: "file",
    size: "0.8 KB",
    lastModified: "5h ago",
    path: "vite.config.ts"
  }
];


export function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const toggleFolder = (name: string) => {
    setOpenFolders((p) => ({ ...p, [name]: !p[name] }));
  };

  const renderFile = (item: FileItem, depth = 0) => {
    const isOpen = openFolders[item.name];

    if (item.type === "folder") {
      return (
        <div key={item.name}>
          <div
            className="eco-file-row"
            style={{ paddingLeft: depth * 20 + 8 }}
            onClick={() => toggleFolder(item.name)}
          >
            <div className="eco-file-main">
              {isOpen ? (
                <ChevronDown size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
              <Folder size={18} />
              <span className="eco-file-name">{item.name}</span>
            </div>
            <div className="eco-file-meta">
              <Clock size={14} />
              <span>{item.lastModified}</span>
            </div>
          </div>

          {isOpen &&
            item.children?.map((child) => renderFile(child, depth + 1))}
        </div>
      );
    }

    return (
      <div
        key={item.name}
        className="eco-file-row"
        style={{ paddingLeft: depth * 20 + 8 }}
        onClick={() => setSelectedFile(item)}
      >
        <div className="eco-file-main">
          <File size={17} />
          <span className="eco-file-name">{item.name}</span>
        </div>

        <div className="eco-file-meta">
          {item.size && (
            <>
              <FileCode size={14} />
              <span>{item.size}</span>
            </>
          )}
          <Clock size={14} />
          <span>{item.lastModified}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!selectedFile && (
        <>
          <div className="eco-file-header">
            <div className="eco-file-header-left">
              <Folder size={20} />
              <span>Project Files</span>
            </div>

            <div className="eco-file-header-right">
              <Clock size={15} />
              Updated just now
            </div>
          </div>

          <div className="eco-file-list">{mockFiles.map((f) => renderFile(f))}</div>
        </>
      )}

      {selectedFile && (
        <CodeViewer file={selectedFile} onBack={() => setSelectedFile(null)} />
      )}
    </div>
  );
}
