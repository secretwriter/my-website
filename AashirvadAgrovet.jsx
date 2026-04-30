import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #1a5c3a;
    --green-mid: #237a4e;
    --green-light: #2ea364;
    --green-pale: #e0f5eb;
    --green-pale2: #c8edda;
    --gold: #c07c1a;
    --gold-light: #f0c040;
    --gold-pale: #fef6e0;
    --earth: #2e1a08;
    --earth-mid: #7a4a18;
    --cream: #faf8f3;
    --cream2: #f2ede3;
    --cream3: #ede5d4;
    --text: #141a12;
    --text-mid: #3d4a38;
    --text-muted: #7a8570;
    --border: #ddd6c4;
    --border-light: #ece7da;
    --white: #fff;
    --red: #c0392b;
    --red-pale: #fdecea;
    --blue: #1e6b9e;
    --blue-pale: #e0eef8;
    --radius: 16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
    --shadow-xs: 0 1px 4px rgba(0,0,0,0.06);
    --shadow: 0 4px 20px rgba(0,0,0,0.09);
    --shadow-lg: 0 10px 44px rgba(0,0,0,0.14);
    --shadow-xl: 0 20px 60px rgba(0,0,0,0.18);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Sora', sans-serif; background: var(--cream); color: var(--text); -webkit-font-smoothing: antialiased; }
  h1, h2, h3, h4 { font-family: 'Fraunces', serif; }
  .nepali { font-family: 'Tiro Devanagari Hindi', serif; }

  input, textarea, select {
    font-family: 'Sora', sans-serif;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 15px;
    font-size: 13.5px;
    width: 100%;
    background: var(--white);
    color: var(--text);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  input:focus, textarea:focus, select:focus {
    border-color: var(--green-light);
    box-shadow: 0 0 0 3px rgba(46,163,100,0.12);
  }
  input::placeholder, textarea::placeholder { color: var(--text-muted); }
  button { cursor: pointer; font-family: 'Sora', sans-serif; border: none; transition: all 0.2s; }

  .btn-primary {
    background: linear-gradient(135deg, var(--green-mid), var(--green));
    color: #fff;
    padding: 11px 22px;
    border-radius: var(--radius-sm);
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    transition: all 0.2s;
    box-shadow: 0 2px 10px rgba(26,92,58,0.25);
  }
  .btn-primary:hover { background: linear-gradient(135deg, var(--green), #0f3622); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,92,58,0.32); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    color: var(--green);
    padding: 10px 22px;
    border-radius: var(--radius-sm);
    font-size: 13.5px;
    font-weight: 600;
    border: 1.5px solid var(--green);
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--green); color: #fff; transform: translateY(-1px); }

  .btn-gold {
    background: linear-gradient(135deg, #d4941e, var(--gold));
    color: #fff;
    padding: 12px 26px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 3px 12px rgba(192,124,26,0.35);
    transition: all 0.2s;
  }
  .btn-gold:hover { background: linear-gradient(135deg, var(--gold), #8a5c10); transform: translateY(-1px); box-shadow: 0 6px 22px rgba(192,124,26,0.42); }

  .btn-ghost {
    background: rgba(255,255,255,0.15);
    color: #fff;
    padding: 10px 20px;
    border-radius: var(--radius-sm);
    font-size: 13.5px;
    font-weight: 500;
    border: 1.5px solid rgba(255,255,255,0.35);
    backdrop-filter: blur(4px);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.28); transform: translateY(-1px); }

  .btn-danger {
    background: var(--red-pale);
    color: var(--red);
    padding: 10px 18px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    border: 1.5px solid rgba(192,57,43,0.2);
    transition: all 0.2s;
  }
  .btn-danger:hover { background: var(--red); color: #fff; }

  .card {
    background: var(--white);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
  }

  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 11px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .badge-green { background: var(--green-pale); color: var(--green); }
  .badge-gold { background: var(--gold-pale); color: var(--gold); }
  .badge-red { background: var(--red-pale); color: var(--red); }
  .badge-blue { background: var(--blue-pale); color: var(--blue); }
  .badge-earth { background: #f0e6d8; color: var(--earth-mid); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

  @media (max-width: 980px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
    .hide-mobile { display: none !important; }
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--cream2); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: none; } }
  @keyframes slideInUp { from { transform: translateY(22px); opacity: 0; } to { transform: none; opacity: 1; } }
  @keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(192,124,26,0.5); } 50% { opacity: 0.85; box-shadow: 0 0 0 9px rgba(192,124,26,0); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .fade-in { animation: fadeUp 0.4s ease both; }
  .fade-in-fast { animation: fadeUp 0.22s ease both; }

  /* Toast */
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 9999;
    background: var(--green); color: #fff;
    padding: 14px 22px; border-radius: var(--radius-sm);
    font-size: 13.5px; font-weight: 500;
    box-shadow: var(--shadow-xl);
    animation: slideInUp 0.3s ease;
    display: flex; align-items: center; gap: 10px;
    max-width: 340px;
    border-left: 4px solid rgba(255,255,255,0.4);
  }
  .toast.toast-error { background: var(--red); }
  .toast.toast-gold { background: var(--gold); }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(5,15,8,0.65);
    z-index: 1000; display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(5px); animation: fadeIn 0.2s ease;
  }
  .modal-box {
    background: var(--white); border-radius: var(--radius);
    width: 100%; max-width: 540px; max-height: 92vh; overflow-y: auto;
    padding: 36px; position: relative; box-shadow: var(--shadow-xl);
    animation: slideInUp 0.3s ease;
    border: 1px solid var(--border-light);
  }
  .modal-box::-webkit-scrollbar { display: none; }
  .close-btn {
    position: absolute; top: 18px; right: 18px;
    background: var(--cream2); border: none; border-radius: 50%;
    width: 34px; height: 34px; cursor: pointer; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); transition: all 0.2s;
  }
  .close-btn:hover { background: var(--cream3); color: var(--text); transform: rotate(90deg); }

  /* Nav */
  .nav {
    background: linear-gradient(90deg, #0f3622 0%, var(--green) 60%, #1e7048 100%);
    padding: 0 32px;
    position: sticky; top: 0; z-index: 500;
    box-shadow: 0 2px 20px rgba(0,0,0,0.22);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    height: 70px; max-width: 1360px; margin: 0 auto;
  }
  .nav-logo-wrap { display: flex; align-items: center; gap: 12px; text-decoration: none; background: none; border: none; cursor: pointer; }
  .nav-logo-icon {
    width: 42px; height: 42px; background: linear-gradient(135deg, var(--gold-pale), #fde8b0);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .nav-logo-text { color: #fff; font-family: 'Fraunces', serif; font-size: 19px; line-height: 1.1; text-align: left; letter-spacing: -0.01em; }
  .nav-logo-text span { color: var(--gold-light); }
  .nav-logo-sub { color: rgba(255,255,255,0.55); font-size: 10px; font-family: 'Sora', sans-serif; font-weight: 400; letter-spacing: 0.06em; }
  .nav-links { display: flex; gap: 3px; align-items: center; }
  .nav-link {
    color: rgba(255,255,255,0.75); padding: 8px 14px; border-radius: var(--radius-xs);
    font-size: 13.5px; font-weight: 500; background: none; border: none; cursor: pointer; transition: all 0.18s;
    position: relative;
  }
  .nav-link:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .nav-link.active { background: rgba(255,255,255,0.16); color: #fff; }
  .nav-link.active::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 20px; height: 2px; background: var(--gold-light); border-radius: 2px; }
  .nav-cart-btn {
    position: relative; color: #fff; background: rgba(255,255,255,0.14);
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: var(--radius-xs); padding: 8px 16px;
    cursor: pointer; font-size: 13.5px; font-weight: 600;
    display: flex; align-items: center; gap: 7px; transition: all 0.18s;
  }
  .nav-cart-btn:hover { background: rgba(255,255,255,0.26); transform: translateY(-1px); }
  .cart-count {
    position: absolute; top: -8px; right: -8px;
    background: var(--gold); color: #fff; border-radius: 50%;
    width: 21px; height: 21px; font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid var(--green);
    animation: pulse 2s infinite;
  }
  .nav-user-btn {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.25);
    color: #fff; padding: 7px 13px; border-radius: var(--radius-xs);
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.18s;
  }
  .nav-user-btn:hover { background: rgba(255,255,255,0.25); }
  .nav-avatar { width: 28px; height: 28px; background: linear-gradient(135deg, var(--gold), #e09020); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
  .nav-logout-btn {
    display: flex; align-items: center; gap: 6px;
    background: rgba(192,57,43,0.2); border: 1.5px solid rgba(192,57,43,0.3);
    color: #ffb3a7; padding: 7px 13px; border-radius: var(--radius-xs);
    font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.18s;
  }
  .nav-logout-btn:hover { background: rgba(192,57,43,0.4); color: #fff; }

  @media (max-width: 700px) {
    .nav-link.hide-sm { display: none; }
    .nav { padding: 0 16px; }
    .nav-inner { height: 62px; }
    .nav-logout-btn span { display: none; }
  }

  /* Discount Banner */
  .discount-banner {
    background: linear-gradient(90deg, #9a6010 0%, var(--gold) 30%, #d4941e 70%, #9a6010 100%);
    background-size: 200% 100%;
    animation: shimmer 5s infinite linear;
    color: #fff; text-align: center; padding: 10px 24px;
    font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em;
  }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, #071c0e 0%, #0f3622 40%, #1a5c3a 75%, #237a4e 100%);
    color: #fff; padding: 110px 32px 100px;
    position: relative; overflow: hidden;
  }
  .hero-bg-circles {
    position: absolute; inset: 0; pointer-events: none;
  }
  .hero-bg-circles::before {
    content: '';
    position: absolute; top: -120px; right: -120px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(240,192,64,0.07) 0%, transparent 70%);
  }
  .hero-bg-circles::after {
    content: '';
    position: absolute; bottom: -80px; left: -80px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(46,163,100,0.1) 0%, transparent 70%);
  }
  .hero::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0; height: 90px;
    background: var(--cream);
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    padding: 6px 16px; border-radius: 24px; font-size: 12px; font-weight: 500;
    margin-bottom: 26px; letter-spacing: 0.04em; backdrop-filter: blur(4px);
  }
  .hero h1 { font-size: clamp(36px, 5.5vw, 64px); line-height: 1.12; margin-bottom: 20px; font-weight: 700; }
  .hero h1 em { color: var(--gold-light); font-style: normal; background: linear-gradient(135deg, var(--gold-light), #f5d060); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-sub { font-size: 17px; opacity: 0.82; margin-bottom: 10px; font-weight: 400; line-height: 1.6; }
  .hero-nepali { font-size: 16px; opacity: 0.6; margin-bottom: 40px; }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .hero-stats { display: flex; gap: 36px; margin-top: 60px; flex-wrap: wrap; padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.12); }
  .hero-stat-num { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 700; color: var(--gold-light); }
  .hero-stat-label { font-size: 12px; opacity: 0.62; margin-top: 3px; }

  /* Category cards */
  .cat-card {
    background: var(--white); border-radius: var(--radius);
    border: 1.5px solid var(--border); padding: 26px 22px;
    cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden;
  }
  .cat-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--green-pale), transparent); opacity: 0; transition: opacity 0.25s; }
  .cat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--green-light); }
  .cat-card:hover::after { opacity: 1; }
  .cat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--green), var(--green-light)); transform: scaleX(0); transform-origin: left; transition: transform 0.25s; border-radius: 4px 4px 0 0; }
  .cat-card:hover::before { transform: scaleX(1); }
  .cat-icon { width: 58px; height: 58px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 18px; position: relative; z-index: 1; }
  .cat-card-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; position: relative; z-index: 1; }
  .cat-card-count { font-size: 12px; color: var(--text-muted); position: relative; z-index: 1; }

  /* Feature strip */
  .feature-strip {
    background: linear-gradient(135deg, #071c0e, var(--green) 60%, #1e7048);
    padding: 70px 32px; color: #fff; position: relative; overflow: hidden;
  }
  .feature-strip::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  }
  .feature-item { text-align: center; position: relative; z-index: 1; }
  .feature-icon { font-size: 36px; margin-bottom: 16px; display: block; animation: float 3s ease-in-out infinite; }
  .feature-title { font-family: 'Fraunces', serif; font-size: 18px; color: var(--gold-light); margin-bottom: 8px; }
  .feature-desc { font-size: 12.5px; opacity: 0.72; line-height: 1.65; }

  /* Product card */
  .product-card {
    background: var(--white); border-radius: var(--radius);
    border: 1.5px solid var(--border); overflow: hidden;
    transition: all 0.25s; cursor: pointer; position: relative;
  }
  .product-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.13); border-color: var(--green-pale2); }
  .product-img {
    height: 180px; background: linear-gradient(135deg, var(--cream2), var(--cream3));
    display: flex; align-items: center; justify-content: center;
    font-size: 68px; border-bottom: 1px solid var(--border-light);
    position: relative; transition: all 0.25s;
  }
  .product-card:hover .product-img { background: linear-gradient(135deg, var(--green-pale), var(--cream2)); }
  .product-body { padding: 18px; }
  .product-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; color: var(--text); line-height: 1.3; }
  .product-name-np { font-size: 11px; color: var(--text-muted); margin-bottom: 10px; }
  .product-desc { font-size: 12px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.6; }
  .product-footer { display: flex; align-items: flex-end; justify-content: space-between; }
  .product-price { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--green); }
  .product-unit { font-size: 10.5px; color: var(--text-muted); margin-top: 1px; }
  .product-old-price { font-size: 12px; color: var(--text-muted); text-decoration: line-through; }
  .add-btn {
    background: linear-gradient(135deg, var(--green-mid), var(--green));
    color: #fff; padding: 8px 15px;
    border-radius: var(--radius-xs); font-size: 12.5px; font-weight: 600;
    transition: all 0.18s; box-shadow: 0 2px 8px rgba(26,92,58,0.22);
  }
  .add-btn:hover { background: linear-gradient(135deg, var(--green), #0f3622); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(26,92,58,0.32); }
  .add-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* Category filter tabs */
  .cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 30px; }
  .cat-tab {
    padding: 9px 20px; border-radius: 28px; font-size: 13px; font-weight: 600;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; transition: all 0.18s; color: var(--text-muted);
  }
  .cat-tab.active { background: linear-gradient(135deg, var(--green-mid), var(--green)); color: #fff; border-color: var(--green); box-shadow: 0 3px 10px rgba(26,92,58,0.25); }
  .cat-tab:hover:not(.active) { border-color: var(--green); color: var(--green); background: var(--green-pale); }

  /* Cart Drawer */
  .cart-drawer {
    position: fixed; top: 0; right: 0; height: 100vh; width: 400px;
    background: var(--white); z-index: 900; box-shadow: var(--shadow-xl);
    display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
  }
  .cart-drawer.open { transform: none; }
  .cart-header {
    padding: 24px 28px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(135deg, #0f3622, var(--green));
  }
  .cart-header h3 { color: #fff; font-family: 'Fraunces', serif; font-size: 20px; }
  .cart-close { background: rgba(255,255,255,0.15); border: none; color: #fff; width: 34px; height: 34px; border-radius: 50%; font-size: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .cart-close:hover { background: rgba(255,255,255,0.28); transform: rotate(90deg); }
  .cart-items { flex: 1; overflow-y: auto; padding: 20px 28px; }
  .cart-empty { text-align: center; padding: 70px 0; color: var(--text-muted); }
  .cart-empty-icon { font-size: 56px; margin-bottom: 16px; opacity: 0.55; }
  .cart-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--border-light); }
  .cart-item-img { width: 56px; height: 56px; background: linear-gradient(135deg, var(--cream2), var(--cream3)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 30px; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 13.5px; font-weight: 600; margin-bottom: 3px; color: var(--text); }
  .cart-item-price { font-size: 13.5px; color: var(--green); font-weight: 700; }
  .qty-control { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--white); font-size: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; font-weight: 700; color: var(--text-mid); }
  .qty-btn:hover { background: var(--green); border-color: var(--green); color: #fff; }
  .qty-num { font-size: 14px; font-weight: 700; min-width: 22px; text-align: center; }
  .remove-btn { background: none; border: none; color: var(--red); font-size: 11.5px; cursor: pointer; margin-left: 6px; font-weight: 500; padding: 2px 0; }
  .remove-btn:hover { text-decoration: underline; }
  .cart-footer { padding: 22px 28px; border-top: 1.5px solid var(--border); background: var(--cream); }
  .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .cart-total-label { font-size: 13px; color: var(--text-muted); }
  .cart-total-value { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: var(--green); }
  .cart-note { font-size: 11.5px; color: var(--text-muted); margin-bottom: 14px; }

  @media (max-width: 440px) { .cart-drawer { width: 100vw; } }

  /* Order Status Tracker */
  .status-track { display: flex; align-items: flex-start; padding: 22px 0; }
  .status-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .status-dot {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--cream3); border: 2.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; z-index: 1; transition: all 0.35s;
    color: var(--text-muted);
  }
  .status-dot.done { background: linear-gradient(135deg, var(--green-mid), var(--green)); border-color: var(--green); color: #fff; box-shadow: 0 3px 10px rgba(26,92,58,0.3); }
  .status-dot.active { background: linear-gradient(135deg, #d4941e, var(--gold)); border-color: var(--gold); color: #fff; animation: pulse 2s infinite; }
  .status-line { flex: 1; height: 3px; background: var(--border); margin-top: 17px; transition: background 0.45s; border-radius: 2px; }
  .status-line.done { background: linear-gradient(90deg, var(--green), var(--green-light)); }
  .status-label { font-size: 10.5px; color: var(--text-muted); margin-top: 10px; text-align: center; font-weight: 500; line-height: 1.4; }
  .status-label.done, .status-label.active { color: var(--green); font-weight: 700; }

  /* Order tracking page enhanced */
  .track-hero {
    background: linear-gradient(135deg, var(--green-pale), var(--cream2));
    border: 1.5px solid var(--green-pale2);
    border-radius: var(--radius); padding: 32px; margin-bottom: 32px;
  }
  .track-search-box {
    background: var(--white); border-radius: var(--radius);
    border: 2px solid var(--border); padding: 6px 6px 6px 18px;
    display: flex; align-items: center; gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s; max-width: 560px;
    box-shadow: var(--shadow-xs);
  }
  .track-search-box:focus-within { border-color: var(--green-light); box-shadow: 0 0 0 4px rgba(46,163,100,0.1); }
  .track-search-box input { border: none; padding: 10px 0; box-shadow: none; font-size: 15px; flex: 1; }
  .track-search-box input:focus { box-shadow: none; }

  /* Admin Layout */
  .admin-wrap { display: flex; min-height: 100vh; background: #eeeae0; }
  .admin-sidebar {
    width: 256px; flex-shrink: 0;
    background: linear-gradient(180deg, #071c0e 0%, var(--green) 60%, #0f3622 100%);
    min-height: 100vh; display: flex; flex-direction: column;
    position: sticky; top: 0; box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  }
  .admin-logo {
    padding: 28px 26px 22px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.15);
  }
  .admin-logo-title { color: #fff; font-family: 'Fraunces', serif; font-size: 17px; margin-top: 10px; }
  .admin-logo-sub { color: rgba(255,255,255,0.48); font-size: 10.5px; margin-top: 2px; }
  .admin-logo-owner { color: var(--gold-light); font-size: 12.5px; margin-top: 8px; font-weight: 600; }
  .admin-menu { flex: 1; padding: 16px 0; }
  .admin-menu-item {
    width: 100%; padding: 13px 26px; background: none; border: none;
    color: rgba(255,255,255,0.62); text-align: left; font-size: 13.5px;
    cursor: pointer; transition: all 0.18s; display: flex; align-items: center; gap: 13px;
    font-family: 'Sora', sans-serif; font-weight: 500;
    border-left: 3px solid transparent;
  }
  .admin-menu-item:hover { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.92); }
  .admin-menu-item.active { background: rgba(255,255,255,0.15); color: #fff; border-left-color: var(--gold-light); font-weight: 600; }
  .admin-menu-item .menu-icon { font-size: 18px; width: 22px; text-align: center; }
  .admin-menu-count { margin-left: auto; background: var(--gold); color: #fff; border-radius: 12px; padding: 2px 8px; font-size: 10.5px; font-weight: 700; }
  .admin-footer-btn { padding: 20px 26px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 10px; }
  .admin-logout-btn {
    width: 100%; padding: 11px 16px; background: rgba(192,57,43,0.2);
    border: 1.5px solid rgba(192,57,43,0.3); color: #ffb3a7;
    border-radius: var(--radius-sm); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Sora';
  }
  .admin-logout-btn:hover { background: rgba(192,57,43,0.45); color: #fff; }
  .admin-exit-btn {
    width: 100%; padding: 11px 16px; background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7);
    border-radius: var(--radius-sm); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Sora';
  }
  .admin-exit-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
  .admin-content { flex: 1; padding: 36px; overflow-y: auto; }
  .admin-page-title { font-family: 'Fraunces', serif; font-size: 28px; color: var(--text); margin-bottom: 6px; }
  .admin-page-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 30px; }

  /* Stat cards */
  .stat-card {
    background: var(--white); border-radius: var(--radius);
    border: 1.5px solid var(--border); padding: 24px 22px;
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .stat-card::before { content: ''; position: absolute; top: 0; right: 0; width: 80px; height: 80px; border-radius: 50%; background: var(--green-pale); opacity: 0.6; transform: translate(30px, -30px); }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  .stat-icon { font-size: 30px; margin-bottom: 16px; position: relative; z-index: 1; }
  .stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-bottom: 6px; }
  .stat-value { font-family: 'Fraunces', serif; font-size: 34px; font-weight: 700; color: var(--green); }
  .stat-delta { font-size: 11.5px; color: var(--text-muted); margin-top: 4px; }

  /* Table */
  .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .data-table th { text-align: left; padding: 12px 16px; background: var(--cream2); font-weight: 700; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .data-table th:first-child { border-radius: var(--radius-xs) 0 0 var(--radius-xs); }
  .data-table th:last-child { border-radius: 0 var(--radius-xs) var(--radius-xs) 0; }
  .data-table td { padding: 14px 16px; border-bottom: 1px solid var(--border-light); vertical-align: middle; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: var(--cream); }

  /* Order card (admin) */
  .order-card { background: var(--white); border-radius: var(--radius); border: 1.5px solid var(--border); padding: 22px 24px; transition: all 0.2s; }
  .order-card:hover { box-shadow: var(--shadow); border-color: var(--green-pale2); }
  .order-card-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
  .order-id { font-size: 16px; font-weight: 700; color: var(--text); font-family: 'Fraunces', serif; }
  .order-meta { font-size: 12.5px; color: var(--text-muted); margin-top: 4px; }
  .order-items-list { font-size: 13px; margin-top: 6px; color: var(--text-mid); }
  .order-total { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--green); margin-top: 4px; }

  /* Section */
  .section { max-width: 1360px; margin: 0 auto; padding: 70px 32px; }
  .section-title { font-family: 'Fraunces', serif; font-size: 32px; margin-bottom: 8px; font-weight: 700; color: var(--text); }
  .section-sub { color: var(--text-muted); font-size: 13.5px; margin-bottom: 36px; }
  .section-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 36px; }

  /* Stars */
  .stars { color: var(--gold); font-size: 14px; letter-spacing: 1px; }

  /* Review card */
  .review-card {
    background: var(--white); border-radius: var(--radius);
    border: 1.5px solid var(--border); padding: 24px;
    transition: all 0.2s;
  }
  .review-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--green-pale2); }
  .review-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, var(--green-pale), var(--green-pale2)); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: var(--green); flex-shrink: 0; }
  .review-author { font-size: 14px; font-weight: 700; }
  .review-text { font-size: 13px; color: var(--text-muted); margin-top: 12px; line-height: 1.7; font-style: italic; }
  .review-date { font-size: 11px; color: var(--text-muted); margin-top: 12px; }

  /* Footer */
  .footer { background: linear-gradient(180deg, #1a1006 0%, var(--earth) 100%); color: rgba(255,255,255,0.78); padding: 64px 32px 32px; }
  .footer-inner { max-width: 1360px; margin: 0 auto; }
  .footer h3 { color: #fff; font-family: 'Fraunces', serif; font-size: 18px; margin-bottom: 20px; }
  .footer p { font-size: 13px; line-height: 1.8; margin-bottom: 8px; }
  .footer a { color: var(--gold-light); text-decoration: none; }
  .footer a:hover { text-decoration: underline; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 20px; font-size: 11.5px; text-align: center; opacity: 0.45; }
  .footer-link { color: rgba(255,255,255,0.65); background: none; border: none; font-size: 13px; cursor: pointer; padding: 5px 0; display: block; font-family: 'Sora', sans-serif; transition: color 0.18s; }
  .footer-link:hover { color: var(--gold-light); }

  /* Floating buttons */
  .floating-btns { position: fixed; bottom: 28px; left: 28px; z-index: 800; display: flex; flex-direction: column; gap: 12px; }
  .fab {
    width: 52px; height: 52px; border-radius: 50%; color: #fff;
    border: none; cursor: pointer; font-size: 22px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25); transition: all 0.22s;
  }
  .fab:hover { transform: scale(1.14) translateY(-2px); box-shadow: 0 14px 32px rgba(0,0,0,0.28); }
  .fab-whatsapp { background: #25d366; }
  .fab-call { background: var(--blue); }

  /* Form */
  .field { margin-bottom: 18px; }
  .field label { display: block; font-size: 12.5px; font-weight: 700; margin-bottom: 7px; color: var(--text-mid); letter-spacing: 0.02em; }
  .field-error { color: var(--red); font-size: 11px; margin-top: 4px; display: flex; align-items: center; gap: 4px; font-weight: 500; }

  /* Map */
  .map-info-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border-light); }
  .map-info-icon { font-size: 20px; flex-shrink: 0; width: 28px; text-align: center; margin-top: 2px; }

  /* Search bar */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: var(--radius-sm); padding: 0 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    max-width: 300px;
  }
  .search-bar:focus-within { border-color: var(--green-light); box-shadow: 0 0 0 3px rgba(46,163,100,0.12); }
  .search-bar input { border: none; padding: 10px 0; box-shadow: none; }
  .search-bar input:focus { box-shadow: none; }

  /* Alert boxes */
  .alert { border-radius: var(--radius-sm); padding: 14px 18px; font-size: 13px; display: flex; align-items: flex-start; gap: 10px; }
  .alert-green { background: var(--green-pale); color: var(--green); border: 1px solid var(--green-pale2); }
  .alert-gold { background: var(--gold-pale); color: var(--gold); border: 1px solid #f0d080; }
  .alert-red { background: var(--red-pale); color: var(--red); border: 1px solid #f0b0a8; }

  /* Vet banner */
  .vet-banner {
    background: linear-gradient(135deg, #e8f5ee, #d0eddc);
    border: 1.5px solid var(--green-pale2);
    border-radius: var(--radius); padding: 36px;
  }
  .vet-animal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .vet-animal-card {
    background: var(--white); border-radius: var(--radius-sm);
    border: 1.5px solid var(--border); padding: 18px;
    text-align: center; font-size: 17px; font-weight: 500; color: var(--text-mid);
    transition: all 0.18s; cursor: default;
  }
  .vet-animal-card:hover { border-color: var(--green-light); background: var(--green-pale); transform: translateY(-2px); }

  /* Product count */
  .product-count-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
  .product-count { font-size: 13px; color: var(--text-muted); }

  /* Checkout summary */
  .checkout-summary { background: var(--cream2); border-radius: var(--radius-sm); padding: 16px 18px; margin-bottom: 22px; font-size: 13px; }
  .checkout-item-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid var(--border-light); }
  .checkout-item-row:last-child { border: none; font-weight: 700; font-size: 14.5px; color: var(--green); margin-top: 4px; }

  /* User dropdown */
  .user-menu { position: relative; }
  .user-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    background: var(--white); border-radius: var(--radius-sm);
    border: 1px solid var(--border); box-shadow: var(--shadow-lg);
    min-width: 200px; padding: 8px;
    animation: slideInUp 0.2s ease; z-index: 600;
  }
  .user-dropdown-item {
    width: 100%; padding: 10px 14px; background: none; border: none;
    text-align: left; font-size: 13px; font-weight: 500; color: var(--text-mid);
    border-radius: var(--radius-xs); cursor: pointer; transition: all 0.15s;
    font-family: 'Sora'; display: flex; align-items: center; gap: 8px;
  }
  .user-dropdown-item:hover { background: var(--cream2); color: var(--text); }
  .user-dropdown-item.danger { color: var(--red); }
  .user-dropdown-item.danger:hover { background: var(--red-pale); }
  .user-dropdown-divider { border: none; border-top: 1px solid var(--border-light); margin: 6px 0; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ADMIN_PHONE = "9847828259";
const ADMIN_PASSWORD = "9847828259";
const OWNER_NAME = "Khushal Ghimire";
const STORE_PHONE = "+977-9847828259";

const PRODUCTS_INITIAL = [
  { id: 1, name: "Hybrid Tomato Seeds", nameNp: "हाइब्रिड टमाटर बीउ", category: "Seeds", price: 280, unit: "per packet", emoji: "🍅", stock: 45, desc: "High-yield F1 hybrid, disease resistant. Best for Dang valley conditions.", discount: 10 },
  { id: 2, name: "Paddy Seeds (IR-64)", nameNp: "धान बीउ (IR-64)", category: "Seeds", price: 120, unit: "per kg", emoji: "🌾", stock: 200, desc: "High yielding paddy variety with good cooking quality and pest resistance.", discount: 0 },
  { id: 3, name: "Maize Hybrid Seeds", nameNp: "मकै बीउ", category: "Seeds", price: 350, unit: "per packet", emoji: "🌽", stock: 80, desc: "Short duration hybrid maize. Suitable for all seasons in Terai region.", discount: 5 },
  { id: 4, name: "Vegetable Seed Kit", nameNp: "तरकारी बीउ किट", category: "Seeds", price: 450, unit: "per kit", emoji: "🥦", stock: 30, desc: "Complete kit with 8 vegetable varieties perfect for kitchen garden.", discount: 15 },
  { id: 5, name: "Urea Fertilizer (46%)", nameNp: "युरिया मल", category: "Fertilizers", price: 890, unit: "per 50kg", emoji: "🧴", stock: 120, desc: "Nitrogen-rich fertilizer. Approved for use in Nepal by DoA.", discount: 0 },
  { id: 6, name: "DAP Fertilizer", nameNp: "डिएपी मल", category: "Fertilizers", price: 1350, unit: "per 50kg", emoji: "🪣", stock: 90, desc: "Di-ammonium phosphate. Ideal for root development and early growth stages.", discount: 0 },
  { id: 7, name: "Compost Granules", nameNp: "कम्पोस्ट", category: "Fertilizers", price: 450, unit: "per 25kg", emoji: "🌱", stock: 60, desc: "Organic compost granules. Improves soil structure and long-term fertility.", discount: 5 },
  { id: 8, name: "NPK Mix (20-20-20)", nameNp: "एनपीके मिक्स", category: "Fertilizers", price: 780, unit: "per 25kg", emoji: "⚗️", stock: 75, desc: "Balanced NPK for vegetables and cash crops. Soluble in water.", discount: 8 },
  { id: 9, name: "Chlorpyrifos 20% EC", nameNp: "क्लोरपाइरिफस", category: "Pesticides", price: 320, unit: "per 500ml", emoji: "🧪", stock: 55, desc: "Broad-spectrum insecticide for sucking and chewing pests. WHO approved.", discount: 0 },
  { id: 10, name: "Mancozeb 75% WP", nameNp: "म्यान्कोजेब", category: "Pesticides", price: 180, unit: "per 500g", emoji: "🔬", stock: 88, desc: "Contact fungicide effective against early and late blight, downy mildew.", discount: 0 },
  { id: 11, name: "Neem-based Pesticide", nameNp: "नीम कीटनाशक", category: "Pesticides", price: 220, unit: "per 500ml", emoji: "🌿", stock: 40, desc: "Organic bio-pesticide. Safe for humans, fish and beneficial insects.", discount: 10 },
  { id: 12, name: "Weedicide (Glyphosate)", nameNp: "झार मार्ने औषधि", category: "Pesticides", price: 290, unit: "per liter", emoji: "🌾", stock: 65, desc: "Non-selective herbicide for clearing weeds before planting season.", discount: 0 },
  { id: 13, name: "Oxytetracycline (Goat)", nameNp: "अक्सिटेट्रासाइक्लिन", category: "Vet Medicine", price: 480, unit: "per vial", emoji: "💉", stock: 35, desc: "Antibiotic for respiratory & bacterial infections in goats and sheep.", discount: 0 },
  { id: 14, name: "Ivermectin 1% Inj", nameNp: "इभरमेक्टिन", category: "Vet Medicine", price: 320, unit: "per 50ml", emoji: "🩺", stock: 28, desc: "Anti-parasitic injection for internal and external parasite control.", discount: 0 },
  { id: 15, name: "Cattle Multivitamin", nameNp: "पशु मल्टिभिटामिन", category: "Vet Medicine", price: 550, unit: "per bottle", emoji: "🐄", stock: 42, desc: "Vitamin B-complex and mineral supplement for dairy cattle. Boosts milk yield.", discount: 5 },
  { id: 16, name: "De-wormer (Albendazole)", nameNp: "डिवर्मर", category: "Vet Medicine", price: 180, unit: "per strip", emoji: "💊", stock: 70, desc: "Broad-spectrum anti-helminthic for goats, pigs, poultry and cattle.", discount: 0 },
];

const CATEGORIES = ["All", "Seeds", "Fertilizers", "Pesticides", "Vet Medicine"];
const ORDER_STATUS = ["Pending", "Confirmed", "Out for Delivery", "Delivered"];
const ORDER_STATUS_ICONS = ["⏳", "✅", "🛵", "📦"];
const ORDER_STATUS_DESC = [
  "Your order has been received and is awaiting confirmation.",
  "Order confirmed! We are preparing your items.",
  "Your order is on the way to your address.",
  "Order delivered! Thank you for shopping with us.",
];

const DEMO_ORDERS = [
  { id: "AAG-001", items: [{ name: "Hybrid Tomato Seeds", qty: 2, price: 252 }], total: 504, status: 2, date: "2024-01-15", address: "Ghorahi-4, Gogli", customer: { name: "Ram Bahadur Thapa", phone: "9800000001" } },
  { id: "AAG-002", items: [{ name: "Urea Fertilizer", qty: 1, price: 890 }, { name: "Ivermectin 1% Inj", qty: 1, price: 320 }], total: 1210, status: 3, date: "2024-01-10", address: "Ghorahi-3, Tulsipur Road", customer: { name: "Sunita Poudel", phone: "9800000002" } },
  { id: "AAG-003", items: [{ name: "Vegetable Seed Kit", qty: 1, price: 383 }], total: 383, status: 0, date: "2024-01-16", address: "Ghorahi-5, Pawan Path", customer: { name: "Hari Prasad Oli", phone: "9800000003" } },
];

const REVIEWS_INITIAL = [
  { id: 1, name: "Ram Bahadur Thapa", rating: 5, text: "Very good service! Got my seeds delivered within 2 hours. Highly recommend Aashirvad Agrovet to all farmers in Dang.", date: "2 days ago" },
  { id: 2, name: "Sunita Poudel", rating: 5, text: "Khushal ji is very helpful. The vet service booking was easy and the doctor came on time to treat my goats.", date: "1 week ago" },
  { id: 3, name: "Hari Prasad Oli", rating: 4, text: "Good quality products at fair prices. Fast delivery within Ghorahi area. Will definitely order again.", date: "2 weeks ago" },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const disc = (price, discount) => discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

const Toast = ({ msg, type = "green", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, []);
  const icons = { green: "✓", error: "✕", gold: "★" };
  return (
    <div className={`toast toast-${type}`}>
      <span style={{ fontWeight: 700, fontSize: 16 }}>{icons[type]}</span> {msg}
    </div>
  );
};

const Stars = ({ n, size = 14 }) => (
  <span className="stars" style={{ fontSize: size }}>
    {"★".repeat(n)}{"☆".repeat(5 - n)}
  </span>
);

const StatusTracker = ({ status }) => (
  <div className="status-track">
    {ORDER_STATUS.map((s, i) => (
      <div key={s} style={{ display: "flex", flex: 1, alignItems: "flex-start", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div className={`status-dot ${status > i ? "done" : status === i ? "active" : ""}`}>
            {status > i ? "✓" : ORDER_STATUS_ICONS[i]}
          </div>
          {i < ORDER_STATUS.length - 1 && (
            <div className={`status-line ${status > i ? "done" : ""}`} style={{ flex: 1 }} />
          )}
        </div>
        <div className={`status-label ${status > i ? "done" : status === i ? "active" : ""}`}>{s}</div>
      </div>
    ))}
  </div>
);

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ p, onAdd, onView }) => {
  const finalPrice = disc(p.price, p.discount);
  return (
    <div className="product-card fade-in" onClick={() => onView(p)}>
      <div className="product-img">
        {p.discount > 0 && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "linear-gradient(135deg, #e74c3c, #c0392b)", color: "#fff", borderRadius: "6px", padding: "3px 9px", fontSize: 11, fontWeight: 700, boxShadow: "0 2px 6px rgba(192,57,43,0.4)" }}>
            -{p.discount}%
          </div>
        )}
        {p.stock <= 10 && p.stock > 0 && (
          <div style={{ position: "absolute", top: 10, right: 10, background: "#fff3cd", color: "#856404", borderRadius: "6px", padding: "3px 8px", fontSize: 10, fontWeight: 700, border: "1px solid #f0c800" }}>
            {p.stock} left
          </div>
        )}
        {p.emoji}
      </div>
      <div className="product-body">
        <div className="product-name">{p.name}</div>
        <div className="product-name-np nepali">{p.nameNp}</div>
        <div className="product-desc">{p.desc}</div>
        <div className="product-footer">
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span className="product-price">₹{finalPrice}</span>
              {p.discount > 0 && <span className="product-old-price">₹{p.price}</span>}
            </div>
            <div className="product-unit">{p.unit}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
            <span className={`badge ${p.stock > 10 ? "badge-green" : p.stock > 0 ? "badge-gold" : "badge-red"}`}>
              {p.stock > 10 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Out of Stock"}
            </span>
            <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAdd(p); }} disabled={p.stock === 0}>
              {p.stock === 0 ? "Out of Stock" : "+ Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────
const ProductModal = ({ p, onClose, onAdd }) => {
  const finalPrice = disc(p.price, p.discount);
  const [qty, setQty] = useState(1);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div style={{ textAlign: "center", fontSize: 88, marginBottom: 22, background: "linear-gradient(135deg, var(--cream2), var(--cream3))", borderRadius: 16, padding: "28px 0", border: "1px solid var(--border-light)" }}>
          {p.emoji}
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          <span className="badge badge-blue">{p.category}</span>
          {p.discount > 0 && <span className="badge badge-red">{p.discount}% OFF</span>}
          <span className={`badge ${p.stock > 0 ? "badge-green" : "badge-red"}`}>
            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <h2 style={{ fontSize: 22, marginBottom: 3 }}>{p.name}</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }} className="nepali">{p.nameNp}</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 22 }}>{p.desc}</p>
        <div style={{ background: "var(--cream2)", borderRadius: "var(--radius-sm)", padding: "18px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: "var(--green)" }}>₹{finalPrice}</span>
              {p.discount > 0 && <span style={{ fontSize: 16, color: "var(--text-muted)", textDecoration: "line-through" }}>₹{p.price}</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.unit}</div>
          </div>
          {p.discount > 0 && (
            <div style={{ background: "var(--red-pale)", color: "var(--red)", padding: "8px 14px", borderRadius: "var(--radius-xs)", fontSize: 13, fontWeight: 700, border: "1px solid rgba(192,57,43,0.15)" }}>
              Save ₹{p.price - finalPrice}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-mid)" }}>Quantity:</span>
          <div className="qty-control">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.min(p.stock, q + 1))}>+</button>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginLeft: "auto" }}>₹{finalPrice * qty}</span>
        </div>
        <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 14 }} disabled={p.stock === 0}
          onClick={() => { for (let i = 0; i < qty; i++) onAdd(p); onClose(); }}>
          Add {qty} to Cart · ₹{finalPrice * qty}
        </button>
      </div>
    </div>
  );
};

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
const CartDrawer = ({ cart, open, onClose, onQty, onRemove, onCheckout }) => {
  const total = cart.reduce((s, i) => s + disc(i.price, i.discount) * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <>
      {open && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 899 }} onClick={onClose} />}
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h3>🛒 Cart · {count} {count === 1 ? "item" : "items"}</h3>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 && (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>Your cart is empty</div>
              <div style={{ fontSize: 12 }}>Add some products to get started!</div>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">{item.emoji}</div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{disc(item.price, item.discount)} × {item.qty} = <strong>₹{disc(item.price, item.discount) * item.qty}</strong></div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => onQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onQty(item.id, 1)}>+</button>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>✕ Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total Amount</span>
              <span className="cart-total-value">₹{total}</span>
            </div>
            <div className="cart-note">🚚 Free delivery within 3–4 km · Cash on Delivery</div>
            <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 14 }} onClick={onCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
const CheckoutModal = ({ cart, onClose, onOrder }) => {
  const total = cart.reduce((s, i) => s + disc(i.price, i.discount) * i.qty, 0);
  const [form, setForm] = useState({ name: "", phone: "", address: "", landmark: "" });
  const [err, setErr] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    if (!form.address.trim()) e.address = "Address is required";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ fontSize: 40, background: "var(--green-pale)", borderRadius: 14, padding: "10px 14px" }}>🛒</div>
          <div>
            <h2 style={{ fontSize: 22 }}>Checkout</h2>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Delivery details for your order</p>
          </div>
        </div>
        <div className="checkout-summary">
          <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 10 }}>Order Summary</div>
          {cart.map(i => (
            <div key={i.id} className="checkout-item-row">
              <span>{i.name} × {i.qty}</span>
              <span>₹{disc(i.price, i.discount) * i.qty}</span>
            </div>
          ))}
          <div className="checkout-item-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <div className="field">
          <label>Full Name *</label>
          <input placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          {err.name && <div className="field-error">⚠ {err.name}</div>}
        </div>
        <div className="field">
          <label>Phone Number *</label>
          <input placeholder="10-digit mobile number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          {err.phone && <div className="field-error">⚠ {err.phone}</div>}
        </div>
        <div className="field">
          <label>Delivery Address *</label>
          <textarea rows={2} placeholder="Full address in Ghorahi area" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          {err.address && <div className="field-error">⚠ {err.address}</div>}
        </div>
        <div className="field">
          <label>Landmark (optional)</label>
          <input placeholder="Near school, temple, mosque..." value={form.landmark} onChange={e => setForm({ ...form, landmark: e.target.value })} />
        </div>
        <div className="alert alert-green" style={{ marginBottom: 12 }}>
          <span>💵</span>
          <span><strong>Cash on Delivery</strong> — Pay when your order arrives at your doorstep</span>
        </div>
        <div className="alert alert-gold" style={{ marginBottom: 22 }}>
          <span>📍</span>
          <span>Delivery available within 3–4 km of Ghorahi-4, Gogli, Dang</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ flex: 2, padding: "14px" }} onClick={() => { if (validate()) onOrder(form); }}>
            Place Order (₹{total}) →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── VET MODAL ────────────────────────────────────────────────────────────────
const VetModal = ({ onClose, onBook }) => {
  const [form, setForm] = useState({ name: "", phone: "", animal: "Goat", problem: "", location: "", time: "" });
  const [err, setErr] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Valid 10-digit number required";
    if (!form.problem.trim()) e.problem = "Problem description required";
    if (!form.location.trim()) e.location = "Location required";
    if (!form.time) e.time = "Preferred time required";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <div style={{ fontSize: 48, background: "var(--green-pale)", borderRadius: 16, padding: "10px 14px" }}>🐐</div>
          <div>
            <h2 style={{ fontSize: 22 }}>Book Vet Service</h2>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>पशु सेवा बुकिंग — Vet visits your location</p>
          </div>
        </div>
        {[
          { key: "name", label: "Your Name *", placeholder: "Full name" },
          { key: "phone", label: "Phone Number *", placeholder: "10-digit number" },
        ].map(f => (
          <div key={f.key} className="field">
            <label>{f.label}</label>
            <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
            {err[f.key] && <div className="field-error">⚠ {err[f.key]}</div>}
          </div>
        ))}
        <div className="field">
          <label>Animal Type *</label>
          <select value={form.animal} onChange={e => setForm({ ...form, animal: e.target.value })}>
            {["Goat", "Pig", "Cow / Buffalo", "Poultry (Chicken)", "Sheep", "Other"].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Problem Description *</label>
          <textarea rows={3} value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="Describe the health problem, symptoms, duration..." />
          {err.problem && <div className="field-error">⚠ {err.problem}</div>}
        </div>
        <div className="field">
          <label>Your Location *</label>
          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Village / Tole / Ward in Ghorahi area" />
          {err.location && <div className="field-error">⚠ {err.location}</div>}
        </div>
        <div className="field">
          <label>Preferred Date & Time *</label>
          <input type="datetime-local" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
          {err.time && <div className="field-error">⚠ {err.time}</div>}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ flex: 2, padding: "14px" }} onClick={() => { if (validate()) onBook(form); }}>
            Book Vet Visit →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
const AuthModal = ({ onClose, onAuth }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!form.phone.trim() || !form.password.trim()) { setErr("Please fill all fields"); return; }
    if (mode === "signup" && !form.name.trim()) { setErr("Name is required"); return; }
    if (!/^[0-9]{10}$/.test(form.phone)) { setErr("Enter valid 10-digit phone number"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isAdmin = form.phone === ADMIN_PHONE && form.password === ADMIN_PASSWORD;
      onAuth({
        name: isAdmin ? OWNER_NAME : (form.name || "Customer"),
        phone: form.phone,
        isAdmin,
      });
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontSize: 52, marginBottom: 12, background: "linear-gradient(135deg, var(--green-pale), var(--cream2))", borderRadius: 20, padding: "18px 0", display: "block" }}>🌱</div>
          <h2 style={{ fontSize: 24 }}>{mode === "login" ? "Welcome Back" : "Join Aashirvad"}</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 5 }}>Aashirvad Agrovet · Ghorahi, Dang</p>
        </div>
        {mode === "signup" && (
          <div className="field">
            <label>Full Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
          </div>
        )}
        <div className="field">
          <label>Phone Number *</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
        </div>
        <div className="field">
          <label>Password *</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password"
            onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        {err && <div className="alert alert-red" style={{ marginBottom: 16 }}><span>⚠</span> {err}</div>}
        <button className="btn-primary" style={{ width: "100%", padding: "14px", marginBottom: 20, fontSize: 14 }} onClick={submit} disabled={loading}>
          {loading ? "Signing in..." : (mode === "login" ? "Login →" : "Create Account →")}
        </button>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)" }}>
          {mode === "login" ? "New customer? " : "Already have account? "}
          <button style={{ background: "none", border: "none", color: "var(--green)", cursor: "pointer", fontWeight: 700, fontSize: 13 }}
            onClick={() => { setMode(m => m === "login" ? "signup" : "login"); setErr(""); }}>
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

// ─── MAP SECTION ──────────────────────────────────────────────────────────────
const MapSection = () => (
  <div style={{ background: "var(--cream2)", padding: "0 0 60px" }}>
    <div style={{ maxWidth: 1360, margin: "0 auto", padding: "60px 32px 0" }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Find Us</h2>
          <p className="section-sub">हाम्रो स्थान — Ghorahi-4, Gogli, Dang, Nepal</p>
        </div>
        <a href="https://maps.google.com/?q=Ghorahi,Dang,Nepal" target="_blank" rel="noreferrer">
          <button className="btn-primary">Get Directions →</button>
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 36, alignItems: "start" }}>
        <div>
          {[
            { icon: "📍", label: "Address", val: "Ghorahi-4, Gogli, Dang, Lumbini Province, Nepal" },
            { icon: "📞", label: "Phone", val: `${STORE_PHONE} (${OWNER_NAME})` },
            { icon: "🕐", label: "Hours", val: "Sun–Fri: 7:00 AM – 7:00 PM\nSaturday: 8:00 AM – 5:00 PM" },
            { icon: "🚚", label: "Delivery", val: "Free delivery within 3–4 km radius of Ghorahi-4" },
          ].map(({ icon, label, val }) => (
            <div key={label} className="map-info-item">
              <div className="map-info-icon">{icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
                <div style={{ fontSize: 13.5, marginTop: 4, whiteSpace: "pre-line", lineHeight: 1.6 }}>{val}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
            <a href={`https://wa.me/977${ADMIN_PHONE}?text=Hello, I want to order from Aashirvad Agrovet`} target="_blank" rel="noreferrer">
              <button style={{ background: "#25d366", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "var(--radius-xs)", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}>
                💬 WhatsApp
              </button>
            </a>
            <a href={`tel:+977${ADMIN_PHONE}`}>
              <button style={{ background: "var(--blue)", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "var(--radius-xs)", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(30,107,158,0.3)" }}>
                📞 Call Now
              </button>
            </a>
          </div>
        </div>
        <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1.5px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <iframe
            title="Aashirvad Agrovet Location"
            width="100%" height="340"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFh-OE&q=Ghorahi,Dang,Nepal&zoom=14"
          />
        </div>
      </div>
    </div>
  </div>
);

// ─── REVIEWS SECTION ──────────────────────────────────────────────────────────
const ReviewsSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState({ name: "", text: "", rating: 5 });
  const [reviews, setReviews] = useState(REVIEWS_INITIAL);

  const submit = () => {
    if (!review.name.trim() || !review.text.trim()) return;
    setReviews(r => [{ ...review, id: Date.now(), date: "Just now" }, ...r]);
    setReview({ name: "", text: "", rating: 5 });
    setShowForm(false);
  };

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-sub">ग्राहकहरूको समीक्षा · What our customers say</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? "Cancel" : "+ Write Review"}
        </button>
      </div>
      {showForm && (
        <div className="card fade-in" style={{ padding: 28, marginBottom: 30, maxWidth: 540 }}>
          <h3 style={{ fontSize: 17, marginBottom: 20 }}>Share Your Experience</h3>
          <div className="field">
            <label>Your Name</label>
            <input value={review.name} onChange={e => setReview({ ...review, name: e.target.value })} placeholder="Your name" />
          </div>
          <div className="field">
            <label>Rating</label>
            <div style={{ display: "flex", gap: 5 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: n <= review.rating ? "var(--gold)" : "var(--border)", transition: "all 0.15s" }}
                  onClick={() => setReview({ ...review, rating: n })}>★</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Your Review</label>
            <textarea rows={3} value={review.text} onChange={e => setReview({ ...review, text: e.target.value })} placeholder="Share your experience with us..." />
          </div>
          <button className="btn-primary" style={{ padding: "12px 26px" }} onClick={submit}>Submit Review</button>
        </div>
      )}
      <div className="grid-3">
        {reviews.map(r => (
          <div key={r.id} className="review-card fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
              <div className="review-avatar">{r.name.charAt(0)}</div>
              <div>
                <div className="review-author">{r.name}</div>
                <Stars n={r.rating} />
              </div>
            </div>
            <div className="review-text">"{r.text}"</div>
            <div className="review-date">{r.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ORDER TRACKING PAGE ──────────────────────────────────────────────────────
const OrderTracking = ({ orders, user }) => {
  const [trackId, setTrackId] = useState("");
  const [found, setFound] = useState(null);
  const [searched, setSearched] = useState(false);

  const userOrders = user ? orders.filter(o => o.customer?.phone === user.phone) : [];

  const doSearch = (id) => {
    const searchTerm = (id || trackId).trim().toUpperCase();
    const o = orders.find(x => x.id.toUpperCase() === searchTerm);
    setFound(o || null);
    setSearched(true);
  };

  return (
    <div className="section">
      <h2 className="section-title">Track Your Order</h2>
      <p className="section-sub">अर्डर ट्र्याक गर्नुहोस् · Enter your order ID to see live status</p>

      <div className="track-hero">
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 6 }}>Enter Order ID</div>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Find your order ID in the confirmation message or your account</div>
        </div>
        <div className="track-search-box">
          <span style={{ fontSize: 20 }}>📦</span>
          <input
            value={trackId}
            onChange={e => setTrackId(e.target.value)}
            placeholder="e.g. AAG-001, AAG-002..."
            onKeyDown={e => e.key === "Enter" && doSearch()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" style={{ padding: "11px 22px", whiteSpace: "nowrap" }} onClick={() => doSearch()}>
            Track →
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>
          💡 Try: AAG-001, AAG-002, or AAG-003 for demo
        </p>
      </div>

      {searched && !found && (
        <div className="alert alert-red" style={{ maxWidth: 500, marginBottom: 28 }}>
          <span>⚠</span>
          <span>Order not found. Please check your order ID and try again.</span>
        </div>
      )}

      {found && (
        <div className="card fade-in" style={{ padding: 30, maxWidth: 680, marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 6 }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700 }}>{found.id}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 5 }}>
                📍 {found.address} &nbsp;·&nbsp; 📅 {found.date}
              </div>
              {found.customer && (
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
                  👤 {found.customer.name} &nbsp;·&nbsp; 📞 {found.customer.phone}
                </div>
              )}
            </div>
            <span className={`badge ${found.status === 3 ? "badge-green" : found.status === 2 ? "badge-blue" : found.status === 1 ? "badge-gold" : "badge-earth"}`} style={{ fontSize: 13, padding: "8px 16px" }}>
              {ORDER_STATUS_ICONS[found.status]} {ORDER_STATUS[found.status]}
            </span>
          </div>

          <div className="alert alert-gold" style={{ marginBottom: 20 }}>
            <span>{ORDER_STATUS_ICONS[found.status]}</span>
            <span><strong>{ORDER_STATUS[found.status]}:</strong> {ORDER_STATUS_DESC[found.status]}</span>
          </div>

          <StatusTracker status={found.status} />

          <div style={{ marginTop: 24, background: "var(--cream2)", borderRadius: "var(--radius-sm)", padding: "18px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-muted)", marginBottom: 12 }}>Order Items</div>
            {found.items.map(i => (
              <div key={i.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "6px 0", borderBottom: "1px solid var(--border-light)" }}>
                <span>{i.name} × {i.qty}</span>
                <span style={{ fontWeight: 600 }}>₹{i.price * i.qty}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, marginTop: 12, paddingTop: 10, borderTop: "2px solid var(--border)" }}>
              <span>Total</span>
              <span style={{ color: "var(--green)", fontFamily: "'Fraunces', serif", fontSize: 20 }}>₹{found.total}</span>
            </div>
          </div>

          {found.status < 3 && (
            <div className="alert alert-green" style={{ marginTop: 18 }}>
              <span>🕐</span>
              <span>Estimated delivery: Within 2–4 hours · For updates call: {STORE_PHONE}</span>
            </div>
          )}
          {found.status === 3 && (
            <div className="alert alert-green" style={{ marginTop: 18 }}>
              <span>✅</span>
              <span>Order delivered! Thank you for shopping with Aashirvad Agrovet.</span>
            </div>
          )}
        </div>
      )}

      {userOrders.length > 0 && (
        <div>
          <h3 style={{ fontSize: 22, fontFamily: "'Fraunces', serif", marginBottom: 18 }}>Your Orders</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680 }}>
            {userOrders.map(o => (
              <div key={o.id} className="card" style={{ padding: 22, cursor: "pointer", transition: "all 0.2s" }}
                onClick={() => { setTrackId(o.id); setFound(o); setSearched(true); }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-xs)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontFamily: "'Fraunces', serif", fontSize: 16 }}>{o.id}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 3 }}>{o.date} · ₹{o.total}</div>
                    <div style={{ fontSize: 12, color: "var(--text-mid)", marginTop: 3 }}>{o.items.map(i => `${i.name} ×${i.qty}`).join(", ")}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span className={`badge ${o.status === 3 ? "badge-green" : o.status >= 2 ? "badge-blue" : "badge-gold"}`}>{ORDER_STATUS_ICONS[o.status]} {ORDER_STATUS[o.status]}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Click to track →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!user && userOrders.length === 0 && (
        <div className="alert alert-gold" style={{ maxWidth: 500, marginTop: 20 }}>
          <span>💡</span>
          <span>Login to see all your past orders in one place</span>
        </div>
      )}
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ onExit, onLogout, orders, setOrders, vetBookings, setVetBookings, products, setProducts }) => {
  const [tab, setTab] = useState("overview");
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(null);

  const updateOrderStatus = (id) => {
    setOrders(prev => prev.map(o => o.id === id && o.status < 3 ? { ...o, status: o.status + 1 } : o));
  };

  const confirmVet = (idx, confirmed) => {
    setVetBookings(prev => prev.map((b, i) => i === idx ? { ...b, status: confirmed ? "confirmed" : "declined" } : b));
  };

  const deleteOrder = (id) => {
    if (!window.confirm("Delete this order?")) return;
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const saveProduct = () => {
    if (!productForm) return;
    setProducts(prev => prev.map(p => p.id === productForm.id ? productForm : p));
    setEditingProduct(null);
    setProductForm(null);
  };

  const stats = [
    { label: "Total Orders", value: orders.length, icon: "📦", delta: `${orders.filter(o => o.status < 3).length} active` },
    { label: "Pending", value: orders.filter(o => o.status === 0).length, icon: "⏳", delta: "Needs attention" },
    { label: "Delivered", value: orders.filter(o => o.status === 3).length, icon: "✅", delta: "Completed orders" },
    { label: "Vet Bookings", value: vetBookings.length, icon: "🐐", delta: `${vetBookings.filter(b => !b.status).length} pending` },
  ];
  const totalRevenue = orders.filter(o => o.status === 3).reduce((s, o) => s + o.total, 0);

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦", count: orders.filter(o => o.status === 0).length },
    { id: "products", label: "Products", icon: "🌱" },
    { id: "vet", label: "Vet Bookings", icon: "🐐", count: vetBookings.filter(b => !b.status).length },
  ];

  return (
    <div className="admin-wrap">
      <style>{CSS}</style>
      <div className="admin-sidebar">
        <div className="admin-logo">
          <div style={{ fontSize: 30 }}>🌾</div>
          <div className="admin-logo-title">Admin Panel</div>
          <div className="admin-logo-sub">Aashirvad Agrovet</div>
          <div className="admin-logo-owner">👤 {OWNER_NAME}</div>
        </div>
        <div className="admin-menu">
          {menuItems.map(m => (
            <button key={m.id} className={`admin-menu-item ${tab === m.id ? "active" : ""}`} onClick={() => setTab(m.id)}>
              <span className="menu-icon">{m.icon}</span>
              {m.label}
              {m.count > 0 && <span className="admin-menu-count">{m.count}</span>}
            </button>
          ))}
        </div>
        <div className="admin-footer-btn">
          <button className="admin-exit-btn" onClick={onExit}>
            ← Back to Store
          </button>
          <button className="admin-logout-btn" onClick={onLogout}>
            🔓 Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div className="fade-in">
            <div className="admin-page-title">Dashboard Overview</div>
            <div className="admin-page-sub">Welcome back, {OWNER_NAME}! Here's what's happening today.</div>
            <div className="grid-4" style={{ marginBottom: 30 }}>
              {stats.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-delta">{s.delta}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 22 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h3 style={{ fontSize: 16 }}>Revenue Summary</h3>
                  <span className="badge badge-green">Delivered orders</span>
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 700, color: "var(--green)" }}>₹{totalRevenue.toLocaleString()}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 6 }}>From {orders.filter(o => o.status === 3).length} delivered orders</div>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ marginBottom: 18 }}><h3 style={{ fontSize: 16 }}>Quick Actions</h3></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setTab("orders")}>📦 Manage Orders ({orders.filter(o => o.status === 0).length} pending)</button>
                  <button className="btn-outline" style={{ fontSize: 13 }} onClick={() => setTab("vet")}>🐐 Vet Bookings ({vetBookings.filter(b => !b.status).length} pending)</button>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 17 }}>Recent Orders</h3>
                <button style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, cursor: "pointer", fontWeight: 700 }} onClick={() => setTab("orders")}>View all →</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 700, fontFamily: "'Fraunces', serif" }}>{o.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{o.customer?.name || "—"}</div>
                        <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{o.customer?.phone || ""}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--green)" }}>₹{o.total}</td>
                      <td><span className={`badge ${o.status === 3 ? "badge-green" : o.status >= 2 ? "badge-blue" : o.status === 1 ? "badge-gold" : "badge-earth"}`}>{ORDER_STATUS_ICONS[o.status]} {ORDER_STATUS[o.status]}</span></td>
                      <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{o.date}</td>
                      <td>
                        {o.status < 3 && (
                          <button style={{ background: "linear-gradient(135deg, var(--green-mid), var(--green))", color: "#fff", border: "none", borderRadius: "var(--radius-xs)", padding: "6px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}
                            onClick={() => updateOrderStatus(o.id)}>
                            → {ORDER_STATUS[o.status + 1]}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === "orders" && (
          <div className="fade-in">
            <div className="admin-page-title">Manage Orders</div>
            <div className="admin-page-sub">{orders.length} total orders · {orders.filter(o => o.status === 0).length} pending</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
              {["All", "Pending", "Confirmed", "Out for Delivery", "Delivered"].map((f, fi) => {
                const count = fi === 0 ? orders.length : orders.filter(o => o.status === fi - 1).length;
                return (
                  <span key={f} className="badge" style={{ padding: "7px 16px", fontSize: 12.5, cursor: "default", background: "var(--white)", border: "1.5px solid var(--border)", color: "var(--text-mid)" }}>
                    {f} ({count})
                  </span>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {orders.map(o => (
                <div key={o.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div className="order-id">{o.id}</div>
                      <div className="order-meta">📅 {o.date} · 📍 {o.address}{o.customer && <span> · 👤 {o.customer.name} ({o.customer.phone})</span>}</div>
                      <div className="order-items-list">{o.items.map(i => `${i.name} ×${i.qty}`).join(" · ")}</div>
                      <div className="order-total">₹{o.total}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <span className={`badge ${o.status === 3 ? "badge-green" : o.status === 2 ? "badge-blue" : o.status === 1 ? "badge-gold" : "badge-earth"}`} style={{ padding: "6px 13px", fontSize: 12 }}>
                        {ORDER_STATUS_ICONS[o.status]} {ORDER_STATUS[o.status]}
                      </span>
                      <div style={{ display: "flex", gap: 8 }}>
                        {o.status < 3 && (
                          <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => updateOrderStatus(o.id)}>
                            → {ORDER_STATUS[o.status + 1]}
                          </button>
                        )}
                        <button className="btn-danger" style={{ fontSize: 12, padding: "7px 12px" }} onClick={() => deleteOrder(o.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <StatusTracker status={o.status} />
                </div>
              ))}
              {orders.length === 0 && (
                <div style={{ textAlign: "center", padding: 70, color: "var(--text-muted)" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>📦</div>
                  <div style={{ fontSize: 16 }}>No orders yet</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === "products" && (
          <div className="fade-in">
            <div className="admin-page-title">Product Management</div>
            <div className="admin-page-sub">{products.length} products across all categories</div>
            {editingProduct && productForm && (
              <div className="card" style={{ padding: 26, marginBottom: 26 }}>
                <h3 style={{ fontSize: 17, marginBottom: 18 }}>Edit: {productForm.name}</h3>
                <div className="grid-3">
                  <div className="field">
                    <label>Price (₹)</label>
                    <input type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })} />
                  </div>
                  <div className="field">
                    <label>Stock</label>
                    <input type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })} />
                  </div>
                  <div className="field">
                    <label>Discount (%)</label>
                    <input type="number" min={0} max={100} value={productForm.discount} onChange={e => setProductForm({ ...productForm, discount: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea rows={2} value={productForm.desc} onChange={e => setProductForm({ ...productForm, desc: e.target.value })} />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn-primary" style={{ fontSize: 13 }} onClick={saveProduct}>Save Changes</button>
                  <button className="btn-outline" style={{ fontSize: 13 }} onClick={() => { setEditingProduct(null); setProductForm(null); }}>Cancel</button>
                </div>
              </div>
            )}
            <div className="card" style={{ overflow: "hidden" }}>
              <table className="data-table">
                <thead>
                  <tr><th></th><th>Product</th><th>Category</th><th>Price</th><th>Discount</th><th>Stock</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontSize: 24 }}>{p.emoji}</td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }} className="nepali">{p.nameNp}</div>
                      </td>
                      <td><span className="badge badge-blue">{p.category}</span></td>
                      <td style={{ fontWeight: 700 }}>₹{p.price}</td>
                      <td>
                        {p.discount > 0
                          ? <span className="badge badge-red">{p.discount}% off</span>
                          : <span style={{ color: "var(--text-muted)", fontSize: 12 }}>—</span>}
                      </td>
                      <td>
                        <span className={`badge ${p.stock > 10 ? "badge-green" : p.stock > 0 ? "badge-gold" : "badge-red"}`}>{p.stock}</span>
                      </td>
                      <td>
                        <button style={{ background: "none", border: "none", color: "var(--blue)", cursor: "pointer", fontSize: 12.5, fontWeight: 700, marginRight: 12 }}
                          onClick={() => { setEditingProduct(p.id); setProductForm({ ...p }); }}>Edit</button>
                        <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 12.5 }}
                          onClick={() => setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, stock: 0 } : prod))}>
                          Mark Out
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── VET BOOKINGS ── */}
        {tab === "vet" && (
          <div className="fade-in">
            <div className="admin-page-title">Vet Booking Requests</div>
            <div className="admin-page-sub">{vetBookings.length} total · {vetBookings.filter(b => !b.status).length} pending confirmation</div>
            {vetBookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: 90, color: "var(--text-muted)" }}>
                <div style={{ fontSize: 60, marginBottom: 18 }}>🐐</div>
                <div style={{ fontSize: 16 }}>No vet bookings yet</div>
                <div style={{ fontSize: 13, marginTop: 7 }}>New bookings will appear here</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {vetBookings.map((b, i) => (
                  <div key={i} className="card" style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{b.name}</div>
                          {b.status ? (
                            <span className={`badge ${b.status === "confirmed" ? "badge-green" : "badge-red"}`}>{b.status}</span>
                          ) : (
                            <span className="badge badge-gold">Pending</span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", gap: 18, flexWrap: "wrap" }}>
                          <span>📞 {b.phone}</span>
                          <span>📍 {b.location}</span>
                          <span>🕐 {b.time}</span>
                        </div>
                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <span className="badge badge-blue">{b.animal}</span>
                          <span style={{ fontSize: 13, color: "var(--text-mid)" }}>{b.problem}</span>
                        </div>
                      </div>
                      {!b.status && (
                        <div style={{ display: "flex", gap: 8, alignSelf: "flex-start" }}>
                          <button className="btn-primary" style={{ fontSize: 12.5, padding: "9px 18px" }} onClick={() => confirmVet(i, true)}>✓ Confirm</button>
                          <button className="btn-danger" style={{ fontSize: 12.5, padding: "9px 14px" }} onClick={() => confirmVet(i, false)}>✕ Decline</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const AashirvadAgrovet = () => {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [vetBookings, setVetBookings] = useState([]);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [products, setProducts] = useState(PRODUCTS_INITIAL);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const showToast = (msg, type = "green") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    showToast(`${p.name} added to cart!`);
  };

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast("Item removed from cart", "error");
  };

  const placeOrder = (formData) => {
    const newOrder = {
      id: `AAG-${String(orders.length + 1).padStart(3, "0")}`,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: disc(i.price, i.discount) })),
      total: cart.reduce((s, i) => s + disc(i.price, i.discount) * i.qty, 0),
      status: 0,
      date: new Date().toISOString().slice(0, 10),
      address: formData.address,
      customer: { name: formData.name, phone: formData.phone },
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setModal(null);
    setCartOpen(false);
    showToast(`Order ${newOrder.id} placed! We'll call you to confirm.`, "gold");
  };

  const bookVet = (formData) => {
    setVetBookings(prev => [...prev, formData]);
    setModal(null);
    showToast("Vet booking confirmed! We'll contact you shortly.", "gold");
  };

  const handleAuth = (u) => {
    setUser(u);
    setModal(null);
    if (u.isAdmin) {
      showToast(`Welcome back, ${OWNER_NAME}!`, "gold");
      setTimeout(() => setAdminMode(true), 400);
    } else {
      showToast(`Welcome, ${u.name}!`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAdminMode(false);
    setUserMenuOpen(false);
    showToast("Logged out successfully", "error");
  };

  const filteredProducts = products.filter(p => {
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.nameNp.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (adminMode) {
    return (
      <AdminDashboard
        onExit={() => setAdminMode(false)}
        onLogout={handleLogout}
        orders={orders}
        setOrders={setOrders}
        vetBookings={vetBookings}
        setVetBookings={setVetBookings}
        products={products}
        setProducts={setProducts}
      />
    );
  }

  return (
    <>
      <style>{CSS}</style>

      {/* Discount Banner */}
      <div className="discount-banner">
        🌾 Monsoon Sale — Up to 15% off on Seeds & Fertilizers &nbsp;·&nbsp; सिजनल छूट चलिरहेको छ! Call {STORE_PHONE}
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <button className="nav-logo-wrap" onClick={() => setPage("home")}>
            <div className="nav-logo-icon">🌾</div>
            <div>
              <div className="nav-logo-text">Aashirvad <span>Agrovet</span></div>
              <div className="nav-logo-sub">Ghorahi · Dang · Nepal</div>
            </div>
          </button>
          <div className="nav-links">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop" },
              { id: "track", label: "Track Order" },
              { id: "contact", label: "Contact" },
            ].map(l => (
              <button
                key={l.id}
                className={`nav-link ${l.id !== "home" && l.id !== "track" ? "hide-sm" : ""} ${page === l.id ? "active" : ""}`}
                onClick={() => setPage(l.id)}
              >
                {l.label}
              </button>
            ))}
            {user ? (
              <div className="user-menu" style={{ position: "relative" }}>
                <button className="nav-user-btn" onClick={() => setUserMenuOpen(o => !o)}>
                  <div className="nav-avatar">{user.name.charAt(0)}</div>
                  <span className="hide-sm">{user.name.split(" ")[0]}</span>
                  {user.isAdmin && <span style={{ fontSize: 10, background: "var(--gold)", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>ADMIN</span>}
                  <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    {user.isAdmin && (
                      <button className="user-dropdown-item" onClick={() => { setAdminMode(true); setUserMenuOpen(false); }}>
                        🛠 Admin Dashboard
                      </button>
                    )}
                    <button className="user-dropdown-item" onClick={() => { setPage("track"); setUserMenuOpen(false); }}>
                      📦 My Orders
                    </button>
                    <hr className="user-dropdown-divider" />
                    <button className="user-dropdown-item danger" onClick={handleLogout}>
                      🔓 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-link" onClick={() => setModal("auth")}>Login</button>
            )}
            <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
              🛒 <span className="hide-sm">Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Close user menu on outside click */}
      {userMenuOpen && <div style={{ position: "fixed", inset: 0, zIndex: 550 }} onClick={() => setUserMenuOpen(false)} />}

      {/* Home Page */}
      {page === "home" && (
        <>
          <div className="hero">
            <div className="hero-bg-circles" />
            <div className="hero-inner">
              <div className="hero-tag">🌿 Trusted Agrovet Since 2018 · Ghorahi, Dang</div>
              <h1>Your Trusted<br /><em>Agricultural</em> Partner</h1>
              <p className="hero-sub">Premium seeds, fertilizers, pesticides & veterinary medicines</p>
              <p className="hero-nepali nepali">गुणस्तरीय कृषि सामग्री र पशु सेवा — गोरही-४, गोगली, दाङ</p>
              <div className="hero-btns">
                <button className="btn-gold" style={{ padding: "14px 30px", fontSize: 15 }} onClick={() => setPage("shop")}>
                  Shop Now →
                </button>
                <button className="btn-ghost" onClick={() => setModal("vet")}>
                  🐐 Book Vet Service
                </button>
                <button className="btn-ghost" onClick={() => setPage("track")}>
                  📦 Track Order
                </button>
              </div>
              <div className="hero-stats">
                {[
                  { num: "500+", label: "Happy Farmers" },
                  { num: "16+", label: "Products" },
                  { num: "3–4km", label: "Free Delivery" },
                  { num: "2–4hr", label: "Delivery Time" },
                ].map(s => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Browse by Category</h2>
                <p className="section-sub">श्रेणी अनुसार खोज्नुहोस् · Find what you need</p>
              </div>
            </div>
            <div className="grid-4">
              {[
                { icon: "🌱", label: "Seeds", desc: "Hybrid & certified", count: 4, color: "#e0f5eb" },
                { icon: "🧴", label: "Fertilizers", desc: "Urea, DAP, NPK", count: 4, color: "#e8f0fe" },
                { icon: "🧪", label: "Pesticides", desc: "Safe & effective", count: 4, color: "#fef3e2" },
                { icon: "💉", label: "Vet Medicine", desc: "Animal healthcare", count: 4, color: "#fce4ec" },
              ].map(c => (
                <div key={c.label} className="cat-card" onClick={() => { setCatFilter(c.label); setPage("shop"); }}>
                  <div className="cat-icon" style={{ background: c.color }}>{c.icon}</div>
                  <div className="cat-card-title">{c.label}</div>
                  <div className="cat-card-count">{c.count} products · {c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Strip */}
          <div className="feature-strip">
            <div style={{ maxWidth: 1360, margin: "0 auto" }}>
              <div className="grid-4">
                {[
                  { icon: "🚚", title: "Fast Delivery", desc: "Free delivery within 3–4 km of Ghorahi. Orders delivered in 2–4 hours." },
                  { icon: "✅", title: "Certified Quality", desc: "All products are DoA-approved. Seeds certified by SQCC." },
                  { icon: "🐐", title: "Vet Services", desc: "Licensed veterinarian visits your farm for goats, pigs, poultry, cattle." },
                  { icon: "💵", title: "Cash on Delivery", desc: "No advance payment needed. Pay when your order arrives safely." },
                ].map(f => (
                  <div key={f.title} className="feature-item">
                    <span className="feature-icon">{f.icon}</span>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Featured Products</h2>
                <p className="section-sub">लोकप्रिय उत्पादनहरू · Top picks this season</p>
              </div>
              <button className="btn-outline" onClick={() => setPage("shop")}>View All Products →</button>
            </div>
            <div className="grid-4">
              {products.filter(p => p.discount > 0).slice(0, 4).map(p => (
                <ProductCard key={p.id} p={p} onAdd={addToCart} onView={p => { setSelectedProduct(p); setModal("product"); }} />
              ))}
            </div>
          </div>

          {/* Vet Banner */}
          <div className="section" style={{ paddingTop: 0 }}>
            <div className="vet-banner">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>
                <div>
                  <h2 style={{ fontSize: 26, marginBottom: 14, color: "var(--green)" }}>Veterinary Services</h2>
                  <p style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 20, lineHeight: 1.7 }}>
                    Book a licensed vet for your farm animals. We provide on-site checkups, vaccinations, and treatment for goats, pigs, cattle, and poultry in Ghorahi area.
                  </p>
                  <button className="btn-primary" style={{ fontSize: 14 }} onClick={() => setModal("vet")}>
                    🐐 Book Vet Visit →
                  </button>
                </div>
                <div className="vet-animal-grid">
                  {["🐐 Goat", "🐖 Pig", "🐄 Cow/Buffalo", "🐔 Poultry"].map(a => (
                    <div key={a} className="vet-animal-card">{a}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ReviewsSection />
          <MapSection />
        </>
      )}

      {/* Shop Page */}
      {page === "shop" && (
        <div className="section">
          <h2 className="section-title">Shop Products</h2>
          <p className="section-sub">उत्पादन किन्नुहोस् · {products.length} products available</p>
          <div style={{ display: "flex", gap: 16, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
            <div className="search-bar" style={{ maxWidth: 260 }}>
              <span>🔍</span>
              <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button key={c} className={`cat-tab ${catFilter === c ? "active" : ""}`} onClick={() => setCatFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="product-count-bar">
            <span className="product-count">{filteredProducts.length} products found</span>
            {(search || catFilter !== "All") && (
              <button style={{ background: "none", border: "none", color: "var(--green)", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                onClick={() => { setSearch(""); setCatFilter("All"); }}>✕ Clear filters</button>
            )}
          </div>
          <div className="grid-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} p={p} onAdd={addToCart} onView={p => { setSelectedProduct(p); setModal("product"); }} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No products found</div>
              <div>Try adjusting your search or filter</div>
            </div>
          )}
        </div>
      )}

      {/* Track Page */}
      {page === "track" && <OrderTracking orders={orders} user={user} />}

      {/* Contact Page */}
      {page === "contact" && <MapSection />}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="grid-3">
            <div>
              <h3>Aashirvad Agrovet</h3>
              <p>आशिर्वाद एग्रोभेट — Your trusted partner for seeds, fertilizers, pesticides and veterinary medicines in Ghorahi, Dang.</p>
              <p><strong>Owner:</strong> {OWNER_NAME}</p>
              <p><strong>Phone:</strong> {STORE_PHONE}</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              {[["Home", "home"], ["Shop Products", "shop"], ["Track Order", "track"], ["Contact Us", "contact"]].map(([l, p]) => (
                <button key={l} className="footer-link" onClick={() => setPage(p)}>{l}</button>
              ))}
            </div>
            <div>
              <h3>Contact & Location</h3>
              <p>📍 Ghorahi-4, Gogli, Dang, Lumbini Province, Nepal</p>
              <p>📞 {STORE_PHONE}</p>
              <p>🕐 Sun–Fri: 7AM–7PM · Sat: 8AM–5PM</p>
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <a href={`https://wa.me/977${ADMIN_PHONE}`} target="_blank" rel="noreferrer">
                  <button style={{ background: "#25d366", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "var(--radius-xs)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>💬 WhatsApp</button>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 Aashirvad Agrovet, Ghorahi-4 Gogli Dang, Nepal. Owned & managed by {OWNER_NAME}.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        cart={cart} open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        onCheckout={() => { setCartOpen(false); setModal("checkout"); }}
      />

      {/* Floating buttons */}
      <div className="floating-btns">
        <a href={`https://wa.me/977${ADMIN_PHONE}?text=Hello, I want to order from Aashirvad Agrovet`} target="_blank" rel="noreferrer">
          <button className="fab fab-whatsapp" title="WhatsApp">💬</button>
        </a>
        <a href={`tel:+977${ADMIN_PHONE}`}>
          <button className="fab fab-call" title="Call us">📞</button>
        </a>
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modals */}
      {modal === "product" && selectedProduct && (
        <ProductModal p={selectedProduct} onClose={() => setModal(null)} onAdd={addToCart} />
      )}
      {modal === "checkout" && cart.length > 0 && (
        <CheckoutModal cart={cart} onClose={() => setModal(null)} onOrder={placeOrder} />
      )}
      {modal === "vet" && (
        <VetModal onClose={() => setModal(null)} onBook={bookVet} />
      )}
      {modal === "auth" && (
        <AuthModal onClose={() => setModal(null)} onAuth={handleAuth} />
      )}
    </>
  );
};

export default AashirvadAgrovet;
