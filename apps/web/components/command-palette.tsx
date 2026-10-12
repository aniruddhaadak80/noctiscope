"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ROUTES = [
  ["Atlas", "/atlas"],
  ["Dreams", "/dreams"],
  ["Biases", "/biases"],
  ["Archetypes", "/archetypes"],
  ["Neurochem", "/neurochem"],
  ["Defenses", "/defenses"],
  ["Sleep", "/sleep"],
  ["Memory", "/memory"],
  ["Emotions", "/emotions"],
  ["Brainwaves", "/brainwaves"],
  ["Journal", "/journal"],
  ["Time machine", "/timemachine"],
  ["Quiz", "/quiz"],
  ["Search", "/search"],
  ["Night swarm", "/swarm"],
  ["Habits", "/habits"],
  ["Attachment", "/attach"],
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Navigate the observatory"
    >
      <Command.Input placeholder="Type a lab… (Esc to close)" />
      <Command.List>
        <Command.Empty>No lab found.</Command.Empty>
        {ROUTES.map(([name, href]) => (
          <Command.Item
            key={href}
            value={name}
            onSelect={() => {
              setOpen(false);
              router.push(href);
            }}
          >
            {name}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
