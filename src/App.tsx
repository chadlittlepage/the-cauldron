import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-cauldron-dark text-cauldron-text">
      <nav className="border-b border-cauldron-border bg-cauldron-surface px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-bold text-accent-orange">
            The Witches' Cauldron
          </a>
          <div className="flex gap-6 text-sm text-cauldron-muted">
            <a href="/submit" className="hover:text-cauldron-text transition-colors">
              Submit Music
            </a>
            <a href="/featured" className="hover:text-cauldron-text transition-colors">
              Featured Tracks
            </a>
            <a href="/curators" className="hover:text-cauldron-text transition-colors">
              Curators
            </a>
            <a
              href="/login"
              className="rounded-md bg-primary px-4 py-1.5 text-white hover:bg-primary-light transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main className="mx-auto max-w-7xl px-6 py-20 text-center">
              <h1 className="text-5xl font-bold tracking-tight">
                Where Magical Music Meets
                <br />
                <span className="text-accent-purple">Mystical Curation</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-cauldron-muted">
                Submit your tracks for $2, get curated by our enchanted panel, and earn exposure in
                our spellbinding community.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <a
                  href="/submit"
                  className="rounded-lg bg-accent-purple px-8 py-3 font-semibold text-white hover:bg-accent-purple/90 transition-colors"
                >
                  Submit Your Track
                </a>
                <a
                  href="/featured"
                  className="rounded-lg border border-cauldron-border bg-cauldron-card px-8 py-3 font-semibold text-cauldron-text hover:border-primary transition-colors"
                >
                  Browse Featured
                </a>
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
