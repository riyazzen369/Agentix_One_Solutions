"use client";

// Last-resort screen if the root layout itself fails; it cannot rely on the site's stylesheet.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, background: "#FFF21A", color: "#171717", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
          <div style={{ maxWidth: 520 }}>
            <h1 style={{ fontSize: "2.5rem", textTransform: "uppercase", margin: 0 }}>Something went wrong</h1>
            <p style={{ fontSize: "1.1rem" }}>Please try again in a moment.</p>
            <button type="button" onClick={reset} style={{ padding: "0.9rem 1.4rem", fontWeight: 700, background: "#171717", color: "#FFF21A", border: "2px solid #171717", borderRadius: 12, cursor: "pointer" }}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
