document.addEventListener("DOMContentLoaded", () => {
    const inputIT = document.getElementById("inputIT");
    const inputAR = document.getElementById("inputAR");
    const outputIT = document.getElementById("outputIT");
    const outputAR = document.getElementById("outputAR");
    const speakITBtn = document.getElementById("speakIT");
    const speakARBtn = document.getElementById("speakAR");
    const toggleKeyboardBtn = document.getElementById("toggleKeyboardBtn");
    const virtualKeyboard = document.getElementById("virtualKeyboard");
    const wordGrid = document.getElementById("wordGrid");
    const categoryTabs = document.querySelectorAll(".tab");

    // Categorie di parole con emoji per apprendimento visivo
    const categories = {
        saluti: {
            "👋 ciao": "مرحبا",
            "🌅 buongiorno": "صباح الخير",
            "🌆 buonasera": "مساء الخير",
            "🌙 buonanotte": "تصبح على خير",
            "👋 arrivederci": "مع السلامة",
            "🙏 grazie": "شكراً",
            "😊 prego": "عفواً",
            "😔 scusa": "آسف",
            "🙏 per favore": "من فضلك",
            "✅ sì": "نعم",
            "❌ no": "لا",
            "🤝 piacere": "تشرفت",
            "❓ come": "كيف",
            "❓ cosa": "ماذا",
            "❓ dove": "أين",
            "❓ quando": "متى",
            "❓ perché": "لماذا",
            "❓ chi": "من"
        },
        famiglia: {
            "👩 mamma": "أمي",
            "👨 papà": "أبي",
            "👦 fratello": "أخ",
            "👧 sorella": "أخت",
            "👵 nonna": "جدتي",
            "👴 nonno": "جدي",
            "👶 bambino": "طفل",
            "👧 bambina": "طفلة",
            "👦 amico": "صديق",
            "👧 amica": "صديقة",
            "👨‍👩‍👧 famiglia": "عائلة",
            "👫 genitori": "الوالدين",
            "🧒 figlio": "ابن",
            "👧 figlia": "ابنة",
            "👶 neonato": "رضيع",
            "🧓 anziano": "مسن"
        },
        scuola: {
            "🏫 scuola": "مدرسة",
            "👩‍🏫 maestra": "معلمة",
            "👨‍🏫 maestro": "معلم",
            "📖 libro": "كتاب",
            "📓 quaderno": "دفتر",
            "🖊️ penna": "قلم",
            "✏️ matita": "قلم رصاص",
            "🎒 zaino": "حقيبة",
            "🪑 banco": "مقعد",
            "📋 lavagna": "سبورة",
            "🏫 classe": "فصل",
            "📝 compito": "واجب",
            "📚 lezione": "درس",
            "🔔 campanella": "جرس",
            "🏃 ricreazione": "استراحة",
            "✂️ forbici": "مقص",
            "📏 righello": "مسطرة",
            "🖍️ colori": "ألوان",
            "🗑️ cestino": "سلة",
            "🚪 porta": "باب"
        },
        casa: {
            "🏠 casa": "بيت",
            "🛏️ camera": "غرفة",
            "🍳 cucina": "مطبخ",
            "🚿 bagno": "حمام",
            "🚪 porta": "باب",
            "🪟 finestra": "نافذة",
            "🛏️ letto": "سرير",
            "🪑 tavolo": "طاولة",
            "🪑 sedia": "كرسي",
            "📺 televisione": "تلفاز",
            "🛋️ divano": "أريكة",
            "🪞 specchio": "مرآة",
            "💡 luce": "ضوء",
            "🔑 chiave": "مفتاح",
            "🏠 tetto": "سقف",
            "🧱 muro": "جدار",
            "🪴 giardino": "حديقة"
        },
        cibo: {
            "🍞 pane": "خبز",
            "💧 acqua": "ماء",
            "🥛 latte": "حليب",
            "🍎 mela": "تفاحة",
            "🍌 banana": "موزة",
            "🍊 arancia": "برتقالة",
            "🧀 formaggio": "جبنة",
            "🍗 pollo": "دجاج",
            "🍚 riso": "أرز",
            "🍝 pasta": "معكرونة",
            "🥗 insalata": "سلطة",
            "🍅 pomodoro": "طماطم",
            "🥕 carota": "جزرة",
            "🥔 patata": "بطاطا",
            "🍳 uovo": "بيضة",
            "🍰 dolce": "حلوى",
            "🍪 biscotto": "بسكويت",
            "🍦 gelato": "آيس كريم",
            "🍕 pizza": "بيتزا",
            "🥪 panino": "شطيرة",
            "☕ caffè": "قهوة",
            "🍵 tè": "شاي",
            "🧃 succo": "عصير"
        },
        colori: {
            "❤️ rosso": "أحمر",
            "💚 verde": "أخضر",
            "💙 blu": "أزرق",
            "💛 giallo": "أصفر",
            "🤍 bianco": "أبيض",
            "🖤 nero": "أسود",
            "🧡 arancione": "برتقالي",
            "💗 rosa": "وردي",
            "💜 viola": "بنفسجي",
            "🤎 marrone": "بني",
            "🩶 grigio": "رمادي",
            "💎 azzurro": "سماوي"
        },
        numeri: {
            "1️⃣ uno": "واحد",
            "2️⃣ due": "اثنان",
            "3️⃣ tre": "ثلاثة",
            "4️⃣ quattro": "أربعة",
            "5️⃣ cinque": "خمسة",
            "6️⃣ sei": "ستة",
            "7️⃣ sette": "سبعة",
            "8️⃣ otto": "ثمانية",
            "9️⃣ nove": "تسعة",
            "🔟 dieci": "عشرة",
            "💯 cento": "مئة",
            "🔢 numero": "رقم"
        },
        giorni: {
            "📅 lunedì": "الإثنين",
            "📅 martedì": "الثلاثاء",
            "📅 mercoledì": "الأربعاء",
            "📅 giovedì": "الخميس",
            "📅 venerdì": "الجمعة",
            "📅 sabato": "السبت",
            "📅 domenica": "الأحد",
            "☀️ oggi": "اليوم",
            "🌅 domani": "غداً",
            "🌙 ieri": "أمس",
            "📆 settimana": "أسبوع",
            "📆 mese": "شهر",
            "📆 anno": "سنة"
        },
        animali: {
            "🐱 gatto": "قطة",
            "🐕 cane": "كلب",
            "🐦 uccello": "طائر",
            "🐟 pesce": "سمكة",
            "🦋 farfalla": "فراشة",
            "🐴 cavallo": "حصان",
            "🐰 coniglio": "أرنب",
            "🐘 elefante": "فيل",
            "🦁 leone": "أسد",
            "🐻 orso": "دب",
            "🐒 scimmia": "قرد",
            "🐮 mucca": "بقرة",
            "🐷 maiale": "خنزير",
            "🐑 pecora": "خروف",
            "🐔 gallina": "دجاجة",
            "🦆 anatra": "بطة",
            "🐢 tartaruga": "سلحفاة",
            "🐍 serpente": "ثعبان",
            "🐝 ape": "نحلة",
            "🐜 formica": "نملة"
        },
        corpo: {
            "👤 testa": "رأس",
            "👀 occhi": "عيون",
            "👂 orecchio": "أذن",
            "👃 naso": "أنف",
            "👄 bocca": "فم",
            "🦷 denti": "أسنان",
            "👅 lingua": "لسان",
            "🖐️ mano": "يد",
            "💪 braccio": "ذراع",
            "🦶 piede": "قدم",
            "🦵 gamba": "ساق",
            "❤️ cuore": "قلب",
            "🧠 cervello": "دماغ",
            "👆 dito": "إصبع",
            "🦴 osso": "عظم"
        },
        vestiti: {
            "👕 maglietta": "قميص",
            "👖 pantaloni": "بنطال",
            "👗 vestito": "فستان",
            "🧥 giacca": "سترة",
            "🧣 sciarpa": "وشاح",
            "🧤 guanti": "قفازات",
            "🧦 calze": "جوارب",
            "👟 scarpe": "حذاء",
            "👒 cappello": "قبعة",
            "👓 occhiali": "نظارات",
            "🎒 zaino": "حقيبة",
            "👜 borsa": "حقيبة يد"
        },
        emozioni: {
            "😊 felice": "سعيد",
            "😢 triste": "حزين",
            "😠 arrabbiato": "غاضب",
            "😨 spaventato": "خائف",
            "😴 stanco": "متعب",
            "🤒 malato": "مريض",
            "💪 forte": "قوي",
            "😋 affamato": "جائع",
            "🥵 caldo": "حار",
            "🥶 freddo": "بارد",
            "😌 calmo": "هادئ",
            "🥳 eccitato": "متحمس"
        },
        verbi: {
            "🚶 andare": "يذهب",
            "🏃 correre": "يركض",
            "🍽️ mangiare": "يأكل",
            "🥤 bere": "يشرب",
            "😴 dormire": "ينام",
            "📖 leggere": "يقرأ",
            "✍️ scrivere": "يكتب",
            "🗣️ parlare": "يتكلم",
            "👂 ascoltare": "يسمع",
            "👀 vedere": "يرى",
            "🎮 giocare": "يلعب",
            "📚 studiare": "يدرس",
            "💭 pensare": "يفكر",
            "❤️ amare": "يحب",
            "🆘 aiutare": "يساعد"
        },
        natura: {
            "☀️ sole": "شمس",
            "🌙 luna": "قمر",
            "⭐ stella": "نجمة",
            "☁️ nuvola": "سحابة",
            "🌧️ pioggia": "مطر",
            "❄️ neve": "ثلج",
            "🌈 arcobaleno": "قوس قزح",
            "🌳 albero": "شجرة",
            "🌸 fiore": "زهرة",
            "🌊 mare": "بحر",
            "⛰️ montagna": "جبل",
            "🏞️ fiume": "نهر",
            "🌲 foresta": "غابة",
            "🌍 terra": "أرض",
            "🌬️ vento": "رياح"
        },
        frasi: {
            "👋 come ti chiami": "ما اسمك",
            "🏷️ mi chiamo": "اسمي",
            "😊 come stai": "كيف حالك",
            "👍 sto bene": "أنا بخير",
            "❓ non capisco": "لا أفهم",
            "🆘 aiutami": "ساعدني",
            "🍽️ ho fame": "أنا جائع",
            "💧 ho sete": "أنا عطشان",
            "🚽 posso andare in bagno": "هل يمكنني الذهاب إلى الحمام",
            "🏠 voglio andare a casa": "أريد الذهاب للبيت",
            "😔 mi fa male": "يؤلمني",
            "🙏 puoi ripetere": "هل يمكنك التكرار",
            "🐢 parla piano": "تكلم ببطء",
            "❤️ ti voglio bene": "أحبك"
        }
    };

    // Crea mappa di traduzione unificata da tutte le categorie
    const translationMap = {};
    for (const category of Object.values(categories)) {
        Object.assign(translationMap, category);
    }

    // Mappa inversa per traduzione Arabo -> Italiano
    const reverseTranslationMap = {};
    for (const [key, value] of Object.entries(translationMap)) {
        reverseTranslationMap[value] = key;
    }

    // === Funzioni di Traduzione ===
    function translate(text, sourceMap, targetBox, isArabic = false) {
        const lowerText = text.toLowerCase().trim();

        if (!lowerText) {
            targetBox.textContent = "";
            return;
        }

        // Cerca corrispondenza esatta
        if (sourceMap[lowerText]) {
            targetBox.textContent = sourceMap[lowerText];
            targetBox.style.color = "#333";
            return;
        }

        // Cerca parole parziali
        let translatedWords = [];
        const words = lowerText.split(/\s+/);
        let foundAny = false;

        for (let word of words) {
            if (sourceMap[word]) {
                translatedWords.push(sourceMap[word]);
                foundAny = true;
            } else {
                translatedWords.push("❓");
            }
        }

        if (foundAny) {
            targetBox.textContent = translatedWords.join(" ");
            targetBox.style.color = "#333";
        } else {
            targetBox.innerHTML = `<span style="color: #888;">🔍 Parola non trovata. Prova con le parole qui sotto!</span>`;
        }
    }

    function translateFromIT() {
        const text = inputIT.value.trim();
        translate(text, translationMap, outputAR);
    }

    function translateFromAR() {
        const text = inputAR.value.trim();
        translate(text, reverseTranslationMap, outputIT, true);
    }

    // === Gestione Word Cards ===
    function renderWordGrid(categoryName) {
        const words = categories[categoryName];
        wordGrid.innerHTML = "";

        for (const [italian, arabic] of Object.entries(words)) {
            const card = document.createElement("div");
            card.className = "word-card";
            card.innerHTML = `
                <div class="italian">${italian}</div>
                <div class="arabic">${arabic}</div>
            `;

            card.addEventListener("click", () => {
                inputIT.value = italian;
                translateFromIT();
                inputIT.focus();

                // Scroll to top to see translation
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            wordGrid.appendChild(card);
        }
    }

    function handleTabClick(e) {
        const tab = e.target;
        const category = tab.dataset.category;

        // Update active tab
        categoryTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Render words for this category
        renderWordGrid(category);
    }

    // === Tastiera Virtuale ===
    function insertAtCursor(element, textToInsert) {
        const start = element.selectionStart;
        const end = element.selectionEnd;
        const currentValue = element.value;

        element.value =
            currentValue.substring(0, start) +
            textToInsert +
            currentValue.substring(end);

        const newCursorPosition = start + textToInsert.length;
        element.setSelectionRange(newCursorPosition, newCursorPosition);
        element.focus();

        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
    }

    function speakText(lang) {
        let text = "";
        if (lang === "it") {
            text = inputIT.value || outputIT.textContent;
        } else if (lang === "ar") {
            text = inputAR.value || outputAR.textContent;
        }

        if (!text.trim() || text.includes("🔍")) {
            alert("Nessun testo da leggere!");
            return;
        }

        // Usa Web Speech API (gratuita, integrata nel browser)
        if ('speechSynthesis' in window) {
            // Ferma eventuale audio in corso
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang === "it" ? "it-IT" : "ar-SA";
            utterance.rate = 0.9; // Velocità leggermente ridotta per bambini
            utterance.pitch = 1.1; // Tono leggermente più alto

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Il tuo browser non supporta la sintesi vocale.");
        }
    }

    function toggleKeyboard() {
        virtualKeyboard.classList.toggle("visible");
        toggleKeyboardBtn.textContent = virtualKeyboard.classList.contains("visible")
            ? "⌨️ Nascondi"
            : "⌨️ Tastiera Araba";
    }

    function createArabicKeyboard() {
        const keys = [
            "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
            "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط", "ئ",
            "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ", "ذ", "ِ", "ٍ",
            " ", "backspace"
        ];

        virtualKeyboard.innerHTML = "";

        keys.forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.className = "key";
            keyElement.textContent = key;

            if (key === "backspace") {
                keyElement.classList.add("backspace");
                keyElement.textContent = "⌫";
                keyElement.addEventListener("click", () => {
                    const start = inputAR.selectionStart;
                    const end = inputAR.selectionEnd;
                    if (start !== end) {
                        inputAR.value =
                            inputAR.value.substring(0, start) +
                            inputAR.value.substring(end);
                        inputAR.setSelectionRange(start, start);
                    } else if (start > 0) {
                        inputAR.value =
                            inputAR.value.substring(0, start - 1) +
                            inputAR.value.substring(end);
                        inputAR.setSelectionRange(start - 1, start - 1);
                    }
                    inputAR.focus();
                    const event = new Event('input', { bubbles: true });
                    inputAR.dispatchEvent(event);
                });
            } else if (key === " ") {
                keyElement.style.gridColumn = "span 4";
                keyElement.textContent = "␣";
                keyElement.addEventListener("click", () => {
                    insertAtCursor(inputAR, " ");
                });
            } else {
                keyElement.addEventListener("click", () => {
                    insertAtCursor(inputAR, key);
                });
            }

            virtualKeyboard.appendChild(keyElement);
        });
    }

    // === Event Listeners ===
    inputIT.addEventListener("input", translateFromIT);
    inputAR.addEventListener("input", translateFromAR);
    speakITBtn.addEventListener("click", () => speakText("it"));
    speakARBtn.addEventListener("click", () => speakText("ar"));
    toggleKeyboardBtn.addEventListener("click", toggleKeyboard);

    categoryTabs.forEach(tab => {
        tab.addEventListener("click", handleTabClick);
    });

    // === Inizializzazione ===
    createArabicKeyboard();
    renderWordGrid("saluti");

    // =============================================
    // === QUIZ MODE ===
    // =============================================

    const quizSection = document.getElementById("quizSection");
    const wordCategoriesSection = document.querySelector(".word-categories");
    const columnsSection = document.querySelector(".columns");
    const modeTabs = document.querySelectorAll(".mode-tab");

    // Quiz elements
    const quizWord = document.getElementById("quizWord");
    const quizOptions = document.getElementById("quizOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const starCount = document.getElementById("starCount");
    const streakCount = document.getElementById("streakCount");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const nextQuestionBtn = document.getElementById("nextQuestionBtn");
    const restartQuizBtn = document.getElementById("restartQuizBtn");
    const quizResults = document.getElementById("quizResults");
    const quizCard = document.querySelector(".quiz-card");
    const finalStars = document.getElementById("finalStars");
    const finalMessage = document.getElementById("finalMessage");
    const playAgainBtn = document.getElementById("playAgainBtn");

    // Quiz state
    let quizQuestions = [];
    let currentQuestion = 0;
    let stars = 0;
    let streak = 0;
    let totalQuestions = 10;
    let correctAnswer = "";
    let answered = false;

    // Get all words as array for quiz
    function getAllWords() {
        const words = [];
        for (const [italian, arabic] of Object.entries(translationMap)) {
            words.push({ italian, arabic });
        }
        return words;
    }

    // Shuffle array
    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Generate quiz questions
    function generateQuizQuestions() {
        const allWords = getAllWords();
        const shuffled = shuffle(allWords);
        quizQuestions = shuffled.slice(0, totalQuestions);
    }

    // Start quiz
    function startQuiz() {
        generateQuizQuestions();
        currentQuestion = 0;
        stars = 0;
        streak = 0;
        answered = false;

        updateScoreDisplay();
        quizResults.style.display = "none";
        quizCard.style.display = "block";
        document.querySelector(".quiz-header").style.display = "block";
        quizFeedback.textContent = "";
        quizFeedback.className = "quiz-feedback";
        nextQuestionBtn.style.display = "none";
        restartQuizBtn.style.display = "none";

        showQuestion();
    }

    // Show current question
    function showQuestion() {
        if (currentQuestion >= totalQuestions) {
            showResults();
            return;
        }

        answered = false;
        const question = quizQuestions[currentQuestion];
        quizWord.textContent = question.italian;
        correctAnswer = question.arabic;

        // Generate 4 options (1 correct + 3 wrong)
        const allWords = getAllWords();
        const wrongOptions = shuffle(
            allWords.filter(w => w.arabic !== correctAnswer)
        ).slice(0, 3);

        const options = shuffle([
            { arabic: correctAnswer, correct: true },
            ...wrongOptions.map(w => ({ arabic: w.arabic, correct: false }))
        ]);

        // Render options
        quizOptions.innerHTML = "";
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.textContent = opt.arabic;
            btn.dataset.correct = opt.correct;
            btn.addEventListener("click", () => handleAnswer(btn, opt.correct));
            quizOptions.appendChild(btn);
        });

        // Update progress
        const progress = ((currentQuestion) / totalQuestions) * 100;
        progressFill.style.width = progress + "%";
        progressText.textContent = `Domanda ${currentQuestion + 1} di ${totalQuestions}`;

        quizFeedback.textContent = "";
        quizFeedback.className = "quiz-feedback";
        nextQuestionBtn.style.display = "none";
    }

    // Handle answer
    function handleAnswer(btn, isCorrect) {
        if (answered) return;
        answered = true;

        // Disable all options
        document.querySelectorAll(".quiz-option").forEach(opt => {
            opt.classList.add("disabled");
            if (opt.dataset.correct === "true") {
                opt.classList.add("correct");
            }
        });

        if (isCorrect) {
            btn.classList.add("correct");
            stars++;
            streak++;
            quizFeedback.textContent = getCorrectMessage();
            quizFeedback.className = "quiz-feedback correct";

            // Play success sound effect (visual feedback)
            btn.style.transform = "scale(1.1)";
            setTimeout(() => btn.style.transform = "", 300);
        } else {
            btn.classList.add("wrong");
            streak = 0;
            quizFeedback.textContent = getWrongMessage(quizQuestions[currentQuestion].italian, correctAnswer);
            quizFeedback.className = "quiz-feedback wrong";
        }

        updateScoreDisplay();

        // Show next button or auto-advance
        if (currentQuestion < totalQuestions - 1) {
            nextQuestionBtn.style.display = "inline-block";
        } else {
            setTimeout(showResults, 1500);
        }
    }

    // Correct messages
    function getCorrectMessage() {
        const messages = [
            "✅ Bravissimo!",
            "✅ Esatto!",
            "✅ Perfetto!",
            "✅ Giusto!",
            "✅ Super!",
            "✅ Fantastico!"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Wrong messages
    function getWrongMessage(italian, arabic) {
        return `❌ Era: ${arabic}`;
    }

    // Update score display
    function updateScoreDisplay() {
        starCount.textContent = stars;
        streakCount.textContent = streak;
    }

    // Show results
    function showResults() {
        quizCard.style.display = "none";
        document.querySelector(".quiz-header").style.display = "none";
        quizFeedback.textContent = "";
        nextQuestionBtn.style.display = "none";
        quizResults.style.display = "block";

        // Calculate star rating (1-3 stars based on score)
        const percentage = (stars / totalQuestions) * 100;
        let starsDisplay = "";
        let message = "";

        if (percentage >= 90) {
            starsDisplay = "⭐⭐⭐";
            message = "Sei un campione! 🏆";
        } else if (percentage >= 70) {
            starsDisplay = "⭐⭐";
            message = "Ottimo lavoro! Continua così! 💪";
        } else if (percentage >= 50) {
            starsDisplay = "⭐";
            message = "Bene! Riprova per migliorare! 📚";
        } else {
            starsDisplay = "💪";
            message = "Non mollare! La pratica rende perfetti! 🌱";
        }

        finalStars.textContent = starsDisplay;
        finalMessage.textContent = `Hai indovinato ${stars}/${totalQuestions}. ${message}`;

        // Save high score
        const savedHighScore = localStorage.getItem("translate4kids_highscore") || 0;
        if (stars > savedHighScore) {
            localStorage.setItem("translate4kids_highscore", stars);
            finalMessage.textContent += " 🎉 Nuovo record!";
        }
    }

    // Next question
    function nextQuestion() {
        currentQuestion++;
        showQuestion();
    }

    // Mode switching
    function switchMode(mode) {
        modeTabs.forEach(t => t.classList.remove("active"));
        document.querySelector(`[data-mode="${mode}"]`).classList.add("active");

        if (mode === "learn") {
            columnsSection.style.display = "flex";
            wordCategoriesSection.style.display = "block";
            quizSection.style.display = "none";
        } else {
            columnsSection.style.display = "none";
            wordCategoriesSection.style.display = "none";
            quizSection.style.display = "block";
            startQuiz();
        }
    }

    // Event listeners for quiz
    modeTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            switchMode(e.target.dataset.mode);
        });
    });

    nextQuestionBtn.addEventListener("click", nextQuestion);
    playAgainBtn.addEventListener("click", startQuiz);

    if (restartQuizBtn) {
        restartQuizBtn.addEventListener("click", startQuiz);
    }
});
