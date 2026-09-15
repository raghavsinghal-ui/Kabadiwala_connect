
import { useState } from "react";
import { recyclers } from "../data/recycler";
import "./priceRes.css";

function PriceResult({ analysis, onBack, language }) {
  const [weight, setWeight] = useState("");
  const [collectorPrice, setCollectorPrice] = useState("");
  const [showRecyclers, setShowRecyclers] = useState(false);

  // Get selected language from localStorage
  // If no language is selected, English will be used

  const material = analysis.material;

  // AI suggested market price
  const aiRate = analysis.ratePerKg;

  // Calculate estimated value
  const estimatedValue =
    weight && aiRate ? Number(weight) * Number(aiRate) : 0;

  // Find recyclers that accept this material
  const matchingRecyclers = recyclers
    .filter((recycler) => recycler.materials.includes(material))
    .sort((a, b) => a.distance - b.distance);

  const handleFindRecycler = () => {
    setShowRecyclers(true);
  };

  // =====================================================
  // LANGUAGE TRANSLATIONS
  // =====================================================

  const translations = {
    // ---------------- ENGLISH ----------------
    en: {
      analysis: "AI ANALYSIS",
      title: "Your scrap value",
      subtitle:
        "Review the detected material and enter your lot details.",

      detected: "AI detected",
      confidence: "confidence",
      marketRate: "AI market rate",

      lotDetails: "Lot details",
      lotSubtitle: "Tell us how much scrap you have.",

      weight: "Weight",
      expectedPrice: "Your expected price",

      estimated: "Estimated fair value",
      basedOn: "Based on AI market rate of",

      findRecycler: "Find a recycler",
      recyclerSubtitle:
        "Connect with verified recyclers near you.",

      findNearby: "Find Nearby Recyclers",

      recyclersFound: "recyclers found",
      sorted: "Sorted by distance",

      verified: "Verified",
      away: "km away",
      pickup: "Pickup available",

      offer: "Offer",
      contact: "Contact",

      kg: "kg"
    },

    // ---------------- HINDI ----------------
    hi: {
      analysis: "AI विश्लेषण",
      title: "आपके कबाड़ की कीमत",
      subtitle:
        "पहचानी गई सामग्री की समीक्षा करें और अपने कबाड़ की जानकारी दर्ज करें।",

      detected: "AI द्वारा पहचाना गया",
      confidence: "विश्वास",
      marketRate: "AI बाजार दर",

      lotDetails: "कबाड़ की जानकारी",
      lotSubtitle:
        "बताएं कि आपके पास कितना कबाड़ है।",

      weight: "वजन",
      expectedPrice: "आपकी अपेक्षित कीमत",

      estimated: "अनुमानित उचित मूल्य",
      basedOn: "AI बाजार दर के आधार पर",

      findRecycler: "रीसाइक्लर खोजें",
      recyclerSubtitle:
        "अपने आसपास के सत्यापित रीसाइक्लर्स से जुड़ें।",

      findNearby: "पास के रीसाइक्लर्स खोजें",

      recyclersFound: "रीसाइक्लर्स मिले",
      sorted: "दूरी के अनुसार",

      verified: "सत्यापित",
      away: "किमी दूर",
      pickup: "पिकअप उपलब्ध",

      offer: "ऑफर",
      contact: "संपर्क करें",

      kg: "किलो"
    },

    // ---------------- MARATHI ----------------
    mr: {
      analysis: "AI विश्लेषण",
      title: "तुमच्या भंगाराची किंमत",
      subtitle:
        "ओळखलेली सामग्री तपासा आणि तुमच्या भंगाराची माहिती भरा.",

      detected: "AI द्वारे ओळखले",
      confidence: "विश्वास पातळी",
      marketRate: "AI बाजार दर",

      lotDetails: "भंगाराची माहिती",
      lotSubtitle:
        "तुमच्याकडे किती भंगार आहे ते सांगा.",

      weight: "वजन",
      expectedPrice: "तुमची अपेक्षित किंमत",

      estimated: "अंदाजे योग्य मूल्य",
      basedOn: "AI बाजार दरावर आधारित",

      findRecycler: "रीसायकलर शोधा",
      recyclerSubtitle:
        "तुमच्या जवळील सत्यापित रीसायकलर्सशी संपर्क साधा.",

      findNearby: "जवळील रीसायकलर्स शोधा",

      recyclersFound: "रीसायकलर्स सापडले",
      sorted: "अंतरानुसार क्रमवारी",

      verified: "सत्यापित",
      away: "किमी दूर",
      pickup: "पिकअप उपलब्ध",

      offer: "ऑफर",
      contact: "संपर्क करा",

      kg: "किलो"
    }
  };

  // Select current language
  const t = translations[language] || translations.en;

  return (
    <div className="price-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="price-header">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <div>

          <span className="eyebrow">
            {t.analysis}
          </span>

          <h1>
            {t.title}
          </h1>

          <p>
            {t.subtitle}
          </p>

        </div>

      </div>


      {/* =====================================================
          AI RESULT
      ===================================================== */}

      <div className="analysis-card">

        <div className="analysis-icon">
          ✓
        </div>


        <div className="analysis-info">

          <span>
            {t.detected}
          </span>

          <h2>
            {material}
          </h2>

          <div className="confidence">

            <span>
              ●
            </span>

            {analysis.confidence}% {t.confidence}

          </div>

        </div>


        <div className="ai-rate">

          <span>
            {t.marketRate}
          </span>

          <strong>
            ₹{aiRate}
          </strong>

          <small>
            / {t.kg}
          </small>

        </div>

      </div>


      {/* =====================================================
          INPUT SECTION
      ===================================================== */}

      <div className="details-card">

        <div className="section-title">

          <span>
            01
          </span>

          <div>

            <h3>
              {t.lotDetails}
            </h3>

            <p>
              {t.lotSubtitle}
            </p>

          </div>

        </div>


        <div className="input-grid">


          {/* ================= WEIGHT ================= */}

          <div className="input-group">

            <label>
              {t.weight}
            </label>

            <div className="input-wrapper">

              <input
                type="number"
                min="0"
                placeholder="e.g. 5"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value)
                }
              />

              <span>
                {t.kg}
              </span>

            </div>

          </div>


          {/* ================= EXPECTED PRICE ================= */}

          <div className="input-group">

            <label>
              {t.expectedPrice}
            </label>

            <div className="input-wrapper">

              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="e.g. 3000"
                value={collectorPrice}
                onChange={(e) =>
                  setCollectorPrice(e.target.value)
                }
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            CALCULATED VALUE
        ===================================================== */}

        <div className="value-box">

          <div>

            <span>
              {t.estimated}
            </span>

            <p>
              {t.basedOn} ₹{aiRate}/{t.kg}
            </p>

          </div>

          <strong>
            ₹{estimatedValue.toLocaleString("en-IN")}
          </strong>

        </div>

      </div>


      {/* =====================================================
          FIND RECYCLER
      ===================================================== */}

      <div className="recycler-section">

        <div className="section-title">

          <span>
            02
          </span>

          <div>

            <h3>
              {t.findRecycler}
            </h3>

            <p>
              {t.recyclerSubtitle}
            </p>

          </div>

        </div>


        <button
          type="button"
          className="find-button"
          onClick={handleFindRecycler}
          disabled={!weight}
        >

          {t.findNearby}

          <span>
            →
          </span>

        </button>


        {/* =====================================================
            RECYCLER RESULTS
        ===================================================== */}

        {showRecyclers && (

          <div className="recycler-results">

            <div className="results-heading">

              <h3>
                {matchingRecyclers.length} {t.recyclersFound}
              </h3>

              <span>
                {t.sorted}
              </span>

            </div>


            {matchingRecyclers.map((recycler) => {

              const recyclerRate =
                recycler.pricePerKg[material] || aiRate;

              const recyclerValue =
                Number(weight) * recyclerRate;


              return (

                <div
                  className="recycler-card"
                  key={recycler.id}
                >


                  {/* ================= RECYCLER INFO ================= */}

                  <div className="recycler-main">

                    <div className="recycler-avatar">
                      {recycler.name.charAt(0)}
                    </div>


                    <div className="recycler-info">

                      <div className="recycler-name">

                        <h4>
                          {recycler.name}
                        </h4>


                        {recycler.verified && (

                          <span className="verified">

                            ✓ {t.verified}

                          </span>

                        )}

                      </div>


                      <p>
                        📍 {recycler.location}
                      </p>


                      <div className="recycler-tags">

                        <span>
                          {recycler.distance} {t.away}
                        </span>


                        {recycler.pickup && (

                          <span>
                            {t.pickup}
                          </span>

                        )}

                      </div>

                    </div>

                  </div>


                  {/* ================= OFFER ================= */}

                  <div className="offer">

                    <span>
                      {t.offer}
                    </span>

                    <strong>
                      ₹{recyclerValue.toLocaleString("en-IN")}
                    </strong>

                    <small>
                      ₹{recyclerRate}/{t.kg}
                    </small>

                  </div>


                  {/* ================= CONTACT ================= */}

                  <button
                    type="button"
                    className="contact-button"
                  >

                    {t.contact} →

                  </button>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default PriceResult;


