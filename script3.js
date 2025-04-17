const { useState, useEffect } = React;

        function App() {
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            const [isAdmin, setIsAdmin] = useState(false);
            const [username, setUsername] = useState("");
            const [password, setPassword] = useState("");
            const [currentUser, setCurrentUser] = useState(null);
            const [showLogin, setShowLogin] = useState(false);
            const [isRegistering, setIsRegistering] = useState(false);
            const [showWelcome, setShowWelcome] = useState(false);
            const [menuOpen, setMenuOpen] = useState(false);
            const [selectedPlan, setSelectedPlan] = useState(null);
            const [showPlanDetails, setShowPlanDetails] = useState(null);
            const [purchasedPlans, setPurchasedPlans] = useState({});
            const [users, setUsers] = useState({ admin: "j2wEUHNcyj5X0Z5Mz9XD" });
            const [error, setError] = useState("");
            const [showTask, setShowTask] = useState(null);
            const [showFreePresentation, setShowFreePresentation] = useState(false);
            const [showPresentationSlides, setShowPresentationSlides] = useState(null);

            const plans = [
                {
                    id: 1,
                    name: "Základní",
                    price: "499 Kč",
                    features: [
                        "Přístup k základním kurzům",
                        "Komunitní fórum",
                        "Základní podpora"
                    ],
                    details: [
                        { name: "Úvod do Blenderu", duration: "10 hodin", description: "Základy 3D modelování a rozhraní Blenderu." },
                        { name: "Texturování pro začátečníky", duration: "8 hodin", description: "Naučte se vytvářet jednoduché textury." }
                    ],
                    images: [
                        "https://images.unsplash.com/photo-1622737133849-b69d289a0907?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1618843473805-5ca896816e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    ]
                },
                {
                    id: 2,
                    name: "Pokročilý",
                    price: " 999 Kč",
                    features: [
                        "Přístup k pokročilým kurzům",
                        "Zpětná vazba od lektorů",
                        "Komunitní fórum",
                        "Prioritní podpora"
                    ],
                    details: [
                        { name: "Pokročilé animace", duration: "15 hodin", description: "Techniky pro tvorbu realistických animací." },
                        { name: "Shadery a osvětlení", duration: "12 hodin", description: "Vytvořte profesionální vizuály." },
                        { name: "Rigging postav", duration: "10 hodin", description: "Naučte se připravit modely pro animaci." }
                    ],
                    images: [
                        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1618843473805-5ca896816e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1622737133849-b69d289a0907?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    ]
                },
                {
                    id: 3,
                    name: "Profesionální",
                    price: "1999 Kč",
                    features: [
                        "Vše z Pokročilého plánu",
                        "Certifikace po absolvování",
                        "Osobní konzultace s lektory",
                        "Exkluzivní workshopy"
                    ],
                    details: [
                        { name: "VFX a simulace", duration: "20 hodin", description: "Tvorba efektů pro filmy a hry." },
                        { name: "Architektonická vizualizace", duration: "18 hodin", description: "Realistické rendery budov." },
                        { name: "Herní design", duration: "22 hodin", description: "Vytvořte assety pro herní enginy." },
                        { name: "Portfolio Masterclass", duration: "15 hodin", description: "Vytvořte profesionální portfolio." }
                    ],
                    images: [
                        "https://images.unsplash.com/photo-1618843473805-5ca896816e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1622737133849-b69d289a0907?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    ]
                }
            ];

            const lessons = [
                { id: 1, planId: 1, title: "Základy rozhraní Blenderu", description: "Seznámení s nástroji a pracovním prostředím.", task: "Vytvořte jednoduchý 3D objekt (např. kostku) a uložte projekt.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 2, planId: 1, title: "Modelování základních tvarů", description: "Techniky pro vytváření jednoduchých modelů.", task: "Vytvořte model vázy pomocí základních nástrojů.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 3, planId: 1, title: "Úvod do texturování", description: "Jak aplikovat textury na 3D modely.", task: "Přidejte texturu na váš model vázy.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 4, planId: 1, title: "Základní osvětlení", description: "Nastavení světel pro lepší vzhled scény.", task: "Nastavte scénu s jedním světelným zdrojem.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 5, planId: 1, title: "První render", description: "Jak exportovat váš model jako obrázek.", task: "Vyrenderujte váš model a uložte výsledek.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 6, planId: 2, title: "Pokročilé modelování", description: "Detailní modelování složitějších objektů.", task: "Vytvořte model auta s detaily.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 7, planId: 2, title: "Animace objektů", description: "Základy pohybu a keyframing.", task: "Animujte pohyb vašeho modelu auta.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 8, planId: 2, title: "Vytváření shaderů", description: "Jak vytvořit vlastní materiály.", task: "Navrhněte kovový shader pro váš model.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 9, planId: 2, title: "Dynamické osvětlení", description: "Techniky pro realistické světlo.", task: "Nastavte scénu s dynamickým osvětlením.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 10, planId: 2, title: "Rigging základů", description: "Příprava modelu pro animaci.", task: "Vytvořte jednoduchý rig pro objekt.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 11, planId: 2, title: "Pokročilé textury", description: "Vytváření komplexních textur.", task: "Přidejte detailní texturu na model.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 12, planId: 2, title: "Export animací", description: "Jak uložit animace pro další použití.", task: "Exportujte animaci vašeho modelu.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 13, planId: 3, title: "VFX: Částicové systémy", description: "Tvorba efektů jako oheň nebo kouř.", task: "Vytvořte částicový efekt ohně.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 14, planId: 3, title: "Simulace fyziky", description: "Pád objektů a kolize.", task: "Nasimulujte pád kostky na zem.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 15, planId: 3, title: "Architektonické rendery", description: "Realistické vizualizace budov.", task: "Vytvořte render jednoduchého domu.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 16, planId: 3, title: "Herní assety", description: "Vytváření modelů pro hry.", task: "Navrhněte herní objekt (např. zbraň).", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 17, planId: 3, title: "Pokročilé VFX", description: "Komplexní efekty pro filmy.", task: "Vytvořte efekt exploze.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 18, planId: 3, title: "Optimalizace modelů", description: "Zmenšení polygonů pro hry.", task: "Optimalizujte váš herní model.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 19, planId: 3, title: "Portfolio: Prezentace", description: "Jak připravit profesionální portfolio.", task: "Sestavte portfolio ze svých projektů.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" },
                { id: 20, planId: 3, title: "Finální projekt", description: "Kompletní scéna od návrhu po render.", task: "Vytvořte finální scénu s animací.", slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000" }
            ];

            const freePresentation = {
                title: "Ukázka: Základy rozhraní Blenderu",
                description: "Vítejte v naší ukázkové lekci! Tato prezentace vás seznámí s úplnými základy rozhraní Blenderu.",
                slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vTAvUPUFFxmc4pqoTxwUzZrzqW9H5HGea9jWHKy9HD8PQp2Xg-sOOi0Iiqfuq2eqCwTqOe2zl-vEE8f/embed?start=false&loop=false&delayms=60000"
            };

            const handleLogin = (e) => {
                e.preventDefault();
                setError("");
                if (username && password) {
                    if (username === "admin" && password === "j2wEUHNcyj5X0Z5Mz9XD") {
                        setIsAdmin(true);
                        setIsLoggedIn(true);
                        setCurrentUser("admin");
                        setShowWelcome(true);
                        setUsername("");
                        setPassword("");
                        setShowLogin(false);
                        setMenuOpen(false);
                    } else if (users[username] && users[username] === password) {
                        setIsLoggedIn(true);
                        setCurrentUser(username);
                        setShowWelcome(true);
                        setUsername("");
                        setPassword("");
                        setShowLogin(false);
                        setMenuOpen(false);
                    } else {
                        setError("Nesprávné uživatelské jméno nebo heslo.");
                    }
                } else {
                    setError("Vyplňte všechna pole.");
                }
            };

            const handleRegister = (e) => {
                e.preventDefault();
                setError("");
                if (username && password) {
                    if (users[username]) {
                        setError("Uživatelské jméno již existuje.");
                    } else {
                        setUsers((prev) => ({ ...prev, [username]: password }));
                        setIsLoggedIn(true);
                        setCurrentUser(username);
                        setShowWelcome(true);
                        setUsername("");
                        setPassword("");
                        setShowLogin(false);
                        setMenuOpen(false);
                    }
                } else {
                    setError("Vyplňte všechna pole.");
                }
            };

            const handleLogout = () => {
                setIsLoggedIn(false);
                setIsAdmin(false);
                setCurrentUser(null);
                setShowLogin(false);
                setShowWelcome(false);
                setMenuOpen(false);
                setSelectedPlan(null);
                setShowPlanDetails(null);
                setShowTask(null);
                setShowPresentationSlides(null);
            };

            const scrollToSection = (id) => {
                document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
            };

            const toggleMenu = () => {
                setMenuOpen(!menuOpen);
            };

            const goToHome = () => {
                setShowWelcome(false);
            };

            const goToProfile = () => {
                setShowWelcome(true);
            };

            const handlePurchase = (plan) => {
                setSelectedPlan(plan);
            };

            const confirmPurchase = () => {
                setPurchasedPlans((prev) => ({
                    ...prev,
                    [currentUser]: [...(prev[currentUser] || []), selectedPlan]
                }));
                alert(`Děkujeme za zakoupení plánu ${selectedPlan.name}!`);
                setSelectedPlan(null);
            };

            const cancelPurchase = () => {
                setSelectedPlan(null);
            };

            const showDetails = (plan) => {
                setShowPlanDetails(plan);
            };

            const closeDetails = () => {
                setShowPlanDetails(null);
            };

            const launchPresentation = (slidesUrl) => {
                setShowPresentationSlides(slidesUrl);
            };

            const closePresentation = () => {
                setShowPresentationSlides(null);
            };

            const startTask = (lesson) => {
                setShowTask(lesson);
            };

            const closeTask = () => {
                setShowTask(null);
            };

            const closeFreePresentation = () => {
                setShowFreePresentation(false);
                setShowPresentationSlides(null);
            };

            const isPlanPurchased = (planId) => {
                return purchasedPlans[currentUser]?.some((plan) => plan.id === planId);
            };

            function Carousel({ images }) {
                const [currentIndex, setCurrentIndex] = useState(0);

                useEffect(() => {
                    const interval = setInterval(() => {
                        setCurrentIndex((prev) => (prev + 1) % images.length);
                    }, 5000);
                    return () => clearInterval(interval);
                }, [images]);

                const prevImage = () => {
                    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                };

                const nextImage = () => {
                    setCurrentIndex((prev) => (prev + 1) % images.length);
                };

                return (
                    <div className="carousel">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Slide ${index}`}
                                className={index === currentIndex ? 'active' : ''}
                            />
                        ))}
                        <button className="carousel-button prev" onClick={prevImage}>❮</button>
                        <button className="carousel-button next" onClick={nextImage}>❯</button>
                    </div>
                );
            }

            return (
                <div>
                    {isLoggedIn && showWelcome && !selectedPlan && !showPlanDetails && !showTask && !showPresentationSlides ? (
                        <div className="welcome-section">
                            <h1>Vítejte, {currentUser}!</h1>
                            <p className="subtitle">Jste přihlášeni do Blender Mastery Academy. Prozkoumejte naše kurzy nebo spravujte svůj účet.</p>
                            {isAdmin ? (
                                <div>
                                    <h2>Admin Panel</h2>
                                    <p>Zde můžete spravovat kurzy a uživatele (funkce připravena pro budoucí rozšíření).</p>
                                </div>
                            ) : (
                                <>
                                    <p>Vyberte si jeden z našich plánů a začněte svou cestu s Blenderem!</p>
                                    <div className="purchased-plans">
                                        <h2 className="section-title">Vaše zakoupené plány</h2>
                                        {purchasedPlans[currentUser] && purchasedPlans[currentUser].length > 0 ? (
                                            purchasedPlans[currentUser].map((plan, index) => (
                                                <div key={index} className="purchased-plan-card">
                                                    <h3>{plan.name}</h3>
                                                    <p><strong>Cena:</strong> {plan.price}</p>
                                                    <ul>
                                                        {plan.features.map((feature, i) => (
                                                            <li key={i}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Zatím jste si žádný plán nezakoupili.</p>
                                        )}
                                    </div>
                                    <div className="lessons">
                                        <h2 className="section-title">Vaše lekce</h2>
                                        {purchasedPlans[currentUser] && purchasedPlans[currentUser].length > 0 ? (
                                            <div className="lessons-grid">
                                                {lessons
                                                    .filter((lesson) => purchasedPlans[currentUser].some((plan) => plan.id === lesson.planId))
                                                    .map((lesson) => (
                                                        <div key={lesson.id} className="lesson-card">
                                                            <h3 className="lesson-title">{lesson.title}</h3>
                                                            <p className="lesson-description">{lesson.description}</p>
                                                            <div className="flex justify-center gap-4">
                                                                <button className="cta-button" onClick={() => launchPresentation(lesson.slidesUrl)}>
                                                                    Spustit prezentaci
                                                                </button>
                                                                <button className="secondary-button" onClick={() => startTask(lesson)}>
                                                                    Vypracovat úkol
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        ) : (
                                            <p>Pro přístup k lekcím si zakupte některý z plánů.</p>
                                        )}
                                    </div>
                                </>
                            )}
                            <button className="cta-button" style={{ margin: '20px' }} onClick={goToHome}>
                                Přejít na domovskou stránku
                            </button>
                            <button className="cta-button" style={{ margin: '20px' }} onClick={handleLogout}>
                                Odhlásit se
                            </button>
                        </div>
                    ) : selectedPlan ? (
                        <div className="purchase-dialog">
                            <h2 className="section-title">Potvrzení nákupu</h2>
                            <p><strong>Plán:</strong> {selectedPlan.name}</p>
                            <p><strong>Cena:</strong> {selectedPlan.price}</p>
                            <p className="subtitle">Opravdu chcete zakoupit tento plán?</p>
                            <div className="flex justify-between mt-6">
                                <button className="cta-button" onClick={confirmPurchase}>
                                    Potvrdit
                                </button>
                                <button className="cta-button bg-gray-500 hover:bg-gray-600" onClick={cancelPurchase}>
                                    Zrušit
                                </button>
                            </div>
                        </div>
                    ) : showPlanDetails ? (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="modal-close" onClick={closeDetails}>×</button>
                                <h2 className="section-title">{showPlanDetails.name}</h2>
                                <p className="plan-price">{showPlanDetails.price}</p>
                                <h3>Obsah plánu:</h3>
                                <ul>
                                    {showPlanDetails.details.map((course, index) => (
                                        <li key={index}>
                                            <strong>{course.name}</strong> ({course.duration})<br />
                                            {course.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : showTask ? (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="modal-close" onClick={closeTask}>×</button>
                                <h2 className="section-title">Úkol: {showTask.title}</h2>
                                <p className="subtitle">{showTask.description}</p>
                                <p><strong>Zadání:</strong> {showTask.task}</p>
                                <button className="cta-button" style={{ marginTop: '20px' }} onClick={closeTask}>
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    ) : showFreePresentation ? (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="modal-close" onClick={closeFreePresentation}>×</button>
                                <h2 className="section-title">{freePresentation.title}</h2>
                                <p className="subtitle">
                                    {freePresentation.description}<br />
                                    <em>Toto je pouze ukázka – nejjednodušší model v naší sbírce. Pro plný přístup se přihlaste a zakupte plán.</em>
                                </p>
                                <iframe
                                    src={freePresentation.slidesUrl}
                                    className="slides-iframe"
                                    allowFullScreen
                                ></iframe>
                                <button className="cta-button" style={{ marginTop: '20px' }} onClick={closeFreePresentation}>
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    ) : showPresentationSlides ? (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="modal-close" onClick={closePresentation}>×</button>
                                <h2 className="section-title">Prezentace</h2>
                                <iframe
                                    src={showPresentationSlides}
                                    className="slides-iframe"
                                    allowFullScreen
                                ></iframe>
                                <button className="cta-button" style={{ marginTop: '20px' }} onClick={closePresentation}>
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    ) : showLogin ? (
                        <div className="login-form">
                            <h2 className="section-title">{isRegistering ? "Registrace" : "Přihlášení"}</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Uživatelské jméno"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Heslo"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    onClick={isRegistering ? handleRegister : handleLogin}
                                    className="w-full p-3 rounded-lg cta-button"
                                >
                                    {isRegistering ? "Zaregistrovat se" : "Přihlásit se"}
                                </button>
                                {error && <p className="error-message">{error}</p>}
                                <button
                                    className="toggle-button"
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {isRegistering ? "Již máte účet? Přihlásit se" : "Nemáte účet? Zaregistrovat se"}
                                </button>
                                <button
                                    onClick={() => setShowLogin(false)}
                                    className="w-full p-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
                                >
                                    Zrušit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <nav className="navbar">
                                <div className="logo-container">
                                    <img src="https://via.placeholder.com/40" alt="Blender Mastery Academy Logo" className="logo-image" />
                                    <div className="logo-text">Blender Mastery Academy</div>
                                </div>
                                <div className="hamburger" onClick={toggleMenu}>☰</div>
                                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                                    <a onClick={() => scrollToSection('plans')}>Plány</a>
                                    <a onClick={() => scrollToSection('courses')}>Kurzy</a>
                                    <a onClick={() => scrollToSection('classroom')}>Virtuální třída</a>
                                    <a onClick={() => scrollToSection('reviews')}>Hodnocení</a>
                                    <a onClick={() => scrollToSection('faq')}>FAQ</a>
                                </div>
                                <button className="cta-button" onClick={isLoggedIn ? goToProfile : () => setShowLogin(true)}>
                                    {isLoggedIn ? "Můj profil" : "Přihlásit se"}
                                </button>
                            </nav>

                            <section className="hero" id="hero">
                                <div className="hero-content">
                                    <h1>Zvládněte Blender od základů po profesionála</h1>
                                    <p className="subtitle">Naše online platforma nabízí interaktivní kurzy Blenderu vedené experty. Naučte se 3D modelování, animace a renderování s flexibilním rozvrhem a podporou komunity.</p>
                                    <button className="cta-button" style={{ padding: '15px 30px', fontSize: '18px' }} onClick={() => setShowFreePresentation(true)}>
                                        Začít zdarma
                                    </button>
                                </div>
                            </section>

                            <section className="plans" id="plans">
                                <h2 className="section-title">Naše plány</h2>
                                <div className="plans-grid">
                                    {plans.map((plan) => (
                                        <div key={plan.id} className="plan-card">
                                            <h3 className="plan-title">{plan.name}</h3>
                                            <p className="plan-price">{plan.price}</p>
                                            <ul className="plan-features">
                                                {plan.features.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                            <div className="flex justify-center gap-4">
                                                {isLoggedIn ? (
                                                    isPlanPurchased(plan.id) ? (
                                                        <button className="purchased-button">
                                                            Zaplaceno ✔
                                                        </button>
                                                    ) : (
                                                        <button className="cta-button" onClick={() => handlePurchase(plan)}>
                                                            Koupit
                                                        </button>
                                                    )
                                                ) : (
                                                    <button className="cta-button" onClick={() => setShowLogin(true)}>
                                                        Přihlásit se
                                                    </button>
                                                )}
                                                <button className="secondary-button" onClick={() => showDetails(plan)}>
                                                    Zobrazit obsah
                                                </button>
                                            </div>
                                            <Carousel images={plan.images} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="courses" id="courses">
                                <h2 className="section-title">Proč zvolit Blender Mastery Academy?</h2>
                                <div className="courses-grid">
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Kurzy vedené experty</h3>
                                        <p>Učte se od profesionálů s dlouholetou praxí v Blenderu a 3D designu.</p>
                                    </div>
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1618843473805-5ca896816e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Flexibilní učení</h3>
                                        <p>Přístup ke kurzům kdykoliv a odkudkoliv, přizpůsobený vašemu tempu.</p>
                                    </div>
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1622737133849-b69d289a0907?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Praktické projekty</h3>
                                        <p>Vytvořte vlastní 3D modely a animace, které posílí vaše portfolio.</p>
                                    </div>
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Globální komunita</h3>
                                        <p>Připojte se k tisícům studentů a sdílejte své projekty a zkušenosti.</p>
                                    </div>
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Průběžná zpětná vazba</h3>
                                        <p>Získejte individuální hodnocení svých prací od lektorů.</p>
                                    </div>
                                    <div className="course-card">
                                        <img src="https://images.unsplash.com/photo-1618843473805-5ca896816e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="3D Icon" className="course-image" />
                                        <h3 className="course-title">Certifikace</h3>
                                        <p>Po absolvování obdržíte certifikát pro váš profesní růst.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="classroom-section" id="classroom">
                                <h2 className="section-title">Vaše virtuální třída</h2>
                                <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
                                    Intuitivní prostředí s videolekcemi, kvízy a projekty, které vám pomohou rychle se učit.
                                </p>
                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="BMA Classroom" className="classroom-image" />
                            </section>

                            <section className="reviews" id="reviews">
                                <h2 className="section-title">Co říkají naši studenti</h2>
                                <div className="review-grid">
                                    <div className="review-card">
                                        <p className="review-text">"Za 3 měsíce jsem se naučil vytvářet profesionální animace. Lektoři jsou skvělí a podpora je bezkonkurenční."</p>
                                        <p className="review-author">- Tomáš P., Praha</p>
                                    </div>
                                    <div className="review-card">
                                        <p className="review-text">"Praktické projekty mi pomohly získat práci jako 3D designér. Tuhle akademii doporučuji všem!"</p>
                                        <p className="review-author">- Lucie M., Brno</p>
                                    </div>
                                    <div className="review-card">
                                        <p className="review-text">"Flexibilní kurzy mi umožnily učit se po práci. Moje portfolio je teď na úplně jiné úrovni."</p>
                                        <p className="review-author">- Jakub S., Ostrava</p>
                                    </div>
                                </div>
                            </section>

                            <section className="cta-section" id="faq">
                                <h2 className="section-title">Začněte svou cestu s Blenderem</h2>
                                <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
                                    Přihlaste se zdarma a objevte svůj potenciál v 3D designu s našimi kurzy.
                                </p>
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Unlock Learning" className="cta-image" />
                                <div className="stats">
                                    <div className="stat-item">
                                        <div className="stat-number">100+</div>
                                        <p>Spokojených studentů</p>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">50+</div>
                                        <p>Hodin kurzů</p>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-number">92%</div>
                                        <p>Úspěšnost absolventů</p>
                                    </div>
                                </div>
                                <button className="cta-button" style={{ padding: '15px 40px', fontSize: '20px' }} onClick={() => setShowLogin(true)}>
                                    Zaregistrovat se
                                </button>
                            </section>

                            <footer>
                                <div className="logo" style={{ fontSize: '28px' }}>Blender Mastery Academy</div>
                                <p>Vaše brána k profesionálnímu 3D designu</p>
                                <div className="social-links">
                                    <a href="#">📱 Telegram</a>
                                    <a href="#">🐦 Twitter</a>
                                    <a href="#">💬 Discord</a>
                                    <a href="#">📧 Email</a>
                                </div>
                                <p className="disclaimer">
                                    Blender Mastery Academy nabízí vzdělávací obsah pro osobní a profesní rozvoj. Úspěch závisí na individuálním úsilí. 
                                    © 2025 Blender Mastery Academy. Všechna práva vyhrazena.
                                </p>
                            </footer>
                        </>
                    )}
                </div>
            );
        }

        ReactDOM.render(<App />, document.getElementById('root'));
