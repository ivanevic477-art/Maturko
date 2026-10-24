// Obavezni ispit iz eseja (Engleski jezik → Esej). Kriteriji ocjenjivanja preuzeti su iz vodiča "Esej" (data/essayMatura.js,
// izvorno Word dokument): 4 odlomka, duljina eseja, uvodne fraze argumenata, topic sentence "protiv", zaključak i jezične konstrukcije.

export const ESSAY_TEST = {
  title: 'Ispit iz eseja',
  // Postotak bodova potreban za prolaz.
  passPercent: 50,
  instruction: 'Write an essay where you will discuss both points of view and give your opinion',

  // Duljina (iz vodiča): 200–250 riječi +/- 10%. Ispod 190 riječi esej automatski pada.
  minWords: 190,
  maxWords: 275, // iznad ovoga se gube bodovi ("nemojte pretjerati, pa dogurati do 400 ili 500 riječi")

  // Teme: dodajte nove po istom uzorku. keywords = početci riječi koje moraju pokazati da je esej o zadanoj temi
  // (promašena tema znači pad). Primjer iz vodiča (studiranje u rodnom gradu) namjerno nije među temama.
  prompts: [
    {
      title: 'Many people believe that students should wear school uniforms, but others claim that this limits their freedom of expression',
      keywords: ['uniform', 'student', 'school', 'freedom', 'express', 'wear', 'limit'],
    },
    {
      title: 'More and more teenagers spend several hours a day on social media, but many claim that it has a negative effect on their lives',
      keywords: ['social', 'media', 'teen', 'hours', 'negative', 'effect', 'life'],
    },
    {
      title: 'Some people think that students should have part-time jobs while studying, while others believe they should focus only on their studies',
      keywords: ['job', 'work', 'part-time', 'study', 'student', 'focus', 'money'],
    },
    {
      title: 'Many young people choose to travel abroad for a year after finishing secondary school, but others say that this is a waste of time',
      keywords: ['travel', 'abroad', 'year', 'school', 'time', 'young', 'experience'],
    },
    {
      title: 'Some schools have replaced classroom teaching with online lessons, but many parents and teachers believe that traditional lessons are better',
      keywords: ['online', 'lesson', 'classroom', 'teach', 'tradition', 'school', 'learn'],
    },
  ],

  // Fraze iz vodiča (malim slovima, bez interpunkcije).
  phrases: {
    // fraze kojima se uvodi argument (+ "first of all" i "to start off" iz primjera u vodiču)
    argument: [
      'firstly', 'secondly', 'thirdly', 'moreover', 'furthermore', 'in addition to that', 'last but not least',
      'another significant point is', 'another point worth mentioning', 'what is more', 'first of all', 'to start off',
    ],
    // topic sentence odlomka "protiv"
    contrast: ['however', 'nevertheless', 'on the other hand', 'in contrast to that', 'as opposed to that'],
    // zaključak: sažimanje
    summing: ['summing it all up', 'to sum it all up', 'in conclusion'],
    // zaključak: osobno mišljenje
    opinion: ['in my opinion', 'my personal opinion is', 'i personally believe', 'i personally think', 'personally i believe', 'personally i think'],
  },
}
