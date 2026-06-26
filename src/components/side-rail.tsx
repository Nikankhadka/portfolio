"use client";

import { useHomeSections } from "@/components/home-sections-provider";
import { homeSectionIds } from "@/content/site";

const SECTION_IDS = ["home", ...homeSectionIds];

export function SideRail() {
  const { activeSection, setActiveSection } = useHomeSections();

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id === "home" ? "about" : (id as never));
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="side-rail" aria-hidden="false" aria-label="Section navigation">
      {SECTION_IDS.map((id) => {
        const isActive = id === "home" ? activeSection === null : activeSection === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={`Jump to ${id}`}
            className="side-rail__dot"
            data-active={isActive ? "true" : "false"}
            onClick={() => handleClick(id)}
          />
        );
      })}
    </div>
  );
}