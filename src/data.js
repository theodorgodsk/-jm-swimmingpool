// Alt tekst-indhold fra JM Swimmingpool, samlet ét sted

export const team = [
  { name: 'John Madsen', role: 'Udgravning, støbning og anlægsarbejde', phone: '29 62 62 48' },
  { name: 'Henrik Albrektsen', role: 'Teknik, fejlsøgning og spa', phone: '30 20 72 14' },
  { name: 'Michael Refsgaard', role: 'Liner, poolservice og kemi', phone: '30 20 04 36' },
]

export const seasons = [
  {
    title: 'Opstart forår',
    desc: 'Lad os gøre din pool klar til sommersæsonen med grundig rengøring, vandbalancering og systemcheck, så den er perfekt til de første varme dage.',
  },
  {
    title: 'Nedlukning efterår',
    desc: 'Beskyt din investering med professionel vinterforberedelse, der sikrer din pool mod frostskader og holder den klar til næste sæson.',
  },
]

// Underside-indhold for hver service
export const servicePages = {
  'ny-pool': {
    label: '01',
    title: 'Ny swimmingpool',
    tagline: 'Et forløb med os er enkelt.',
    image: '/images/summer-1719401_1280-800x600.jpg',
    intro: 'Fra første streg på tegnebrættet til den dag I dykker i. Vi projekterer, udgraver, støber og bygger din pool fra bunden — med komplet ansvar fra start til slut.',
    steps: [
      { n: '01', t: 'Rådgivning & design', d: 'Vi besøger din grund, lytter til drømmen og tegner en pool der passer til haven og budgettet.' },
      { n: '02', t: 'Udgravning & støb', d: 'Vores eget mandskab graver ud, støber og forbereder fundament og terræn.' },
      { n: '03', t: 'Installation', d: 'Liner, teknik, pumpe og varme monteres af specialister med kendskab til både pool- og byggebranchen.' },
      { n: '04', t: 'Indvielse', d: 'Vi fylder, balancerer vandet og overdrager en krystalklar pool — klar til første dyp.' },
    ],
    cta: 'Start mit poolforløb',
  },
  'renovering': {
    label: '02',
    title: 'Renovering af pool',
    tagline: 'Fra et hul med jord til et hul med vand.',
    image: '/images/pool-steps-318330_1280-800x600.jpg',
    intro: 'Træt af den gamle pool? Vi forvandler den til noget der ser ud som dagen den blev født — bare bedre. Ny liner, opdateret teknik og moderne finish.',
    steps: [
      { n: '01', t: 'Gennemgang', d: 'Vi vurderer poolens tilstand og finder præcis hvad der trænger til kærlighed.' },
      { n: '02', t: 'Folieskifte', d: 'Ny liner i din ønskede farve giver poolen et helt nyt og indbydende udtryk.' },
      { n: '03', t: 'Teknik-opgradering', d: 'Pumpe, filter og varme efterses og opdateres til energieffektive løsninger.' },
      { n: '04', t: 'Finish', d: 'Kanter, fliser og anlæg rundt om poolen bringes tilbage i topform.' },
    ],
    cta: 'Få renoveret min pool',
  },
  'poolservice': {
    label: '03',
    title: 'Poolservice',
    tagline: 'Vi står klar til at servicere dig, hvis noget er i uorden.',
    image: '/images/pool-cleaning-330406_1280-800x600.jpg',
    intro: 'Forårsåbning, efterårslukning og alt derimellem. Du nyder vandet — vi holder det krystalklart, året rundt.',
    steps: [
      { n: '01', t: 'Forårsåbning', d: 'Grundig rengøring, vandbalancering og systemcheck så poolen er klar til de første varme dage.' },
      { n: '02', t: 'Løbende service', d: 'Vi kontrollerer kemi, renser og sikrer at teknikken kører som den skal hele sæsonen.' },
      { n: '03', t: 'Fejlsøgning', d: 'Noget i uorden? Vi rykker ud, finder fejlen og løser den hurtigt.' },
      { n: '04', t: 'Vinterklargøring', d: 'Professionel nedlukning der beskytter din pool mod frostskader.' },
    ],
    cta: 'Book service',
  },
}

// Til services-listen på forsiden (overblik + link)
export const serviceList = [
  { slug: 'ny-pool', n: '01', title: 'Ny pool', desc: 'Komplet entreprise fra udgravning til indvielse.', emoji: '🌊' },
  { slug: 'renovering', n: '02', title: 'Renovering', desc: 'Nyt liv til den gamle pool med liner og teknik.', emoji: '🔧' },
  { slug: 'poolservice', n: '03', title: 'Poolservice', desc: 'Åbning, lukning og pasning året rundt.', emoji: '⚙️' },
  { slug: 'pooltag', n: '04', title: 'Pooltag', desc: 'Skræddersyede tag der forlænger sæsonen.', emoji: '⛱️' },
  { slug: 'folieskifte', n: '05', title: 'Folieskifte', desc: 'Ny liner i den farve du drømmer om.', emoji: '✨' },
  { slug: 'anlaeg-og-stoeb', n: '06', title: 'Anlæg og støb', desc: 'Terrasse, kanter og fundament der binder haven sammen.', emoji: '🏗️' },
]
