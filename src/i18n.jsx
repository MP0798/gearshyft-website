import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Route mappings: NL path -> EN path
const nlToEn = {
  '/': '/en',
  '/over': '/en/about',
  '/diensten': '/en/services',
  '/diensten/werkprocessen': '/en/services/work-processes',
  '/diensten/tools-en-systemen': '/en/services/tools-and-systems',
  '/diensten/data-op-orde': '/en/services/data-management',
  '/werkwijze': '/en/approach',
  '/contact': '/en/contact',
  '/privacy': '/en/privacy',
  '/faq': '/en/faq',
  '/blog': '/en/blog',
  '/projecten': '/en/projects',
};

// Reverse mapping: EN path -> NL path
const enToNl = Object.fromEntries(
  Object.entries(nlToEn).map(([nl, en]) => [en, nl])
);

// Internal path mapping for useLocalizedPath hook
// Maps canonical NL paths to their EN equivalents (without /en prefix consideration)
const pathMap = {
  '/': { nl: '/', en: '/en' },
  '/over': { nl: '/over', en: '/en/about' },
  '/diensten': { nl: '/diensten', en: '/en/services' },
  '/diensten/werkprocessen': { nl: '/diensten/werkprocessen', en: '/en/services/work-processes' },
  '/diensten/tools-en-systemen': { nl: '/diensten/tools-en-systemen', en: '/en/services/tools-and-systems' },
  '/diensten/data-op-orde': { nl: '/diensten/data-op-orde', en: '/en/services/data-management' },
  '/werkwijze': { nl: '/werkwijze', en: '/en/approach' },
  '/contact': { nl: '/contact', en: '/en/contact' },
  '/privacy': { nl: '/privacy', en: '/en/privacy' },
  '/faq': { nl: '/faq', en: '/en/faq' },
  '/blog': { nl: '/blog', en: '/en/blog' },
  '/projecten': { nl: '/projecten', en: '/en/projects' },
};

const translations = {
  en: {
    // Navbar
    navAbout: 'About',
    navServices: 'Services',
    navApproach: 'Approach',
    navCta: 'Get in Touch',

    // Hero
    heroLine1: "Yesterday's processes",
    heroLine2Before: "don't belong to",
    heroLine2After: "tomorrow's growth.",
    heroDesc: 'We fix operational friction with practical digital workflows, tools, and systems that fit how your team actually works.',
    heroCta: 'See How We Work',

    // Features - Card 1
    card1Title: 'Process First,',
    card1TitleBreak: 'Technology Second',
    card1Desc: "We understand the problem before choosing a solution. AI, automation, or a simpler workflow. We only use what actually helps.",
    card1Label1: 'Process Review',
    card1State1: 'Pending',
    card1Label2: 'Simplify Steps',
    card1State2: 'Active',
    card1Label3: 'Solution Live',
    card1State3: 'Complete',

    // Features - Card 2
    card2Badge: 'Building Mode',
    card2Title: 'We Build,',
    card2TitleBreak: "Not Just Advise",
    card2Desc: "No endless reports or strategy decks. We build practical solutions you can actually use in your daily operations.",
    card2Typewriter: '> Mapping current workflow...\n> Identifying friction points...\n> Building practical solution...\n> Testing with your team...\n> LIVE. Process running smoother.',

    // Features - Card 3
    card3Title: 'Built with',
    card3TitleBreak: 'Your People',
    card3Desc: 'The best solutions come from the people who know the work. We design together with your team, not from behind a desk.',
    card3Confirm: 'Confirm',
    card3Days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    // Philosophy
    philSub: 'Most agencies sell technology as the answer.',
    philMain: 'We start with how',
    philHighlight: 'your work',
    philEnd: 'actually gets done.',

    // Protocol
    step01Title: 'Understand the Process',
    step01Desc: 'Before building anything, we walk through your process with the people who do the work. That is where the real insights are.',
    step02Title: 'Build the Solution',
    step02Desc: 'A workflow, tool, or system. Whatever fits. We build something practical that solves the actual problem.',
    step03Title: 'Make It Stick',
    step03Desc: 'A solution only works if your team actually uses it. We make sure it fits naturally into how people already work.',
    stepPrefix: 'Step',

    // Contact
    contactTitle: 'Let\'s have',
    contactHighlight: 'that conversation.',
    contactIntro: 'Tell us what\'s on your mind. No obligations, no sales pitch. Just an honest look at what could work better.',
    contactNameLabel: 'Name',
    contactNamePlaceholder: 'Your name',
    contactEmailLabel: 'Email',
    contactEmailPlaceholder: 'your@email.com',
    contactMessageLabel: 'Message',
    contactMessagePlaceholder: 'What process or challenge are you dealing with?',
    contactSubmit: 'Send Message',
    contactSending: 'Sending...',
    contactSuccessTitle: 'Message sent!',
    contactSuccessText: 'We\'ll get back to you as soon as possible.',
    contactSpamNote: 'Check your spam folder if you don\'t see our confirmation email.',
    contactError: 'Something went wrong. Try again or email us directly.',
    contactOrEmail: 'Rather just email?',
    contactDirectEmail: 'Send us a direct email',
    contactOrCall: 'Rather talk it through?',
    contactCalendly: 'Schedule an introduction',

    // CTA Banners
    ctaBanner1Text: 'Curious what we could improve for you?',
    ctaBanner1Btn: 'Get in Touch',
    ctaBanner2Text: 'Ready to make your processes work?',
    ctaBanner2Btn: 'Start the Conversation',

    // Footer
    footerDesc: 'Practical digital solutions for businesses that want their processes to be simpler, clearer, and less frustrating.',
    footerNav: 'Navigation',
    footerNavItems: ['Services', 'About', 'Approach', 'Blog'],
    footerContact: 'Contact',
    footerStatus: 'Available for Projects',
    footerKvk: 'CoC: 91814219',
    footerPrivacy: 'Privacy',

    // Blog
    blogLabel: 'Blog',
    blogTitle: 'Insights from Practice',
    blogIntro: 'Tips, cases and lessons from the field. How real businesses improve their processes, without the jargon.',
    blogReadMore: 'Read More',
    blogBackLink: 'Back to Blog',

    // Projects Page
    projectsLabel: 'Projects',
    projectsTitle: 'Built, not just talked about.',
    projectsIntro: 'Real projects, real results. This is what it looks like when we get to work.',
    projectsItems: [
      {
        name: 'RoosterHub',
        tag: 'Work Processes',
        slug: 'work-processes',
        situation: 'A call center managed shift schedules in Excel. Privacy-sensitive data was shared via email, creating a GDPR risk. Onboarding new planners took 2 weeks because the process was undocumented and overly complex.',
        approach: 'We walked through the entire scheduling process with the team on the floor. Simplified the steps, removed unnecessary handoffs, and built a lightweight scheduling app that does exactly what they needed.',
        results: [
          'Cost: \u20AC1.10 per employee per month',
          'Onboarding time: from 2 weeks to 1 day',
          'GDPR risk eliminated',
          'Zero Excel files in the process',
        ],
      },
      {
        name: 'Desk to Dash',
        tag: 'Tools & Systems',
        slug: 'tools-and-systems',
        situation: 'A freelancer managed hours, invoices, expenses, VAT, and planning in 6 separate tools. Switching between apps, manually copying data, and reconciling numbers at the end of each month. Hours lost every week.',
        approach: 'We mapped out all the flows, identified where data was duplicated or manually transferred, and built a single platform that brings everything together.',
        results: [
          'From 6 tools to 1 platform',
          'Month-end close: from a full day to a few clicks',
          'One login, one overview',
          'Ready for the accountant automatically',
        ],
      },
      {
        name: 'Industrial company',
        tag: 'Data Management',
        slug: 'data-management',
        situation: 'A mid-sized industrial company managed operational data across 430+ Excel tabs. Inconsistent formats, no overview, and a team losing hours every week manually merging data. Nobody could say with certainty which numbers were correct.',
        approach: 'We migrated everything to a central database with automated imports from existing sources and quality checks that catch errors before they end up in a report.',
        results: [
          '430+ Excel tabs replaced by one database',
          'Live dashboard for the entire team',
          'Automated data imports and quality checks',
          'Hours per week freed up for actual work',
        ],
      },
    ],
    projectsSituationLabel: 'The situation',
    projectsApproachLabel: 'What we did',
    projectsResultsLabel: 'Results',
    projectsServiceLink: 'More about this service',

    // Mobile menu
    menuOpen: 'Open menu',
    menuClose: 'Close menu',

    // Privacy Policy
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'GearShyft respects your privacy. This policy explains what data we collect, why, and what your rights are.',
    privacySectionWho: 'Who are we?',
    privacySectionWhoText: 'GearShyft is a process improvement consultancy based in the Netherlands. For questions about this privacy policy, you can reach us at max@gearshyft.nl.',
    privacySectionWhat: 'What data do we collect?',
    privacySectionWhatText: 'When you use our contact form, we collect your name, email address, and the message you send us. We do not collect any other personal data.',
    privacySectionWhy: 'Why do we collect this data?',
    privacySectionWhyText: 'Solely to respond to your inquiry. We do not use your data for marketing, profiling, or any other purpose.',
    privacySectionCookies: 'Cookies and tracking',
    privacySectionCookiesText: 'This website uses Google Analytics (GA4) to understand how visitors use our site. GA4 collects anonymized usage data and may place cookies. We do not use this data for marketing or profiling. You can opt out via your browser settings or a plugin like Google Analytics Opt-out.',
    privacySectionSharing: 'Sharing with third parties',
    privacySectionSharingText: 'We do not sell or share your personal data with third parties, except where necessary to process your contact form submission (e.g., our form provider).',
    privacySectionRights: 'Your rights (GDPR)',
    privacySectionRightsText: 'Under the General Data Protection Regulation (GDPR), you have the right to access, correct, or delete your personal data. You can also object to processing or request data portability. To exercise these rights, email us at max@gearshyft.nl.',
    privacySectionChanges: 'Changes to this policy',
    privacySectionChangesText: 'We may update this policy from time to time. The latest version is always available on this website.',
    privacyClose: 'Close',

    // About Page
    aboutLabel: 'About GearShyft',
    aboutTitle: 'Process first, technology second.',
    aboutIntro: 'GearShyft helps businesses fix their processes. Not with more tools, but with practical solutions that fit how your team actually works.',

    // Gear metaphor statement
    aboutGearLine1: 'Your engine doesn\'t work harder.',
    aboutGearLine2: 'You just go',
    aboutGearHighlight: 'faster.',
    aboutGearDesc: 'In a higher gear, you get more out of the same RPM. Less effort, more output. That\'s GearShyft.',

    // About Max
    maxPhotoAlt: 'Max Poppes - Founder of GearShyft',
    aboutMaxLabel: 'The person behind GearShyft',
    aboutMaxName: 'Max Poppes',
    aboutMaxRole: 'Founder',
    aboutMaxBio: 'Background in entrepreneurship, always drawn to technology and making things simpler. Experience across SaaS, data, and energy. In every role, the same thing stood out: there was always room for a more efficient way. That\'s what I dig into.',
    aboutMaxBio2: 'My interest in automation started early. Over ten years ago, as a high school student, I gave a presentation with Pepper, the humanoid robot. After that I worked at Pegamento, the largest RPA implementation partner in the Netherlands, where my father built the company around process automation and AI. Later I sold a SaaS platform that used machine learning to match companies with talent. That combination of understanding processes and applying technology smartly, it\'s just in my DNA.',
    aboutMaxQuote: 'I\'d rather build something smart than do the same thing every day.',
    aboutMaxOrigin: 'After my studies and several internships, the same pattern kept emerging: improving processes, building tools, helping teams work with technology instead of around it. No more doubt, that became GearShyft.',

    // What GearShyft is (and isn't)
    aboutIdentityTitle: 'What GearShyft is',
    aboutIdentityIs: [
      'A practical builder who makes processes work better',
      'Someone who honestly assesses what\'s needed',
      'A partner who implements, not just advises',
    ],
    aboutIdentityIsNotTitle: 'And what it\'s not',
    aboutIdentityIsNot: [
      'Not a consultancy that only delivers slides',
      'Not an AI agency that slaps AI on everything',
      'Not a software shop that pushes technology',
    ],

    // How we work (values)
    aboutValuesTitle: 'How we work',
    aboutValues: [
      { title: 'Process first', text: 'We understand the problem before picking a solution. Technology is a tool, not the starting point.', number: '01' },
      { title: 'Build, not advise', text: 'We deliver working solutions, not decks and reports. You get something you can use tomorrow.', number: '02' },
      { title: 'With your people', text: 'The best solutions come from the people who do the work. We build together with your team.', number: '03' },
    ],

    // What to expect
    aboutExpectTitle: 'What to expect',
    aboutExpectItems: [
      { title: 'Short lines', text: 'No layers, no lead time. Direct contact, fast decisions.' },
      { title: 'Direct impact', text: 'No months-long programs. We focus on what makes the biggest difference right now.' },
      { title: 'No nonsense', text: 'No buzzwords, no unnecessary complexity. Just solutions that work.' },
    ],
    aboutCta: 'Get in Touch',

    // Services Page
    servicesLabel: 'Services',
    servicesTitle: 'What we can do for you.',
    servicesIntro: 'Every business is different. We tailor our approach to your specific situation, but these are the areas where we help most.',
    servicesReadMore: 'Learn more',
    servicesCta: 'Discuss your situation',
    servicesAnalysisLabel: 'Every project starts here',
    servicesAnalysisTitle: 'Process Analysis',
    servicesAnalysisDesc: 'Before we improve, build, or organize anything, we first understand how your work actually gets done. We walk through your processes with the people on the floor, find the friction, and determine what will have the most impact.',
    servicesThenLabel: 'Then we get to work',
    service_werkprocessen_title: 'Improving Work Processes',
    service_werkprocessen_desc: 'Processes that worked at 10 people break at 50. We find where things go wrong and redesign how work gets done. Practical, on the floor, with your team.',
    service_toolsEnSystemen_title: 'Building Tools & Systems',
    service_toolsEnSystemen_desc: 'Spreadsheets, loose tools, manual workarounds. We build practical software that brings everything together in one place. Custom-built for how you work.',
    service_dataOpOrde_title: 'Organizing Your Data',
    service_dataOpOrde_desc: 'Scattered files, inconsistent formats, no overview. We structure your data, build dashboards, and make sure the right information is always at hand.',

    // Service Detail Pages
    serviceDetailBackLink: 'All services',
    serviceDetailCta: 'Discuss this with us',
    serviceDetailForWhoTitle: 'Is this for you?',

    serviceDetail_werkprocessen: {
      label: 'Improving Work Processes',
      intro: 'Your process works. Kind of. But it takes too long, things fall through the cracks, and onboarding new people takes weeks because nobody knows exactly how things should be done. That is not something you learn to live with. That is something you fix.',
      sections: [
        { title: 'On the floor, not in the boardroom', text: 'We always start with the people who do the work. Shadowing, asking questions, observing. Not for half an hour, but for at least a full day. Where is work being done twice? Where is someone waiting on someone else? Which step gets skipped every time because nobody understands why it exists? The real bottlenecks are not in an org chart or a process document from three years ago. They are in the daily grind, in the things people do "because that is how we have always done it". We do not just talk to management. We talk to the people who execute the process every day. They know exactly where it breaks down, and they usually already have ideas for how to fix it.' },
        { title: 'What we usually find', text: 'In almost every company, we see the same patterns. Information maintained in three or four places at once. Steps that once made sense but have served no purpose for years. People who have built workarounds because the official process does not work. Knowledge that lives in people\'s heads instead of in systems. That is not your team failing. That is what happens when a company grows and the processes do not grow with it. The good news: these patterns are recognizable. That means the solutions are too. Not every problem requires a unique approach. Sometimes the simplest fix is also the best one.' },
        { title: 'From chaos to a process that works', text: 'Based on what we see, we redesign the process. Not on paper in a meeting room, but together with your team. Fewer steps, clearer responsibilities, less room for errors. We cut what is redundant and make explicit what was implicit. No assumptions about how it should work, but agreements about how it will work. The result is a way of working you can explain to a new colleague in 5 minutes. Not a thick manual nobody reads, but a clear process that speaks for itself. And because it was designed together with the team, it does not feel like something imposed from above.' },
        { title: 'Start small, then scale', text: 'We test every change with a small team or a single process first. Does it work in practice? Then we expand. Does something not work? We adjust. No big change management program, no months-long implementation, no steering committee meeting every two weeks about a timeline. Usually the first improvements are live within 2 to 3 weeks. That is intentional. Quick results build trust, and trust makes the next step easier. This way the improvement grows organically through the organization instead of becoming a project everyone dreads.' },
        { title: 'When the difference becomes visible', text: 'An improved process does not always show up in the numbers right away. You notice it in the daily routine. Less firefighting. Fewer "how was this supposed to work again?" questions. New colleagues who are productive in days instead of weeks. Clients who no longer need to follow up asking where things stand. We do not measure results in thick reports but in the time and frustration your team saves. For a team of 25 people, saving 20 minutes per person per day adds up to almost 180 working days per year. That is not a small difference. That is a workday that runs smoother. Every single day.' },
      ],
      forWho: 'Teams where things take too long, errors keep repeating, or everyone does it slightly differently. Companies that are growing and notice their processes are not keeping up. Organizations where onboarding new people takes weeks instead of days.',
      caseTitle: 'RoosterHub',
      caseText: 'A call center with 45 employees managed shift schedules in Excel. Privacy-sensitive data was shared via email, a direct GDPR risk. Planners spent hours every week puzzling, and sick leave always meant improvising. We walked through the entire scheduling process with the team, removed unnecessary steps, and built a lightweight scheduling app that does exactly what they needed. The team had input in the design, which accelerated adoption. Cost: 1.10 per employee per month. Onboarding time for new planners: from 2 weeks to 1 day. The team now has more time for what actually matters: quality conversations with customers.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Building Tools & Systems',
      intro: 'Excel as a database. WhatsApp as a ticket system. A shared folder where nobody can find anything anymore. Sound familiar? You have outgrown your current tooling. That is not a problem, that is growth. But it becomes a problem when your team loses time every day on tools that no longer fit how you work.',
      sections: [
        { title: 'One tool instead of six', text: 'We replace the patchwork of separate tools, spreadsheets, and workarounds with a system that fits your work. That can be an internal dashboard, a client portal, a planning tool, or a platform that combines multiple processes. The starting point is always your work process, not the technology. We do not build an off-the-shelf software package you have to adapt to. We build software that adapts to you. That sounds like a sales pitch, but the difference is concrete: we do not start with features but with the question "what does your team need to do every day, and what is getting in the way?"' },
        { title: 'Technology that fits', text: 'We choose technology based on your situation, not based on what is trendy. Sometimes a simple web application is enough. Sometimes you need an integration with existing systems. And sometimes the best solution is a smarter use of tools you already have, just configured differently. We are not tied to a specific platform or framework. We use what works. That means you do not become dependent on a proprietary system that only we can maintain. What we build is yours, built with established technology that any good developer can pick up.' },
        { title: 'Built with you, not for you', text: 'We build in short rounds of 1 to 2 weeks. After each round we show what we have and ask for feedback. Your team tests from day one. Not as a formality, but because early feedback is the difference between software that technically works and software people actually want to use. We have seen too often what happens when a tool is only shown to the team at delivery: resistance, workarounds, and eventually back to Excel. By involving your team from the start, we prevent that. The result is software your team stands behind, because they contributed to building it.' },
        { title: 'Deliver, hand over, done', text: 'We deliver working software, not prototypes or mockups. Including documentation and a proper handover to your team. We make sure at least two people in your organization understand the system and can make small adjustments themselves. Want to adjust or expand it later? You can, with or without us. The system belongs to you, not to us. That is a deliberate choice. We want you to be independent. No monthly license that keeps getting more expensive, no vendor lock-in. A tool that is yours and that you can manage yourselves.' },
        { title: 'After delivery', text: 'A good tool is only good if it is still being used three months later. That is why we check in after delivery. Is the tool being used as intended? Are adjustments needed now that the team works with it daily? Usually these are small things: a field that should work differently, a step that turns out to be redundant, a report that needs slightly different information. These adjustments make the difference between "a tool we have" and "a tool we would not want to work without". The latter is what we aim for.' },
      ],
      forWho: 'Businesses stuck on their current tooling but not looking for a year-long IT project. Teams that lose time every day switching, copying, and doing manual work that should have been automated long ago. Organizations that need custom solutions but do not have enterprise budgets.',
      caseTitle: 'Desk to Dash',
      caseText: 'A freelancer managed hours, invoices, expenses, VAT, and planning in 6 separate tools. Each tool did one thing, but nothing was connected. End of the month meant a full evening of manually transferring and checking data. We mapped out all the flows, eliminated overlap, and built a platform that brings everything together. One login, a clear overview, and at the end of the month everything ready for the accountant in a few clicks. The freelancer now saves 6 hours per month on administration. More importantly: the constant stress of "did I forget something?" is gone.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Organizing Your Data',
      intro: 'You have the data. Somewhere. Spread across dozens of spreadsheets, in different formats, maintained by different people. Nobody can say with certainty which number is correct. And every time someone needs a report, the puzzle starts all over again. That is not just inconvenient. That costs you money, time, and reliability.',
      sections: [
        { title: 'First, understand what you have', text: 'We start with an inventory. What data do you have, where does it live, who maintains it, and how is it used? This alone is often an eye-opener. Most companies have no idea how much time they spend searching, manually transferring, and checking whether numbers are correct. We map it out, including what it costs. Not in abstract terms, but in hours per week and errors per month. That gives a clear picture of the urgency. Often it turns out that a team of 15 people collectively loses a full work week per month on data-related manual work. That is a problem that does not solve itself.' },
        { title: 'The hidden cost of bad data', text: 'Bad data is not just annoying, it is expensive. Every time someone has to verify a number before it goes into a report, that costs time. Every error that only surfaces when a client asks about it, that costs trust. Every discussion in a meeting about which figure is correct, that costs energy. And it creeps in. Nobody sees it as a big problem because everyone is used to it. But add it up over a month, a quarter, a year, and you are talking about thousands of euros in lost productivity. Not counting the decisions made based on wrong information.' },
        { title: 'A single source of truth', text: 'We build a central place for your data. No more spreadsheets as databases, but a real structure. Consistent formats, automated imports from your existing sources, and quality checks that catch errors before they end up in a report. The result is data you can trust without having to double-check it every time. That changes more than you think. Meetings get shorter because nobody argues about which number is right anymore. Reports are faster because the data is already clean. And decisions get better because they are based on information you can trust. A single source of truth is not just convenient, it is the foundation for everything that comes after.' },
        { title: 'Insight instead of gut feeling', text: 'On top of the clean data we build dashboards your team can use every day. Not a one-time report that ends up in a drawer, but live insight into what is happening in your operations. Which processes are running, where delays are occurring, how this week compares to last month. Practical visualizations that answer the questions your team asks every day. And we make sure you can maintain and adjust them yourselves. No dependency on us for every small change. The goal is that your team can work with data independently, not that we manage a dashboard only we understand.' },
        { title: 'Data quality that lasts', text: 'The biggest pitfall in data projects is that things slowly slide back to the old situation after delivery. New data comes in through the wrong format, someone creates a workaround, and before you know it you have three versions of the truth again. That is why we do not just build the structure but also the guardrails. Automatic validation on input, alerts for anomalies, and clear agreements about who is responsible for which data. This way quality stays on track without someone having to constantly chase it.' },
      ],
      forWho: 'Businesses where nobody can say with certainty whether the numbers are right. Teams that spend more time searching for and copying data than actually doing something with it. Organizations that want to grow but need to get their data foundation in order before they can make reliable decisions.',
      caseTitle: 'Industrial company',
      caseText: 'A mid-sized industrial company managed operational data across 430+ Excel tabs. Inconsistent formats, no overview, and a team losing hours every week manually merging data for management reports. Errors were only discovered when a client asked about them. We mapped all data sources, cleaned up the structure, and migrated everything to a central database with automated imports and quality checks. On top of that, a live dashboard the team uses daily. The result: the weekly report that used to take 6 hours is now the press of a button. The team spends those hours on their actual work, and management trusts the numbers again.',
    },

    // Approach Page
    approachLabel: 'Our Approach',
    approachTitle: 'How we get from problem to solution.',
    approachIntro: 'No rigid methodology or endless discovery phases. We work pragmatically, close to your team, and deliver results you can see.',
    approachSteps: [
      { title: 'Listen & Understand', text: 'We start by walking through your process with the people who do the actual work. No assumptions, no shortcuts. This is where the real insights come from.' },
      { title: 'Analyze & Design', text: 'Based on what we learn, we map out where the friction is and design a practical solution. Not the most complex one, but the one that fits.' },
      { title: 'Build & Implement', text: 'We build the solution and implement it with your team. Not a handoff, but hands-on. We make sure it works in practice, not just on paper.' },
      { title: 'Verify & Adjust', text: 'After launch, we check if it actually works the way it should. If something needs tweaking, we adjust. The goal is a process that runs smoothly without us.' },
    ],
    approachCta: 'Start the Conversation',

    // FAQ Page
    faqLabel: 'FAQ',
    faqTitle: 'Questions we hear often.',
    faqStillQuestions: 'Still have questions?',
    faqCta: 'Get in Touch',
    faqItems: [
      { q: 'What kind of businesses do you work with?', a: 'We work with growing businesses that feel their processes are holding them back. Usually 10-200 people, across different industries. If your team spends too much time on things that should be simpler, we can probably help.' },
      { q: 'Do you only work with technology?', a: 'No. Technology is a tool, not the goal. Sometimes the best solution is a simpler process, a clearer workflow, or better communication. We figure out what fits.' },
      { q: 'How long does a typical project take?', a: 'It depends on the scope, but most projects run 4 to 12 weeks. We prefer short, focused engagements where you see results quickly.' },
      { q: 'What does it cost?', a: 'Every project is different. We work with fixed project fees so you know what to expect. Get in touch and we will give you an honest estimate.' },
      { q: 'Where are you based?', a: 'We are based in the Netherlands and work with companies throughout the Benelux region. We work both on-site and remotely, depending on what the project needs.' },
      { q: 'Do I need to overhaul my entire business?', a: 'No. We start small and focused. One process, one problem. Once that works, we can look at what else could improve. No big-bang transformations.' },
      { q: 'What if my team resists the changes?', a: 'That is exactly why we work alongside your team instead of handing down a plan from above. People accept changes they helped shape. We build with them, not for them.' },
      { q: 'How do you measure if an improvement actually works?', a: 'We define clear, concrete metrics before we start. Think: time saved per week, fewer errors, faster turnaround. After delivery we measure against that baseline.' },
      { q: 'What is the difference between you and a traditional consultancy?', a: 'Traditional consultancies write reports. We build solutions. We do the actual work on the shop floor and deliver something your team can use the next day.' },
      { q: 'Can I get advice without implementation?', a: 'Yes, but we are honest: advice without action rarely changes anything. We can do a process scan to map your bottlenecks and give concrete recommendations. What you do with it is up to you.' },
      { q: 'What happens after a project ends?', a: 'You keep everything we built. We make sure your team can maintain it independently. Need support later? We are a phone call away, but the goal is that you do not need us anymore.' },
      { q: 'Do you use AI in your projects?', a: 'Only when it genuinely helps. We are not an AI agency. If a spreadsheet or a simple workflow solves the problem, that is what we build. Technology follows the process, not the other way around.' },
    ],
  },

  nl: {
    // Navbar
    navAbout: 'Over Ons',
    navServices: 'Diensten',
    navApproach: 'Werkwijze',
    navCta: 'Neem Contact Op',

    // Hero
    heroLine1: 'Processen van gisteren',
    heroLine2Before: 'horen niet bij',
    heroLine2After: 'groei van morgen.',
    heroDesc: 'Wij lossen operationele frictie op met praktische digitale workflows, tools en systemen die passen bij hoe jullie team echt werkt.',
    heroCta: 'Bekijk Onze Aanpak',

    // Features - Card 1
    card1Title: 'Eerst het Proces,',
    card1TitleBreak: 'Dan de Technologie',
    card1Desc: 'We begrijpen eerst het probleem voordat we een oplossing kiezen. AI, automatisering of een simpelere workflow. We gebruiken alleen wat echt helpt.',
    card1Label1: 'Proces Review',
    card1State1: 'In wacht',
    card1Label2: 'Stappen Vereenvoudigen',
    card1State2: 'Actief',
    card1Label3: 'Oplossing Live',
    card1State3: 'Gereed',

    // Features - Card 2
    card2Badge: 'Bouwmodus',
    card2Title: 'Wij Bouwen,',
    card2TitleBreak: 'Niet Alleen Adviseren',
    card2Desc: 'Geen eindeloze rapporten of strategiedecks. Wij bouwen praktische oplossingen die je daadwerkelijk gebruikt in je dagelijkse operatie.',
    card2Typewriter: '> Huidige workflow in kaart brengen...\n> Frictiepunten identificeren...\n> Praktische oplossing bouwen...\n> Testen met jullie team...\n> LIVE. Proces loopt soepeler.',

    // Features - Card 3
    card3Title: 'Gebouwd met',
    card3TitleBreak: 'Jullie Mensen',
    card3Desc: 'De beste oplossingen komen van de mensen die het werk kennen. We ontwerpen samen met jullie team, niet vanachter een bureau.',
    card3Confirm: 'Bevestig',
    card3Days: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],

    // Philosophy
    philSub: 'De meeste bureaus verkopen technologie als het antwoord.',
    philMain: 'Wij beginnen bij hoe',
    philHighlight: 'jullie werk',
    philEnd: 'werkelijk gedaan wordt.',

    // Protocol
    step01Title: 'Het Proces Begrijpen',
    step01Desc: 'Voordat we iets bouwen, lopen we het proces door met de mensen die het werk doen. Daar zitten de echte inzichten.',
    step02Title: 'De Oplossing Bouwen',
    step02Desc: 'Een workflow, tool of systeem. Wat het beste past. We bouwen iets praktisch dat het echte probleem oplost.',
    step03Title: 'Zorgen dat het Blijft Werken',
    step03Desc: 'Een oplossing werkt alleen als je team het ook echt gebruikt. We zorgen dat het natuurlijk past in hoe mensen al werken.',
    stepPrefix: 'Stap',

    // Contact
    contactTitle: 'Laten we',
    contactHighlight: 'dat gesprek voeren.',
    contactIntro: 'Vertel ons wat er speelt. Geen verplichtingen, geen verkooppraatje. Gewoon een eerlijke blik op wat beter kan.',
    contactNameLabel: 'Naam',
    contactNamePlaceholder: 'Je naam',
    contactEmailLabel: 'E-mail',
    contactEmailPlaceholder: 'jouw@email.nl',
    contactMessageLabel: 'Bericht',
    contactMessagePlaceholder: 'Met welk proces of uitdaging zitten jullie?',
    contactSubmit: 'Verstuur Bericht',
    contactSending: 'Versturen...',
    contactSuccessTitle: 'Bericht verstuurd!',
    contactSuccessText: 'We nemen zo snel mogelijk contact met je op.',
    contactSpamNote: 'Geen bevestiging ontvangen? Check je spam- of ongewenste-map.',
    contactError: 'Er ging iets mis. Probeer het opnieuw of mail ons direct.',
    contactOrEmail: 'Liever direct mailen?',
    contactDirectEmail: 'Stuur ons een e-mail',
    contactOrCall: 'Liever even sparren?',
    contactCalendly: 'Plan een kennismaking',

    // CTA Banners
    ctaBanner1Text: 'Benieuwd wat we voor jullie kunnen verbeteren?',
    ctaBanner1Btn: 'Neem Contact Op',
    ctaBanner2Text: 'Klaar om jullie processen echt werkend te maken?',
    ctaBanner2Btn: 'Start het Gesprek',

    // Footer
    footerDesc: 'Praktische digitale oplossingen voor bedrijven die hun processen simpeler, duidelijker en minder frustrerend willen maken.',
    footerNav: 'Navigatie',
    footerNavItems: ['Diensten', 'Over Ons', 'Werkwijze', 'Blog'],
    footerContact: 'Contact',
    footerStatus: 'Beschikbaar voor Projecten',
    footerKvk: 'KvK: 91814219',
    footerPrivacy: 'Privacy',

    // Blog
    blogLabel: 'Blog',
    blogTitle: 'Inzichten uit de Praktijk',
    blogIntro: 'Tips, cases en lessen uit het veld. Hoe echte bedrijven hun processen verbeteren, zonder het jargon.',
    blogReadMore: 'Lees Meer',
    blogBackLink: 'Terug naar Blog',

    // Projects Page
    projectsLabel: 'Projecten',
    projectsTitle: 'Gebouwd, niet alleen besproken.',
    projectsIntro: 'Echte projecten, echte resultaten. Dit is hoe het eruitziet als we aan de slag gaan.',
    projectsItems: [
      {
        name: 'RoosterHub',
        tag: 'Werkprocessen',
        slug: 'werkprocessen',
        situation: 'Een callcenter regelde dienstroosters in Excel. Privacygevoelige data ging via e-mail rond, een AVG-risico. Nieuwe planners inwerken duurde 2 weken omdat het proces niet was vastgelegd en onnodig complex was.',
        approach: 'We hebben het hele roosterproces doorgelicht op de werkvloer met het team. Stappen vereenvoudigd, onnodige schakels verwijderd en een lichtgewicht rooster-app gebouwd die precies doet wat ze nodig hadden.',
        results: [
          'Kosten: \u20AC1,10 per medewerker per maand',
          'Inwerktijd: van 2 weken naar 1 dag',
          'AVG-risico weggenomen',
          'Nul Excel-bestanden in het proces',
        ],
      },
      {
        name: 'Desk to Dash',
        tag: 'Tools & Systemen',
        slug: 'tools-en-systemen',
        situation: 'Een ZZP\'er beheerde uren, facturen, kosten, BTW en planning in 6 losse tools. Schakelen tussen apps, handmatig data kopieren en aan het eind van elke maand alles afstemmen. Uren per week kwijt.',
        approach: 'We hebben alle stromen in kaart gebracht, onderzocht waar data gedupliceerd of handmatig overgezet werd, en een platform gebouwd dat alles samenvoegt.',
        results: [
          'Van 6 tools naar 1 platform',
          'Maandafsluiting: van een hele dag naar een paar klikken',
          'E\u00E9n login, \u00E9\u00E9n overzicht',
          'Automatisch klaar voor de boekhouder',
        ],
      },
      {
        name: 'Industrieel bedrijf',
        tag: 'Data op Orde',
        slug: 'data-op-orde',
        situation: 'Een middelgroot industrieel bedrijf beheerde operationele data in meer dan 430 Excel-tabs. Inconsistente formats, geen overzicht, en een team dat uren per week kwijt was aan handmatig data samenvoegen. Niemand kon met zekerheid zeggen welke cijfers klopten.',
        approach: 'Alles gemigreerd naar een centrale database met automatische imports vanuit bestaande bronnen en kwaliteitschecks die fouten vangen voordat ze in een rapport belanden.',
        results: [
          '430+ Excel-tabs vervangen door \u00E9\u00E9n database',
          'Live dashboard voor het hele team',
          'Automatische data-imports en kwaliteitschecks',
          'Uren per week vrij voor het eigenlijke werk',
        ],
      },
    ],
    projectsSituationLabel: 'De situatie',
    projectsApproachLabel: 'Wat we deden',
    projectsResultsLabel: 'Resultaat',
    projectsServiceLink: 'Meer over deze dienst',

    // Mobile menu
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',

    // Privacy Policy
    privacyTitle: 'Privacyverklaring',
    privacyIntro: 'GearShyft respecteert je privacy. In deze verklaring leggen we uit welke gegevens we verzamelen, waarom, en wat je rechten zijn.',
    privacySectionWho: 'Wie zijn wij?',
    privacySectionWhoText: 'GearShyft is een procesverbeteringsbureau gevestigd in Nederland. Voor vragen over dit privacybeleid kun je ons bereiken via max@gearshyft.nl.',
    privacySectionWhat: 'Welke gegevens verzamelen we?',
    privacySectionWhatText: 'Wanneer je ons contactformulier gebruikt, verzamelen we je naam, e-mailadres en het bericht dat je stuurt. We verzamelen geen andere persoonsgegevens.',
    privacySectionWhy: 'Waarom verzamelen we deze gegevens?',
    privacySectionWhyText: 'Uitsluitend om te reageren op je vraag. We gebruiken je gegevens niet voor marketing, profilering of andere doeleinden.',
    privacySectionCookies: 'Cookies en tracking',
    privacySectionCookiesText: 'Deze website gebruikt Google Analytics (GA4) om te begrijpen hoe bezoekers de site gebruiken. GA4 verzamelt geanonimiseerde gebruiksgegevens en kan cookies plaatsen. We gebruiken deze data niet voor marketing of profilering. Je kunt je afmelden via je browserinstellingen of een plugin zoals Google Analytics Opt-out.',
    privacySectionSharing: 'Delen met derden',
    privacySectionSharingText: 'We verkopen of delen je persoonsgegevens niet met derden, behalve waar nodig voor de verwerking van je contactformulier (bijv. onze formulierenprovider).',
    privacySectionRights: 'Je rechten (AVG)',
    privacySectionRightsText: 'Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Je kunt ook bezwaar maken tegen verwerking of verzoeken om gegevensoverdracht. Neem hiervoor contact op via max@gearshyft.nl.',
    privacySectionChanges: 'Wijzigingen in dit beleid',
    privacySectionChangesText: 'We kunnen dit beleid van tijd tot tijd aanpassen. De meest recente versie is altijd beschikbaar op deze website.',
    privacyClose: 'Sluiten',

    // About Page
    aboutLabel: 'Over GearShyft',
    aboutTitle: 'Proces eerst, technologie tweede.',
    aboutIntro: 'GearShyft helpt bedrijven hun processen te verbeteren. Niet met meer tools, maar met praktische oplossingen die passen bij hoe jullie team echt werkt.',

    // Gear metaphor statement
    aboutGearLine1: 'Je motor draait niet harder.',
    aboutGearLine2: 'Je gaat wel',
    aboutGearHighlight: 'sneller.',
    aboutGearDesc: 'In een hogere versnelling haal je meer uit dezelfde toeren. Minder moeite, meer resultaat. Dat is GearShyft.',

    // About Max
    maxPhotoAlt: 'Max Poppes - Oprichter GearShyft',
    aboutMaxLabel: 'De persoon achter GearShyft',
    aboutMaxName: 'Max Poppes',
    aboutMaxRole: 'Oprichter',
    aboutMaxBio: 'Opleiding in ondernemerschap, altijd geinteresseerd in techniek en het leven simpeler maken. Ervaring in SaaS, data en energie. Bij elke ervaring viel hetzelfde op: er kon altijd een efficientieslag gemaakt worden. Dat is waar ik me in vastbijt.',
    aboutMaxBio2: 'Mijn interesse in automatisering begon al vroeg. Meer dan tien jaar geleden stond ik als scholier een presentatie te geven met Pepper, de humanoïde robot. Daarna werkte ik bij Pegamento, de grootste RPA-implementatiepartner van Nederland, waar mijn vader het bedrijf opbouwde rond procesautomatisering en AI. Later verkocht ik een SaaS-platform dat machine learning gebruikte om bedrijven en talent te matchen. Die combinatie van processen begrijpen en technologie slim inzetten, dat zit er gewoon in.',
    aboutMaxQuote: 'Ik bouw liever iets slims dan dat ik elke dag hetzelfde doe.',
    aboutMaxOrigin: 'Na mijn studie en meerdere stages kwam steeds hetzelfde terug: processen verbeteren, tools bouwen, teams laten werken met technologie in plaats van eromheen. Geen twijfel meer, dat werd GearShyft.',

    // What GearShyft is (and isn't)
    aboutIdentityTitle: 'Wat GearShyft is',
    aboutIdentityIs: [
      'Een praktische bouwer die processen beter werkend maakt',
      'Iemand die eerlijk kijkt naar wat nodig is',
      'Een partner die implementeert, niet alleen adviseert',
    ],
    aboutIdentityIsNotTitle: 'En wat het niet is',
    aboutIdentityIsNot: [
      'Geen adviesbureau dat alleen slides levert',
      'Geen AI-agency die overal AI op plakt',
      'Geen softwarebureau dat technologie pusht',
    ],

    // How we work (values)
    aboutValuesTitle: 'Hoe wij werken',
    aboutValues: [
      { title: 'Proces eerst', text: 'We begrijpen het probleem voordat we een oplossing kiezen. Technologie is een middel, niet het startpunt.', number: '01' },
      { title: 'Bouwen, niet adviseren', text: 'We leveren werkende oplossingen, geen decks en rapporten. Je krijgt iets dat je morgen kunt gebruiken.', number: '02' },
      { title: 'Met jullie mensen', text: 'De beste oplossingen komen van de mensen die het werk doen. We bouwen samen met jullie team.', number: '03' },
    ],

    // What to expect
    aboutExpectTitle: 'Wat je kunt verwachten',
    aboutExpectItems: [
      { title: 'Korte lijnen', text: 'Geen lagen, geen doorlooptijd. Direct contact, snelle beslissingen.' },
      { title: 'Directe impact', text: 'Geen maandenlange trajecten. We focussen op wat nu het meeste verschil maakt.' },
      { title: 'Geen onzin', text: 'Geen buzzwords, geen onnodige complexiteit. Gewoon oplossingen die werken.' },
    ],
    aboutCta: 'Neem Contact Op',

    // Services Page
    servicesLabel: 'Diensten',
    servicesTitle: 'Wat we voor jullie kunnen doen.',
    servicesIntro: 'Elk bedrijf is anders. We stemmen onze aanpak af op jullie specifieke situatie, maar dit zijn de gebieden waar we het meest helpen.',
    servicesReadMore: 'Meer informatie',
    servicesCta: 'Bespreek jullie situatie',
    servicesAnalysisLabel: 'Elk project begint hier',
    servicesAnalysisTitle: 'Procesanalyse',
    servicesAnalysisDesc: 'Voordat we iets verbeteren, bouwen of structureren, begrijpen we eerst hoe jullie werk echt gedaan wordt. We lopen het proces door met de mensen op de werkvloer, vinden de frictie, en bepalen wat de meeste impact heeft.',
    servicesThenLabel: 'Dan gaan we aan de slag',
    service_werkprocessen_title: 'Werkprocessen Verbeteren',
    service_werkprocessen_desc: 'Processen die werkten bij 10 mensen lopen vast bij 50. We vinden waar het misgaat en ontwerpen opnieuw hoe het werk gedaan wordt. Praktisch, op de werkvloer, met jullie team.',
    service_toolsEnSystemen_title: 'Tools & Systemen Bouwen',
    service_toolsEnSystemen_desc: 'Spreadsheets, losse tools, handmatige workarounds. Wij bouwen praktische software die alles samenvoegt op een plek. Op maat gemaakt voor hoe jullie werken.',
    service_dataOpOrde_title: 'Data op Orde Brengen',
    service_dataOpOrde_desc: 'Verspreide bestanden, inconsistente formats, geen overzicht. Wij structureren jullie data, bouwen dashboards, en zorgen dat de juiste informatie altijd bij de hand is.',

    // Service Detail Pages
    serviceDetailBackLink: 'Alle diensten',
    serviceDetailCta: 'Bespreek dit met ons',
    serviceDetailForWhoTitle: 'Is dit iets voor jullie?',

    serviceDetail_werkprocessen: {
      label: 'Werkprocessen Verbeteren',
      intro: 'Jullie proces werkt. Soort van. Maar het kost te veel tijd, er vallen dingen tussen wal en schip, en nieuwe mensen inwerken duurt weken omdat niemand precies weet hoe het eigenlijk hoort. Dat is niet iets waar je mee leert leven. Dat is iets wat je fixt.',
      sections: [
        { title: 'Op de werkvloer, niet in de vergaderruimte', text: 'We beginnen altijd bij de mensen die het werk doen. Meelopen, vragen stellen, observeren. Niet een halfuur, maar minstens een hele dag. Waar wordt dubbel werk gedaan? Waar wacht iemand op een ander? Welke stap wordt standaard overgeslagen omdat niemand snapt waarom die er is? De echte knelpunten zitten niet in een organogram of een procesbeschrijving van drie jaar geleden. Die zitten in de dagelijkse praktijk, in de dingen die mensen "nu eenmaal zo doen". We praten niet alleen met het management. We praten met de mensen die elke dag het proces uitvoeren. Zij weten precies waar het vastloopt, en ze hebben vaak al ideeën voor hoe het beter kan.' },
        { title: 'Wat we meestal tegenkomen', text: 'In bijna elk bedrijf zien we dezelfde patronen. Informatie die op drie of vier plekken tegelijk wordt bijgehouden. Stappen die ooit logisch waren maar al jaren niemand meer dienen. Mensen die workarounds hebben bedacht omdat het officiele proces niet werkt. Overal kennis die in hoofden zit in plaats van in systemen. Dat is geen falen van je team. Dat is wat er gebeurt als een bedrijf groeit en de processen niet meegroeien. Het goede nieuws: die patronen zijn herkenbaar. Dat betekent dat de oplossingen dat ook zijn. Niet elk probleem vraagt om een unieke aanpak. Soms is de simpelste fix ook de beste.' },
        { title: 'Van chaos naar een proces dat klopt', text: 'Op basis van wat we zien ontwerpen we het proces opnieuw. Niet op papier in een vergaderruimte, maar samen met jullie team. Minder stappen, duidelijkere verantwoordelijkheden, minder ruimte voor fouten. We schrappen wat overbodig is en maken expliciet wat impliciet was. Geen aannames over hoe het zou moeten, maar afspraken over hoe het gaat. Het resultaat is een werkwijze die je in 5 minuten aan een nieuwe collega kunt uitleggen. Geen dik handboek dat niemand leest, maar een helder proces dat voor zichzelf spreekt. En omdat het samen met het team is ontworpen, voelt het niet als iets dat van bovenaf is opgelegd.' },
        { title: 'Klein beginnen, dan uitrollen', text: 'We testen elke verandering eerst met een klein team of een enkel proces. Werkt het in de praktijk? Dan breiden we uit. Werkt iets niet? Dan passen we aan. Geen groot verandertraject, geen maandenlange implementatie, geen stuurgroep die elke twee weken vergadert over een planning. Meestal staan de eerste verbeteringen binnen 2 tot 3 weken. Dat is bewust. Snel resultaat bouwt vertrouwen, en vertrouwen maakt de volgende stap makkelijker. Zo groeit de verbetering organisch door de organisatie in plaats van dat het een project wordt waar iedereen tegenop ziet.' },
        { title: 'Wanneer het verschil zichtbaar wordt', text: 'Een verbeterd proces merk je niet altijd in de cijfers. Je merkt het aan de dagelijkse gang van zaken. Minder brandjes blussen. Minder "hoe moest dat ook alweer?" vragen. Nieuwe collega\'s die in dagen productief zijn in plaats van weken. Klanten die minder vaak hoeven na te vragen waar iets blijft. We meten resultaat niet in dikke rapporten maar in de tijd en frustratie die jullie team bespaart. Bij een team van 25 mensen is 20 minuten besparing per persoon per dag bijna 180 werkdagen per jaar. Dat is geen klein verschil. Dat is een werkdag die soepeler loopt. Elke dag weer.' },
      ],
      forWho: 'Teams waar dingen te lang duren, fouten zich herhalen, of waar elke medewerker het net even anders doet. Bedrijven die groeien en merken dat hun processen niet meegroeien. Organisaties waar het inwerken van nieuwe mensen weken kost in plaats van dagen.',
      caseTitle: 'RoosterHub',
      caseText: 'Een callcenter van 45 medewerkers regelde dienstroosters in Excel. Privacygevoelige data ging via e-mail rond, een direct AVG-risico. Planners waren elke week uren kwijt aan puzzelen, en bij ziekte was het elke keer improviseren. We hebben het hele roosterproces doorgelicht met het team, onnodige stappen geschrapt en een lichtgewicht rooster-app gebouwd die precies doet wat ze nodig hadden. Het team had inspraak in het ontwerp, wat de adoptie versnelde. Kosten: 1,10 per medewerker per maand. Inwerktijd nieuwe planners: van 2 weken naar 1 dag. Het team heeft nu meer tijd voor wat er echt toe doet: goede gesprekken met klanten.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Tools & Systemen Bouwen',
      intro: 'Excel als database. WhatsApp als ticketsysteem. Een gedeelde map waar niemand meer iets in terugvindt. Herkenbaar? Jullie zijn je huidige tooling ontgroeid. Dat is niet erg, dat hoort bij groei. Maar het wordt een probleem als je team elke dag tijd verliest aan tools die niet meer passen bij hoe jullie werken.',
      sections: [
        { title: 'Eén tool in plaats van zes', text: 'We vervangen het lappendeken van losse tools, spreadsheets en workarounds door een systeem dat past bij jullie werk. Dat kan een intern dashboard zijn, een klantportaal, een plannings-tool, of een platform dat meerdere processen samenvoegt. Het uitgangspunt is altijd jullie werkproces, niet de technologie. We bouwen geen standaard softwarepakket waar jullie je aan moeten aanpassen. We bouwen software die zich aanpast aan jullie. Dat klinkt als een verkooppraatje, maar het verschil is concreet: we beginnen niet met features maar met de vraag "wat moet jullie team elke dag doen, en wat staat er in de weg?"' },
        { title: 'Technologie die past', text: 'We kiezen technologie op basis van jullie situatie, niet op basis van wat hip is. Soms is een simpele webapplicatie genoeg. Soms heb je een integratie nodig met bestaande systemen. En soms is de beste oplossing een slim gebruik van tools die jullie al hebben, maar anders ingericht. We zijn niet gebonden aan een specifiek platform of framework. We gebruiken wat werkt. Dat betekent dat jullie niet afhankelijk worden van een proprietary systeem dat alleen wij kunnen onderhouden. Wat we bouwen is van jullie, gebouwd met gangbare technologie die elke goede developer kan oppakken.' },
        { title: 'Gebouwd met jullie, niet voor jullie', text: 'We bouwen in korte rondes van 1 tot 2 weken. Na elke ronde laten we zien wat er staat en vragen we feedback. Jullie team test mee vanaf dag een. Niet als formaliteit, maar omdat vroege feedback het verschil maakt tussen software die technisch werkt en software die mensen daadwerkelijk willen gebruiken. We hebben te vaak gezien wat er gebeurt als een tool pas bij oplevering aan het team wordt getoond: weerstand, workarounds, en uiteindelijk weer terug naar Excel. Door jullie team vanaf het begin te betrekken voorkomen we dat. Het resultaat is software waar het team achter staat, omdat ze er zelf aan hebben bijgedragen.' },
        { title: 'Opleveren, overdragen, klaar', text: 'We leveren werkende software, geen prototypes of mockups. Inclusief uitleg, documentatie en een overdracht aan jullie team. We zorgen dat minstens twee mensen in jullie organisatie het systeem begrijpen en kleine aanpassingen zelf kunnen doen. Willen jullie later iets aanpassen of uitbreiden? Dat kan, ook zonder ons. Het systeem is van jullie, niet van ons. Dat is een bewuste keuze. We willen dat jullie onafhankelijk zijn. Geen maandelijkse licentie die steeds duurder wordt, geen vendor lock-in. Een tool die van jullie is en die jullie zelf kunnen beheren.' },
        { title: 'Na oplevering', text: 'Een goede tool is pas goed als die ook over drie maanden nog gebruikt wordt. Daarom checken we na oplevering hoe het gaat. Wordt de tool gebruikt zoals bedoeld? Zijn er aanpassingen nodig nu het team er dagelijks mee werkt? Meestal zijn dat kleine dingen: een veld dat anders moet, een stap die toch overbodig is, een rapport dat net even andere informatie moet tonen. Die aanpassingen maken het verschil tussen "een tool die we hebben" en "een tool die we niet meer willen missen". Dat laatste is waar we naar streven.' },
      ],
      forWho: 'Bedrijven die vastlopen op hun huidige tooling maar geen jaarlang IT-project willen. Teams die dagelijks tijd verliezen aan schakelen, kopieren en handmatig werk dat allang geautomatiseerd had moeten zijn. Organisaties die maatwerk nodig hebben maar niet de budgetten van een enterprise-oplossing.',
      caseTitle: 'Desk to Dash',
      caseText: 'Een ZZP\'er beheerde uren, facturen, kosten, BTW en planning in 6 losse tools. Elke tool deed een ding, maar niets hing samen. Eind van de maand betekende een hele avond handmatig overzetten en controleren. We hebben alle stromen in kaart gebracht, de overlap geschrapt, en een platform gebouwd dat alles samenvoegt. Eén login, een duidelijk overzicht, en aan het eind van de maand alles in een paar klikken klaar voor de boekhouder. De ZZP\'er bespaart nu 6 uur per maand aan administratie. Belangrijker: de constante stress van "heb ik niets vergeten?" is weg.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Data op Orde Brengen',
      intro: 'Jullie hebben de data wel. Ergens. Verspreid over tientallen spreadsheets, in verschillende formats, bijgehouden door verschillende mensen. Niemand durft met zekerheid te zeggen welk getal klopt. En elke keer als iemand een rapport nodig heeft, begint het puzzelen opnieuw. Dat is geen ongemak. Dat kost jullie geld, tijd en betrouwbaarheid.',
      sections: [
        { title: 'Eerst snappen wat jullie hebben', text: 'We beginnen met een inventarisatie. Welke data hebben jullie, waar staat die, wie houdt het bij, en hoe wordt het gebruikt? Dit alleen al is vaak een eye-opener. De meeste bedrijven weten niet hoeveel tijd ze kwijt zijn aan zoeken, handmatig overzetten en controleren of cijfers kloppen. We brengen dat in kaart, inclusief wat het kost. Niet in abstracte termen, maar in uren per week en fouten per maand. Dat geeft een helder beeld van de urgentie. Vaak blijkt dat een team van 15 mensen gezamenlijk een volle werkweek per maand kwijt is aan data-gerelateerd handwerk. Dat is een probleem dat zichzelf niet oplost.' },
        { title: 'De verborgen kosten van slechte data', text: 'Slechte data is niet alleen vervelend, het is duur. Elke keer dat iemand een getal moet controleren voordat het een rapport in gaat, kost dat tijd. Elke fout die pas bij een klant opduikt, kost vertrouwen. Elke discussie in een overleg over welk cijfer nu klopt, kost energie. En het sluipt erin. Niemand ziet het als een groot probleem omdat iedereen eraan gewend is. Maar tel het op over een maand, een kwartaal, een jaar, en je praat over duizenden euro\'s aan verloren productiviteit. Los van de beslissingen die genomen worden op basis van verkeerde informatie.' },
        { title: 'Een bron van waarheid', text: 'We bouwen een centrale plek voor jullie data. Geen spreadsheet meer als database, maar een echte structuur. Consistente formats, automatische imports vanuit jullie bestaande bronnen, en kwaliteitschecks die fouten vangen voordat ze in een rapport belanden. Het resultaat is data die je kunt vertrouwen zonder het elke keer te hoeven dubbelchecken. Dat verandert meer dan je denkt. Vergaderingen worden korter omdat niemand meer discussieert over welk getal klopt. Rapporten zijn sneller klaar omdat de data al schoon is. En beslissingen worden beter omdat ze gebaseerd zijn op informatie die je kunt vertrouwen. Een enkele bron van waarheid is niet alleen handig, het is de basis voor alles wat daarna komt.' },
        { title: 'Inzicht in plaats van buikgevoel', text: 'Op de schone data bouwen we dashboards die jullie team dagelijks kan gebruiken. Geen eenmalig rapport dat in een la verdwijnt, maar live inzicht in wat er in jullie operatie gebeurt. Welke processen lopen, waar vertragingen zitten, hoe de week eruitziet vergeleken met vorige maand. Praktische visualisaties die antwoord geven op de vragen die jullie team elke dag stelt. En we zorgen dat jullie het zelf kunnen onderhouden en aanpassen. Geen afhankelijkheid van ons voor elke kleine wijziging. Het doel is dat jullie team zelf met data kan werken, niet dat wij een dashboard beheren dat alleen wij begrijpen.' },
        { title: 'Data kwaliteit die blijft', text: 'De grootste valkuil bij dataprojecten is dat het na oplevering langzaam terugzakt naar de oude situatie. Nieuwe data komt binnen via het verkeerde format, iemand maakt een workaround, en voor je het weet heb je weer drie versies van de waarheid. Daarom bouwen we niet alleen de structuur maar ook de vangrails. Automatische validatie bij invoer, alerts bij afwijkingen, en duidelijke afspraken over wie verantwoordelijk is voor welke data. Zo blijft de kwaliteit op peil zonder dat iemand er constant achteraan hoeft te zitten.' },
      ],
      forWho: 'Bedrijven waar niemand met zekerheid kan zeggen of de cijfers kloppen. Teams die meer tijd besteden aan data zoeken en kopieren dan aan er iets mee doen. Organisaties die willen groeien maar eerst hun datafundament op orde moeten hebben voordat ze betrouwbare beslissingen kunnen nemen.',
      caseTitle: 'Industrieel bedrijf',
      caseText: 'Een middelgroot industrieel bedrijf beheerde operationele data in meer dan 430 Excel-tabs. Inconsistente formats, geen overzicht, en een team dat uren per week kwijt was aan handmatig data samenvoegen voor managementrapportages. Fouten werden pas ontdekt als een klant ernaar vroeg. We hebben alle databronnen in kaart gebracht, de structuur opgeschoond, en alles gemigreerd naar een centrale database met automatische imports en kwaliteitschecks. Daarbovenop een live dashboard dat het team dagelijks gebruikt. Het resultaat: de wekelijkse rapportage die 6 uur kostte, is nu een druk op de knop. Het team besteedt die uren aan hun eigenlijke werk, en het management vertrouwt de cijfers weer.',
    },

    // Approach Page
    approachLabel: 'Onze Werkwijze',
    approachTitle: 'Hoe we van probleem naar oplossing komen.',
    approachIntro: 'Geen starre methodologie of eindeloze discovery-fases. We werken pragmatisch, dicht bij jullie team, en leveren resultaten die je kunt zien.',
    approachSteps: [
      { title: 'Luisteren & Begrijpen', text: 'We beginnen met het doorlopen van jullie proces met de mensen die het werk doen. Geen aannames, geen shortcuts. Hier komen de echte inzichten vandaan.' },
      { title: 'Analyseren & Ontwerpen', text: 'Op basis van wat we leren, brengen we in kaart waar de frictie zit en ontwerpen we een praktische oplossing. Niet de meest complexe, maar degene die past.' },
      { title: 'Bouwen & Implementeren', text: 'We bouwen de oplossing en implementeren die met jullie team. Geen overdracht, maar hands-on. We zorgen dat het werkt in de praktijk, niet alleen op papier.' },
      { title: 'Controleren & Bijsturen', text: 'Na de lancering checken we of het daadwerkelijk werkt zoals het zou moeten. Als iets bijgestuurd moet worden, doen we dat. Het doel is een proces dat soepel draait zonder ons.' },
    ],
    approachCta: 'Start het Gesprek',

    // FAQ Page
    faqLabel: 'Veelgestelde Vragen',
    faqTitle: 'Vragen die we vaak horen.',
    faqStillQuestions: 'Nog vragen?',
    faqCta: 'Neem Contact Op',
    faqItems: [
      { q: 'Met wat voor bedrijven werken jullie?', a: 'We werken met groeiende bedrijven die voelen dat hun processen hen tegenhouden. Meestal 10 tot 200 mensen, in verschillende branches. Als jullie team te veel tijd kwijt is aan dingen die simpeler zouden moeten zijn, kunnen we waarschijnlijk helpen.' },
      { q: 'Werken jullie alleen met technologie?', a: 'Nee. Technologie is een middel, niet het doel. Soms is de beste oplossing een simpeler proces, een duidelijkere workflow of betere communicatie. We zoeken uit wat past.' },
      { q: 'Hoe lang duurt een gemiddeld project?', a: 'Dat hangt af van de scope, maar de meeste projecten duren 4 tot 12 weken. We geven de voorkeur aan korte, gerichte trajecten waarbij je snel resultaat ziet.' },
      { q: 'Wat kost het?', a: 'Elk project is anders. We werken met vaste projectprijzen zodat je weet waar je aan toe bent. Neem contact op en we geven een eerlijke inschatting.' },
      { q: 'Waar zijn jullie gevestigd?', a: 'We zijn gevestigd in Nederland en werken met bedrijven door de hele Benelux. We werken zowel op locatie als remote, afhankelijk van wat het project nodig heeft.' },
      { q: 'Moet ik mijn hele bedrijf omgooien?', a: 'Nee. We beginnen klein en gericht. Eén proces, één probleem. Als dat werkt, kijken we wat er nog meer beter kan. Geen grote omwentelingen.' },
      { q: 'Wat als mijn team weerstand heeft tegen verandering?', a: 'Daarom werken we samen met je team in plaats van een plan op te leggen van bovenaf. Mensen accepteren veranderingen waar ze zelf aan mee hebben gebouwd. We bouwen met hen, niet voor hen.' },
      { q: 'Hoe meten jullie of een verbetering echt werkt?', a: 'We stellen vooraf duidelijke, concrete meetpunten vast. Denk aan: tijdsbesparing per week, minder fouten, snellere doorlooptijd. Na oplevering meten we tegen die nulmeting.' },
      { q: 'Wat is het verschil met een traditioneel adviesbureau?', a: 'Traditionele bureaus schrijven rapporten. Wij bouwen oplossingen. We doen het echte werk op de werkvloer en leveren iets op dat je team de volgende dag kan gebruiken.' },
      { q: 'Kan ik ook alleen advies krijgen zonder implementatie?', a: 'Ja, maar we zijn eerlijk: advies zonder actie verandert zelden iets. We kunnen een processcan doen om je knelpunten in kaart te brengen en concrete aanbevelingen te geven. Wat je ermee doet is aan jou.' },
      { q: 'Wat gebeurt er na afloop van een traject?', a: 'Je houdt alles wat we gebouwd hebben. We zorgen dat je team het zelfstandig kan onderhouden. Later toch hulp nodig? We zijn een telefoontje verwijderd, maar het doel is dat je ons niet meer nodig hebt.' },
      { q: 'Gebruiken jullie AI in projecten?', a: 'Alleen als het echt helpt. We zijn geen AI-bureau. Als een spreadsheet of simpele workflow het probleem oplost, dan bouwen we dat. Technologie volgt het proces, niet andersom.' },
    ],
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();

  // Determine language from URL path
  const lang = location.pathname.startsWith('/en') ? 'en' : 'nl';
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

// Hook to get localized path from a canonical NL path
export const useLocalizedPath = (nlPath) => {
  const { lang } = useTranslation();
  const mapping = pathMap[nlPath];
  if (!mapping) return nlPath;
  return mapping[lang];
};

// Utility to get the alternate language path for hreflang
export const getAlternatePath = (currentPath) => {
  if (currentPath.startsWith('/en')) {
    return enToNl[currentPath] || '/';
  }
  return nlToEn[currentPath] || '/en';
};
