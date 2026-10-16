"use client";

import { useEffect, useState } from "react";

const VAULT_KEYS = [
  "noctiscope-focus",
  "noctiscope-moods",
  "noctiscope-insight-input",
];

export default function VaultPage() {
  const [estimate, setEstimate] = useState("unknown");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    navigator.storage
      .estimate()
      .then((estimate) => {
        setEstimate(
          `${Math.round((estimate.usage ?? 0) / 1024)} KB / ${Math.round((estimate.quota ?? 0) / 1024 / 1024)} MB`,
        );
      })
      .catch(() => undefined);
  }, []);

  const exportVault = () => {
    const data: Record<string, string | null> = {};
    for (const key of VAULT_KEYS) data[key] = localStorage.getItem(key);
    data.exportedAt = new Date().toISOString();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "noctiscope-vault.json";
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("Exported local records.");
  };

  const importVault = async (file: File) => {
    const text = await file.text();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text) as Record<string, unknown>;
    } catch {
      setStatus("Import failed: invalid JSON.");
      return;
    }
    let count = 0;
    for (const key of VAULT_KEYS) {
      if (typeof parsed[key] === "string") {
        localStorage.setItem(key, parsed[key] as string);
        count += 1;
      }
    }
    setStatus(`Imported ${count} local records. Reload labs to apply.`);
  };

  const clearVault = () => {
    for (const key of VAULT_KEYS) localStorage.removeItem(key);
    setStatus("Cleared local records.");
  };

  return (
    <div>
      <h1 className="text-3xl font-black">Data Vault</h1>
      <p className="mt-2 text-slate-300">
        All records live in this browser. Export before changing devices.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={exportVault}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left hover:bg-white/10"
        >
          <strong>Export JSON</strong>
          <p className="mt-2 text-sm text-slate-300">
            Download moods, focus sessions and insights.
          </p>
        </button>
        <label className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
          <strong>Import JSON</strong>
          <p className="mt-2 text-sm text-slate-300">
            Restore a vault on this device.
          </p>
          <input
            type="file"
            accept="application/json"
            className="mt-3 block text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importVault(file);
            }}
          />
        </label>
        <button
          type="button"
          onClick={clearVault}
          className="rounded-2xl border border-red-400/30 bg-red-400/5 p-5 text-left hover:bg-red-400/10"
        >
          <strong>Clear Vault</strong>
          <p className="mt-2 text-sm text-slate-300">
            Delete local records from this browser.
          </p>
        </button>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>Storage estimate: {estimate}</p>
        <p className="mt-2">{status || "No action yet."}</p>
      </div>
    </div>
  );
}
