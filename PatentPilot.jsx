import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const css = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0D1117;--ink2:#3D4451;--ink3:#6B7280;
  --paper:#FAFAF8;--card:#FFFFFF;--card2:#F4F3EF;
  --blue:#1A3F7A;--blue2:#2D5BE3;--blue3:#EEF2FF;
  --gold:#B8882A;--gold2:#FBF3E3;
  --green:#1A6140;--green2:#E3F5EC;
  --red:#8B2020;--red2:#FDEAEA;
  --border:#E5E3DC;--border2:#D0CEC4;
  --radius:12px;--radius-sm:8px;--radius-lg:20px;
  --shadow:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);
  --shadow-lg:0 8px 40px rgba(0,0,0,.10);
  --serif:'Instrument Serif',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
}
body{font-family:var(--sans);background:var(--paper);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased}
button{cursor:pointer;font-family:var(--sans)}
input,textarea{font-family:var(--sans)}
a{color:inherit;text-decoration:none}

.app{display:flex;min-height:100vh}

/* SIDEBAR */
.sidebar{width:240px;background:var(--ink);color:white;display:flex;flex-direction:column;padding:0;flex-shrink:0;position:sticky;top:0;height:100vh}
.sidebar-logo{padding:28px 24px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
.sidebar-logo-mark{display:flex;align-items:center;gap:10px}
.sidebar-logo-icon{width:32px;height:32px;background:var(--blue2);border-radius:8px;display:flex;align-items:center;justify-content:center}
.sidebar-logo-text{font-family:var(--serif);font-size:18px;letter-spacing:-.2px}
.sidebar-logo-sub{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;letter-spacing:.4px;text-transform:uppercase}
.sidebar-nav{flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:2px}
.sidebar-section-label{font-size:10px;font-weight:500;color:rgba(255,255,255,.3);letter-spacing:.8px;text-transform:uppercase;padding:12px 12px 6px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--radius-sm);font-size:13.5px;color:rgba(255,255,255,.6);transition:all .15s;cursor:pointer;border:none;background:none;width:100%;text-align:left}
.nav-item:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.9)}
.nav-item.active{background:rgba(45,91,227,.25);color:white}
.nav-item svg{opacity:.7;flex-shrink:0}
.nav-item.active svg{opacity:1}
.sidebar-bottom{padding:16px 12px;border-top:1px solid rgba(255,255,255,.08)}
.sidebar-badge{display:flex;align-items:center;gap:8px;padding:10px 12px;background:rgba(184,136,42,.12);border:1px solid rgba(184,136,42,.2);border-radius:var(--radius-sm);font-size:12px;color:rgba(255,255,255,.7)}

/* MAIN */
.main{flex:1;overflow-y:auto;min-height:100vh}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 40px;border-bottom:1px solid var(--border);background:var(--card);position:sticky;top:0;z-index:10}
.topbar-title{font-size:14px;font-weight:500;color:var(--ink2)}
.topbar-right{display:flex;align-items:center;gap:10px}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--radius-sm);font-size:13.5px;font-weight:500;transition:all .15s;border:1px solid transparent;cursor:pointer}
.btn-ghost{background:none;border-color:var(--border2);color:var(--ink2)}
.btn-ghost:hover{background:var(--card2);border-color:var(--border)}
.btn-primary{background:var(--blue);color:white;border-color:var(--blue)}
.btn-primary:hover{background:var(--blue2)}
.btn-gold{background:var(--gold2);color:var(--gold);border-color:rgba(184,136,42,.25)}
.btn-gold:hover{background:#F5E9C8}

.page{padding:40px}
.page-header{margin-bottom:36px}
.page-title{font-family:var(--serif);font-size:32px;letter-spacing:-.5px;color:var(--ink);margin-bottom:6px}
.page-title em{font-style:italic;color:var(--blue2)}
.page-sub{font-size:15px;color:var(--ink3);line-height:1.6}

/* CARDS */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow)}
.card-sm{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px}

/* HERO (landing) */
.hero{padding:64px 40px 48px;max-width:720px}
.hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--blue2);background:var(--blue3);padding:5px 12px;border-radius:20px;margin-bottom:20px;letter-spacing:.2px}
.hero-title{font-family:var(--serif);font-size:52px;line-height:1.1;letter-spacing:-.8px;color:var(--ink);margin-bottom:16px}
.hero-title em{font-style:italic;color:var(--blue2)}
.hero-body{font-size:16px;color:var(--ink2);line-height:1.7;margin-bottom:32px;max-width:580px}
.hero-cta{display:flex;gap:12px;flex-wrap:wrap}

.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 40px 40px}
.feature-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;transition:all .2s}
.feature-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-2px);border-color:var(--border2)}
.feature-icon{width:40px;height:40px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;margin-bottom:14px;font-size:18px}
.feature-title{font-weight:500;font-size:15px;margin-bottom:6px;color:var(--ink)}
.feature-desc{font-size:13.5px;color:var(--ink3);line-height:1.6}
.feature-link{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--blue2);margin-top:12px;font-weight:500}

.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 40px 36px}
.stat-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px}
.stat-num{font-family:var(--serif);font-size:36px;color:var(--ink);margin-bottom:4px}
.stat-label{font-size:13px;color:var(--ink3)}

/* LEARNING */
.learning-grid{display:grid;grid-template-columns:280px 1fr;gap:24px;align-items:start}
.steps-list{display:flex;flex-direction:column;gap:4px}
.step-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:var(--radius-sm);cursor:pointer;transition:all .15s;border:1px solid transparent}
.step-item:hover{background:var(--card);border-color:var(--border)}
.step-item.active{background:var(--blue3);border-color:rgba(45,91,227,.2)}
.step-item.done{opacity:.7}
.step-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0}
.step-num-pending{background:var(--card2);color:var(--ink3);border:1px solid var(--border)}
.step-num-active{background:var(--blue2);color:white}
.step-num-done{background:var(--green2);color:var(--green)}
.step-text{font-size:13.5px}
.step-title-text{font-weight:500;color:var(--ink)}
.step-sub{font-size:12px;color:var(--ink3);margin-top:1px}

.content-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.content-header{padding:28px 32px 0}
.content-tag{display:inline-block;font-size:11px;font-weight:500;color:var(--blue2);background:var(--blue3);padding:3px 10px;border-radius:20px;margin-bottom:12px;letter-spacing:.3px;text-transform:uppercase}
.content-title{font-family:var(--serif);font-size:26px;letter-spacing:-.3px;color:var(--ink);margin-bottom:8px}
.content-body{padding:20px 32px 0;font-size:15px;color:var(--ink2);line-height:1.75}
.content-body p{margin-bottom:14px}
.content-body h4{font-size:14px;font-weight:500;color:var(--ink);margin:20px 0 8px}
.info-block{background:var(--blue3);border:1px solid rgba(45,91,227,.15);border-radius:var(--radius-sm);padding:16px;margin:16px 0;font-size:14px;color:var(--blue);line-height:1.6}
.info-block strong{font-weight:500}
.types-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0}
.type-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px}
.type-card-title{font-weight:500;font-size:13.5px;color:var(--ink);margin-bottom:4px}
.type-card-desc{font-size:12.5px;color:var(--ink3);line-height:1.5}
.content-footer{padding:24px 32px;border-top:1px solid var(--border);margin-top:24px;display:flex;align-items:center;justify-content:space-between}

/* CHAT */
.chat-layout{display:grid;grid-template-columns:1fr 320px;gap:20px;height:calc(100vh - 180px);min-height:500px}
.chat-panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);display:flex;flex-direction:column;overflow:hidden}
.chat-header{padding:18px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.chat-avatar{width:36px;height:36px;background:var(--blue);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:var(--serif);font-size:16px;color:white;font-style:italic}
.chat-msgs{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px}
.msg{display:flex;gap:10px;animation:fadeUp .2s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.msg-user{flex-direction:row-reverse}
.msg-bubble{max-width:72%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6}
.msg-ai .msg-bubble{background:var(--card2);border:1px solid var(--border);color:var(--ink);border-radius:4px 16px 16px 16px}
.msg-user .msg-bubble{background:var(--blue);color:white;border-radius:16px 4px 16px 16px}
.msg-ai-icon{width:28px;height:28px;background:var(--blue);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:var(--serif);font-style:italic;color:white;font-size:13px;margin-top:2px}
.chat-input-area{padding:16px;border-top:1px solid var(--border);display:flex;gap:8px}
.chat-input{flex:1;padding:10px 14px;border:1px solid var(--border2);border-radius:var(--radius-sm);font-size:14px;outline:none;transition:border-color .15s;resize:none}
.chat-input:focus{border-color:var(--blue2);box-shadow:0 0 0 3px rgba(45,91,227,.1)}
.send-btn{width:38px;height:38px;background:var(--blue2);border:none;border-radius:var(--radius-sm);color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s;flex-shrink:0}
.send-btn:hover{background:var(--blue)}
.suggested-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.suggest-btn{padding:10px 12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:12.5px;color:var(--ink2);text-align:left;cursor:pointer;transition:all .15s;line-height:1.4}
.suggest-btn:hover{background:var(--blue3);border-color:rgba(45,91,227,.2);color:var(--blue)}

.glossary-panel{display:flex;flex-direction:column;gap:8px;overflow-y:auto}
.glossary-search{padding:10px 14px;border:1px solid var(--border2);border-radius:var(--radius-sm);font-size:14px;outline:none;width:100%;margin-bottom:8px}
.glossary-search:focus{border-color:var(--blue2)}
.gloss-item{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px 14px;cursor:pointer;transition:all .15s}
.gloss-item:hover{border-color:var(--border2);background:var(--card2)}
.gloss-term{font-weight:500;font-size:13.5px;color:var(--ink);margin-bottom:3px}
.gloss-def{font-size:12.5px;color:var(--ink3);line-height:1.5}

/* SEARCH */
.search-box{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-bottom:24px}
.search-label{font-size:13px;font-weight:500;color:var(--ink2);margin-bottom:8px;display:block}
.search-textarea{width:100%;padding:14px 16px;border:1px solid var(--border2);border-radius:var(--radius-sm);font-size:15px;line-height:1.6;resize:none;outline:none;min-height:110px;transition:border-color .15s;color:var(--ink)}
.search-textarea:focus{border-color:var(--blue2);box-shadow:0 0 0 3px rgba(45,91,227,.1)}
.search-meta{display:flex;align-items:center;justify-content:space-between;margin-top:12px;flex-wrap:wrap;gap:8px}
.char-count{font-size:12px;color:var(--ink3)}
.keywords-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
.kw-tag{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:var(--blue3);color:var(--blue2);border-radius:20px;font-size:12px;font-weight:500}
.ipc-tag{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:var(--gold2);color:var(--gold);border-radius:20px;font-size:12px;font-weight:500}

.results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.results-count{font-size:14px;color:var(--ink3)}
.results-count strong{color:var(--ink)}
.patent-list{display:flex;flex-direction:column;gap:12px}
.patent-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:22px;transition:all .2s;cursor:pointer}
.patent-card:hover{box-shadow:var(--shadow-lg);border-color:var(--border2)}
.patent-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;gap:16px}
.patent-number{font-size:11px;font-weight:500;color:var(--ink3);letter-spacing:.4px;text-transform:uppercase;font-family:monospace}
.similarity-badge{display:inline-flex;align-items:center;gap:4px;font-size:12px;padding:3px 10px;border-radius:20px;flex-shrink:0}
.sim-high{background:var(--green2);color:var(--green)}
.sim-med{background:var(--gold2);color:var(--gold)}
.sim-low{background:var(--card2);color:var(--ink3)}
.patent-title{font-family:var(--serif);font-size:17px;letter-spacing:-.2px;color:var(--ink);margin-bottom:6px;line-height:1.3}
.patent-meta{display:flex;flex-wrap:wrap;gap:12px;font-size:12.5px;color:var(--ink3);margin-bottom:10px}
.patent-meta span{display:flex;align-items:center;gap:4px}
.patent-summary{font-size:13.5px;color:var(--ink2);line-height:1.6;padding-top:10px;border-top:1px solid var(--border)}

/* SUGGESTIONS */
.suggestions-panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-top:24px}
.suggestions-header{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.suggestions-icon{width:40px;height:40px;background:var(--gold2);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.suggestions-title{font-family:var(--serif);font-size:22px;letter-spacing:-.3px}
.suggestions-list{display:flex;flex-direction:column;gap:12px}
.suggestion-item{border:1px solid var(--border);border-radius:var(--radius-sm);padding:18px;transition:all .2s;cursor:pointer}
.suggestion-item:hover{border-color:rgba(184,136,42,.3);background:var(--gold2)}
.suggestion-header{display:flex;align-items:flex-start;gap:12px;margin-bottom:8px}
.suggestion-num{width:24px;height:24px;border-radius:50%;background:var(--gold2);color:var(--gold);font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.suggestion-text{font-size:14px;color:var(--ink);line-height:1.6}
.suggestion-text strong{color:var(--blue);font-weight:500}
.novelty-bar{margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}
.novelty-label{font-size:13px;font-weight:500;color:var(--ink2);margin-bottom:8px;display:flex;align-items:center;justify-content:space-between}
.novelty-track{height:8px;background:var(--card2);border-radius:4px;overflow:hidden}
.novelty-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--green2) 0%,#3AB06A 100%);transition:width .8s cubic-bezier(.4,0,.2,1)}
.novelty-score{font-weight:500;color:var(--green)}

/* CLAIMS */
.claims-panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-top:24px}
.claims-title{font-family:var(--serif);font-size:22px;letter-spacing:-.3px;margin-bottom:16px}
.claim-block{margin-bottom:16px}
.claim-num{font-size:11px;font-weight:500;color:var(--ink3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.claim-text{font-size:14px;line-height:1.75;color:var(--ink);font-style:italic;padding:14px 16px;background:var(--card2);border-radius:var(--radius-sm);border-left:3px solid var(--blue2)}
.claims-disclaimer{font-size:12px;color:var(--ink3);margin-top:16px;padding:12px;background:var(--card2);border-radius:var(--radius-sm);border:1px solid var(--border);line-height:1.6}

/* LOADING */
.loading-dots{display:flex;gap:4px;align-items:center;padding:4px 0}
.dot{width:6px;height:6px;border-radius:50%;background:var(--ink3);animation:pulse 1.4s infinite ease-in-out both}
.dot:nth-child(1){animation-delay:-.32s}
.dot:nth-child(2){animation-delay:-.16s}
@keyframes pulse{0%,80%,100%{transform:scale(0);opacity:.4}40%{transform:scale(1);opacity:1}}

/* PROGRESS */
.progress-ring{position:relative;display:inline-flex}
.progress-ring svg{transform:rotate(-90deg)}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"home", label:"Home", icon:<HomeIcon/> },
  { id:"learn", label:"Learn Patents", icon:<BookIcon/> },
  { id:"search", label:"Prior Art Search", icon:<SearchIcon/> },
  { id:"claims", label:"Claims Drafter", icon:<DocIcon/> },
];

const LEARNING_STEPS = [
  { id:1, title:"What is a Patent?", sub:"Fundamentals & types", content: {
    tag:"Module 1 of 5",
    title:"What is a Patent?",
    body: [
      {type:"p", text:"A patent is an exclusive legal right granted by a government to an inventor, giving them the sole authority to make, use, and sell their invention for a limited period — typically 20 years from the filing date."},
      {type:"p", text:"In exchange for this monopoly right, the inventor publicly discloses how the invention works, contributing knowledge to society. This bargain between inventor and public is the bedrock of the patent system."},
      {type:"info", text:"💡 Think of a patent as a 20-year trading card for your idea. You show the world your secret sauce — and in return, no one else can use it without your permission."},
      {type:"h4", text:"Three types you need to know"},
      {type:"types", items:[
        {title:"Utility Patent", desc:"Covers how something works or is used. The most common type — think engines, software, processes, and chemicals."},
        {title:"Design Patent", desc:"Protects the ornamental appearance of a functional item. The shape of a Coke bottle, for example."},
        {title:"Plant Patent", desc:"Granted for new and distinct plant varieties that have been asexually reproduced."},
        {title:"Provisional Application", desc:"Not a patent itself, but a 12-month placeholder that establishes your priority date while you develop the full application."},
      ]},
    ]
  }},
  { id:2, title:"Eligibility Criteria", sub:"Novelty & non-obviousness", content: {
    tag:"Module 2 of 5",
    title:"Is My Idea Patentable?",
    body: [
      {type:"p", text:"Not every invention qualifies for patent protection. The USPTO applies four core tests to determine whether your idea is eligible."},
      {type:"types", items:[
        {title:"✓ Novel", desc:"Your invention must be new — not previously disclosed in any publication, product, or patent anywhere in the world."},
        {title:"✓ Non-Obvious", desc:"A person skilled in the relevant field would not find your invention obvious based on existing knowledge."},
        {title:"✓ Useful", desc:"The invention must have a specific, substantial, and credible practical utility."},
        {title:"✓ Patentable Subject Matter", desc:"Ideas, laws of nature, and abstract mathematical formulas alone are generally not patentable."},
      ]},
      {type:"info", text:"💡 Prior art is your biggest obstacle. Before investing in a full application, always search for existing patents that might block yours — that's exactly what our Prior Art Search module helps you do."},
    ]
  }},
  { id:3, title:"Anatomy of a Patent", sub:"Claims, drawings & spec", content: {
    tag:"Module 3 of 5",
    title:"Anatomy of a Patent",
    body:[
      {type:"p", text:"Every patent has the same core structure. Understanding this structure helps you read competitor patents and eventually write your own."},
      {type:"types", items:[
        {title:"Abstract", desc:"A 150-word summary of the invention. Used for search — not legally binding."},
        {title:"Specification", desc:"The full written description of the invention. Must be detailed enough for someone skilled in the field to replicate it."},
        {title:"Claims", desc:"The legally binding part. Independent claims define the core invention; dependent claims add specifics. What you claim = what you own."},
        {title:"Drawings", desc:"Visual representations of the invention. Numbered figures referenced throughout the specification."},
      ]},
      {type:"info", text:"💡 Claims are everything. Two patents can describe the same invention but have completely different claim scopes — one might protect just a core concept, another might cover 40 specific implementations."},
    ]
  }},
  { id:4, title:"The Filing Process", sub:"Step-by-step USPTO guide", content: {
    tag:"Module 4 of 5",
    title:"How to File a Patent",
    body:[
      {type:"p", text:"Filing a patent is a multi-step process that typically takes 2–3 years from application to grant. Here's the high-level roadmap."},
      {type:"types", items:[
        {title:"1. Invention Disclosure", desc:"Document your invention in detail: what it is, how it works, why it's novel. Date and sign the document."},
        {title:"2. Prior Art Search", desc:"Search USPTO, Google Patents, and academic databases to identify existing patents in your space (use our tool!)."},
        {title:"3. Draft the Application", desc:"Write your claims, specification, and abstract. Consider a provisional application first to secure your priority date."},
        {title:"4. File & Prosecute", desc:"Submit to the USPTO. An examiner will review and typically issue office actions (rejections) that you must respond to."},
      ]},
      {type:"info", text:"💡 Provisional applications cost ~$320 for small entities vs. ~$1,600 for a non-provisional. Many inventors file a provisional first to secure their date while refining the full application."},
    ]
  }},
  { id:5, title:"Patent Strategy", sub:"Portfolio & licensing basics", content: {
    tag:"Module 5 of 5",
    title:"Thinking Strategically",
    body:[
      {type:"p", text:"A single patent is rarely enough for a serious business. Smart inventors think about patent portfolios — a collection of related patents that together build a defensive moat."},
      {type:"types", items:[
        {title:"Continuation Patents", desc:"Filed after the parent, they can broaden or narrow your claims using the same specification. Extends your protection window."},
        {title:"Licensing", desc:"You don't have to manufacture anything. Licensing your patent to others in exchange for royalties can be extremely lucrative."},
        {title:"Design-Arounds", desc:"Competitors will try to design around your claims. Broad independent claims with narrow dependent fallbacks give you flexibility."},
        {title:"Trade Secrets", desc:"Sometimes not patenting is smarter — if your process is hard to reverse-engineer, a trade secret (like Coca-Cola's formula) may offer indefinite protection."},
      ]},
    ]
  }},
];

const GLOSSARY = [
  {term:"Prior Art", def:"Any existing public knowledge predating your invention that could block patentability."},
  {term:"Claims", def:"The numbered sentences in a patent that legally define the scope of protection."},
  {term:"IPC Code", def:"International Patent Classification — a hierarchical system (e.g. H04R) categorizing patents by technology."},
  {term:"Novelty", def:"Requirement that an invention be new — not previously disclosed anywhere worldwide."},
  {term:"Non-Obviousness", def:"The invention must not be an obvious step to a person skilled in the relevant field."},
  {term:"Provisional Application", def:"A 12-month USPTO placeholder that secures a priority date without full examination."},
  {term:"Assignee", def:"The company or individual who owns the patent rights (often the employer of the inventor)."},
  {term:"Prosecution", def:"The back-and-forth process between applicant and USPTO examiner after filing."},
  {term:"Continuation", def:"A follow-on patent application filed while the parent is still pending, using the same specification."},
  {term:"Embodiment", def:"A specific example of how an invention can be implemented, described in the specification."},
  {term:"Abstract", def:"A brief 150-word summary of the invention — used for searching, not legally binding."},
  {term:"Specification", def:"The written description of the invention that must enable a skilled person to replicate it."},
];

const SAMPLE_PATENTS = [
  {
    id:"US11,234,567",
    title:"Active Noise Cancellation System for Sleep Enhancement in Wearable Devices",
    date:"Mar 15, 2022", assignee:"Bose Corporation",
    sim:"high", simScore:87,
    summary:"Describes a feedback-loop ANC system integrated into a sleep mask form factor, with bone-conduction sensors measuring ambient noise and a DSP unit generating inverse waveforms within 2ms latency."
  },
  {
    id:"US10,897,123",
    title:"Adaptive Audio Masking for Improved Sleep Quality Using Machine Learning",
    date:"Jan 8, 2021", assignee:"Apple Inc.",
    sim:"high", simScore:79,
    summary:"Covers an ML model trained on sleep stage data that dynamically adjusts white noise frequency profiles to match user's current sleep stage as detected by wrist-worn biometric sensors."
  },
  {
    id:"US10,441,982",
    title:"Wearable Acoustic Device with Passive Sound Isolation and Active Feedback",
    date:"Oct 22, 2019", assignee:"3M Company",
    sim:"med", simScore:61,
    summary:"Industrial ear protection design with adaptive gain control; some overlap in the passive+active hybrid isolation approach, though targeted at workplace rather than sleep use cases."
  },
  {
    id:"US9,872,109",
    title:"Smart Earplugs with Biometric Monitoring and Sleep Stage Detection",
    date:"Jan 16, 2018", assignee:"Kokoon Technology Ltd.",
    sim:"med", simScore:54,
    summary:"Compact in-ear form factor combining passive noise isolation with EEG and heart rate monitoring for sleep stage detection. Does not address active noise cancellation or bone conduction."
  },
  {
    id:"US9,451,334",
    title:"Audio Playback Device with Ambient Sound Level Adaptation",
    date:"Sep 20, 2016", assignee:"Sony Corporation",
    sim:"low", simScore:32,
    summary:"General ambient-aware audio device for consumer headphones; the auto-volume adjustment based on ambient noise has limited overlap with sleep-specific use cases or ANC hardware design."
  },
];

const SUGGESTIONS = [
  {
    overlap:"Existing patents cover ANC in wearable sleep devices with standard speaker drivers.",
    improvement:"Your idea could be novel if you focus specifically on bone-conduction transducers embedded in the temporal lobe contact points of a sleep mask, which no current patent addresses for sleep ANC."
  },
  {
    overlap:"Existing patents cover ML models for sleep stage adaptation, but trained on population-average data.",
    improvement:"Your idea could be novel if you incorporate personalized on-device learning that adapts the ANC profile to the individual user's unique brainwave baseline over 7–14 nights."
  },
  {
    overlap:"Existing patents cover passive + active hybrid isolation approaches.",
    improvement:"Your idea could be novel if you add a haptic micro-vibration component that masks low-frequency noise (e.g. snoring) that ANC hardware struggles to cancel below 80Hz."
  },
  {
    overlap:"Existing patents cover biometric sleep monitoring in earbuds.",
    improvement:"Your idea could be novel if you combine breath-rate detection with the ANC feedback loop to predict apnea events and proactively increase isolation before disruption occurs."
  },
];

const CHAT_INIT = [
  {role:"ai", text:"Hi! I'm your patent guide. I can explain any patent concept in plain English — no legal background needed. What would you like to learn about?"}
];

const AI_RESPONSES = {
  "what is prior art": "Prior art is any evidence that your invention was already known before your filing date. This includes existing patents, academic papers, product manuals, YouTube videos, and even a public conversation at a conference. If something was publicly disclosed before you filed — anywhere in the world — it counts as prior art and can be used to reject your application.",
  "how do claims work": "Claims are the legally binding heart of every patent. They're numbered sentences that define exactly what you own. Think of them like property lines on a map. An independent claim stands alone — it defines the broadest version of your invention. Dependent claims narrow it down ('The device of claim 1, wherein...'). You want independent claims as broad as possible, with dependent fallbacks in case the broad claim gets rejected.",
  "how long does it take": "Typically 2–3 years from filing to grant at the USPTO, though this varies by technology area. Software patents often take longer (3–4 years). You can pay for Prioritized Examination (Track One) to accelerate this to ~6–12 months, at an additional cost of ~$4,000 for large entities.",
  "default": "Great question! Patent law can feel dense, but let me break it down. The key principle is that patents protect specific implementations — not broad ideas. To be patentable, your invention needs to be novel (new), non-obvious (not an obvious step for an expert), and useful. Would you like me to explain any of these in more detail?"
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
function HomeIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>)}
function BookIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>)}
function SearchIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>)}
function DocIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
function SendIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>)}
function CheckIcon(){return(<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>)}
function ExternalIcon(){return(<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>)}
function ChevronRight(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>)}
function LightbulbIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21h6"/><path d="M12 3C8.14 3 5 6.14 5 10c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-1.26A7 7 0 0019 10c0-3.86-3.14-7-7-7z"/></svg>)}
function SparkleIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>)}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Sidebar({active, setActive}){
  return(
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div className="sidebar-logo-text">PatentPilot</div>
            <div className="sidebar-logo-sub">IP Intelligence</div>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {NAV.map(n=>(
          <button key={n.id} className={`nav-item${active===n.id?" active":""}`} onClick={()=>setActive(n.id)}>
            {n.icon}{n.label}
          </button>
        ))}
        <div className="sidebar-section-label" style={{marginTop:8}}>Resources</div>
        <button className="nav-item" onClick={()=>setActive("learn")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Glossary
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <div style={{fontSize:12,fontWeight:500}}>USPTO Official Data</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:1}}>PatentsView API</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({setActive}){
  return(
    <div>
      <div className="hero">
        <div className="hero-eyebrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Powered by Claude AI + USPTO PatentsView
        </div>
        <h1 className="hero-title">
          From idea to<br/><em>ready to file</em>.
        </h1>
        <p className="hero-body">
          PatentPilot guides first-time inventors through the patent process — from understanding the basics to checking if your idea is already taken and making it uniquely yours.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={()=>setActive("search")}>
            <SearchIcon/> Check my idea →
          </button>
          <button className="btn btn-ghost" onClick={()=>setActive("learn")}>
            <BookIcon/> Start learning
          </button>
        </div>
      </div>

      <div className="stats-row">
        {[
          {num:"11M+", label:"Patents in USPTO database"},
          {num:"3 min", label:"Average time to prior art results"},
          {num:"5 steps", label:"Guided learning curriculum"},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="feature-grid">
        {[
          {icon:"📚", bg:"#EEF2FF", title:"Patent Learning Hub", desc:"5-step guided curriculum covering everything from patent basics to filing strategy. No legal background required.", action:()=>setActive("learn"), link:"Start learning"},
          {icon:"🔍", bg:"#FBF3E3", title:"Prior Art Search", desc:"Describe your idea in plain English. We extract keywords, query USPTO, and return matching patents with AI summaries.", action:()=>setActive("search"), link:"Search now"},
          {icon:"✨", bg:"#E3F5EC", title:"Improvement Suggestions", desc:"After finding prior art, our AI analyzes overlaps and suggests specific changes to make your invention novel and patentable.", action:()=>setActive("search"), link:"See how it works"},
          {icon:"📝", bg:"#FDEAEA", title:"Claims Drafter", desc:"Select your preferred improvement direction and get a first-draft independent and dependent claims in standard patent language.", action:()=>setActive("claims"), link:"Draft claims"},
          {icon:"📖", bg:"#EEF2FF", title:"Patent Glossary", desc:"30+ key terms explained in plain English with real-world examples. Linked contextually throughout the learning modules.", action:()=>setActive("learn"), link:"Browse glossary"},
          {icon:"🛡️", bg:"#FBF3E3", title:"USPTO Official Data", desc:"Every result links to the official USPTO patent record. AI summaries are assistive — always grounded in real data.", action:null, link:null},
        ].map((f,i)=>(
          <div key={i} className="feature-card">
            <div className="feature-icon" style={{background:f.bg}}>{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
            {f.link && <div className="feature-link" onClick={f.action} style={{cursor:"pointer"}}>{f.link} <ChevronRight/></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LearnPage(){
  const [step, setStep] = useState(0);
  const [done, setDone] = useState([]);
  const [gQuery, setGQuery] = useState("");
  const s = LEARNING_STEPS[step];
  const filtered = GLOSSARY.filter(g=>g.term.toLowerCase().includes(gQuery.toLowerCase())||g.def.toLowerCase().includes(gQuery.toLowerCase()));

  function next(){
    if(!done.includes(step)) setDone([...done,step]);
    if(step<LEARNING_STEPS.length-1) setStep(step+1);
  }
  function prev(){if(step>0) setStep(step-1);}

  return(
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Patent Learning <em>Hub</em></h1>
        <p className="page-sub">A plain-English guide to patents — from basics to strategy. Complete all 5 modules to become patent-ready.</p>
      </div>
      <div className="learning-grid">
        <div>
          <div className="card-sm" style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:500,color:"var(--ink3)",marginBottom:10,textTransform:"uppercase",letterSpacing:.5}}>Your Progress</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{flex:1,height:6,background:"var(--card2)",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(done.length/5)*100}%`,height:"100%",background:"var(--blue2)",borderRadius:3,transition:"width .4s"}}/>
              </div>
              <span style={{fontSize:12,fontWeight:500,color:"var(--blue2)"}}>{done.length}/5</span>
            </div>
            <div style={{fontSize:12,color:"var(--ink3)"}}>{done.length===5?"All modules complete 🎉":`${5-done.length} module${5-done.length!==1?"s":""} remaining`}</div>
          </div>
          <div className="steps-list">
            {LEARNING_STEPS.map((ls,i)=>(
              <div key={i} className={`step-item${i===step?" active":""}${done.includes(i)?" done":""}`} onClick={()=>setStep(i)}>
                <div className={`step-num ${i===step?"step-num-active":done.includes(i)?"step-num-done":"step-num-pending"}`}>
                  {done.includes(i)?<CheckIcon/>:i+1}
                </div>
                <div className="step-text">
                  <div className="step-title-text">{ls.title}</div>
                  <div className="step-sub">{ls.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:24}}>
            <div style={{fontSize:12,fontWeight:500,color:"var(--ink3)",marginBottom:10,textTransform:"uppercase",letterSpacing:.5}}>Quick Glossary</div>
            <input className="glossary-search" placeholder="Search terms..." value={gQuery} onChange={e=>setGQuery(e.target.value)}/>
            <div className="glossary-panel" style={{maxHeight:260}}>
              {filtered.map((g,i)=>(
                <div key={i} className="gloss-item">
                  <div className="gloss-term">{g.term}</div>
                  <div className="gloss-def">{g.def}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="content-card">
            <div className="content-header">
              <div className="content-tag">{s.content.tag}</div>
              <h2 className="content-title">{s.content.title}</h2>
            </div>
            <div className="content-body">
              {s.content.body.map((b,i)=>{
                if(b.type==="p") return <p key={i}>{b.text}</p>;
                if(b.type==="h4") return <h4 key={i}>{b.text}</h4>;
                if(b.type==="info") return <div key={i} className="info-block">{b.text}</div>;
                if(b.type==="types") return(
                  <div key={i} className="types-grid">
                    {b.items.map((t,j)=>(
                      <div key={j} className="type-card">
                        <div className="type-card-title">{t.title}</div>
                        <div className="type-card-desc">{t.desc}</div>
                      </div>
                    ))}
                  </div>
                );
                return null;
              })}
            </div>
            <div className="content-footer">
              <button className="btn btn-ghost" onClick={prev} disabled={step===0} style={{opacity:step===0?.4:1}}>← Previous</button>
              <div style={{display:"flex",gap:6}}>
                {LEARNING_STEPS.map((_,i)=>(
                  <div key={i} onClick={()=>setStep(i)} style={{width:8,height:8,borderRadius:"50%",background:i===step?"var(--blue2)":done.includes(i)?"var(--green)":"var(--border2)",cursor:"pointer",transition:"background .2s"}}/>
                ))}
              </div>
              <button className="btn btn-primary" onClick={next}>
                {step===LEARNING_STEPS.length-1?"Complete ✓":"Next Module →"}
              </button>
            </div>
          </div>
          <ChatTutor/>
        </div>
      </div>
    </div>
  );
}

function ChatTutor(){
  const [msgs, setMsgs] = useState(CHAT_INIT);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const SUGGESTED = ["What is prior art?","How do claims work?","How long does it take?","What makes an idea patentable?"];

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  function send(text){
    const q = (text||input).trim();
    if(!q) return;
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:q}]);
    setLoading(true);
    setTimeout(()=>{
      const key = Object.keys(AI_RESPONSES).find(k=>q.toLowerCase().includes(k))||"default";
      setMsgs(m=>[...m,{role:"ai",text:AI_RESPONSES[key]}]);
      setLoading(false);
    },1100);
  }

  return(
    <div className="chat-panel" style={{marginTop:20,maxHeight:400}}>
      <div className="chat-header">
        <div className="chat-avatar">P</div>
        <div>
          <div style={{fontWeight:500,fontSize:14}}>Patent Guide AI</div>
          <div style={{fontSize:12,color:"var(--ink3)"}}>Ask any question about patents</div>
        </div>
        <div style={{marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:"#3AB06A"}}/>
      </div>
      <div className="chat-msgs">
        {msgs.length===1 && (
          <div className="suggested-grid">
            {SUGGESTED.map((s,i)=>(
              <button key={i} className="suggest-btn" onClick={()=>send(s)}>{s}</button>
            ))}
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} className={`msg msg-${m.role}`}>
            {m.role==="ai" && <div className="msg-ai-icon">P</div>}
            <div className="msg-bubble">{m.text}</div>
          </div>
        ))}
        {loading && <div className="msg msg-ai"><div className="msg-ai-icon">P</div><div className="msg-bubble"><div className="loading-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div></div>}
        <div ref={endRef}/>
      </div>
      <div className="chat-input-area">
        <textarea className="chat-input" rows={1} placeholder="Ask about patents..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} style={{height:38,paddingTop:9}}/>
        <button className="send-btn" onClick={()=>send()}><SendIcon/></button>
      </div>
    </div>
  );
}

function SearchPage(){
  const [idea, setIdea] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | extracting | searching | results
  const [keywords, setKeywords] = useState([]);
  const [ipcCodes, setIpcCodes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  function run(){
    if(!idea.trim()) return;
    setPhase("extracting");
    setShowSuggestions(false);
    setShowClaims(false);
    setTimeout(()=>{
      setKeywords(["noise cancellation","sleep wearable","bone conduction","ANC headphones","adaptive audio"]);
      setIpcCodes(["H04R 1/10","A61B 5/00","G10K 11/178"]);
      setPhase("searching");
      setTimeout(()=>setPhase("results"),1600);
    },1400);
  }

  const phaseLabel = {
    extracting:"Extracting keywords with AI...",
    searching:"Querying USPTO PatentsView...",
  };

  return(
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Prior Art <em>Search</em></h1>
        <p className="page-sub">Describe your invention in plain English. We'll extract keywords, search USPTO, and tell you what already exists — and how to differentiate your idea.</p>
      </div>

      <div className="search-box">
        <label className="search-label">Describe your invention idea</label>
        <textarea
          className="search-textarea"
          placeholder="Example: A sleep mask that actively cancels noise using bone conduction sensors to detect ambient sound and generate inverse sound waves, helping people sleep in noisy environments..."
          value={idea}
          onChange={e=>setIdea(e.target.value)}
          maxLength={500}
        />
        <div className="search-meta">
          <span className="char-count">{idea.length}/500 characters</span>
          <button className="btn btn-primary" onClick={run} disabled={!idea.trim()||phase==="extracting"||phase==="searching"} style={{opacity:!idea.trim()?.5:1}}>
            {phase==="extracting"||phase==="searching"
              ? <><div style={{width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>{phaseLabel[phase]}</>
              : <><SearchIcon/>Search Prior Art</>
            }
          </button>
        </div>
        {keywords.length>0 && (
          <div>
            <div style={{fontSize:12,color:"var(--ink3)",marginTop:16,marginBottom:8,fontWeight:500}}>Extracted by AI</div>
            <div className="keywords-row">
              {keywords.map((k,i)=><span key={i} className="kw-tag">🔑 {k}</span>)}
              {ipcCodes.map((c,i)=><span key={i} className="ipc-tag">📋 {c}</span>)}
            </div>
          </div>
        )}
      </div>

      {phase==="results" && (
        <>
          <div className="results-header">
            <div className="results-count"><strong>{SAMPLE_PATENTS.length} patents</strong> found matching your idea</div>
            <div style={{display:"flex",gap:8}}>
              <span style={{fontSize:12,color:"var(--ink3)"}}>Sorted by relevance</span>
            </div>
          </div>
          <div className="patent-list">
            {SAMPLE_PATENTS.map((p,i)=>(
              <div key={i} className="patent-card" style={{animationDelay:`${i*.08}s`,animation:"fadeUp .3s ease both"}}>
                <div className="patent-card-top">
                  <div>
                    <div className="patent-number">{p.id}</div>
                    <div className="patent-title">{p.title}</div>
                    <div className="patent-meta">
                      <span>📅 Filed {p.date}</span>
                      <span>🏢 {p.assignee}</span>
                    </div>
                  </div>
                  <div className={`similarity-badge sim-${p.sim}`}>
                    {p.sim==="high"?"High match":p.sim==="med"?"Medium":"Low"} · {p.simScore}%
                  </div>
                </div>
                <div className="patent-summary">{p.summary}</div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <button className="btn btn-ghost" style={{fontSize:12,padding:"5px 10px"}}><ExternalIcon/> View on USPTO</button>
                </div>
              </div>
            ))}
          </div>

          {!showSuggestions && (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:15,color:"var(--ink2)",marginBottom:16}}>Based on {SAMPLE_PATENTS.length} existing patents, our AI can suggest how to make your idea uniquely patentable.</div>
              <button className="btn btn-gold" onClick={()=>setShowSuggestions(true)}>
                <SparkleIcon/> Generate Improvement Suggestions →
              </button>
            </div>
          )}

          {showSuggestions && (
            <div className="suggestions-panel" style={{animation:"fadeUp .3s ease"}}>
              <div className="suggestions-header">
                <div className="suggestions-icon"><LightbulbIcon/></div>
                <div>
                  <div className="suggestions-title">AI Improvement Suggestions</div>
                  <div style={{fontSize:13,color:"var(--ink3)",marginTop:2}}>Based on analysis of top 4 matching patents</div>
                </div>
              </div>
              <div className="suggestions-list">
                {SUGGESTIONS.map((s,i)=>(
                  <div key={i} className={`suggestion-item${selectedSuggestion===i?" selected":""}`}
                    style={selectedSuggestion===i?{borderColor:"rgba(184,136,42,.4)",background:"var(--gold2)"}:{}}
                    onClick={()=>setSelectedSuggestion(selectedSuggestion===i?null:i)}>
                    <div className="suggestion-header">
                      <div className="suggestion-num">{i+1}</div>
                      <div className="suggestion-text">
                        <span style={{color:"var(--ink3)"}}>{s.overlap}</span>
                        <br/><br/>
                        <strong>{s.improvement}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="novelty-bar">
                <div className="novelty-label">
                  <span>Novelty Potential</span>
                  <span className="novelty-score">High — 76%</span>
                </div>
                <div className="novelty-track">
                  <div className="novelty-fill" style={{width:"76%"}}/>
                </div>
                <div style={{fontSize:12,color:"var(--ink3)",marginTop:8}}>Your idea has strong differentiation opportunities. Improvements 1 and 3 are especially promising given the patent landscape.</div>
              </div>
              {selectedSuggestion!==null && !showClaims && (
                <div style={{marginTop:20,textAlign:"center"}}>
                  <button className="btn btn-primary" onClick={()=>setShowClaims(true)}>
                    <DocIcon/> Draft Claims for Improvement {selectedSuggestion+1} →
                  </button>
                </div>
              )}
            </div>
          )}

          {showClaims && selectedSuggestion!==null && (
            <ClaimsDraft suggestion={SUGGESTIONS[selectedSuggestion]}/>
          )}
        </>
      )}
    </div>
  );
}

function ClaimsDraft({suggestion}){
  const [copied, setCopied] = useState(false);
  const claims = [
    {num:"Independent Claim 1", text:`A wearable sleep device comprising: a flexible mask frame configured to rest on a user's face during sleep; a plurality of bone-conduction transducers positioned at temporal lobe contact points of the mask frame; an ambient noise detection array comprising at least two microphones; a digital signal processor configured to generate inverse acoustic waveforms within 2ms latency; and a personalized adaptive learning module that modifies noise cancellation parameters based on individual user brainwave baselines measured over a period of 7 to 14 consecutive nights.`},
    {num:"Dependent Claim 2", text:`The wearable sleep device of claim 1, wherein the personalized adaptive learning module operates entirely on-device without transmitting biometric data to external servers.`},
    {num:"Dependent Claim 3", text:`The wearable sleep device of claim 1, further comprising a breath-rate detection sensor communicatively coupled to the digital signal processor, wherein the processor is configured to proactively increase noise cancellation intensity upon detection of respiratory patterns associated with sleep apnea onset.`},
  ];

  return(
    <div className="claims-panel" style={{animation:"fadeUp .3s ease"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <h3 className="claims-title">Draft Patent Claims</h3>
        <button className="btn btn-ghost" style={{fontSize:12}} onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}}>
          {copied?"✓ Copied!":"Copy All"}
        </button>
      </div>
      <div style={{fontSize:13,color:"var(--ink3)",marginBottom:20}}>Generated based on Improvement {suggestion?SUGGESTIONS.indexOf(suggestion)+1:""}: {suggestion?.improvement.slice(0,80)}...</div>
      {claims.map((c,i)=>(
        <div key={i} className="claim-block">
          <div className="claim-num">{c.num}</div>
          <div className="claim-text">{c.text}</div>
        </div>
      ))}
      <div className="claims-disclaimer">
        ⚠️ These claims are AI-generated first drafts for educational and planning purposes only. They have not been reviewed by a patent attorney. Before filing, you must engage qualified patent counsel to refine claims, conduct a thorough prior art search, and ensure compliance with USPTO requirements.
      </div>
    </div>
  );
}

function ClaimsPage(){
  const [idea, setIdea] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  function generate(){
    if(!idea.trim()) return;
    setLoading(true);
    setTimeout(()=>{setGenerated(true);setLoading(false);},1800);
  }

  return(
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Claims <em>Drafter</em></h1>
        <p className="page-sub">Describe your invention (after reviewing prior art) and get a first-draft set of patent claims in standard USPTO format.</p>
      </div>
      <div className="search-box">
        <label className="search-label">Your improved invention description</label>
        <textarea className="search-textarea" style={{minHeight:130}}
          placeholder="Describe your invention with its novel improvements included. Be specific about the key technical components and how they work together..."
          value={idea} onChange={e=>setIdea(e.target.value)}/>
        <div className="search-meta">
          <span className="char-count">{idea.length} characters</span>
          <button className="btn btn-primary" onClick={generate} disabled={!idea.trim()||loading} style={{opacity:!idea.trim()?.5:1}}>
            {loading
              ? <><div style={{width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid white",borderRadius:"50%",animation:"spin 1s linear infinite"}}/> Drafting claims...</>
              : <><DocIcon/>Generate Claims</>
            }
          </button>
        </div>
      </div>
      {generated && <ClaimsDraft suggestion={null}/>}
      {!generated && (
        <div className="card" style={{padding:32,textAlign:"center",marginTop:16}}>
          <div style={{fontSize:32,marginBottom:12}}>📝</div>
          <div style={{fontFamily:"var(--serif)",fontSize:22,color:"var(--ink)",marginBottom:8}}>Ready to draft your claims?</div>
          <div style={{fontSize:14,color:"var(--ink3)",maxWidth:480,margin:"0 auto",lineHeight:1.7}}>
            For best results, run a Prior Art Search first to understand what already exists. Then describe your refined, novel invention above and we'll generate independent and dependent claims in proper patent format.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
const PAGE_TITLES = {home:"Home",learn:"Patent Learning Hub",search:"Prior Art Search",claims:"Claims Drafter"};

export default function App(){
  const [active, setActive] = useState("home");
  return(
    <>
      <style>{css}</style>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div className="app">
        <Sidebar active={active} setActive={setActive}/>
        <div className="main">
          <div className="topbar">
            <span className="topbar-title">{PAGE_TITLES[active]}</span>
            <div className="topbar-right">
              <button className="btn btn-ghost" style={{fontSize:12}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Docs
              </button>
              <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setActive("search")}>
                + New Search
              </button>
            </div>
          </div>
          {active==="home" && <HomePage setActive={setActive}/>}
          {active==="learn" && <LearnPage/>}
          {active==="search" && <SearchPage/>}
          {active==="claims" && <ClaimsPage/>}
        </div>
      </div>
    </>
  );
}
