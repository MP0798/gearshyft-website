// Blog post data - structured content for NL (primary) and EN
// Each post has: slug (NL + EN), metadata, and content sections
// Add new posts to the top of the array (newest first)

const blogPosts = [
  {
    key: 'ai-nodig-of-beter-proces',
    slugs: {
      nl: 'ai-nodig-of-beter-proces',
      en: 'ai-need-or-better-process',
    },
    author: 'Max Pijnenburg',
    publishedDate: '2026-04-15',
    readTime: 6,
    category: 'procesverbetering',
    nl: {
      title: 'Heb je AI nodig, of gewoon een beter proces?',
      excerpt: 'Iedereen heeft het over AI. Maar voor de meeste bedrijven is een simpeler proces veel effectiever dan de nieuwste technologie.',
      sections: [
        {
          title: 'De AI-hype voorbij',
          text: 'Elk bedrijf voelt de druk om iets met AI te doen. Maar als je eerlijk kijkt naar waar de meeste tijd verloren gaat, is het antwoord zelden "we missen een AI-tool". Het antwoord is vaker: onduidelijke stappen, dubbel werk, of informatie die op drie plekken tegelijk staat. Dat los je niet op met een chatbot.',
        },
        {
          title: 'Wanneer AI wel zin heeft',
          text: 'AI is geen onzin. Maar het heeft pas zin als je basisprocessen op orde zijn. Als je team elke dag 2 uur kwijt is aan handmatig data overzetten tussen systemen, dan is de oplossing niet een AI die dat sneller doet. De oplossing is dat die stap er niet meer hoeft te zijn. AI wordt pas krachtig als het bovenop een goed proces draait, niet als pleister op een slecht proces.',
        },
        {
          title: 'Begin bij de basis',
          text: 'Voordat je investeert in AI, stel jezelf drie vragen. Weten we waar de meeste tijd verloren gaat? Kunnen we het probleem uitleggen aan een nieuwe collega in 5 minuten? Is er een simpelere oplossing die we nog niet geprobeerd hebben? In 8 van de 10 gevallen is het antwoord op die laatste vraag ja. En die simpelere oplossing kost een fractie van wat een AI-implementatie kost.',
        },
      ],
    },
    en: {
      title: 'Do you need AI, or just a better process?',
      excerpt: 'Everyone is talking about AI. But for most businesses, a simpler process is far more effective than the latest technology.',
      sections: [
        {
          title: 'Beyond the AI hype',
          text: 'Every business feels the pressure to do something with AI. But if you honestly look at where most time is wasted, the answer is rarely "we need an AI tool". More often it is: unclear steps, duplicate work, or information scattered across three places. You do not fix that with a chatbot.',
        },
        {
          title: 'When AI actually makes sense',
          text: 'AI is not nonsense. But it only makes sense when your basic processes are in order. If your team spends 2 hours every day manually transferring data between systems, the solution is not AI that does it faster. The solution is removing that step entirely. AI becomes powerful when it runs on top of a good process, not as a patch on a broken one.',
        },
        {
          title: 'Start with the basics',
          text: 'Before investing in AI, ask yourself three questions. Do we know where the most time is lost? Can we explain the problem to a new colleague in 5 minutes? Is there a simpler solution we have not tried yet? In 8 out of 10 cases, the answer to that last question is yes. And that simpler solution costs a fraction of what an AI implementation costs.',
        },
      ],
    },
  },
  {
    key: 'procesverbetering-zonder-lean',
    slugs: {
      nl: 'procesverbetering-zonder-lean',
      en: 'process-improvement-without-lean',
    },
    author: 'Max Pijnenburg',
    publishedDate: '2026-05-01',
    readTime: 5,
    category: 'procesverbetering',
    nl: {
      title: 'Procesverbetering zonder Lean of Six Sigma',
      excerpt: 'Je hoeft geen certificaat aan de muur te hebben om je processen te verbeteren. Soms is gezond verstand genoeg.',
      sections: [
        {
          title: 'Het probleem met frameworks',
          text: 'Lean, Six Sigma, Kaizen. Er zijn tientallen methodologieen die beloven je processen te verbeteren. Ze hebben allemaal hun waarde. Maar voor een bedrijf van 20 tot 100 mensen zijn ze vaak overkill. Je hebt geen DMAIC-cyclus nodig om te zien dat je team elke maandag 3 uur kwijt is aan dezelfde handmatige rapportage.',
        },
        {
          title: 'Wat wel werkt',
          text: 'Loop mee met de mensen die het werk doen. Vraag waar ze tijd aan verliezen. Kijk waar informatie blijft hangen. Dat is geen Lean, dat is luisteren. De beste procesverbeteringen beginnen niet met een framework, maar met een simpele vraag: wat kost jullie elke week de meeste moeite? Het antwoord is bijna altijd verrassend concreet.',
        },
        {
          title: 'Klein beginnen, snel resultaat',
          text: 'Je hoeft niet het hele bedrijf om te gooien. Pak een proces dat iedereen irriteert, begrijp waarom het irriteert, en verbeter dat ene ding. Geen projectplan van 40 paginas, geen stuurgroep, geen verandertraject. Gewoon fixen. Als dat werkt, pak je het volgende. Zo bouw je momentum zonder weerstand.',
        },
      ],
    },
    en: {
      title: 'Process improvement without Lean or Six Sigma',
      excerpt: 'You do not need a certificate on the wall to improve your processes. Sometimes common sense is enough.',
      sections: [
        {
          title: 'The problem with frameworks',
          text: 'Lean, Six Sigma, Kaizen. There are dozens of methodologies that promise to improve your processes. They all have their value. But for a company of 20 to 100 people, they are often overkill. You do not need a DMAIC cycle to see that your team spends 3 hours every Monday on the same manual report.',
        },
        {
          title: 'What actually works',
          text: 'Walk alongside the people who do the work. Ask what wastes their time. See where information gets stuck. That is not Lean, that is listening. The best process improvements do not start with a framework, but with a simple question: what costs you the most effort every week? The answer is almost always surprisingly concrete.',
        },
        {
          title: 'Start small, see results fast',
          text: 'You do not have to overhaul the entire company. Pick one process that annoys everyone, understand why it annoys them, and fix that one thing. No 40-page project plan, no steering committee, no change program. Just fix it. When that works, pick the next one. That is how you build momentum without resistance.',
        },
      ],
    },
  },
  {
    key: 'signalen-proces-verbeteren',
    slugs: {
      nl: 'signalen-proces-verbeteren',
      en: 'signs-your-process-needs-fixing',
    },
    author: 'Max Pijnenburg',
    publishedDate: '2026-05-15',
    readTime: 5,
    category: 'procesverbetering',
    nl: {
      title: '5 signalen dat je bedrijfsproces toe is aan verbetering',
      excerpt: 'Niet elk probleem voelt als een probleem. Soms is het gewoon "hoe het hier werkt". Dit zijn de signalen dat het beter kan.',
      sections: [
        {
          title: 'De signalen herkennen',
          text: 'Sommige procesproblemen zijn onzichtbaar geworden. Ze horen bij "hoe het hier gaat". Maar dat maakt ze niet minder kostbaar. Vijf signalen die je niet moet negeren: mensen vragen steeds dezelfde informatie aan dezelfde persoon. Nieuwe medewerkers doen er weken over om "het systeem" te snappen. Er zijn meer dan drie Excel-bestanden die "de waarheid" bevatten. Klanten vragen regelmatig naar de status van iets. Een simpele wijziging kost meer dan een dag.',
        },
        {
          title: 'De verborgen kosten',
          text: 'Het lastige aan slechte processen is dat je de kosten niet op een factuur ziet. Het zijn de 15 minuten per persoon per dag die opgeteld weken per jaar worden. Het is de medewerker die vertrekt omdat het werk onnodig frustrerend is. Het is de klant die niet terugkomt omdat de communicatie rommelig was. Die kosten zijn er elke dag, maar niemand telt ze op.',
        },
        {
          title: 'Wat je eraan kunt doen',
          text: 'Herken je drie of meer van deze signalen? Dan is je proces toe aan een revisie. Niet een grote reorganisatie, maar een nuchter gesprek over wat beter kan. Begin met de mensen die het werk doen. Zij weten precies waar het vastloopt. De oplossing is vaak simpeler dan je denkt.',
        },
      ],
    },
    en: {
      title: '5 signs your business process needs improvement',
      excerpt: 'Not every problem feels like a problem. Sometimes it is just "how things work here". These are the signs it can be better.',
      sections: [
        {
          title: 'Recognizing the signs',
          text: 'Some process problems have become invisible. They are part of "how things work here". But that does not make them less costly. Five signs you should not ignore: people keep asking the same person for the same information. New employees take weeks to understand "the system". There are more than three Excel files that contain "the truth". Clients regularly ask for status updates. A simple change takes more than a day.',
        },
        {
          title: 'The hidden costs',
          text: 'The tricky thing about bad processes is that you do not see the costs on an invoice. It is the 15 minutes per person per day that add up to weeks per year. It is the employee who leaves because the work is unnecessarily frustrating. It is the client who does not come back because communication was messy. Those costs are there every day, but nobody adds them up.',
        },
        {
          title: 'What you can do about it',
          text: 'Do you recognize three or more of these signs? Then your process needs a revision. Not a big reorganization, but an honest conversation about what can be better. Start with the people who do the work. They know exactly where things get stuck. The solution is often simpler than you think.',
        },
      ],
    },
  },
  {
    key: 'digitalisering-mislukt-mkb',
    slugs: {
      nl: 'digitalisering-mislukt-mkb',
      en: 'why-digitalization-fails-sme',
    },
    author: 'Max Pijnenburg',
    publishedDate: '2026-06-01',
    readTime: 7,
    category: 'digitalisering',
    nl: {
      title: 'Waarom digitalisering mislukt bij MKB bedrijven',
      excerpt: 'Niet omdat de technologie niet werkt. Maar omdat niemand begon bij het probleem.',
      sections: [
        {
          title: 'De oplossing voor de oplossing',
          text: 'Het patroon is herkenbaar. Een bedrijf koopt software. De implementatie duurt langer dan gepland. Het team werkt er half mee, half omheen. Na een jaar staat het systeem er, maar werkt niemand zoals bedoeld. Het probleem? Niemand heeft eerst gevraagd welk probleem we eigenlijk oplossen. De software werd gekozen op basis van features, niet op basis van het werkproces.',
        },
        {
          title: 'Technologie is niet het startpunt',
          text: 'Digitalisering begint niet bij technologie. Het begint bij begrijpen hoe het werk nu gedaan wordt, en waarom. Pas als je dat snapt, kun je beslissen welke technologie past. Soms is dat een volledige softwareoplossing. Soms is het een simpele aanpassing in hoe informatie gedeeld wordt. En soms is de conclusie dat je helemaal geen nieuwe software nodig hebt.',
        },
        {
          title: 'Hoe het wel werkt',
          text: 'Succesvolle digitalisering bij MKB bedrijven volgt bijna altijd hetzelfde patroon. Klein beginnen. Een concreet probleem aanpakken. De mensen die het werk doen erbij betrekken. Testen of het werkt in de praktijk. Dan pas uitbreiden. Geen big bang, geen groot IT-project. Gewoon stap voor stap verbeteren, met technologie die past bij hoe jullie werken.',
        },
      ],
    },
    en: {
      title: 'Why digitalization fails at SME businesses',
      excerpt: 'Not because the technology does not work. But because nobody started with the problem.',
      sections: [
        {
          title: 'The solution before the problem',
          text: 'The pattern is familiar. A company buys software. Implementation takes longer than planned. The team half uses it, half works around it. After a year, the system is there, but nobody works as intended. The problem? Nobody first asked which problem we are actually solving. The software was chosen based on features, not on the work process.',
        },
        {
          title: 'Technology is not the starting point',
          text: 'Digitalization does not start with technology. It starts with understanding how the work gets done today, and why. Only when you understand that can you decide which technology fits. Sometimes that is a full software solution. Sometimes it is a simple change in how information is shared. And sometimes the conclusion is that you do not need new software at all.',
        },
        {
          title: 'How it actually works',
          text: 'Successful digitalization at SME businesses almost always follows the same pattern. Start small. Tackle a concrete problem. Involve the people who do the work. Test whether it works in practice. Then expand. No big bang, no large IT project. Just improve step by step, with technology that fits how you work.',
        },
      ],
    },
  },
];

// Helper: get all posts for a language, sorted by date (newest first)
export function getBlogPosts(lang = 'nl') {
  return blogPosts.map((post) => ({
    key: post.key,
    slug: post.slugs[lang],
    author: post.author,
    publishedDate: post.publishedDate,
    readTime: post.readTime,
    category: post.category,
    ...post[lang],
  }));
}

// Helper: get a single post by slug (works with both NL and EN slugs)
export function getBlogPostBySlug(slug, lang = 'nl') {
  const post = blogPosts.find(
    (p) => p.slugs.nl === slug || p.slugs.en === slug
  );
  if (!post) return null;
  return {
    key: post.key,
    slug: post.slugs[lang],
    slugs: post.slugs,
    author: post.author,
    publishedDate: post.publishedDate,
    readTime: post.readTime,
    category: post.category,
    ...post[lang],
  };
}

// Helper: get all slug mappings for routing
export function getBlogSlugMap() {
  const nlToEn = {};
  const enToNl = {};
  blogPosts.forEach((post) => {
    nlToEn[post.slugs.nl] = post.slugs.en;
    enToNl[post.slugs.en] = post.slugs.nl;
  });
  return { nlToEn, enToNl };
}

export default blogPosts;
