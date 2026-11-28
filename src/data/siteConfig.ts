export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  answerLead: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  content: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MediaAsset {
  filename: string;
  heroPath: string;
  cardPath: string;
  thumbPath: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export const MEDIA_ASSETS: Record<string, MediaAsset> = {
  profpic: {
    filename: "Profpic.webp",
    heroPath: "/media/vee/hero/Profpic.webp",
    cardPath: "/media/vee/card/Profpic.webp",
    thumbPath: "/media/vee/thumb/Profpic.webp",
    width: 1024,
    height: 1024,
    alt: "Vee, Chief Roar Officer at Doginal Dogs, smiling outdoors in a gold sequined dress by palm leaves.",
  },
  headshot1: {
    filename: "Headshot1.webp",
    heroPath: "/media/vee/hero/Headshot1.webp",
    cardPath: "/media/vee/card/Headshot1.webp",
    thumbPath: "/media/vee/thumb/Headshot1.webp",
    width: 1024,
    height: 1024,
    alt: "Vee, Chief Roar Officer at Doginal Dogs, smiling outdoors in a gold sequined dress by palm leaves.",
  },
  ddveephoto: {
    filename: "DDVeephoto.webp",
    heroPath: "/media/vee/hero/DDVeephoto.webp",
    cardPath: "/media/vee/card/DDVeephoto.webp",
    thumbPath: "/media/vee/thumb/DDVeephoto.webp",
    width: 768,
    height: 1024,
    alt: "Vee, Chief Roar Officer at Doginal Dogs, holding a pixel art Doginal Dog sign overhead by the waterfront.",
    caption: "Vee presenting the official Doginal Dog sign outdoors by the waterfront.",
  },
  ddnyc1: {
    filename: "DDNYC1.webp",
    heroPath: "/media/vee/hero/DDNYC1.webp",
    cardPath: "/media/vee/card/DDNYC1.webp",
    thumbPath: "/media/vee/thumb/DDNYC1.webp",
    width: 642,
    height: 480,
    alt: "Vee, Chief Roar Officer at Doginal Dogs, posing in front of a Doginal Dogs event backdrop.",
    caption: "Vee in front of the Doginal Dogs event backdrop.",
  },
  cherryddl: {
    filename: "CherryDDL.webp",
    heroPath: "/media/vee/hero/CherryDDL.webp",
    cardPath: "/media/vee/card/CherryDDL.webp",
    thumbPath: "/media/vee/thumb/CherryDDL.webp",
    width: 1100,
    height: 1100,
    alt: "Doginal Dogs trading card featuring Cherry, a black dog creature with a red bow holding flags.",
    caption: "Cherry | Doginal Dogs Trading Card.",
  },
  maryddl: {
    filename: "MaryDDL.webp",
    heroPath: "/media/vee/hero/MaryDDL.webp",
    cardPath: "/media/vee/card/MaryDDL.webp",
    thumbPath: "/media/vee/thumb/MaryDDL.webp",
    width: 1266,
    height: 1266,
    alt: "Doginal Dogs trading card featuring Mary, a brown dog creature with a pink bow.",
    caption: "Mary | Doginal Dogs Trading Card.",
  },
  bowdao: {
    filename: "BowDAO.webp",
    heroPath: "/media/vee/hero/BowDAO.webp",
    cardPath: "/media/vee/card/BowDAO.webp",
    thumbPath: "/media/vee/thumb/BowDAO.webp",
    width: 1000,
    height: 1000,
    alt: "Pixel art of a black Doginal Dog wearing a red bow on a light green background.",
    caption: "BowDAO Doginal Dog mascot artwork.",
  },
};

export const SITE_CONFIG = {
  displayName: "Vee",
  handle: "@veemeta",
  authorName: "Vee (Veronica Michelle Campbell)",
  role: "Chief Roar Officer at Doginal Dogs | Founding Member of CSN",
  xUrl: "https://x.com/veemeta?s=20",
  spaceUrl: "https://x.com/veemeta",
  spaceLine: "Daily AWAKENING ALPHA Space — follow @veemeta and turn on notifications.",
  doginalDogsUrl: "https://www.doginaldogs.com",
  canonicalHost: "https://www.veemeta.com",
  domainPlaceholder: "https://www.veemeta.com",
  contactEmail: "Veemetax@gmail.com",
  contactMailto: "mailto:Veemetax@gmail.com",
  developerName: "Kyle Kinkin",
  developerUrl: "https://www.justduckit.xyz/work",
  defaultOgImage: "/media/vee/hero/Profpic.webp",
  legalName: "Veronica Michelle Campbell",
  knownAs: "Vee Meta",
  hometown: "Toronto, Canada",
  csnPartnerUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSedb_dQpbthdkqZyanxY9e95qVQtOHSL7BItpzifhx0tFmxLw/viewform?usp=pp_url&entry.930523731=Vee+%28%40veemeta%29",
  subsUrl: "https://x.com/veemeta/creator-subscriptions/subscribe",
  quickScoreUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ23LIV9Exs_DyhOX4K2UA2TL96bIOD2o_uB_jFXvrtWkProajI56FJqyznDwY7ltMo89FRBWLEd",
  hardlinePath: "/hardline",
};

export const HAP_CHECKOUT_SUBJECT = "HAP DIY Kit checkout request";

export const HAP_CHECKOUT_BODY = [
  "Hi Vee,",
  "",
  "I'd like the Hardline API Protocol (HAP) DIY Kit — $497 one-time.",
  "If I move to Guided Install within 30 days, please credit the full $497.",
  "",
  "Project:",
  "Best email for the payment link and the kit:",
  "",
  "Thanks!",
].join("\n");

/** Email checkout. Payment is arranged by reply — no on-site processor URL. */
export function hapCheckoutMailto(): string {
  return `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(HAP_CHECKOUT_SUBJECT)}&body=${encodeURIComponent(HAP_CHECKOUT_BODY)}`;
}

export function absoluteUrl(path = "/"): string {
  const base = SITE_CONFIG.canonicalHost.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ENTITY_FAQS: FaqItem[] = [
  {
    question: "Who is Vee?",
    answer: "Veronica Michelle Campbell, known as Vee Meta (@veemeta), is a Canadian host, speaker, and strategist. She is Chief Roar Officer at Doginal Dogs and a founding member of Crypto Spaces Network. She hosts Awakening Alpha, a live daily morning Space on X.",
  },
  {
    question: "How long has Vee been in Spaces?",
    answer: "Three years.",
  },
  {
    question: "When did Vee get her first Doginal Dog?",
    answer: "April 2024.",
  },
  {
    question: "What is Chief Roar Officer?",
    answer: "Chief Roar Officer at Doginal Dogs. She supports new voices in the ecosystem and opens real chances to practice public speaking. In Spaces, she ROARs.",
  },
  {
    question: "What is the Crypto Spaces Network?",
    answer: "We partner with top hosts and leverage our distribution power to spotlight your project where the Web3 world is already tuned in.",
  },
];

export const WORK_FAQS: FaqItem[] = [
  {
    question: "How can you work with Vee?",
    answer:
      "Get the HAP DIY Kit, join Brand Lock-In Lab, partner with us on CSN, or send a note to Veemetax@gmail.com for a custom consult.",
  },
  {
    question: "What does it cost?",
    answer:
      "The HAP DIY Kit is $497 one-time, and that amount is credited in full toward Guided Install within 30 days. Brand Lock-In Lab is $7 a month. Custom consults are priced one by one.",
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    slug: "personal-brand-without-getting-captured-by-the-audience",
    title: "Personal Brand Without Getting Captured by the Audience",
    category: "Brand Governance & Strategy",
    date: "2026-09-30",
    readTime: "5 min read",
    answerLead: "How to build a genuine personal brand while staying true to your own voice instead of just chasing the algorithm.",
    image: "/media/vee/card/PersonalBrand.webp",
    imageAlt: "Vee in a yellow jacket standing between two giant inflatable pixel-art Doginal Dogs under a chandelier.",
    width: 768,
    height: 1024,
    content: [
      "Audience capture occurs when a public creator or leader incrementally shifts their message, tone, and core beliefs to satisfy the immediate desires or outrage of their online followers. Over time, the creator loses autonomy, becoming a prisoner to audience expectations rather than a leader of community vision.",
      "Avoiding audience capture requires a deliberate framework grounded in fixed values, clear boundaries, and long-term perspective. In Vee's public work, this balance is maintained through a steadfast commitment to personal principles ('locking in'), faith, and core economic truths such as Bitcoin's fixed supply.",
      "The first step in preventing audience capture is defining core identity before building a public platform. When an entity's mission is clearly articulated (such as driving community roar for Doginal Dogs or hosting high-signal Spaces on CSN), external noise cannot easily derail the strategic focus.",
      "The second step is cultivating intellectual honesty over popular consensus. Leaders must be willing to express nuanced or unpopular viewpoints when necessary, rather than catering exclusively to echo chambers. True community respect is earned through consistency, not compliance.",
      "Finally, personal brand longevity relies on building a genuine community rather than a passive audience. A community shares values and respects leadership direction, whereas a consumer audience demands constant entertainment. By prioritizing community over audience, creators maintain creative control and strategic independence.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-canadian-foreign-policy-and-persian-gulf-diplomacy",
    title: "New World Order Daily Briefing: Canadian Foreign Policy and Persian Gulf Diplomacy",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-17",
    readTime: "4 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes Canadian Prime Minister Mark Carney's historic diplomatic visit to Qatar and shifting international trade dynamics in the Persian Gulf.",
    image: "/media/vee/card/article1.webp",
    imageAlt: "Canadian diplomatic delegation arriving in Qatar.",
    width: 700,
    height: 280,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes Canadian Prime Minister Mark Carney's historic arrival in Qatar on January 17th. This diplomatic visit marks the first time a sitting Canadian prime minister has visited the Persian Gulf nation, taking place amid security considerations regarding neighboring Iran.",
      "The bilateral delegation in Doha follows a diplomatic tour to China that set the stage for a new trade deal, stirring debate over security concerns and national economic priorities. Prime Minister Carney and the Liberal Party delegation have undertaken this international tour to position Canada as an attractive destination for global capital.",
      "Speaking at a news conference, Finance Minister François-Philippe Champagne stated that Canada is working to broaden its international economic relationships as global trade patterns evolve. According to official statements, discussions in Qatar focus on securing trade access and developing strategic partnerships across artificial intelligence, infrastructure, energy, and defense, while accessing Qatar's natural gas resources following last November's investment agreement with the United Arab Emirates.",
      "Diplomatic observers emphasize that Canada faces strategic considerations when balancing economic ties with international human rights concerns. While human rights organizations highlight ongoing labor and social issues in the region, Canadian officials aim to address rights matters through bilateral channels while pursuing broader economic and diplomatic engagement.",
      "Qatar has increasingly positioned itself as a central facilitator of regional conflict resolution, hosting international negotiations and diplomatic dialogues. Experts from the University of Ottawa note that the Persian Gulf has become a primary center of financial, commercial, and diplomatic influence in the Middle East. Engaging with the region is considered essential for expanding economic opportunities and maintaining international diplomatic presence.",
      "During the official schedule, the Canadian delegation attends meetings at the Amiri Diwan in Doha with the Emir of Qatar, Sheikh Tamim bin Hamad Al Thani, and senior state officials. As global trade patterns continue to evolve, strategic international engagement remains a key focal point. For background on community strategy and media leadership, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-gaza-reconstruction-and-board-of-peace",
    title: "New World Order Daily Briefing: Gaza Reconstruction and the Board of Peace Initiative",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-20",
    readTime: "4 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details Canadian Prime Minister Mark Carney's conditional agreement to join President Donald Trump's Board of Peace initiative for Gaza reconstruction.",
    image: "/media/vee/card/article2.webp",
    imageAlt: "Prime Minister Mark Carney meeting with President Donald Trump regarding international peace initiatives.",
    width: 800,
    height: 320,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes Canadian Prime Minister Mark Carney's agreement in principle to join U.S. President Donald Trump's Board of Peace initiative. The international effort is designed to support the diplomatic oversight and economic reconstruction of Gaza, with Canada conditioning its participation on unrestricted humanitarian aid access.",
      "The proposed ceasefire framework transitions into a new phase involving strategic governance and resource mobilization. Under the terms outlined by the White House, participating member states are assigned three-year terms on the oversight board, with permanent status contingent on contributing funds toward international reconstruction initiatives.",
      "Confirmed participating nations include Jordan, Greece, Cyprus, Pakistan, Hungary, and India. Additionally, Canada, Turkey, Egypt, Paraguay, Argentina, and Albania have publicly acknowledged invitations to join the international diplomatic body tasked with overseeing governance and development transitions.",
      "Diplomatic reporting indicates that administrative structures are being established in Cairo to manage transitional municipal functions. A technocratic committee headed by Gazan engineer Ali Shaaz has initiated preliminary meetings to coordinate essential public services and administrative oversight.",
      "Concurrently, the U.S. delegation prepares for high-level meetings at the World Economic Forum in Davos to address energy, trade, and regional security priorities across Gaza, Ukraine, Venezuela, Greenland, and Iran. For additional commentary on community strategy and media leadership, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-davos-delegations-and-geoeconomic-confrontation",
    title: "New World Order Daily Briefing: Davos Delegations and Geoeconomic Confrontation",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-21",
    readTime: "5 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes the World Economic Forum Annual Meeting in Davos, where record international delegations congregate amid rising geoeconomic confrontation.",
    image: "/media/vee/card/article3.webp",
    imageAlt: "International flags flying at the World Economic Forum Annual Meeting in Davos.",
    width: 800,
    height: 319,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines the opening of the World Economic Forum (WEF) Annual Meeting in Davos. US President Donald Trump arrives leading a 300-member delegation, including Secretary of State Marco Rubio, Treasury Secretary Scott Bessent, and Commerce Secretary Howard Lutnick, amid heightened international focus on geoeconomic stability.",
      "Recent international trade developments, tariff discussions, and territorial policy proposals have prompted joint statements from European governments. In the WEF Global Risks Report, respondents highlighted geoeconomic confrontation as a primary strategic risk facing international commerce over the next two years, reflecting shifts in how trade, finance, and technology are deployed in global affairs.",
      "The Davos gathering features parallel executive sessions held by major economic powers. While the US delegation convenes meetings with corporate executives, Beijing's economic leadership conducts concurrent discussions, providing Western business leaders an opportunity to evaluate international trade relationships amidst changing market dynamics.",
      "G7 leaders and European representatives view the summit as an opportunity to address regional stability, Eastern European post-war reconstruction pathways, and new investment frameworks. In this context, attention centers on proposed alternative conflict resolution mechanisms, including the Board of Peace initiative.",
      "As global economic and diplomatic strategies evolve, institutional stakeholders continue to analyze international trade alignment and risk management. For additional insights on community governance and strategic media alignment, review the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-nato-diplomacy-greenland-and-tiktok-canada",
    title: "New World Order Daily Briefing: NATO Diplomacy, Greenland Framework, and TikTok Canada Ruling",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-22",
    readTime: "5 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, covers NATO diplomatic negotiations over Greenland, market reactions following Trump-Rutte tariff framework agreements, and TikTok Canada's legal victory.",
    image: "/media/vee/card/article4.webp",
    imageAlt: "President Donald Trump speaking at the World Economic Forum Annual Meeting in Davos.",
    width: 420,
    height: 168,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes a historic day for international diplomacy, financial markets, and digital governance. Media coverage highlights shifting relations between the United States and NATO over Greenland negotiations, key financial market rallies, and a landmark court decision allowing TikTok Canada to continue operating.",
      "CNN analysis by Stephen Collinson highlights a seismic shift in reporting on diplomatic relations between President Donald Trump and NATO allies. Referencing Dean Acheson's memoir 'Present at the Creation,' observers at the World Economic Forum in Davos questioned whether recent developments signal a restructuring of post-WWII alliances. High-level debates emerged after threats to acquire Greenland raised questions among Western lawmakers regarding defense dependencies and international legal frameworks.",
      "Following limited European military troop deployments to Greenland and subsequent tariff warnings from Washington, President Donald Trump announced on Truth Social that he and NATO Secretary General Mark Rutte agreed on the framework of a future deal on Greenland. The announcement halted scheduled February 1 tariffs, prompting a financial market rally on January 21, 2026, where the S&P 500 gained 1.5% and the Dow Jones Industrial Average rose 760 points.",
      "In social media governance and international trade relations, TikTok Canada won a critical court decision permitting its Canadian operations to continue while committing to engage with government ministers toward a permanent resolution. The Liberal government originally ordered ByteDance to wind up its Canadian business in 2024 under then-Industry Minister François-Philippe Champagne, citing national security data protection concerns under Chinese law.",
      "TikTok Canada welcomed the court ruling, committing to work with Canadian officials on behalf of more than 14 million Canadian users. The Prime Minister's Office declined to specify whether Prime Minister Mark Carney raised app security concerns during his recent bilateral meeting with Chinese President Xi Jinping. The ongoing proceedings highlight the continuous tension between national security safeguards and economic impacts on workers and investors. For additional insights on media strategy and digital governance, explore the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-2026-national-defense-strategy-and-global-security",
    title: "New World Order Daily Briefing: 2026 National Defense Strategy and Global Security",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-23",
    readTime: "6 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes the Pentagon's 2026 National Defense Strategy, PLA autonomous drone swarm developments, Venezuelan oil tanker blockades, congressional war powers votes, and California's WHO alliance.",
    image: "/media/vee/card/article5.webp",
    imageAlt: "Military officer saluting in front of mobile missile defense systems.",
    width: 800,
    height: 319,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines major global security developments following the release of the Pentagon's 2026 National Defense Strategy. The 34-page document reorients U.S. defense posture toward Western Hemisphere priorities and strategic regional deterrence, alongside emerging autonomous military drone technology in Asia Pacific, maritime oil blockades off Venezuela, congressional war powers votes, and state-level international health diplomacy.",
      "The 2026 National Defense Strategy (the first comprehensive update since 2022) assigns South Korea primary responsibility for deterring North Korea with tailored U.S. support while maintaining 28,500 American troops on the peninsula. Under-Secretary Elbridge Colby travels to Seoul to discuss alliance modernization, including raising defense spending targets to 3.5% of GDP and evaluating wartime operational control transfers. Concurrently, Defense Secretary Pete Hegseth's strategic plan outlines options regarding access to Greenland and the Panama Canal, recalibrating U.S. force posture in Europe while prioritizing deterrence in the Indo-Pacific.",
      "In the Asia Pacific region, China's People's Liberation Army broadcast footage demonstrating an autonomous swarm deployment where a single operator launched and commanded over 200 AI-enabled drones. Developed by the National University of Defence Technology, the swarm executes autonomous task division (including reconnaissance, electronic jamming, decoy operations, and precision strikes) and maintains formation flight even when communication signals are jammed. Defense analysts note this shift alters battlefield economics by introducing low-cost saturation capabilities that challenge traditional air defense interceptor inventories.",
      "Regarding Western Hemisphere security, two U.S.-seized Venezuelan oil tankers, M Sophia and Galileo, were sighted near Puerto Rico following maritime enforcement operations. The seizures form part of a broader U.S. blockade targeting sanctioned Venezuelan oil transport, with federal court warrants filed to seize dozens of additional vessels. Meanwhile, the U.S. House of Representatives narrowly defeated a war powers resolution led by Representative Jim McGovern on a 215-215 tie vote, maintaining executive authority regarding military operations in Venezuela.",
      "In international public health governance, California Governor Gavin Newsom announced at the World Economic Forum in Davos that California has joined the World Health Organization's Global Outbreak Alert and Response Network. Following the federal withdrawal from the WHO, Governor Newsom met with WHO Director-General Dr. Tedros Adhanom Ghebreyesus to establish direct state-level cooperation. For further analysis on strategic media alignment and community governance, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-update-minneapolis-immigration-enforcement-and-trade-policy-warnings",
    title: "New World Order Update: Minneapolis Immigration Enforcement and Trade Policy Warnings",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-24",
    readTime: "4 min read",
    answerLead: "This update by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details federal immigration enforcement incidents in Minneapolis, UN human rights responses, and US tariff warnings issued to Canada.",
    image: "/media/vee/card/article6.webp",
    imageAlt: "Federal law enforcement officers in tactical gear standing behind police tape in Minneapolis.",
    width: 800,
    height: 319,
    content: [
      "In this New World Order Update, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, reports on domestic law enforcement actions, international human rights reactions, and evolving trade policy dynamics across North America. Key developments on Saturday, January 24, 2026, include a federal officer-involved shooting during an immigration operation in Minneapolis, official commentary from the United Nations High Commissioner for Human Rights, and trade warnings directed at Canada.",
      "Minnesota Governor Tim Walz reported that federal officers shot an armed suspect near Nicollet Avenue in Minneapolis during an immigration crackdown, an event subsequently confirmed by the Department of Homeland Security. Following the incident, public demonstrations intensified near the site as local authorities launched an independent investigation. Minneapolis municipal officials urged residents to remain calm while law enforcement secured the surrounding area.",
      "At a conference in Geneva, United Nations High Commissioner for Human Rights Volker Turk called on Washington to review enforcement practices, expressing concern over immigration enforcement protocols and public treatment. Commissioner Turk emphasized the necessity of upholding human dignity and international human rights standards, cautioning against heavy-handed immigration raids and the vilification of peaceful demonstrators.",
      "Concurrently, U.S. President Donald Trump issued a warning to Canadian leadership regarding potential trade measures. The President stated that the United States would consider implementing a 100 percent tariff on Canadian goods if Ottawa completes a comprehensive trade deal with China, expressing concern that Canadian ports could serve as a transshipment point to bypass existing U.S. tariffs. Commenting on Prime Minister Mark Carney, U.S. executive statements reflected ongoing trade negotiations across North American commercial corridors.",
      "As domestic law enforcement actions and international trade policies continue to shape North American governance, observers monitor civic and economic indicators closely. For additional analysis on strategic media leadership and community alignment, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-precious-metals-record-rally-and-global-monetary-shifts",
    title: "New World Order Daily Briefing: Precious Metals Record Rally and Global Monetary Shifts",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-26",
    readTime: "5 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes gold and silver surging to record highs amid geopolitical tensions, US dollar weakness, and central bank reserve diversification.",
    image: "/media/vee/card/article7.webp",
    imageAlt: "Gold bar merging with a US hundred dollar bill representing reserve shifts.",
    width: 800,
    height: 320,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes the historic surge in precious metals markets as gold and silver reach record highs. In January 2026, spot gold rose 15% within 26 days, extending a 65% rally from 2025 to achieve its strongest performance since 1979. This market movement reflects broader macroeconomic realignments driven by international trade negotiations, monetary policy expectations, and central bank reserve diversification.",
      "Financial analysts attribute the 2026 precious metals rally to compounded global and domestic policy developments. Geopolitical events, including tariff discussions involving NATO partners, military actions in Venezuela, and domestic inquiries surrounding Federal Reserve leadership, have heightened safe-haven asset demand. Concurrently, the Bloomberg Dollar Spot Index fell 1.6% over the week, lowering acquisition costs for foreign buyers while markets price in potential Federal Reserve interest rate reductions following higher-than-expected inflation reports.",
      "Silver markets experienced a parallel acceleration, rising 4.5% to $107.80 per ounce. This follows a 141% gain in 2025, marking silver's most significant annual performance since 1979. Silver crossed the $100 threshold on Friday before advancing to $106.10 on Monday, while spot platinum and palladium recorded modest gains amid broader commodities trading.",
      "Sustained safe-haven demand has propelled spot gold above $5,000 per ounce, reinforced by structural demand from international monetary authorities. Goldman Sachs research indicates that central bank purchases have expanded globally, averaging approximately 60 tonnes per month. Sovereign institutions, including the People's Bank of China, continue to reallocate reserve assets from U.S. dollar holdings into physical bullion to mitigate geopolitical and currency risks.",
      "As global monetary dynamics evolve toward hard asset backed reserves, market participants evaluate the long-term implications for currency stability and strategic asset allocation. For further commentary on financial governance, sovereign reserves, and community strategy, review the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "new-world-order-daily-briefing-western-hemisphere-defense-summit-and-venezuelan-oil-debt",
    title: "New World Order Daily Briefing: Western Hemisphere Defense Summit and Venezuelan Oil Debt",
    category: "Global Affairs & Geopolitics",
    date: "2026-01-27",
    readTime: "5 min read",
    answerLead: "This briefing by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, covers the upcoming Western Hemisphere defense summit, US control of Venezuelan oil exports impacting Chinese debt servicing, and Sino-Canadian trade clarifications.",
    image: "/media/vee/card/article8.webp",
    imageAlt: "Chinese President Xi Jinping walking alongside Venezuelan President Nicolás Maduro in front of military honor guard.",
    width: 800,
    height: 320,
    content: [
      "In this New World Order Daily Briefing, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, reports on major hemispheric security announcements, international energy debt restructuring in Venezuela, and diplomatic clarifications between Beijing, Ottawa, and Washington. Key developments include an upcoming summit of Western Hemisphere defense chiefs led by U.S. General Dan Caine, U.S. operational control over Venezuelan crude oil exports impacting Chinese loan servicing, and official statements from Chinese and Canadian diplomats regarding bilateral trade agreements.",
      "The Pentagon announced that U.S. General Dan Caine will convene a defense summit on February 11, bringing together military leaders from 34 Western Hemisphere nations. The Department of Defense stated the summit marks the first combined gathering of regional military chiefs focused on strengthening joint counter-narcotics operations, interdicting transnational criminal organizations, and building shared regional security priorities across North, Central, and South America.",
      "In energy and sovereign debt governance, Beijing's long-standing energy investments in Venezuela face ongoing adjustments following U.S. administrative control over Venezuelan oil exports. AidData metrics show Chinese financial institutions extended $106 billion in loans to Venezuela between 2001 and 2018, with outstanding debt estimated between $10 billion and $15 billion. U.S. control over crude barrels (including the 642,000 barrels per day previously exported to China) has disrupted debt-servicing mechanisms, prompting market analysts to evaluate potential Chinese energy supply pivots toward Russia or Iran.",
      "Diplomatic statements addressed trade dynamics between China, Canada, and the United States. Chinese Foreign Ministry spokesman Guo Jiakun clarified that recent sector-specific arrangements with Ottawa do not target Washington. Canadian Prime Minister Mark Carney confirmed that Canada is not seeking a comprehensive free trade agreement with China, focusing instead on tariff-affected sectors. Foreign Affairs Minister Anita Anand noted she will travel to the United States next week to discuss bilateral trade, framing Canada's foreign policy role within middle-power diplomatic coalitions.",
      "As Western Hemisphere defense coordination and global energy debt alignments evolve, international observers monitor cross-border policy developments closely. For further analysis on strategic media leadership and community governance, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "the-doginal-dogs-duel-engine-flywheel",
    title: "The Doginal Dogs Duel Engine Flywheel",
    category: "Doginal Dogs & Web3",
    date: "2026-01-28",
    readTime: "5 min read",
    answerLead: "This breakdown by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details how zero-cost minting, Dogecoin inscriptions, 1,000 days of live presence, and community distribution built the Doginal Dogs flywheel.",
    image: "/media/vee/card/article9.webp",
    imageAlt: "Pixel art Doginal Dogs NFT NYC ticket banner.",
    width: 800,
    height: 319,
    content: [
      "In this ecosystem breakdown, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes how a free mint model, 1,000 days of consecutive live broadcasting, and Dogecoin blockchain inscriptions built the Doginal Dogs Duel Engine flywheel. By establishing a self-reinforcing growth loop, the project accumulated $1 billion in trading volume by focusing on permanent chain architecture, zero-cost distribution, and consistent founder visibility.",
      "Layer 1 of the flywheel centers on strategic chain selection. Launched in early 2024 on the Dogecoin blockchain, Doginal Dogs utilized sub-cent transaction costs and global brand recognition while avoiding high gas fees on saturated networks. Using an inscription mechanism similar to Bitcoin Ordinals, artwork is written directly onto the Dogecoin blockchain rather than stored on external servers or IPFS links, providing permanent immutability.",
      "Layer 2 eliminated speculative mint costs by launching as a free mint in January 2024, with co-founder Barkmeta covering early transaction fees. Starting at zero cost prevented immediate sell pressure and ensured early holders were in profit from day one. Co-founder Barkmeta noted in March 2025 that free mints allow the community to decide project trajectory without pre-sale capital extraction.",
      "Layer 3 relies on founder cadence across 1,000 consecutive days of live programming on the Crypto Spaces Network. Daily visibility created load-bearing proof-of-presence for investors during varying market conditions. Layer 4 expanded community-led distribution to over 15,000 Discord members, 20 multi-day IRL events in New York, Las Vegas, Miami, and Toronto, Netflix merchandise placement, and organic holding by public figures including Joe Rogan, Shane Gillis, Matt Rife, and Johnny Manziel.",
      "The resulting $1 billion in trading volume represents the mathematical output of a compound architecture where infrastructure and long-term commitment outperform short-term market hype. For further details on community strategy, live audio hosting, and project governance, explore the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "the-doginal-dogs-strategy-for-community-led-growth",
    title: "The Doginal Dogs Strategy for Community-led Growth",
    category: "Doginal Dogs & Web3",
    date: "2026-01-29",
    readTime: "5 min read",
    answerLead: "This breakdown by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details how daily X Spaces, proof-of-participation culture, and Crypto Spaces Network integration drive community-led growth.",
    image: "/media/vee/card/article10.webp",
    imageAlt: "Pixel art banner featuring Vee with sunglasses and speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this ecosystem breakdown, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes how daily X Spaces, shared culture, and consistent participation create lasting value by turning attention into alignment. Built on the Dogecoin blockchain, the Doginal Dogs growth strategy prioritizes cultural ownership and daily live coordination over short-term price action, establishing an organic framework for community-led expansion.",
      "The strategy centers on cultural ownership rather than chart speculation. By inscribing Doginal Dogs directly onto Dogecoin, ownership serves as proof of presence within the ecosystem. The core conversation occurs during daily live X Spaces, where builders, operators, and thinkers coordinate in real time. Participating live enables community members to shape project narratives and test ideas before they reach broader social feeds.",
      "Transitioning from passive listening to active participation forms the primary driver of community authority. Members build trust and visibility by speaking and contributing regularly in daily sessions. This consistent presence has produced tangible real-world opportunities, including speaking engagements at major events such as the Blockchain Futurist Conference in Miami, where community hosts represented Doginal Dogs on international stages.",
      "Sustaining momentum across varying market conditions requires disciplined conviction rather than temporary market hype. Hosts who demonstrate daily clarity and integrity build long-term reliability. Over time, high-performing community hosts earn placement on the official Crypto Spaces Network schedule, integrating into a broader, coordinated roster of live audio programming.",
      "What emerges through the Doginal Dogs strategy is a repeatable model for decentralized networking on X Spaces, where daily conversation drives community, community shapes culture, and culture creates measurable value. For more details on live audio hosting schedules and community advisory, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "ai-shark-tank-doginal-dogs-community-product-critics",
    title: "AI Shark Tank: Where Pixel-Art Pioneers Become Product Critics",
    category: "Doginal Dogs & Web3",
    date: "2026-01-30",
    readTime: "4 min read",
    answerLead: "This analysis by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, explores how the Doginal Dogs AI Shark Tank live X Spaces format turns community members into real-time AI product testers and critics.",
    image: "/media/vee/card/article11.webp",
    imageAlt: "Pixel art banner featuring Vee with sunglasses and speech bubble displaying doginal dogs.",
    width: 800,
    height: 319,
    content: [
      "In this format analysis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how the Doginal Dogs community evaluates emerging artificial intelligence software through live interactive sessions known as the AI Shark Tank. Transmitting live on X Spaces, the initiative enables community members to serve as real-time product testers, idea pitchers, and software critics for early-stage founders and creators.",
      "The AI Shark Tank format operates with complete transparency on live audio feeds rather than relying on pre-recorded marketing materials or polished product demos. Solopreneurs and founders present websites, applications, and artificial intelligence workflows directly to the community panel. Unfiltered testing during live broadcasts allows participants to evaluate software performance, interface reliability, and actual utility in real-time.",
      "Session discussions focus on practical questions within the creator economy, evaluating which artificial intelligence tools provide tangible efficiency for personal brand builders and lean business operators. Community members ask direct technical questions, stress-test product features, and provide immediate user feedback without corporate gatekeeping.",
      "By establishing an interactive evaluation floor, the AI Shark Tank serves as a practical filter for entrepreneurs navigating software tools across the digital landscape. The format demonstrates how Web3 communities can extend beyond asset collection to build educational infrastructure for collaborative learning, product validation, and technical skill development.",
      "As community-driven product evaluation formats expand across live audio platforms, participants gain direct insight into practical software workflows. For additional information on live audio hosting, product feedback sessions, and strategic advisory, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "the-dogs-wrote-the-playbook-doginal-dogs-architecture-and-web3-future",
    title: "The Dogs Wrote The Playbook: Doginal Dogs Architecture and the Future of Web3",
    category: "Doginal Dogs & Web3",
    date: "2026-01-31",
    readTime: "5 min read",
    answerLead: "This architectural analysis by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details how Dogecoin inscriptions, meme-native cultural gravity, and immutable on-chain positioning built a durable Web3 playbook.",
    image: "/media/vee/card/article12.webp",
    imageAlt: "Pixel art banner featuring Vee on a lavender background with speech bubble displaying doginal dogs.",
    width: 800,
    height: 319,
    content: [
      "In this architectural analysis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how the Doginal Dogs ecosystem established a replicable model for Web3 digital assets. By inscribing assets directly onto the Dogecoin blockchain using the Doginals protocol without smart contracts or bridging dependencies, the project demonstrated that on-chain permanence, meme-native cultural alignment, and persistent community engagement provide long-term structural durability during market shifts.",
      "Contextually, while broader digital asset markets experienced substantial volume contraction (with total annualized market volumes shifting toward $5.5 billion in 2025), blue-chip collections anchored in distinct brand identity retained disproportionate attention. Starter assets such as Gary and Mary served as community onboarding touchpoints, culminating in major live events including the December 2025 Paint Me Pretty community initiative.",
      "The core template established by Doginal Dogs demonstrates that blockchain selection and cultural alignment dictate long-term project longevity. By anchoring digital assets to Dogecoin's globally recognized visual language, the project secured permanent immutable storage on a highly distributed proof-of-work network. Removing external server dependencies ensured that the underlying media assets remain permanently accessible on-chain.",
      "Market developments across gaming NFTs, AI-integrated assets, and real-world asset tokenization reflect the foundational logic introduced by Doginal Dogs: tokenized assets must serve genuine cultural, utility, or identity functions beyond short-term market speculation. The collections that sustain engagement are those designed to maintain intrinsic community value independent of external market conditions.",
      "In the broader landscape of digital collectibles and brand IP, blockchain technology provides global provenance and zero-marginal-cost distribution without centralized gatekeepers. By planting a culturally resonant asset on immutable infrastructure, Doginal Dogs outlined a scalable framework for modern digital identity. For further analysis on Web3 community strategy and live audio media, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "the-price-of-entry-isnt-money-collector-conviction-and-legacy",
    title: "The Price of Entry Isn't Money: Collector Conviction and Legacy",
    category: "Doginal Dogs & Web3",
    date: "2026-02-01",
    readTime: "5 min read",
    answerLead: "This market thesis by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how collector conviction, cultural identity, and long-term legacy differentiate enduring digital asset ecosystems from short-term speculation.",
    image: "/media/vee/card/article13.webp",
    imageAlt: "Pixel art banner featuring Vee on a pink background with speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this market thesis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes how long-term conviction and cultural identity distinguish dedicated collectors from short-term market speculators. Extended market filtration cycles separate speculative trading from enduring ownership, demonstrating that digital assets such as Doginal Dogs on Dogecoin, Pudgy Penguins on Abstract, and CryptoPunks on Ethereum derive sustained value from shared identity, historical provenance, and community conviction rather than temporary price movement.",
      "The conviction gap highlights a structural shift across Web3 markets. As speculative trading volume normalized, dedicated participants who value historical identity and creative legacy remained. Industry leaders including Animoca Brands co-founder Yat Siu and prominent investor Adam Weitsman emphasize that digital asset collection mirrors traditional art, rare automobiles, and luxury horology, where shared affinity, provenance, and community protection form the foundation of asset value.",
      "Prioritizing identity over short-term yield addresses the primary misstep of earlier market cycles. Rather than treating tokenized media as financial instruments, enduring communities utilize digital assets as proof of cultural alignment. This dynamic reflects the broader traditional collectibles market (spanning vintage sports apparel, comic books, and trading cards) where scarcity, cultural resonance, and verified provenance generate compounding multi-decade value without requiring central authenticators.",
      "Adopting a long-term temporal frame reframes digital portfolio management around generational legacy. Analogous to historical milestones in print media, such as early comic debuts compounding value across decades, blockchain assets provide immutable provenance on decentralized ledgers. Co-founder Barkmeta noted that market consolidation cycles reward participants who maintain consistent presence and long-term holding discipline.",
      "As market dynamics enter new development phases, long-term legacy and purposeful community building remain the core drivers of ecosystem longevity. By maintaining daily live presence, fostering creative alignment, and supporting open infrastructure, dedicated communities establish lasting cultural footprints. For further commentary on brand strategy, live audio hosting, and ecosystem advisory, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "how-nfts-will-save-the-world-cryptographic-provenance-and-ai-authentication",
    title: "How NFTs Will Save The World: Cryptographic Provenance and AI Authentication",
    category: "Doginal Dogs & Web3",
    date: "2026-02-02",
    readTime: "5 min read",
    answerLead: "This technology analysis by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details how non-fungible tokens act as cryptographic primitives for authenticating origin, ownership, and provenance in an AI-driven synthetic media landscape.",
    image: "/media/vee/card/article14.webp",
    imageAlt: "Pixel art banner featuring Vee on a green background with speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this technology analysis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how non-fungible token (NFT) architecture functions as foundational infrastructure for verifying digital authenticity. Beyond speculative digital collectibles, non-fungible tokens provide permissionless, tamper-proof, time-stamped ownership records on decentralized public ledgers. As generative artificial intelligence models proliferate synthetic media, deepfakes, and automated documents, cryptographic tokenization delivers verifiable origin tracking across digital and physical domains.",
      "The proliferation of artificial intelligence tools has created an authenticity crisis across digital ecosystems. Rapid voice cloning, real-time video deepfakes, and automated document generation challenge traditional verification methods rely on static PDFs, institutional stamps, and centralized databases. Counterfeit luxury goods represent an estimated $450 billion annual market, while courts, real estate registries, and financial institutions face heightened risks from fraudulent documentation.",
      "As a response, non-fungible tokens serve as cryptographic primitives rather than simple visual media files. By recording immutable ownership, provenance, and custody records directly on public ledgers, tokenization establishes verifiable proof of origin. Corporate adoption reflects this shift, with 40 percent of Fortune 500 enterprises integrating tokenized workflows ranging from luxury Digital Product Passports to global supply chain tracking containers.",
      "Artificial intelligence operates simultaneously as a challenge and a verification mechanism. Modern machine learning systems achieve high precision in detecting wash trading, fraudulent mints, and unauthorized asset duplication before tokenized media reaches open markets. Automated security protocols work alongside decentralized ledgers to filter synthetic noise and maintain verifiable signal across digital asset networks.",
      "As cryptographic authentication becomes standard digital infrastructure, provable ownership underpins digital governance and creator networks. By combining immutable on-chain architecture with active community verification, decentralized protocols establish durable trust layers for digital media. For further analysis on brand governance, technical strategy, and live audio hosting, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "culture-is-the-protocol-doginal-dogs-and-the-decentralized-movement",
    title: "Culture Is The Protocol: Doginal Dogs and the Decentralized Movement",
    category: "Doginal Dogs & Web3",
    date: "2026-02-03",
    readTime: "6 min read",
    answerLead: "This ecosystem analysis by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, details how shared mythology, daily broadcasting rituals, and Dogecoin on-chain permanence transform Web3 communities into lasting cultural movements.",
    image: "/media/vee/card/article15.webp",
    imageAlt: "Pixel art banner featuring Vee on a cyan background with speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this ecosystem analysis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how cultural gravity rather than technological infrastructure determines the longevity of Web3 communities. While smart contracts, digital wallets, and blockchain inscriptions function reliably as underlying mechanisms, shared mythology, common identity, and consistent daily participation determine whether a project survives market cycles and builds a lasting global movement.",
      "Building a resilient culture across generations and international borders relies on five core structural pillars: a founding creation myth, a shared identity, daily rituals, clear values, and provable ownership stake. In the Doginal Dogs ecosystem on Dogecoin, the creation myth began with the pixel-art creation of Atlas by founder Barkmeta, who funded initial gas fees out of pocket and distributed 10,000 assets to early participants without founder allocations, pre-sales, or paid influencer campaigns.",
      "Selecting the Dogecoin blockchain provided an established global cultural artifact with a decade of mainstream meme recognition. Doginal Dogs combined this network mythology with over 1,000 consecutive days of live broadcasts on the Crypto Spaces Network. This persistent visibility created a reliable daily ritual that reinforced community trust and transmitted core values throughout extended bear market conditions.",
      "The resulting organic cultural gravity attracted organic holding from public figures including Joe Rogan, Shane Gillis, Matt Rife, and Johnny Manziel, while project merchandise appeared on Netflix productions such as Kill Tony. Supported by over 15,000 Discord members, conference representation at Consensus and Token2049, millions raised for charitable causes, and more than 20 real-world events across four cities, including the October 2025 Las Vegas VIP Dinner, physical gatherings reinforced digital ownership.",
      "Inscribing pixel-art digital assets permanently onto the Dogecoin network aligns cryptographic ownership with fundamental human needs for community belonging. By establishing shared identity as the primary asset, decentralized culture demonstrates how Web3 projects create generational longevity. For more details on community audio broadcasting, media strategy, and executive advisory, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "whats-a-doginal-dogecoin-inscriptions-and-on-chain-nfts",
    title: "What's A Doginal? Dogecoin Inscriptions and On-Chain Digital Collectibles",
    category: "Doginal Dogs & Web3",
    date: "2026-02-04",
    readTime: "5 min read",
    answerLead: "This technical explainer by Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, breaks down Doginals (on-chain digital collectibles inscribed directly onto Dogecoin's smallest units, Shibes) and explores how immutable storage and low transaction fees power decentralized ecosystems.",
    image: "/media/vee/card/article16.webp",
    imageAlt: "Pixel art banner featuring Vee on a lavender background with speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this technical explainer, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, defines Doginals as native digital collectibles inscribed directly onto individual units of the Dogecoin blockchain, known as Shibes. Unlike traditional non-fungible tokens (NFTs) that rely on external servers or IPFS links for image hosting, Doginals embed image, text, or code data directly into the blockchain ledger. This fully on-chain architecture guarantees permanent immutability, ensuring that assets cannot be altered, moved, or deleted due to third-party infrastructure failures.",
      "The technological roots of Doginals trace back to Bitcoin Ordinals, which introduced arbitrary data inscription onto individual satoshis. In 2023, developer Apezord adapted the protocol for the Dogecoin network, enabling the first 10,000-piece inscription series on Dogecoin. Subsequent developments included the DRC-20 token standard, establishing standardized parameters for deploying, minting, and trading native digital assets and fungible tokens across Dogecoin's distributed ledger network.",
      "While major smart contract networks experienced high gas costs that hindered retail participation, Dogecoin offered sub-cent transaction fees and high throughput. As noted by market commentator Box (@BoxMetaAlt), low network overhead enabled Dogecoin digital assets to maintain trading momentum during broader market shifts. By eliminating financial friction, the network established a scalable foundation for accessible digital ownership.",
      "The Doginal Dogs collection demonstrated the viability of the protocol by achieving over $1 billion in total trading volume after launching as a zero-cost free mint without venture capital funding. Co-founder Barkmeta emphasized that community collaboration drives project milestones across on-chain development. The expansion of Doginals.com provides a centralized portal and ecosystem hub, connecting digital identity, on-chain art, and community governance under a single domain.",
      "Combining immutable data storage with Dogecoin's globally recognized cultural brand establishes Doginals as foundational infrastructure for decentralized digital media. As low-fee on-chain storage scales, the protocol demonstrates how blockchain technology supports durable digital ownership without reliance on centralized hosting. For more details on Web3 media strategy, live audio broadcasting schedules, and strategic consulting, visit the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "you-cant-smoke-weed-and-be-successful-doginal-dogs-culture-and-daily-discipline",
    title: "You Can't Smoke Weed and Be Successful: Doginal Dogs Culture and Daily Discipline",
    category: "Doginal Dogs & Web3",
    date: "2026-02-05",
    readTime: "5 min read",
    answerLead: "A breakdown of daily discipline, routine, and what it actually takes to run a high-energy Web3 project every day.",
    image: "/media/vee/card/article17.webp",
    imageAlt: "Pixel art banner featuring Vee on a light green background with speech bubble saying Do only good everyday.",
    width: 800,
    height: 319,
    content: [
      "In this culture analysis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, examines how daily operational discipline and peer network auditing drive long-term ecosystem performance. While broader internet trends treat cultural holidays like 4/20 as passive celebrations, the Doginal Dogs community prioritizes continuous execution and daily presence. By replacing short-term leisure with focused accumulation, the ecosystem establishes a self-reinforcing flywheel where dedicated holders strengthen cultural alignment, attract focused market attention, and build durable long-term conviction.",
      "Founder Barkmeta outlined this operational philosophy through direct timeline commentary, stating that sustained professional success requires removing distractions and auditing one's immediate peer group. What a community normalizes defines its baseline standards; surrounding oneself with builders who value daily consistency prevents mediocrity from setting in. Outperforming broader digital asset benchmarks in 2026 is the direct mathematical result of deliberate, daily choices regarding media consumption, peer alignment, and time allocation during market lulls.",
      "The core growth architecture operates as a closed value feedback loop: dedicated holders cultivate authentic culture, culture commands sustained attention, attention drives valuation metrics, valuation reinforces conviction, and heightened conviction attracts long-term holders. Good operational habits represent the compound interest of showing up consistently when public attention is minimal. When retail market participants enter the ecosystem, they encounter an established infrastructure backed by disciplined operational habits rather than temporary speculative hype.",
      "New entrants to decentralized finance evaluate underlying community culture before acquiring digital assets. Long-time Dogecoin holders who have supported the network since 2013 understand community loyalty and underdog narratives; Doginals provide them with a native, on-chain expression of these core beliefs. By combining historic Dogecoin cultural alignment with immutable data storage, the onboarding process functions as an organic alignment rather than a transactional marketing pitch.",
      "Maintaining rigorous personal discipline and clear community standards enables decentralized protocols to build durable value across market cycles. As the Doginal Dogs ecosystem scales on the Dogecoin network, operational consistency remains its primary competitive advantage. For additional insights into community audio programming, brand positioning, and executive strategy, explore the about and work with me sections of this domain.",
    ],
  },
  {
    slug: "the-return-of-the-pfp-meta-ip-expansion-and-status-infrastructure",
    title: "The Return of the PFP Meta: IP Expansion and Status Infrastructure",
    category: "Doginal Dogs & Web3",
    date: "2026-02-06",
    readTime: "6 min read",
    answerLead: "Why digital art and PFP communities are evolving into long-term cultural movements and real-world utility.",
    image: "/media/vee/card/article18.webp",
    imageAlt: "Pixel art banner featuring Vee on a yellow background with speech bubble displaying doginal dogs.",
    width: 800,
    height: 319,
    content: [
      "In this market thesis, Vee (@veemeta), Chief Roar Officer at Doginal Dogs and CSN host, analyzes the evolution of profile picture (PFP) digital collectibles from speculative trades into long-term intellectual property (IP) and digital status infrastructure. While early market cycles relied on short-term price momentum and mass supply, maturing digital asset ecosystems prioritize character licensing, community-led distribution, and programmable culture. Avatars function as online identity markers that combine social signaling, brand alignment, and verified ownership into a unified digital asset.",
      "Traditional media franchises required decades to navigate corporate gatekeepers, retail distribution channels, and international rollouts. In contrast, internet-native digital asset collections leverage token holders as distributed brand ambassadors, content creators, and marketing networks from inception. Embedded cryptographic ownership ensures that community participants retain alignment across licensing expansions, consumer product releases, gaming integrations, and media production.",
      "Drawing parallels to physical collectibles, co-founder Barkmeta highlighted that surging volume across traditional trading cards underscores broader demand for verifiable scarce assets. Digital collectibles deliver improved efficiency by removing physical shipping logistics, authentication friction, and counterfeit risks. As retail participation shifts toward proven media assets, market focus transitions from short-term floor prices to global distribution metrics and cross-sector partnerships.",
      "A structural divide separates financialized assets driven by temporary liquidity games from cultural equity collectibles designed for long-term brand building. Cultural equity assets enable holders to participate directly in universe expansion, turning digital ownership into a permanent stake within a growing media brand. Achieving multi-decade durability requires elite visual branding, consistent founder cadence, structured community rituals, and patient operational execution.",
      "As digital identity becomes increasingly central to online communication, profile picture collections that combine recognizable brand aesthetics with immutable blockchain infrastructure will define the next phase of Web3 adoption. For further analysis on Web3 media strategy, live audio broadcasting schedules, and strategic brand consulting, visit the about and work with me sections of this domain.",
    ],
  },
];

export function getSortedArticles(): Article[] {
  return [...SEED_ARTICLES].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return 0;
  });
}

export interface WorkbookQuiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WorkbookModule {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  keyTakeaways: string[];
}

export interface WorkbookItem {
  id: string;
  slug: string;
  title: string;
  category: "Brand & Authority" | "Environment" | "Execution" | "Storytelling & Narrative";
  version: string;
  fileSize: string;
  pdfUrl: string;
  description: string;
  targetAudience: string;
  modules: WorkbookModule[];
  quizzes: WorkbookQuiz[];
}

export const WORKBOOKS_DATA: WorkbookItem[] = [
  {
    id: "wb-1",
    slug: "building-authority-workbook",
    title: "Building Authority Workbook",
    category: "Brand & Authority",
    version: "v1.0",
    fileSize: "40.9 KB",
    pdfUrl: "/workbooks/Building-Authority-Workbook.pdf",
    description: "Practical frameworks for establishing industry expertise, trust, and premium market positioning.",
    targetAudience: "Founders, Web3 Leaders, Content Creators, and BowDAO Members.",
    modules: [
      {
        number: "01",
        title: "The Three Pillars of Authority",
        subtitle: "Competence, Consistency, and Character",
        summary: "Authority is built on three non-negotiable foundations: proven competence, reliable presence, and unshakeable character.",
        keyTakeaways: ["Competence: Proof of knowledge and results.", "Consistency: Reliable presence and messaging.", "Character: Integrity, ethics, and trust."]
      },
      {
        number: "02",
        title: "The Authority Audit",
        subtitle: "Evaluating Market Gravity Across 5 Dimensions",
        summary: "Audit your domain proof, stance clarity, content depth, network gravity, and emotional composure on a 1-10 scale.",
        keyTakeaways: ["Identify your highest-leverage authority proof point.", "Score your emotional composure under public pressure.", "Eliminate low-signal distractions."]
      },
      {
        number: "03",
        title: "The Conviction Engine",
        subtitle: "Neutrality Creates Zero Gravity",
        summary: "True authority requires clear, defendable opinions and a non-negotiable professional code.",
        keyTakeaways: ["Define what you believe that most people in your field get wrong.", "Establish your non-negotiable professional code.", "Balance borrowed vs owned authority."]
      },
      {
        number: "04",
        title: "The 90-Day Authority Build",
        subtitle: "Actionable Milestones for Compounding Trust",
        summary: "A step-by-step 90-day roadmap for publishing flagship intellectual property and building category leadership.",
        keyTakeaways: ["Publish 1 flagship piece of original research or breakdown.", "Maintain daily live audio or text presence.", "Audit network connections every 30 days."]
      }
    ],
    quizzes: [
      {
        id: "q-1-1",
        question: "What are the three core pillars of authority outlined by Vee?",
        options: [
          "Money, Hype, and Virality",
          "Competence, Consistency, and Character",
          "Followers, Aesthetics, and Paid Ads",
          "Speed, Volume, and Discounting"
        ],
        correctIndex: 1,
        explanation: "Authority relies on Competence (proof of results), Consistency (reliable presence), and Character (ethics and trust)."
      },
      {
        id: "q-1-2",
        question: "Why does neutrality fail to build market authority?",
        options: [
          "Neutrality creates zero gravity because authority requires clear, defendable convictions.",
          "Neutrality costs too much money to maintain.",
          "Algorithms penalize neutral accounts automatically.",
          "Neutrality is illegal in Web3 governance."
        ],
        correctIndex: 0,
        explanation: "As Vee notes in Module 3, neutrality creates zero gravity. Authority demands clear, principled stances."
      }
    ]
  },
  {
    id: "wb-2",
    slug: "building-atmosphere-workbook-v2",
    title: "Building Atmosphere Workbook (v2)",
    category: "Environment",
    version: "v2.0",
    fileSize: "29.9 KB",
    pdfUrl: "/workbooks/Building-Atmosphere-Workbook-v2.pdf",
    description: "Crafting an engaging brand presence, live Spaces vibe, community tone, and safety ecosystem.",
    targetAudience: "CSN Hosts, Community Managers, Event Hosts, and Voice Leaders.",
    modules: [
      {
        number: "01",
        title: "Environmental Aesthetics & Vibe",
        subtitle: "The First 3 Seconds of First Impression",
        summary: "Atmosphere is felt before it is understood. Design your visual, auditory, and conversational entry points.",
        keyTakeaways: ["Set a calm, confident, and high-energy room tone.", "Use clean visual branding and consistent audio staging.", "Welcome new listeners with clear room expectations."]
      },
      {
        number: "02",
        title: "Tone of Voice & Conversational Cadence",
        subtitle: "Balancing Warmth and Command",
        summary: "Mastering the host posture: guiding the conversation without dominating or letting noise take over.",
        keyTakeaways: ["Speak with deliberate cadence and zero filler.", "Acknowledge speakers quickly and manage transitions.", "Maintain poise when unexpected chaos occurs."]
      },
      {
        number: "03",
        title: "Energy Management & Safety",
        subtitle: "Protecting Community Morale",
        summary: "Proactively managing bad actors, toxic energy, and off-topic detours to keep the room focused on value.",
        keyTakeaways: ["Mute or pass mic decisively when rules are broken.", "Re-anchor the core topic every 15 minutes.", "Protect active listeners from bad-faith disruption."]
      }
    ],
    quizzes: [
      {
        id: "q-2-1",
        question: "How frequently should a live audio host re-anchor the room's main topic?",
        options: [
          "Every 60 minutes",
          "Every 15 to 20 minutes as new listeners join",
          "Only at the very end of the broadcast",
          "Never, listeners should figure it out"
        ],
        correctIndex: 1,
        explanation: "In live audio Spaces, re-anchoring every 15-20 minutes ensures incoming audience members instantly understand room context."
      }
    ]
  },
  {
    id: "wb-3",
    slug: "building-momentum-workbook",
    title: "Building Momentum Workbook",
    category: "Execution",
    version: "v1.0",
    fileSize: "37.1 KB",
    pdfUrl: "/workbooks/Building-Momentum-Workbook.pdf",
    description: "Action plans for building consistent forward motion, launch velocity, and audience engagement.",
    targetAudience: "Operators, Product Founders, and Growth Leads.",
    modules: [
      {
        number: "01",
        title: "Launch Velocity & Action Loops",
        subtitle: "Turning Intent into Immediate Motion",
        summary: "Momentum is mass in motion. Small, daily completed tasks build compound velocity faster than sporadic big launches.",
        keyTakeaways: ["Ship daily micro-milestones.", "Reduce time between idea and execution.", "Build public proof of progress."]
      },
      {
        number: "02",
        title: "Friction Audit & Elimination",
        subtitle: "Removing Bottlenecks to Execution",
        summary: "Audit every step in your workflow to eliminate hesitation, complex approvals, and technical roadblocks.",
        keyTakeaways: ["Identify top 3 friction points in your routine.", "Automate or delegate repetitive tasks.", "Set rigid start times."]
      },
      {
        number: "03",
        title: "The 90-Day Momentum Flywheel",
        subtitle: "Self-Sustaining Community Growth",
        summary: "Connect your execution loop directly to community conviction: Action -> Proof -> Trust -> Growth -> Action.",
        keyTakeaways: ["Lock in 1,000 consecutive days of showing up.", "Reward consistent community contributors.", "Never break the chain."]
      }
    ],
    quizzes: [
      {
        id: "q-3-1",
        question: "What produces compound momentum faster in Web3 communities?",
        options: [
          "One massive paid influencer campaign every 6 months",
          "Small, daily completed execution loops and persistent presence",
          "Changing project branding every week",
          "Hiding development progress until completion"
        ],
        correctIndex: 1,
        explanation: "As demonstrated by the Doginal Dogs 1,000-day cadence, daily consistent showing up produces unshakeable compound momentum."
      }
    ]
  },
  {
    id: "wb-4",
    slug: "signal-and-story-workbook",
    title: "Signal and Story Workbook",
    category: "Storytelling & Narrative",
    version: "v1.0",
    fileSize: "20.7 KB",
    pdfUrl: "/workbooks/Signal-and-Story-Workbook.pdf",
    description: "Separating key message signals from background noise and shaping them into resonant stories.",
    targetAudience: "Content Creators, Brand Strategists, and Copywriters.",
    modules: [
      {
        number: "01",
        title: "Signal vs Noise Filtration",
        subtitle: "Cutting Through the Timeline Clutter",
        summary: "Identify the 1% core truth in your industry and strip away jargon, hype words, and superficial noise.",
        keyTakeaways: ["Focus on immutable principles over temporary trends.", "Write with absolute clarity and zero fluff.", "State the core answer in the first sentence."]
      },
      {
        number: "02",
        title: "The Core Hook & Story Arc",
        subtitle: "Capturing Attention in 3 Seconds",
        summary: "Structure messaging around clear conflict, transformation, and undeniable resolution.",
        keyTakeaways: ["Hook with a bold, truthful premise.", "Deliver high-value proof in the body.", "End with a memorable call to action."]
      }
    ],
    quizzes: [
      {
        id: "q-4-1",
        question: "What is the primary objective of Signal filtration in brand communication?",
        options: [
          "To post as many words as possible",
          "To strip away noise and state the core truth directly and clearly",
          "To use complex technical jargon to confuse competitors",
          "To copy competitor press releases"
        ],
        correctIndex: 1,
        explanation: "Signal communication isolates the essential truth, eliminating fluff so the core value is immediately obvious."
      }
    ]
  },
  {
    id: "wb-5",
    slug: "the-narrative-workbook-v2",
    title: "The Narrative Workbook (v2)",
    category: "Storytelling & Narrative",
    version: "v2.0",
    fileSize: "31.1 KB",
    pdfUrl: "/workbooks/The-Narrative-Workbook-v2.pdf",
    description: "Core messaging architecture, founding myth, villain identification, and value alignment.",
    targetAudience: "NFT Projects, Brand Founders, and DAO Committees.",
    modules: [
      {
        number: "01",
        title: "The Founding Creation Myth",
        subtitle: "Stories People Want to Live Inside",
        summary: "Every civilization-defining movement relies on an authentic creation myth that explains why the project exists.",
        keyTakeaways: ["Anchor the myth in real sacrifices and early conviction.", "Communicate the origin story consistently.", "Make the shared identity the primary asset."]
      },
      {
        number: "02",
        title: "Villain / Enemy Identification",
        subtitle: "What Are You Standing Against?",
        summary: "Clarity comes from contrast. Define the anti-values (extractive VCs, short-term flipping, fake hype) your community rejects.",
        keyTakeaways: ["Identify the industry status quo you are replacing.", "Rally the community around shared standards.", "Enforce organic cultural gravity."]
      },
      {
        number: "03",
        title: "The Core Manifesto",
        subtitle: "Values Are What You Do When Expensive",
        summary: "Drafting a concise, load-bearing community manifesto that guides long-term decisions through bear and bull cycles.",
        keyTakeaways: ["Write 5 core non-negotiable principles.", "Publish the manifesto as proof of intent.", "Reward community members who live the values."]
      }
    ],
    quizzes: [
      {
        id: "q-5-1",
        question: "According to Vee's Narrative framework, why is a founding myth essential?",
        options: [
          "It allows founders to charge higher mint fees",
          "It builds a shared story and identity that people want to live inside",
          "It is required by legal regulators",
          "It automates smart contract deployments"
        ],
        correctIndex: 1,
        explanation: "A great founding myth creates cultural gravity, giving holders a shared identity and reason to belong that outlasts market cycles."
      }
    ]
  }
];
