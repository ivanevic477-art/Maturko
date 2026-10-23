// Članak "Esej mature" za odjeljak Esej (Engleski jezik).
// U tekstu: **podebljano** i *kurziv*. Vrste blokova: p, note, tip, h, list, outline, task, step, essay.
const argumentParts = 'Argument se sastoji od uvodne riječi (podebljano), teze i objašnjenja ili primjera (kurziv).'

export const ESSAY_GUIDE = {
  title: 'Esej',
  blocks: [
    { type: 'p', text: 'Kada pišete maturalni esej na A razini, morate imati na umu kako on mora sadržavati sljedeće dijelove:' },
    {
      type: 'outline',
      items: [
        { title: 'I. UVOD', parts: ['General introduction', 'Specific introduction', 'Topic question'] },
        { title: 'II. ARGUMENTI „ZA“', parts: ['Topic sentence', 'Argument 1', 'Argument 2'] },
        { title: 'III. ARGUMENTI „PROTIV“', parts: ['Topic sentence', 'Argument 1', 'Argument 2'] },
        { title: 'IV. ZAKLJUČAK', parts: ['Summing up', 'Personal opinion'] },
      ],
    },
    { type: 'p', text: 'Dakle, imate četiri glavna odlomka, od kojih svaki sadržava određene „pododlomke.“' },
    {
      type: 'p',
      text: 'Prije nego pokažemo na primjeru jednoga eseja kako to treba izgledati, treba razjasniti i strukturu argumenta. Naime, svaki argument sastoji se od tri dijela, a to su:',
    },
    { type: 'list', ordered: true, items: ['Uvodna riječ', 'Teza ili tvrdnja', 'Objašnjenje ili primjer'] },
    { type: 'p', text: 'Sada ćemo na konkretnom primjeru ilustrirati kako esej treba izgledati.' },
    { type: 'note', text: 'Neka vas ne uplaši što je naslov obično prilično dugačak!' },
    {
      type: 'task',
      title: 'Many young people who enter higher education choose to study in their hometown and continue living with their parents throughout their university years, but many claim this is not a good decision',
      instruction: 'Write an essay where you will discuss both points of view and give your opinion',
    },
    {
      type: 'tip',
      text: 'Esej treba imati između 200-250 riječi, +/- 10%. Dakle, ne smijete imati manje od 190 riječi, jer automatski padate maturu, ali smijete ih imati više od 250, no pazite da budete precizni i koncizni i ne ponavljate jednu te istu stvar. Nemojte pretjerati, pa dogurati do 400 ili 500 riječi! Savjet je da prije početka pisanja napravite tablicu s argumentima za i protiv i dobro razmislite o njima, te pri tome pazite da vam dva argumenta zapravo nisu jedan te isti, samo rečeni drugim riječima. Možete imati i više od dva argumenta, ali preporuča se da ih imate jednak broj i u odlomku „za“ i u odlomku „protiv“.',
    },

    { type: 'h', text: 'Uvod' },
    {
      type: 'step',
      label: 'General introduction',
      text: 'ovdje dajete općeniti uvod, još ne spominjete konkretnu temu, ali upoznajete čitatelja u kojem će se smjeru kretati esej (dakle, ovdje ćete pisati o mladima i godinama studiranja, a ne o nogometu, vrtiću, braku ili nečem trećem).',
      example: 'When young people turn 18, they usually start university and are considered mature.',
    },
    {
      type: 'step',
      label: 'Specific introduction',
      text: 'ovdje navodite konkretnu temu o kojoj ćete pisati i koja vam je zadana naslovom (pazite da ne prepisujete naslov ili neki njegov dio, morate ga preformulirati!)',
      example: 'Many of them leave home and study in another town, but many also stay at home and still live with their parents while they are studying.',
    },
    {
      type: 'step',
      label: 'Topic question',
      text: 'ovo je jedini dio eseja koji je opcionalan, tj. možete ga izbaciti, ali dobro je postaviti topic question jer ono pomaže i vama da znate što vam je zapravo tema, a i čitatelju da lakše prati tekst. Dobro pazite da ne pogriješite temu i doista pišete o onome što vam je u naslovu, jer promašena tema znači pad na maturi!',
      example: 'Although a lot of people say that it is better to leave home, there are also positive sides of living with your parents. So what is really better?',
    },

    { type: 'h', text: 'Argumenti za / for' },
    {
      type: 'p',
      text: 'Navodite argumente koji govore u prilog onome što je rečeno u naslovu. MORATE biti objektivni i navesti sve argumente koji mogu poduprijeti tezu, makar se vi možda ne slagali s njima. Nigdje još ne pišete što vi osobno mislite!',
    },
    {
      type: 'step',
      label: 'Topic sentence',
      text: 'navodite hoćete li sada pisati o argumentima za ili protiv. Još ne navodite nikakav argument i ništa ne objašnjavate!',
      example: 'There are many reasons why it is better to stay at home.',
    },
    {
      type: 'step',
      label: 'Argument 1',
      text: `svaki argument MORA biti uveden nekom uvodnom frazom. Zatim slijedi teza koju iznosite, a potom objašnjenje te teze (ili neki primjer koji je ilustrira). Argument ne mora biti dugačak nekoliko redova, dovoljna su jedna ili dvije rečenice, ali je važno da sadrži tri dijela koja su navedena u uputama gore. ${argumentParts}`,
      phrasesTitle: 'Fraze kojima možete uvesti argument',
      phrases: [
        'FIRSTLY', 'SECONDLY', 'THIRDLY', 'MOREOVER', 'FURTHERMORE', 'IN ADDITION TO THAT',
        'LAST BUT NOT LEAST (samo kod zadnjeg argumenta!)', 'ANOTHER SIGNIFICANT POINT IS', 'ANOTHER POINT WORTH MENTIONING', 'WHAT IS MORE…',
      ],
      example: '**First of all,** you already know the town where you are studying, *so it makes it easier for you to concentrate on your studies.*',
    },
    {
      type: 'step',
      label: 'Argument 2',
      example: "**Secondly,** if you live with your parents, the cost of your university education will not be too high, *as you don't have to pay for anything extra, e.g. flat, food…*",
    },

    { type: 'h', text: 'Argumenti protiv / against' },
    {
      type: 'p',
      text: 'Sada radite isto što i u gornjem odlomku, samo sa suprotnim argumentima. Trudite se da ne ponavljate iste uvodne riječi u argumentima kao u gornjem odlomku, nego da budu različite!',
    },
    {
      type: 'step',
      label: 'Topic sentence',
      text: 'topic sentence počinjete nekom riječju koja će jasno dati do znanja da ćete govoriti o suprotnim argumentima. Važno je imati na umu da topic sentence još uvijek ne daje nikakav argument niti objašnjenje!',
      phrasesTitle: 'Npr.',
      phrases: ['HOWEVER', 'NEVERTHELESS', 'ON THE OTHER HAND', 'IN CONTRAST TO THAT', 'AS OPPOSED TO THAT…'],
      example: 'However, there are also many drawbacks of staying with your parents.',
    },
    {
      type: 'step',
      label: 'Argument 1',
      example: '**To start off,** perhaps it is time to grow up and start taking care of yourself on your own. *While studying, you are already an adult and you should be independent.*',
    },
    {
      type: 'step',
      label: 'Argument 2',
      example: '**Furthermore,** if you are at home, your parents will surely ask you every day if you are learning and if you have done everything for your studies. *This might be annoying and stressful.*',
    },

    { type: 'h', text: 'Zaključak' },
    { type: 'p', text: 'Zaključak se sastoji od dva dijela.' },
    {
      type: 'step',
      label: 'Summing up',
      text: 'sažimate argumente koje ste gore naveli, ali ne istim riječima i puno kraće!',
      phrasesTitle: 'Fraze koje možete koristiti',
      phrases: ['SUMMING IT ALL UP', 'TO SUM IT ALL UP', 'IN CONCLUSION…'],
      example: 'Summing it all up, there are both good and bad sides of living with your parents while studying. You know the town and the costs of living are not high, but on the other hand it is good to be independent.',
    },
    {
      type: 'step',
      label: 'Personal opinion',
      text: 'esej završavate vlastitim mišljenjem i to je jedini dio gdje smijete (i zapravo morate) reći što vi mislite. To mišljenje morate i objasniti!',
      phrasesTitle: 'Fraze koje koristite',
      phrases: ['IN MY OPINION', 'MY PERSONAL OPINION IS', 'I PERSONALLY BELIEVE/THINK…'],
      example: 'Personally I believe that it is better to stay at home because it is easier and you can really concentrate on your studies.',
    },

    { type: 'h', text: 'Cijeli esej' },
    { type: 'p', text: 'Evo sada kako bi taj esej trebao izgledati kada ga „slijepimo“:' },
    {
      type: 'essay',
      paragraphs: [
        'When young people turn 18, they usually start university and are considered mature. Many of them leave home and study in another town, but many also stay at home and still live with their parents while they are studying. Although a lot of people say that it is better to leave home, there are also positive sides of living with your parents. So what is really better?',
        "There are many reasons why it is better to stay at home. First of all, you already know the town where you are studying, so it makes it easier for you to concentrate on your studies. Secondly, if you live with your parents, the cost of your university education will not be too high, as you don't have to pay for anything extra, e.g. flat, food…",
        'However, there are also many drawbacks of staying with your parents. To start off, perhaps it is time to grow up and start taking care of yourself on your own. While studying, you are already an adult and you should be independent. Furthermore, if you are at home, your parents will surely ask you every day if you are learning and if you have done everything for your studies. This might be annoying and stressful.',
        'Summing it all up, there are both good and bad sides of living with your parents while studying. You know the town and the costs of living are not high, but on the other hand it is good to be independent. Personally I believe that it is better to stay at home because it is easier and you can really concentrate on your studies.',
      ],
    },

    { type: 'h', text: 'Jezične konstrukcije koje je dobro koristiti u eseju' },
    {
      type: 'list',
      items: [
        'Passive',
        'Modal Verbs of Probability',
        'Conditional Clauses',
        'Participle Clauses',
        'Phrasal Verbs',
        'Complex Conjunctions (as long as, not only…but also, either…or, …)',
        'Relative Clauses',
      ],
    },
  ],
}
