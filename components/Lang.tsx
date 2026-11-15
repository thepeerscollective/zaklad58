'use client';
import { useEffect, useState } from 'react';
import { DICT, RULES } from '@/lib/en';

/** PL / EN without a second copy of the site: every Polish string on the page is looked up in a dictionary
 *  (plus a few patterns for numbers and dates) and swapped in place. Originals are kept, so PL comes back exactly. */
const ATTRS = ['alt', 'placeholder', 'aria-label', 'title'];
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const orig = new Map<Node, string>();
const origAttr = new Map<Element, Record<string, string>>();
let busy = false;

export function tr(s: string): string | null {
  const k = norm(s); if (!k) return null;
  if (DICT[k] !== undefined) return DICT[k];
  for (const [re, to] of RULES) { const m = k.match(re); if (m) return typeof to === 'string' ? k.replace(re, to) : to(m, (x: string) => tr(x) ?? x); }
  return null;
}
const keepWs = (src: string, t: string) => (src.match(/^\s*/)![0]) + t + (src.match(/\s*$/)![0]);

function apply(root: Node) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n: Node | null = root;
  while (n) {
    if (n.nodeType === 3) {
      const p = n.parentElement;
      if (p && !p.closest('script,style,[data-notr]')) {
        const v = n.nodeValue ?? ''; const base = orig.get(n);
        const src = base !== undefined && tr(base) !== null && norm(v) === norm(tr(base)!) ? base : v;
        const t = tr(src);
        if (t !== null) { if (base === undefined || src !== base) orig.set(n, src); const nv = keepWs(src, t); if (nv !== v) n.nodeValue = nv; }
        else if (base !== undefined && src !== base) orig.delete(n);
      }
    } else if (n.nodeType === 1) {
      const el = n as Element;
      if (el.closest('[data-notr]')) { n = w.nextSibling() ?? nextOut(w); continue; }
      for (const a of ATTRS) {
        const v = el.getAttribute(a); if (!v) continue;
        const rec = origAttr.get(el) ?? {}; const src = rec[a] !== undefined && tr(rec[a]) === v ? rec[a] : v;
        const t = tr(src); if (t !== null && t !== v) { rec[a] = src; origAttr.set(el, rec); el.setAttribute(a, t); }
      }
    }
    n = w.nextNode();
  }
}
function nextOut(w: TreeWalker): Node | null { while (w.parentNode()) { const s = w.nextSibling(); if (s) return s; } return null; }

function restore() {
  orig.forEach((v, n) => { if (n.isConnected) n.nodeValue = v; }); orig.clear();
  origAttr.forEach((rec, el) => { for (const a in rec) el.setAttribute(a, rec[a]); }); origAttr.clear();
}
function meta(en: boolean) {
  document.documentElement.lang = en ? 'en' : 'pl';
  const d = document.querySelector('meta[name=description]') as HTMLMetaElement | null;
  if (d) { d.dataset.pl ??= d.content; d.content = en ? (tr(d.dataset.pl) ?? d.dataset.pl) : d.dataset.pl; }
  const t = document.documentElement.dataset; t.plTitle ??= document.title; document.title = en ? (tr(t.plTitle) ?? t.plTitle) : t.plTitle;
}

let obs: MutationObserver | null = null;
function start() {
  apply(document.body); meta(true);
  obs?.disconnect();
  obs = new MutationObserver(ms => {
    if (busy) return; busy = true;
    for (const m of ms) {
      if (m.type === 'characterData') apply(m.target);
      else if (m.type === 'attributes') apply(m.target);
      else m.addedNodes.forEach(x => apply(x));
    }
    busy = false;
  });
  obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}
function stop() { obs?.disconnect(); obs = null; restore(); meta(false); }

export function getLang(): 'pl' | 'en' {
  try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'en' || q === 'pl') { localStorage.setItem('lang', q); return q; } return localStorage.getItem('lang') === 'en' ? 'en' : 'pl'; } catch { return 'pl'; }
}

/** The switch itself. Put it in the header. */
export default function Lang({ className = '' }: { className?: string }) {
  const [l, setL] = useState<'pl' | 'en'>('pl');
  useEffect(() => {
    const g = getLang(); setL(g);
    if (g === 'en') start();
    document.documentElement.classList.remove('tr');
    // titles change on client navigation: retranslate after route changes
    const fix = () => { if (document.documentElement.lang === 'en') { delete document.documentElement.dataset.plTitle; meta(true); } };
    addEventListener('popstate', fix);
    return () => removeEventListener('popstate', fix);
  }, []);
  const set = (v: 'pl' | 'en') => { if (v === l) return; try { localStorage.setItem('lang', v); } catch { /* private mode */ } setL(v); if (v === 'en') start(); else stop(); };
  return (
    <span className={`lang ${className}`} role="group" aria-label="Language / Język" data-notr>
      <button type="button" aria-pressed={l === 'pl'} onClick={() => set('pl')} lang="pl">PL</button>
      <span aria-hidden>/</span>
      <button type="button" aria-pressed={l === 'en'} onClick={() => set('en')} lang="en">EN</button>
    </span>
  );
}

/** Inline in <head>: hides the page for a moment on EN visits so Polish never flashes. */
export const LANG_BOOT = `try{var q=new URLSearchParams(location.search).get('lang');if(q==='en'||(q!=='pl'&&localStorage.getItem('lang')==='en')){document.documentElement.classList.add('tr');document.documentElement.lang='en';setTimeout(function(){document.documentElement.classList.remove('tr')},1500)}}catch(e){}`;
