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
    author: 'Max Poppes',
    publishedDate: '2026-02-10',
    readTime: 4,
    category: 'procesverbetering',
    relatedServices: ['werkprocessen', 'dataOpOrde'],
    nl: {
      title: 'Heb je AI nodig, of gewoon een beter proces?',
      excerpt: 'Iedereen heeft het over AI. Maar voor de meeste bedrijven is een simpeler proces veel effectiever dan de nieuwste technologie.',
      sections: [
        {
          title: 'De AI-hype voorbij',
          text: 'Elk bedrijf voelt de druk om iets met AI te doen. Leveranciers bellen, concurrenten experimenteren, en op LinkedIn lijkt iedereen al halverwege een AI-transformatie. Maar als je eerlijk kijkt naar waar de meeste tijd verloren gaat in je bedrijf, is het antwoord zelden "we missen een AI-tool". Het antwoord is vaker: onduidelijke stappen, dubbel werk, of informatie die op drie plekken tegelijk staat. Volgens onderzoek van Eagle Hill Consulting besteedt 68% van werknemers regelmatig tijd aan inefficiente, laagwaardige taken. Mensen die elke week dezelfde vragen aan dezelfde collega stellen. Een proces dat niemand meer kan uitleggen, maar dat iedereen gewoon blijft volgen. Dat los je niet op met een chatbot. Dat los je op door eerst te snappen wat er misgaat.',
        },
        {
          title: 'Een voorbeeld uit de praktijk',
          text: 'Een bedrijf van 40 man wilde AI inzetten om klantvragen sneller te beantwoorden. Ze hadden gelezen over chatbots, automatische e-mail classificatie en slimme routing. Maar toen we meekeken met het team bleek het echte probleem veel simpeler: klantinformatie stond op vier verschillende plekken. Elke medewerker zocht gemiddeld 12 minuten per vraag naar de juiste gegevens. Dat is geen AI-probleem. Dat is een dataprobleem. We hebben de informatie gecentraliseerd in een simpel dashboard. Geen AI. Geen chatbot. Gemiddelde reactietijd ging van 25 naar 8 minuten.',
        },
        {
          title: 'Wanneer AI wel zin heeft',
          text: 'AI is geen onzin. Maar het heeft pas zin als je basisprocessen op orde zijn. Als je team elke dag 2 uur kwijt is aan handmatig data overzetten tussen systemen, dan is de oplossing niet een AI die dat sneller doet. De oplossing is dat die stap er niet meer hoeft te zijn. AI wordt pas krachtig als het bovenop een goed proces draait, niet als pleister op een slecht proces. Denk aan patronen herkennen in schone data, voorspellingen maken op basis van betrouwbare cijfers, of repetitieve beslissingen automatiseren waar duidelijke regels voor bestaan. Maar dat vereist allemaal dat de basis klopt.',
        },
        {
          title: 'De kosten van de verkeerde keuze',
          text: 'Volgens onderzoek van SmartDev kost een AI-implementatie voor MKB-bedrijven al snel $200.000 tot $500.000 over vijf jaar, waarbij softwarelicenties slechts 30-50% van de totale kosten uitmaken. En dan heb je het nog niet over de tijd van je team en de maanden aan fine-tuning. Als het onderliggende proces rommelig is, automatiseer je rommel. Sneller rommel is nog steeds rommel. Ondertussen had een procesverbetering van een paar weken hetzelfde resultaat kunnen opleveren voor een fractie van de kosten. Niet omdat AI slecht is, maar omdat het probleem geen AI-probleem was.',
        },
        {
          title: 'Begin bij de basis',
          text: 'Voordat je investeert in AI, stel jezelf drie vragen. Weten we waar de meeste tijd verloren gaat? Kunnen we het probleem uitleggen aan een nieuwe collega in 5 minuten? Is er een simpelere oplossing die we nog niet geprobeerd hebben? Vaak is het antwoord op die laatste vraag ja. En die simpelere oplossing kost een fractie van wat een AI-implementatie kost. Soms is de beste technologie geen technologie.',
        },
      ],
      sources: [
        { label: 'Eagle Hill Consulting - Workers spend time on low-value, inefficient tasks (2023)', url: 'https://www.eaglehillconsulting.com/news/workers-say-they-regularly-spend-time-on-low-value-inefficient-tasks/' },
        { label: 'SmartDev - True Cost of Generative AI for SMEs: 5-Year Breakdown', url: 'https://smartdev.com/gen-ai-implementation-cost-sme/' },
      ],
    },
    en: {
      title: 'Do you need AI, or just a better process?',
      excerpt: 'Everyone is talking about AI. But for most businesses, a simpler process is far more effective than the latest technology.',
      sections: [
        {
          title: 'Beyond the AI hype',
          text: 'Every business feels the pressure to do something with AI. Vendors are calling, competitors are experimenting, and on LinkedIn everyone seems to be halfway through an AI transformation. But if you honestly look at where most time is wasted in your company, the answer is rarely "we need an AI tool". More often it is: unclear steps, duplicate work, or information scattered across three places. According to Eagle Hill Consulting research, 68% of workers regularly spend time on low-value, inefficient tasks. People asking the same colleague the same questions every week. A process nobody can explain anymore, but everyone just keeps following. You do not fix that with a chatbot. You fix that by first understanding what is going wrong.',
        },
        {
          title: 'A real-world example',
          text: 'A company of 40 people wanted to use AI to answer customer questions faster. They had read about chatbots, automatic email classification, and smart routing. But when we looked at the team, the real problem was much simpler: customer information was stored in four different places. Each employee spent an average of 12 minutes per question searching for the right data. That is not an AI problem. That is a data problem. We centralized the information in a simple dashboard. No AI. No chatbot. Average response time went from 25 to 8 minutes.',
        },
        {
          title: 'When AI actually makes sense',
          text: 'AI is not nonsense. But it only makes sense when your basic processes are in order. If your team spends 2 hours every day manually transferring data between systems, the solution is not AI that does it faster. The solution is removing that step entirely. AI becomes powerful when it runs on top of a good process, not as a patch on a broken one. Think of recognizing patterns in clean data, making predictions based on reliable numbers, or automating repetitive decisions with clear rules. But all of that requires the foundation to be solid.',
        },
        {
          title: 'The cost of the wrong choice',
          text: 'According to SmartDev research, an AI implementation for SMEs costs $200,000 to $500,000 over five years, with software licences making up just 30-50% of total costs. And that does not include the time from your team and the months of fine-tuning. If the underlying process is messy, you are automating mess. Faster mess is still mess. Meanwhile, a process improvement of a few weeks could have delivered the same result for a fraction of the cost. Not because AI is bad, but because the problem was not an AI problem.',
        },
        {
          title: 'Start with the basics',
          text: 'Before investing in AI, ask yourself three questions. Do we know where the most time is lost? Can we explain the problem to a new colleague in 5 minutes? Is there a simpler solution we have not tried yet? Often the answer to that last question is yes. And that simpler solution costs a fraction of what an AI implementation costs. Sometimes the best technology is no technology.',
        },
      ],
      sources: [
        { label: 'Eagle Hill Consulting - Workers spend time on low-value, inefficient tasks (2023)', url: 'https://www.eaglehillconsulting.com/news/workers-say-they-regularly-spend-time-on-low-value-inefficient-tasks/' },
        { label: 'SmartDev - True Cost of Generative AI for SMEs: 5-Year Breakdown', url: 'https://smartdev.com/gen-ai-implementation-cost-sme/' },
      ],
    },
  },
  {
    key: 'procesverbetering-hoeft-niet-ingewikkeld',
    slugs: {
      nl: 'procesverbetering-hoeft-niet-ingewikkeld',
      en: 'process-improvement-doesnt-have-to-be-complicated',
    },
    author: 'Max Poppes',
    publishedDate: '2026-02-24',
    readTime: 4,
    category: 'procesverbetering',
    relatedServices: ['werkprocessen'],
    nl: {
      title: 'Procesverbetering hoeft niet ingewikkeld te zijn',
      excerpt: 'Lean-principes zijn simpel en krachtig. Het probleem is niet het framework, maar het circus eromheen.',
      sections: [
        {
          title: 'De kern is simpel',
          text: 'Lean is in de basis een heel simpel idee, ontwikkeld door Taiichi Ohno bij Toyota tussen 1948 en 1975. Kijk hoe het werk gedaan wordt. Spot wat geen waarde toevoegt. Verbeter het. Meet of het werkt. Herhaal. Dat is het. Later vertaalde Eric Ries dezelfde filosofie naar build-measure-learn in The Lean Startup. De kern is altijd hetzelfde: observeren, verbeteren en itereren. Ik heb Lean zelf geleerd tijdens mijn studie en het is eerlijk gezegd het meest praktische framework dat ik ken. De principes zijn logisch, concreet en direct toepasbaar. Je hoeft er geen boek voor te lezen of een cursus voor te volgen om ermee te beginnen.',
        },
        {
          title: 'Waar het misgaat',
          text: 'Het probleem is niet Lean. Het probleem is wat er omheen gebouwd is. Er is een hele industrie ontstaan van certificeringen, consultants en methodologieen die simpele principes ingewikkeld maken. Six Sigma met Green Belts en Black Belts. DMAIC-cycli met uitgebreide statistiche analyses. Verandertrajecten van maanden met stuurgroepen en value stream maps aan de muur. Voor je het weet is het framework zelf een project geworden. Een bedrijf van 50 man heeft geen Black Belt-consultant nodig om te zien dat het team elke maandag 3 uur kwijt is aan dezelfde handmatige rapportage. En je hebt geen certificaat aan de muur nodig om te concluderen dat een proces van 14 stappen misschien ook in 6 kan.',
        },
        {
          title: 'Hoe ik het aanpak',
          text: 'Mijn aanpak is in de kern Lean, maar dan zonder de overhead. Ik begin altijd op de werkvloer. Meelopen met de mensen die het werk doen. Niet een halfuur, maar een hele dag. Vragen waar ze tijd aan verliezen. Kijken waar informatie blijft hangen. Luisteren naar de momenten waarop iemand zegt "zo doen we dat hier nu eenmaal". Dat is waar de verspilling zit. Vervolgens pak ik het aan: simpelste oplossing eerst, kijken of het werkt, bijsturen waar nodig. Geen projectplan van 40 paginas. Geen stuurgroep. Geen verandertraject. Gewoon fixen, meten en itereren.',
        },
        {
          title: 'Een concreet voorbeeld',
          text: 'Bij een logistiek bedrijf van 60 man klaagde het planningsteam dat ze elke dag minstens een uur kwijt waren aan "brandjes blussen". Klonk als een communicatieprobleem. Maar na een dag meelopen bleek het iets anders: de chauffeurs kregen hun ritten pas om 7:00 uur \'s ochtends door, terwijl de eerste ritten om 7:30 vertrokken. Elke ochtend hetzelfde verhaal: vragen, wijzigingen, onduidelijkheden. Puur Lean-denken: observeren wat er echt gebeurt, de verspilling identificeren en de simpelste oplossing zoeken. De ritten de avond ervoor delen. Kostte niks. Scheelde een uur per dag. Geen workshop, geen certificering, geen verandertraject.',
        },
        {
          title: 'Je team weet het al',
          text: 'De mensen die het werk doen weten precies waar het vastloopt. Ze hebben vaak al ideeen voor oplossingen, maar niemand vraagt ernaar. Dat is ook een Lean-principe: respect voor de mensen op de werkvloer. Niet als klankbord achteraf, maar als vertrekpunt. Vraag ze: "Wat zou jij veranderen als je het voor het zeggen had?" En doe dan ook echt iets met dat antwoord. Dat bouwt vertrouwen en zorgt ervoor dat de verbetering blijft hangen. Procesverbetering die van bovenaf wordt opgelegd werkt zelden. Procesverbetering die begint bij de mensen die het werk doen, werkt bijna altijd.',
        },
        {
          title: 'Wanneer je wel meer structuur nodig hebt',
          text: 'Soms is een lichtgewicht aanpak niet genoeg. Als je een proces wilt verbeteren dat over meerdere afdelingen loopt, met tientallen stappen en afhankelijkheden, dan heb je meer structuur nodig. Maar zelfs dan hoef je niet het hele certificeringscircus in te huren. Pak de Lean-principes die werken: observeren, verspilling elimineren, itereren, je team betrekken. Voeg structuur toe waar het nodig is en laat de rest weg. Het doel is een beter proces, niet een mooier framework.',
        },
      ],
      sources: [
        { label: 'Wikipedia - Toyota Production System (Taiichi Ohno, 1948-1975)', url: 'https://en.wikipedia.org/wiki/Toyota_Production_System' },
        { label: 'Eric Ries - The Lean Startup (build-measure-learn)', url: 'https://theleanstartup.com/' },
      ],
    },
    en: {
      title: 'Process improvement does not have to be complicated',
      excerpt: 'Lean principles are simple and powerful. The problem is not the framework, but the circus around it.',
      sections: [
        {
          title: 'The core is simple',
          text: 'Lean is fundamentally a very simple idea, developed by Taiichi Ohno at Toyota between 1948 and 1975. Look at how the work gets done. Spot what does not add value. Improve it. Measure whether it works. Repeat. That is it. Later, Eric Ries translated the same philosophy into build-measure-learn in The Lean Startup. The core is always the same: observe, improve, and iterate. I learned Lean during my studies and honestly, it is the most practical framework I know. The principles are logical, concrete, and immediately applicable. You do not need to read a book or take a course to start using them.',
        },
        {
          title: 'Where it goes wrong',
          text: 'The problem is not Lean. The problem is what has been built around it. An entire industry has emerged of certifications, consultants, and methodologies that make simple principles complicated. Six Sigma with Green Belts and Black Belts. DMAIC cycles with extensive statistical analyses. Change programs lasting months with steering committees and value stream maps on the wall. Before you know it, the framework itself has become a project. A company of 50 people does not need a Black Belt consultant to see that the team spends 3 hours every Monday on the same manual report. And you do not need a certificate on the wall to conclude that a 14-step process could probably be done in 6.',
        },
        {
          title: 'How I approach it',
          text: 'My approach is Lean at its core, but without the overhead. I always start on the work floor. Walking alongside the people who do the work. Not for half an hour, but for a full day. Asking where they lose time. Watching where information gets stuck. Listening for the moments when someone says "that is just how we do things here". That is where the waste is. Then I fix it: simplest solution first, check if it works, adjust where needed. No 40-page project plan. No steering committee. No change program. Just fix, measure, and iterate.',
        },
        {
          title: 'A concrete example',
          text: 'At a logistics company of 60 people, the planning team complained they spent at least an hour every day "putting out fires". Sounded like a communication problem. But after spending a day with them, it turned out to be something else: drivers only received their routes at 7:00 AM, while the first routes departed at 7:30. Every morning the same story: questions, changes, confusion. Pure Lean thinking: observe what actually happens, identify the waste, and find the simplest solution. Share routes the evening before. Cost nothing. Saved an hour every day. No workshop, no certification, no change program.',
        },
        {
          title: 'Your team already knows',
          text: 'The people who do the work know exactly where things get stuck. They often already have ideas for solutions, but nobody asks. That is also a Lean principle: respect for the people on the work floor. Not as a sounding board after the fact, but as a starting point. Ask them: "What would you change if it were up to you?" And then actually do something with that answer. That builds trust and makes sure the improvement sticks. Process improvement imposed from the top rarely works. Process improvement that starts with the people who do the work almost always does.',
        },
        {
          title: 'When you do need more structure',
          text: 'Sometimes a lightweight approach is not enough. If you want to improve a process that spans multiple departments, with dozens of steps and dependencies, you need more structure. But even then, you do not need to bring in the full certification circus. Take the Lean principles that work: observe, eliminate waste, iterate, involve your team. Add structure where it is needed and leave the rest. The goal is a better process, not a prettier framework.',
        },
      ],
      sources: [
        { label: 'Wikipedia - Toyota Production System (Taiichi Ohno, 1948-1975)', url: 'https://en.wikipedia.org/wiki/Toyota_Production_System' },
        { label: 'Eric Ries - The Lean Startup (build-measure-learn)', url: 'https://theleanstartup.com/' },
      ],
    },
  },
  {
    key: 'signalen-proces-verbeteren',
    slugs: {
      nl: 'signalen-proces-verbeteren',
      en: 'signs-your-process-needs-fixing',
    },
    author: 'Max Poppes',
    publishedDate: '2026-03-03',
    readTime: 4,
    category: 'procesverbetering',
    relatedServices: ['werkprocessen', 'dataOpOrde'],
    nl: {
      title: '5 signalen dat je bedrijfsproces toe is aan verbetering',
      excerpt: 'Niet elk probleem voelt als een probleem. Soms is het gewoon "hoe het hier werkt". Dit zijn de signalen dat het beter kan.',
      sections: [
        {
          title: 'De signalen herkennen',
          text: 'Sommige procesproblemen zijn onzichtbaar geworden. Ze horen bij "hoe het hier gaat". Niemand klaagt meer, want iedereen is eraan gewend. Maar dat maakt ze niet minder kostbaar. Dit zijn vijf signalen die je niet moet negeren.',
        },
        {
          title: 'Signaal 1: Dezelfde vraag, dezelfde persoon',
          text: 'Als meerdere mensen regelmatig dezelfde informatie vragen aan dezelfde collega, dan is die collega een bottleneck geworden. Niet omdat die persoon slecht is in delen, maar omdat het systeem eromheen niet werkt. De informatie zou beschikbaar moeten zijn zonder dat iemand er telkens naar moet vragen. Dit signaal herken je aan zinnen als "vraag dat maar aan Jan" of "Maria weet hoe dat moet".',
        },
        {
          title: 'Signaal 2: Inwerken duurt te lang',
          text: 'Als een nieuwe medewerker weken nodig heeft om "het systeem te snappen", dan is er geen systeem. Er is een verzameling gewoontes die nergens vastliggen. Elke collega doet het net even anders, en de nieuwe medewerker moet dat puzzeltje zelf in elkaar leggen. Goed inwerken zou niet meer dan een paar dagen moeten kosten voor de meeste rollen.',
        },
        {
          title: 'Signaal 3: Meer dan drie bronnen van waarheid',
          text: 'Er zijn meer dan drie Excel-bestanden, systemen of documenten die "de waarheid" bevatten. Niemand weet zeker welke versie de juiste is. Dit leidt tot fouten, dubbel werk, en eindeloos vergelijken. Als je team discussies heeft over welk getal klopt, is dat een signaal dat je datafundament niet op orde is.',
        },
        {
          title: 'Signaal 4: Klanten vragen naar de status',
          text: 'Als klanten regelmatig zelf moeten bellen of mailen om te vragen waar iets blijft, dan werkt je communicatieproces niet. Het betekent niet dat je team slecht communiceert. Het betekent dat er geen moment in het proces zit waarop de klant automatisch op de hoogte wordt gebracht. Dat is een procesprobleem, geen mensenprobleem.',
        },
        {
          title: 'Signaal 5: Een simpele wijziging kost meer dan een dag',
          text: 'Als een kleine aanpassing in je werkwijze, systeem of communicatie meer dan een dag kost, dan is je proces te rigide of te verweven met andere processen. Veranderingen zouden niet spannend moeten zijn. Als iedereen zucht bij het idee van een kleine aanpassing, dan is het proces te complex geworden.',
        },
        {
          title: 'De verborgen kosten',
          text: 'Het lastige aan slechte processen is dat je de kosten niet op een factuur ziet. Onderzoek van The CFO laat zien dat inefficiente processen 20 tot 30% productiviteitsverlies veroorzaken. Het zijn de 15 minuten per persoon per dag die opgeteld weken per jaar worden. Bij een team van 30 mensen is 15 minuten per dag bijna 200 werkdagen per jaar aan verloren productiviteit. Dat is een fulltime medewerker. Het is ook de medewerker die vertrekt omdat het werk onnodig frustrerend is. Volgens Devlin Peck vertrekt 20% van nieuwe medewerkers binnen 45 dagen bij een slechte onboarding. De klant die niet terugkomt omdat de communicatie rommelig was. Die kosten zijn er elke dag, maar niemand telt ze op.',
        },
        {
          title: 'Wat je eraan kunt doen',
          text: 'Herken je drie of meer van deze signalen? Dan is je proces toe aan een revisie. Niet een grote reorganisatie, maar een nuchter gesprek over wat beter kan. Begin met de mensen die het werk doen. Zij weten precies waar het vastloopt. De eerste stap is simpel: loop een dag mee met je team en noteer elk moment waarop iemand iets doet dat onnodig complex, dubbel of frustrerend is. De oplossing is vaak simpeler dan je denkt.',
        },
      ],
      sources: [
        { label: 'The CFO - How inefficient processes waste nearly a third of employees\' time (2019)', url: 'https://the-cfo.io/2019/06/19/how-inefficient-processes-waste-nearly-a-third-of-employees-time/' },
        { label: 'Devlin Peck - Employee Onboarding Statistics (2025)', url: 'https://www.devlinpeck.com/content/employee-onboarding-statistics' },
      ],
    },
    en: {
      title: '5 signs your business process needs improvement',
      excerpt: 'Not every problem feels like a problem. Sometimes it is just "how things work here". These are the signs it can be better.',
      sections: [
        {
          title: 'Recognizing the signs',
          text: 'Some process problems have become invisible. They are part of "how things work here". Nobody complains anymore, because everyone is used to it. But that does not make them less costly. These are five signs you should not ignore.',
        },
        {
          title: 'Sign 1: Same question, same person',
          text: 'When multiple people regularly ask the same colleague for the same information, that colleague has become a bottleneck. Not because they are bad at sharing, but because the system around them does not work. The information should be available without someone having to ask for it every time. You recognize this sign from phrases like "just ask John" or "Maria knows how that works".',
        },
        {
          title: 'Sign 2: Onboarding takes too long',
          text: 'If a new employee needs weeks to "understand the system", there is no system. There is a collection of habits that are not documented anywhere. Every colleague does things slightly differently, and the new hire has to figure out the puzzle on their own. Proper onboarding should not take more than a few days for most roles.',
        },
        {
          title: 'Sign 3: More than three sources of truth',
          text: 'There are more than three Excel files, systems, or documents that contain "the truth". Nobody knows for sure which version is correct. This leads to errors, duplicate work, and endless comparing. If your team has discussions about which number is right, that is a sign your data foundation is not in order.',
        },
        {
          title: 'Sign 4: Clients ask for status updates',
          text: 'When clients regularly have to call or email to ask where something is, your communication process is not working. It does not mean your team communicates poorly. It means there is no point in the process where the client is automatically kept informed. That is a process problem, not a people problem.',
        },
        {
          title: 'Sign 5: A simple change takes more than a day',
          text: 'If a small adjustment to your workflow, system, or communication takes more than a day, your process is too rigid or too intertwined with other processes. Changes should not be a big deal. If everyone sighs at the idea of a small adjustment, the process has become too complex.',
        },
        {
          title: 'The hidden costs',
          text: 'The tricky thing about bad processes is that you do not see the costs on an invoice. Research from The CFO shows that inefficient processes cause 20 to 30% productivity loss. It is the 15 minutes per person per day that add up to weeks per year. In a team of 30 people, 15 minutes per day amounts to almost 200 working days per year of lost productivity. That is a full-time employee. It is also the employee who leaves because the work is unnecessarily frustrating. According to Devlin Peck, 20% of new employees leave within 45 days when onboarding is poor. The client who does not come back because communication was messy. Those costs are there every day, but nobody adds them up.',
        },
        {
          title: 'What you can do about it',
          text: 'Do you recognize three or more of these signs? Then your process needs a revision. Not a big reorganization, but an honest conversation about what can be better. Start with the people who do the work. They know exactly where things get stuck. The first step is simple: spend a day with your team and note every moment someone does something unnecessarily complex, redundant, or frustrating. The solution is often simpler than you think.',
        },
      ],
      sources: [
        { label: 'The CFO - How inefficient processes waste nearly a third of employees\' time (2019)', url: 'https://the-cfo.io/2019/06/19/how-inefficient-processes-waste-nearly-a-third-of-employees-time/' },
        { label: 'Devlin Peck - Employee Onboarding Statistics (2025)', url: 'https://www.devlinpeck.com/content/employee-onboarding-statistics' },
      ],
    },
  },
  {
    key: 'digitalisering-mislukt-mkb',
    slugs: {
      nl: 'digitalisering-mislukt-mkb',
      en: 'why-digitalization-fails-sme',
    },
    author: 'Max Poppes',
    publishedDate: '2026-03-10',
    readTime: 4,
    category: 'digitalisering',
    relatedServices: ['toolsEnSystemen', 'dataOpOrde'],
    nl: {
      title: 'Waarom digitalisering mislukt bij MKB bedrijven',
      excerpt: 'Niet omdat de technologie niet werkt. Maar omdat niemand begon bij het probleem.',
      sections: [
        {
          title: 'De oplossing voor de oplossing',
          text: 'Het patroon is herkenbaar. Een bedrijf koopt software. De implementatie duurt langer dan gepland. Het team werkt er half mee, half omheen. Na een jaar staat het systeem er, maar werkt niemand zoals bedoeld. Na twee jaar gebruikt de helft van het team weer Excel ernaast. Dat is geen uitzondering: volgens McKinsey mislukt 70% van alle digitale transformaties. Het probleem? Niemand heeft eerst gevraagd welk probleem we eigenlijk oplossen. De software werd gekozen op basis van features, niet op basis van het werkproces. De demo zag er goed uit. De salesrep was overtuigend. Maar niemand heeft gekeken of de software past bij hoe het team echt werkt.',
        },
        {
          title: 'Het patroon dat steeds terugkomt',
          text: 'Bij bijna elk mislukt digitaliseringstraject zien we hetzelfde patroon. Het Standish Group CHAOS Report bevestigt dit: 66% van alle IT-projecten eindigt in gedeeltelijk of volledig falen. Er is een vaag gevoel dat "het beter moet". Iemand zoekt een tool die dat oplost. De tool wordt gekozen op basis van features en demos. De implementatie is lastiger dan verwacht. Het team past zich aan de tool aan in plaats van andersom. Na een jaar werkt niemand zoals bedoeld. Het probleem zit in het begin. "Het moet beter" is geen goede start. Wat precies moet beter? Voor wie? Waarom gaat het nu fout? Zonder die antwoorden kies je blind.',
        },
        {
          title: 'Technologie is niet het startpunt',
          text: 'Digitalisering begint niet bij technologie. Het begint bij begrijpen hoe het werk nu gedaan wordt, en waarom. Niet hoe het zou moeten volgens het management, maar hoe het echt gaat op de werkvloer. Pas als je dat snapt, kun je beslissen welke technologie past. Soms is dat een volledige softwareoplossing. Soms is het een simpele aanpassing in hoe informatie gedeeld wordt. En soms is de conclusie dat je helemaal geen nieuwe software nodig hebt, maar dat je bestaande tools anders moet inrichten.',
        },
        {
          title: 'Drie vragen voor je begint',
          text: 'Voordat je een euro uitgeeft aan nieuwe software, beantwoord deze drie vragen. Wat is het concrete probleem? Niet "communicatie kan beter" maar "het duurt gemiddeld 3 dagen voordat een klantverzoek bij de juiste persoon terechtkomt." Wie heeft er last van? Het team dat het werk doet? De klant? Het management dat geen overzicht heeft? Dit bepaalt waar de oplossing moet zitten. En als laatste: wat hebben jullie al geprobeerd? Vaak zijn er al workarounds die bijna werken. Soms is de beste oplossing die workaround officieel maken en verbeteren.',
        },
        {
          title: 'Hoe het wel werkt',
          text: 'Succesvolle digitalisering bij MKB-bedrijven volgt bijna altijd hetzelfde patroon. Klein beginnen. Een concreet probleem aanpakken. De mensen die het werk doen erbij betrekken. Testen of het werkt in de praktijk. Dan pas uitbreiden. Geen big bang, geen groot IT-project. Gewoon stap voor stap verbeteren, met technologie die past bij hoe jullie werken. De eerste verbetering hoeft geen maanden te duren. Begin met het proces dat het meeste frustratie oplevert, en los dat op. Als het team ziet dat het werkt, krijg je draagvlak voor de volgende stap.',
        },
        {
          title: 'Wanneer software wel de juiste keuze is',
          text: 'Niet elke digitalisering mislukt. Software is wel de juiste keuze als je precies weet welk probleem je oplost, als het team betrokken is bij de keuze, en als je bereid bent het werkproces aan te passen waar dat logisch is. De sleutel is: kies software op basis van je proces, niet andersom. En begin met een pilot. Niet met een bedrijfsbrede uitrol op dag een.',
        },
      ],
      sources: [
        { label: 'McKinsey - Why do most transformations fail?', url: 'https://www.mckinsey.com/capabilities/transformation/our-insights/common-pitfalls-in-transformations-a-conversation-with-jon-garcia' },
        { label: 'Standish Group - CHAOS Report on IT Project Outcomes', url: 'https://opencommons.org/CHAOS_Report_on_IT_Project_Outcomes' },
      ],
    },
    en: {
      title: 'Why digitalization fails at SME businesses',
      excerpt: 'Not because the technology does not work. But because nobody started with the problem.',
      sections: [
        {
          title: 'The solution before the problem',
          text: 'The pattern is familiar. A company buys software. Implementation takes longer than planned. The team half uses it, half works around it. After a year, the system is there, but nobody works as intended. After two years, half the team is back to using Excel on the side. This is not an exception: according to McKinsey, 70% of all digital transformations fail. The problem? Nobody first asked which problem we are actually solving. The software was chosen based on features, not on the work process. The demo looked great. The sales rep was convincing. But nobody checked whether the software fits how the team actually works.',
        },
        {
          title: 'The pattern that keeps repeating',
          text: 'In almost every failed digitalization effort, we see the same pattern. The Standish Group CHAOS Report confirms this: 66% of all IT projects end in partial or complete failure. There is a vague feeling that "things need to be better". Someone looks for a tool to fix it. The tool is chosen based on features and demos. Implementation is harder than expected. The team adapts to the tool instead of the other way around. After a year, nobody works as intended. The problem is at the start. "It needs to be better" is not a good starting point. What exactly needs to be better? For whom? Why is it going wrong now? Without those answers, you are choosing blindly.',
        },
        {
          title: 'Technology is not the starting point',
          text: 'Digitalization does not start with technology. It starts with understanding how the work gets done today, and why. Not how it should be done according to management, but how it actually happens on the work floor. Only when you understand that can you decide which technology fits. Sometimes that is a full software solution. Sometimes it is a simple change in how information is shared. And sometimes the conclusion is that you do not need new software at all, but that your existing tools need to be set up differently.',
        },
        {
          title: 'Three questions before you start',
          text: 'Before spending a single euro on new software, answer these three questions. What is the concrete problem? Not "communication could be better" but "it takes an average of 3 days before a client request reaches the right person." Who is affected? The team doing the work? The client? Management lacking oversight? This determines where the solution needs to be. And finally: what have you already tried? Often there are workarounds that almost work. Sometimes the best solution is to make that workaround official and improve it.',
        },
        {
          title: 'How it actually works',
          text: 'Successful digitalization at SME businesses almost always follows the same pattern. Start small. Tackle a concrete problem. Involve the people who do the work. Test whether it works in practice. Then expand. No big bang, no large IT project. Just improve step by step, with technology that fits how you work. The first improvement does not have to take months. Start with the process that causes the most frustration, and fix that. When the team sees it works, you get buy-in for the next step.',
        },
        {
          title: 'When software is the right choice',
          text: 'Not every digitalization fails. Software is the right choice when you know exactly which problem you are solving, when the team is involved in the selection, and when you are willing to adjust the work process where it makes sense. The key is: choose software based on your process, not the other way around. And start with a pilot. Not with a company-wide rollout on day one.',
        },
      ],
      sources: [
        { label: 'McKinsey - Why do most transformations fail?', url: 'https://www.mckinsey.com/capabilities/transformation/our-insights/common-pitfalls-in-transformations-a-conversation-with-jon-garcia' },
        { label: 'Standish Group - CHAOS Report on IT Project Outcomes', url: 'https://opencommons.org/CHAOS_Report_on_IT_Project_Outcomes' },
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
    relatedServices: post.relatedServices || [],
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

// Helper: get blog posts related to a service key
export function getRelatedBlogPosts(serviceKey, lang) {
  return blogPosts
    .filter((post) => post.relatedServices?.includes(serviceKey))
    .map((post) => ({
      slug: post.slugs[lang],
      title: post[lang].title,
      excerpt: post[lang].excerpt,
      readTime: post.readTime,
    }));
}

export default blogPosts;
