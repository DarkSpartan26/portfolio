'use client';

import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import AsciiDivider from '@/components/AsciiDivider';

const DinoGame = dynamic(() => import('@/components/DinoGame'), { ssr: false });

const heroFields: [string, string][] = [
  ['os',       'Arch Linux'],
  ['wm',       'Hyprland'],
  ['location', 'Kaiserslautern, DE'],
  ['status',   'CS student → DevOps'],
  ['uptime',   '1yr into the rabbit hole'],
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        background: 'none',
        border: '1px solid var(--border-color)',
        borderRadius: 5,
        color: copied ? 'var(--green)' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '0.7rem',
        padding: '0.2rem 0.55rem',
        transition: 'color 0.2s, border-color 0.2s',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {copied ? '✓ copied' : 'copy'}
    </button>
  );
}

const projects = [
  {
    title: 'Spartan Homelab',
    description:
      'Remote self-hosted infra running in India, managed from Germany over Tailscale VPN. Nextcloud, Jellyfin, automated media stack, cross-continent Prometheus/Grafana monitoring.',
    tags: ['Debian', 'Docker', 'Tailscale', 'Grafana'],
    badge: { label: 'Active', type: 'wip' },
    github: 'https://github.com/DarkSpartan26/spartan-homelab',
    snippet: null,
  },
  {
    title: 'SSH Portfolio',
    description:
      "A Python SSH server that drops visitors into a TUI instead of a shell. No login needed — just SSH in.",
    tags: ['Python', 'paramiko', 'DigitalOcean', 'systemd'],
    badge: { label: 'Live', type: 'live' },
    github: 'https://github.com/DarkSpartan26/ssh-portfolio',
    snippet: 'ssh ssh.priyanshukapoor.me',
  },
];



export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="fade-in" style={{ padding: '3.5rem 0 2.5rem' }}>

        {/* Full-width heading */}
        <h1 style={{
          fontSize: '2.4rem',
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          marginBottom: '0.6rem',
        }}>
          Hi, I'm Priyanshu.
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          CS student exploring systems, ideas, and the internet one rabbit hole at a time.
        </p>

        {/* Two-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'stretch',
          gap: '2rem',
        }}>

          {/* Left column — fastfetch + buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Fastfetch terminal card */}
            <div className="terminal-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Title bar */}
              <div style={{
                padding: '0.45rem 0.9rem',
                background: '#181818',
                borderBottom: '1px solid #252525',
                fontSize: '0.7rem',
                color: '#444',
                flexShrink: 0,
              }}>
                user@loki: ~
              </div>
              {/* Terminal body */}
              <div
                style={{
                  padding: '0.85rem 1.1rem',
                  fontSize: '0.75rem',
                  lineHeight: 1.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* ── whoami ──────────────────────────────── */}
                <div style={{ color: 'var(--cyan)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  user@loki:~$ <span style={{ color: '#fff', fontWeight: 400 }}>whoami</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '0.1rem', marginBottom: '1.1rem', color: '#ccc' }}>
                  <span style={{ color: 'var(--cyan)' }}>name</span>      <span>Priyanshu</span>
                  <span style={{ color: 'var(--cyan)' }}>role</span>      <span>CS student</span>
                  <span style={{ color: 'var(--cyan)' }}>focus</span>     <span>linux / infra / devops</span>
                  <span style={{ color: 'var(--cyan)' }}>status</span>    <span>building quietly</span>
                  <span style={{ color: 'var(--cyan)' }}>location</span>  <span>Germany</span>
                  <span style={{ color: 'var(--cyan)' }}>uptime</span>    <span>still exploring...</span>
                  <span style={{ color: 'var(--cyan)' }}>mood</span>      <span style={{ display: 'flex', flexDirection: 'column' }}>
                                                                              <span>somewhere between</span>
                                                                              <span>terminals and mountains</span>
                                                                            </span>
                </div>

                {/* ── systemctl ───────────────────────────── */}
                <div style={{ opacity: 0.85 }}>
                  <div style={{ color: 'var(--cyan)', fontWeight: 600, marginBottom: '0.65rem' }}>
                    user@loki:~$ <span style={{ color: '#fff', fontWeight: 400 }}>systemctl list-units --type=service</span>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc' }}>
                      <span><span style={{ color: 'var(--green)' }}>●</span> learning.service</span>
                      <span style={{ color: 'var(--green)' }}>active (running)</span>
                    </div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ devops</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ networking</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>└─ content creation</div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc' }}>
                      <span><span style={{ color: 'var(--green)' }}>●</span> curiosity.service</span>
                      <span style={{ color: 'var(--green)' }}>active (running)</span>
                    </div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ philosophy</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ exploring new ideas</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>└─ internet culture</div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc' }}>
                      <span><span style={{ color: 'var(--yellow)' }}>●</span> homelab.service</span>
                      <span style={{ color: 'var(--yellow)' }}>active (expanding)</span>
                    </div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ self-hosting</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ automation</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>└─ maybe kubernetes someday™</div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc' }}>
                      <span><span style={{ color: 'var(--green)' }}>●</span> projects.service</span>
                      <span style={{ color: 'var(--green)' }}>active (running)</span>
                    </div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ building cool things</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>├─ making videos</div>
                    <div style={{ color: '#888', marginLeft: '0.6rem' }}>└─ coding for fun</div>
                  </div>
                </div>

                  <div style={{ color: 'var(--cyan)', fontWeight: 600, marginTop: '1rem', marginBottom: '0.25rem' }}>
                    user@loki:~$ <span className="cursor-blink"></span>
                  </div>
              </div>
            </div>


          </div>

          {/* Right column — Dino Game */}
          <div style={{ display: 'flex', minWidth: 0 }}>
            <DinoGame />
          </div>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────── */}
      <AsciiDivider />
      <section className="slide-up stagger-1">
        <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 600 }}>
          Selected Work
          <span className="ascii-status">[0x01]</span>
        </h2>
        <div className="grid grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.title}
              className="card"
              style={{
                borderTop: '2px solid #22d3ee',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                position: 'relative',
              }}
            >
              {/* badge */}
              <span
                className={`badge badge-${p.badge.type}`}
                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                {p.badge.label}
              </span>

              <h3 style={{ fontSize: '1rem', marginBottom: '0.6rem', paddingRight: '4rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', flex: 1 }}>{p.description}</p>

              <div style={{ marginTop: '0.85rem' }}>
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* SSH snippet */}
              {p.snippet && (
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'var(--terminal-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '0.45rem 0.75rem',
                }}>
                  <code style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--cyan)', flex: 1 }}>
                    {p.snippet}
                  </code>
                  <CopyButton text={p.snippet} />
                </div>
              )}

              {/* GitHub link */}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '0.85rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                ↗ View on GitHub
              </a>
            </div>
          ))}
        </div>
      </section>


    </main>
  );
}
