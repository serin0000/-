/**
 * STARLIGHT CINEMA 星空電影院 ｜ 官方核心互動邏輯
 * Features:
 *  - Canvas 互動式星空、流星雨與星塵軌跡特效
 *  - Mobile 390px 無障礙抽屜導覽與焦點管理 (Focus Trap)
 *  - 電影片單即時分類篩選與快速代入預約
 *  - 預約諮詢表單即時驗證 (WCAG ARIA 即時反饋)
 *  - 智慧動態金額試算與最快預約日期限制
 *  - 復古電影票根彈出視窗與剪貼簿複製
 *  - 無障礙降低動態支援 (prefers-reduced-motion)
 */

document.addEventListener("DOMContentLoaded", () => {
  initStarfieldCanvas();
  initNavigation();
  initMovieFilter();
  initBookingSystem();
  initBackToTop();
});

/* ==========================================================================
   01. Canvas 互動式星空畫布 (Starfield, Meteors & Cursor Stardust)
   ========================================================================== */
function initStarfieldCanvas() {
  const canvas = document.getElementById("canvas-starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;
  let width, height;
  let stars = [];
  let meteors = [];
  let cursorParticles = [];

  // 檢查使用者是否偏好減少動畫
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  // 調整畫布尺寸以適配高解析度螢幕 (DPI Retina)
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.parentElement.offsetHeight || window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initStars();
  }

  // 初始化恆星陣列 (隨機大小、微光週期與色彩)
  function initStars() {
    stars = [];
    // 依螢幕面積決定數量（PPT Slide 10: 手機端進一步降低粒子數量以保證效能）
    const isMobile = width < 768;
    const divisor = isMobile ? 5500 : 3600;
    const starCount = Math.floor((width * height) / divisor);
    const starColors = [
      "rgba(255, 255, 255,",   // 純白鑽石星
      "rgba(254, 240, 138,",   // 暖金星光
      "rgba(186, 230, 253,",   // 極光冰藍星
      "rgba(251, 207, 232,"    // 柔紫星光
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleAngle: Math.random() * Math.PI * 2
      });
    }
  }

  // 生成單顆流星 (Meteor)
  function spawnMeteor() {
    const startX = Math.random() * width * 1.2;
    const startY = Math.random() * (height * 0.4);
    const length = Math.random() * 90 + 70;
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // 大約 45 度劃過天際
    const speed = Math.random() * 6 + 7;

    meteors.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: length,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  let meteorTimer = 0;

  // 滑鼠移動時產生微光星塵 (僅限非觸控裝置)
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      if (Math.random() > 0.4) {
        cursorParticles.push({
          x: mouseX + (Math.random() * 10 - 5),
          y: mouseY + (Math.random() * 10 - 5),
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * -0.8 - 0.3,
          radius: Math.random() * 2 + 1,
          alpha: 0.9,
          decay: 0.03
        });
      }
    }
  });

  // 主繪製動畫迴圈
  function render(time) {
    ctx.clearRect(0, 0, width, height);

    // 1. 繪製恆星微光閃爍
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.twinkleAngle += star.twinkleSpeed;
      const alpha = star.baseAlpha + Math.sin(star.twinkleAngle) * 0.25;
      const currentAlpha = Math.max(0.1, Math.min(1, alpha));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${star.colorPrefix}${currentAlpha})`;
      ctx.fill();
    }

    // 2. 繪製流星雨
    meteorTimer++;
    if (meteorTimer > 180 && Math.random() < 0.03) {
      spawnMeteor();
      meteorTimer = 0;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.dx;
      m.y += m.dy;
      m.alpha -= m.decay;

      if (m.alpha <= 0 || m.x < -100 || m.x > width + 100 || m.y > height + 100) {
        meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
      const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

      const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 235, 150, ${m.alpha})`);
      gradient.addColorStop(0.3, `rgba(217, 249, 157, ${m.alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(56, 189, 248, 0)`);

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();

      // 流星頭部亮點
      ctx.beginPath();
      ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#fef08a";
      ctx.fill();
      ctx.shadowBlur = 0; // 重置光暈避免影響效能
    }

    // 3. 繪製星塵游標軌跡
    for (let i = cursorParticles.length - 1; i >= 0; i--) {
      const p = cursorParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        cursorParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254, 240, 138, ${p.alpha})`;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // 視窗分頁切換時暫停渲染，節省電力與記憶體
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }
  });

  window.addEventListener("resize", debounce(resizeCanvas, 200));
  resizeCanvas();
  animationFrameId = requestAnimationFrame(render);
}

/* ==========================================================================
   02. 頂部固定導覽列與 Mobile 390px 抽屜導覽 (Focus Trapping)
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-drawer-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const desktopNavLinks = document.querySelectorAll(".desktop-nav .nav-link");

  // 1. 滾動時自動為導覽列增添毛玻璃背影
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }, { passive: true });

  // 2. 滾動聯動高亮當前區塊的導覽項目 (Intersection Observer)
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        desktopNavLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
        mobileNavLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  // 3. 手機版抽屜導覽切換與無障礙焦點陷阱
  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // 鎖定背景滾動

    // 焦點移入第一個抽屜連結
    const firstFocusable = drawer.querySelector("a, button");
    if (firstFocusable) firstFocusable.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // 解除背景滾動
    menuToggle.focus(); // 焦點歸還給漢堡按鈕
  }

  if (menuToggle && drawer) {
    menuToggle.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", closeDrawer);
    }

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    // 鍵盤無障礙支援：按 ESC 鍵關閉抽屜
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        closeDrawer();
      }
    });

    // 抽屜內鍵盤焦點循環 (Focus Trap)
    drawer.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = drawer.querySelectorAll("a, button, input");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
}

/* ==========================================================================
   03. 電影放映篩選器 (Now Showing Filters)
   ========================================================================== */
function initMovieFilter() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const movieCards = document.querySelectorAll(".movie-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-filter");

      // 切換按鈕狀態與 ARIA
      filterTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // 篩選片單顯示與平滑淡入動畫
      movieCards.forEach((card) => {
        const cardGenre = card.getAttribute("data-genre");
        if (category === "all" || cardGenre === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   04. 預約諮詢表單、即時驗證、費用試算與票根確認 (Booking System)
   ========================================================================== */
function initBookingSystem() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  const typeButtons = document.querySelectorAll(".form-type-btn");
  const eventSelect = document.getElementById("event-session");
  const guestCountInput = document.getElementById("guest-count");
  const dateInput = document.getElementById("booking-date");
  const nameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const termsCheckbox = document.getElementById("terms-agree");

  const summaryPriceElement = document.getElementById("summary-price");
  const summaryPerPersonElement = document.getElementById("summary-per-person");

  // 1. 自動設定預約日期限制（最短從明天起預約）
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];
  if (dateInput) {
    dateInput.min = minDateString;
    dateInput.value = minDateString;
  }

  // 2. 預約類型切換（露天電影散客席 vs 私人/企業包場）
  let currentBookingType = "ticket"; // "ticket" 或 "charter"

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentBookingType = btn.getAttribute("data-type");
      updateBookingOptions();
      calculateEstimatedPrice();
    });
  });

  // 更新場次選單內容
  function updateBookingOptions() {
    eventSelect.innerHTML = "";
    if (currentBookingType === "ticket") {
      const ticketOptions = [
        { val: "interstellar", text: "《星際效應 Interstellar》｜ 11/07 (六) 19:30 草地星幕廣場" },
        { val: "lalaland", text: "《愛樂之城 La La Land》｜ 11/14 (六) 19:30 水岸天台星空吧" },
        { val: "bladerunner", text: "《銀翼殺手2049 Blade Runner 2049》｜ 11/21 (六) 20:00 秘境森林放映區" },
        { val: "chungking", text: "《重慶森林 Chungking Express》｜ 11/28 (六) 21:00 水岸天台星空吧" }
      ];
      ticketOptions.forEach((opt) => {
        const optionElem = document.createElement("option");
        optionElem.value = opt.val;
        optionElem.textContent = opt.text;
        eventSelect.appendChild(optionElem);
      });
      guestCountInput.min = "1";
      guestCountInput.max = "12";
      if (parseInt(guestCountInput.value, 10) > 12) guestCountInput.value = "2";
    } else {
      const charterOptions = [
        { val: "charter-proposal", text: "【方案 A】浪漫星空求婚訂製包場 (雙人專屬・專屬片單・星空香檳)" },
        { val: "charter-friends", text: "【方案 B】摯友私人微醺星光派對 (20-30人・自選片單・專屬調酒師)" },
        { val: "charter-corporate", text: "【方案 C】企業品牌發表 / 團隊星空凝聚日 (50-100人・完整音響投影)" }
      ];
      charterOptions.forEach((opt) => {
        const optionElem = document.createElement("option");
        optionElem.value = opt.val;
        optionElem.textContent = opt.text;
        eventSelect.appendChild(optionElem);
      });
      guestCountInput.min = "2";
      guestCountInput.max = "120";
      guestCountInput.value = "20";
    }
  }

  // 3. 智慧動態金額試算 (Dynamic Live Price Calculation)
  function calculateEstimatedPrice() {
    const guests = parseInt(guestCountInput.value, 10) || 1;
    if (currentBookingType === "ticket") {
      const pricePerPerson = 480; // 每位散客席位費用 (包含降噪耳機、爆米花與特調飲品)
      const total = guests * pricePerPerson;
      summaryPriceElement.textContent = total.toLocaleString();
      summaryPerPersonElement.textContent = `(每席 NT$ ${pricePerPerson}，含專屬耳機與星空輕食飲品)`;
    } else {
      const selectedCharter = eventSelect.value;
      let basePrice = 16800;
      if (selectedCharter === "charter-proposal") {
        basePrice = 16800;
        summaryPerPersonElement.textContent = `(浪漫求婚專案・專人場控與星光花藝佈置)`;
      } else if (selectedCharter === "charter-friends") {
        basePrice = 28000;
        summaryPerPersonElement.textContent = `(私人好友派對・含專屬調酒與現烤輕食)`;
      } else {
        basePrice = 58000;
        summaryPerPersonElement.textContent = `(企業品牌包場・含全套發表設備與星級外燴)`;
      }
      summaryPriceElement.textContent = basePrice.toLocaleString();
    }
  }

  guestCountInput.addEventListener("input", calculateEstimatedPrice);
  eventSelect.addEventListener("change", calculateEstimatedPrice);

  // 4. 卡片「快速預約」按鈕連動 (點擊片單或包場方案直接代入表單)
  const quickBookButtons = document.querySelectorAll(".quick-book-trigger");
  quickBookButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetType = btn.getAttribute("data-book-type") || "ticket";
      const targetSession = btn.getAttribute("data-target-session");

      // 切換分頁
      typeButtons.forEach((b) => {
        if (b.getAttribute("data-type") === targetType) {
          b.click();
        }
      });

      // 設定場次
      if (targetSession) {
        setTimeout(() => {
          eventSelect.value = targetSession;
          calculateEstimatedPrice();
        }, 50);
      }

      // 平滑滾動至預約表單
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => nameInput.focus(), 600);
      }
    });
  });

  // 5. 嚴格欄位驗證邏輯 (WCAG 2.1 規範即時錯誤提示)
  function validateField(inputElement, validatorFn, errorMessage) {
    const errorDisplay = inputElement.parentElement.querySelector(".field-error-message");
    const isValid = validatorFn(inputElement.value.trim());

    if (!isValid) {
      inputElement.setAttribute("aria-invalid", "true");
      if (errorDisplay) {
        errorDisplay.textContent = errorMessage;
        errorDisplay.style.display = "flex";
      }
      return false;
    } else {
      inputElement.setAttribute("aria-invalid", "false");
      if (errorDisplay) {
        errorDisplay.style.display = "none";
      }
      return true;
    }
  }

  // 欄位驗證函式庫
  const validators = {
    name: (val) => val.length >= 2,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val) => /^(\+886|09)\d{8,9}$/.test(val.replace(/[\s-]/g, "")),
    date: (val) => val !== "",
    guests: (val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 1 && num <= 150;
    }
  };

  // 綁定 blur 與 input 即時驗證監聽
  nameInput.addEventListener("blur", () => validateField(nameInput, validators.name, "請填寫真實姓名（至少 2 個字元）"));
  nameInput.addEventListener("input", () => {
    if (nameInput.getAttribute("aria-invalid") === "true") {
      validateField(nameInput, validators.name, "請填寫真實姓名（至少 2 個字元）");
    }
  });

  emailInput.addEventListener("blur", () => validateField(emailInput, validators.email, "請輸入有效的電子信箱格式（例如 user@example.com）"));
  emailInput.addEventListener("input", () => {
    if (emailInput.getAttribute("aria-invalid") === "true") {
      validateField(emailInput, validators.email, "請輸入有效的電子信箱格式");
    }
  });

  phoneInput.addEventListener("blur", () => validateField(phoneInput, validators.phone, "請輸入有效的手機號碼（例如 0912-345-678）"));
  phoneInput.addEventListener("input", () => {
    if (phoneInput.getAttribute("aria-invalid") === "true") {
      validateField(phoneInput, validators.phone, "請輸入有效的手機號碼");
    }
  });

  guestCountInput.addEventListener("blur", () => validateField(guestCountInput, validators.guests, "參加人數須為大於 0 的正整數"));
  guestCountInput.addEventListener("input", () => {
    if (guestCountInput.getAttribute("aria-invalid") === "true") {
      validateField(guestCountInput, validators.guests, "參加人數須為大於 0 的正整數");
    }
  });

  // 6. 表單提交處理與票根視窗彈出
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, validators.name, "請填寫真實姓名（至少 2 個字元）");
    const isEmailValid = validateField(emailInput, validators.email, "請輸入有效的電子信箱格式");
    const isPhoneValid = validateField(phoneInput, validators.phone, "請輸入有效的手機號碼");
    const isDateValid = validateField(dateInput, validators.date, "請選擇預約日期");
    const isGuestsValid = validateField(guestCountInput, validators.guests, "參加人數須為大於 0 的正整數");

    if (!termsCheckbox.checked) {
      showToast("請勾選並同意星空觀影須知與服務條款", "error");
      termsCheckbox.focus();
      return;
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isDateValid || !isGuestsValid) {
      showToast("請完整填寫所有必填欄位並修正錯誤", "error");
      // 聚焦至第一個無效欄位
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 生成專屬訂位編號
    const bookingCode = `STRL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 取得選中場次文字
    const selectedSessionText = eventSelect.options[eventSelect.selectedIndex].text;
    const guestCount = guestCountInput.value;
    const bookingDate = dateInput.value;
    const customerName = nameInput.value;
    const seatPreference = document.getElementById("seat-preference")?.value || "草地野餐席";

    // 取得寵物登記狀態
    const petRegSelect = document.getElementById("pet-registration");
    let petText = "無";
    if (petRegSelect) {
      const petVal = petRegSelect.value;
      if (petVal === "dog") petText = "🐾 狗狗隨行 (附水碗與小食)";
      else if (petVal === "cat") petText = "🐾 貓咪隨行 (附水碗與小食)";
      else if (petVal === "other") petText = "🐾 萌寵隨行 (附水碗與小食)";
    }

    // 填充票根資訊
    populateTicketModal({
      code: bookingCode,
      name: customerName,
      sessionText: selectedSessionText,
      date: bookingDate,
      guests: guestCount,
      seat: seatPreference,
      pet: petText,
      totalPrice: summaryPriceElement.textContent
    });

    // 彈出票根 Modal
    openTicketModal();
    showToast("預約申請成功！專屬星空電影票根已生成", "success");
  });

  // 初始試算
  updateBookingOptions();
  calculateEstimatedPrice();
}

/* ==========================================================================
   05. 專屬電影票根彈出視窗 (Vintage Cinema Ticket Modal)
   ========================================================================== */
function populateTicketModal(data) {
  document.getElementById("modal-ticket-code").textContent = data.code;
  document.getElementById("modal-ticket-title").textContent = data.sessionText.split("｜")[0] || data.sessionText;
  document.getElementById("modal-ticket-sub").textContent = data.sessionText.split("｜")[1] || "STARLIGHT OPEN-AIR CINEMA";
  document.getElementById("modal-ticket-name").textContent = data.name;
  document.getElementById("modal-ticket-date").textContent = data.date;
  document.getElementById("modal-ticket-guests").textContent = `${data.guests} 位`;
  document.getElementById("modal-ticket-seat").textContent = data.seat;
  const petElem = document.getElementById("modal-ticket-pet");
  if (petElem) petElem.textContent = data.pet || "無";
  document.getElementById("modal-ticket-total").textContent = `NT$ ${data.totalPrice}`;
}

function openTicketModal() {
  const modal = document.getElementById("ticket-modal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  // 焦點切入關閉按鈕
  const closeBtn = document.getElementById("btn-close-ticket");
  if (closeBtn) closeBtn.focus();

  // 綁定複製票號與列印功能
  const copyBtn = document.getElementById("btn-copy-code");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const code = document.getElementById("modal-ticket-code").textContent;
      navigator.clipboard.writeText(code).then(() => {
        showToast(`預約編號 ${code} 已複製至剪貼簿！`, "success");
      }).catch(() => {
        showToast("複製失敗，請手動抄寫編號", "error");
      });
    };
  }

  const printBtn = document.getElementById("btn-print-ticket");
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }

  // 關閉視窗處理
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    document.getElementById("booking-form")?.reset();
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  if (closeBtn) closeBtn.onclick = closeModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  window.addEventListener("keydown", function escListener(e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
      window.removeEventListener("keydown", escListener);
    }
  });
}

/* ==========================================================================
   06. 浮動 Toast 提示系統 (Notification Toast)
   ========================================================================== */
function showToast(message, type = "info", duration = 4000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconSvg = type === "success" 
    ? `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, duration);
}

/* ==========================================================================
   07. 回到頂端浮動按鈕 (Back to Top)
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   輔助工具：防抖函式 (Debounce)
   ========================================================================== */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

