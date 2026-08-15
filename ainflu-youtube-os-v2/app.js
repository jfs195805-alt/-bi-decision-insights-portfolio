(() => {
  'use strict';

  const STORAGE_KEY = 'ainflu-youtube-os-v2-state';
  const RESOLVER_API = 'https://yt-resolver-api.vercel.app/api/youtube';

  const navItems = [
    ['overview','⌂','Visão Geral'],['projects','◫','Projetos'],['strategy','◎','Estratégia'],
    ['source','◉','Source Intelligence'],['research','⌕','Pesquisa Viral'],['script','✎','StoryFlow / Roteiro'],
    ['storyboard','▦','Storyboard Maker'],['assets','✦','Asset Studio'],['timeline','≋','Timeline'],
    ['seo','◇','Thumbnail & SEO'],['approvals','✓','Aprovações'],['publisher','⇧','Publisher'],
    ['analytics','⌁','Analytics'],['calendar','□','Calendário'],['library','▤','Biblioteca'],
    ['connections','⚡','Conexões'],['settings','⚙','Configurações']
  ];

  const niches = [
    {id:'geopolitica',name:'Geopolítica e conflitos globais',rpm:[10,18],freq:'2–3/sem',langs:'EN / ES',demand:8,evergreen:7,competition:8,cost:7,risk:6,affinity:6},
    {id:'military',name:'Military / WebDoc bélico',rpm:[8,15],freq:'2–3/sem',langs:'EN / ES',demand:8,evergreen:7,competition:8,cost:8,risk:8,affinity:5},
    {id:'biblia',name:'Histórias da Bíblia com IA',rpm:[4,8],freq:'2–3/sem',langs:'EN / ES',demand:8,evergreen:10,competition:7,cost:6,risk:3,affinity:7},
    {id:'ciencia3d',name:'Esqueletos 3D e ciência / Shorts',rpm:[.3,.5],freq:'Diário',langs:'EN / ES',demand:8,evergreen:8,competition:7,cost:8,risk:4,affinity:5},
    {id:'zen',name:'Monge Zen e sabedoria budista',rpm:[2,4],freq:'4–5/sem',langs:'ES / EN',demand:6,evergreen:9,competition:5,cost:4,risk:2,affinity:7},
    {id:'oracoes',name:'Espiritualidade e orações diárias',rpm:[4,8],freq:'Diário',langs:'EN / ES / PT',demand:9,evergreen:10,competition:8,cost:4,risk:2,affinity:8},
    {id:'terror',name:'Terror e mistérios com IA',rpm:[2,6],freq:'2–5/sem',langs:'EN / ES',demand:9,evergreen:9,competition:8,cost:7,risk:5,affinity:7},
    {id:'cinema',name:'Filmes e cinema com IA',rpm:[1.24,6.82],freq:'3–4/sem',langs:'EN',demand:9,evergreen:7,competition:9,cost:9,risk:10,affinity:5},
    {id:'remakes',name:'Remakes de filmes, jogos e séries',rpm:[2.15,6.7],freq:'3–4/sem',langs:'EN / ES',demand:9,evergreen:7,competition:9,cost:9,risk:10,affinity:5},
    {id:'luxo',name:'Luxo e estilo de vida',rpm:[6.95,24],freq:'2–3/sem',langs:'EN / ES',demand:8,evergreen:7,competition:8,cost:8,risk:4,affinity:6},
    {id:'finance',name:'Business & Finance',rpm:[15,50],freq:'2–3/sem',langs:'EN / ES',demand:9,evergreen:9,competition:10,cost:6,risk:6,affinity:8},
    {id:'aviacao',name:'Aviação e investigação de acidentes',rpm:[3.5,8],freq:'2–3/sem',langs:'EN / ES',demand:8,evergreen:10,competition:7,cost:8,risk:5,affinity:6},
    {id:'motivacional',name:'Motivacional / self improvement',rpm:[3,10],freq:'3–4/sem',langs:'EN / ES',demand:9,evergreen:10,competition:9,cost:4,risk:3,affinity:8},
    {id:'ianews',name:'IA News e ferramentas',rpm:[8,18],freq:'3–7/sem',langs:'EN',demand:10,evergreen:4,competition:10,cost:5,risk:3,affinity:9},
    {id:'relacionamentos',name:'Relacionamentos e drama / Reddit',rpm:[3,12.82],freq:'7–20/sem',langs:'PT / ES / EN',demand:10,evergreen:9,competition:9,cost:5,risk:6,affinity:8},
    {id:'psicologia',name:'Psicologia e comportamento humano',rpm:[5,15],freq:'1–3/sem',langs:'EN',demand:9,evergreen:10,competition:7,cost:5,risk:4,affinity:9}
  ];

  const sourceBlueprint = [
    ['Abertura polarizadora','Contraste “tech bros” versus pessoas comuns para interromper o padrão e criar curiosidade.'],
    ['Credibilidade sem tecnicismo','A narradora assume não saber programar, mas apresenta experiência empresarial como prova social.'],
    ['Promessa de simplicidade','Três formas, uma ferramenta, criação rápida e possibilidade de vender no mesmo dia — tratar como promessa editorial, não garantia.'],
    ['Prova antes do tutorial','Exemplos de planners digitais em três nichos diferentes antes de mostrar o processo.'],
    ['Reenquadramento do mercado','Substitui modelos complexos de agência por produtos digitais simples e reutilizáveis.'],
    ['Demonstração operacional','Design Agent para PDF, AI Sheets para planilhas, revisão e exportação.'],
    ['Distribuição e aquisição','SEO de marketplace, mockups, Pinterest e possibilidade de anúncios.'],
    ['Funil de conversão','Checklist gratuito, link afiliado com créditos, comunidade paga e pedido de comentário.']
  ];

  const defaultClaims = [
    {text:'Planner ADHD: mais de 20 mil vendas e US$ 300 mil de receita.',status:'unverified',note:'Alegação apresentada no vídeo; exige URL da listagem, preço histórico, período e fonte independente.'},
    {text:'Budget planner: mais de US$ 95 mil de receita.',status:'unverified',note:'Alegação comercial sem evidência anexada à transcrição.'},
    {text:'Wedding planner: mais de 3 mil vendas e US$ 180 mil de receita.',status:'unverified',note:'Alegação comercial; não usar como prova factual sem validação.'},
    {text:'Produtos digitais podem ser criados uma vez e vendidos repetidamente.',status:'safe',note:'Característica geral do modelo, mas vendas, demanda e lucro não são garantidos.'},
    {text:'A IA deve ser revisada linha por linha antes da venda.',status:'safe',note:'Boa prática operacional e de controle de qualidade.'}
  ];

  const defaultState = {
    page:'overview', sidebarOpen:false, activeProjectId:'p1',
    projects:[
      {id:'p1',name:'AI Simple Money — Content System',channel:'Ainflu Lab',niche:'ianews',language:'PT-BR',status:'Em produção',progress:68,created:'2026-08-15'},
      {id:'p2',name:'Psicologia Aplicada',channel:'Human Signals',niche:'psicologia',language:'EN',status:'Backlog',progress:24,created:'2026-08-12'},
      {id:'p3',name:'Mistérios Documentais',channel:'Dark Archive',niche:'terror',language:'ES',status:'Pesquisa',progress:35,created:'2026-08-10'}
    ],
    selectedNiche:'ianews',
    weights:{monetization:22,demand:17,evergreen:13,competition:12,cost:10,risk:10,frequency:6,affinity:10},
    source:{
      url:'https://youtu.be/MNNfat_QP0E', videoId:'MNNfat_QP0E', title:'Cloudflare will make 1000+ AI millionaires', channel:'Greg Isenberg',
      thumbnail:'https://i.ytimg.com/vi/MNNfat_QP0E/hqdefault.jpg', transcriptAvailable:true, transcriptOrigin:'Fornecida manualmente pelo usuário',
      transcript:'', analyzed:true, wordCount:3500, estimatedMinutes:23, hooks:4, ctas:8, moneyClaims:3
    },
    sourceClaims:defaultClaims,
    references:[
      {id:'r1',title:'Cloudflare will make 1000+ AI millionaires',channel:'Greg Isenberg',views:'DEMO',duration:'—',selected:true,source:'YouTube'},
      {id:'r2',title:'Build a Digital Product in One Afternoon',channel:'Creator Systems',views:'1,2 mi DEMO',duration:'18:44',selected:true,source:'DEMO'},
      {id:'r3',title:'The Etsy Template Research Framework',channel:'Marketplace Lab',views:'640 mil DEMO',duration:'14:05',selected:false,source:'DEMO'},
      {id:'r4',title:'One Tool AI Business Workflow',channel:'Solo Operator',views:'910 mil DEMO',duration:'21:12',selected:true,source:'DEMO'}
    ],
    script:{generated:true,title:'A verdade sobre ganhar dinheiro com IA sem virar “tech bro”',duration:12,tone:'Direto, crítico e orientado a prova',sections:[]},
    scenes:[], assets:[], jobs:[],
    seo:{generated:false,ctrTarget:5,titles:[],description:'',tags:[],chapters:[],thumbs:[]},
    gates:{strategy:{approved:true,at:'2026-08-15 14:10'},script:{approved:true,at:'2026-08-15 14:34'},storyboard:{approved:false,at:null},assets:{approved:false,at:null},final:{approved:false,at:null}},
    integrations:{},
    settings:{autoMode:false,defaultScenes:40,defaultLanguage:'PT-BR',costLimit:25,adminPin:false},
    activity:[
      ['Roteiro aprovado','Versão 2 aprovada para storyboard','14:34'],
      ['Fonte analisada','Transcrição manual usada como fallback','14:22'],
      ['Metadados resolvidos','YouTube resolver identificou vídeo e canal','14:18'],
      ['Estratégia aprovada','Nicho IA News e ferramentas','14:10']
    ]
  };

  const providers = [
    ['OpenAI','Texto, imagem e análise multimodal','OPENAI_API_KEY'],['Google Gemini / Veo','Texto, visão e vídeo','GOOGLE_API_KEY'],
    ['Anthropic','Roteiro, pesquisa e revisão','ANTHROPIC_API_KEY'],['Ainflu','Handoff de criação e automações','MCP endpoint / token server-side'],
    ['NotebookLM MCP','Pesquisa baseada em fontes e transcrições','MCP externo autenticado'],['ElevenLabs','Voz, dublagem e clonagem','ELEVENLABS_API_KEY'],
    ['MiniMax','Voz e vídeo','MINIMAX_API_KEY'],['Higgsfield','Image-to-video','HIGGSFIELD_API_KEY'],
    ['Runway','Vídeo generativo','RUNWAY_API_KEY'],['Kling','Image-to-video','KLING_API_KEY'],
    ['Pexels','Mídia de estoque','PEXELS_API_KEY'],['Pixabay','Mídia de estoque','PIXABAY_API_KEY'],
    ['YouTube','Pesquisa, upload e analytics','OAuth 2.0 server-side']
  ];

  let state = loadState();
  let commandOpen = false;

  function loadState(){
    try{
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved ? mergeDeep(structuredClone(defaultState), saved) : structuredClone(defaultState);
    }catch(_){ return structuredClone(defaultState); }
  }
  function mergeDeep(target, source){
    if(!source || typeof source !== 'object') return target;
    Object.keys(source).forEach(k=>{
      if(source[k] && typeof source[k] === 'object' && !Array.isArray(source[k]) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) target[k]=mergeDeep(target[k],source[k]);
      else target[k]=source[k];
    });
    return target;
  }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function activeProject(){ return state.projects.find(p=>p.id===state.activeProjectId) || state.projects[0]; }
  function selectedNiche(){ return niches.find(n=>n.id===state.selectedNiche) || niches[0]; }
  function esc(v=''){ return String(v).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m])); }
  function fmtMoney(v){ return Number(v).toLocaleString('pt-BR',{minimumFractionDigits:v<1?2:0,maximumFractionDigits:2}); }
  function now(){ return new Date().toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}); }
  function toast(message,type='ok'){
    const root=document.getElementById('toast-root'); if(!root)return;
    root.innerHTML=`<div class="toast ${type}"><strong>${type==='bad'?'Atenção':'Concluído'}</strong><div class="muted">${esc(message)}</div></div>`;
    setTimeout(()=>{root.innerHTML='';},3300);
  }
  function modal(title,body,footer=''){
    document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-modal"><section class="modal" onclick="event.stopPropagation()"><div class="modal-head"><div><h2>${title}</h2></div><button class="btn icon-btn ghost" data-action="close-modal">×</button></div>${body}${footer?`<div class="divider"></div><div class="actions">${footer}</div>`:''}</section></div>`;
  }
  function closeModal(){ document.getElementById('modal-root').innerHTML=''; }
  function addActivity(title,detail){ state.activity.unshift([title,detail,now()]); state.activity=state.activity.slice(0,20); }
  function navigate(page){ state.page=page; state.sidebarOpen=false; save(); render(); window.scrollTo({top:0,behavior:'smooth'}); }

  function rankNiches(){
    const w=state.weights;
    const maxRpm=Math.max(...niches.map(n=>(n.rpm[0]+n.rpm[1])/2));
    return niches.map(n=>{
      const monet=((n.rpm[0]+n.rpm[1])/2)/maxRpm*10;
      const frequency = n.freq==='Diário'||n.freq.includes('7–20')?3:n.freq.includes('3–7')?5:n.freq.includes('4–5')?6:8;
      const score=(monet*w.monetization+n.demand*w.demand+n.evergreen*w.evergreen+(11-n.competition)*w.competition+(11-n.cost)*w.cost+(11-n.risk)*w.risk+frequency*w.frequency+n.affinity*w.affinity)/Object.values(w).reduce((a,b)=>a+b,0)*10;
      return {...n,score:Math.round(score*10)/10};
    }).sort((a,b)=>b.score-a.score);
  }

  function buildDefaultScript(){
    const niche=selectedNiche();
    state.script.sections=[
      {id:1,label:'HOOK — 0:00',title:'A simplicidade que o mercado esconde',text:'Os “especialistas em IA” transformaram tarefas simples em labirintos de ferramentas. Hoje vamos desmontar isso com um fluxo verificável, sem promessa de dinheiro fácil e sem exigir programação.'},
      {id:2,label:'CREDIBILIDADE — 0:25',title:'Por que este método merece atenção',text:'A tese não depende de ser programador. Ela depende de identificar um problema real, construir uma solução digital útil, testar cada detalhe e distribuir com consistência.'},
      {id:3,label:'PROVA E LIMITES — 1:10',title:'O que os exemplos realmente provam',text:'A fonte cita planners de ADHD, orçamento e casamento com receitas elevadas. Esses números são alegações não verificadas; o que podemos concluir com segurança é que existem listagens e demanda a investigar, não uma garantia de resultado.'},
      {id:4,label:'MODELO — 2:20',title:'Produto digital reutilizável',text:'O modelo consiste em pesquisar uma dor, criar um PDF ou planilha funcional, revisar, publicar e melhorar a oferta com dados. O ativo pode ser vendido mais de uma vez, mas aquisição, conversão, taxas e suporte determinam a rentabilidade.'},
      {id:5,label:'PROCESSO — 4:00',title:'Da pesquisa à primeira versão',text:'Escolha um único nicho, descreva público, dor, resultado, páginas e regras. Gere a primeira versão, revise linha por linha, valide fórmulas, licenças, acessibilidade e instruções antes de vender.'},
      {id:6,label:'DISTRIBUIÇÃO — 7:10',title:'Não dependa de uma única fonte de tráfego',text:'Combine SEO do marketplace, mockups de alta clareza, Pinterest e conteúdo educativo. Meça impressão, clique, conversão, reembolso e lucro por produto.'},
      {id:7,label:'CLÍMAX — 9:40',title:'A ferramenta não é o negócio',text:`No nicho ${niche.name}, a vantagem não vem de apertar “gerar”. Vem da qualidade da pesquisa, da diferenciação, da prova, do controle de risco e da velocidade de aprendizado.`},
      {id:8,label:'CTA — 11:20',title:'Próximo passo mensurável',text:'Escolha uma dor, crie um briefing de uma página e valide com dez pessoas antes de investir na produção. Use o checklist do vídeo, mas registre hipóteses e resultados reais.'}
    ];
    state.script.generated=true;
  }

  function generateScenes(){
    if(!state.script.generated) buildDefaultScript();
    const phases=['Hook','Contexto','Prova','Reenquadramento','Processo','Distribuição','Clímax','Resolução'];
    const visuals=['close cinematográfico com contraste neon','interface limpa com dados verificáveis','mesa de trabalho e produto digital','comparação antes e depois','diagrama de processo em camadas','mockup editorial e marketplace','gráfico de aprendizado e conversão','plano final com chamada à ação'];
    state.scenes=Array.from({length:Number(state.settings.defaultScenes)||40},(_,i)=>{
      const num=i+1, phaseIndex=Math.min(7,Math.floor(i/5)), climax=num===34;
      return {
        id:`s${num}`,num,title:climax?'A ferramenta não é o negócio':`${phases[phaseIndex]} — momento ${((i%5)+1)}`,
        phase:climax?'Clímax':phases[phaseIndex], function:climax?'Virada central da tese':`Avançar ${phases[phaseIndex].toLowerCase()} e manter retenção`,
        description:`Cena ${num}: ${visuals[phaseIndex]}. Elementos originais, sem reproduzir layouts ou ativos de terceiros.`,
        camera:i%3===0?'Plano médio, dolly-in suave':i%3===1?'Close, lente 50 mm, câmera estável':'Plano aberto, parallax discreto',
        lighting:i%2===0?'Luz ciano lateral e preenchimento roxo':'Luz suave de estúdio com recorte rosa',
        emotion:climax?'Clareza e ruptura':phaseIndex<2?'Curiosidade':phaseIndex<5?'Confiança':'Urgência controlada',
        narration:state.script.sections[phaseIndex]?.text || 'Narração de ligação entre as ideias.',
        imagePrompt:`Editorial cinematic frame, ${visuals[phaseIndex]}, dark premium palette, cyan purple pink accents, original composition, 16:9, scene ${num}`,
        videoPrompt:`Animate scene ${num} with subtle camera motion, natural depth, 5 seconds, no text distortion, preserve visual identity`,
        duration:climax?9:6+(i%3),status:'Rascunho',approved:false,climax
      };
    });
    state.gates.storyboard={approved:false,at:null};
    addActivity('Storyboard gerado',`${state.scenes.length} cenas criadas; clímax na cena 34`);
    save();
  }

  function generateSeo(){
    const niche=selectedNiche();
    state.seo={...state.seo,generated:true,
      titles:[
        'A verdade sobre ganhar dinheiro com IA sem saber programar',
        '3 produtos digitais com IA: o método sem promessa falsa',
        'Uma ferramenta, um produto e um sistema de vendas: funciona?',
        'O que os “tech bros” não contam sobre negócios com IA',
        'Como validar um produto digital antes de perder tempo',
        'Templates com IA: oportunidade real ou marketing exagerado?',
        'Do zero ao primeiro produto digital: processo completo',
        'Pare de conectar 20 ferramentas: use este fluxo simples',
        `Como criar um ativo digital no nicho ${niche.name}`,
        'O sistema de 8 etapas para criar e vender produtos digitais'
      ],
      description:'Neste vídeo analisamos criticamente um modelo de criação de produtos digitais com IA. Separamos alegações de evidências, construímos um fluxo de validação, produção, controle de qualidade, SEO e distribuição. Não há garantia de receita: os resultados dependem de pesquisa, diferenciação, execução, demanda, custos e conversão.',
      tags:['produtos digitais','inteligência artificial','negócio online','templates','Etsy SEO','Pinterest marketing','validação de produto','automação de conteúdo'],
      chapters:['00:00 O mito da complexidade','00:25 O que a fonte promete','01:10 Provas e limitações','02:20 Modelo de produto digital','04:00 Produção e QA','07:10 Distribuição','09:40 A ferramenta não é o negócio','11:20 Próximo passo'],
      thumbs:[
        {title:'SEM CÓDIGO. SEM HYPE.',sub:'O processo real'},
        {title:'US$ 300 MIL?',sub:'A prova foi verificada?'},
        {title:'1 FERRAMENTA',sub:'8 etapas essenciais'}
      ]
    };
    addActivity('Pacote SEO gerado','10 títulos, 3 thumbnails e metadados'); save();
  }

  function render(){
    const project=activeProject();
    document.getElementById('app').innerHTML=`
      <div class="app-shell">
        <aside class="sidebar ${state.sidebarOpen?'open':''}">
          <div class="brand"><div class="brand-mark">A</div><div><strong>Ainflu YouTube OS</strong><small>Creative Automation Control Center</small></div></div>
          <div class="nav-label">Operação</div>
          <nav class="nav">${navItems.slice(0,13).map(navButton).join('')}</nav>
          <div class="nav-label">Gestão</div>
          <nav class="nav">${navItems.slice(13).map(navButton).join('')}</nav>
          <div class="sidebar-footer"><span class="badge demo"><span class="dot"></span> MODO DEMO</span><div class="tiny muted">Dados fictícios são marcados. Integrações reais exigem backend, chaves e OAuth.</div></div>
        </aside>
        <main class="main">
          <header class="topbar">
            <div class="topbar-left"><button class="btn icon-btn ghost mobile-menu" data-action="toggle-menu">☰</button>
              <select class="select project-select" data-change="project">${state.projects.map(p=>`<option value="${p.id}" ${p.id===state.activeProjectId?'selected':''}>${esc(p.name)}</option>`).join('')}</select>
              <span class="badge demo hide-mobile">DEMO</span>
            </div>
            <div class="topbar-right"><button class="btn ghost hide-mobile" data-action="open-command">⌘ K&nbsp; Comandos</button><button class="btn icon-btn ghost" data-action="export">⇩</button><button class="btn primary" data-action="new-project">＋ Novo projeto</button></div>
          </header>
          <div class="content">${renderPage(project)}</div>
        </main>
      </div>${commandOpen?renderCommand():''}`;
  }

  function navButton([id,icon,label]){ return `<button class="nav-btn ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`; }
  function renderPage(project){
    const pages={overview:pageOverview,projects:pageProjects,strategy:pageStrategy,source:pageSource,research:pageResearch,script:pageScript,storyboard:pageStoryboard,assets:pageAssets,timeline:pageTimeline,seo:pageSeo,approvals:pageApprovals,publisher:pagePublisher,analytics:pageAnalytics,calendar:pageCalendar,library:pageLibrary,connections:pageConnections,settings:pageSettings};
    return (pages[state.page]||pageOverview)(project);
  }
  function pageHead(title,subtitle,actions=''){ return `<div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div>${actions?`<div class="actions">${actions}</div>`:''}</div>`; }

  function pageOverview(project){
    const complete=Object.values(state.gates).filter(g=>g.approved).length;
    const pipeline=[['Estratégia',state.gates.strategy.approved],['Roteiro',state.gates.script.approved],['Storyboard',state.gates.storyboard.approved],['Assets',state.gates.assets.approved],['Final',state.gates.final.approved],['Publicação',false]];
    return `${pageHead('Visão Geral',`Cockpit operacional de ${esc(project.name)}. Dados abaixo são DEMO, exceto metadados explicitamente resolvidos.`,'<button class="btn cyan" data-page="source">Analisar nova fonte</button>')}
      <div class="grid kpis">
        ${kpi('Projetos ativos','3','+1 no período','metric-up')}${kpi('Pipeline médio',project.progress+'%','2 gates aprovados','')}${kpi('Aprovações pendentes',String(5-complete),'Bloqueiam a publicação','metric-down')}${kpi('Custo projetado','US$ 18,40','Estimativa DEMO','')}
      </div>
      <div class="card glow"><div class="row between wrap"><div><h2>Pipeline ponta a ponta</h2><div class="muted tiny">Aprovação humana obrigatória por padrão</div></div><span class="badge ${complete>=5?'ok':'warn'}">${complete}/5 gates</span></div><div class="divider"></div><div class="pipeline">${pipeline.map((p,i)=>`<div class="pipeline-step ${p[1]?'done':i===complete?'current':''}"><strong>${p[1]?'✓ ':''}${p[0]}</strong><small>${p[1]?'Aprovado':i===complete?'Próxima etapa':'Bloqueado'}</small></div>`).join('')}</div></div>
      <div class="grid two" style="margin-top:16px">
        <section class="card"><div class="row between"><h2>Fonte ativa</h2><span class="badge info">Metadados reais</span></div><div class="source-hero"><div class="video-thumb" style="background-image:url('${esc(state.source.thumbnail)}')"></div><div><h3>${esc(state.source.title)}</h3><p>${esc(state.source.channel)}</p><div class="row wrap"><span class="badge ok">Transcrição manual</span><span class="badge warn">3 claims não verificados</span><span class="badge demo">Análise DEMO</span></div><div class="divider"></div><button class="btn" data-page="source">Abrir inteligência da fonte</button></div></div></section>
        <section class="card"><div class="row between"><h2>Próximas ações</h2><span class="badge warn">3 críticas</span></div><div class="stack">${nextAction('1','Aprovar storyboard','Revise as 40 cenas e o clímax antes de gerar ativos','storyboard')}${nextAction('2','Configurar provedores','Conecte APIs no backend ou mantenha handoff manual','connections')}${nextAction('3','Gerar pacote SEO','Crie títulos, thumbnails e descrição verificável','seo')}</div></section>
      </div>
      <div class="grid two" style="margin-top:16px">
        <section class="card"><h2>Atividade recente</h2><div class="stack">${state.activity.slice(0,6).map(a=>`<div class="row between"><div><strong>${esc(a[0])}</strong><div class="muted tiny">${esc(a[1])}</div></div><span class="tiny muted">${esc(a[2])}</span></div>`).join('')}</div></section>
        <section class="card"><h2>Saúde da automação</h2>${healthRow('Persistência local','Operacional',100,'ok')}${healthRow('Resolver do YouTube','Operacional',100,'ok')}${healthRow('Legendas públicas','Indisponíveis nesta fonte',0,'bad')}${healthRow('Fallback por transcrição manual','Resolvido',100,'ok')}${healthRow('APIs de geração','Não conectadas',0,'warn')}</section>
      </div>`;
  }
  function kpi(label,value,note,cls){return `<div class="card kpi"><div class="kpi-top"><span>${label}</span><span>DEMO</span></div><div class="kpi-value">${value}</div><div class="kpi-note ${cls}">${note}</div></div>`}
  function nextAction(n,t,d,page){return `<div class="blueprint-item"><div><strong>${t}</strong><div class="tiny muted">${d}</div><button class="btn ghost" style="margin-top:7px" data-page="${page}">Abrir</button></div></div>`}
  function healthRow(label,status,progress,type){return `<div style="margin:13px 0"><div class="row between"><span>${label}</span><span class="badge ${type}">${status}</span></div><div class="progress" style="margin-top:7px"><span style="width:${progress}%"></span></div></div>`}

  function pageProjects(){
    return `${pageHead('Projetos','Canais, idiomas, versões e progresso operacional.','<button class="btn primary" data-action="new-project">＋ Criar projeto</button>')}
      <div class="grid three">${state.projects.map(p=>`<article class="card project-card"><div class="project-cover"><strong>${esc(p.name)}</strong></div><div class="row between"><span class="badge ${p.id===state.activeProjectId?'ok':'info'}">${esc(p.status)}</span><span class="tiny muted">${p.language}</span></div><div><strong>${esc(p.channel)}</strong><div class="muted tiny">${esc(niches.find(n=>n.id===p.niche)?.name||p.niche)}</div></div><div class="progress"><span style="width:${p.progress}%"></span></div><div class="row between"><span class="tiny muted">${p.progress}% concluído</span><div class="actions"><button class="btn ghost" data-action="clone-project" data-id="${p.id}">Clonar idioma</button><button class="btn" data-action="activate-project" data-id="${p.id}">Abrir</button></div></div></article>`).join('')}</div>`;
  }

  function pageStrategy(){
    const ranking=rankNiches();
    const sliders=[['monetization','Monetização'],['demand','Demanda'],['evergreen','Evergreen'],['competition','Baixa concorrência'],['cost','Baixo custo'],['risk','Baixo risco autoral'],['frequency','Cadência viável'],['affinity','Afinidade']];
    return `${pageHead('Estratégia de Nichos','Compare 16 nichos. RPMs são estimativas do material de referência, não garantia de receita.','<button class="btn primary" data-action="approve-gate" data-gate="strategy">Aprovar estratégia</button>')}
      <div class="notice warn">A pontuação é uma matriz de decisão explicável. Ela não prevê viralização nem lucro. Valide demanda, política da plataforma, concorrência e unit economics antes de investir.</div>
      <div class="grid two" style="margin-top:16px"><section class="card"><h2>Pesos da decisão</h2><div class="grid two">${sliders.map(([k,l])=>`<div class="field"><label>${l} · <span id="weight-${k}">${state.weights[k]}%</span></label><input class="range" type="range" min="0" max="40" value="${state.weights[k]}" data-weight="${k}"></div>`).join('')}</div><div class="divider"></div><div class="row between"><span class="muted">Total dos pesos</span><strong>${Object.values(state.weights).reduce((a,b)=>a+b,0)}%</strong></div></section>
      <section class="card glow"><h2>Recomendação atual</h2><div class="rpm">${esc(ranking[0].name)}</div><p>Score ${ranking[0].score}/100. Melhor equilíbrio segundo os pesos atuais; ainda exige validação externa.</p><div class="row wrap"><span class="badge info">RPM est. US$ ${fmtMoney(ranking[0].rpm[0])}–${fmtMoney(ranking[0].rpm[1])}</span><span class="badge">${ranking[0].freq}</span><span class="badge">${ranking[0].langs}</span></div><button class="btn cyan" style="margin-top:15px" data-action="select-niche" data-id="${ranking[0].id}">Usar recomendação</button></section></div>
      <div class="section-title"><h2>Ranking calculado</h2><span class="badge demo">Estimativas</span></div><div class="table-wrap"><table class="table"><thead><tr><th>#</th><th>Nicho</th><th>Score</th><th>RPM estimado</th><th>Cadência</th><th>Idiomas</th><th>Risco autoral</th><th></th></tr></thead><tbody>${ranking.map((n,i)=>`<tr><td><div class="rank">${i+1}</div></td><td><strong>${esc(n.name)}</strong>${state.selectedNiche===n.id?'<div class="badge ok" style="margin-top:5px">Selecionado</div>':''}</td><td><strong>${n.score}</strong><div class="progress" style="width:120px;margin-top:5px"><span style="width:${n.score}%"></span></div></td><td>US$ ${fmtMoney(n.rpm[0])}–${fmtMoney(n.rpm[1])}</td><td>${n.freq}</td><td>${n.langs}</td><td>${n.risk}/10</td><td><button class="btn ghost" data-action="select-niche" data-id="${n.id}">Selecionar</button></td></tr>`).join('')}</tbody></table></div>`;
  }

  function pageSource(){
    return `${pageHead('Source Intelligence','Resolve metadados, use legenda pública quando houver e aceite transcrição manual como fallback.','<button class="btn primary" data-action="analyze-transcript">Analisar transcrição</button>')}
      <div class="grid two"><section class="card"><h2>Entrada da fonte</h2><div class="field"><label>URL do YouTube</label><div class="row"><input class="input" id="source-url" value="${esc(state.source.url)}" placeholder="https://youtu.be/..."><button class="btn cyan" data-action="resolve-youtube">Resolver</button></div></div><div class="notice ${state.source.transcriptOrigin?'':'warn'}" style="margin-top:12px"><strong>Fallback resolvido:</strong> o vídeo não ofereceu legendas públicas pelo resolver, mas a transcrição foi fornecida manualmente. O sistema não precisa fingir que o NotebookLM assistiu ao vídeo.</div><div class="field" style="margin-top:13px"><label>Transcrição manual ou texto-fonte</label><textarea class="textarea" id="transcript" placeholder="Cole aqui uma transcrição. A análise local não envia o texto a terceiros.">${esc(state.source.transcript)}</textarea></div><div class="actions"><button class="btn" data-action="use-source-digest">Usar análise já fornecida</button><button class="btn ghost" data-action="clear-transcript">Limpar</button></div></section>
      <section class="card"><div class="video-thumb" style="background-image:url('${esc(state.source.thumbnail)}')"></div><h2 style="margin-top:14px">${esc(state.source.title)}</h2><p>${esc(state.source.channel)}</p><div class="row wrap"><span class="badge info">ID ${esc(state.source.videoId)}</span><span class="badge ok">${esc(state.source.transcriptOrigin)}</span><span class="badge demo">Análise editorial</span></div><div class="divider"></div><div class="grid four">${miniMetric('Palavras',state.source.wordCount||0)}${miniMetric('Duração est.',(state.source.estimatedMinutes||0)+' min')}${miniMetric('CTAs',state.source.ctas||0)}${miniMetric('Claims monetários',state.source.moneyClaims||0)}</div></section></div>
      <div class="grid two" style="margin-top:16px"><section class="card"><div class="row between"><h2>Arquitetura narrativa extraída</h2><span class="badge ok">8 blocos</span></div><div class="blueprint">${sourceBlueprint.map(([t,d])=>`<div class="blueprint-item"><div><strong>${t}</strong><div class="tiny muted">${d}</div></div></div>`).join('')}</div></section>
      <section class="card"><div class="row between"><h2>Validação de alegações</h2><span class="badge warn">Exige fontes</span></div><div class="stack">${state.sourceClaims.map(c=>`<div class="claim ${c.status}"><strong>${c.status==='safe'?'✓ Uso seguro com ressalva':'⚠ Não verificado'}</strong><div>${esc(c.text)}</div><div class="tiny muted">${esc(c.note)}</div></div>`).join('')}</div></section></div>
      <div class="section-title"><h2>Modelo de negócio identificado</h2></div><div class="grid four">${businessCard('1','Pesquisa','Público, dor, concorrentes e diferenciação.')}${businessCard('2','Produto','PDF, planilha ou app; revisão integral.')}${businessCard('3','Oferta','Listing, SEO, mockups e prova visual.')}${businessCard('4','Distribuição','Marketplace, Pinterest, conteúdo e ads opcionais.')}</div>`;
  }
  function miniMetric(l,v){return `<div><div class="muted tiny">${l}</div><strong style="font-size:18px">${v}</strong></div>`}
  function businessCard(n,t,d){return `<div class="card"><div class="rank">${n}</div><h3 style="margin-top:10px">${t}</h3><p class="tiny">${d}</p></div>`}

  function pageResearch(){
    return `${pageHead('Pesquisa Viral','Selecione referências para modelar estrutura, ritmo e linguagem — nunca copiar roteiro, imagens ou sequência exclusiva.','<button class="btn primary" data-action="analyze-references">Analisar selecionados</button>')}
      <div class="notice warn"><strong>Regra de transformação:</strong> combine múltiplas referências, altere tese, exemplos, estrutura visual e redação. Verifique copyright, marcas, música e fatos.</div>
      <div class="grid two" style="margin-top:16px"><section class="card"><h2>Adicionar referência</h2><div class="row"><input class="input" id="reference-url" placeholder="URL do YouTube"><button class="btn cyan" data-action="add-reference">Resolver</button></div><p class="tiny">Metadados reais podem ser obtidos pelo resolver. Métricas DEMO permanecem identificadas.</p></section><section class="card"><h2>Score de originalidade</h2><div class="row"><div class="score-ring" style="--score:86"><span>86</span></div><div><strong>Bom nível de transformação</strong><div class="tiny muted">Tese crítica própria + claims sinalizados + novo roteiro + storyboard original.</div></div></div></section></div>
      <div class="section-title"><h2>Vídeos de referência</h2><span class="badge demo">3 DEMO · 1 real</span></div><div class="grid two">${state.references.map(r=>`<article class="card"><div class="row between"><div><span class="badge ${r.source==='YouTube'?'info':'demo'}">${r.source}</span><h3 style="margin-top:9px">${esc(r.title)}</h3><div class="muted">${esc(r.channel)}</div></div><input type="checkbox" ${r.selected?'checked':''} data-reference="${r.id}" aria-label="Selecionar referência"></div><div class="divider"></div><div class="row wrap"><span class="badge">${r.views}</span><span class="badge">${r.duration}</span></div></article>`).join('')}</div>
      <div class="section-title"><h2>Checklist de originalidade</h2></div><div class="card"><div class="grid two">${['Tese e promessa reescritas','Exemplos substituídos ou verificados','Sequência narrativa própria','Imagens e música licenciadas','Thumbnail sem copiar composição','Citações e fontes registradas','Claims monetários qualificados','Revisão humana final'].map(x=>`<label class="row"><input type="checkbox" checked> <span>${x}</span></label>`).join('')}</div></div>`;
  }

  function pageScript(){
    if(!state.script.sections.length) buildDefaultScript();
    return `${pageHead('StoryFlow / Roteiro','Roteiro original baseado na estrutura da fonte, com ressalvas factuais e edição por seção.','<button class="btn" data-action="generate-script">Regenerar roteiro</button><button class="btn primary" data-action="approve-gate" data-gate="script">Aprovar versão</button>')}
      <div class="grid four">${miniCard('Título',state.script.title)}${miniCard('Duração',state.script.duration+' min')}${miniCard('Tom',state.script.tone)}${miniCard('Idioma',activeProject().language)}</div>
      <div class="notice warn" style="margin-top:16px">Claims de receita permanecem como “alegações da fonte”. Não publicar números como fato sem URL, preço, volume, período e metodologia verificáveis.</div>
      <div class="section-title"><h2>Estrutura editorial</h2><span class="badge ok">Versão 2</span></div><div class="stack">${state.script.sections.map(s=>`<section class="card"><div class="row between"><div><span class="badge info">${esc(s.label)}</span><h2 style="margin-top:10px">${esc(s.title)}</h2></div><button class="btn ghost" data-action="edit-section" data-id="${s.id}">Editar</button></div><p>${esc(s.text)}</p></section>`).join('')}</div>`;
  }
  function miniCard(l,v){return `<div class="card"><div class="muted tiny">${l}</div><strong>${esc(v)}</strong></div>`}

  function pageStoryboard(){
    return `${pageHead('Storyboard Maker Pro','Exatamente 40 cenas por padrão, com clímax, prompts, câmera, luz, narração e aprovação individual.','<button class="btn" data-action="generate-scenes">Gerar 40 cenas</button><button class="btn primary" data-action="approve-gate" data-gate="storyboard" ${state.scenes.length!==40?'disabled':''}>Aprovar storyboard</button>')}
      ${state.scenes.length?`<div class="grid four">${miniCard('Cenas',String(state.scenes.length))}${miniCard('Clímax','Cena 34')}${miniCard('Duração estimada',Math.round(state.scenes.reduce((a,s)=>a+s.duration,0)/60)+' min')}${miniCard('Aprovadas',state.scenes.filter(s=>s.approved).length+'/'+state.scenes.length)}</div><div class="notice" style="margin-top:16px"><strong>Bíblia visual:</strong> interface editorial premium, fundo escuro, acentos ciano/roxo/rosa, iluminação cinematográfica, composição original e textos inseridos apenas na pós-produção.</div><div class="section-title"><h2>40 cenas sequenciais</h2><div class="actions"><button class="btn ghost" data-action="approve-all-scenes">Aprovar todas</button></div></div><div class="scene-grid">${state.scenes.map(s=>`<article class="scene ${s.climax?'climax':''}"><div class="scene-visual">${s.climax?'◆':'▧'}</div><div class="scene-body"><div class="scene-title"><span>${String(s.num).padStart(2,'0')} · ${esc(s.title)}</span>${s.climax?'<span class="badge bad">CLÍMAX</span>':''}</div><p>${esc(s.description)}</p><div class="row between"><span class="badge ${s.approved?'ok':'demo'}">${s.approved?'Aprovada':s.status}</span><button class="btn ghost" data-action="scene-detail" data-id="${s.id}">Abrir</button></div></div></article>`).join('')}</div>`:`<div class="empty"><h2>Nenhuma cena gerada</h2><p>Gere o storyboard a partir do roteiro aprovado. O sistema criará exatamente 40 cenas.</p><button class="btn primary" data-action="generate-scenes">Gerar storyboard</button></div>`}`;
  }

  function pageAssets(){
    return `${pageHead('Asset Studio','Prepare prompts, aprove custos e envie cada cena para o provedor escolhido. Sem integração, use handoff manual.','<button class="btn" data-action="prepare-assets">Preparar prompts</button><button class="btn primary" data-action="run-demo-jobs" ${!state.scenes.length?'disabled':''}>Executar jobs DEMO</button>')}
      <div class="grid kpis">${kpi('Assets previstos',String((state.scenes.length||40)*3),'imagem + vídeo + voz','')}${kpi('Concluídos',String(state.assets.length),'Somente DEMO','metric-up')}${kpi('Jobs ativos',String(state.jobs.filter(j=>j.status==='running').length),'Fila local','')}${kpi('Custo estimado','US$ 18,40','Não debitado','')}</div>
      <div class="grid two"><section class="card"><h2>Roteamento por etapa</h2>${providerRoute('Texto e revisão','OpenAI / Anthropic','Não conectado')}${providerRoute('Imagem','OpenAI / Gemini','Não conectado')}${providerRoute('Image-to-video','Kling / Runway / Higgsfield','Não conectado')}${providerRoute('Voz','ElevenLabs / MiniMax','Não conectado')}${providerRoute('Música','Handoff licenciado','Manual')}</section>
      <section class="card"><div class="row between"><h2>Fila de jobs</h2><span class="badge demo">LOCAL</span></div>${state.jobs.length?state.jobs.map(j=>`<div class="job"><div><strong>${esc(j.name)}</strong><div class="tiny muted">${esc(j.provider)}</div></div><div class="progress"><span style="width:${j.progress}%"></span></div><span class="badge ${j.status==='completed'?'ok':j.status==='failed'?'bad':'info'}">${j.status}</span></div>`).join(''):'<div class="empty">Nenhum job iniciado.</div>'}</section></div>
      ${state.assets.length?`<div class="section-title"><h2>Biblioteca gerada</h2><button class="btn primary" data-action="approve-gate" data-gate="assets">Aprovar assets</button></div><div class="grid four">${state.assets.slice(0,12).map(a=>`<div class="card"><div class="scene-visual">✦</div><h3 style="margin-top:10px">${esc(a.name)}</h3><span class="badge demo">DEMO</span></div>`).join('')}</div>`:''}`;
  }
  function providerRoute(step,p,status){return `<div class="row between" style="padding:10px 0;border-bottom:1px solid var(--line)"><div><strong>${step}</strong><div class="tiny muted">${p}</div></div><span class="badge ${status==='Manual'?'info':'bad'}">${status}</span></div>`}

  function pageTimeline(){
    const scenes=state.scenes.length?state.scenes:Array.from({length:40},(_,i)=>({num:i+1,duration:7}));
    return `${pageHead('Timeline e Render','Sincronize cenas, narração, música e legendas. O preview é DEMO até um backend Remotion/FFmpeg ser conectado.','<button class="btn" data-action="preview-render">▶ Preview DEMO</button><button class="btn primary" data-action="render-demo">Renderizar DEMO</button>')}
      <div class="notice warn">Nenhum MP4 real é gerado nesta versão estática. O job demonstra estados e exporta a especificação da timeline para o renderizador backend.</div>
      <div class="card" style="margin-top:16px"><div class="row between"><div><h2>Master timeline</h2><div class="tiny muted">1920×1080 · 16:9 · 30 fps</div></div><div class="row"><button class="btn ghost">−</button><button class="btn ghost">100%</button><button class="btn ghost">＋</button></div></div><div class="divider"></div><div class="timeline"><div class="timeline-track">${track('Cenas',scenes,'')}${track('Narração',scenes,'audio')}${track('Música',Array.from({length:8},(_,i)=>({num:i+1})),'music')}${track('Legendas',scenes,'caption')}</div></div></div>
      <div class="grid three" style="margin-top:16px"><div class="card"><h3>Áudio</h3><label class="field"><label>Trilha sob a voz · 18%</label><input class="range" type="range" value="18"></label><label class="field"><label>Ducking · 8 dB</label><input class="range" type="range" value="65"></label></div><div class="card"><h3>Exportações</h3><div class="stack"><label class="row"><input type="checkbox" checked> 16:9 · YouTube</label><label class="row"><input type="checkbox" checked> 9:16 · Shorts</label><label class="row"><input type="checkbox" checked> SRT + VTT</label></div></div><div class="card"><h3>Controle</h3><div class="stack"><span class="badge ok">40 cenas</span><span class="badge info">Fades discretos</span><span class="badge warn">Render backend pendente</span></div></div></div>`;
  }
  function track(label,items,cls){return `<div class="track"><div class="track-label">${label}</div><div class="clips">${items.map(x=>`<div class="clip ${cls}">${x.num||''}</div>`).join('')}</div></div>`}

  function pageSeo(){
    const seo=state.seo;
    return `${pageHead('Thumbnail & SEO Lab','Scores são heurísticas explicáveis. CTR real só existe depois da publicação e deve ser lido pela API.','<button class="btn" data-action="generate-seo">Gerar pacote</button><button class="btn primary" data-page="approvals">Ir para aprovação final</button>')}
      <div class="grid two"><section class="card"><div class="row between"><h2>Meta configurável</h2><span class="badge demo">Não é previsão</span></div><div class="field"><label>CTR de referência · <span id="ctr-label">${seo.ctrTarget}%</span></label><input class="range" type="range" min="1" max="15" step=".5" value="${seo.ctrTarget}" data-ctr></div><p class="tiny">Use a meta apenas para orientar teste A/B. O resultado depende de impressão, público, tema, título e distribuição.</p></section><section class="card"><h2>Critérios do score</h2><div class="grid two"><span class="badge info">Clareza</span><span class="badge info">Curiosidade</span><span class="badge info">Especificidade</span><span class="badge info">Integridade</span><span class="badge info">Leitura mobile</span><span class="badge info">Diferenciação</span></div></section></div>
      ${seo.generated?`<div class="section-title"><h2>Conceitos de thumbnail</h2><span class="badge ok">3 opções</span></div><div class="grid three">${seo.thumbs.map((t,i)=>`<article class="card"><div class="thumb-concept">${esc(t.title)}<br><small>${esc(t.sub)}</small></div><div class="row between" style="margin-top:12px"><strong>Conceito ${String.fromCharCode(65+i)}</strong><div class="score-ring" style="--score:${88-i*4}"><span>${88-i*4}</span></div></div></article>`).join('')}</div><div class="grid two" style="margin-top:16px"><section class="card"><h2>10 títulos</h2><div class="stack">${seo.titles.map((t,i)=>`<div class="row between"><span><strong>${i+1}.</strong> ${esc(t)}</span><button class="btn ghost" data-action="copy-text" data-text="${esc(t)}">Copiar</button></div>`).join('')}</div></section><section class="card"><h2>Descrição e capítulos</h2><p>${esc(seo.description)}</p><div class="codebox">${seo.chapters.join('\n')}</div><div class="divider"></div><div class="row wrap">${seo.tags.map(t=>`<span class="badge">${esc(t)}</span>`).join('')}</div></section></div>`:`<div class="empty" style="margin-top:16px"><h2>Pacote ainda não gerado</h2><button class="btn primary" data-action="generate-seo">Gerar títulos, thumbnails e metadados</button></div>`}`;
  }

  function pageApprovals(){
    const gates=[['strategy','1','Estratégia','Nicho, idioma, risco e cadência'],['script','2','Roteiro','Tese, claims, fontes e narrativa'],['storyboard','3','Storyboard','40 cenas, clímax e consistência'],['assets','4','Assets','Imagens, vídeo, voz, música e licenças'],['final','5','Vídeo final e metadados','Timeline, thumbnail, descrição e publicação']];
    return `${pageHead('Aprovações','Cinco gates obrigatórios. O modo automático permanece desativado e a publicação final fica bloqueada.','<button class="btn danger" data-action="reset-gates">Reabrir todos</button>')}
      <div class="stack">${gates.map(([id,n,t,d])=>{const g=state.gates[id];return `<section class="gate ${g.approved?'approved':''}"><div class="gate-num">${g.approved?'✓':n}</div><div><strong>${t}</strong><div class="tiny muted">${d}</div>${g.at?`<div class="tiny metric-up">Aprovado em ${g.at}</div>`:''}</div><div class="actions">${g.approved?`<button class="btn ghost" data-action="reopen-gate" data-gate="${id}">Reabrir</button>`:`<button class="btn primary" data-action="approve-gate" data-gate="${id}">Aprovar</button>`}</div></section>`}).join('')}</div>
      <div class="card" style="margin-top:16px"><div class="row between"><div><h2>Modo automático</h2><p>Ativação administrativa explícita, com logs e rollback. Não recomendado antes de validar o fluxo.</p></div><button class="btn ${state.settings.autoMode?'danger':'ghost'}" data-action="toggle-auto">${state.settings.autoMode?'Desativar':'Ativar com confirmação'}</button></div></div>`;
  }

  function pagePublisher(){
    const final=state.gates.final.approved;
    return `${pageHead('Publisher do YouTube','Upload real requer OAuth server-side. Sem conexão, gere um pacote manual completo.','<button class="btn" data-action="download-package">⇩ Pacote manual</button><button class="btn primary" data-action="publish" ${!final?'disabled':''}>Publicar / Agendar</button>')}
      <div class="notice ${final?'':'bad'}"><strong>${final?'Gate final aprovado':'Publicação bloqueada'}:</strong> ${final?'ainda é necessário conectar OAuth do YouTube no backend.':'aprove vídeo e metadados antes de habilitar qualquer publicação.'}</div>
      <div class="grid two" style="margin-top:16px"><section class="card"><h2>Configuração</h2><div class="stack"><div class="field"><label>Título</label><input class="input" value="${esc(state.seo.titles[0]||state.script.title)}"></div><div class="field"><label>Visibilidade</label><select class="select"><option>Privado</option><option>Não listado</option><option>Público</option></select></div><div class="grid two"><div class="field"><label>Idioma</label><select class="select"><option>${activeProject().language}</option></select></div><div class="field"><label>Audiência</label><select class="select"><option>Não é conteúdo infantil</option><option>Conteúdo infantil</option></select></div></div><div class="field"><label>Agendamento</label><input class="input" type="datetime-local"></div></div></section>
      <section class="card"><h2>Status de prontidão</h2>${Object.entries(state.gates).map(([k,g])=>`<div class="row between" style="padding:10px 0;border-bottom:1px solid var(--line)"><span>${({strategy:'Estratégia',script:'Roteiro',storyboard:'Storyboard',assets:'Assets',final:'Final'})[k]}</span><span class="badge ${g.approved?'ok':'bad'}">${g.approved?'Aprovado':'Pendente'}</span></div>`).join('')}<div class="row between" style="padding:10px 0"><span>YouTube OAuth</span><span class="badge bad">Não conectado</span></div></section></div>`;
  }

  function pageAnalytics(){
    const vals=[42,55,48,68,60,76,72,90,84,105,98,122,116,130,125,148,140,162,156,177,168,191,185,210];
    return `${pageHead('Analytics','Painel DEMO até YouTube Analytics API ser conectada. Observações, cálculos e inferências ficam separados.','<button class="btn" data-page="connections">Conectar YouTube</button>')}
      <div class="notice"><strong>DEMO:</strong> nenhum número abaixo vem do canal do usuário. Métricas reais só serão exibidas após OAuth e scopes autorizados.</div><div class="grid kpis" style="margin-top:16px">${kpi('Visualizações','128 mil','DEMO','metric-up')}${kpi('Watch time','9,4 mil h','DEMO','metric-up')}${kpi('CTR','5,7%','DEMO','metric-up')}${kpi('Retenção média','46%','DEMO','')}</div>
      <div class="grid two"><section class="card"><h2>Tração diária</h2><div class="spark">${vals.map(v=>`<span style="height:${Math.round(v/2.2)}%"></span>`).join('')}</div><div class="row between tiny muted"><span>D-24</span><span>Hoje</span></div></section><section class="card"><h2>Camadas de interpretação</h2><div class="claim safe"><strong>Observado</strong><div>Dados brutos retornados pela API, quando conectada.</div></div><div class="claim" style="margin-top:9px"><strong>Calculado</strong><div>Taxas derivadas de métricas observadas, com fórmula visível.</div></div><div class="claim unverified" style="margin-top:9px"><strong>Inferência</strong><div>Hipótese do sistema, sempre sinalizada e sujeita a validação.</div></div></section></div>
      <div class="section-title"><h2>Recomendações DEMO</h2></div><div class="grid three">${['Testar uma abertura mais curta nos primeiros 20 segundos','Separar alegações e prova visual antes do tutorial','Transformar o bloco de distribuição em dois Shorts'].map((x,i)=>`<div class="card"><span class="badge demo">INFERÊNCIA</span><h3 style="margin-top:10px">${x}</h3><div class="actions"><button class="btn ghost" data-action="reject-recommendation">Rejeitar</button><button class="btn" data-action="accept-recommendation">Aceitar</button></div></div>`).join('')}</div>`;
  }

  function pageCalendar(){
    const days=Array.from({length:35},(_,i)=>i+1);
    return `${pageHead('Calendário Editorial','Backlog, cadência e programação multicanal. Meta operacional: 5–10 vídeos prontos antes do lançamento.','<button class="btn primary" data-action="add-calendar-event">＋ Agendar conteúdo</button>')}
      <div class="grid kpis">${kpi('Backlog pronto','6 vídeos','Dentro da meta','metric-up')}${kpi('Em produção','4','2 aguardam aprovação','')}${kpi('Publicações/sem','3','Cadência escolhida','')}${kpi('Idiomas','PT / EN / ES','Clonagem ativa','')}</div>
      <div class="calendar">${days.map((d,i)=>`<div class="day"><div class="day-head">${d}</div>${[3,7,11,16,20,24,29,33].includes(d)?`<div class="event">${d%2?'Vídeo principal':'Short derivado'} · DEMO</div>`:''}${[5,19,30].includes(d)?'<div class="event" style="background:rgba(22,217,227,.12);border-color:rgba(22,217,227,.25)">Revisão de analytics</div>':''}</div>`).join('')}</div>`;
  }

  function pageLibrary(){
    const items=[['Roteiro v2','Documento','Aprovado'],['Storyboard 40 cenas','Storyboard',state.scenes.length?'Gerado':'Pendente'],['Prompts de imagem','Prompt',state.scenes.length?state.scenes.length+' itens':'Pendente'],['Pacote SEO','Metadados',state.seo.generated?'Gerado':'Pendente'],['Transcrição da fonte','Fonte','Manual'],['Relatório de claims','Governança','5 itens'],['Timeline master','Render','DEMO'],['Pacote de publicação','Exportação','Disponível']];
    return `${pageHead('Biblioteca','Ativos, versões, origem, licença, custo e vínculo com o projeto.','<button class="btn" data-action="export">Exportar projeto JSON</button>')}
      <div class="row" style="margin-bottom:16px"><input class="input" placeholder="Buscar na biblioteca…"><select class="select" style="max-width:180px"><option>Todos os tipos</option><option>Fonte</option><option>Roteiro</option><option>Asset</option></select></div><div class="table-wrap"><table class="table"><thead><tr><th>Nome</th><th>Tipo</th><th>Status</th><th>Origem</th><th>Licença</th><th>Versão</th></tr></thead><tbody>${items.map((x,i)=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td><td><span class="badge ${x[2].includes('Pendente')?'warn':'ok'}">${x[2]}</span></td><td>${i===4?'Usuário':'Sistema DEMO'}</td><td>${i>=5?'N/A':'Verificar por asset'}</td><td>v${i%3+1}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function pageConnections(){
    return `${pageHead('Central de Conexões','Credenciais devem existir somente no backend/secret manager. Este frontend nunca armazena chaves.','<button class="btn" data-action="connection-architecture">Ver arquitetura segura</button>')}
      <div class="notice warn"><strong>Estado atual:</strong> nenhuma integração de geração ou publicação está conectada. O resolver público do YouTube opera apenas com metadados e tentativa de legenda.</div><div class="grid three" style="margin-top:16px">${providers.map((p,i)=>`<article class="card"><div class="integration"><div class="integration-logo">${p[0].slice(0,2).toUpperCase()}</div><div><strong>${p[0]}</strong><div class="tiny muted">${p[1]}</div></div><span class="badge bad">Não conectado</span></div><div class="divider"></div><div class="tiny muted">Esperado: ${p[2]}</div><button class="btn ghost" style="margin-top:11px" data-action="connection-detail" data-id="${i}">Como conectar</button></article>`).join('')}</div>`;
  }

  function pageSettings(){
    return `${pageHead('Configurações','Preferências do projeto, limites operacionais e governança.','<button class="btn primary" data-action="save-settings">Salvar configurações</button>')}
      <div class="grid two"><section class="card"><h2>Padrões de produção</h2><div class="stack"><div class="field"><label>Idioma padrão</label><select class="select" id="setting-language"><option ${state.settings.defaultLanguage==='PT-BR'?'selected':''}>PT-BR</option><option>EN</option><option>ES</option></select></div><div class="field"><label>Número padrão de cenas</label><input class="input" id="setting-scenes" type="number" min="10" max="100" value="${state.settings.defaultScenes}"></div><div class="field"><label>Limite estimado por vídeo (US$)</label><input class="input" id="setting-cost" type="number" min="0" step="1" value="${state.settings.costLimit}"></div></div></section><section class="card"><h2>Governança</h2><div class="stack"><label class="row between"><span>Aprovação humana obrigatória</span><input type="checkbox" checked disabled></label><label class="row between"><span>Marcar dados DEMO</span><input type="checkbox" checked disabled></label><label class="row between"><span>Bloquear publicação sem gate final</span><input type="checkbox" checked disabled></label><label class="row between"><span>Modo automático</span><input type="checkbox" ${state.settings.autoMode?'checked':''} data-auto></label></div><div class="notice bad" style="margin-top:14px">Não coloque tokens da Ainflu, Google ou qualquer outro provedor em URLs, código público ou localStorage. Revogue credenciais expostas.</div></section></div><div class="card" style="margin-top:16px"><h2>Dados locais</h2><p>Esta entrega salva o progresso no navegador. Para produção, substitua por banco persistente, autenticação e fila de jobs no backend.</p><div class="actions"><button class="btn" data-action="export">Exportar backup</button><button class="btn danger" data-action="reset-app">Restaurar DEMO</button></div></div>`;
  }

  function renderCommand(){
    return `<div class="command" data-action="close-command"><div class="command-box" onclick="event.stopPropagation()"><input class="input" style="border:0;border-radius:0;padding:16px" id="command-input" autofocus placeholder="Ir para uma página ou executar uma ação…"><div class="command-results">${navItems.map(n=>`<button class="nav-btn command-item" data-page="${n[0]}"><span>${n[1]} ${n[2]}</span><span class="tiny muted">Abrir</span></button>`).join('')}<button class="nav-btn command-item" data-action="export"><span>⇩ Exportar projeto</span><span class="tiny muted">JSON</span></button></div></div></div>`;
  }

  function gateRequirements(gate){
    if(gate==='storyboard'&&state.scenes.length!==40)return 'O storyboard precisa conter exatamente 40 cenas.';
    if(gate==='assets'&&!state.assets.length)return 'Gere ou registre os assets antes de aprovar.';
    if(gate==='final'&&!state.seo.generated)return 'Gere e revise o pacote SEO antes da aprovação final.';
    return '';
  }

  async function resolveYouTube(url, asReference=false){
    if(!url) return toast('Informe uma URL válida.','bad');
    toast('Consultando metadados do YouTube…');
    try{
      const res=await fetch(`${RESOLVER_API}?url=${encodeURIComponent(url)}`); const data=await res.json();
      if(!data.ok) throw new Error(data.error||'Falha no resolver');
      if(asReference){
        state.references.unshift({id:'r'+Date.now(),title:data.metadata.title||'Vídeo',channel:data.metadata.channel||'Canal',views:'Não consultado',duration:'—',selected:true,source:'YouTube'});
        addActivity('Referência adicionada',data.metadata.title||'Vídeo do YouTube');
      }else{
        Object.assign(state.source,{url:data.metadata.url,videoId:data.metadata.videoId,title:data.metadata.title||'Sem título',channel:data.metadata.channel||'Canal não informado',thumbnail:data.metadata.thumbnail,transcriptAvailable:!!data.transcriptAvailable});
        if(data.transcriptAvailable&&data.fullText){state.source.transcript=data.fullText;state.source.transcriptOrigin='Legenda pública do YouTube';}
        else state.source.transcriptOrigin=state.source.transcriptOrigin||'Transcrição manual necessária';
        addActivity('Metadados resolvidos',`${data.metadata.title||data.metadata.videoId}; legenda: ${data.transcriptAvailable?'disponível':'indisponível'}`);
      }
      save(); render(); toast(data.transcriptAvailable?'Metadados e legenda carregados.':'Metadados carregados; use transcrição manual como fallback.');
    }catch(err){toast(`Não foi possível resolver: ${err.message}`,'bad');}
  }

  function analyzeTranscript(){
    const area=document.getElementById('transcript'); const text=(area?.value||state.source.transcript||'').trim();
    if(!text){
      state.source.analyzed=true; state.source.transcriptOrigin='Transcrição fornecida manualmente pelo usuário'; state.source.wordCount=3500; state.source.estimatedMinutes=23; state.source.ctas=8; state.source.moneyClaims=3;
      addActivity('Fonte analisada','Digest estruturado aplicado à transcrição fornecida'); save(); render(); return toast('Análise fornecida aplicada ao projeto.');
    }
    const words=text.split(/\s+/).filter(Boolean); const lower=text.toLowerCase();
    const ctaPatterns=['link down below','link below','comments','join my','free checklist','click','subscribe','comente','link na descrição'];
    const money=(text.match(/(?:\$|US\$|dollars?|revenue|sales data|mil dólares|receita)/gi)||[]).length;
    state.source.transcript=text; state.source.transcriptOrigin='Transcrição manual analisada localmente'; state.source.wordCount=words.length; state.source.estimatedMinutes=Math.max(1,Math.round(words.length/150)); state.source.ctas=ctaPatterns.reduce((n,p)=>n+(lower.includes(p)?1:0),0); state.source.moneyClaims=money; state.source.analyzed=true;
    addActivity('Transcrição analisada',`${words.length} palavras; ${money} sinais de claims monetários`); save(); render(); toast('Transcrição analisada sem enviar o texto a terceiros.');
  }

  function exportProject(){
    const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString(),disclaimer:'Dados DEMO e estimativas devem permanecer identificados.'},null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ainflu-${activeProject().id}-${Date.now()}.json`;a.click();URL.revokeObjectURL(a.href);toast('Backup JSON exportado.');
  }
  function downloadPackage(){
    if(!state.seo.generated) generateSeo();
    const pkg={project:activeProject(),source:{url:state.source.url,title:state.source.title,channel:state.source.channel},title:state.seo.titles[0],alternativeTitles:state.seo.titles,description:state.seo.description,chapters:state.seo.chapters,tags:state.seo.tags,thumbnailConcepts:state.seo.thumbs,gates:state.gates,publication:{visibility:'private',audience:'notMadeForKids',oauthConnected:false},warnings:['Alegações de receita da fonte não foram verificadas.','Conferir direitos e licenças de cada asset.','Upload real requer OAuth server-side.']};
    const blob=new Blob([JSON.stringify(pkg,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='pacote-publicacao-youtube.json';a.click();URL.revokeObjectURL(a.href);toast('Pacote manual gerado.');
  }

  document.addEventListener('click',async e=>{
    const page=e.target.closest('[data-page]'); if(page){navigate(page.dataset.page);return;}
    const el=e.target.closest('[data-action]'); if(!el)return;
    const action=el.dataset.action;
    if(action==='toggle-menu'){state.sidebarOpen=!state.sidebarOpen;render();}
    if(action==='open-command'){commandOpen=true;render();setTimeout(()=>document.getElementById('command-input')?.focus(),50);}
    if(action==='close-command'){commandOpen=false;render();}
    if(action==='close-modal')closeModal();
    if(action==='export')exportProject();
    if(action==='new-project')modal('Novo projeto',`<div class="stack"><div class="field"><label>Nome do projeto</label><input class="input" id="new-name" value="Novo sistema de conteúdo"></div><div class="field"><label>Canal</label><input class="input" id="new-channel" value="Novo Canal"></div><div class="field"><label>Idioma</label><select class="select" id="new-language"><option>PT-BR</option><option>EN</option><option>ES</option></select></div></div>`,`<button class="btn primary" data-action="confirm-new-project">Criar projeto</button>`);
    if(action==='confirm-new-project'){const name=document.getElementById('new-name')?.value.trim(),channel=document.getElementById('new-channel')?.value.trim(),language=document.getElementById('new-language')?.value;if(!name)return toast('Informe um nome.','bad');const id='p'+Date.now();state.projects.push({id,name,channel:channel||'Canal',niche:state.selectedNiche,language,status:'Novo',progress:5,created:new Date().toISOString().slice(0,10)});state.activeProjectId=id;addActivity('Projeto criado',name);save();closeModal();navigate('strategy');}
    if(action==='activate-project'){state.activeProjectId=el.dataset.id;save();navigate('overview');}
    if(action==='clone-project'){const p=state.projects.find(x=>x.id===el.dataset.id);if(p){const clone={...p,id:'p'+Date.now(),name:p.name+' — EN',language:p.language==='EN'?'ES':'EN',status:'Clonado',progress:10};state.projects.push(clone);addActivity('Projeto clonado',`${p.name} → ${clone.language}`);save();render();toast('Projeto clonado com novo idioma.');}}
    if(action==='select-niche'){state.selectedNiche=el.dataset.id;const p=activeProject();p.niche=el.dataset.id;state.gates.strategy={approved:false,at:null};addActivity('Nicho selecionado',selectedNiche().name);save();render();toast('Nicho selecionado e ranking salvo.');}
    if(action==='approve-gate'){const g=el.dataset.gate,req=gateRequirements(g);if(req)return toast(req,'bad');state.gates[g]={approved:true,at:now()};addActivity('Gate aprovado',g);save();render();toast('Etapa aprovada e registrada.');}
    if(action==='reopen-gate'){const g=el.dataset.gate;state.gates[g]={approved:false,at:null};addActivity('Gate reaberto',g);save();render();toast('Gate reaberto para revisão.');}
    if(action==='reset-gates'){Object.keys(state.gates).forEach(k=>state.gates[k]={approved:false,at:null});save();render();toast('Todos os gates foram reabertos.');}
    if(action==='resolve-youtube')resolveYouTube(document.getElementById('source-url')?.value||'');
    if(action==='add-reference')resolveYouTube(document.getElementById('reference-url')?.value||'',true);
    if(action==='analyze-transcript'||action==='use-source-digest')analyzeTranscript();
    if(action==='clear-transcript'){state.source.transcript='';save();render();}
    if(action==='analyze-references'){const n=state.references.filter(r=>r.selected).length;addActivity('Referências analisadas',`${n} fontes combinadas`);save();toast(`${n} referências consolidadas. Estrutura modelada sem copiar conteúdo.`);}
    if(action==='generate-script'){buildDefaultScript();state.gates.script={approved:false,at:null};addActivity('Roteiro regenerado','Nova versão baseada na fonte e no nicho');save();render();toast('Roteiro original regenerado.');}
    if(action==='edit-section'){const s=state.script.sections.find(x=>String(x.id)===el.dataset.id);if(s)modal('Editar seção',`<div class="field"><label>${esc(s.label)} · ${esc(s.title)}</label><textarea class="textarea" id="edit-section-text" style="min-height:230px">${esc(s.text)}</textarea></div>`,`<button class="btn primary" data-action="save-section" data-id="${s.id}">Salvar nova versão</button>`);}
    if(action==='save-section'){const s=state.script.sections.find(x=>String(x.id)===el.dataset.id);if(s){s.text=document.getElementById('edit-section-text')?.value||s.text;state.gates.script={approved:false,at:null};addActivity('Roteiro editado',s.title);save();closeModal();render();toast('Seção salva; aprovação reaberta.');}}
    if(action==='generate-scenes'){generateScenes();render();toast('Storyboard de 40 cenas gerado.');}
    if(action==='approve-all-scenes'){state.scenes.forEach(s=>s.approved=true);save();render();toast('Todas as cenas foram aprovadas individualmente.');}
    if(action==='scene-detail'){const s=state.scenes.find(x=>x.id===el.dataset.id);if(s)modal(`Cena ${s.num} · ${esc(s.title)}`,`<div class="grid two"><div><div class="field"><label>Função narrativa</label><div class="codebox">${esc(s.function)}</div></div><div class="field"><label>Descrição visual</label><div class="codebox">${esc(s.description)}</div></div><div class="field"><label>Câmera</label><div class="codebox">${esc(s.camera)}</div></div><div class="field"><label>Luz e emoção</label><div class="codebox">${esc(s.lighting)} · ${esc(s.emotion)}</div></div></div><div><div class="field"><label>Prompt de imagem</label><div class="codebox">${esc(s.imagePrompt)}</div></div><div class="field"><label>Prompt image-to-video</label><div class="codebox">${esc(s.videoPrompt)}</div></div><div class="field"><label>Narração</label><div class="codebox">${esc(s.narration)}</div></div></div></div>`,`<button class="btn ghost" data-action="regenerate-scene" data-id="${s.id}">Regenerar somente esta cena</button><button class="btn primary" data-action="approve-scene" data-id="${s.id}">${s.approved?'Reaprovar':'Aprovar cena'}</button>`);}
    if(action==='approve-scene'){const s=state.scenes.find(x=>x.id===el.dataset.id);if(s){s.approved=true;s.status='Aprovada';save();closeModal();render();toast(`Cena ${s.num} aprovada.`);}}
    if(action==='regenerate-scene'){const s=state.scenes.find(x=>x.id===el.dataset.id);if(s){s.description+=` Variação original ${Math.floor(Math.random()*900+100)}.`;s.approved=false;s.status='Regenerada';save();closeModal();render();toast(`Cena ${s.num} regenerada sem alterar as demais.`);}}
    if(action==='prepare-assets'){if(!state.scenes.length)return toast('Gere o storyboard primeiro.','bad');addActivity('Prompts preparados',`${state.scenes.length*2} prompts revisáveis`);save();toast('Prompts preparados; nenhuma API foi cobrada.');}
    if(action==='run-demo-jobs'){if(!state.scenes.length)return;state.jobs=[{name:'Imagens das cenas 01–40',provider:'DEMO adapter',progress:100,status:'completed'},{name:'Clipes image-to-video',provider:'DEMO adapter',progress:100,status:'completed'},{name:'Narração por cena',provider:'DEMO adapter',progress:100,status:'completed'},{name:'Legendas SRT/VTT',provider:'Local',progress:100,status:'completed'}];state.assets=state.scenes.flatMap(s=>[{id:`img-${s.id}`,name:`Imagem · Cena ${s.num}`,type:'image'},{id:`vid-${s.id}`,name:`Clipe · Cena ${s.num}`,type:'video'},{id:`aud-${s.id}`,name:`Voz · Cena ${s.num}`,type:'audio'}]);addActivity('Jobs DEMO concluídos',`${state.assets.length} placeholders rotulados`);save();render();toast('Jobs DEMO concluídos. Nenhum crédito externo foi usado.');}
    if(action==='preview-render')modal('Preview DEMO',`<div class="thumb-concept" style="aspect-ratio:16/9">PREVIEW<br><small>40 cenas · timeline conceitual</small></div><p class="muted">Este preview demonstra ordem e estrutura. Um arquivo audiovisual real exige backend Remotion/FFmpeg e assets reais.</p>`,'<button class="btn" data-action="close-modal">Fechar</button>');
    if(action==='render-demo'){state.jobs.unshift({name:'Render master 16:9',provider:'Remotion/FFmpeg — DEMO',progress:100,status:'completed'});addActivity('Render DEMO concluído','Especificação criada; nenhum MP4 foi declarado');save();render();toast('Render DEMO registrado sem afirmar que existe um MP4 real.');}
    if(action==='generate-seo'){generateSeo();render();toast('Pacote SEO gerado com critérios explicáveis.');}
    if(action==='copy-text'){navigator.clipboard?.writeText(el.dataset.text||'');toast('Texto copiado.');}
    if(action==='toggle-auto'){modal('Confirmar modo automático',`<div class="notice bad">O modo automático não remove o bloqueio da publicação final. Todas as decisões ficam registradas, mas esta versão DEMO não executa provedores externos.</div>`,`<button class="btn danger" data-action="confirm-auto">${state.settings.autoMode?'Desativar':'Ativar'} modo automático</button>`);}
    if(action==='confirm-auto'){state.settings.autoMode=!state.settings.autoMode;save();closeModal();render();toast(`Modo automático ${state.settings.autoMode?'ativado':'desativado'}.`);}
    if(action==='download-package')downloadPackage();
    if(action==='publish'){if(!state.gates.final.approved)return toast('Gate final pendente.','bad');modal('OAuth necessário',`<div class="notice warn">A publicação real não foi executada. Configure OAuth 2.0 no backend, mantenha refresh tokens em secret manager e solicite apenas os scopes necessários.</div>`,`<button class="btn" data-page="connections">Abrir conexões</button>`);}
    if(action==='accept-recommendation'){toast('Recomendação adicionada ao backlog de testes.');}
    if(action==='reject-recommendation'){toast('Recomendação rejeitada e registrada.');}
    if(action==='add-calendar-event')modal('Agendar conteúdo',`<div class="stack"><div class="field"><label>Título</label><input class="input" value="Novo vídeo"></div><div class="field"><label>Data</label><input class="input" type="date"></div><div class="notice">Evento DEMO será salvo no próximo ciclo de persistência do calendário.</div></div>`,`<button class="btn primary" data-action="close-modal">Salvar evento</button>`);
    if(action==='connection-detail'){const p=providers[Number(el.dataset.id)];modal(`Conectar ${esc(p[0])}`,`<div class="stack"><div class="notice warn"><strong>Status:</strong> não conectado.</div><div><strong>Capacidades</strong><p>${esc(p[1])}</p></div><div><strong>Credencial esperada</strong><div class="codebox">${esc(p[2])}</div></div><div><strong>Implementação segura</strong><p>Crie um endpoint backend, armazene o segredo no provedor de hospedagem, valide permissões, imponha limite de custo, registre erros e nunca devolva a chave ao navegador.</p></div>${p[0]==='Ainflu'?'<div class="notice">Sem um endpoint MCP/API documentado, o sistema usa handoff manual. Um token em URL não equivale a uma conexão MCP.</div>':''}${p[0]==='NotebookLM MCP'?'<div class="notice">Use como analisador de fontes e transcrições. Para vídeo completo, combine transcrição com extração de frames e visão multimodal.</div>':''}`,'<button class="btn" data-action="close-modal">Entendi</button>');}
    if(action==='connection-architecture')modal('Arquitetura segura',`<div class="codebox">Browser → API do Ainflu YouTube OS → fila de jobs → adaptador do provedor\n                         ↘ secret manager\n                         ↘ auditoria e custos\n                         ↘ armazenamento de assets</div><p>O navegador recebe apenas status, resultados e URLs temporárias. Chaves, refresh tokens e credenciais MCP ficam no backend.</p>`,'<button class="btn" data-action="close-modal">Fechar</button>');
    if(action==='save-settings'){state.settings.defaultLanguage=document.getElementById('setting-language')?.value||'PT-BR';state.settings.defaultScenes=Math.max(10,Math.min(100,Number(document.getElementById('setting-scenes')?.value||40)));state.settings.costLimit=Number(document.getElementById('setting-cost')?.value||25);save();render();toast('Configurações salvas.');}
    if(action==='reset-app'){localStorage.removeItem(STORAGE_KEY);state=structuredClone(defaultState);buildDefaultScript();save();render();toast('Aplicativo restaurado para o modo DEMO.');}
  });

  document.addEventListener('change',e=>{
    if(e.target.matches('[data-change="project"]')){state.activeProjectId=e.target.value;save();render();}
    if(e.target.matches('[data-reference]')){const r=state.references.find(x=>x.id===e.target.dataset.reference);if(r){r.selected=e.target.checked;save();}}
    if(e.target.matches('[data-auto]')){state.settings.autoMode=e.target.checked;save();}
  });
  document.addEventListener('input',e=>{
    if(e.target.matches('[data-weight]')){state.weights[e.target.dataset.weight]=Number(e.target.value);save();const label=document.getElementById('weight-'+e.target.dataset.weight);if(label)label.textContent=e.target.value+'%';}
    if(e.target.matches('[data-ctr]')){state.seo.ctrTarget=Number(e.target.value);save();const label=document.getElementById('ctr-label');if(label)label.textContent=e.target.value+'%';}
  });
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();commandOpen=!commandOpen;render();}
    if(e.key==='Escape'){commandOpen=false;closeModal();render();}
  });

  if(!state.script.sections.length) buildDefaultScript();
  if(!state.scenes.length) generateScenes();
  save(); render();
})();
