
/* =========================================
   PC ATÖLYE
   APPLICATION ENGINE
   VERSION 1.0
========================================= */


/* =========================================
   1. DOM ELEMENTS
========================================= */

const solutionGrid = document.getElementById("solutionGrid");

const solutionSearch = document.getElementById("solutionSearch");

const categoryButtons = document.querySelectorAll(".category-button");

const noResults = document.getElementById("noResults");

const solutionModal = document.getElementById("solutionModal");

const modalBody = document.getElementById("modalBody");

const modalClose = document.getElementById("modalClose");

const upgradeForm = document.getElementById("upgradeForm");

const upgradeResult = document.getElementById("upgradeResult");

const checklistItems = document.getElementById("checklistItems");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const maintenanceComplete = document.getElementById("maintenanceComplete");

const resetChecklist = document.getElementById("resetChecklist");

const maintenanceButtons = document.querySelectorAll(
    ".maintenance-type-button"
);

const mobileMenuButton = document.getElementById("mobileMenuButton");

const mobileMenu = document.getElementById("mobileMenu");

const backToTop = document.getElementById("backToTop");


/* =========================================
   2. GLOBAL STATE
========================================= */

let activeCategory = "all";

let activeMaintenanceType = "desktop";

let currentChecklist = [];


/* =========================================
   3. HELPER FUNCTIONS
========================================= */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        };

        return entities[character];

    });

}


function formatCurrency(value) {

    return new Intl.NumberFormat("tr-TR", {

        style: "currency",

        currency: "TRY",

        maximumFractionDigits: 0

    }).format(value);

}


function getValue(id) {

    return document.getElementById(id).value;

}


/* =========================================
   4. SOLUTION DATABASE
========================================= */

const solutions = [

    // PERFORMANCE

    {

        id: 1,

        category: "performance",

        icon: "fa-gauge-high",

        title: "Bilgisayarım Çok Yavaş",

        description: "Bilgisayarının genel performansını etkileyen faktörleri kontrol et.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Görev Yöneticisini Aç",

                description: "CTRL + SHIFT + ESC tuşlarına basarak Görev Yöneticisini aç."

            },

            {

                title: "Performans Sekmesine Gir",

                description: "CPU, Bellek, Disk ve GPU kullanım değerlerini incele."

            },

            {

                title: "Kaynak Tüketimini Kontrol Et",

                description: "İşlemciyi veya belleği yoğun kullanan uygulamaları belirle. Tanımadığın sistem işlemlerini rastgele sonlandırma."

            },

            {

                title: "Başlangıç Uygulamalarını İncele",

                description: "Görev Yöneticisi > Başlangıç uygulamaları bölümünden gereksiz başlangıç uygulamalarını devre dışı bırak."

            },

            {

                title: "Depolama Alanını Kontrol Et",

                description: "Windows Ayarları > Sistem > Depolama bölümünden kullanılabilir alanı kontrol et."

            },

            {

                title: "Bilgisayarı Yeniden Başlat",

                description: "Yaptığın değişikliklerden sonra bilgisayarını yeniden başlat ve performansı tekrar kontrol et."

            }

        ]

    },


    {

        id: 2,

        category: "performance",

        icon: "fa-memory",

        title: "RAM Kullanımı Çok Yüksek",

        description: "Bellek kullanımını kontrol et ve gereksiz uygulamaları belirle.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Görev Yöneticisini Aç",

                description: "CTRL + SHIFT + ESC tuşlarına bas."

            },

            {

                title: "Bellek Bölümüne Gir",

                description: "İşlemler sekmesinde Bellek sütununa tıklayarak uygulamaları kullanımlarına göre sırala."

            },

            {

                title: "Gereksiz Uygulamaları Kapat",

                description: "Kullanmadığın ve güvenle kapatabileceğin uygulamaları normal şekilde kapat."

            },

            {

                title: "Tarayıcı Sekmelerini Kontrol Et",

                description: "Açık sekmeler ve tarayıcı eklentileri yüksek bellek tüketebilir."

            },

            {

                title: "RAM Kapasitesini Değerlendir",

                description: "Sorun devam ediyorsa kullandığın programların bellek ihtiyaçlarını mevcut RAM kapasitenle karşılaştır."

            }

        ]

    },


    {

        id: 3,

        category: "performance",

        icon: "fa-hard-drive",

        title: "Disk Kullanımı %100",

        description: "Disk etkinliği sürekli yüksek görünüyorsa olası nedenleri kontrol et.",

        difficulty: "Orta",

        steps: [

            {

                title: "Disk Kullanımını İncele",

                description: "Görev Yöneticisi > İşlemler bölümünde Disk sütununu kontrol et."

            },

            {

                title: "Windows Update'i Kontrol Et",

                description: "Windows arka planda güncelleme indiriyor veya kuruyor olabilir."

            },

            {

                title: "Depolama Sağlığını Kontrol Et",

                description: "Diskin sağlık durumunu üreticinin güvenilir tanılama aracıyla kontrol et."

            },

            {

                title: "Boş Alanı Kontrol Et",

                description: "Sistem diskinde yeterli boş alan bulunduğundan emin ol."

            },

            {

                title: "Sorun Devam Ediyorsa",

                description: "Diskte tıklama sesi, kaybolan dosyalar veya sağlık uyarıları varsa yedekleme yap ve teknik destek al."

            }

        ]

    },


    {

        id: 4,

        category: "performance",

        icon: "fa-temperature-high",

        title: "Bilgisayar Çok Isınıyor",

        description: "Sıcaklık artışının performansı etkilemesini önlemek için kontroller yap.",

        difficulty: "Orta",

        steps: [

            {

                title: "Hava Girişlerini Kontrol Et",

                description: "Bilgisayarın hava girişlerinin kapalı veya engellenmiş olmadığından emin ol."

            },

            {

                title: "Fanların Çalışmasını Kontrol Et",

                description: "Fanlardan anormal ses gelip gelmediğini gözlemle."

            },

            {

                title: "Sıcaklıkları İzle",

                description: "Donanım üreticisinin yazılımı veya güvenilir izleme araçlarıyla CPU ve GPU sıcaklıklarını incele."

            },

            {

                title: "Hava Akışını İyileştir",

                description: "Masaüstü bilgisayarda kasa hava giriş ve çıkışlarının engellenmediğinden emin ol."

            },

            {

                title: "Profesyonel Bakım",

                description: "Fan veya soğutma sistemiyle ilgili sorunlarda cihazın yapısına uygun profesyonel destek al."

            }

        ]

    },


    // HARDWARE

    {

        id: 5,

        category: "hardware",

        icon: "fa-microchip",

        title: "Bilgisayar Açılmıyor",

        description: "Güç bağlantılarını ve temel açılış belirtilerini kontrol et.",

        difficulty: "Orta",

        steps: [

            {

                title: "Güç Bağlantısını Kontrol Et",

                description: "Güç kablosunun ve priz bağlantısının düzgün olduğundan emin ol."

            },

            {

                title: "Harici Bağlantıları Kontrol Et",

                description: "Monitörün ve güç kablolarının doğru şekilde bağlı olduğunu kontrol et."

            },

            {

                title: "Güç Belirtilerini İncele",

                description: "Bilgisayarda ışık, fan sesi veya hata göstergesi bulunup bulunmadığını gözlemle."

            },

            {

                title: "Harici Cihazları Ayır",

                description: "Gerekli olmayan USB cihazlarını çıkarıp tekrar dene."

            },

            {

                title: "Teknik Destek Al",

                description: "Sorun devam ediyorsa güç kaynağını veya iç donanımı kendin açıp onarmaya çalışma."

            }

        ]

    },


    {

        id: 6,

        category: "hardware",

        icon: "fa-display",

        title: "Ekran Görüntüsü Gelmiyor",

        description: "Monitör, kablo ve görüntü çıkışını kontrol et.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Monitörü Kontrol Et",

                description: "Monitörün açık olduğundan ve doğru görüntü girişinin seçildiğinden emin ol."

            },

            {

                title: "Görüntü Kablosunu Kontrol Et",

                description: "HDMI veya DisplayPort kablosunun bağlantısını kontrol et."

            },

            {

                title: "Doğru Görüntü Çıkışını Kullan",

                description: "Harici ekran kartı olan masaüstü sistemlerde monitörün uygun ekran kartı çıkışına bağlı olduğunu kontrol et."

            },

            {

                title: "Farklı Kablo veya Monitör Dene",

                description: "Sorunun kablodan veya monitörden kaynaklanıp kaynaklanmadığını anlamaya çalış."

            },

            {

                title: "Uzman Desteği Al",

                description: "Görüntü hâlâ gelmiyorsa donanım arızası ihtimalini değerlendirmek için teknik destek al."

            }

        ]

    },


    {

        id: 7,

        category: "hardware",

        icon: "fa-volume-high",

        title: "Bilgisayardan Ses Gelmiyor",

        description: "Ses çıkış cihazını ve Windows ses ayarlarını kontrol et.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Ses Seviyesini Kontrol Et",

                description: "Windows ses seviyesinin kapalı olmadığından emin ol."

            },

            {

                title: "Çıkış Cihazını Seç",

                description: "Ses ayarlarından doğru hoparlör veya kulaklığı seç."

            },

            {

                title: "Kablo ve Bağlantıları Kontrol Et",

                description: "Kablolu cihazlarda bağlantıların düzgün olduğundan emin ol."

            },

            {

                title: "Ses Sorun Gidericisini Çalıştır",

                description: "Windows Ayarları > Sistem > Ses bölümündeki sorun giderme seçeneğini kullan."

            },

            {

                title: "Ses Sürücüsünü İncele",

                description: "Aygıt Yöneticisi üzerinden ses cihazının durumunu kontrol et."

            }

        ]

    },


    {

        id: 8,

        category: "hardware",

        icon: "fa-keyboard",

        title: "Klavye veya Fare Çalışmıyor",

        description: "USB, Bluetooth ve cihaz bağlantılarını incele.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Bağlantıyı Kontrol Et",

                description: "USB bağlantısını çıkarıp yeniden tak veya Bluetooth bağlantısını kontrol et."

            },

            {

                title: "Başka USB Girişi Dene",

                description: "Mümkünse başka bir USB bağlantı noktasını dene."

            },

            {

                title: "Pil Durumunu Kontrol Et",

                description: "Kablosuz cihaz kullanıyorsan pil seviyesini kontrol et."

            },

            {

                title: "Başka Bilgisayarda Dene",

                description: "Cihazın kendisinde arıza olup olmadığını anlamak için başka bir sistemde test et."

            }

        ]

    },


    // WINDOWS

    {

        id: 9,

        category: "windows",

        icon: "fa-rotate",

        title: "Windows Güncelleme Yapmıyor",

        description: "Windows Update hatalarını ve güncelleme durumunu kontrol et.",

        difficulty: "Orta",

        steps: [

            {

                title: "İnternet Bağlantısını Kontrol Et",

                description: "İnternet bağlantısının düzgün çalıştığından emin ol."

            },

            {

                title: "Windows Update'i Aç",

                description: "Ayarlar > Windows Update bölümüne gir."

            },

            {

                title: "Güncellemeleri Yeniden Dene",

                description: "Güncellemeleri denetle seçeneğine bas."

            },

            {

                title: "Boş Depolama Alanını Kontrol Et",

                description: "Windows güncellemeleri için yeterli depolama alanı bulunduğundan emin ol."

            },

            {

                title: "Sorun Gidericiyi Kullan",

                description: "Windows Update sorun gidericisini çalıştır."

            }

        ]

    },


    {

        id: 10,

        category: "windows",

        icon: "fa-triangle-exclamation",

        title: "Windows Hata Veriyor",

        description: "Sistem hatalarını ve hata mesajlarını incele.",

        difficulty: "Orta",

        steps: [

            {

                title: "Hata Mesajını Kaydet",

                description: "Karşılaştığın hata kodunu veya mesajı not al."

            },

            {

                title: "Bilgisayarı Yeniden Başlat",

                description: "Geçici bir sistem hatası olup olmadığını kontrol et."

            },

            {

                title: "Windows Güvenliğini Kontrol Et",

                description: "Windows Güvenliği üzerinden güvenlik taraması yap."

            },

            {

                title: "Güncellemeleri Kontrol Et",

                description: "Bekleyen Windows ve sürücü güncellemelerini incele."

            },

            {

                title: "Sistem Dosyalarını İncele",

                description: "Sorun devam ediyorsa önemli dosyalarını yedekle ve Microsoft'un resmi sistem onarım yönergelerini takip et."

            }

        ]

    },


    {

        id: 11,

        category: "windows",

        icon: "fa-desktop",

        title: "Masaüstü Donuyor",

        description: "Windows arayüzündeki geçici takılmaları incele.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Görev Yöneticisini Aç",

                description: "CTRL + SHIFT + ESC tuşlarını kullan."

            },

            {

                title: "Kaynak Kullanımını İncele",

                description: "CPU, RAM ve Disk kullanımını kontrol et."

            },

            {

                title: "Windows Gezgini'ni Kontrol Et",

                description: "Görev Yöneticisinde Windows Gezgini işlemini bul."

            },

            {

                title: "Sürücüleri Kontrol Et",

                description: "Özellikle grafik sürücüsünün güncel ve uyumlu olduğundan emin ol."

            }

        ]

    },


    // INTERNET

    {

        id: 12,

        category: "internet",

        icon: "fa-wifi",

        title: "İnternet Çok Yavaş",

        description: "Bağlantı hızını ve ağ kullanımını kontrol et.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Modemi Kontrol Et",

                description: "Modemin bağlantı ışıklarını ve çalışma durumunu kontrol et."

            },

            {

                title: "Bağlantı Türünü İncele",

                description: "Wi-Fi veya Ethernet bağlantısını kontrol et."

            },

            {

                title: "Ağ Kullanımını İncele",

                description: "Görev Yöneticisi > Performans > Wi-Fi veya Ethernet bölümüne bak."

            },

            {

                title: "Modem Konumunu Değerlendir",

                description: "Duvarlar ve elektronik cihazlar kablosuz sinyali etkileyebilir."

            },

            {

                title: "Hız Testi Yap",

                description: "İnternet servis sağlayıcının sunduğu hız testi aracını kullan."

            }

        ]

    },


    {

        id: 13,

        category: "internet",

        icon: "fa-ban",

        title: "İnternet Bağlantısı Yok",

        description: "Ağ bağlantısını ve Windows ağ ayarlarını kontrol et.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Wi-Fi'nin Açık Olduğundan Emin Ol",

                description: "Uçak modunun kapalı ve Wi-Fi'nin açık olduğunu kontrol et."

            },

            {

                title: "Modemi Kontrol Et",

                description: "Diğer cihazların internete bağlanıp bağlanamadığını kontrol et."

            },

            {

                title: "Ağı Yeniden Bağla",

                description: "Wi-Fi bağlantısını kesip tekrar bağlan."

            },

            {

                title: "Windows Ağ Sorun Gidericisini Çalıştır",

                description: "Ayarlar > Ağ ve İnternet bölümünden sorun gidericiyi kullan."

            },

            {

                title: "Servis Sağlayıcını Kontrol Et",

                description: "Bölgesel bir internet kesintisi olup olmadığını öğren."

            }

        ]

    },


    {

        id: 14,

        category: "internet",

        icon: "fa-signal",

        title: "Wi-Fi Sinyali Zayıf",

        description: "Kablosuz bağlantının kalitesini iyileştirmek için kontroller yap.",

        difficulty: "Kolay",

        steps: [

            {

                title: "Modeme Yaklaş",

                description: "Bilgisayarı modeme daha yakın bir konumda test et."

            },

            {

                title: "5 GHz ve 2.4 GHz Ağlarını İncele",

                description: "Modemin desteklediği frekansları ve bulunduğun ortama uygun bağlantıyı kontrol et."

            },

            {

                title: "Engelleri Azalt",

                description: "Modem ile bilgisayar arasındaki fiziksel engelleri değerlendir."

            },

            {

                title: "Kablosuz Adaptörü Kontrol Et",

                description: "Wi-Fi adaptörünün sürücüsünü ve donanım durumunu incele."

            }

        ]

    }

];


/* =========================================
   5. SOLUTION RENDER ENGINE
========================================= */

function renderSolutions() {

    const searchText = solutionSearch.value
        .toLocaleLowerCase("tr-TR")
        .trim();

    const filteredSolutions = solutions.filter(solution => {

        const matchesCategory =
            activeCategory === "all" ||
            solution.category === activeCategory;

        const matchesSearch =
            solution.title.toLocaleLowerCase("tr-TR").includes(searchText) ||
            solution.description.toLocaleLowerCase("tr-TR").includes(searchText);

        return matchesCategory && matchesSearch;

    });


    solutionGrid.innerHTML = "";


    if (filteredSolutions.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    filteredSolutions.forEach(solution => {

        const card = document.createElement("article");

        card.className = "solution-card";

        card.innerHTML = `

            <div class="solution-icon">

                <i class="fa-solid ${solution.icon}"></i>

            </div>

            <h3>${escapeHTML(solution.title)}</h3>

            <p>${escapeHTML(solution.description)}</p>

            <div class="solution-card-footer">

                <span>${escapeHTML(solution.difficulty)} Seviye</span>

                <span>
                    DETAYLARI GÖR
                    <i class="fa-solid fa-arrow-right"></i>
                </span>

            </div>

        `;


        card.addEventListener("click", () => {

            openSolution(solution.id);

        });


        solutionGrid.appendChild(card);

    });

}


/* =========================================
   6. CATEGORY FILTER
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        activeCategory = button.dataset.category;


        renderSolutions();

    });

});


solutionSearch.addEventListener("input", renderSolutions);


/* =========================================
   7. SOLUTION DETAIL MODAL
========================================= */

function openSolution(solutionId) {

    const solution = solutions.find(item => item.id === solutionId);

    if (!solution) return;


    let stepsHTML = "";


    solution.steps.forEach((step, index) => {

        stepsHTML += `

            <div class="modal-step">

                <div class="modal-step-number">
                    ${index + 1}
                </div>

                <div class="modal-step-content">

                    <strong>${escapeHTML(step.title)}</strong>

                    <span>${escapeHTML(step.description)}</span>

                </div>

            </div>

        `;

    });


    modalBody.innerHTML = `

        <span class="section-label">
            PC ATÖLYE DESTEK REHBERİ
        </span>

        <h2>${escapeHTML(solution.title)}</h2>

        <p>${escapeHTML(solution.description)}</p>

        <div class="modal-steps">

            ${stepsHTML}

        </div>

        <div class="result-notice">

            <strong>Önemli:</strong>

            Bu rehber genel bilgilendirme amaçlıdır.
            Sorunun devam etmesi veya donanım arızası şüphesinde
            yetkili teknik destek al.

        </div>

    `;


    solutionModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeSolution() {

    solutionModal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeSolution);


solutionModal.addEventListener("click", event => {

    if (event.target === solutionModal) {

        closeSolution();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSolution();

    }

});


/* =========================================
   8. SYSTEM UPGRADE ENGINE
========================================= */

upgradeForm.addEventListener("submit", event => {

    event.preventDefault();


    const system = {

        usage: getValue("usage"),

        type: getValue("computerType"),

        ram: Number(getValue("ram")),

        storageType: getValue("storageType"),

        storageCapacity: Number(getValue("storageCapacity")),

        gpu: getValue("gpu").trim(),

        vram: Number(getValue("vram")),

        cpu: getValue("cpu").trim(),

        budget: Number(getValue("budget"))

    };


    if (

        !system.usage ||
        !system.type ||
        !system.ram ||
        !system.storageType ||
        !system.storageCapacity ||
        !system.gpu ||
        !system.cpu ||
        system.budget < 0 ||
        !Number.isFinite(system.budget)

    ) {

        alert("Lütfen bütün sistem bilgilerini doğru şekilde doldur.");

        return;

    }


    const recommendations = [];


    /* RAM ANALYSIS */

    let recommendedRam = 0;

    if (system.usage === "gaming" || system.usage === "editing") {

        recommendedRam = 32;

    } else if (
        system.usage === "development" ||
        system.usage === "design"
    ) {

        recommendedRam = 32;

    } else {

        recommendedRam = 16;

    }


    if (system.ram < recommendedRam) {

        recommendations.push({

            title: "RAM Kapasitesini Yükselt",

            description:
                `Mevcut RAM kapasiten ${system.ram} GB. ` +
                `Kullanım amacın için ${recommendedRam} GB toplam RAM ` +
                `hedefini değerlendirebilirsin. ` +
                `Mevcut bellek modüllerinin türü, hızı, yuva sayısı ` +
                `ve anakart desteği kontrol edilmelidir.`,

            priority: 1,

            category: "RAM"

        });

    }


    /* STORAGE ANALYSIS */

    if (system.storageType === "hdd") {

        recommendations.push({

            title: "SSD'ye Geçiş Yap",

            description:
                "Sistem diskin HDD ise uyumlu bir SSD'ye geçiş " +
                "Windows açılışını ve uygulama yükleme sürelerini " +
                "iyileştirebilir. NVMe SSD için anakart veya dizüstü " +
                "bilgisayarının desteklediği M.2 standardını kontrol et.",

            priority: 2,

            category: "SSD"

        });

    }


    if (system.storageCapacity <= 256) {

        recommendations.push({

            title: "Depolama Kapasitesini Artır",

            description:
                `Mevcut kapasiten ${system.storageCapacity} GB. ` +
                "Dosyaların ve programların için daha yüksek kapasiteli " +
                "bir depolama birimi değerlendirebilirsin.",

            priority: 3,

            category: "Depolama"

        });

    }


    /* GPU ANALYSIS */

    if (
        system.usage === "gaming" ||
        system.usage === "design" ||
        system.usage === "editing"
    ) {

        if (system.vram > 0 && system.vram <= 4) {

            recommendations.push({

                title: "Ekran Kartını Değerlendir",

                description:
                    `${system.gpu} modelinin belirttiğin VRAM kapasitesi ` +
                    `${system.vram} GB. Oyun, tasarım ve video düzenleme ` +
                    "iş yüklerine göre daha güçlü bir ekran kartı " +
                    "değerlendirilebilir. Ancak kesin model seçimi için " +
                    "işlemci, güç kaynağı, kasa alanı ve bağlantılar incelenmelidir.",

                priority: 4,

                category: "GPU"

            });

        } else if (system.vram > 4 && system.vram < 8) {

            recommendations.push({

                title: "GPU Performansını İncele",

                description:
                    "Ekran kartının mevcut performansını kullandığın " +
                    "oyunların veya uygulamaların gereksinimleriyle karşılaştır. " +
                    "Yükseltme öncesinde çözünürlük, grafik ayarları ve güç " +
                    "kaynağı uyumluluğunu değerlendir.",

                priority: 4,

                category: "GPU"

            });

        }

    }


    /* CPU ANALYSIS */

    recommendations.push({

        title: "İşlemci Uyumluluğunu Kontrol Et",

        description:
            `Mevcut işlemcin: ${system.cpu}. İşlemci yükseltmesi ` +
            "düşünüyorsan anakart modeli, işlemci soketi, BIOS sürümü, " +
            "güç sınırları ve soğutma kapasitesi kontrol edilmelidir. " +
            "Sadece Core i5 veya Core i7 adına bakarak işlemci seçme.",

        priority: 5,

        category: "CPU"

    });


    /* LAPTOP LIMITATION */

    if (system.type === "laptop") {

        recommendations.push({

            title: "Dizüstü Bilgisayar Yükseltme Sınırları",

            description:
                "Dizüstü bilgisayarlarda işlemci ve ekran kartı çoğunlukla " +
                "anakarta lehimlidir. RAM veya SSD yükseltme olanağı da " +
                "modele göre değişir. Cihazının üretici model numarasıyla " +
                "resmî teknik özelliklerini kontrol et.",

            priority: 6,

            category: "Laptop"

        });

    }


    /* DESKTOP LIMITATION */

    if (system.type === "desktop") {

        recommendations.push({

            title: "Güç Kaynağı ve Anakart Kontrolü",

            description:
                "Yeni ekran kartı veya işlemci almadan önce güç kaynağının " +
                "kalitesini, kapasitesini, gerekli bağlantılarını ve " +
                "anakart uyumluluğunu kontrol et.",

            priority: 6,

            category: "Uyumluluk"

        });

    }


    /* USAGE DESCRIPTION */

    const usageNames = {

        gaming: "Oyun",

        work: "İş ve Ofis",

        design: "Tasarım ve Grafik",

        editing: "Video Düzenleme",

        development: "Yazılım ve Geliştirme",

        general: "Günlük Kullanım"

    };


    const typeNames = {

        desktop: "Masaüstü",

        laptop: "Dizüstü"

    };


    recommendations.sort((a, b) => a.priority - b.priority);


    /* RESULT RENDER */

    let resultHTML = `

        <span class="section-label">
            SİSTEM ANALİZİ TAMAMLANDI
        </span>

        <h3 class="result-title">
            Yükseltme Planın
        </h3>

        <p class="result-subtitle">
            Girdiğin özelliklere göre hazırlanan ön değerlendirme.
        </p>

        <div class="result-summary">

            <strong>Sistem Bilgilerin</strong><br><br>

            Bilgisayar: ${typeNames[system.type]}<br>

            Kullanım: ${usageNames[system.usage]}<br>

            RAM: ${system.ram} GB<br>

            Depolama: ${system.storageCapacity} GB<br>

            Depolama türü: ${system.storageType.toUpperCase()}<br>

            GPU: ${escapeHTML(system.gpu)}<br>

            VRAM: ${system.vram || "Paylaşımlı / Bilinmiyor"} GB<br>

            CPU: ${escapeHTML(system.cpu)}<br>

            Bütçe: ${formatCurrency(system.budget)}

        </div>

    `;


    if (recommendations.length === 0) {

        resultHTML += `

            <div class="upgrade-recommendation">

                <h4>Mevcut sistemini koruyabilirsin.</h4>

                <p>
                    Girdiğin bilgilere göre belirgin bir yükseltme
                    ihtiyacı saptanmadı. Kullandığın uygulamaların
                    gereksinimlerini ayrıca incele.
                </p>

            </div>

        `;

    }


    recommendations.forEach((item, index) => {

        resultHTML += `

            <div class="upgrade-recommendation">

                <h4>
                    ${index + 1}. ${escapeHTML(item.title)}
                </h4>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <span class="priority-tag">
                    ${escapeHTML(item.category)}
                </span>

            </div>

        `;

    });


    resultHTML += `

        <div class="result-budget">

            <span>Belirttiğin yükseltme bütçesi</span>

            <br>

            <strong>${formatCurrency(system.budget)}</strong>

        </div>


        <div class="result-notice">

            <strong>Uyumluluk ve fiyat uyarısı:</strong>

            Bu analiz genel bir önceliklendirme yapar.
            Canlı mağaza fiyatlarını kontrol etmez ve belirli bir
            parçanın sisteminle kesin uyumlu olduğunu garanti etmez.
            Satın almadan önce tam model bilgilerini, anakartı,
            güç kaynağını ve üretici teknik belgelerini kontrol et.

        </div>

    `;


    upgradeResult.innerHTML = resultHTML;


    upgradeResult.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

});


/* =========================================
   9. MAINTENANCE DATABASE
========================================= */

const maintenanceData = {

    desktop: [

        {

            title: "Bilgisayarı tamamen kapat",

            description: "İşletim sistemini kapat ve bilgisayarın tamamen durmasını bekle."

        },

        {

            title: "Güç kablosunu çıkar",

            description: "Güç bağlantısını ve harici cihaz kablolarını ayır."

        },

        {

            title: "Güvenli çalışma ortamı hazırla",

            description: "Temiz, kuru ve sabit bir çalışma alanı oluştur."

        },

        {

            title: "Statik elektrik önlemlerini al",

            description: "Uygun ESD önlemleri kullan. Hassas bileşenleri yalnızca kenarlarından tut."

        },

        {

            title: "Kasa dış yüzeyini temizle",

            description: "Elektronik parçalardan uzakta, hafif nemli mikrofiber bezle dış yüzeyi temizle."

        },

        {

            title: "Hava girişlerini kontrol et",

            description: "Kasa hava girişlerinin ve filtrelerinin tıkalı olmadığını kontrol et."

        },

        {

            title: "Fanları gözlemle",

            description: "Fanlarda anormal ses veya çalışma sorunu olup olmadığını kontrol et."

        },

        {

            title: "Kablo düzenini kontrol et",

            description: "Dışarıdaki kabloların hava girişlerini veya çalışma alanını engellemediğinden emin ol."

        },

        {

            title: "Depolama sağlığını incele",

            description: "Disk sağlık durumunu üretici yazılımıyla kontrol et."

        },

        {

            title: "Bilgisayarı yeniden çalıştır",

            description: "Bakım sonrası sistemin normal açıldığını ve fanların düzgün çalıştığını kontrol et."

        }

    ],


    laptop: [

        {

            title: "Dizüstü bilgisayarı kapat",

            description: "Windows üzerinden tamamen kapat ve uyku modunda olmadığından emin ol."

        },

        {

            title: "Şarj cihazını çıkar",

            description: "Adaptörü ve bütün harici bağlantıları ayır."

        },

        {

            title: "Cihazın soğumasını bekle",

            description: "Bilgisayarın sıcak yüzeylerine veya parçalarına hemen dokunma."

        },

        {

            title: "Garanti koşullarını kontrol et",

            description: "Alt kapağı açmadan önce üreticinin bakım ve garanti koşullarını incele."

        },

        {

            title: "Ekranı mikrofiber bezle temizle",

            description: "Temizleyiciyi doğrudan ekrana püskürtme. Uygun ürünü beze uygulayarak üretici talimatlarını takip et."

        },

        {

            title: "Klavye yüzeyini temizle",

            description: "Kuru, yumuşak ve uygun bir temizlik bezi kullan."

        },

        {

            title: "Hava girişlerini kontrol et",

            description: "Fan girişlerinin ve çıkışlarının tıkalı olmadığını kontrol et."

        },

        {

            title: "Gövde ve menteşeleri incele",

            description: "Gövde hasarı, gevşek menteşe veya şişmiş pil belirtisi olup olmadığını gözlemle. Şüpheli pil durumunda cihazı kullanmayı bırak ve teknik destek al."

        },

        {

            title: "Depolama sağlığını kontrol et",

            description: "Üretici yazılımıyla SSD sağlık durumunu incele."

        },

        {

            title: "Profesyonel iç temizlik ihtiyacını değerlendir",

            description: "İç temizlik için cihazı kendin açmak zorunda değilsin. Gerektiğinde teknik servise başvur."

        },

        {

            title: "Cihazı yeniden çalıştır",

            description: "Şarj adaptörünü bağla ve cihazın normal çalıştığını kontrol et."

        }

    ]

};


/* =========================================
   10. MAINTENANCE CHECKLIST ENGINE
========================================= */

function renderChecklist(type) {

    activeMaintenanceType = type;

    currentChecklist = maintenanceData[type];


    checklistItems.innerHTML = "";


    currentChecklist.forEach((item, index) => {

        const label = document.createElement("label");

        label.className = "checklist-item";


        label.innerHTML = `

            <input
                type="checkbox"
                data-index="${index}"
            >

            <div>

                <strong>${escapeHTML(item.title)}</strong>

                <span>${escapeHTML(item.description)}</span>

            </div>

        `;


        checklistItems.appendChild(label);

    });


    updateProgress();

}


function updateProgress() {

    const checkboxes = checklistItems.querySelectorAll(
        'input[type="checkbox"]'
    );


    const completed = Array.from(checkboxes).filter(
        checkbox => checkbox.checked
    ).length;


    const total = checkboxes.length;


    const percentage = total > 0
        ? Math.round((completed / total) * 100)
        : 0;


    progressBar.style.width = percentage + "%";

    progressText.textContent = percentage + "%";


    checkboxes.forEach(checkbox => {

        const parent = checkbox.closest(".checklist-item");

        parent.classList.toggle("checked", checkbox.checked);

    });


    if (percentage === 100 && total > 0) {

        maintenanceComplete.classList.add("show");

    } else {

        maintenanceComplete.classList.remove("show");

    }

}


/* CHECKBOX EVENTS */

checklistItems.addEventListener("change", updateProgress);


/* TYPE SWITCHING */

maintenanceButtons.forEach(button => {

    button.addEventListener("click", () => {

        maintenanceButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        renderChecklist(button.dataset.type);

    });

});


/* RESET */

resetChecklist.addEventListener("click", () => {

    const checkboxes = checklistItems.querySelectorAll(
        'input[type="checkbox"]'
    );


    checkboxes.forEach(checkbox => {

        checkbox.checked = false;

    });


    updateProgress();

});


/* =========================================
   11. MOBILE MENU
========================================= */

mobileMenuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");


    const icon = mobileMenuButton.querySelector("i");


    if (mobileMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        mobileMenuButton.querySelector("i").className = "fa-solid fa-bars";

    });

});


/* =========================================
   12. BACK TO TOP
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================
   13. ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(".nav-link");


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") === "#" + entry.target.id
            ) {

                link.classList.add("active");

            }

        });

    });

}, {

    threshold: 0.2

});


sections.forEach(section => {

    observer.observe(section);

});


/* =========================================
   14. FOOTER YEAR
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   15. INITIALIZATION
========================================= */

function initializeApp() {

    renderSolutions();

    renderChecklist("desktop");

    console.log(
        "%cPC ATÖLYE",
        "color:#ffd700;font-size:24px;font-weight:900;"
    );

    console.log(
        "%cBilgisayarını Tanı. Kontrolü Ele Al.",
        "color:#d4af37;font-size:13px;"
    );

}


initializeApp();


/* =========================================
   END OF APPLICATION
========================================= */
