@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/500.css";
@import "@fontsource/cormorant-garamond/600.css";
@import "@fontsource/cormorant-garamond/700.css";
@import "@fontsource/cormorant-garamond/400-italic.css";
@import "@fontsource/cormorant-garamond/500-italic.css";
@import "@fontsource/plus-jakarta-sans/300.css";
@import "@fontsource/plus-jakarta-sans/400.css";
@import "@fontsource/plus-jakarta-sans/500.css";
@import "@fontsource/plus-jakarta-sans/600.css";
@import "@fontsource/plus-jakarta-sans/700.css";
@import "@fontsource/plus-jakarta-sans/800.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-night text-ivory font-sans antialiased;
}

::selection {
  background: rgba(232, 182, 76, 0.35);
}

.text-balance {
  text-wrap: balance;
}

/* ---- Signature site styles (from cristinasheart.netlify.app) ---- */

/* Flame gradient text */
.grad-text {
  background: linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Dawn gradient (softer) */
.grad-dawn-text {
  background: linear-gradient(120deg, #f6d98a, #f4a7bc 45%, #bcaef7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Eyebrow label */
.eyebrow {
  @apply inline-flex items-center gap-2.5 text-[0.78rem] font-bold uppercase text-gold;
  letter-spacing: 0.28em;
}
.eyebrow::before,
.eyebrow::after {
  content: "";
  display: inline-block;
  width: 26px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232, 182, 76, 0.8));
}
.eyebrow::after {
  background: linear-gradient(90deg, rgba(232, 182, 76, 0.8), transparent);
}

/* Buttons */
.btn {
  @apply relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold;
  padding: 1rem 2.1rem;
  font-size: 0.98rem;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s;
  overflow: hidden;
  isolation: isolate;
}
.btn:hover {
  transform: translateY(-2px);
}
.btn:active {
  transform: translateY(0) scale(0.985);
}
.btn-gold {
  background: linear-gradient(135deg, #e8b64c 0%, #e06a8a 55%, #8f7ae8 100%);
  color: #fff;
  box-shadow: 0 10px 34px -8px rgba(224, 106, 138, 0.55);
}
.btn-gold:hover {
  box-shadow: 0 16px 44px -8px rgba(224, 106, 138, 0.65);
}
.btn-ghost {
  border: 1.5px solid rgba(253, 249, 240, 0.35);
  color: #fdf9f0;
  backdrop-filter: blur(6px);
}
.btn-ghost:hover {
  border-color: rgba(253, 249, 240, 0.6);
}
.btn-ghost-dark {
  border: 1.5px solid rgba(35, 32, 65, 0.25);
  color: #232041;
}
.btn-ghost-dark:hover {
  border-color: rgba(35, 32, 65, 0.5);
}

/* Aurora backdrop */
.aurora {
  position: absolute;
  inset: -20%;
  z-index: 0;
  filter: blur(70px);
  opacity: 0.55;
  background:
    radial-gradient(38% 42% at 18% 28%, rgba(143, 122, 232, 0.5), transparent 70%),
    radial-gradient(34% 40% at 82% 22%, rgba(224, 106, 138, 0.42), transparent 70%),
    radial-gradient(46% 50% at 55% 82%, rgba(232, 182, 76, 0.32), transparent 70%);
  animation: auroraDrift 22s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes auroraDrift {
  0% {
    transform: translate3d(-2%, -1%, 0) scale(1);
  }
  100% {
    transform: translate3d(2%, 2%, 0) scale(1.06);
  }
}

/* Dark glass card (night sections) */
.card-night {
  @apply rounded-lux border border-white/10 bg-night-2/70 backdrop-blur;
  box-shadow: 0 20px 60px -18px rgba(0, 0, 0, 0.5);
}

/* Ivory card (light sections) */
.card-ivory {
  @apply rounded-lux bg-ivory text-ink;
  box-shadow: 0 20px 60px -18px rgba(35, 32, 65, 0.25);
}

/* Inputs on ivory */
.input-ivory {
  @apply w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink-soft/50;
}
.input-ivory:focus {
  border-color: #e8b64c;
  box-shadow: 0 0 0 3px rgba(232, 182, 76, 0.25);
}

/* Elegant scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #0a0e24;
}
::-webkit-scrollbar-thumb {
  background: rgba(143, 122, 232, 0.35);
  border-radius: 8px;
}

/* Candle glow on the map */
.candle-dot {
  filter: drop-shadow(0 0 6px rgba(246, 217, 138, 0.9));
}

/* Shimmering divider */
.divider-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(232, 182, 76, 0.6),
    rgba(224, 106, 138, 0.6),
    rgba(143, 122, 232, 0.6),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 6s linear infinite;
  height: 1px;
}
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Prayer text styling */
.prayer-text {
  @apply font-serif text-xl md:text-2xl leading-relaxed;
  white-space: pre-line;
}
