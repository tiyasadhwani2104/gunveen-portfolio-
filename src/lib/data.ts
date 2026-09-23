// ─────────────────────────────────────────────────────────────
// SITE CONTENT — all copy lives here.
// Case studies use a flexible block system (see CaseStudyBlock)
// so each project keeps its own structure instead of being
// forced into one rigid template.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Gunveen",
  fullName: "Gunveen Kaur Bedi",
  role: "Strategic Designer",
  discipline: "Research × Strategy × Business",
  tagline: "I turn complex problems into clear opportunities.",
  subTagline:
    "Through consumer insight, strategic thinking, and design. Exploring strategy, consulting, business design, brand strategy & innovation.",
  /** Long-form intro used on the home page. */
  intro: {
    headline: "I'm a Strategic Designer who connects people, business, and ideas.",
    paragraphs: [
      "I use research, strategy, and design to unpack complex problems, uncover meaningful insights, and turn them into actionable opportunities.",
      "My work spans consumer insights, business strategy, brand strategy, business design, and innovation, with a particular interest in understanding what people need and translating that into solutions that make sense for both people and businesses.",
      "Currently pursuing a B.Des in Strategic Design Management, with a minor in Digital Ecosystem, I'm looking to build my career in strategy, consulting, business design, and brand/innovation environments.",
    ],
    closing: "I ask questions, connect the dots, and turn complexity into clarity.",
  },
  location: "Mumbai, India",
  email: "gunveenkaurbedi24@gmail.com",
  phone: "+91 82606 65017",
  resumeUrl: "/resume.pdf",
  availability: "Open to internships & graduate roles",
  availabilityDetail:
    "Exploring strategy, consulting, business design, brand strategy and innovation roles. Open to internships and graduate opportunities.",
  school: {
    degree: "B.Des",
    program: "Strategic Design Management",
    minor: "Digital Ecosystem",
    institution: "ISDI, ATLAS SkillTech University",
    graduation: "2027",
  },
  social: {
    linkedin: "https://linkedin.com/in/gunveenkaurbedi",
  },
} as const;

// ── CASE STUDIES ─────────────────────────────────────────────

/** One unit of case-study content. Add a kind here, render it in CaseStudyView. */
export type CaseStudyBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "callout"; heading?: string; body: string }
  | { kind: "quote"; text: string; attribution?: string }
  | {
      kind: "stats";
      heading?: string;
      items: { value: string; label: string; source?: string }[];
    }
  | {
      kind: "steps";
      heading?: string;
      intro?: string;
      numbered?: boolean;
      items: { title: string; body: string }[];
    }
  | { kind: "list"; heading?: string; intro?: string; items: string[] }
  | {
      kind: "table";
      heading?: string;
      intro?: string;
      columns: [string, string];
      rows: [string, string][];
    }
  | {
      /** An original bar-chart graphic, built in the site's own style —
       * used instead of reproducing a third party's published infographic. */
      kind: "chart";
      heading?: string;
      intro?: string;
      items: { label: string; display: string; percent: number; source?: string }[];
    }
  | {
      kind: "image";
      label: string;
      caption?: string;
      accent?: string;
      wide?: boolean;
      /** Real image path; falls back to a labelled placeholder when absent. */
      src?: string;
      /** `contain` for diagrams and slides, `cover` for photographs. */
      fit?: "cover" | "contain";
    };

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  /** Tailwind gradient classes for the placeholder cover. */
  coverAccent: string;
  /** Real cover image; falls back to the gradient when absent. */
  coverSrc?: string;
  /** One-paragraph summary, used on listings and for page metadata. */
  summary: string;
  /** Overview rows — Role / Team / Duration / Methods / Outcome etc. */
  meta: { label: string; value: string }[];
  tags: string[];
  capabilities: string[];
  blocks: CaseStudyBlock[];
};

export const caseStudies: CaseStudy[] = [
  // ── 01 ─────────────────────────────────────────────────────
  {
    slug: "trust-digital-healthcare",
    title: "Trust, not access, holds back digital healthcare in India",
    subtitle:
      "Why people take an online medicine order to a pharmacist before they'll use it",
    category: "Service Design · Research",
    year: "2025",
    coverAccent: "from-[#FFF8CA] via-[#F3E2A0] to-[#CDE3E8]",
    coverSrc: "/images/healthcare-01-cover.webp",
    summary:
      "A six-month solo research project into why Indians hesitate to trust digital healthcare. Triangulating ~60 sources, a 30-response survey, four in-depth interviews and a self-ethnography, it found the barrier isn't access: it's verification.",
    meta: [
      { label: "Role", value: "Solo research project" },
      { label: "Discipline", value: "Service Design" },
      { label: "Duration", value: "6 months" },
      {
        label: "Evidence",
        value: "~60 sources · 30-response survey · 4 in-depth interviews · self-ethnography",
      },
    ],
    tags: ["Research", "Systems thinking", "Policy"],
    capabilities: [
      "Problem framing",
      "Primary and secondary research",
      "Triangulation",
      "Systems and policy thinking",
      "Framework building",
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Headline",
        body: [
          "People aren't avoiding digital healthcare because they lack devices. They avoid it because they can't tell who is behind the advice, so they take their online order to a pharmacist to check it. That step cancels out the convenience the platform promises, and policy alone can't fix it.",
        ],
      },
      {
        kind: "callout",
        heading: "The question",
        body: "How might we bridge the trust gap in digital healthcare by aligning policy, transparency and human assurance?",
      },
      {
        kind: "stats",
        heading: "The numbers",
        items: [
          {
            value: "20–25%",
            label: "a year: forecast growth of India's digital health market. Growth isn't the same as trust.",
            source: "IMARC; Grand View Research",
          },
          {
            value: "Over 50%",
            label:
              "of US primary care physicians say EHRs detract from their professional satisfaction. Even clinicians distrust the systems.",
            source: "Stanford Medicine × Harris Poll, 2018",
          },
          {
            value: "78%",
            label:
              "initial Digital Health ID uptake in a localized study, tied to confidence in the government's data security, so it's fragile.",
            source: "Field study cited in the paper",
          },
        ],
      },
      {
        kind: "prose",
        heading: "How I built the evidence",
        body: [
          "I triangulated across about 60 sources: news, peer-reviewed research, policy documents, market reports, social discussion and YouTube. A 30-response survey tested patterns, four in-depth interviews (a doctor, a medical student and two pharmacists) explained them, and a self-ethnography of my own app use added a first-hand view. Where sources agreed I treated the finding as strong, and I flagged where they didn't.",
        ],
      },
      {
        kind: "chart",
        heading: "What the data actually shows",
        intro: "The same three figures from above, sized against each other.",
        items: [
          { label: "Digital health market growth", display: "20–25%/yr", percent: 23, source: "IMARC; Grand View Research" },
          { label: "US physicians unsatisfied with EHRs", display: "50%+", percent: 52, source: "Stanford Medicine × Harris Poll, 2018" },
          { label: "Digital Health ID initial uptake", display: "78%", percent: 78, source: "Field study cited in the paper" },
        ],
      },
      {
        kind: "steps",
        heading: "Three turning points",
        numbered: true,
        items: [
          {
            title: "The pharmacist is the real verification layer",
            body: 'Customers ask, "Is this safe? Is this the right medicine?" before taking online orders.',
          },
          {
            title: "Endorsements read as advertising",
            body: 'Prominent doctor placements were seen as "sponsored", reviews as manipulable, and platforms don\'t explain how doctors are verified.',
          },
          {
            title: "The problem sits in two places",
            body: "Institutions fail (hospitals suspending the Ayushman Bharat scheme over unpaid dues), and individual capability fails (low eHealth literacy).",
          },
        ],
      },
      {
        kind: "image",
        label: "Zoom on the News cluster",
        caption: "Where policy intent and market behaviour diverge.",
      },
      {
        kind: "prose",
        heading: "The framework: the Socio-Technical Trust Nexus",
        body: [
          "Trust breaks at the social component (literacy, anxiety, ease of use) and at the institutional and market component (unverified endorsements, weak enforcement). Both push people back to offline checks.",
        ],
      },
      {
        kind: "list",
        heading: "Recommendations",
        items: [
          "Publicly enforce the data-protection law (DPDP Act).",
          "Deliver digital literacy through Primary Health Centres.",
          "Publish provider performance indicators in real time.",
        ],
      },
      {
        kind: "prose",
        heading: "Limits and next step",
        body: [
          "The primary sample is small, so it tests and explains patterns from the wider evidence and doesn't claim statistics. Next: extend to rural and elderly users, the most excluded group, and prototype a “verified clinician” layer.",
        ],
      },
    ],
  },

  // ── 02 ─────────────────────────────────────────────────────
  {
    slug: "refuge",
    title: "REFUGE",
    subtitle: "Teams don't explode. They build pressure, quietly, until they do.",
    category: "Framework · Workshop · Game Design",
    year: "2025",
    coverAccent: "from-[#F5EAB6] via-[#DCE9C4] to-[#CDE3E8]",
    coverSrc: "/images/refuge-01-hero.webp",
    summary:
      "A six-month project that turned an invisible team problem, pressure building quietly until it ruptures, into a diagnosable framework (PAT), a tested workshop, and a semi-cooperative strategy game that makes managers feel what a framework could only describe.",
    meta: [
      {
        label: "Role",
        value:
          "Team manager. I kept the work flowing and every deadline met, and co-facilitated the framework workshop.",
      },
      { label: "Team", value: "Four designers" },
      { label: "Duration", value: "6 months" },
      {
        label: "Methods",
        value:
          "Framework design, workshop and toolkit design, facilitation, game design, playtesting",
      },
      {
        label: "Outcome",
        value:
          "A tested framework (PAT), a facilitated workshop with five managers, and a complete game prototype",
      },
    ],
    tags: ["Framework building", "Facilitation", "Game design"],
    capabilities: [
      "Framework building",
      "Validation with real users",
      "Iteration",
      "Facilitation",
      "Systems thinking",
      "Game design",
      "Project leadership",
    ],
    blocks: [
      {
        kind: "prose",
        heading: "The problem",
        body: [
          "Pressure inside a team rarely announces itself. It builds in unclear decisions, gaps in process and unspoken overload, then shows up as a crisis. Leaders panic, panic-fix or ignore it, and communication and outcomes suffer.",
        ],
      },
      {
        kind: "callout",
        body: "The friction comes from misalignment, not from the event itself.",
      },
      {
        kind: "steps",
        heading: "Process",
        numbered: true,
        items: [
          {
            title: "Version 1: a volcano",
            body: "Our first framework used a volcano, because people in organisations don't explode at random. They build pressure long before the visible eruption. It worked in five moves: measure the pressure, identify the friction, map the fault lines, release the heat on purpose, prevent the eruption.",
          },
          {
            title: "Version 2: a triangle",
            body: 'The volcano told teams what to do. It didn\'t tell them where to look first. Before our workshop, people told us they wanted "a common starting point for thinking, not just more processes." So we built a structure. Outside pressure passes through three things at once: company direction, team performance and individual states. Four questions guide a team through them, and the fourth checks how team and individual influence each other.',
          },
          {
            title: "Testing it with five managers",
            body: "We ran a 48-minute online workshop with five managers who differed in age, industry and ways of thinking. Everyone received the same case: Meridian, an independent design agency where a large international competitor arrives just as a major client asks it to start within three weeks with a stretched team. Each person first solved the case alone, then used the framework, then we compared.",
          },
          {
            title: "The turning point",
            body: "The framework changed how people thought, but they told us what they needed next: more time, realistic scenarios and something hands-on. A form on a screen couldn't make anyone feel pressure. So we built an experience: a game.",
          },
          {
            title: "Building and testing the game",
            body: "We built REFUGE, a semi-cooperative strategy game for 4 to 8 players. Managers played it, and their feedback shaped every version.",
          },
        ],
      },
      { src: "/images/refuge-02-pat-triangle.webp", fit: "contain",
        kind: "image",
        label: "PAT: the Pressure Alignment Triangle",
        caption: "Outside pressure passes through three things at once. Misalignment between them is where friction starts.",
        wide: true,
      },
      {
        kind: "callout",
        heading: "Before and after the framework",
        body: "Before the framework, people jumped straight to interventions. Finding where to start was harder than finding a solution. After it, the conversation moved from stating a solution to explaining why, and people began treating their decision as part of a larger system.",
      },
      {
        kind: "steps",
        heading: "The work",
        numbered: true,
        items: [
          {
            title: "The PAT framework",
            body: "A team-level diagnosis: three forces, four questions and a ritual to surface pressure, contain a rupture and turn the aftermath into a stronger way of working.",
          },
          {
            title: "The workshop and toolkit",
            body: "A facilitated 48-minute session with an icebreaker, the Meridian case, a solo attempt before and after the framework, a discussion and a feedback form.",
          },
          {
            title: "The REFUGE game",
            body: "Each player runs a nation with its own goal, but nobody makes everything they need, so they negotiate against a 4-minute timer. Every choice moves one shared refugee track, and at 20 everyone loses.",
          },
        ],
      },
      {
        kind: "callout",
        body: "You can win your own goal and still lose the game.",
      },
      {
        kind: "table",
        heading: "The game maps to the framework",
        columns: ["In the game", "In the framework"],
        rows: [
          ["Event cards", "External pressure entering"],
          ["Each player's personal goal", "Individual states"],
          ["The shared refugee track", "Team performance, and the pressure gauge"],
          ["The negotiation window", "Cross-verifying team and individual"],
          ["The track reaching 20", "The eruption"],
        ],
      },
      {
        kind: "prose",
        heading: "The prototype",
        body: [
          "A foldable magnetic board, four card types (nation, trait, event, crisis) and a rulebook with worked examples.",
        ],
      },
      { src: "/images/refuge-09-components.webp", fit: "contain",
        kind: "image",
        label: "Game components: board, nation cards, event cards, rulebook",
        wide: true,
      },
      {
        kind: "stats",
        heading: "Impact from the workshop (n = 5)",
        items: [
          { value: "4.2 / 5", label: "overall rating, and 4 of 5 rated it 4 or 5" },
          { value: "4 of 5", label: "said the activities helped them think differently" },
          {
            value: "4.4 / 5",
            label: "confidence responding to unexpected challenges afterwards",
          },
        ],
      },
      {
        kind: "quote",
        text: 'Participants moved from "How do we solve this?" to "What are we actually solving?"',
      },
      {
        kind: "prose",
        heading: "What worked, and what didn't",
        body: [
          "What the framework did well: it turned a vague situation into something that could be diagnosed, made second-order consequences visible before the decision was final, and gave people a structure in which an initial answer could be challenged and refined.",
          "What it didn't do (yet): it can feel unnecessary for small teams, the case needed more context, and a digital toolkit was less engaging than a hands-on one would have been. We logged four improvements: separate trigger from effect, prioritise capabilities, connect each capability to a person and a reason, and add a second-order consequence check.",
          "From the game: two rounds of testing with managers took the prototype from unbalanced and over-complicated to a complete, playable version with simplified rules, clearer visuals and smoother pacing. It hasn't been used in a live team session yet, so I claim a working prototype and validated learning, not proven behaviour change.",
        ],
      },
      {
        kind: "prose",
        heading: "Reflection",
        body: [
          "A successful workshop isn't one where people complete an activity. It's one where their thinking visibly shifts. Testing the framework first showed us what it still lacked, and that shaped the game. Simplifying the game, cutting mechanics when the maths didn't hold, made the idea clearer, not weaker.",
          "If I did it again, I'd test with a richer, more realistic case, add a physical toolkit, and run the game with a real team to see whether players carry it back to work.",
        ],
      },
    ],
  },

  // ── 03 ─────────────────────────────────────────────────────
  {
    slug: "rejewel",
    title: "ReJewel",
    subtitle:
      "Don't toss it, ReJewel it: a refillable touch-up pen that gives tarnished artificial jewellery a second life.",
    category: "Product · Business Design",
    year: "2024",
    coverAccent: "from-[#CDE3E8] via-[#E9D9CE] to-[#F0C9C7]",
    coverSrc: "/images/rejewel-01-hero.webp",
    summary:
      "A three-month, user-led product venture: 8 interviews became 9 insights, 208 ideas and 3 concepts, 25 people voted for the pen, and 16 tested the prototype. The result is a costed business model where the refill, not the pen, is the business.",
    meta: [
      {
        label: "Role",
        value:
          "Co-founder with Layanaya Girdhar. I ran 10 of the 16 user-testing sessions and worked across research, concept and costing.",
      },
      { label: "Duration", value: "About 3 months, September to November 2024" },
      {
        label: "Approach",
        value:
          "User-led at every stage: interviews to define the problem, a vote to choose the concept, testing to refine the product",
      },
      {
        label: "Methods",
        value:
          "Observation, in-depth interviews, empathy and affinity mapping, insight statements, brainstorming and SCAMPER, prototyping, user testing, costing",
      },
      {
        label: "Outcome",
        value: "A working prototype tested with 16 people, a costed business model and a final concept",
      },
    ],
    tags: ["Consumer research", "Prototyping", "Business modelling"],
    capabilities: [
      "Consumer research",
      "Insight generation",
      "Ideation",
      "Prototyping",
      "User testing",
      "Business modelling",
    ],
    blocks: [
      {
        kind: "prose",
        heading: "The problem",
        body: [
          "Artificial jewellery fades quickly, and people throw away pieces they love because nothing lets them restore the colour.",
        ],
      },
      {
        kind: "quote",
        text: "As soon as it loses colour, I have to get rid of it, and it feels like such a waste.",
      },
      {
        kind: "steps",
        heading: "Process",
        numbered: true,
        items: [
          {
            title: "Observe and listen",
            body: 'We walked both campuses and noticed how much artificial jewellery people wear. We recruited people who own at least 10 pieces and interviewed 8 of them, asking questions like "Do you get self-conscious wearing tarnished pieces?" Each interview became an empathy map, and the maps became affinity clusters.',
          },
          {
            title: "Turn it into needs",
            body: 'Nine insight statements came out of the clusters, such as "owners need a way to recolour at home because they want their pieces to last" and "they need it because the pieces hold sentimental value."',
          },
          {
            title: "Generate options",
            body: "Brainstorming and SCAMPER sessions on each need produced 208 ideas, 184 of them unique.",
          },
          {
            title: "Choose with people",
            body: "Three concepts made the shortlist: a colouring kit, a maintenance kit and a touch-up pen. 25 people voted, and the pen got the most votes, so that's the one we built.",
          },
          {
            title: "Build, then test",
            body: "We built the first prototype on 17 November and tested it with 16 people (13 women, 3 men) between 15 and 20 November. Each tried the pen, then answered four questions: would you use it, what do you like, what would you change, and how much would you pay? So we interviewed users before building anything, to understand the problem, and again after they used the prototype, to see whether it solved it.",
          },
        ],
      },
      { src: "/images/rejewel-02-funnel.webp", fit: "contain",
        kind: "image",
        label: "Funnel: 8 interviews → 9 insights → 208 ideas → 3 concepts → 25 votes → 16 testers",
        caption: "Users shaped the concept at every stage.",
        wide: true,
      },
      {
        kind: "prose",
        heading: "The product",
        body: [
          "A touch-up pen with a twist-to-dispense system for control over how much colour is released, a soft fine-tip brush for intricate designs, chrome liquid, and a refillable cartridge to reduce waste.",
        ],
      },
      {
        kind: "list",
        heading: "What testers told us",
        intro: "Counts are how many of the 16 raised each point.",
        items: [
          "5 of 16 liked the compact, portable size, and 2 liked the twist mechanism.",
          "3 found the cap confusing, and one suggested a clear cap.",
          "3 wanted interchangeable brush tips or sizes.",
          "2 wanted to see how much liquid was left.",
          "One raised concern about controlling the flow, and one asked for multiple colours in one pen.",
        ],
      },
      { src: "/images/rejewel-04-feedback.webp", fit: "contain",
        kind: "image",
        label: '"What we heard, what we changed" panel',
        caption: "Testing turned impressions into specific design decisions.",
      },
      {
        kind: "prose",
        heading: "The business model",
        body: [
          "Sell the pen once, then bring customers back through refillable cartridges. Production cost is ₹72 against a retail price of ₹500 to ₹700, set from what users said they'd pay. That's a gross margin of about 86 to 90% per pen, before packaging, marketing and distribution. Channels: direct-to-consumer e-commerce, jewellery-store partnerships and platforms like Nykaa and Tira.",
        ],
      },
      { src: "/images/rejewel-05-cost.webp", fit: "contain",
        kind: "image",
        label: "Where the ₹72 goes: cost breakdown and the pen-plus-refill model",
        wide: true,
      },
      {
        kind: "list",
        heading: "Impact",
        items: [
          "It works: the before-and-after ring on the concept sheet shows a worn piece restored. It's one piece, so I present it as a demonstration, not a statistical result.",
          "People wanted it: 25 people voted for the pen over two other concepts, and 16 tested it. Feedback was mostly positive and specific, and one tester said she'd pay a premium.",
          "The market is there: the global artificial jewellery market was about $18.77 billion in 2022, projected to reach $30.7 billion by 2032 (5.04% CAGR).",
        ],
      },
      {
        kind: "prose",
        heading: "Reflection",
        body: [
          "Letting users choose the concept and then test the prototype meant the product was shaped by the people it was for. Testing turned “people like the idea” into specific design decisions: the cap, the brush and being able to see how much liquid is left. It also showed me that the refill, not the pen, is the business. A one-off gadget becomes a recurring model only when customers have a reason to come back.",
          "If I did it again, I'd test beyond design students, since most of our interviewees and testers were 17 to 21. I'd also run longer sessions than the one-to-two-minute tests we did, and measure willingness to pay with real numbers instead of impressions.",
        ],
      },
    ],
  },

  // ── 04 ─────────────────────────────────────────────────────
  {
    slug: "hiring-for-fit",
    title: "Hiring for fit",
    subtitle: "A scenario-based assessment that makes a founder's expectations visible",
    category: "Business Design · Live Client",
    year: "2025",
    coverAccent: "from-[#CDE3E8] via-[#E4EFF0] to-[#FFF8CA]",
    coverSrc: "/images/hiring-05-dashboard.webp",
    summary:
      "A six-month live business design project for a Mumbai event company. The founder had clear expectations of ownership, speed and client-first, but nobody had turned them into something a hiring process could test. I designed a scenario-based assessment that shows how candidates think and decide before they're hired.",
    meta: [
      { label: "Context", value: "Business Design Blueprint, live client project" },
      { label: "Client", value: "A Mumbai event company (name withheld)" },
      { label: "Duration", value: "Six months" },
      { label: "Role", value: "Owned the hiring problem within a wider team project, research to prototype" },
      {
        label: "Outcome",
        value: "Prototyped, and reviewed with the company's hiring lead, who responded positively",
      },
    ],
    tags: ["Business design", "Ideation", "Prototyping"],
    capabilities: [
      "Problem reframing",
      "Stakeholder research",
      "Structured ideation",
      "Concept selection",
      "Platform design",
    ],
    blocks: [
      {
        kind: "callout",
        body: "I started with the wrong problem, and the project got better when I let it go.",
      },
      {
        kind: "steps",
        heading: "Process",
        numbered: true,
        items: [
          {
            title: "Starting assumption",
            body: "We assumed new hires struggled with tasks.",
          },
          {
            title: "What the company told us",
            body: "Talking to the company showed the founder had a clear set of expectations (ownership, speed and client-first) that hires weren't consistently meeting. Nobody had turned them into something a hiring process could test or a new joiner could learn.",
          },
          {
            title: "Two insights",
            body: "New employees struggle to understand how the company works because the ethos isn't translated into everyday actions. That early confusion makes them depend on seniors, which slows decisions and reduces team efficiency.",
          },
          {
            title: "Two problem statements",
            body: "How might we communicate the ethos clearly, so people understand what the company stands for and how they're expected to work? And how might we give clearer guidance from day one, instead of relying on learning through experience?",
          },
          {
            title: "Ideation",
            body: "Brainstorming, analogous thinking, reverse thinking and Crazy 8s across both problems produced 380 ideas, 293 unique.",
          },
          {
            title: "Funnelling",
            body: "How-Now-Wow for innovation against feasibility. Category clustering into physical touchpoints, digital and scalable, system and process, and emotional experience. Then an impact-versus-effort matrix to separate quick wins from big bets.",
          },
          {
            title: "The choice",
            body: "A digital, scalable, high-impact concept: assess fit through scenarios.",
          },
        ],
      },
      { src: "/images/hiring-02-reframe.webp", fit: "contain",
        kind: "image",
        label: "The real problem wasn't tasks: reframe panel",
        caption: "Ownership, speed and client-first lived in one person's head.",
        wide: true,
      },
      {
        kind: "prose",
        heading: "The candidate journey",
        body: [
          "Choose a role (Creative, Operations, Client Servicing or Finance) → read the role description → answer quick “what would you do?” scenario questions → complete an open-ended written task.",
        ],
      },
      {
        kind: "prose",
        heading: "The recruiter journey",
        body: [
          "One dashboard with all applicants and application counts → compare two candidates side by side with visualised results → an AI-generated report per candidate → a stored record, so someone who reapplies a year later can be verified against earlier data.",
        ],
      },
      {
        kind: "image",
        src: "/images/hiring-05-dashboard.webp",
        fit: "contain",
        label: "The candidate decision-support dashboard, built in Figma",
        caption: "Pipeline by stage, role-fit scores, and a top-3 comparison view.",
        wide: true,
      },
      {
        kind: "steps",
        heading: "Design logic",
        items: [
          {
            title: "Expectations became questions",
            body: "Each scenario tests ownership, speed or client-first behaviour.",
          },
          {
            title: "Fit works both ways",
            body: "Candidates feel the ethos before joining and can self-select out.",
          },
          {
            title: "Fast plus deep",
            body: "Quick multiple-choice for ease, one open task for reasoning.",
          },
          {
            title: "A design system behind it",
            body: "So the client can extend the platform.",
          },
        ],
      },
      { src: "/images/hiring-04-flows.webp", fit: "contain",
        kind: "image",
        label: "How the assessment works: candidate and recruiter flows",
        wide: true,
      },
      {
        kind: "list",
        heading: "Impact",
        intro: "Validated with the hiring lead; designed to change how the company hires.",
        items: [
          "The company's hiring lead reviewed the prototype and liked the approach.",
          "Designed to help: screen for the founder's expectations, compare candidates on the same scenarios, and stop repeating screening for reapplicants.",
          "Not yet measured: hiring quality or time saved, because the platform wasn't put through a live hiring cycle.",
        ],
      },
      {
        kind: "prose",
        heading: "Reflection",
        body: [
          "The brief said hiring. My first guess said tasks. The real problem was that the founder's expectations had never been made explicit.",
          "I learned to treat ideation as a funnel. 380 ideas was the easy part; choosing was the work.",
        ],
      },
    ],
  },
];

// ── TESTIMONIALS ─────────────────────────────────────────────

export type Testimonial = {
  id: string;
  org: string;
  quotes: string[];
  author: string;
  /** The role being referenced, rendered as a "replying to" line. */
  replyingTo: string;
  period: string;
  /** Label for the proof document, once the image/PDF exists. */
  proofLabel: string;
  proofUrl?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "maha-csr",
    org: "Maha CSR Summit 2025",
    quotes: [
      "Exceptional leadership, strategic thinking, and ownership in managing four critical verticals.",
      "Her contribution has been instrumental in the smooth planning and execution of one of the state's most impactful CSR-driven initiatives.",
    ],
    author: "Chairperson, Maha CSR Summit 2025",
    replyingTo: "Team Lead (Intern)",
    period: "Jan – Mar 2025",
    proofLabel: "Read the letter",
  },
  {
    id: "m81",
    org: "M81",
    quotes: [
      "Approached her work with dedication and professionalism, was reliable in her responsibilities, and brought a positive attitude to the team throughout her tenure.",
    ],
    author: "Co-Founder, M81",
    replyingTo: "Social Media (LinkedIn) Intern",
    period: "Mar – Jun 2026",
    proofLabel: "Read the certificate",
  },
  {
    id: "mahindra",
    org: "Mahindra",
    quotes: [
      "A great amount of responsibility, sincerity, and a genuine willingness to learn, and zeal to take on new assignments & challenges.",
    ],
    author: "HR Manager, G N Autonation LLP (Mahindra)",
    replyingTo: "Marketing Intern",
    period: "May – Jul 2024",
    proofLabel: "Read the certificate",
  },
  {
    id: "adbhoot",
    org: "Adbhoot Creatives",
    quotes: [
      "She has always maintained a professional and courteous attitude and appearance while working with our company, and we look forward to watch her grow and achieve greater heights.",
    ],
    author: "Designated Partner, Qissagoi Entertainment (Adbhoot Creatives)",
    replyingTo: "Brand Strategy Intern",
    period: "Aug – Nov 2025",
    proofLabel: "Read the letter",
  },
];

export const certifications = [
  {
    id: "harvard-ads",
    issuer: "Harvard",
    title: "How to Set Up a Facebook Ad Campaign",
    description: "A course on planning and setting up Facebook advertising campaigns.",
    date: "",
  },
  {
    id: "lvmh",
    issuer: "LVMH",
    title: "Branding, Operations and Supply Chain",
    description:
      "An introduction to the LVMH ecosystem and the fundamentals of the luxury industry, covering how a luxury group approaches branding, operations and supply chain.",
    date: "Issued 12 December 2025",
  },
] as const;

// ── BEYOND THE BRIEF ─────────────────────────────────────────

export const beyondTheBrief = {
  title: "Beyond the brief",
  subtitle: "Who I am besides academics and work.",
  intro: "Strategy is what I do. This is what I do when nobody's asking for a deliverable.",
  items: [
    {
      id: "modelling",
      title: "Modelling",
      body: "I've modelled for a college fashion show, and I enjoy the runway and the camera. It taught me how much a look depends on confidence, teamwork and timing.",
      photoLabel: "Fashion show / shoots",
      photoCount: 3,
      photoSrcs: [
        "/images/modelling-01.webp",
        "/images/modelling-02.webp",
        "/images/modelling-03.webp",
      ],
    },
    {
      id: "mun",
      title: "Debating and MUN",
      body: "I've done Model UN since 2019, and it's where I learned to think in structure and speak under pressure. I've chaired several conferences, served as Deputy Secretary General of VISMUN, taken part in Harvard MUN, and led MUNzil, our college's large-scale MUN, as Secretary General. I've also chaired an economics table at Atlas Inc. and placed second at a state-level debate competition.",
      photoLabel: "Chairing / MUNzil",
      photoCount: 1,
      photoSrcs: ["/images/mun-munzil.webp"],
    },
    {
      id: "cooking",
      title: "Cooking and food",
      body: "I love cooking food from different cuisines and exploring new places to eat. It's how I learn how other people eat, celebrate and live.",
      photoLabel: "A dish I made / a favourite spot",
      photoCount: 2,
      photoSrcs: ["/images/food-01.webp", "/images/food-02.webp"],
    },
    {
      id: "reading",
      title: "Reading and writing",
      body: "I read and write to think things through before they become projects. My shelf leans towards people, leadership and how minds work.",
      photoLabel: "The shelf",
      photoCount: 1,
    },
  ],
  munFacts: [
    "MUN since 2019",
    "Chair, UNODC at MUNzil 2024",
    "Secretary General, MUNzil",
    "Deputy Secretary General, VISMUN",
    "Harvard MUN",
    "2nd place, state-level debate",
  ],
  shelf: {
    reading: ["Start with Why", "Leaders Eat Last", "Never Split the Difference"],
    readingNow: "The Placebo Effect",
  },
} as const;

// ── SHARED VISUAL TILES ──────────────────────────────────────

/**
 * Tiles used by the interactive surfaces (cursor image trail, collage,
 * hover columns). Gradients until real imagery exists; add `src` to swap in.
 */
export type GalleryItem = {
  id: string;
  label: string;
  accent: string;
  hex: [string, string];
  src?: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", label: "Discovery research", accent: "from-[#FFF8CA] via-[#F3E2A0] to-[#CDE3E8]", hex: ["#FFF8CA", "#CDE3E8"] },
  { id: "g2", label: "Service blueprint", accent: "from-[#CDE3E8] via-[#E4EFF0] to-[#FFF8CA]", hex: ["#CDE3E8", "#FFF8CA"] },
  { id: "g3", label: "Journey mapping", accent: "from-[#F5EAB6] via-[#DCE9C4] to-[#CDE3E8]", hex: ["#F5EAB6", "#CDE3E8"] },
  { id: "g4", label: "Stakeholder workshop", accent: "from-[#CDE3E8] via-[#E9D9CE] to-[#F0C9C7]", hex: ["#CDE3E8", "#F0C9C7"] },
  { id: "g5", label: "Concept sprint", accent: "from-[#FFF8CA] via-[#F0C9C7] to-[#CDE3E8]", hex: ["#FFF8CA", "#F0C9C7"] },
  { id: "g6", label: "Prototype testing", accent: "from-[#E4EFF0] via-[#FFF8CA] to-[#F3E2A0]", hex: ["#E4EFF0", "#F3E2A0"] },
  { id: "g7", label: "Brand strategy", accent: "from-[#F0C9C7] via-[#FFF8CA] to-[#CDE3E8]", hex: ["#F0C9C7", "#CDE3E8"] },
  { id: "g8", label: "Impact review", accent: "from-[#CDE3E8] via-[#F5EAB6] to-[#FFF8CA]", hex: ["#CDE3E8", "#FFF8CA"] },
];

// ── SKILLS & EXPERIENCE ──────────────────────────────────────

export const skills = {
  research: [
    "Consumer Insights",
    "In-depth Interviews",
    "Empathy & Affinity Mapping",
    "Triangulation",
    "Market Research",
    "User Testing",
    "Self-ethnography",
  ],
  strategy: [
    "Problem Framing",
    "Business Design",
    "Brand Strategy",
    "Systems & Policy Thinking",
    "Framework Building",
    "Business Modelling",
  ],
  management: [
    "Leadership",
    "Project Management",
    "Stakeholder Communication",
    "Business Development",
    "Facilitation",
    "Organisation & Planning",
    "Client Servicing",
  ],
  tools: ["Figma", "FigJam", "Miro", "Notion", "Adobe Creative Suite", "Keynote"],
} as const;

export const experience = [
  {
    period: "2023 — 2027",
    title: "B.Des, Strategic Design Management",
    place: "ISDI, ATLAS SkillTech University",
    description:
      "Final-year student, with a minor in Digital Ecosystem. Focused on research-driven design strategy connecting human-centred insight to business and systems thinking.",
  },
  {
    period: "Mar — Jun 2026",
    title: "Social Media (LinkedIn) Intern",
    place: "M81",
    description:
      "Ran LinkedIn social media work for the team, described by the co-founder as dedicated, professional and reliable.",
  },
  {
    period: "Aug — Nov 2025",
    title: "Brand Strategy Intern",
    place: "Adbhoot Creatives (Qissagoi Entertainment)",
    description:
      "Contributed to brand strategy for client-facing work, applying business development thinking to creative execution.",
  },
  {
    period: "Jan — Mar 2025",
    title: "Team Lead (Intern)",
    place: "Maha CSR Summit 2025",
    description:
      "Managed four critical verticals across the planning and execution of one of the state's most impactful CSR-driven initiatives.",
  },
  {
    period: "May — Jul 2023",
    title: "Events & Marketing Intern",
    place: "G N Autonation LLP (Mahindra)",
    description:
      "Took on new assignments across marketing, recognised by the HR manager for responsibility, sincerity and willingness to learn.",
  },
  {
    period: "Prior Education",
    title: "Higher Secondary Education",
    place: "Mussoorie International School",
    description:
      "Foundational years that shaped an early interest in leadership, communication, and creative problem-solving.",
  },
] as const;
