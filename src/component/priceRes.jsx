import { useState } from "react";
import { recyclers } from "../data/recycler";
import "./priceRes.css";

 function PriceResult({
  analysis,
  capturedImage,
  onBack,
  language,
  onHearSafety
}) {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [collectorPrice, setCollectorPrice] = useState("");
  const [showRecyclers, setShowRecyclers] = useState(false);

  // NEW STATES
  const [selectedRecycler, setSelectedRecycler] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Stores the recycler whose pickup has been successfully booked
  const [bookedRecycler, setBookedRecycler] = useState(null);
  const [handoverRecord, setHandoverRecord] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

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
      bookPickup: "Book Pickup",

      kg: "kg",

      contactRecycler: "Contact Recycler",
      phone: "Phone",
      callRecycler: "Call Recycler",
      close: "Close",

      bookTitle: "Book Scrap Pickup",
      bookingWith: "Booking with",
      name: "Your Name",
      mobile: "Mobile Number",
      address: "Pickup Address",
      date: "Pickup Date",
      time: "Pickup Time",
      confirmBooking: "Confirm Booking",
      bookingSuccess: "Pickup booked successfully!",
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
      bookPickup: "पिकअप बुक करें",

      kg: "किलो",

      contactRecycler: "रीसाइक्लर से संपर्क करें",
      phone: "फोन",
      callRecycler: "रीसाइक्लर को कॉल करें",
      close: "बंद करें",

      bookTitle: "कबाड़ पिकअप बुक करें",
      bookingWith: "बुकिंग",
      name: "आपका नाम",
      mobile: "मोबाइल नंबर",
      address: "पिकअप का पता",
      date: "पिकअप की तारीख",
      time: "पिकअप का समय",
      confirmBooking: "बुकिंग की पुष्टि करें",
      bookingSuccess: "पिकअप सफलतापूर्वक बुक हो गया!",
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
      bookPickup: "पिकअप बुक करा",

      kg: "किलो",

      contactRecycler: "रीसायकलरशी संपर्क साधा",
      phone: "फोन",
      callRecycler: "रीसायकलरला कॉल करा",
      close: "बंद करा",

      bookTitle: "भंगार पिकअप बुक करा",
      bookingWith: "बुकिंग",
      name: "तुमचे नाव",
      mobile: "मोबाइल नंबर",
      address: "पिकअपचा पत्ता",
      date: "पिकअपची तारीख",
      time: "पिकअपची वेळ",
      confirmBooking: "बुकिंगची पुष्टी करा",
      bookingSuccess: "पिकअप यशस्वीरित्या बुक झाले!",
    },
  };

  // Select current language
  const t = translations[language] || translations.en;

  // =====================================================
  // CONTACT HANDLER
  // =====================================================

  const handleContact = (recycler) => {
    setSelectedRecycler(recycler);
    setShowContact(true);
  };

  // =====================================================
  // BOOKING HANDLER
  // =====================================================

  const handleBookPickup = (recycler) => {
    setSelectedRecycler(recycler);
    setShowBooking(true);
  };

  // =====================================================
  // CONFIRM BOOKING
  // =====================================================
const handleBookingSubmit = (e) => {
  e.preventDefault();

  const record = {
    lotId: `KC-2026-${Date.now().toString().slice(-5)}`,
    referenceId: `HR-${Date.now().toString().slice(-5)}`,
    material: material,
    weight: weight,
    value: estimatedValue,
    recycler: selectedRecycler.name,
    timestamp: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  setHandoverRecord(record);

  setBookedRecycler(selectedRecycler);
  setShowBooking(false);
  setShowRecyclers(false);

  alert(t.bookingSuccess);
};
  return (
    <div className="price-page">

      {/* =====================================================
          BOOKED PICKUP SCREEN
          After booking, only the selected recycler is shown.
      ===================================================== */}

      {bookedRecycler ? (
        <div
          className="booked-pickup-screen"
          style={{
            background: "#087443",
            color: "#ffffff",
            minHeight: "100%",
            borderRadius: "20px",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 14px",
                borderRadius: "50%",
                background: "#ffffff",
                color: "#087443",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                fontWeight: "700",
              }}
            >
              ✓
            </div>

            <h1
              style={{
                margin: "0 0 8px",
                color: "#ffffff",
                fontSize: "28px",
              }}
            >
             {handoverRecord
  ? language === "hi"
    ? "हैंडओवर रिकॉर्ड तैयार"
    : language === "mr"
      ? "हँडओव्हर रेकॉर्ड तयार"
      : "Handover Record Created"
  : t.bookingSuccess}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#e7fff2",
                fontSize: "15px",
              }}
            >
              {t.bookingWith}{" "}
              <strong>{bookedRecycler.name}</strong>
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              color: "#173b2d",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "62px",
                  height: "62px",
                  flexShrink: 0,
                  borderRadius: "16px",
                  background: "#087443",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                {bookedRecycler.name.charAt(0)}
              </div>

              <div>
                <h2
                  style={{
                    margin: "0 0 7px",
                    color: "#087443",
                    fontSize: "21px",
                  }}
                >
                  {bookedRecycler.name}
                </h2>

                <p style={{ margin: "4px 0", color: "#49675a" }}>
                  📍 {bookedRecycler.location}
                </p>

                <p style={{ margin: "4px 0", color: "#49675a" }}>
                  {bookedRecycler.distance} {t.away}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                background: "#e7f8ef",
                color: "#087443",
                borderRadius: "20px",
                padding: "7px 14px",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              ✓ BOOKED
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <div
                style={{
                  background: "#f5faf7",
                  border: "1px solid #dcebe3",
                  borderRadius: "12px",
                  padding: "13px",
                }}
              >
                <small style={{ color: "#658174" }}>{t.name}</small>
                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#173b2d",
                  }}
                >
                  {bookingDetails.name}
                </strong>
              </div>

              <div
                style={{
                  background: "#f5faf7",
                  border: "1px solid #dcebe3",
                  borderRadius: "12px",
                  padding: "13px",
                }}
              >
                <small style={{ color: "#658174" }}>{t.phone}</small>
                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#173b2d",
                  }}
                >
                  {bookingDetails.phone}
                </strong>
              </div>

              <div
                style={{
                  background: "#f5faf7",
                  border: "1px solid #dcebe3",
                  borderRadius: "12px",
                  padding: "13px",
                }}
              >
                <small style={{ color: "#658174" }}>{t.date}</small>
                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#173b2d",
                  }}
                >
                  {bookingDetails.date}
                </strong>
              </div>

              <div
                style={{
                  background: "#f5faf7",
                  border: "1px solid #dcebe3",
                  borderRadius: "12px",
                  padding: "13px",
                }}
              >
                <small style={{ color: "#658174" }}>{t.time}</small>
                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#173b2d",
                  }}
                >
                  {bookingDetails.time}
                </strong>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  background: "#f5faf7",
                  border: "1px solid #dcebe3",
                  borderRadius: "12px",
                  padding: "13px",
                }}
              >
                <small style={{ color: "#658174" }}>{t.address}</small>
                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "#173b2d",
                  }}
                >
                  {bookingDetails.address}
                </strong>
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "12px",
                background: "#087443",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>{t.estimated}</span>
              <strong>
                ₹{estimatedValue.toLocaleString("en-IN")}
              </strong>
            </div>
            {handoverRecord && (
  <div
    style={{
      marginTop: "18px",
      padding: "18px",
      borderRadius: "16px",
      background: "#eef9f3",
      border: "1px solid #cce9d9",
      color: "#173b2d",
    }}
  >
    <h3
      style={{
        margin: "0 0 16px",
        color: "#087443",
      }}
    >
      ♻️ Digital Handover Record
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}
    >
      <div>
        <small>Lot ID</small>
        <strong style={{ display: "block" }}>
          {handoverRecord.lotId}
        </strong>
      </div>

      <div>
        <small>Reference</small>
        <strong style={{ display: "block" }}>
          {handoverRecord.referenceId}
        </strong>
      </div>

      <div>
        <small>Material</small>
        <strong style={{ display: "block" }}>
          {handoverRecord.material}
        </strong>
      </div>

      <div>
        <small>Weight</small>
        <strong style={{ display: "block" }}>
          {handoverRecord.weight} kg
        </strong>
      </div>

      <div>
        <small>Estimated Value</small>
        <strong style={{ display: "block" }}>
          ₹{handoverRecord.value.toLocaleString("en-IN")}
        </strong>
      </div>

      <div>
        <small>Recorded</small>
        <strong style={{ display: "block" }}>
          {handoverRecord.timestamp}
        </strong>
      </div>
    </div>

    <div
      style={{
        marginTop: "16px",
        paddingTop: "14px",
        borderTop: "1px solid #cce9d9",
        fontSize: "13px",
        lineHeight: "1.8",
      }}
    >
      ✓ Material identified
      <br />
      ✓ Recycler selected
      <br />
      ✓ Pickup scheduled
      <br />
      ✓ Handover reference generated
    </div>
  </div>
)}

            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={() => {
                setBookedRecycler(null);
                setShowRecyclers(true);
                setSelectedRecycler(null);
              }}
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "13px 18px",
                border: "2px solid #087443",
                borderRadius: "12px",
                background: "#ffffff",
                color: "#087443",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      ) : (
        <>
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
    SAFETY / HEAR
===================================================== */}

<div className="safety-card">

  <div className="safety-card-header">
    <span className="safety-icon">⚠️</span>

    <div>
      <h3>
        {language === "hi"
          ? "सुरक्षित तरीके से संभालें"
          : language === "mr"
            ? "सुरक्षितपणे हाताळा"
            : "Safe Handling"}
      </h3>

      <p>
        {language === "hi"
          ? "महत्वपूर्ण सुरक्षा जानकारी"
          : language === "mr"
            ? "महत्त्वाची सुरक्षा माहिती"
            : "Important safety guidance"}
      </p>
    </div>
  </div>

  <p className="safety-message">

    {material === "Battery"
      ? language === "hi"
        ? "बैटरी को गर्मी से दूर रखें। इसे जलाएं, तोड़ें या छेद न करें।"
        : language === "mr"
          ? "बॅटरीला उष्णतेपासून दूर ठेवा. ती जाळू, फोडू किंवा छेदू नका."
          : "Keep batteries away from heat. Do not burn, crush or puncture them."

      : material === "PCB"
        ? language === "hi"
          ? "इलेक्ट्रॉनिक बोर्ड को जलाएं या तोड़ें नहीं। इन्हें सावधानी से संभालें।"
          : language === "mr"
            ? "इलेक्ट्रॉनिक बोर्ड जाळू किंवा तोडू नका. काळजीपूर्वक हाताळा."
            : "Do not burn or break electronic boards. Handle them carefully."

        : language === "hi"
          ? "इस सामग्री को सावधानी से संभालें और इसे जलाएं नहीं।"
          : language === "mr"
            ? "ही सामग्री काळजीपूर्वक हाताळा आणि ती जाळू नका."
            : "Handle this material safely and do not burn it."
    }

  </p>

  <button
    type="button"
    className="hear-button"
    onClick={onHearSafety}
  >
    🔊{" "}
    {language === "hi"
      ? "सुनें"
      : language === "mr"
        ? "ऐका"
        : "Hear"}
  </button>

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

                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="unit-select"
                >
                  <option value="kg">
                    {language === "hi" ? "किलो" : language === "mr" ? "किलो" : "Kg"}
                  </option>

                  <option value="piece">
                    {language === "hi" ? "पीस" : language === "mr" ? "पीस" : "Piece"}
                  </option>
                </select>

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


                      {/* ================= ACTION BUTTONS ================= */}

                      <div className="recycler-actions">

                        {/* CONTACT */}

                        <button
                          type="button"
                          className="contact-button"
                          onClick={() =>
                            handleContact(recycler)
                          }
                        >
                          {t.contact} →
                        </button>


                        {/* BOOK PICKUP - ALL RECYCLERS */}

                        <button
                          type="button"
                          className="book-button"
                          onClick={() =>
                            handleBookPickup(recycler)
                          }
                        >
                          {t.bookPickup} →
                        </button>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>


          {/* =====================================================
          CONTACT MODAL
      ===================================================== */}

          {showContact && selectedRecycler && (

            <div className="modal-overlay">

              <div className="contact-modal">

                <button
                  type="button"
                  className="modal-close"
                  onClick={() =>
                    setShowContact(false)
                  }
                >
                  ×
                </button>

                <div className="modal-avatar">
                  {selectedRecycler.name.charAt(0)}
                </div>

                <h2>
                  {selectedRecycler.name}
                </h2>

                <p>
                  📍 {selectedRecycler.location}
                </p>

                <p className="phone-number">
                  📞{" "}
                  {selectedRecycler.phone ||
                    "9876543210"}
                </p>

                <a
                  href={`tel:${selectedRecycler.phone ||
                    "9876543210"
                    }`}
                  className="call-button"
                >
                  📞 {t.callRecycler}
                </a>

              </div>

            </div>

          )}


          {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

          {showBooking && selectedRecycler && (

            <div className="modal-overlay">

              <div className="booking-modal">

                <button
                  type="button"
                  className="modal-close"
                  onClick={() =>
                    setShowBooking(false)
                  }
                >
                  ×
                </button>

                <h2>
                  {t.bookTitle}
                </h2>

                <p>
                  {t.bookingWith}{" "}
                  <strong>
                    {selectedRecycler.name}
                  </strong>
                </p>


                <form onSubmit={handleBookingSubmit}>

                  {/* NAME */}

                  <input
                    type="text"
                    placeholder={t.name}
                    required
                    value={bookingDetails.name}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        name: e.target.value,
                      })
                    }
                  />


                  {/* MOBILE */}

                  <input
                    type="tel"
                    placeholder={t.mobile}
                    required
                    value={bookingDetails.phone}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        phone: e.target.value,
                      })
                    }
                  />


                  {/* ADDRESS */}

                  <textarea
                    placeholder={t.address}
                    required
                    value={bookingDetails.address}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        address: e.target.value,
                      })
                    }
                  />


                  {/* DATE */}

                  <label>
                    {t.date}
                  </label>

                  <input
                    type="date"
                    required
                    value={bookingDetails.date}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        date: e.target.value,
                      })
                    }
                  />


                  {/* TIME */}

                  <label>
                    {t.time}
                  </label>

                  <input
                    type="time"
                    required
                    value={bookingDetails.time}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        time: e.target.value,
                      })
                    }
                  />


                  {/* CONFIRM BOOKING */}

                  <button
                    type="submit"
                    className="confirm-booking-button"
                  >
                    ✓ {t.confirmBooking}
                  </button>

                </form>

              </div>

            </div>

          )}

        </>
      )
      }

    </div >
  );
}

export default PriceResult;


