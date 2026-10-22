// DEMO auth: stores users in the browser's localStorage.
// Replace with a real backend (e.g. Firebase/Supabase + Stripe) before launch.
const Auth = {
  users() { return JSON.parse(localStorage.getItem("users") || "[]"); },
  current() {
    const email = localStorage.getItem("session");
    return this.users().find(u => u.email === email) || null;
  },
  save(users) { localStorage.setItem("users", JSON.stringify(users)); },
  signup(name, email, password) {
    email = email.trim().toLowerCase();
    const users = this.users();
    if (!name.trim() || !email || password.length < 6) return "Ispunite sva polja (lozinka: najmanje 6 znakova).";
    if (users.some(u => u.email === email)) return "Račun s ovom e-adresom već postoji.";
    users.push({ name: name.trim(), email, password, paid: false });
    this.save(users);
    localStorage.setItem("session", email);
    return null;
  },
  login(email, password) {
    email = email.trim().toLowerCase();
    const u = this.users().find(u => u.email === email && u.password === password);
    if (!u) return "Pogrešna e-adresa ili lozinka.";
    localStorage.setItem("session", email);
    return null;
  },
  markPaid() {
    const users = this.users();
    const u = users.find(u => u.email === localStorage.getItem("session"));
    if (u) { u.paid = true; this.save(users); }
  },
  logout() { localStorage.removeItem("session"); },
};

function priceLabel() {
  return SITE.price == null ? "Cijena će biti objavljena naknadno" : `${SITE.currency}${SITE.price} ${SITE.period}`;
}
