// ===== UREDITE OVU DATOTEKU za dodavanje sadržaja =====

const SITE = {
  name: "Maturko",
  // Upišite broj (npr. 29) kad se odredi cijena. null prikazuje "Cijena će biti objavljena naknadno".
  price: null,
  currency: "€",
  period: "godišnje",
  // Šifra za stranicu admin.html (samo demo zaštita, promijenite je!).
  adminCode: "maturko-admin",
};

// Svaki predmet = jedna "učionica". Dodajte ih koliko god treba.
// Vrste gradiva: "lesson" | "assignment" | "test" | "video" | "file"
const COURSES = [
  {
    id: "math", title: "Matematika", section: "Priprema za maturu", color: "#1a73e8",
    description: "Algebra, funkcije, geometrija i vjerojatnost.",
    announcements: [
      { date: "2026-10-01", text: "Dobro došli! Započnite s temom Funkcije i riješite prvi probni ispit." },
    ],
    topics: [
      { name: "Funkcije", items: [
        { type: "lesson", title: "Linearne i kvadratne funkcije", link: "#", date: "2026-10-01" },
        { type: "assignment", title: "Zadatci za vježbu 1", link: "#", date: "2026-10-05" },
      ]},
      { name: "Ispiti iz prijašnjih godina", items: [
        { type: "test", title: "Primjer ispita državne mature (dodajte poveznicu na datoteku)", link: "#", date: "2026-10-10" },
      ]},
    ],
  },
  {
    id: "lang", title: "Hrvatski jezik", section: "Priprema za maturu", color: "#188038",
    description: "Čitanje, pisanje eseja i književnost.",
    announcements: [],
    topics: [{ name: "Pisanje eseja", items: [
      { type: "lesson", title: "Kako strukturirati esej", link: "#", date: "2026-10-02" },
    ]}],
  },
  {
    id: "eng", title: "Engleski jezik", section: "Priprema za maturu", color: "#e37400",
    description: "Gramatika, slušanje i pisanje.",
    announcements: [],
    topics: [{ name: "Gramatika", items: [
      { type: "video", title: "Glagolska vremena", link: "#", date: "2026-10-03" },
    ]}],
  },
];
