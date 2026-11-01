/**
 * Jigsaw Master PRO - Core Game Engine
 * Updates:
 * 1. 取消格線：完全去除目標畫布格子虛線，純淨極簡無人工網格干擾。
 * 2. 金幣獎勵商城制：通關依片數賺取金幣，可購買自訂畫框、通關道具（磁吸石、邊框箱、透視眼）與解鎖秘境圖庫。
 * 3. 預留進度存檔：未完成時自動保存進度（時間、步數、卡榫形狀、吸附與散落位置），可隨時無縫繼續。
 * 4. 點進圖片選片數：主介面取消隨意切換片數，嚴格在點選圖片進入時跳出片數選擇器。
 */

// ============================================================================
// Natural Photography & Masterpiece Catalog
// ============================================================================
const PUZZLE_CATALOG = [
  {
    id: 'yosemite',
    title: '優勝美地倒影湖',
    location: '美國加州 · Yosemite National Park',
    category: 'nature',
    categoryName: '🏞️ 自然風光',
    src: 'assets/yosemite_valley.jpg',
    desc: '清晨薄霧中，雄偉花崗岩巨峰倒映於靜謐湖水，金黃秋草相伴。'
  },
  {
    id: 'swiss_alps',
    title: '瑞士阿爾卑斯馬特洪峰',
    location: '瑞士 · Zermatt Alps',
    category: 'nature',
    categoryName: '🏞️ 自然風光',
    src: 'assets/swiss_alps.jpg',
    desc: '白雪皚皚的阿爾卑斯頂峰與湛藍高山冰川湖泊，大自然的壯麗傑作。'
  },
  {
    id: 'hallstatt',
    title: '奧地利哈爾施塔特仙境',
    location: '奧地利 · Hallstatt Lake',
    category: 'nature',
    categoryName: '🏞️ 自然風光',
    src: 'assets/hallstatt_lake.jpg',
    desc: '群山環抱中的童話湖畔小鎮，木屋依山傍水，宛若人間仙境。'
  },
  {
    id: 'kyoto_garden',
    title: '日本富士櫻花與古塔',
    location: '日本 · Mount Fuji & Kyoto',
    category: 'landmark',
    categoryName: '🌸 世界名勝',
    src: 'assets/kyoto_garden.jpg',
    desc: '初春盛開的粉嫩吉野櫻，襯托著遠方白雪覆頂的富士聖山。'
  },
  {
    id: 'aurora',
    title: '挪威峽灣夢幻極光',
    location: '挪威 · Tromsø Fjords',
    category: 'landmark',
    categoryName: '🌸 世界名勝',
    src: 'assets/aurora_borealis.jpg',
    desc: '夜幕降臨時，綠色璀璨的歐若拉極光如絲綢般舞動在峽灣夜空。'
  },
  {
    id: 'lavender',
    title: '普羅旺斯夕陽薰衣草田',
    location: '法國普羅旺斯 · Valensole',
    category: 'nature',
    categoryName: '🏞️ 自然風光',
    src: 'assets/lavender_field.jpg',
    desc: '夏日黃昏時分，無邊無際的紫色薰衣草花海散發芬芳，夕陽如金。'
  },
  {
    id: 'golden_retriever',
    title: '陽光草地金毛尋回犬',
    location: '真實寵物 · 療癒瞬間',
    category: 'animal',
    categoryName: '🐾 療癒萌寵',
    src: 'assets/golden_retriever.jpg',
    desc: '在綠意盎然的草地上奔跑、笑容溫暖燦爛的超可愛金毛狗狗。'
  },
  {
    id: 'cute_cat',
    title: '暖陽下慵懶的萌貓',
    location: '真實萌寵 · 療癒瞬間',
    category: 'animal',
    categoryName: '🐾 療癒萌寵',
    src: 'assets/cute_cat_real.jpg',
    desc: '擁有清澈圓滾雙眸的可愛貓咪，靜靜凝望著陽光漫溢的午後。'
  },
  {
    id: 'starry_night',
    title: '梵谷《星夜》傳世名畫',
    location: '藝術瑰寶 · The Starry Night (1889)',
    category: 'art',
    categoryName: '🎨 世界名畫',
    src: 'assets/starry_night.jpg',
    desc: '後印象派大師文森·梵谷最富盛名的油畫，渦旋星雲與深藍夜空。'
  },
  {
    id: 'santorini',
    title: '希臘聖托里尼藍頂教堂',
    location: '希臘愛琴海 · Santorini Oia',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/santorini.jpg',
    desc: '愛琴海懸崖邊純白洞穴屋舍與湛藍圓頂教堂，夕陽餘暉下浪漫極致。',
    price: 120,
    tier: '入門秘境',
    tierColor: '#10b981'
  },
  {
    id: 'taj_mahal',
    title: '泰姬瑪哈陵晨光倒影',
    location: '印度阿格拉 · Agra Taj Mahal',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/taj_mahal.jpg',
    desc: '世界新七大奇蹟之一，純白大理石陵墓在黎明晨光中散發莊嚴光芒。',
    price: 180,
    tier: '世界名勝',
    tierColor: '#06b6d4'
  },
  {
    id: 'venice_canal',
    title: '威尼斯大運河黃昏貢多拉',
    location: '義大利威尼斯 · Grand Canal Venice',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/venice_canal.jpg',
    desc: '黃昏金色夕陽灑落在水都大運河，貢多拉小船悠然劃過歷史古建築。',
    price: 240,
    tier: '世界名勝',
    tierColor: '#06b6d4'
  },
  {
    id: 'redwood_forest',
    title: '加州迷霧紅木巨樹森林',
    location: '美國加州 · Redwood National Park',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/redwood_forest.jpg',
    desc: '薄霧瀰漫的千年古老紅木巨樹，晨曦穿透樹冠灑下金色丁達爾光。',
    price: 280,
    tier: '自然秘境',
    tierColor: '#3b82f6'
  },
  {
    id: 'machu_picchu',
    title: '印加失落之城馬丘比丘',
    location: '秘魯安地斯山脈 · Machu Picchu',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/machu_picchu.jpg',
    desc: '高聳於雲霧繚繞安地斯山巔的古印加帝國遺跡，壯麗而神秘。',
    price: 350,
    tier: '世界奇蹟',
    tierColor: '#8b5cf6'
  },
  {
    id: 'great_wave',
    title: '葛飾北齋《神奈川沖浪裏》',
    location: '浮世繪名畫 · 富嶽三十六景',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/great_wave.jpg',
    desc: '滔天巨浪奔騰翻捲如爪，遠眺神聖富士山，充滿張力的東方藝術顛峰。',
    price: 420,
    tier: '傳世名畫',
    tierColor: '#ec4899'
  },
  {
    id: 'fantasy_castle',
    title: '巴伐利亞夢幻新天鵝堡',
    location: '德國巴伐利亞 · Neuschwanstein Castle',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/fantasy_castle.jpg',
    desc: '聳立於阿爾卑斯青翠山巒之巔的白色童話城堡，宛若夢境降臨。',
    price: 500,
    tier: '傳奇仙境',
    tierColor: '#f59e0b'
  },
  {
    id: 'cyberpunk_neon',
    title: '未來賽博光影之都',
    location: '未來科幻 · Cyberpunk Metropolis',
    category: 'secret',
    categoryName: '🔒 秘境商城',
    src: 'assets/cyberpunk_neon.jpg',
    desc: '雨夜穿梭的浮空車流與五彩斑斕的全息霓虹光影，極致未來視覺體驗。',
    price: 600,
    tier: '殿堂之選',
    tierColor: '#fbbf24'
  }
];

// ============================================================================
// Sound Engine (Web Audio API)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSnap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);

    const cOsc = this.ctx.createOscillator();
    const cGain = this.ctx.createGain();
    cOsc.type = 'square';
    cOsc.frequency.setValueAtTime(1300, t);
    cGain.gain.setValueAtTime(0.25, t);
    cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    cOsc.connect(cGain);
    cGain.connect(this.ctx.destination);
    cOsc.start(t);
    cOsc.stop(t + 0.025);
  }

  playPick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.06);
    gain.gain.setValueAtTime(0.16, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  playDrop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, t);
    osc.frequency.setValueAtTime(1318.51, t + 0.08);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.26);
  }

  playShuffle() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);
      gain.gain.setValueAtTime(0.12, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.04);
      osc.stop(t + idx * 0.04 + 0.13);
    });
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.50];
    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      gain.gain.setValueAtTime(0, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, t + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.65);
    });
  }
}

// ============================================================================
// Particle FX System
// ============================================================================
class FXSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isRunning = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createSpark(x, y) {
    const colors = ['#06b6d4', '#3b82f6', '#fbbf24', '#ffffff', '#10b981'];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        type: 'spark'
      });
    }
    this.startLoop();
  }

  createConfetti() {
    const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#fbbf24'];
    for (let i = 0; i < 160; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        width: Math.random() * 10 + 6,
        height: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.003 + Math.random() * 0.003,
        type: 'confetti'
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(() => this.update());
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.type === 'confetti') {
        p.rot += p.rotSpeed;
        p.vy += 0.04;
      } else {
        p.vx *= 0.94;
        p.vy *= 0.94;
      }

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      if (p.type === 'confetti') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rot * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      } else {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.update());
    } else {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================================================
// Main Jigsaw Puzzle Game Controller
// ============================================================================
class JigsawGame {
  constructor() {
    this.sound = new SoundEngine();
    this.fx = new FXSystem(document.getElementById('fx-canvas'));

    // Config & Game State
    this.targetPieceCount = 50; // Locked per round
    this.gridCols = 10;
    this.gridRows = 5;
    this.totalPieces = 50;
    this.shapeStyle = 'jigsaw'; // 'jigsaw' | 'tile'
    this.boardZoom = 1.0;

    // Active Image
    this.currentImageItem = PUZZLE_CATALOG[0];
    this.loadedImage = null;

    // Temporary piece selection state when opening modal
    this.pendingSelectImage = null;
    this.pendingPieceCount = 50;

    // Board Dimensions
    this.boardWidth = 520;
    this.boardHeight = 390;

    // Pieces and Progress
    this.pieces = [];
    this.hEdges = [];
    this.vEdges = [];
    this.snappedCount = 0;
    this.moves = 0;

    // Timer
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.hasStarted = false;
    this.isTimerFrozen = false;
    this.isDoubleCoinsActive = false;

    // Display & Settings
    this.ghostOpacity = 0.20;
    this.isGhostVisible = true;

    // Drag tracking
    this.activeDragPiece = null;
    this.dragPointerOffset = { x: 0, y: 0 };

    // Daily Special Setup
    this.dailyItem = this.calculateDailySpecial();

    // Economy & Inventory System (Distinct Non-Redundant Items)
    this.coins = parseInt(localStorage.getItem('jigsaw_coins') || '100', 10);
    this.inventory = JSON.parse(localStorage.getItem('jigsaw_inventory') || '{"magnet": 2, "corners": 1, "freeze": 1, "doublecoin": 1}');
    this.unlockedThemes = JSON.parse(localStorage.getItem('jigsaw_unlocked_themes') || '["default"]');
    this.activeTheme = localStorage.getItem('jigsaw_active_frame') || 'default';
    this.unlockedPuzzles = JSON.parse(localStorage.getItem('jigsaw_unlocked_puzzles') || '[]');

    // DOM Elements
    this.boardOuterWrapper = document.getElementById('board-outer-wrapper');
    this.boardFrame = document.getElementById('board-frame');
    this.boardBgCanvas = document.getElementById('board-bg-canvas');
    this.boardSnappedLayer = document.getElementById('board-snapped-layer');
    this.boardGlow = document.getElementById('board-glow-effect');
    this.trayContainer = document.getElementById('tray-container');
    this.trayInner = document.getElementById('tray-inner');
    this.dragLayer = document.getElementById('drag-layer');

    // UI Displays
    this.timerDisplay = document.getElementById('timer-display');
    this.movesDisplay = document.getElementById('moves-display');
    this.progressDisplay = document.getElementById('progress-display');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.currentThemeThumb = document.getElementById('current-theme-thumb');
    this.currentThemeTitle = document.getElementById('current-theme-title');
    this.currentPieceCountBadge = document.getElementById('current-piece-count-badge');
    this.coinBalanceDisplay = document.getElementById('coin-balance-display');
    this.shopCoinBalance = document.getElementById('shop-coin-balance');

    // Modals & Banners
    this.galleryModal = document.getElementById('gallery-modal');
    this.galleryGrid = document.getElementById('gallery-grid');
    this.pieceSelectionModal = document.getElementById('piece-selection-modal');
    this.shopModal = document.getElementById('shop-modal');
    this.previewModal = document.getElementById('preview-modal');
    this.previewModalImg = document.getElementById('preview-modal-img');
    this.victoryModal = document.getElementById('victory-modal');
    this.resumeBanner = document.getElementById('resume-banner');

    // Init
    this.applyEquippedFrameTheme();
    this.updateEconomyUI();
    this.initDailyBanner();
    this.bindEvents();

    // Check for saved in-progress puzzle
    if (!this.checkAndPromptResume()) {
      this.loadCurrentPuzzle();
    }
  }

  // ============================================================================
  // Economy & Coins Shop System
  // ============================================================================
  updateEconomyUI() {
    this.coinBalanceDisplay.textContent = this.coins;
    this.shopCoinBalance.textContent = this.coins;
    localStorage.setItem('jigsaw_coins', String(this.coins));

    // Update inventory counts
    const magnetEl = document.getElementById('count-magnet');
    const cornersEl = document.getElementById('count-corners');
    const freezeEl = document.getElementById('count-freeze');
    const doublecoinEl = document.getElementById('count-doublecoin');

    if (magnetEl) magnetEl.textContent = this.inventory.magnet || 0;
    if (cornersEl) cornersEl.textContent = this.inventory.corners || 0;
    if (freezeEl) freezeEl.textContent = this.inventory.freeze || 0;
    if (doublecoinEl) doublecoinEl.textContent = this.inventory.doublecoin || 0;

    localStorage.setItem('jigsaw_inventory', JSON.stringify(this.inventory));
  }

  addCoins(amount) {
    this.coins += amount;
    this.sound.playCoin();
    this.updateEconomyUI();
  }

  applyEquippedFrameTheme() {
    this.boardOuterWrapper.className = `board-outer-wrapper theme-frame-${this.activeTheme}`;
  }

  renderShop(currentTab = 'frames') {
    const container = document.getElementById('shop-items-container');
    container.innerHTML = '';

    if (currentTab === 'frames') {
      const frames = [
        { id: 'default', name: '經典墨藍框', desc: '純淨深邃的高雅黑藍金屬框', price: 0, icon: '🏛️' },
        { id: 'gold', name: '曜石金輝框', desc: '奢華曜石黑配以純金流光包邊', price: 150, icon: '👑' },
        { id: 'wood', name: '復古沉香木框', desc: '溫潤大器、木紋細膩的典雅實木框', price: 150, icon: '🌲' },
        { id: 'neon', name: '賽博霓虹框', desc: '流光溢彩、自帶未來呼吸光暈', price: 200, icon: '🌌' }
      ];

      frames.forEach(f => {
        const isUnlocked = this.unlockedThemes.includes(f.id);
        const isEquipped = this.activeTheme === f.id;

        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
          <div class="shop-item-icon-box">${f.icon}</div>
          <h4 class="shop-item-title">${f.name}</h4>
          <p class="shop-item-desc">${f.desc}</p>
          <div class="shop-item-bottom">
            <span class="shop-price-tag">${f.price === 0 ? '免費' : `🪙 ${f.price}`}</span>
            ${isEquipped 
              ? '<button class="btn-equipped" disabled>裝備中 ✓</button>' 
              : isUnlocked 
                ? `<button class="btn-equip" data-equip-frame="${f.id}">更換裝備</button>` 
                : `<button class="btn-buy" data-buy-frame="${f.id}" data-price="${f.price}">兌換解鎖</button>`}
          </div>
        `;
        container.appendChild(card);
      });
    } else if (currentTab === 'items') {
      const items = [
        { id: 'magnet', name: '智能磁吸石', desc: '自動找出並吸附 2 塊能互相拼合的相鄰碎片！', price: 60, icon: '🧲', count: this.inventory.magnet || 0 },
        { id: 'corners', name: '四角定位石', desc: '實體拼圖技巧精髓！一鍵找出並吸附全部 4 個最外層角落基礎碎片！', price: 80, icon: '🧩', count: this.inventory.corners || 0 },
        { id: 'freeze', name: '時間凍結沙漏', desc: '暫停計時 45 秒，不消耗時間自由觀察拼合，衝刺三星紀錄！', price: 50, icon: '⏳', count: this.inventory.freeze || 0 },
        { id: 'doublecoin', name: '幸運雙倍符', desc: '本局通關獲得 200% 雙倍金幣收益！高難度使用效益最高！', price: 70, icon: '💰', count: this.inventory.doublecoin || 0 }
      ];

      items.forEach(it => {
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
          <div class="shop-item-icon-box">${it.icon}</div>
          <h4 class="shop-item-title">${it.name}</h4>
          <p class="shop-item-desc">${it.desc}（目前持有：<strong>${it.count}</strong> 個）</p>
          <div class="shop-item-bottom">
            <span class="shop-price-tag">🪙 ${it.price}</span>
            <button class="btn-buy" data-buy-item="${it.id}" data-price="${it.price}">購買 1 個</button>
          </div>
        `;
        container.appendChild(card);
      });
    } else if (currentTab === 'puzzles') {
      const secretPuzzles = PUZZLE_CATALOG.filter(p => p.category === 'secret').sort((a, b) => (a.price || 0) - (b.price || 0));
      secretPuzzles.forEach(p => {
        const isUnlocked = this.unlockedPuzzles.includes(p.id);

        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
          <div class="shop-item-img-box" style="position:relative;">
            <img src="${p.src}" alt="${p.title}" class="shop-item-img">
            <span style="position:absolute;top:6px;right:6px;background:${p.tierColor || 'rgba(0,0,0,0.6)'};color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:9999px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.4);">${p.tier || '秘境'}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:2px;">
            <h4 class="shop-item-title">${p.title}</h4>
            <span style="font-size:0.72rem;color:var(--text-dim);white-space:nowrap;margin-left:6px;">${p.location}</span>
          </div>
          <p class="shop-item-desc">${p.desc}</p>
          <div class="shop-item-bottom">
            <span class="shop-price-tag">🪙 ${p.price}</span>
            ${isUnlocked 
              ? `<button class="btn-equipped" data-play-secret="${p.id}">已擁有 · 開始玩 ➔</button>` 
              : `<button class="btn-buy" data-buy-secret="${p.id}" data-price="${p.price}">兌換圖庫</button>`}
          </div>
        `;
        container.appendChild(card);
      });
    }

    // Attach Shop Event Listeners
    container.querySelectorAll('[data-buy-frame]').forEach(btn => {
      btn.addEventListener('click', () => {
        const price = parseInt(btn.dataset.price, 10);
        const fId = btn.dataset.buyFrame;
        if (this.coins >= price) {
          this.coins -= price;
          this.unlockedThemes.push(fId);
          this.activeTheme = fId;
          localStorage.setItem('jigsaw_unlocked_themes', JSON.stringify(this.unlockedThemes));
          localStorage.setItem('jigsaw_active_frame', fId);
          this.applyEquippedFrameTheme();
          this.sound.playCoin();
          this.updateEconomyUI();
          this.renderShop('frames');
        } else {
          alert(`金幣不足！需要 🪙 ${price} 金幣，多通關拼圖即可賺取。`);
        }
      });
    });

    container.querySelectorAll('[data-equip-frame]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.dataset.equipFrame;
        this.activeTheme = fId;
        localStorage.setItem('jigsaw_active_frame', fId);
        this.applyEquippedFrameTheme();
        this.sound.playPick();
        this.renderShop('frames');
      });
    });

    container.querySelectorAll('[data-buy-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const price = parseInt(btn.dataset.price, 10);
        const itemId = btn.dataset.buyItem;
        if (this.coins >= price) {
          this.coins -= price;
          this.inventory[itemId] = (this.inventory[itemId] || 0) + 1;
          this.sound.playCoin();
          this.updateEconomyUI();
          this.renderShop('items');
        } else {
          alert(`金幣不足！需要 🪙 ${price} 金幣。`);
        }
      });
    });

    container.querySelectorAll('[data-buy-secret]').forEach(btn => {
      btn.addEventListener('click', () => {
        const price = parseInt(btn.dataset.price, 10);
        const pId = btn.dataset.buySecret;
        if (this.coins >= price) {
          this.coins -= price;
          this.unlockedPuzzles.push(pId);
          localStorage.setItem('jigsaw_unlocked_puzzles', JSON.stringify(this.unlockedPuzzles));
          this.sound.playCoin();
          this.updateEconomyUI();
          this.renderShop('puzzles');
        } else {
          alert(`金幣不足！需要 🪙 ${price} 金幣。`);
        }
      });
    });

    container.querySelectorAll('[data-play-secret]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.playSecret;
        const target = PUZZLE_CATALOG.find(x => x.id === pId);
        if (target) {
          this.shopModal.classList.add('hidden');
          this.openPieceSelectionModal(target);
        }
      });
    });
  }

  // ============================================================================
  // Distinct Power-up In-game Items (與內建基礎操作完全區隔)
  // ============================================================================
  useMagnetItem() {
    if ((this.inventory.magnet || 0) <= 0) {
      alert('智能磁吸石已用盡！前往商城使用金幣兌換。');
      this.shopModal.classList.remove('hidden');
      this.renderShop('items');
      return;
    }
    const unsnapped = this.pieces.filter(p => !p.isSnapped);
    if (unsnapped.length === 0) return;

    this.inventory.magnet--;
    this.updateEconomyUI();
    this.sound.playPick();

    // Auto-snap 2 pieces
    const toSnap = unsnapped.slice(0, 2);
    const boardRect = this.boardFrame.getBoundingClientRect();
    toSnap.forEach((p, idx) => {
      setTimeout(() => {
        p.element.classList.add('hint-highlight');
        this.snapPieceIntoPlace(p, boardRect);
        this.saveGameProgress();
      }, idx * 280);
    });
  }

  useCornerStoneItem() {
    if ((this.inventory.corners || 0) <= 0) {
      alert('四角定位石已用盡！前往商城使用金幣兌換。');
      this.shopModal.classList.remove('hidden');
      this.renderShop('items');
      return;
    }
    const cols = this.gridCols;
    const rows = this.gridRows;
    const cornerPieces = this.pieces.filter(p => {
      return !p.isSnapped && (
        (p.row === 0 && p.col === 0) ||
        (p.row === 0 && p.col === cols - 1) ||
        (p.row === rows - 1 && p.col === 0) ||
        (p.row === rows - 1 && p.col === cols - 1)
      );
    });

    if (cornerPieces.length === 0) {
      alert('四個角落的基礎碎片已經全部拼好了！');
      return;
    }

    this.inventory.corners--;
    this.updateEconomyUI();
    this.sound.playWin();

    const boardRect = this.boardFrame.getBoundingClientRect();
    cornerPieces.forEach((p, idx) => {
      setTimeout(() => {
        p.element.classList.add('hint-highlight');
        this.snapPieceIntoPlace(p, boardRect);
        this.saveGameProgress();
      }, idx * 240);
    });
  }

  useTimeFreezeItem() {
    if ((this.inventory.freeze || 0) <= 0) {
      alert('時間凍結沙漏已用盡！前往商城使用金幣兌換。');
      this.shopModal.classList.remove('hidden');
      this.renderShop('items');
      return;
    }
    if (this.isTimerFrozen) {
      alert('時間凍結已在生效中！');
      return;
    }

    this.inventory.freeze--;
    this.updateEconomyUI();
    this.sound.playPick();

    this.isTimerFrozen = true;
    this.timerDisplay.classList.add('timer-frozen');

    let remainSec = 45;
    const freezeNotice = document.createElement('div');
    freezeNotice.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(2,132,199,0.92);color:#fff;padding:8px 24px;border-radius:9999px;font-weight:700;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,0.5);border:1px solid #38bdf8;';
    freezeNotice.textContent = `❄️ 時間凍結生效中：45 秒`;
    document.body.appendChild(freezeNotice);

    const freezeCountdown = setInterval(() => {
      remainSec--;
      freezeNotice.textContent = `❄️ 時間凍結生效中：${remainSec} 秒`;
      if (remainSec <= 0) {
        clearInterval(freezeCountdown);
        this.isTimerFrozen = false;
        this.timerDisplay.classList.remove('timer-frozen');
        freezeNotice.remove();
      }
    }, 1000);
  }

  useDoubleCoinItem() {
    if ((this.inventory.doublecoin || 0) <= 0) {
      alert('幸運雙倍符已用盡！前往商城使用金幣兌換。');
      this.shopModal.classList.remove('hidden');
      this.renderShop('items');
      return;
    }
    if (this.isDoubleCoinsActive) {
      alert('雙倍金幣加成已在本局生效中！');
      return;
    }

    this.inventory.doublecoin--;
    this.updateEconomyUI();
    this.sound.playCoin();

    this.isDoubleCoinsActive = true;
    const btn = document.getElementById('btn-use-doublecoin');
    if (btn) btn.classList.add('is-active');
    this.coinBalanceDisplay.classList.add('coin-doubled');

    const notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(245,158,11,0.95);color:#0f172a;padding:8px 24px;border-radius:9999px;font-weight:800;z-index:9999;box-shadow:0 4px 18px rgba(245,158,11,0.5);';
    notice.textContent = `💰 雙倍金幣卡已生效！本局通關收益翻倍 (200%)！`;
    document.body.appendChild(notice);

    setTimeout(() => notice.remove(), 3500);
  }

  // ============================================================================
  // In-Progress Auto-Save & Resume Engine (未完成預留到下次)
  // ============================================================================
  saveGameProgress() {
    if (this.snappedCount === 0 || this.snappedCount >= this.pieces.length) return;

    const snapshot = {
      puzzleItem: this.currentImageItem,
      targetPieceCount: this.targetPieceCount,
      gridCols: this.gridCols,
      gridRows: this.gridRows,
      shapeStyle: this.shapeStyle,
      boardZoom: this.boardZoom,
      timerSeconds: this.timerSeconds,
      moves: this.moves,
      hEdges: this.hEdges,
      vEdges: this.vEdges,
      piecesState: this.pieces.map(p => ({
        id: p.id,
        isSnapped: p.isSnapped,
        currentX: p.currentX,
        currentY: p.currentY
      })),
      snappedCount: this.snappedCount,
      totalPieces: this.totalPieces,
      savedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    };

    localStorage.setItem('jigsaw_saved_progress', JSON.stringify(snapshot));
    this.showResumeBannerPrompt(snapshot);
  }

  clearGameProgress() {
    localStorage.removeItem('jigsaw_saved_progress');
    this.resumeBanner.classList.add('hidden');
  }

  showResumeBannerPrompt(saved) {
    document.getElementById('resume-puzzle-title').textContent = saved.puzzleItem.title;
    document.getElementById('resume-progress-count').textContent = `${saved.snappedCount}/${saved.totalPieces}`;
    this.resumeBanner.classList.remove('hidden');
  }

  checkAndPromptResume() {
    const raw = localStorage.getItem('jigsaw_saved_progress');
    if (!raw) return false;
    try {
      const saved = JSON.parse(raw);
      if (saved && saved.puzzleItem && saved.piecesState && saved.snappedCount < saved.totalPieces) {
        this.showResumeBannerPrompt(saved);
        return false;
      }
    } catch (e) {
      console.warn('Failed to parse saved progress', e);
    }
    return false;
  }

  resumeSavedGame() {
    const raw = localStorage.getItem('jigsaw_saved_progress');
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      this.resumeBanner.classList.add('hidden');

      this.currentImageItem = saved.puzzleItem;
      this.targetPieceCount = saved.targetPieceCount;
      this.gridCols = saved.gridCols;
      this.gridRows = saved.gridRows;
      this.shapeStyle = saved.shapeStyle;
      this.boardZoom = saved.boardZoom || 1;
      this.timerSeconds = saved.timerSeconds || 0;
      this.moves = saved.moves || 0;

      this.currentThemeThumb.src = this.currentImageItem.src;
      this.currentThemeTitle.textContent = this.currentImageItem.title;
      this.currentPieceCountBadge.textContent = `${this.gridCols * this.gridRows}片`;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.currentImageItem.src;
      img.onload = () => {
        this.loadedImage = img;
        this.computeBoardDimensions();
        this.drawBoardBackground();

        // Restore exact edges matrix
        this.hEdges = saved.hEdges;
        this.vEdges = saved.vEdges;

        this.boardSnappedLayer.innerHTML = '';
        this.trayInner.innerHTML = '';
        this.pieces = [];

        // Generate pieces with saved edges
        this.generatePiecesFromEdges(saved.piecesState);
        this.snappedCount = saved.snappedCount;
        this.updateStatsUI();

        // Resume Timer
        this.startTimer();
        this.hasStarted = true;
        this.sound.playWin();
      };
    } catch (e) {
      console.error('Failed to resume game', e);
      this.clearGameProgress();
      this.loadCurrentPuzzle();
    }
  }

  // ============================================================================
  // Piece Selection on Entry (片數只能在一點進圖片時選擇！)
  // ============================================================================
  openPieceSelectionModal(item) {
    this.pendingSelectImage = item;
    this.pendingPieceCount = 50; // default 50

    document.getElementById('piece-modal-preview-img').src = item.src;
    document.getElementById('piece-modal-image-title').textContent = item.title;
    document.getElementById('piece-modal-image-location').textContent = item.location;

    // Reset cards active state
    document.querySelectorAll('.piece-option-card').forEach(c => {
      c.classList.toggle('active', parseInt(c.dataset.pieces, 10) === 50);
    });
    document.getElementById('custom-piece-field').value = '';

    this.pieceSelectionModal.classList.remove('hidden');
  }

  confirmPieceSelection() {
    if (!this.pendingSelectImage) return;

    const customInput = document.getElementById('custom-piece-field').value;
    if (customInput && parseInt(customInput, 10) >= 12 && parseInt(customInput, 10) <= 600) {
      this.targetPieceCount = parseInt(customInput, 10);
    } else {
      this.targetPieceCount = this.pendingPieceCount;
    }

    this.currentImageItem = this.pendingSelectImage;
    this.currentThemeThumb.src = this.currentImageItem.src;
    this.currentThemeTitle.textContent = this.currentImageItem.title;

    this.pieceSelectionModal.classList.add('hidden');
    this.clearGameProgress(); // Start fresh round
    this.loadCurrentPuzzle();
  }

  // ============================================================================
  // Daily Special Setup
  // ============================================================================
  calculateDailySpecial() {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    const seed = (y * 365 + m * 31 + d) % PUZZLE_CATALOG.length;
    return PUZZLE_CATALOG[seed];
  }

  initDailyBanner() {
    const today = new Date();
    const dateFormatted = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    document.getElementById('daily-date-label').textContent = dateFormatted;
    document.getElementById('daily-title-label').textContent = `今日推薦：${this.dailyItem.title}`;

    const dateKey = `daily_solved_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
    const isSolved = localStorage.getItem(dateKey);
    const badge = document.getElementById('daily-status-badge');
    if (isSolved) {
      badge.textContent = '👑 今日已通關';
      badge.style.color = '#fbbf24';
    } else {
      badge.textContent = '🔥 每日挑戰';
    }
  }

  // ============================================================================
  // Gallery Modal
  // ============================================================================
  renderGalleryModal(filterCat = 'all') {
    this.galleryGrid.innerHTML = '';

    const items = PUZZLE_CATALOG.filter(item => {
      if (filterCat === 'all') return true;
      if (filterCat === 'daily') return item.id === this.dailyItem.id;
      return item.category === filterCat;
    });

    items.forEach(item => {
      const isDaily = item.id === this.dailyItem.id;
      const isSelected = item.id === this.currentImageItem.id;
      const isSecret = item.category === 'secret';
      const isUnlocked = isSecret ? this.unlockedPuzzles.includes(item.id) : true;

      const card = document.createElement('div');
      card.className = `gallery-card ${isSelected ? 'active-selected' : ''}`;
      card.innerHTML = `
        <div class="card-thumb-wrapper">
          <img src="${item.src}" alt="${item.title}" class="card-thumb-img" loading="lazy">
          ${isDaily ? '<span class="card-badge-special">🌟 今日特別</span>' : ''}
          ${isSelected ? '<span class="card-active-check">✓ 當前遊玩</span>' : ''}
          ${!isUnlocked ? `<span class="card-badge-special" style="background:${item.tierColor || '#ef4444'};color:#fff;">🔒 🪙 ${item.price} 解鎖</span>` : ''}
        </div>
        <div class="card-info">
          <h4 class="card-title">${item.title}</h4>
          <span class="card-meta">${item.location}</span>
          <div class="card-footer">
            <span class="card-cat-tag">${item.categoryName}</span>
            <button class="card-play-btn">${isUnlocked ? '選擇片數 ➔' : `🪙 ${item.price} 前往兌換`}</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          this.galleryModal.classList.add('hidden');
          this.shopModal.classList.remove('hidden');
          this.renderShop('puzzles');
          return;
        }
        this.galleryModal.classList.add('hidden');
        this.openPieceSelectionModal(item);
      });

      this.galleryGrid.appendChild(card);
    });
  }

  // ============================================================================
  // Dimensions & Grid Slicing
  // ============================================================================
  computeBoardDimensions() {
    if (!this.loadedImage) return;
    const imgRatio = this.loadedImage.width / this.loadedImage.height;
    const stageWidth = this.trayContainer.parentElement.clientWidth;
    const maxAvailable = stageWidth > 960 ? Math.min(580, stageWidth * 0.45) : Math.min(480, stageWidth - 48);

    this.boardWidth = Math.round(maxAvailable * this.boardZoom);
    this.boardHeight = Math.round(this.boardWidth / imgRatio);

    document.documentElement.style.setProperty('--board-base-width', `${this.boardWidth}px`);
    document.documentElement.style.setProperty('--board-base-height', `${this.boardHeight}px`);

    this.boardOuterWrapper.style.width = `${this.boardWidth + 24}px`;
    this.boardOuterWrapper.style.height = `${this.boardHeight + 24}px`;
  }

  computeGridDimensions() {
    const ratio = this.loadedImage ? (this.loadedImage.width / this.loadedImage.height) : (4 / 3);
    const target = this.targetPieceCount;

    let cols = Math.max(2, Math.round(Math.sqrt(target * ratio)));
    let rows = Math.max(2, Math.round(target / cols));

    this.gridCols = cols;
    this.gridRows = rows;
    this.totalPieces = cols * rows;
    this.currentPieceCountBadge.textContent = `${this.totalPieces}片`;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.computeBoardDimensions();
      this.drawBoardBackground();
      this.recalculateTargetCoordinates();
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-sound');
    soundBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      soundBtn.querySelector('.icon-speaker').textContent = this.sound.enabled ? '🔊' : '🔇';
    });

    // Restart button
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.sound.playShuffle();
      this.clearGameProgress();
      this.initGameRound();
    });

    // Shop Button & Pill
    const openShopHandler = () => {
      this.renderShop('frames');
      this.shopModal.classList.remove('hidden');
    };
    document.getElementById('btn-open-shop').addEventListener('click', openShopHandler);
    document.getElementById('btn-open-shop-pill').addEventListener('click', openShopHandler);
    document.getElementById('btn-close-shop').addEventListener('click', () => this.shopModal.classList.add('hidden'));
    document.getElementById('btn-close-shop-2').addEventListener('click', () => this.shopModal.classList.add('hidden'));

    // Shop navigation tabs
    document.querySelectorAll('.shop-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderShop(btn.dataset.tab);
      });
    });

    // In-game Power-up Items (4 Distinct Non-Redundant Consumables)
    const magnetBtn = document.getElementById('btn-use-magnet');
    if (magnetBtn) magnetBtn.addEventListener('click', () => this.useMagnetItem());

    const cornersBtn = document.getElementById('btn-use-corners');
    if (cornersBtn) cornersBtn.addEventListener('click', () => this.useCornerStoneItem());

    const freezeBtn = document.getElementById('btn-use-freeze');
    if (freezeBtn) freezeBtn.addEventListener('click', () => this.useTimeFreezeItem());

    const doublecoinBtn = document.getElementById('btn-use-doublecoin');
    if (doublecoinBtn) doublecoinBtn.addEventListener('click', () => this.useDoubleCoinItem());

    // Resume Banner Actions
    document.getElementById('btn-resume-game').addEventListener('click', () => this.resumeSavedGame());
    document.getElementById('btn-discard-resume').addEventListener('click', () => this.clearGameProgress());

    // Gallery Modal open
    document.getElementById('btn-open-gallery').addEventListener('click', () => {
      this.renderGalleryModal();
      this.galleryModal.classList.remove('hidden');
    });
    document.getElementById('current-theme-pill').addEventListener('click', () => {
      this.renderGalleryModal();
      this.galleryModal.classList.remove('hidden');
    });
    document.getElementById('btn-close-gallery').addEventListener('click', () => this.galleryModal.classList.add('hidden'));
    document.getElementById('btn-close-gallery-2').addEventListener('click', () => this.galleryModal.classList.add('hidden'));

    // Gallery Category filtering tabs
    document.querySelectorAll('.gallery-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderGalleryModal(btn.dataset.cat);
      });
    });

    // Daily Special triggers (Opens piece count selector!)
    const triggerDaily = () => {
      this.openPieceSelectionModal(this.dailyItem);
    };
    document.getElementById('btn-daily-special').addEventListener('click', triggerDaily);
    document.getElementById('btn-play-daily').addEventListener('click', triggerDaily);

    // Piece Selection Modal Actions
    document.querySelectorAll('.piece-option-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.piece-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.pendingPieceCount = parseInt(card.dataset.pieces, 10);
        document.getElementById('custom-piece-field').value = '';
      });
    });

    document.getElementById('custom-piece-field').addEventListener('input', () => {
      document.querySelectorAll('.piece-option-card').forEach(c => c.classList.remove('active'));
    });

    document.getElementById('btn-confirm-start-puzzle').addEventListener('click', () => this.confirmPieceSelection());
    document.getElementById('btn-close-piece-modal').addEventListener('click', () => this.pieceSelectionModal.classList.add('hidden'));
    document.getElementById('btn-cancel-piece-select').addEventListener('click', () => {
      this.pieceSelectionModal.classList.add('hidden');
      this.galleryModal.classList.remove('hidden');
    });

    // Custom upload buttons & file input
    const fileInput = document.getElementById('file-input');
    const uploadHandler = () => fileInput.click();
    document.getElementById('btn-custom-upload').addEventListener('click', uploadHandler);
    document.getElementById('btn-gallery-upload').addEventListener('click', () => {
      this.galleryModal.classList.add('hidden');
      uploadHandler();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const customItem = {
          id: 'custom_' + Date.now(),
          title: file.name.replace(/\.[^/.]+$/, '') || '個人自訂相片',
          location: '本地自訂相片',
          category: 'custom',
          categoryName: '📸 個人自訂',
          src: event.target.result,
          desc: '使用者自行上傳的珍貴相片拼圖。'
        };
        this.openPieceSelectionModal(customItem);
      };
      reader.readAsDataURL(file);
    });

    // Shape style buttons (Jigsaw vs Tile)
    document.querySelectorAll('#shape-style-selector .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#shape-style-selector .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.shapeStyle = btn.dataset.shape;
        this.initGameRound();
      });
    });

    // Board Zoom selector (1x, 1.25x, 1.5x)
    document.querySelectorAll('#board-zoom-selector .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#board-zoom-selector .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.boardZoom = parseFloat(btn.dataset.zoom);
        this.computeBoardDimensions();
        this.drawBoardBackground();
        this.recalculateTargetCoordinates();
      });
    });

    // Ghost slider
    const ghostSlider = document.getElementById('ghost-opacity-slider');
    const ghostValDisplay = document.getElementById('ghost-opacity-val');
    ghostSlider.addEventListener('input', (e) => {
      this.ghostOpacity = parseInt(e.target.value, 10) / 100;
      ghostValDisplay.textContent = `${e.target.value}%`;
      this.drawBoardBackground();
    });

    // Toggle ghost button
    const toggleGhostBtn = document.getElementById('btn-toggle-ghost');
    toggleGhostBtn.addEventListener('click', () => {
      this.isGhostVisible = !this.isGhostVisible;
      toggleGhostBtn.classList.toggle('active', this.isGhostVisible);
      this.drawBoardBackground();
    });

    // Tray table helper buttons (Free ergonomic table layout tools)
    const recallBtn = document.getElementById('btn-recall-pieces');
    if (recallBtn) {
      recallBtn.addEventListener('click', () => {
        this.sound.playShuffle();
        this.alignTrayPieces();
      });
    }

    document.getElementById('btn-align-tray').addEventListener('click', () => {
      this.sound.playShuffle();
      this.alignTrayPieces();
    });

    document.getElementById('btn-scatter-tray').addEventListener('click', () => {
      this.sound.playShuffle();
      this.scatterTrayPieces();
    });

    // Original Image Preview Modal
    const previewBtn = document.getElementById('btn-preview-modal');
    previewBtn.addEventListener('click', () => {
      this.previewModalImg.src = this.currentImageItem.src;
      this.previewModal.classList.remove('hidden');
    });
    document.getElementById('btn-close-preview').addEventListener('click', () => this.previewModal.classList.add('hidden'));
    document.getElementById('btn-close-preview-2').addEventListener('click', () => this.previewModal.classList.add('hidden'));

    // Victory Modal Buttons
    document.getElementById('btn-play-again').addEventListener('click', () => {
      this.victoryModal.classList.add('hidden');
      this.clearGameProgress();
      this.initGameRound();
    });

    document.getElementById('btn-next-puzzle').addEventListener('click', () => {
      this.victoryModal.classList.add('hidden');
      this.renderGalleryModal();
      this.galleryModal.classList.remove('hidden');
    });

    document.getElementById('btn-victory-shop').addEventListener('click', () => {
      this.victoryModal.classList.add('hidden');
      this.renderShop('frames');
      this.shopModal.classList.remove('hidden');
    });

    // Global drag pointer handlers
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    // Keyboard ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.galleryModal.classList.add('hidden');
        this.previewModal.classList.add('hidden');
        this.victoryModal.classList.add('hidden');
        this.pieceSelectionModal.classList.add('hidden');
        this.shopModal.classList.add('hidden');
      }
    });
  }

  // Load natural image asset
  loadCurrentPuzzle() {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.currentImageItem.src;
    img.onload = () => {
      this.loadedImage = img;
      this.previewModalImg.src = this.currentImageItem.src;
      this.computeBoardDimensions();
      this.computeGridDimensions();
      this.initGameRound();
    };
    img.onerror = () => {
      console.warn('Failed to load image, creating fallback gradient.');
      this.createFallbackImage();
    };
  }

  createFallbackImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1200, 900);
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(0.5, '#0ea5e9');
    grad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 900);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => {
      this.loadedImage = img;
      this.computeBoardDimensions();
      this.computeGridDimensions();
      this.initGameRound();
    };
  }

  // ============================================================================
  // Puzzle Generation & Slicing
  // ============================================================================
  initGameRound() {
    this.stopTimer();
    this.resetTimer();
    this.moves = 0;
    this.snappedCount = 0;
    this.hasStarted = false;
    this.isTimerFrozen = false;
    this.isDoubleCoinsActive = false;

    const doubleBtn = document.getElementById('btn-use-doublecoin');
    if (doubleBtn) doubleBtn.classList.remove('is-active');
    if (this.coinBalanceDisplay) this.coinBalanceDisplay.classList.remove('coin-doubled');
    if (this.timerDisplay) this.timerDisplay.classList.remove('timer-frozen');

    this.computeBoardDimensions();
    this.computeGridDimensions();
    this.updateStatsUI();

    this.boardGlow.classList.remove('completed');
    this.boardSnappedLayer.innerHTML = '';
    this.trayInner.innerHTML = '';

    this.drawBoardBackground();
    this.generatePieces();
    this.alignTrayPieces();
  }

  // Generate random edges & cut piece canvases
  generatePieces() {
    const cols = this.gridCols;
    const rows = this.gridRows;

    // Random horizontal edges
    this.hEdges = [];
    for (let r = 0; r < rows - 1; r++) {
      this.hEdges[r] = [];
      for (let c = 0; c < cols; c++) {
        this.hEdges[r][c] = Math.random() < 0.5 ? 1 : -1;
      }
    }

    // Random vertical edges
    this.vEdges = [];
    for (let r = 0; r < rows; r++) {
      this.vEdges[r] = [];
      for (let c = 0; c < cols - 1; c++) {
        this.vEdges[r][c] = Math.random() < 0.5 ? 1 : -1;
      }
    }

    this.buildPieceElements();
  }

  // Generate from saved progress
  generatePiecesFromEdges(savedStates) {
    this.buildPieceElements();

    const boardRect = this.boardFrame.getBoundingClientRect();
    this.pieces.forEach((p, idx) => {
      const state = savedStates.find(s => s.id === p.id);
      if (state && state.isSnapped) {
        p.isSnapped = true;
        p.element.classList.add('snapped');
        this.boardSnappedLayer.appendChild(p.element);
        p.element.style.left = `${p.targetX}px`;
        p.element.style.top = `${p.targetY}px`;
      } else if (state && state.currentX !== undefined) {
        p.currentX = state.currentX;
        p.currentY = state.currentY;
        p.element.style.left = `${p.currentX}px`;
        p.element.style.top = `${p.currentY}px`;
      }
    });
  }

  buildPieceElements() {
    this.pieces = [];
    const cols = this.gridCols;
    const rows = this.gridRows;
    const pieceW = this.boardWidth / cols;
    const pieceH = this.boardHeight / rows;
    const tabSize = this.shapeStyle === 'jigsaw' ? Math.round(Math.min(pieceW, pieceH) * 0.22) : 0;

    const img = this.loadedImage;
    const srcStepX = img.width / cols;
    const srcStepY = img.height / rows;

    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const edges = {
          top: r === 0 ? 0 : -this.hEdges[r - 1][c],
          right: c === cols - 1 ? 0 : this.vEdges[r][c],
          bottom: r === rows - 1 ? 0 : this.hEdges[r][c],
          left: c === 0 ? 0 : -this.vEdges[r][c - 1]
        };

        const isEdge = (r === 0 || r === rows - 1 || c === 0 || c === cols - 1);

        const canvas = document.createElement('canvas');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const canvasW = pieceW + tabSize * 2;
        const canvasH = pieceH + tabSize * 2;

        canvas.width = Math.round(canvasW * dpr);
        canvas.height = Math.round(canvasH * dpr);
        canvas.style.width = `${canvasW}px`;
        canvas.style.height = `${canvasH}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        this.drawPiecePath(ctx, tabSize, tabSize, pieceW, pieceH, edges);
        ctx.save();
        ctx.clip();

        const tabRatioX = tabSize / pieceW;
        const tabRatioY = tabSize / pieceH;
        const srcCropX = (c - tabRatioX) * srcStepX;
        const srcCropY = (r - tabRatioY) * srcStepY;
        const srcCropW = srcStepX * (1 + tabRatioX * 2);
        const srcCropH = srcStepY * (1 + tabRatioY * 2);

        ctx.drawImage(img, srcCropX, srcCropY, srcCropW, srcCropH, 0, 0, canvasW, canvasH);
        this.drawPieceBevel(ctx, tabSize, tabSize, pieceW, pieceH, edges);
        ctx.restore();

        // Edge stroke
        ctx.save();
        this.drawPiecePath(ctx, tabSize, tabSize, pieceW, pieceH, edges);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.stroke();
        ctx.restore();

        // Piece DOM wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'puzzle-piece';
        wrapper.dataset.id = id;
        wrapper.dataset.row = r;
        wrapper.dataset.col = c;
        wrapper.dataset.isEdge = isEdge ? 'true' : 'false';
        wrapper.style.width = `${canvasW}px`;
        wrapper.style.height = `${canvasH}px`;
        wrapper.appendChild(canvas);

        const targetX = c * pieceW - tabSize;
        const targetY = r * pieceH - tabSize;

        const pieceObj = {
          id,
          row: r,
          col: c,
          isEdge,
          edges,
          tabSize,
          pieceW,
          pieceH,
          canvasW,
          canvasH,
          canvas,
          element: wrapper,
          targetX,
          targetY,
          isSnapped: false,
          currentX: 0,
          currentY: 0
        };

        wrapper.addEventListener('pointerdown', (e) => this.onPiecePointerDown(e, pieceObj));
        this.pieces.push(pieceObj);
        this.trayInner.appendChild(wrapper);
        id++;
      }
    }
  }

  drawPiecePath(ctx, ox, oy, w, h, edges) {
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    this.drawEdgePath(ctx, ox, oy, ox + w, oy, edges.top);
    this.drawEdgePath(ctx, ox + w, oy, ox + w, oy + h, edges.right);
    this.drawEdgePath(ctx, ox + w, oy + h, ox, oy + h, edges.bottom);
    this.drawEdgePath(ctx, ox, oy + h, ox, oy, edges.left);
    ctx.closePath();
  }

  drawEdgePath(ctx, x0, y0, x1, y1, dir) {
    if (dir === 0 || this.shapeStyle === 'tile') {
      ctx.lineTo(x1, y1);
      return;
    }

    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy * dir;
    const ny = ux * dir;
    const h = len * 0.22;

    const pt = (t, s) => ({
      x: x0 + ux * (t * len) + nx * (s * h),
      y: y0 + uy * (t * len) + ny * (s * h)
    });

    const p1 = pt(0.35, 0);
    ctx.lineTo(p1.x, p1.y);

    const cp1 = pt(0.38, -0.08);
    const cp2 = pt(0.33, 0.42);
    const p2 = pt(0.32, 0.65);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);

    const cp3 = pt(0.31, 1.05);
    const cp4 = pt(0.42, 1.08);
    const p3 = pt(0.50, 1.08);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, p3.x, p3.y);

    const cp5 = pt(0.58, 1.08);
    const cp6 = pt(0.69, 1.05);
    const p4 = pt(0.68, 0.65);
    ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, p4.x, p4.y);

    const cp7 = pt(0.67, 0.42);
    const cp8 = pt(0.62, -0.08);
    const p5 = pt(0.65, 0);
    ctx.bezierCurveTo(cp7.x, cp7.y, cp8.x, cp8.y, p5.x, p5.y);

    ctx.lineTo(x1, y1);
  }

  drawPieceBevel(ctx, ox, oy, w, h, edges) {
    ctx.save();
    this.drawPiecePath(ctx, ox, oy, w, h, edges);
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.stroke();

    this.drawPiecePath(ctx, ox, oy, w, h, edges);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.stroke();
    ctx.restore();
  }

  // ============================================================================
  // 取消格線：純淨背景畫布（完全不繪製任何內部網格虛線）
  // ============================================================================
  drawBoardBackground() {
    const canvas = this.boardBgCanvas;
    const w = this.boardWidth;
    const h = this.boardHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Ghost Background Image (ONLY! NO GRID LINES DRAWN!)
    if (this.loadedImage && this.isGhostVisible && this.ghostOpacity > 0) {
      ctx.save();
      ctx.globalAlpha = this.ghostOpacity;
      ctx.drawImage(this.loadedImage, 0, 0, this.loadedImage.width, this.loadedImage.height, 0, 0, w, h);
      ctx.restore();
    }
    // Note: All dashed/solid cell grid lines are completely removed for pristine view!
  }

  // ============================================================================
  // Pointer & Drag and Drop (放錯不彈回 · Real Table Sandbox)
  // ============================================================================
  onPiecePointerDown(e, piece) {
    if (piece.isSnapped) return;
    e.preventDefault();

    if (!this.hasStarted) {
      this.startTimer();
      this.hasStarted = true;
    }

    this.sound.playPick();
    this.activeDragPiece = piece;

    const el = piece.element;
    const rect = el.getBoundingClientRect();

    this.dragPointerOffset.x = e.clientX - rect.left;
    this.dragPointerOffset.y = e.clientY - rect.top;

    this.dragLayer.appendChild(el);
    el.classList.add('is-dragging');
    el.style.left = `${e.clientX - this.dragPointerOffset.x}px`;
    el.style.top = `${e.clientY - this.dragPointerOffset.y}px`;
  }

  onPointerMove(e) {
    if (!this.activeDragPiece) return;
    const piece = this.activeDragPiece;
    const el = piece.element;

    const currentX = e.clientX - this.dragPointerOffset.x;
    const currentY = e.clientY - this.dragPointerOffset.y;

    el.style.left = `${currentX}px`;
    el.style.top = `${currentY}px`;
  }

  onPointerUp(e) {
    if (!this.activeDragPiece) return;
    const piece = this.activeDragPiece;
    const el = piece.element;
    this.activeDragPiece = null;
    el.classList.remove('is-dragging');

    this.moves++;
    this.movesDisplay.textContent = this.moves;

    const boardRect = this.boardFrame.getBoundingClientRect();
    const currentRect = el.getBoundingClientRect();

    const relativeX = currentRect.left - boardRect.left;
    const relativeY = currentRect.top - boardRect.top;

    const distX = relativeX - piece.targetX;
    const distY = relativeY - piece.targetY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const snapThreshold = Math.max(26, Math.min(piece.pieceW, piece.pieceH) * 0.45);

    if (distance <= snapThreshold) {
      // MAGNETIC SNAP SUCCESS!
      this.snapPieceIntoPlace(piece, boardRect);
    } else {
      // 放錯不自動彈回！留在玩家釋放的位置
      this.sound.playDrop();
      this.leavePieceOnTable(piece, currentRect);
    }

    // Auto-save in-progress state to local storage
    this.saveGameProgress();
  }

  snapPieceIntoPlace(piece, boardRect) {
    piece.isSnapped = true;
    this.snappedCount++;

    const el = piece.element;
    el.classList.add('snapped');
    el.classList.remove('edge-dimmed', 'hint-highlight');

    this.boardSnappedLayer.appendChild(el);
    el.style.left = `${piece.targetX}px`;
    el.style.top = `${piece.targetY}px`;

    this.sound.playSnap();
    const sparkX = boardRect.left + piece.targetX + piece.canvasW / 2;
    const sparkY = boardRect.top + piece.targetY + piece.canvasH / 2;
    this.fx.createSpark(sparkX, sparkY);

    this.updateStatsUI();

    if (this.snappedCount === this.pieces.length) {
      this.onPuzzleCompleted();
    }
  }

  leavePieceOnTable(piece, currentRect) {
    const el = piece.element;
    const trayRect = this.trayInner.getBoundingClientRect();

    const tableX = currentRect.left - trayRect.left;
    const tableY = currentRect.top - trayRect.top;

    this.trayInner.appendChild(el);
    el.style.left = `${tableX}px`;
    el.style.top = `${tableY}px`;

    piece.currentX = tableX;
    piece.currentY = tableY;
  }

  // ============================================================================
  // Tray Arrangement & Helpers
  // ============================================================================
  alignTrayPieces() {
    const unsnapped = this.pieces.filter(p => !p.isSnapped);
    if (unsnapped.length === 0) return;

    const trayRect = this.trayInner.getBoundingClientRect();
    const pad = 8;
    const availableW = Math.max(300, trayRect.width - pad * 2);

    const sampleW = unsnapped[0].canvasW;
    const sampleH = unsnapped[0].canvasH;
    const cols = Math.max(2, Math.floor(availableW / (sampleW * 0.95 + pad)));

    unsnapped.forEach((p, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const targetX = pad + col * (sampleW * 0.95 + pad);
      const targetY = pad + row * (sampleH * 0.95 + pad);

      p.element.style.transition = 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      p.element.style.left = `${targetX}px`;
      p.element.style.top = `${targetY}px`;
      p.currentX = targetX;
      p.currentY = targetY;

      setTimeout(() => { p.element.style.transition = ''; }, 320);
    });
  }

  scatterTrayPieces() {
    const unsnapped = this.pieces.filter(p => !p.isSnapped);
    const trayRect = this.trayInner.getBoundingClientRect();
    const pad = 10;

    unsnapped.forEach(p => {
      const maxW = Math.max(20, trayRect.width - p.canvasW - pad * 2);
      const maxH = Math.max(20, trayRect.height - p.canvasH - pad * 2);

      const randX = pad + Math.random() * maxW;
      const randY = pad + Math.random() * maxH;

      p.element.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      p.element.style.left = `${randX}px`;
      p.element.style.top = `${randY}px`;
      p.currentX = randX;
      p.currentY = randY;

      setTimeout(() => { p.element.style.transition = ''; }, 350);
    });
  }

  applyEdgeFilter() {
    this.pieces.forEach(p => {
      if (p.isSnapped) return;
      if (this.isEdgeFiltered && !p.isEdge) {
        p.element.classList.add('edge-dimmed');
      } else {
        p.element.classList.remove('edge-dimmed');
      }
    });
  }

  giveHint() {
    const unsnapped = this.pieces.filter(p => !p.isSnapped);
    if (unsnapped.length === 0) return;

    if (!this.hasStarted) {
      this.startTimer();
      this.hasStarted = true;
    }
    this.moves++;
    this.movesDisplay.textContent = this.moves;

    unsnapped.sort((a, b) => (b.isEdge ? 1 : 0) - (a.isEdge ? 1 : 0));
    const hintPiece = unsnapped[0];

    hintPiece.element.classList.add('hint-highlight');
    this.sound.playPick();

    const boardRect = this.boardFrame.getBoundingClientRect();
    setTimeout(() => {
      this.snapPieceIntoPlace(hintPiece, boardRect);
      this.saveGameProgress();
    }, 450);
  }

  recalculateTargetCoordinates() {
    const cols = this.gridCols;
    const rows = this.gridRows;
    const pieceW = this.boardWidth / cols;
    const pieceH = this.boardHeight / rows;
    const tabSize = this.shapeStyle === 'jigsaw' ? Math.round(Math.min(pieceW, pieceH) * 0.22) : 0;

    this.pieces.forEach(p => {
      p.targetX = p.col * pieceW - tabSize;
      p.targetY = p.row * pieceH - tabSize;
      if (p.isSnapped) {
        p.element.style.left = `${p.targetX}px`;
        p.element.style.top = `${p.targetY}px`;
      }
    });
  }

  // ============================================================================
  // Stats, Timer & Victory Rewards
  // ============================================================================
  updateStatsUI() {
    const total = this.pieces.length || this.totalPieces;
    this.progressDisplay.textContent = `${this.snappedCount} / ${total}`;
    this.movesDisplay.textContent = this.moves;
    const pct = total > 0 ? (this.snappedCount / total) * 100 : 0;
    this.progressBarFill.style.width = `${pct}%`;
  }

  startTimer(resetSeconds = false) {
    this.stopTimer();
    if (resetSeconds) {
      this.timerSeconds = 0;
    }
    this.timerInterval = setInterval(() => {
      if (this.isTimerFrozen) return;
      this.timerSeconds++;
      const mins = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
      const secs = String(this.timerSeconds % 60).padStart(2, '0');
      this.timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    this.timerSeconds = 0;
    this.timerDisplay.textContent = '00:00';
  }

  formatTime(totalSec) {
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  onPuzzleCompleted() {
    this.stopTimer();
    this.sound.playWin();
    this.fx.createConfetti();
    this.boardGlow.classList.add('completed');
    this.clearGameProgress(); // Clear auto-save

    // Calculate Coin Rewards
    let baseCoins = Math.round(this.totalPieces * 3.2);
    if (this.totalPieces <= 24) baseCoins = 60;
    else if (this.totalPieces <= 50) baseCoins = 150;
    else if (this.totalPieces <= 100) baseCoins = 350;
    else if (this.totalPieces <= 150) baseCoins = 550;
    else if (this.totalPieces <= 300) baseCoins = 1000;
    else if (this.totalPieces >= 400) baseCoins = 1500;

    let bonusCoins = 0;
    const today = new Date();
    const isDaily = this.currentImageItem.id === this.dailyItem.id;
    if (isDaily) {
      bonusCoins += 250;
      const dateKey = `daily_solved_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
      localStorage.setItem(dateKey, 'true');
      this.initDailyBanner();
    }

    let totalReward = baseCoins + bonusCoins;
    let bonusDescText = isDaily ? `包含通關金幣 +${baseCoins} + 每日挑戰加成 +${bonusCoins}！` : `包含難度片數獎勵 +${baseCoins} 金幣！`;

    if (this.isDoubleCoinsActive) {
      totalReward *= 2;
      bonusDescText += ` 💰 幸運雙倍符加成 x2！`;
      this.isDoubleCoinsActive = false;
      const doubleBtn = document.getElementById('btn-use-doublecoin');
      if (doubleBtn) doubleBtn.classList.remove('is-active');
      if (this.coinBalanceDisplay) this.coinBalanceDisplay.classList.remove('coin-doubled');
    }

    this.addCoins(totalReward);

    // Save best record
    const recordKey = `jigsaw_best_${this.currentImageItem.id}_${this.totalPieces}`;
    const prevBest = localStorage.getItem(recordKey);
    let bestTime = prevBest ? parseInt(prevBest, 10) : null;

    if (!bestTime || this.timerSeconds < bestTime) {
      bestTime = this.timerSeconds;
      localStorage.setItem(recordKey, String(bestTime));
    }

    // Populate Victory Modal
    document.getElementById('celebration-image-title').textContent = `${this.currentImageItem.title} · 完美復原！`;
    document.getElementById('vcoin-earned').textContent = `+${totalReward}`;
    document.getElementById('vcoin-bonus-desc').textContent = bonusDescText;
    document.getElementById('vstat-time').textContent = this.formatTime(this.timerSeconds);
    document.getElementById('vstat-moves').textContent = `${this.moves} 步`;
    document.getElementById('vstat-difficulty').textContent = `${this.totalPieces}片 (${this.gridCols}×${this.gridRows})`;
    document.getElementById('vstat-best').textContent = this.formatTime(bestTime);

    // Calculate Star Rating
    const total = this.pieces.length;
    let stars = 3;
    if (this.moves > total * 2.2 || this.timerSeconds > total * 10) stars = 2;
    if (this.moves > total * 3.5 || this.timerSeconds > total * 18) stars = 1;

    const starContainer = document.getElementById('victory-stars');
    starContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      span.className = `star ${i < stars ? 'filled' : ''}`;
      span.textContent = '★';
      starContainer.appendChild(span);
    }

    setTimeout(() => {
      this.victoryModal.classList.remove('hidden');
    }, 1200);
  }
}

// Bootstrap Game
window.addEventListener('DOMContentLoaded', () => {
  window.game = new JigsawGame();
});
