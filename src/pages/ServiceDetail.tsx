import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Award,
  Users,
  Building2,
  HardHat,
  Wrench,
  Shield,
  TrendingUp,
  Hammer,
  Layers,
  Truck,
  Phone,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

/* ─── Types ─────────────────────────────────────── */
interface ServiceMeta {
  slug: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  heroImage: string;
  accentImage: string;
  overview: string;
  stats: { value: string; label: string }[];
  highlights: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  deliverables: string[];
  gallery: string[];
}

/* ─── Content map ────────────────────────────────── */
const SERVICES: ServiceMeta[] = [
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    icon: Building2,
    tagline: "Office towers, mixed-use, hospitality & retail — built for performance.",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
    overview:
      "From ground-breaking through ribbon-cutting, our commercial construction division delivers iconic structures that set market benchmarks. We combine BIM-integrated design coordination, prefabrication strategies, and rigorous QA/QC protocols to compress schedules and eliminate re-work. Our track record spans Fortune 500 headquarters, five-star hotels, regional shopping centres, and urban mixed-use towers.",
    stats: [
      { value: "140+", label: "Commercial projects" },
      { value: "98%", label: "On-time delivery" },
      { value: "25yr", label: "Structural warranty" },
      { value: "$4.2B", label: "Total value built" },
    ],
    highlights: [
      {
        title: "BIM-first coordination",
        desc: "Clash-free models before a single foundation pour — cutting RFIs by 60%.",
      },
      {
        title: "Fixed-price contracts",
        desc: "Transparent GMP pricing with no hidden contingencies or scope creep.",
      },
      {
        title: "LEED & WELL certified",
        desc: "In-house sustainability consultants targeting Net-Zero-ready buildings.",
      },
      {
        title: "Modular prefabrication",
        desc: "Off-site fabrication for façade, MEP & interiors reduces on-site cycle time.",
      },
      {
        title: "24/7 site operations",
        desc: "Accelerated programmes with multi-shift operations when deadlines demand.",
      },
      {
        title: "Post-handover support",
        desc: "12-month defects period with dedicated response teams on every project.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Feasibility & Brief",
        desc: "We review your programme, budget, and site constraints to establish a realistic project roadmap before design begins.",
      },
      {
        step: "02",
        title: "Design & Engineering",
        desc: "Our in-house structural, MEP, and architectural teams co-develop the design using federated BIM, eliminating downstream surprises.",
      },
      {
        step: "03",
        title: "Procurement & Planning",
        desc: "Long-lead items are secured early. We build the master programme, logistics plan, and subcontractor matrix simultaneously.",
      },
      {
        step: "04",
        title: "Construction & QA",
        desc: "Site teams execute to a CPM schedule. Every milestone is tracked in real-time and reported to the client weekly.",
      },
      {
        step: "05",
        title: "Handover & Warranty",
        desc: "Structured commissioning, O&M manuals, and a 12-month warranty period ensure you receive a fully operational building.",
      },
    ],
    deliverables: [
      "Fully permitted construction drawings",
      "BIM coordination model (LOD 350+)",
      "Master programme & progress reports",
      "LEED / WELL documentation package",
      "Structural & waterproofing warranties",
      "O&M manuals and as-built record set",
      "12-month defects liability cover",
      "Post-completion energy baseline report",
    ],
    gallery: [p1, p2, p3],
  },
  {
    slug: "industrial-builds",
    title: "Industrial Builds",
    icon: HardHat,
    tagline: "Heavy-duty facilities designed around your process, not the other way around.",
    heroImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    overview:
      "Industrial structures demand more than standard construction expertise. Our industrial division understands process flows, heavy-load floor systems, overhead crane rails, blast-rated panels, and hazardous-area electrical classification. We work with owner engineers from day one to ensure every square foot of your facility maximises operational throughput.",
    stats: [
      { value: "80+", label: "Industrial projects" },
      { value: "4M+", label: "Sq ft delivered" },
      { value: "99%", label: "Safety record" },
      { value: "18mo", label: "Avg delivery cycle" },
    ],
    highlights: [
      {
        title: "Process-integrated design",
        desc: "We design around your production flow — not a generic template.",
      },
      {
        title: "Heavy-load floor systems",
        desc: "Post-tensioned ground slabs rated to 50 kN/m² for the heaviest equipment.",
      },
      {
        title: "Crane runway systems",
        desc: "In-house steel erection for overhead bridge cranes up to 200-tonne capacity.",
      },
      {
        title: "Hazardous-area compliance",
        desc: "ATEX and NEC classified zone construction for chemical, oil & gas facilities.",
      },
      {
        title: "Rapid steel erection",
        desc: "Pre-fabricated portal frames erected in days — not weeks.",
      },
      {
        title: "Utilities integration",
        desc: "High-voltage sub-stations, compressed air, process water, and gas all coordinated in-house.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Process & Layout Review",
        desc: "We study your operational workflow to optimise the building footprint, column grid, and service routing.",
      },
      {
        step: "02",
        title: "Structural Engineering",
        desc: "Foundation design, steel grillage, and floor slab specification are engineered for your equipment loads.",
      },
      {
        step: "03",
        title: "Vendor Coordination",
        desc: "Equipment vendors, specialist sub-contractors, and utilities providers are coordinated through a single interface.",
      },
      {
        step: "04",
        title: "Phased Construction",
        desc: "Where possible, we phase works to allow early equipment installation and commissioning to start ahead of overall completion.",
      },
      {
        step: "05",
        title: "Operational Commissioning",
        desc: "Systems are tested under load conditions with your operations team before formal handover.",
      },
    ],
    deliverables: [
      "Process layout and flow optimisation study",
      "Structural engineering calculations & drawings",
      "Heavy-load floor slab design",
      "Crane runway beam design & certification",
      "Hazardous-area electrical classification drawings",
      "Utility infrastructure installation",
      "Equipment foundation block designs",
      "Commissioning and performance test reports",
    ],
    gallery: [p2, p3, p1],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    icon: Wrench,
    tagline: "Bridges, highways, tunnels, and civil works — engineered to outlast generations.",
    heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    overview:
      "Critical infrastructure requires a builder who understands long-term asset performance. Our civil and infrastructure group has delivered river crossings, interchange overpasses, tunnelled utility corridors, and urban transit structures. We manage environmental permitting, utility diversions, and traffic management as integrated parts of every programme.",
    stats: [
      { value: "60+", label: "Infrastructure projects" },
      { value: "12+", label: "Bridge structures" },
      { value: "100yr", label: "Design life standard" },
      { value: "0", label: "Lost-time incidents" },
    ],
    highlights: [
      {
        title: "Long-life design",
        desc: "All infrastructure designed to 100-year design life with whole-life-cost analysis.",
      },
      {
        title: "Environmental management",
        desc: "In-house ecologists and environmental monitors manage all permit conditions.",
      },
      {
        title: "Traffic management planning",
        desc: "Full traffic management design and liaison with transport authorities.",
      },
      {
        title: "Utility diversion coordination",
        desc: "We manage all statutory authority diversions to protect your programme.",
      },
      {
        title: "Load testing & monitoring",
        desc: "Structural monitoring and proof load testing on all major bridge structures.",
      },
      {
        title: "Accelerated bridge construction",
        desc: "Prefabricated bridge unit systems minimise road closures and community disruption.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Site Investigation",
        desc: "Geotechnical borings, topographic survey, and utilities mapping are completed before any design work.",
      },
      {
        step: "02",
        title: "Preliminary & Detailed Design",
        desc: "Concept options are developed and value-engineered before full detailed design is produced for regulatory approval.",
      },
      {
        step: "03",
        title: "Permitting & Stakeholder Management",
        desc: "We manage environmental impact assessments, planning approvals, and all statutory authority engagements.",
      },
      {
        step: "04",
        title: "Construction",
        desc: "Works are sequenced to maintain traffic flows, protect waterways, and minimise community disruption at all times.",
      },
      {
        step: "05",
        title: "Inspection & Certification",
        desc: "Independent structural inspections, load tests, and final certifications are coordinated before the asset is handed to the owner.",
      },
    ],
    deliverables: [
      "Geotechnical investigation and site survey reports",
      "Environmental impact assessment",
      "Regulatory approval documentation",
      "Full structural design package",
      "Traffic management plan",
      "Utility diversion designs",
      "Load test reports and structural certification",
      "Asset management plan for owner's records",
    ],
    gallery: [p3, p1, p2],
  },
  {
    slug: "safety-compliance",
    title: "Safety & Compliance",
    icon: Shield,
    tagline: "Zero-incident commitment. OSHA-certified programmes on every site, every day.",
    heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&q=80",
    overview:
      "Safety is not a programme at SteelCore — it is the culture. Our OSHA-30 certified safety management team establishes site-specific safety plans, conducts daily toolbox talks, and performs unannounced third-party audits. Every worker on our sites receives site-specific induction, PPE, and hazard awareness training before touching a tool.",
    stats: [
      { value: "0", label: "Lost-time incidents (5yr)" },
      { value: "480+", label: "Projects without incident" },
      { value: "100%", label: "OSHA-30 site supervisors" },
      { value: "12K+", label: "Workers trained" },
    ],
    highlights: [
      {
        title: "OSHA-30 certified workforce",
        desc: "All site supervisors hold current OSHA-30 certification; workers hold OSHA-10.",
      },
      {
        title: "Daily safety briefings",
        desc: "Morning toolbox talks address daily hazards, weather, and task-specific risks.",
      },
      {
        title: "Third-party audits",
        desc: "Independent monthly safety audits with corrective action tracking.",
      },
      {
        title: "Incident reporting system",
        desc: "Near-miss reporting culture with root-cause analysis on every event — no matter how minor.",
      },
      {
        title: "Behavioural safety programmes",
        desc: "Peer-observer programmes reinforce safe behaviours across all trades.",
      },
      {
        title: "Emergency response plans",
        desc: "Site-specific emergency plans, trained first-aiders, and AED units on every project.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Site-Specific Safety Plan",
        desc: "A custom construction safety plan is produced for every project, addressing unique site hazards before mobilisation.",
      },
      {
        step: "02",
        title: "Worker Induction",
        desc: "Every worker — including sub-contractors — completes site-specific induction and emergency procedure training.",
      },
      {
        step: "03",
        title: "Daily Monitoring",
        desc: "Safety officers conduct daily walk-throughs. All observations are logged in our digital safety management system.",
      },
      {
        step: "04",
        title: "Third-Party Audit",
        desc: "Independent auditors visit monthly and review compliance with the safety plan, issuing formal findings.",
      },
      {
        step: "05",
        title: "Close-out Report",
        desc: "A project safety performance report is provided at handover, documenting all metrics and lessons learned.",
      },
    ],
    deliverables: [
      "Construction safety management plan",
      "Site-specific risk assessments (SSRA)",
      "OSHA compliance documentation",
      "Worker induction records",
      "Monthly third-party audit reports",
      "Incident and near-miss log",
      "Emergency response plan",
      "Project close-out safety performance report",
    ],
    gallery: [p1, p2, p3],
  },
  {
    slug: "project-management",
    title: "Project Management",
    icon: TrendingUp,
    tagline: "Cost, schedule, and quality — controlled from day one to final handover.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    overview:
      "Great buildings are not just built — they are managed. Our project management professionals bring Primavera P6 scheduling, earned-value cost control, and integrated risk management to every assignment. Whether you need a full construction management service or an owner's representative to oversee a third-party contractor, our PMP-certified team delivers transparent, data-driven oversight.",
    stats: [
      { value: "100%", label: "PMP-certified PMs" },
      { value: "97%", label: "Budget adherence" },
      { value: "480+", label: "Programmes managed" },
      { value: "P6", label: "Primavera scheduling" },
    ],
    highlights: [
      {
        title: "Primavera P6 scheduling",
        desc: "4D CPM schedules with float analysis updated weekly throughout construction.",
      },
      {
        title: "Earned value analysis",
        desc: "EVM dashboards give live visibility into cost and schedule performance indices.",
      },
      {
        title: "Risk register management",
        desc: "Quantitative risk analysis using Monte Carlo simulation to stress-test budgets and programmes.",
      },
      {
        title: "Change order control",
        desc: "Rigorous change management process — every variation priced and approved before execution.",
      },
      {
        title: "Weekly client reporting",
        desc: "Dashboard reports covering cost, programme, quality, safety, and risk — delivered every Friday.",
      },
      {
        title: "Owner's representative service",
        desc: "Independent oversight of third-party contractors, protecting your interests throughout.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Project Setup",
        desc: "Governance structure, reporting cadence, document management system, and communication protocols established at kick-off.",
      },
      {
        step: "02",
        title: "Planning & Baseline",
        desc: "The baseline programme and budget are developed and signed off by all stakeholders before construction commences.",
      },
      {
        step: "03",
        title: "Progress Monitoring",
        desc: "Weekly site walks, P6 schedule updates, and cost tracking against the approved budget.",
      },
      {
        step: "04",
        title: "Issue & Risk Management",
        desc: "Issues log and risk register are reviewed in a weekly management meeting with the client and key sub-contractors.",
      },
      {
        step: "05",
        title: "Closeout & Lessons Learned",
        desc: "Final account reconciliation, contract close-out, and a project lessons-learned report are produced at completion.",
      },
    ],
    deliverables: [
      "Project execution plan (PEP)",
      "Primavera P6 baseline programme",
      "Cost management plan and budget tracker",
      "Risk register with mitigation actions",
      "Weekly progress and cost reports",
      "Change order log and variation register",
      "Quality management plan",
      "Final account and project close-out report",
    ],
    gallery: [p2, p1, p3],
  },
  {
    slug: "renovation-retrofit",
    title: "Renovation & Retrofit",
    icon: Award,
    tagline:
      "Extend the life of your asset. Seismic upgrades, energy retrofit, and full modernisation.",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&q=80",
    overview:
      "Existing buildings hold tremendous value — our renovation and retrofit division unlocks it. From seismic resilience upgrades in earthquake zones to LEED EB certification retrofits and complete interior refurbishments of occupied buildings, we plan every scope to minimise disruption to tenants and operations while delivering a fully modernised asset.",
    stats: [
      { value: "90+", label: "Retrofit projects" },
      { value: "40%", label: "Avg energy saving" },
      { value: "Occ.", label: "Works in occupied buildings" },
      { value: "LEED", label: "EB certified capability" },
    ],
    highlights: [
      {
        title: "Occupied-building expertise",
        desc: "Phased works with dust and noise management to keep tenants operational throughout.",
      },
      {
        title: "Seismic upgrading",
        desc: "Base isolation, shear-wall additions, and connection upgrades designed by our structural engineers.",
      },
      {
        title: "Energy performance retrofit",
        desc: "Façade replacement, air-tightness upgrades, and HVAC optimisation targeting 40% energy reduction.",
      },
      {
        title: "Heritage-sensitive approach",
        desc: "Conservation-accredited specialists work on listed and historic structures.",
      },
      {
        title: "Fast-track night & weekend works",
        desc: "Noisy or disruptive elements scheduled out of business hours to protect tenants.",
      },
      {
        title: "LEED EB documentation",
        desc: "Full documentation support for Existing Building LEED certification post-retrofit.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Condition Assessment",
        desc: "Detailed structural, MEP, and building envelope surveys to define existing conditions and identify all defects.",
      },
      {
        step: "02",
        title: "Options Appraisal",
        desc: "Two or three retrofit strategies are costed and presented, with NPV and energy payback analysis for each.",
      },
      {
        step: "03",
        title: "Phasing & Tenant Management",
        desc: "A detailed phasing plan is developed and communicated to all tenants before any work begins.",
      },
      {
        step: "04",
        title: "Controlled Execution",
        desc: "Works proceed phase by phase with daily close-outs, dust monitoring, and tenant liaison maintained throughout.",
      },
      {
        step: "05",
        title: "Performance Verification",
        desc: "Post-retrofit energy metering and structural inspections verify that all performance targets have been achieved.",
      },
    ],
    deliverables: [
      "Existing condition survey and assessment report",
      "Options appraisal with cost/benefit analysis",
      "Phasing plan and tenant communication strategy",
      "Structural retrofit design package",
      "Energy performance specification",
      "LEED EB documentation package",
      "Post-retrofit energy monitoring report",
      "10-year maintenance plan",
    ],
    gallery: [p3, p2, p1],
  },
  {
    slug: "structural-steel",
    title: "Structural Steel",
    icon: Hammer,
    tagline: "In-house fabrication, certified erection crews, and precision-welded connections.",
    heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&q=80",
    overview:
      "Steel is the skeleton of every great structure. Our structural steel division controls the full supply chain — from 3D connection modelling and shop drawing approval to in-house fabrication and certified field welding. CWI-certified welding inspectors are permanently assigned to all steel erection packages, guaranteeing structural integrity on every joint.",
    stats: [
      { value: "50K+", label: "Tonnes erected" },
      { value: "CWI", label: "Certified weld inspection" },
      { value: "AWS D1.1", label: "Welding standard" },
      { value: "200T", label: "Max crane capacity" },
    ],
    highlights: [
      {
        title: "In-house connection design",
        desc: "AISC-compliant connection design by our structural engineers for every joint type.",
      },
      {
        title: "CNC fabrication",
        desc: "Precision CNC plasma cutting and drilling for tight tolerances on complex geometries.",
      },
      {
        title: "Certified welding inspectors",
        desc: "CWI-certified inspectors on-site for 100% weld inspection on primary structural members.",
      },
      {
        title: "High-reach crane fleet",
        desc: "Owned crane fleet including crawler cranes up to 200-tonne capacity.",
      },
      {
        title: "Fireproofing coordination",
        desc: "Intumescent and spray-applied fireproofing coordinated and applied in-house.",
      },
      {
        title: "4D erection sequencing",
        desc: "Animated erection sequences used to plan lifts and manage critical path steel erection.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Shop Drawing Production",
        desc: "Detailed shop drawings produced from structural engineer's design and reviewed for approval before fabrication.",
      },
      {
        step: "02",
        title: "Fabrication",
        desc: "Steel members fabricated in our ISO-certified facility with full material traceability.",
      },
      {
        step: "03",
        title: "Transport & Logistics",
        desc: "Oversized loads and just-in-time delivery managed to suit the erection sequence.",
      },
      {
        step: "04",
        title: "Erection",
        desc: "Certified erectors set and plumb the frame; CWI inspectors verify all welds and bolted connections.",
      },
      {
        step: "05",
        title: "Final Survey",
        desc: "As-built survey confirms column grid and level before handover to the follow-on trades.",
      },
    ],
    deliverables: [
      "Approved shop drawing package",
      "Mill certificates and material traceability records",
      "Weld procedure specifications (WPS)",
      "CWI weld inspection reports",
      "Bolt torque inspection records",
      "Fireproofing thickness inspection reports",
      "As-built survey report",
      "Steel erection completion certificate",
    ],
    gallery: [p1, p3, p2],
  },
  {
    slug: "concrete-systems",
    title: "Concrete Systems",
    icon: Layers,
    tagline:
      "Foundations, post-tensioned slabs, and architectural concrete — poured with precision.",
    heroImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
    overview:
      "Concrete is unforgiving — there is no second chance once it's poured. Our concrete division deploys ACI-certified concrete technologists, continuous pour monitoring, and in-situ NDT testing to guarantee mix design compliance and placement quality on every cubic metre. From micro-pile foundations to architectural fair-face concrete walls, we deliver concrete that performs and looks exceptional.",
    stats: [
      { value: "500K+", label: "Cubic metres poured" },
      { value: "ACI", label: "Certified technologists" },
      { value: "0.1mm", label: "Level tolerance on PT slabs" },
      { value: "50MPa", label: "Max design strength" },
    ],
    highlights: [
      {
        title: "ACI-certified technologists",
        desc: "All concrete work overseen by ACI Field Testing Technicians with continuous mix monitoring.",
      },
      {
        title: "Post-tensioned slabs",
        desc: "PT flat-plate and banded-beam systems designed to minimise deflection and slab depth.",
      },
      {
        title: "Self-compacting concrete",
        desc: "SCC mixes used in complex formwork geometries to achieve void-free, finish-quality surfaces.",
      },
      {
        title: "Architectural fair-face",
        desc: "Class F2 and F3 fair-face concrete with custom formwork liners and release agent control.",
      },
      {
        title: "Ground improvement systems",
        desc: "CFA piles, micro-piles, and stone columns for challenging ground conditions.",
      },
      {
        title: "Mass pour management",
        desc: "Thermal control plans and hydration monitoring for all mat foundations and mass pours.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mix Design Approval",
        desc: "Trial mixes are produced and tested to ACI 318 before any concrete is placed on the project.",
      },
      {
        step: "02",
        title: "Formwork Engineering",
        desc: "Propping and formwork designs are engineered and inspected before concrete placement.",
      },
      {
        step: "03",
        title: "Pour Planning",
        desc: "Each pour is sequenced, the concrete delivery schedule confirmed, and all testing equipment readied.",
      },
      {
        step: "04",
        title: "Placement & Curing",
        desc: "Concrete is placed, vibrated, finished, and cured to the approved curing plan — with no shortcuts.",
      },
      {
        step: "05",
        title: "Testing & Certification",
        desc: "Cube test results are reviewed and structural adequacy certified before striking any formwork.",
      },
    ],
    deliverables: [
      "Mix design approval documentation",
      "Formwork and propping design",
      "Pour cards and placement records",
      "Concrete test cube results",
      "Post-tension stressing records",
      "Slab level survey (as-poured)",
      "NDT inspection reports",
      "Concrete structural completion certificate",
    ],
    gallery: [p2, p3, p1],
  },
  {
    slug: "logistics-procurement",
    title: "Logistics & Procurement",
    icon: Truck,
    tagline:
      "Global sourcing, just-in-time delivery, and supply-chain resilience for complex projects.",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    accentImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80",
    overview:
      "Material and equipment procurement is where projects are won or lost. Our supply-chain team manages global vendor qualification, long-lead procurement, customs clearance, and site logistics for the most demanding construction programmes. With established relationships across 30 countries, we secure critical materials at the right price, on schedule, and to specification.",
    stats: [
      { value: "30+", label: "Countries sourced" },
      { value: "500+", label: "Pre-qualified vendors" },
      { value: "99.2%", label: "On-time delivery rate" },
      { value: "$800M+", label: "Materials procured" },
    ],
    highlights: [
      {
        title: "Global vendor network",
        desc: "500+ pre-qualified vendors across 30+ countries for every material category.",
      },
      {
        title: "Long-lead management",
        desc: "Critical path equipment identified at project outset and ordered to protect programme.",
      },
      {
        title: "Just-in-time delivery",
        desc: "Phased deliveries matched to the construction sequence to minimise on-site storage.",
      },
      {
        title: "Customs & import management",
        desc: "In-house customs consultants manage all import permits, duties, and clearance documentation.",
      },
      {
        title: "Quality source inspection",
        desc: "Third-party inspectors at manufacturer's works for critical equipment and bespoke materials.",
      },
      {
        title: "Supply chain risk monitoring",
        desc: "Dual-source strategy for all critical materials to guard against single-supplier disruptions.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Procurement Strategy",
        desc: "A procurement plan maps every material and equipment category, sourcing strategy, and delivery schedule.",
      },
      {
        step: "02",
        title: "Vendor Qualification",
        desc: "Vendors are assessed for financial stability, QA systems, and capacity before being invited to tender.",
      },
      {
        step: "03",
        title: "Tender & Award",
        desc: "Competitive tenders are issued, commercial evaluations completed, and purchase orders placed with approved vendors.",
      },
      {
        step: "04",
        title: "Expediting & Inspection",
        desc: "An expediting programme monitors all orders; source inspections are conducted at the factory for critical items.",
      },
      {
        step: "05",
        title: "Delivery & Site Receipt",
        desc: "All deliveries are tracked in real-time; goods are inspected on arrival and documented before acceptance.",
      },
    ],
    deliverables: [
      "Procurement plan and schedule",
      "Approved vendor list",
      "Purchase orders and contract documentation",
      "Expediting and status reports",
      "Source inspection reports",
      "Customs clearance documentation",
      "Goods receipt and inspection records",
      "Final procurement close-out report",
    ],
    gallery: [p3, p1, p2],
  },
];

const SLUG_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

/* ─── Related services helper ────────────────────── */
function getRelated(current: ServiceMeta): ServiceMeta[] {
  return SERVICES.filter((s) => s.slug !== current.slug).slice(0, 3);
}

/* ─── Page component ─────────────────────────────── */
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SLUG_MAP[slug] : null;

  if (!service) return <Navigate to="/services" replace />;

  const related = getRelated(service);
  const Icon = service.icon;

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/70 to-primary/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-10 pb-16 pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-5">
                <Icon className="h-3.5 w-3.5" />
                {service.title}
              </div>
              <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight md:leading-[0.95] text-balance">
                {service.tagline}
              </h1>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8 shadow-glow"
            >
              <Link to="/contact">
                Get a quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                Overview
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-balance mb-6">
                What we deliver
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                {service.overview}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-7"
                >
                  <Link to="/contact">
                    Start a project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-7 font-semibold">
                  <Link to="/about">About SteelCore</Link>
                </Button>
              </div>
            </div>

            {/* Image card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-elegant">
                <img
                  src={service.accentImage}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl p-5 shadow-card flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm">25+ Years</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Industry experience</div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-accent rounded-2xl p-5 shadow-lg flex items-center gap-3">
                <Star className="h-5 w-5 text-accent-foreground fill-accent-foreground" />
                <div>
                  <div className="font-display font-bold text-sm text-accent-foreground">
                    ISO 9001
                  </div>
                  <div className="text-xs text-accent-foreground/80 mt-0.5">Certified quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────── */}
      <section className="py-24 md:py-32 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Why SteelCore
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-balance">
              What sets our {service.title.toLowerCase()} apart
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.highlights.map((h, i) => (
              <div
                key={h.title}
                className="bg-card border border-border rounded-2xl p-7 hover:border-accent/40 hover:shadow-card transition-all duration-300 group"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-5 font-display font-bold text-sm transition-colors"
                  style={{
                    background: "oklch(0.78 0.17 65 / 0.12)",
                    color: "oklch(0.65 0.14 65)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                  {h.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────── */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden relative">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.95 0 0 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0 / 1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.17 65), transparent 70%)" }}
        />

        <div className="container mx-auto px-6 lg:px-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              How We Work
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-balance">
              Our delivery process
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-white/10 z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {service.process.map((p, i) => (
                <div key={p.step} className="flex flex-col">
                  {/* Step number circle */}
                  <div className="flex lg:flex-col items-center gap-4 lg:gap-0 mb-4 lg:mb-6">
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center font-display font-bold text-lg border-2 shrink-0"
                      style={{
                        background: i === 0 ? "oklch(0.78 0.17 65)" : "oklch(0.25 0.04 260)",
                        borderColor: i === 0 ? "oklch(0.78 0.17 65)" : "oklch(0.35 0.04 260)",
                        color: i === 0 ? "oklch(0.2 0.04 260)" : "oklch(0.78 0.17 65)",
                      }}
                    >
                      {p.step}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2 lg:text-center">
                    {p.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed lg:text-center">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                Deliverables
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-balance mb-4">
                What you receive
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every {service.title.toLowerCase()} engagement includes a comprehensive set of
                documentation, certifications, and reports — so you always have everything you need.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────── */}
      {service.gallery.length > 0 && (
        <section className="py-24 bg-muted/40">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                Portfolio
              </div>
              <h2 className="font-display font-bold text-4xl text-balance">Recent work</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {service.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related services ─────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
                Explore More
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl">Related services</h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/services">
                All services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => {
              const RelIcon = r.icon;
              return (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={r.heroImage}
                      alt={r.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                      <RelIcon className="h-5 w-5 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg mb-1.5 group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {r.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20"
            style={{
              background: "linear-gradient(145deg, oklch(0.14 0.04 260), oklch(0.20 0.04 265))",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
              style={{
                background: "radial-gradient(circle, oklch(0.78 0.17 65), transparent 70%)",
              }}
            />
            <div className="relative max-w-2xl">
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                Get Started
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 text-balance">
                Ready to begin your{" "}
                <span style={{ color: "oklch(0.78 0.17 65)" }}>{service.title.toLowerCase()}</span>{" "}
                project?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Tell us about your scope and timeline. Our team responds within one business day
                with a preliminary assessment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8 shadow-glow"
                >
                  <Link to="/contact">
                    Request a quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 font-semibold border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white"
                >
                  <a href="tel:+15550000000">
                    <Phone className="mr-2 h-4 w-4" /> Call us directly
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
