import type { Service, SiteSettings } from "./type";

const SERVICES_KEY = "sc_services";
const SETTINGS_KEY = "sc_settings";

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "Commercial Construction",
    desc: "Office towers and retail centers built to spec, on time and within budget.",
    longDesc:
      "Our commercial construction division delivers world-class office towers, retail developments, hotels, and mixed-use complexes. Every project starts with a deep dive into your business goals — because great buildings don't just look impressive, they drive productivity and brand value. We manage everything from site acquisition and permitting through structural engineering, MEP coordination, fit-out, and final handover. Our in-house teams cover steel erection, concrete systems, curtain-wall glazing, and interior finishes, eliminating costly subcontractor gaps and keeping your schedule intact.",
    category: "Commercial",
    startingPrice: "From $500K",
    duration: "6–18 months",
    projectsCompleted: 47,
    features: [
      "Custom architectural and structural design",
      "LEED and green building certification support",
      "In-house MEP and curtain-wall coordination",
      "Real-time cost engineering and budget tracking",
      "Full permitting, zoning, and compliance management",
      "Phased occupancy planning to minimize business disruption",
    ],
    process: [
      {
        title: "Discovery & Feasibility",
        desc: "We analyse your site, programme requirements, and budget to produce a feasibility report and preliminary design brief.",
      },
      {
        title: "Design & Engineering",
        desc: "Our architects and structural engineers produce full construction drawings, coordinated with MEP consultants and reviewed for value engineering opportunities.",
      },
      {
        title: "Permitting & Pre-construction",
        desc: "We manage all authority submissions, procurement of long-lead items, and site preparation so work starts the moment approvals land.",
      },
      {
        title: "Construction & Commissioning",
        desc: "Weekly progress reports, milestone inspections, and a rigorous commissioning process ensure the building performs exactly as designed from day one.",
      },
    ],
    date: "2025-04-12",
    featured: true,
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800"],
  },
  {
    id: "2",
    title: "Industrial Builds",
    desc: "Heavy industrial facilities and warehouses engineered for maximum efficiency.",
    longDesc:
      "Industrial construction demands a different breed of expertise — one that combines structural precision with deep knowledge of process flow, heavy-load requirements, and operational safety. We have delivered manufacturing plants, distribution hubs, cold-storage facilities, and specialised processing buildings across multiple sectors. Our teams are experienced with heavy slab design, crane rails, blast-rated walls, chemical-resistant flooring, and the complex MEP infrastructure that modern industry depends on.",
    category: "Industrial",
    startingPrice: "From $1M",
    duration: "8–24 months",
    projectsCompleted: 28,
    features: [
      "Heavy structural steel and reinforced concrete systems",
      "Crane rail and overhead lifting infrastructure",
      "High-capacity electrical and utility distribution",
      "Industrial-grade flooring (epoxy, chemical-resistant, FM-approved)",
      "Fire suppression and hazardous area classification compliance",
      "Lean process-flow integration from day one",
    ],
    process: [
      {
        title: "Process & Programme Analysis",
        desc: "We work alongside your operations team to understand production flow, equipment layouts, and future expansion needs before a single line is drawn.",
      },
      {
        title: "Structural & Systems Design",
        desc: "Structural engineers size the frame for current and future loads; MEP consultants design utilities around your process requirements.",
      },
      {
        title: "Prefabrication & Site Work",
        desc: "Where possible we prefabricate structural elements off-site to compress the schedule and reduce on-site risk.",
      },
      {
        title: "Fit-Out & Commissioning",
        desc: "We install process equipment, commission all building systems, and hand over a fully operational facility with full as-built documentation.",
      },
    ],
    date: "2025-03-22",
    featured: false,
    images: ["https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"],
  },
  {
    id: "3",
    title: "Infrastructure",
    desc: "Bridges, roads, and civil works engineered to last generations.",
    longDesc:
      "Civil infrastructure is the backbone of every community and economy. Our infrastructure division plans, designs, and constructs bridges, highways, tunnels, drainage networks, and public realm projects with a focus on long-term durability and minimal lifecycle cost. We bring deep expertise in geotechnical investigation, hydrological analysis, and traffic management — and we have the plant, certified operators, and specialist subcontractors to execute on the most demanding civil programmes.",
    category: "Civil Engineering",
    startingPrice: "From $2M",
    duration: "12–36 months",
    projectsCompleted: 19,
    features: [
      "Bridge engineering: girder, cable-stayed, and box-culvert structures",
      "Road and highway construction to national standards",
      "Tunnel excavation and lining (cut-and-cover and bored)",
      "Storm-water, drainage, and utility corridor works",
      "Environmental impact management and mitigation",
      "Traffic management planning and implementation",
    ],
    process: [
      {
        title: "Survey & Geotechnical Investigation",
        desc: "Topographic surveys, ground investigation, and hydrological studies establish the baseline data that underpins all design decisions.",
      },
      {
        title: "Concept & Detailed Design",
        desc: "Our civil engineers develop concept options, carry out comparative analysis, and advance the preferred option to full detailed design and tender documentation.",
      },
      {
        title: "Construction",
        desc: "Earthworks, drainage, structural elements, and paving are sequenced to maintain traffic flow and meet programme milestones.",
      },
      {
        title: "Testing, Inspection & Handover",
        desc: "Load testing, deflection monitoring, and independent inspections are completed before the asset is handed to the client authority.",
      },
    ],
    date: "2025-02-08",
    featured: true,
    images: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800"],
  },
  {
    id: "4",
    title: "Renovation & Retrofit",
    desc: "Modernizing structures with seismic upgrades and sustainable retrofits.",
    longDesc:
      "Many of the world's most valuable buildings were built decades ago — and with the right intervention they can serve another generation efficiently and beautifully. Our renovation and retrofit team specialises in structural strengthening, energy efficiency upgrades, facade replacement, seismic retrofitting, and full interior remodelling. We understand the complexities of working in occupied buildings: careful sequencing, dust containment, noise management, and constant communication with tenants are central to how we operate.",
    category: "Renovation",
    startingPrice: "From $100K",
    duration: "3–12 months",
    projectsCompleted: 63,
    features: [
      "Seismic assessment and structural strengthening",
      "Building envelope and facade replacement",
      "Energy efficiency upgrades (insulation, glazing, HVAC)",
      "Heritage-sensitive restoration and conservation",
      "Interior strip-out and full remodelling",
      "Occupied-building construction management protocols",
    ],
    process: [
      {
        title: "Condition Assessment",
        desc: "A thorough inspection — including structural, MEP, and envelope surveys — establishes the scope of works and identifies hidden defects.",
      },
      {
        title: "Design & Specification",
        desc: "We develop detailed specifications and drawings, resolving existing drawing discrepancies with as-built surveys and investigative openings.",
      },
      {
        title: "Phased Construction",
        desc: "Works are sequenced to keep as much of the building operational as possible, with dust-controlled zones and clear tenant communication plans.",
      },
      {
        title: "Snagging & Handover",
        desc: "A structured snagging process ensures every defect is resolved before practical completion is certified.",
      },
    ],
    date: "2025-01-19",
    featured: false,
    images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"],
  },
  {
    id: "5",
    title: "Project Management",
    desc: "End-to-end orchestration from blueprint approval to handover keys.",
    longDesc:
      "Complex construction projects fail at the interfaces — between designers and contractors, between packages, between schedules and budgets. Our project management service provides a single accountable point of control across every dimension of your project. We deploy experienced project directors, cost managers, and schedulers who embed with your team and represent your interests at every stage. Whether you need full owner's representation or specialist oversight of a specific package, we deliver the rigour and transparency that modern capital projects demand.",
    category: "Management",
    startingPrice: "From $25K",
    duration: "Varies by project",
    projectsCompleted: 120,
    features: [
      "Owner's representative and full project leadership",
      "Cost management, value engineering, and change control",
      "Master programme development and schedule management",
      "Contractor procurement and contract administration",
      "Risk register management and mitigation planning",
      "Monthly board-level reporting and dashboard analytics",
    ],
    process: [
      {
        title: "Project Initiation",
        desc: "We establish governance structures, reporting cadences, and control systems before any design or procurement commences.",
      },
      {
        title: "Design Management",
        desc: "We coordinate the design team, review outputs against the brief, and manage information flow to keep procurement on programme.",
      },
      {
        title: "Procurement & Contract Award",
        desc: "Competitive tendering, bid analysis, and contract negotiation are managed to secure best value without compromising quality or programme.",
      },
      {
        title: "Construction Oversight & Closeout",
        desc: "On-site representation, progress monitoring, and change management ensure delivery against cost, programme, and quality targets.",
      },
    ],
    date: "2025-01-10",
    featured: false,
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"],
  },
  {
    id: "6",
    title: "Safety & Compliance",
    desc: "OSHA-certified protocols and zero-incident commitment on every site.",
    longDesc:
      "Safety is not a box to tick — it is the foundation of every decision we make on site. Our dedicated health, safety, and environment team develops project-specific safety management plans, conducts regular site audits, and delivers toolbox talks and induction programmes for every worker. We hold OSHA 30-hour certifications across our site leadership, maintain a lost-time incident rate well below the industry average, and provide full compliance documentation for client, insurer, and regulatory requirements.",
    category: "Safety",
    startingPrice: "From $15K",
    duration: "Ongoing / project duration",
    projectsCompleted: 200,
    features: [
      "OSHA 30-hour certified site management team",
      "Project-specific safety management plan (SMP)",
      "Daily site inspections and hazard identification reports",
      "Worker induction, toolbox talks, and safety training",
      "Incident investigation and root-cause analysis",
      "Full compliance documentation and regulatory liaison",
    ],
    process: [
      {
        title: "Pre-mobilisation Planning",
        desc: "We prepare the safety management plan, emergency response procedures, and site-specific risk assessments before any works commence.",
      },
      {
        title: "Induction & Training",
        desc: "Every worker completes a site induction before entering, with role-specific toolbox talks delivered weekly throughout the project.",
      },
      {
        title: "Active Monitoring",
        desc: "Daily site walks, unannounced inspections, and near-miss reporting keep hazards visible and corrective actions fast.",
      },
      {
        title: "Review & Continuous Improvement",
        desc: "Monthly safety performance reviews are shared with the client, driving ongoing improvement and demonstrating due diligence to regulators.",
      },
    ],
    date: "2024-12-15",
    featured: false,
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800"],
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "SteelCore Construction",
  contactEmail: "info@steelcore.com",
  contactPhone: "+1 (555) 000-0000",
  contactAddress: "123 Steel Avenue, New York, NY 10001",
  cloudinaryCloudName: "",
  cloudinaryUploadPreset: "",
};

export function getServices(): Service[] {
  try {
    const raw = localStorage.getItem(SERVICES_KEY);
    return raw ? (JSON.parse(raw) as Service[]) : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

export function getSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<SiteSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.statusText}`);
  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}
