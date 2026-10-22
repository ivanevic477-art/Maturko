// DEMO pohrana sadržaja: čita/piše u localStorage preglednika, a zadani sadržaj je COURSES iz data.js.
// Zamijenite pravom bazom podataka (npr. Firebase/Supabase) kad se odabere backend.
const Store = {
  courses() {
    try { return JSON.parse(localStorage.getItem("courses")) || COURSES; } catch { return COURSES; }
  },
  save(courses) { localStorage.setItem("courses", JSON.stringify(courses)); },
  reset() { localStorage.removeItem("courses"); },
};
