export type Project = {
  index: string;
  title: string;
  role: string;
  tags: string[];
  blurb: string;
  status: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Solstice House",
    role: "Studio · Residence",
    tags: ["Concrete", "Oak", "Light"],
    blurb:
      "A house wrapped around a sunken courtyard, designed as a single gesture: board-formed concrete and oak shaping a slow path of daylight from dawn to dusk.",
    status: "Studio, 2024",
  },
  {
    index: "02",
    title: "Meridian Pavilion",
    role: "Competition",
    tags: ["Steel", "Timber", "Form"],
    blurb:
      "A demountable waterfront pavilion — a thin steel canopy floating over a timber deck, conceived as an abstract horizon line you can walk beneath.",
    status: "Competition, 2023",
  },
  {
    index: "03",
    title: "Tide Gallery",
    role: "Studio · Cultural",
    tags: ["Concrete", "Brass", "Shadow"],
    blurb:
      "A coastal gallery cut into the slope, drawing visitors down through top-lit concrete halls toward one framed view of the open sea.",
    status: "Studio, 2023",
  },
  {
    index: "04",
    title: "Strata",
    role: "Studio · Mixed-use",
    tags: ["Precast", "Timber", "Brick"],
    blurb:
      "A mid-rise block stacking workspace over homes over a market hall, read as legible horizontal layers — the section turned into the elevation.",
    status: "In progress",
  },
  {
    index: "05",
    title: "The Quarry",
    role: "Adaptive reuse",
    tags: ["Existing stone", "Steel", "Glass"],
    blurb:
      "A disused quarry building reimagined as a community library — new steel and glass inserted lightly within the raw original masonry.",
    status: "Studio, 2022",
  },
  {
    index: "06",
    title: "Field House",
    role: "Competition",
    tags: ["Rammed earth", "Timber", "Wind"],
    blurb:
      "A low rammed-earth retreat in open farmland, its long sculptural roof shaped to catch wind and rain for a fully off-grid household.",
    status: "Competition — 1st",
  },
];
