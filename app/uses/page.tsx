export const metadata = {
  title: 'Uses | Priyanshu Kapoor',
  description: 'Hardware, software, and the homelab stack.',
};

import AsciiDivider from '@/components/AsciiDivider';

const archLogo = `
          /\\
         /  \\
        /\\   \\
       /  ..  \\
      / .    . \\
     /  ..  ..  \\
    / .        . \\
   /  ..    ..  . \\
  /________________\\
`.trimStart();

const fields: [string, string][] = [
  ['User', 'priyanshu@loki'],
  ['OS', 'Arch Linux x86_64'],
  ['WM', 'Hyprland (Wayland)'],
  ['Shell', 'zsh'],
  ['Terminal', 'kitty'],
  ['Editor', 'neovim (+ vscode sometimes)'],
  ['Browser', 'Firefox'],
  ['Location', 'Kaiserslautern, DE'],
];

export default function Uses() {
  return (
    <main>
      <h1 className="fade-in" style={{ marginBottom: '0.5rem' }}>uses</h1>
      <p className="fade-in stagger-1" style={{ marginBottom: '2rem' }}>
        here's the tldr — and then some.
      </p>

      {/* ── Neofetch Block ─────────────────────────────────── */}
      <div className="terminal-card terminal-block slide-up stagger-1" style={{ border: 'none' }}>
        <pre className="terminal-ascii">{archLogo}</pre>

        <div className="terminal-info">
          <div className="terminal-title">priyanshu@loki<span className="cursor-blink"></span></div>
          <div className="terminal-divider">{'─'.repeat(28)}</div>

          {fields.map(([label, value]) => (
            <div className="terminal-row" key={label}>
              <span className="terminal-label">{label}</span>
              <span style={{ color: 'var(--text-secondary)' }}>= </span>
              <span className="terminal-value">{value}</span>
            </div>
          ))}

          {/* colour palette dots */}
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.4rem' }}>
            {['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560', '#5de4c7', '#5fb98f', '#ead390'].map(c => (
              <span key={c} style={{
                width: 14, height: 14, borderRadius: '50%',
                backgroundColor: c, display: 'inline-block',
                border: '1px solid rgba(255,255,255,0.08)'
              }} />
            ))}
          </div>
        </div>
      </div>



      {/* ── Daily Machine ──────────────────────────────────── */}
      <div className="uses-section slide-up stagger-2">
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>Daily Machine — Loki</h3>
        <div className="uses-grid">
          <div className="uses-card">
            <div className="uses-card-title">Lenovo ThinkBook 14 G7 ARP</div>
            <div className="uses-card-sub">14" IPS · 1920×1200</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">AMD Ryzen 5 7535HS</div>
            <div className="uses-card-sub">12 threads @ 4.6 GHz boost</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">12 GB RAM · 467 GB SSD</div>
            <div className="uses-card-sub">enough, barely</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">Arch Linux x86_64</div>
            <div className="uses-card-sub">Hyprland on Wayland</div>
          </div>
        </div>
      </div>

      {/* ── Homelab Server ─────────────────────────────────── */}
      <div className="uses-section slide-up stagger-2">
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>Homelab Server — Servy (India)</h3>
        <div className="uses-grid">
          <div className="uses-card">
            <div className="uses-card-title">Repaired secondhand HP laptop</div>
            <div className="uses-card-sub">running headless 24/7</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">Intel Core i5-7200U · 8 GB RAM</div>
            <div className="uses-card-sub">1.5 TB total storage</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">Debian 13 (Trixie)</div>
            <div className="uses-card-sub">16+ day uptimes typical</div>
          </div>
        </div>
      </div>

      {/* ── Gaming PC ──────────────────────────────────────── */}
      <div className="uses-section slide-up stagger-2">
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>Gaming / Secondary PC (India)</h3>
        <div className="uses-grid">
          <div className="uses-card">
            <div className="uses-card-title">Intel Core i5-12400F · 16 GB RAM</div>
            <div className="uses-card-sub">NVIDIA RTX 3050</div>
          </div>
          <div className="uses-card">
            <div className="uses-card-title">~4 TB total storage</div>
            <div className="uses-card-sub">Windows · Parsec remote gaming target</div>
          </div>
        </div>
      </div>

      {/* ── Software ───────────────────────────────────────── */}
      <div className="uses-section slide-up stagger-3">
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>Software & Tools</h3>
        <ul className="uses-list">
          {[
            ['Shell',         'zsh'],
            ['Terminal',      'kitty'],
            ['Editor',        'Neovim (primary) · VSCode (sometimes)'],
            ['WM',            'Hyprland'],
            ['Browser',       'Firefox'],
            ['Multiplexer',   'tmux'],
            ['Remote access', 'Tailscale · Parsec'],
          ].map(([k, v]) => (
            <li key={k}>
              <span className="uses-list-key">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Self-Hosted ────────────────────────────────────── */}
      <div className="uses-section slide-up stagger-3">
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>Self-Hosted Services</h3>
        <div className="uses-grid">
          {[
            { name: 'Nextcloud', desc: 'personal cloud, shared with friends' },
            { name: 'Jellyfin + Radarr/Sonarr', desc: 'automated media pipeline' },
            { name: 'Prometheus + Grafana + Loki', desc: 'cross-continent monitoring' },
            { name: 'Pi-hole', desc: 'network-level DNS blocking' },
            { name: 'Caddy', desc: 'reverse proxy with automatic HTTPS' },
            { name: 'Game servers', desc: 'Minecraft etc.' },
          ].map((s) => (
            <div key={s.name} className="uses-card">
              <div className="uses-card-title">{s.name}</div>
              <div className="uses-card-sub">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>


    </main>
  );
}
