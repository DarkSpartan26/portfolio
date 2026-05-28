'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Entire game is written inline as a string injected into an iframe via srcdoc.
// No external scripts, no CDN, no CORS issues.
// ─────────────────────────────────────────────────────────────────────────────
const GAME_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;background:transparent;overflow:hidden;display:flex;align-items:center;justify-content:center}
  canvas{display:block;cursor:pointer}
</style>
</head>
<body>
<canvas id="c"></canvas>
<script>
const C = document.getElementById('c');
const ctx = C.getContext('2d');

// ── sizing ───────────────────────────────────────────────────────────────────
function resize(){
  C.width  = C.parentElement.clientWidth  || 480;
  C.height = C.parentElement.clientHeight || 220;
}
resize();
window.addEventListener('resize', () => { resize(); });

// ── colours ──────────────────────────────────────────────────────────────────
const BG       = '#111111';
const CLR_DINO = '#ffffff';
const CLR_OBS  = '#5de4c7';
const CLR_GND  = '#333333';
const CLR_SCR  = '#5de4c7';
const CLR_TXT  = '#666666';
const CLR_DEAD = '#ffffff';

// ── constants ────────────────────────────────────────────────────────────────
const GRAVITY   = 0.65;
const JUMP_V    = -13;
const DINO_W    = 36;
const DINO_H    = 46;
const DINO_X    = 90;
let   SPEED     = 5;

// ── state ────────────────────────────────────────────────────────────────────
let ground, dino, obs, score, frame, dead, started, hi;

function gnd(){ return C.height - 48; }

function reset(){
  ground  = gnd();
  dino    = { y: ground, vy: 0, jumping: false };
  obs     = [];
  score   = 0;
  frame   = 0;
  dead    = false;
  started = false;
  SPEED   = 5;
  if(hi === undefined) hi = 0;
}
reset();

// ── input ────────────────────────────────────────────────────────────────────
function act(){
  if(dead){ reset(); return; }
  if(!started){ started = true; return; }
  if(!dino.jumping){ dino.vy = JUMP_V; dino.jumping = true; }
}

window.addEventListener('keydown', e => {
  if(e.code === 'Space' || e.code === 'ArrowUp' || e.key === ' '){
    e.preventDefault();
    act();
  }
});
C.addEventListener('click', act);
C.addEventListener('touchstart', e => { e.preventDefault(); act(); }, {passive:false});

// ── obstacle spawn ───────────────────────────────────────────────────────────
function maybespawn(){
  const gap = Math.max(55, 130 - SPEED * 6);
  if(obs.length === 0 || C.width - obs[obs.length-1].x > gap * 18){
    if(frame % Math.floor(gap) === 0){
      const h = 28 + Math.random() * 32;
      const w = 14 + Math.random() * 10;
      // single or double cactus
      const count = Math.random() > 0.6 ? 2 : 1;
      for(let i=0;i<count;i++){
        obs.push({ x: C.width + i * (w + 6), y: ground + DINO_H - h, w, h });
      }
    }
  }
}

// ── draw helpers ─────────────────────────────────────────────────────────────
function drawDino(){
  const x = DINO_X, y = dino.y;
  const W = DINO_W, H = DINO_H;
  ctx.fillStyle = CLR_DINO;

  // body
  ctx.fillRect(x, y + 10, W - 6, H - 18);
  // head
  ctx.fillRect(x + 8, y, W - 4, 20);
  // tail
  ctx.fillRect(x - 8, y + 12, 12, 8);
  // eye
  ctx.fillStyle = '#111';
  ctx.fillRect(x + W - 9, y + 5, 5, 5);
  ctx.fillStyle = CLR_DINO;

  // legs (animate)
  const legPhase = Math.floor(frame / 5) % 2;
  if(!dino.jumping){
    if(legPhase === 0){
      ctx.fillRect(x + 4,  y + H - 14, 8, 14);
      ctx.fillRect(x + 18, y + H - 10, 8, 10);
    } else {
      ctx.fillRect(x + 4,  y + H - 10, 8, 10);
      ctx.fillRect(x + 18, y + H - 14, 8, 14);
    }
  } else {
    ctx.fillRect(x + 4,  y + H - 8,  8, 8);
    ctx.fillRect(x + 18, y + H - 8,  8, 8);
  }
}

function drawObs(o){
  ctx.fillStyle = CLR_OBS;
  // trunk
  ctx.fillRect(o.x + o.w * 0.3, o.y, o.w * 0.4, o.h);
  // left arm
  ctx.fillRect(o.x,              o.y + o.h * 0.25, o.w * 0.35, o.w * 0.35);
  // right arm
  ctx.fillRect(o.x + o.w * 0.65, o.y + o.h * 0.3, o.w * 0.35, o.w * 0.35);
}

// ── update ───────────────────────────────────────────────────────────────────
function update(){
  if(!started || dead) return;
  frame++;
  score++;
  if(score % 600 === 0) SPEED = Math.min(SPEED + 0.4, 14);

  // physics
  dino.vy += GRAVITY;
  dino.y  += dino.vy;
  if(dino.y >= ground){ dino.y = ground; dino.vy = 0; dino.jumping = false; }

  maybespawn();

  // move + cull obstacles
  obs.forEach(o => o.x -= SPEED);
  obs = obs.filter(o => o.x > -60);

  // collision (slightly inset box)
  const inset = 6;
  for(const o of obs){
    if(DINO_X + inset < o.x + o.w &&
       DINO_X + DINO_W - inset > o.x &&
       dino.y + inset < o.y + o.h &&
       dino.y + DINO_H > o.y){
      dead = true;
      if(score > hi) hi = score;
    }
  }
}

// ── draw ─────────────────────────────────────────────────────────────────────
function draw(){
  const W = C.width, H = C.height;
  const gY = ground + DINO_H + 3;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // ground
  ctx.fillStyle = CLR_GND;
  ctx.fillRect(0, gY, W, 1);

  // score
  ctx.fillStyle = CLR_SCR;
  ctx.font = '600 13px "Courier New",monospace';
  ctx.textAlign = 'right';
  const sc = String(Math.floor(score/10)).padStart(5,'0');
  const hs = String(Math.floor(hi/10)).padStart(5,'0');
  ctx.fillText((hi>0 ? 'HI '+hs+'  ' : '') + sc, W - 16, 26);
  ctx.textAlign = 'left';

  // obstacles
  obs.forEach(drawObs);

  // dino
  if(!dead || Math.floor(frame/6)%2===0) drawDino();

  // messages
  ctx.textAlign = 'center';
  if(!started && !dead){
    ctx.fillStyle = CLR_TXT;
    ctx.font = '12px "Courier New",monospace';
    ctx.fillText('press space or click to start', W/2, gY/2 + 10);
  }
  if(dead){
    ctx.fillStyle = CLR_DEAD;
    ctx.font = 'bold 15px "Courier New",monospace';
    ctx.fillText('GAME OVER', W/2, H/2 - 18);
    ctx.fillStyle = CLR_TXT;
    ctx.font = '11px "Courier New",monospace';
    ctx.fillText('space / click to restart', W/2, H/2 + 8);
  }
  ctx.textAlign = 'left';
}

// ── loop ─────────────────────────────────────────────────────────────────────
function loop(){ update(); draw(); requestAnimationFrame(loop); }
loop();
</script>
</body>
</html>`;

export default function DinoGame() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minHeight: 350 }}>
      {/* terminal window — same border/radius/bg as fastfetch card */}
      <div className="terminal-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.45rem 0.9rem',
          background: '#181818',
          borderBottom: '1px solid #252525',
          userSelect: 'none',
        }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', flexShrink: 0, display: 'inline-block' }} />
          <span style={{
            fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
            fontSize: '0.7rem',
            color: '#444',
            marginLeft: '0.4rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            priyanshu@loki: ~/games/dino
          </span>
        </div>

        {/* Ambient game container */}
        <div style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          background: '#0a0a0a',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '20px 20px, 15px 15px',
          backgroundPosition: '0 0, 10px 10px',
        }}>
          <iframe
            srcDoc={GAME_HTML}
            title="Dino Runner"
            scrolling="no"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              display: 'block',
              background: 'transparent',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>
      </div>

      <p style={{
        marginTop: '0.65rem',
        fontSize: '0.68rem',
        color: '#444',
        textAlign: 'center',
        fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
      }}>
        press space / click to play
      </p>
    </div>
  );
}
