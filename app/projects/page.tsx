export const metadata = {
  title: 'Projects | Priyanshu Kapoor',
};

const projects = [
  {
    title: 'Spartan Homelab',
    description:
      'A remote self-hosted infrastructure running headless in India, managed from Germany over Tailscale mesh VPN. Runs Nextcloud, Jellyfin, a fully automated media stack (Radarr/Sonarr), game servers, and a cross-continent Prometheus/Grafana/Loki monitoring stack. Deployed via GitHub Actions CD pipeline. All on secondhand hardware.',
    tags: ['Debian', 'Docker', 'Tailscale', 'Caddy', 'Prometheus', 'Grafana', 'Loki', 'GitHub Actions', 'Bash'],
    github: 'https://github.com/DarkSpartan26/spartan-homelab',
    live: null,
    badge: { label: 'Active / WIP', type: 'wip' },
  },
  {
    title: 'SSH Portfolio',
    description:
      'A custom SSH server built in Python that drops visitors into an interactive TUI instead of a shell — no login required. Three navigable sections: Projects, Reflections, Contact. Deployed on DigitalOcean Frankfurt with a full GitHub Actions CD pipeline.',
    tags: ['Python', 'paramiko', 'systemd', 'GitHub Actions', 'DigitalOcean', 'Cloudflare'],
    github: 'https://github.com/DarkSpartan26/ssh-portfolio',
    live: 'ssh ssh.priyanshukapoor.me',
    badge: { label: 'Live', type: 'live' },
  },
];

const other = [
  {
    title: 'E-Sports Event Infrastructure',
    year: '2023',
    description:
      'Planned and ran the server infrastructure for a school-wide Minecraft event with 800+ participants. Handled Linux server admin, performance tuning, plugin configuration, and custom map design.',
    tags: ['Linux', 'Minecraft', 'Server Admin'],
  },
];

export default function Projects() {
  return (
    <main>
      <h1 className="fade-in" style={{ marginBottom: '0.5rem' }}>projects</h1>
      <p className="fade-in stagger-1" style={{ marginBottom: '2.5rem' }}>
        things i've built, broken, and fixed again.
      </p>

      {/* ── Main Projects ─────────────────────────────────── */}
      <div className="grid slide-up stagger-2" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        {projects.map((p) => (
          <div key={p.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: 0 }}>{p.title}</h2>
              <span className={`badge badge-${p.badge.type}`}>{p.badge.label}</span>
            </div>

            <p style={{ fontSize: '0.875rem', flex: 1 }}>{p.description}</p>

            <div style={{ marginTop: '1rem' }}>
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="project-card-footer">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                GitHub ↗
              </a>
              {p.live && (
                <code style={{
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: 'var(--cyan)',
                  background: 'var(--hover-bg)',
                  padding: '0.3rem 0.7rem',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                }}>
                  {p.live}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Other / Smaller ───────────────────────────────── */}
      <h2 className="slide-up" style={{
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--text-secondary)',
        marginBottom: '1rem',
      }}>
        Other
      </h2>
      <div className="grid grid-cols-2 slide-up stagger-3">
        {other.map((p) => (
          <div key={p.title} className="card" style={{ backgroundColor: 'var(--hover-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 0 }}>{p.title}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.year}</span>
            </div>
            <p style={{ fontSize: '0.85rem' }}>{p.description}</p>
            <div style={{ marginTop: '0.75rem' }}>
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
