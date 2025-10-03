
function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

// Simple tabs
export function initTabs(root=document){
  $all('[data-tabs]', root).forEach(group=>{
    const btns = $all('.tab-btn', group);
    const panels = $all('.tab-panel', group);
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        btns.forEach(b=>b.classList.remove('active'));
        panels.forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        const id = btn.getAttribute('data-for');
        const panel = group.querySelector(`#${id}`);
        panel?.classList.add('active');
      })
    });
    // activate first
    if(btns[0]) btns[0].click();
  });
}

// Editor runner
export function runJS(textarea, consoleEl){
  consoleEl.textContent = '';
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.setAttribute('sandbox','allow-scripts');
  document.body.appendChild(iframe);
  const code = textarea.value;
  const script = `
    <script>
      const log = (...a)=>parent.postMessage({__runner:'js', data:a.join(' ')}, '*');
      console.log = log; console.error = log;
      try { ${code} } catch(e){ log('Error:', e.message); }
    <\/script>
  `;
  iframe.srcdoc = script;
  window.addEventListener('message', (e)=>{
    if(e.data && e.data.__runner==='js'){ consoleEl.textContent += e.data.data + "\n"; }
  }, {once:false});
  setTimeout(()=>document.body.removeChild(iframe), 2000);
}

export function runPy(textarea, consoleEl){
  consoleEl.textContent = 'Loading Skulpt...';
  if(!window.Sk){ consoleEl.textContent='Skulpt not loaded.'; return; }
  function outf(text){ consoleEl.textContent += text; }
  Sk.configure({output:outf, read: builtinRead});
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'py-canvas';
  let prog = textarea.value;
  Sk.misceval.asyncToPromise(()=>Sk.importMainWithBody('<stdin>', false, prog, true))
    .then(()=>{ consoleEl.textContent += '\n[Program finished]'; })
    .catch(err=>{ consoleEl.textContent = String(err); });
}

function builtinRead(x){
  if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
      throw "File not found: '" + x + "'";
  return Sk.builtinFiles['files'][x];
}

export function wireEditor(root=document){
  $all('[data-editor]', root).forEach(block=>{
    const lang = block.getAttribute('data-lang') || 'js';
    const ta = block.querySelector('textarea');
    const out = block.querySelector('.console');
    const runBtn = block.querySelector('[data-run]');
    if(lang==='js'){
      runBtn?.addEventListener('click', ()=> runJS(ta, out));
    } else {
      runBtn?.addEventListener('click', ()=> runPy(ta, out));
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTabs();
  wireEditor();
});
