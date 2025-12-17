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

    // Categorie di parole organizzate
    const categories = {
        saluti: {
            "ciao": "مرحبا",
            "buongiorno": "صباح الخير",
            "buonasera": "مساء الخير",
            "buonanotte": "تصبح على خير",
            "arrivederci": "مع السلامة",
            "grazie": "شكراً",
            "prego": "عفواً",
            "scusa": "آسف",
            "per favore": "من فضلك",
            "sì": "نعم",
            "no": "لا"
        },
        famiglia: {
            "mamma": "أمي",
            "papà": "أبي",
            "fratello": "أخ",
            "sorella": "أخت",
            "nonna": "جدتي",
            "nonno": "جدي",
            "bambino": "طفل",
            "bambina": "طفلة",
            "amico": "صديق",
            "amica": "صديقة"
        },
        scuola: {
            "scuola": "مدرسة",
            "maestra": "معلمة",
            "maestro": "معلم",
            "libro": "كتاب",
            "quaderno": "دفتر",
            "penna": "قلم",
            "matita": "قلم رصاص",
            "zaino": "حقيبة",
            "banco": "مقعد",
            "lavagna": "سبورة",
            "classe": "فصل",
            "compito": "واجب"
        },
        casa: {
            "casa": "بيت",
            "camera": "غرفة",
            "cucina": "مطبخ",
            "bagno": "حمام",
            "porta": "باب",
            "finestra": "نافذة",
            "letto": "سرير",
            "tavolo": "طاولة",
            "sedia": "كرسي"
        },
        cibo: {
            "pane": "خبز",
            "acqua": "ماء",
            "latte": "حليب",
            "mela": "تفاحة",
            "banana": "موزة",
            "arancia": "برتقالة",
            "formaggio": "جبنة",
            "pollo": "دجاج",
            "riso": "أرز",
            "pasta": "معكرونة"
        },
        colori: {
            "rosso": "أحمر",
            "verde": "أخضر",
            "blu": "أزرق",
            "giallo": "أصفر",
            "bianco": "أبيض",
            "nero": "أسود",
            "arancione": "برتقالي",
            "rosa": "وردي",
            "viola": "بنفسجي",
            "marrone": "بني"
        },
        numeri: {
            "uno": "واحد",
            "due": "اثنان",
            "tre": "ثلاثة",
            "quattro": "أربعة",
            "cinque": "خمسة",
            "sei": "ستة",
            "sette": "سبعة",
            "otto": "ثمانية",
            "nove": "تسعة",
            "dieci": "عشرة"
        },
        giorni: {
            "lunedì": "الإثنين",
            "martedì": "الثلاثاء",
            "mercoledì": "الأربعاء",
            "giovedì": "الخميس",
            "venerdì": "الجمعة",
            "sabato": "السبت",
            "domenica": "الأحد",
            "oggi": "اليوم",
            "domani": "غداً",
            "ieri": "أمس"
        },
        animali: {
            "gatto": "قطة",
            "cane": "كلب",
            "uccello": "طائر",
            "pesce": "سمكة",
            "farfalla": "فراشة",
            "cavallo": "حصان",
            "coniglio": "أرنب"
        },
        frasi: {
            "come ti chiami": "ما اسمك",
            "mi chiamo": "اسمي",
            "come stai": "كيف حالك",
            "sto bene": "أنا بخير",
            "non capisco": "لا أفهم",
            "aiutami": "ساعدني",
            "ho fame": "أنا جائع",
            "ho sete": "أنا عطشان",
            "posso andare in bagno": "هل يمكنني الذهاب إلى الحمام"
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
    renderWordGrid("saluti"); // Mostra la prima categoria di default
});
