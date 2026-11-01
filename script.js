document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
  });

  // 2. Fullscreen Toggle
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Толук экран режимине өтүү катасы: ${err.message}`);
      });
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  });
  // 3. Speaker Mode (Коргоо режимы) - Оңдолгон версия
  const speakerModal = document.getElementById("speakerModal");
  const speakerModeBtn = document.getElementById("speakerModeBtn");
  const closeSpeaker = document.getElementById("closeSpeaker");
  const speakerBodyText = document.getElementById("speakerBodyText");

  speakerModeBtn.addEventListener("click", () => {
    // Барактагы бардык секцияларды алабыз
    const sections = document.querySelectorAll(".section");
    let currentSection = sections[0];

    // Кайсы секция экрандын ортосунда турганын аныктайбыз
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((sec) => {
      const secTop = sec.offsetTop;
      const secBottom = secTop + sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition <= secBottom) {
        currentSection = sec;
      }
    });

    // Эгер data-speaker табылса ошону чыгарабыз, табылбаса секциянын аталышына жараша текст беребиз
    let speakerText = currentSection.getAttribute("data-speaker");

    if (!speakerText) {
      const titleEl = currentSection.querySelector(".section-title");
      const title = titleEl ? titleEl.textContent : "Бул бөлүм";
      speakerText = `Урматтуу угуучулар, биз карап жаткан негизги тема: "${title}". Бул бөлүмдө биз илимий фактыларга таянып негизги маалыматтарды тааныштырабыз.`;
    }

    speakerBodyText.textContent = speakerText;
    speakerModal.classList.add("active");
  });

  closeSpeaker.addEventListener("click", () => {
    speakerModal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === speakerModal) {
      speakerModal.classList.remove("active");
    }
  });

  // 4. Interactive Timeline Data & Logic
  const timelineData = [
    {
      title: "Australopithecus",
      period: "Болжол менен 4 – 2 миллион жыл мурун",
      desc: "Африкада жашаган, эки буттап басууга ыңгайлашкан байыркы гомининдер.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Чыгыш жана Түштүк Африка",
        "<strong>Мээ көлөмү:</strong> ~400–500 см³",
        "<strong>Өзгөчөлүгү:</strong> Эки буттап баскан, бирок дагы деле даракка чыгууга жөндөмдүү болгон.",
        "<strong>Мааниси:</strong> Адам эволюциясындагы эки буттуулукка өтүүнүн алгачкы далили.",
      ],
      img: "https://scfh.ru/files/iblock/672/yjyxcliwo10momg0k6ftd48gqr0l4hux/Slider.jpg",
    },
    {
      title: "Homo habilis",
      period: "Болжол менен 2.4 – 1.4 миллион жыл мурун",
      desc: "«Чебер адам» — алгачкы таш куралдарды жасаган жана колдогон өкүл.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Чыгыш Африка (Олдувай капчыгайы)",
        "<strong>Мээ көлөмү:</strong> ~600 см³",
        "<strong>Өзгөчөлүгү:</strong> Кол менен иштөө жөндөмү өнүккөн, жөнөкөй таш куралдарды жасаган.",
        "<strong>Мааниси:</strong> Технологияны колдонгон биринчи гоминид.",
      ],
      img: "https://avatars.mds.yandex.net/i?id=8e6cc65955204d1e875e2ad64aa79549_l-8365662-images-thumbs&n=13",
    },
    {
      title: "Homo erectus",
      period: "Болжол менен 1.9 млн – 110 миң жыл мурун",
      desc: "«Тик баскан адам» — Африкадан чыгып, Евразияга тараган жана отту өздөштүргөн.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Африка, Азия, Европа",
        "<strong>Мээ көлөмү:</strong> ~850–1100 см³",
        "<strong>Өзгөчөлүгү:</strong> Толугу менен тик баскан, чоң дене түзүлүшкө ээ болгон, от жагууну үйрөнгөн.",
        "<strong>Мааниси:</strong> Африкадан сырткары кеңири тараган биринчи түр.",
      ],
      img: "https://cf2.ppt-online.org/files2/slide/j/j7iOBXC01w36z8YfymdcuNAklpqaV2eFHvGoER/slide-25.jpg",
    },
    {
      title: "Homo heidelbergensis",
      period: "Болжол менен 700 – 200 миң жыл мурун",
      desc: "Европа жана Африкада жашаган, неандерталдардын жана азыркы адамдардын жалпы ата-теги.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Европа, Африка, Батыш Азия",
        "<strong>Мээ көлөмү:</strong> ~1200 см³",
        "<strong>Өзгөчөлүгү:</strong> Ири аңчылыктарды уюштуруп, жыгач найзаларды колдонгон.",
        "<strong>Мааниси:</strong> Татаал социалдык түзүлүштүн жана турак жай куруунун башталышы.",
      ],
      img: "https://sun9-9.userapi.com/impg/N9oZJ-u6HmSJOr28ZTdCj-YcmySjpN0VTM2BlQ/Qvl_542bDC4.jpg?size=762x1080&quality=95&sign=e5c3defedcc4c4ab10e322b273699444&type=album",
    },
    {
      title: "Neanderthals",
      period: "Болжол менен 400 – 40 миң жыл мурун",
      desc: "Муздак климатка ыңгайлашкан, искусство жана маданият элементтери болгон туугандаш түр.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Европа жана Батыш Азия",
        "<strong>Мээ көлөмү:</strong> ~1400–1500 см³ (азыркы адамдан чоңураак болгон)",
        "<strong>Өзгөчөлүгү:</strong> Денеси чыйрак, муздакка туруктуу, кийим кийген, маркумдарды койгон.",
        "<strong>Мааниси:</strong> Homo sapiens менен генетикалык байланышы бар (азыркы адамдарда 1-2% неандертал ДНКсы бар).",
      ],
      img: "https://img.ixbt.site/live/images/original/03/53/89/2023/08/24/084b2f1956.png?w=877",
    },
    {
      title: "Homo sapiens",
      period: "Болжол менен 300 миң жыл мурун башталып — бүгүнкү күнгө чейин",
      desc: "«Акылдуу адам» — биздин түздөн-түз ата-тегибиз. Татаал тил, искусство жана технология.",
      specs: [
        "<strong>Жашаган аймагы:</strong> Бүткүл дүйнө",
        "<strong>Мээ көлөмү:</strong> ~1350–1450 см³",
        "<strong>Өзгөчөлүгү:</strong> Символдук ой жүгүртүү, сүйлөө тили, үңкүр сүрөттөрү, глобалдык маданият.",
        "<strong>Мааниси:</strong> Жер бетиндеги жашоону толугу менен өзгөрткөн акылдуу цивилизация.",
      ],
      img: "https://i.pinimg.com/736x/63/e5/dd/63e5dd880557f6856de2c25a017b5399.jpg",
    },
  ];

  const timelineDisplay = document.getElementById("timelineDisplay");
  const timelineNavBtns = document.querySelectorAll(".t-btn");

  function renderTimeline(index) {
    const data = timelineData[index];
    timelineDisplay.innerHTML = `
            <div class="timeline-display-content">
                <div class="t-info">
                    <h3>${data.title}</h3>
                    <span class="t-period">${data.period}</span>
                    <p class="t-desc">${data.desc}</p>
                    <ul class="t-specs">
                        ${data.specs.map((spec) => `<li>${spec}</li>`).join("")}
                    </ul>
                </div>
                <div class="t-img">
                    <img src="${data.img}" alt="${data.title}">
                </div>
            </div>
        `;
  }

  timelineNavBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      timelineNavBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderTimeline(idx);
    });
  });

  // Initial render timeline
  renderTimeline(0);

  // 5. Anatomy Interactive Data
  const anatomyData = {
    skull: {
      title: "Баш сөөгү жана мээнин көлөмү",
      desc: "Миллиондогон жылдар ичинде гомининдердин баш сөөгү чоңоюп, мээнин көлөмү 400 см³ден 1400 см³ге чейин өскөн. Бул ой жүгүртүү жана сүйлөө жөндөмүн арттырган.",
      img: "https://i.ytimg.com/vi/LwLhcHk6fgo/maxresdefault.jpg",
    },
    spine: {
      title: "Омуртканын ийрилиги (S-формасы)",
      desc: "Төрт буттап басуудан эки буттап басууга өткөндө омуртка S түрүндөгү ийриликке ээ болуп, салмакты тегиз бөлүштүрүүгө жана омуртканы коргоого шарт түзгөн.",
      img: "https://studarium.ru/public/img/articles/max/814.jpg",
    },
    pelvis: {
      title: "Жамбаш сөөгүнүн түзүлүшү",
      desc: "Жамбаш кыскарып жана кененейип калган. Бул эки буттап басканда дененин туруктуулугун сактоого жана чоң мээлүү баланы туууга ыңгайлашкан.",
      img: "https://upload.wikimedia.org/wikipedia/ky/b/b5/%D0%96%D0%B0%D0%BC%D0%B1%D0%B0%D1%88_%D1%81%D3%A9%D3%A9%D0%B3%D2%AF.png",
    },
    hands: {
      title: "Колдор жана баш бармактын каршы жайгашуусу",
      desc: "Баш бармактын башка манжаларга карама-каршы келиши куралдарды кармоого, буюмдарды жасоого жана эмгектик иш-аракеттерди жасоого толук мүмкүнчүлүк берди.",
      img: "https://i.pinimg.com/originals/78/fe/fd/78fefd22c0f8c79c964caee7d108d76d.jpg",
    },
    feet: {
      title: "Буттардын аркалуу түзүлүшү",
      desc: "Адамдын бут табы (арка) басуу учурунда соккуну жумшартуучу пружинанын милнтип аткарып, узак аралыкка басууга жана чуркоого ыңгайлашты.",
      img: "https://arhe.msk.ru/wp-content/uploads/2022/01/image-5-4.png",
    },
  };

  const anatomyViewer = document.getElementById("anatomyViewer");
  const anatBtns = document.querySelectorAll(".anat-btn");

  function renderAnatomy(key) {
    const item = anatomyData[key];
    anatomyViewer.innerHTML = `
            <div class="anat-details">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <img src="${item.img}" alt="${item.title}" style="width:100%; height:240px; object-fit:cover; border-radius:6px; margin-top:15px; border:1px solid rgba(180,154,104,0.2);">
            </div>
        `;
  }

  anatBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      anatBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderAnatomy(btn.getAttribute("data-target"));
    });
  });

  renderAnatomy("skull");

  // 6. Myths or Facts Data & Logic
  const mythsData = [
    {
      myth: "Адам азыркы маймылдан (шимпанзеден) түздөн-түз пайда болгон.",
      truth: "Жалган!",
      exp: "Адам жана азыркы маймылдар бири-биринен жаралган эмес. Алардын мындан 6-8 млн жыл мурун жашаган жалпы орток ата-теги болгон.",
    },
    {
      myth: "Адамдын эволюциясы түз сызык түрүндө бир калыпта жүргөн.",
      truth: "Жалган!",
      exp: "Эволюция түз сызык эмес, бутакталган дарак сыяктуу болгон. Бир эле мезгилде бир нече гоминид түрлөрү катар жашаган.",
    },
    {
      myth: "Неандерталдар толугу менен жок болуп кеткен жана алардан эч кандай из калган эмес.",
      truth: "Жалган!",
      exp: "Homo sapiens менен неандерталдар аргындашкан. Ошондуктан азыркы африкалык эмес адамдардын геномдорунда 1-2% неандертал ДНКсы бар.",
    },
    {
      myth: "Эволюция байыркы заманда токтоп калган, азыр адамдар өзгөрбөйт.",
      truth: "Жалган!",
      exp: "Эволюция бүгүнкү күндө дагы уланууда. Мисалы, сүт шекерин сиңирүү жөндөмү (лактозага туруктуулук) акыркы миң жылдыктарда пайда болгон.",
    },
  ];

  const mythsGrid = document.getElementById("mythsGrid");
  mythsData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "myth-card";
    card.innerHTML = `
            <div class="myth-header">
                <h4>❓ ${item.myth}</h4>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="myth-body">
                <span class="truth-badge">${item.truth}</span>
                <p>${item.exp}</p>
            </div>
        `;
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
    mythsGrid.appendChild(card);
  });

  // 7. Interactive Quiz Logic
  const quizData = [
    {
      question: "Адам эволюциясы кайсы кургактыкта башталган?",
      options: ["Евразия", "Африка", "Австралия", "Түндүк Америка"],
      correct: 1,
    },
    {
      question: "Таш куралдарды алгач жасаган өкүл ким?",
      options: [
        "Australopithecus",
        "Homo habilis",
        "Homo sapiens",
        "Neanderthals",
      ],
      correct: 1,
    },
    {
      question: "«Тик баскан адам» кайсы өкүл?",
      options: [
        "Homo erectus",
        "Homo habilis",
        "Australopithecus afarensis",
        "Homo sapiens",
      ],
      correct: 0,
    },
    {
      question:
        "Адамдын жана шипанзенин жалпы ата-теги болжол менен канча жыл мурун жашаган?",
      options: [
        "1 миллион жыл мурун",
        "6-8 миллион жыл мурун",
        "50 миң жыл мурун",
        "100 миллион жыл мурун",
      ],
      correct: 1,
    },
    {
      question: "Табигый тандалуу теориясынын негиздөөчүсү ким?",
      options: [
        "Альберт Эйнштейн",
        "Исаак Ньютон",
        "Чарльз Дарвин",
        "Григорий Мендель",
      ],
      correct: 2,
    },
    {
      question:
        "Адамдын мээсинин көлөмү азыркы мезгилде орточо эсеп менен канчага жетет?",
      options: ["400-500 см³", "800 см³", "1350-1450 см³", "3000 см³"],
      correct: 2,
    },
    {
      question: "Неандерталдар кайсы региондо көбүрөөк жашаган?",
      options: [
        "Африка жана Түштүк Азия",
        "Европа жана Батыш Азия",
        "Антарктида",
        "Түштүк Америка",
      ],
      correct: 1,
    },
    {
      question: "Эки буттап басуу (бипедализм) эмнеге шарт түзгөн?",
      options: [
        "Колдун боштондукка чыгышына",
        "Куштар сыяктуу учууга",
        "Сууда тез сүзүүгө",
        "Мээнин кичирейүүсүнө",
      ],
      correct: 0,
    },
    {
      question: "Африкадан чыгуу (Out of Africa) теориясы эмнени түшүндүрөт?",
      options: [
        "Бардык жаныбарлардын Африкадан чыгышын",
        "Homo sapiensтин Африкада пайда болуп, дүйнөгө тараганын",
        "Динозаврлардын жоголушун",
        "Мөңкү доорунун башталганын",
      ],
      correct: 1,
    },
    {
      question:
        "Азыркы африкалык эмес адамдардын геномдорунда кайсы байыркы түрлөрдүн ДНКсы бар?",
      options: [
        "Australopithecus",
        "Неандерталдар",
        "Homo habilis",
        "Динозаврлар",
      ],
      correct: 1,
    },
  ];

  let currentQuizIndex = 0;
  let score = 0;

  const quizQuestionText = document.getElementById("quizQuestionText");
  const quizOptions = document.getElementById("quizOptions");
  const currentQuestionNum = document.getElementById("currentQuestionNum");
  const totalQuestionNum = document.getElementById("totalQuestionNum");
  const nextQuizBtn = document.getElementById("nextQuizBtn");
  const quizQuestionContainer = document.getElementById(
    "quizQuestionContainer",
  );
  const quizResultContainer = document.getElementById("quizResultContainer");
  const quizScoreText = document.getElementById("quizScoreText");
  const restartQuizBtn = document.getElementById("restartQuizBtn");

  totalQuestionNum.textContent = quizData.length;

  function loadQuiz() {
    nextQuizBtn.classList.add("hidden");
    const q = quizData[currentQuizIndex];
    currentQuestionNum.textContent = currentQuizIndex + 1;
    quizQuestionText.textContent = q.question;
    quizOptions.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectAnswer(idx, q.correct, btn));
      quizOptions.appendChild(btn);
    });
  }

  function selectAnswer(selectedIdx, correctIdx, btn) {
    const allBtns = quizOptions.querySelectorAll(".quiz-option-btn");
    allBtns.forEach((b) => (b.disabled = true));

    if (selectedIdx === correctIdx) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
      allBtns[correctIdx].classList.add("correct");
    }

    nextQuizBtn.classList.remove("hidden");
  }

  nextQuizBtn.addEventListener("click", () => {
    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
      loadQuiz();
    } else {
      quizQuestionContainer.classList.add("hidden");
      nextQuizBtn.classList.add("hidden");
      quizResultContainer.classList.remove("hidden");
      quizScoreText.textContent = `Сиз 10 суроонун ичинен ${score} туура жооп таптыңыз!`;
    }
  });

  restartQuizBtn.addEventListener("click", () => {
    currentQuizIndex = 0;
    score = 0;
    quizResultContainer.classList.add("hidden");
    quizQuestionContainer.classList.remove("hidden");
    loadQuiz();
  });

  loadQuiz();
});
