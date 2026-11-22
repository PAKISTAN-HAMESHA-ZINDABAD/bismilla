export type AudienceKey = 'architects' | 'builders' | 'homeowners';

export type ProjectCategory =
  | 'all'
  | 'gates-louvers'
  | 'stairs-railings'
  | 'commercial-facades'
  | 'structural-steel';

export type QuoteRole = 'Architect' | 'Builder' | 'Homeowner';

export interface AudienceProfile {
  key: AudienceKey;
  label: string;
  headline: string;
  summary: string;
  deliverables: string[];
  coordinationNote: string;
}

export interface FabricationCapability {
  index: string;
  title: string;
  summary: string;
  specs: string;
  turnaround: string;
}

export interface ProjectArchetype {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  projectTypeValue: string;
  cityContext: string;
  turnaround: string;
  materialSpec: string;
  finishSpec: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  detail: string;
  timing: string;
}

export const HERO_WORKSHOP_IMAGE =
  '/src/assets/images/hero_steel_workshop_1795333665989.jpg';

export const HERO_SPEC_HIGHLIGHTS = [
  {
    label: 'Operating Schedule',
    value: '24 Hours · 3 Fabrication Shifts',
  },
  {
    label: 'Material Grades',
    value: 'MS A36 · SS 304/316 · Corten',
  },
  {
    label: 'Cut & Fold Tolerance',
    value: '±0.5 mm CNC Laser & Brake',
  },
  {
    label: 'Service Coverage',
    value: 'Lahore · Islamabad · Karachi',
  },
] as const;

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    key: 'architects',
    label: 'Architects & Designers',
    headline: 'Shop drawings executed faithfully to your elevation intent',
    summary:
      'We translate CAD and BIM detail sheets into flush-welded architectural steel with concealed fasteners, consistent shadow gaps, and verified powder-coat or raw patina finishes.',
    deliverables: [
      'CAD/DXF shop drawing review and weld-joint mockups before cutting',
      'Concealed hinge, motor-track, and structural embed coordination',
      'Custom CNC laser-cut jali patterns, louvers, and cantilevered stair stringers',
    ],
    coordinationNote: '24-hour technical desk for CAD revisions & sample dispatches',
  },
  {
    key: 'builders',
    label: 'Builders & Contractors',
    headline: 'Site-ready structural steel delivered on tight concrete & MEP schedules',
    summary:
      'Round-the-clock workshop shifts prevent critical-path delays on commercial plazas, warehouses, and multi-unit residential builds—with night-window erection available.',
    deliverables: [
      'Pre-drilled gusset plates, I-beam portal frames, and mezzanine decking',
      'Batch-numbered trusses and stair flights staged for rapid crane erection',
      'Overnight fabrication and off-peak site delivery to avoid urban traffic bans',
    ],
    coordinationNote: 'Direct BOQ takeoffs and night-shift erection crew scheduling',
  },
  {
    key: 'homeowners',
    label: 'Homeowners',
    headline: 'Durable gates, railings, and courtyard structures measured on-site',
    summary:
      'From initial site measurement to rust-protected primer and final site installation, we build custom residential metalwork tailored to your plot dimensions and privacy needs.',
    deliverables: [
      'On-site laser measurement for boundary gates, grills, and terrace pergolas',
      'Epoxy zinc primer and UV-stable electrostatic powder coating against monsoon rust',
      'Clean installation with motorization prep for sliding and swing driveway gates',
    ],
    coordinationNote: '24-hour site visit booking and transparent per-square-foot estimates',
  },
];

export const FABRICATION_CAPABILITIES: FabricationCapability[] = [
  {
    index: '01',
    title: 'Architectural Metalwork',
    summary:
      'CNC fiber-laser screens, ventilated facade louvers, folded sheet trims, and custom door frames built to tight architectural reveals.',
    specs: '2 mm–12 mm MS/SS Sheet · ±0.5 mm CNC Tolerance',
    turnaround: '7–12 Days Typical',
  },
  {
    index: '02',
    title: 'Gates, Railings & Stairs',
    summary:
      'Motorized sliding and pivot villa gates, folded-plate cantilevered staircases, and tension-rod or glass-shoe balustrades.',
    specs: '14–16 SWG Tube & 10 mm Stringer Plate',
    turnaround: '10–18 Days Typical',
  },
  {
    index: '03',
    title: 'Structural & Custom Steel',
    summary:
      'Long-span roof trusses, mezzanine framing, entrance canopies, and bolted portal structures fabricated to structural engineer specs.',
    specs: 'HEB / IPE / Box Sections · MIG & Arc Certified',
    turnaround: 'Schedule-Aligned 24/7',
  },
  {
    index: '04',
    title: 'Finishing & Installation',
    summary:
      'Sandblasting, hot-dip galvanizing, two-pack epoxy priming, oven-baked powder coating, and anchored site erection across Pakistan.',
    specs: 'RAL Matte Charcoal · Brushed SS · Zinc Primer',
    turnaround: 'Day & Night Site Crews',
  },
];

export const PROJECT_CATEGORIES: { key: ProjectCategory; label: string }[] = [
  { key: 'all', label: 'All Work' },
  { key: 'gates-louvers', label: 'Gates & Louvers' },
  { key: 'stairs-railings', label: 'Stairs & Railings' },
  { key: 'commercial-facades', label: 'Commercial Facades' },
  { key: 'structural-steel', label: 'Structural Steel' },
];

export const PROJECT_ARCHETYPES: ProjectArchetype[] = [
  {
    id: 'villa-louver-gate',
    title: 'Modern Villa Sliding Gate & Vertical Louvers',
    category: 'gates-louvers',
    categoryLabel: 'Gates & Louvers',
    projectTypeValue: 'Gates, Boundary Walls & Louvers',
    cityContext: 'Islamabad & Lahore Residential',
    turnaround: '12-Day Fabrication',
    materialSpec: '14 SWG MS Box Louvers · Heavy Channel Track',
    finishSpec: 'Zinc-Rich Epoxy + Matte Charcoal Powder Coat',
    description:
      'Flush-welded driveway sliding gate with angled privacy louvers, concealed floor guide track, and integrated pedestrian wicket leaf engineered for automated rack-and-pinion motors.',
    imageSrc: '/src/assets/images/archetype_villa_gate_1795333665300.jpg',
    imageAlt:
      'Custom matte charcoal vertical louver steel sliding gate at a contemporary concrete residence',
  },
  {
    id: 'cantilever-staircase',
    title: 'Cantilevered Steel Plate Staircase & Rod Balustrade',
    category: 'stairs-railings',
    categoryLabel: 'Stairs & Railings',
    projectTypeValue: 'Staircases, Railings & Balustrades',
    cityContext: 'Double-Height Residence',
    turnaround: '16-Day Fabrication',
    materialSpec: '12 mm Folded MS Stringer · 16 mm Solid Vertical Rods',
    finishSpec: 'Bead-Blasted Gunmetal & Satin Clear Sealer',
    description:
      'Wall-anchored structural steel stair carriage fabricated in modular segments for clean interior assembly, paired with pre-drilled tread plates for solid timber and floor-to-ceiling tension rods.',
    imageSrc: '/src/assets/images/archetype_cantilever_stair_1795333666963.jpg',
    imageAlt:
      'Custom folded matte gunmetal steel staircase with timber treads and vertical tension balustrade rods',
  },
  {
    id: 'commercial-facade-canopy',
    title: 'Commercial Steel Canopy & Perforated Brise-Soleil',
    category: 'commercial-facades',
    categoryLabel: 'Commercial Facades',
    projectTypeValue: 'Commercial Facade & Canopy',
    cityContext: 'Karachi & Lahore Commercial',
    turnaround: '21-Day Turnkey Scope',
    materialSpec: 'IPE 240 Outriggers · 3 mm CNC Perforated Panels',
    finishSpec: 'Marine-Grade Zinc Primer + Copper-Bronze PVDF',
    description:
      'Cantilevered structural entrance canopy and modular sun-shading facade screen engineered to cut western solar gain while preserving daylight across curtain-wall glazing.',
    imageSrc: '/src/assets/images/archetype_commercial_facade_1795333667577.jpg',
    imageAlt:
      'Modern commercial building featuring a dark steel entrance canopy and perforated bronze-slate facade screen',
  },
  {
    id: 'portal-frame-truss',
    title: 'Long-Span Bolted Portal Frame & Roof Truss System',
    category: 'structural-steel',
    categoryLabel: 'Structural Steel',
    projectTypeValue: 'Structural Steel & Trusses',
    cityContext: 'Industrial & Showroom Builds',
    turnaround: '24/7 Shift Production',
    materialSpec: 'Custom Built-Up I-Sections · 16 mm Gusset Plates',
    finishSpec: 'Red-Oxide / Grey Alkyd Structural Primer',
    description:
      'Shop-fabricated wide-span trusses and bolted splice connections built under strict dimensional jigs so site erection crews bolt sections cleanly with minimal field welding.',
    imageSrc: '/src/assets/images/archetype_structural_truss_1795333667594.jpg',
    imageAlt:
      'Exposed long-span dark steel portal frame and bolted truss connections inside a showroom build',
  },
  {
    id: 'courtyard-pergola-screen',
    title: 'Courtyard Steel Pergola & Laser-Cut Privacy Screen',
    category: 'gates-louvers',
    categoryLabel: 'Gates & Louvers',
    projectTypeValue: 'Pergolas, Screens & Architectural Metalwork',
    cityContext: 'Residential & Hospitality Terraces',
    turnaround: '10-Day Fabrication',
    materialSpec: '150x75 mm RHS Frame · 4 mm CNC Laser Screen',
    finishSpec: 'Shot-Blasted + Matte Slate Exterior Coat',
    description:
      'Clean-mitered outdoor pergola structure combined with custom geometric laser-cut privacy panels, pre-fitted with concealed baseplate anchor covers for stone and concrete terraces.',
    imageSrc: '/src/assets/images/archetype_pergola_screen_1795333666744.jpg',
    imageAlt:
      'Matte dark steel courtyard pergola and geometric laser-cut privacy screen casting crisp shadows',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation & Drawings',
    detail:
      'Share architectural CAD drawings, a BOQ, or rough site dimensions. Our estimation desk responds at any hour to confirm feasibility and schedule a site survey.',
    timing: '24-Hour Response Desk',
  },
  {
    number: '02',
    title: 'Material & Finish Selection',
    detail:
      'We specify steel gauge, tube profile, weld grade, and corrosion protection—matching coastal humidity in Karachi or thermal swings in Punjab and Islamabad.',
    timing: 'Physical Finish Swatches',
  },
  {
    number: '03',
    title: 'Precision Fabrication',
    detail:
      'Continuous 24-hour workshop shifts handle CNC laser cutting, press-brake bending, jig-aligned welding, grinding, and oven-cured powder coating.',
    timing: '3-Shift Shop Floor',
  },
  {
    number: '04',
    title: 'Delivery & Installation',
    detail:
      'Flatbed dispatch across Pakistan with our own anchoring and erection technicians, including overnight installation windows for active commercial sites.',
    timing: 'Nationwide Site Dispatch',
  },
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Karachi',
  'Faisalabad',
  'Multan',
  'Sialkot',
  'Gujranwala',
  'Peshawar',
  'Other City in Pakistan',
] as const;

export const PROJECT_TYPES = [
  'Gates, Boundary Walls & Louvers',
  'Staircases, Railings & Balustrades',
  'Commercial Facade & Canopy',
  'Structural Steel & Trusses',
  'Pergolas, Screens & Architectural Metalwork',
  'Custom Fabrication / Multi-Scope BOQ',
] as const;
