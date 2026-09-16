
import { useRef, useState } from "react";
import PriceResult from "../component/priceRes";

import {
  Camera,
  CheckCircle2,
  MapPin,
  IndianRupee,
  ShieldCheck,
  X,
  RotateCcw,
} from "lucide-react";
import "./Home.css";


export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [language, setLanguage] = useState("en");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPriceResult, setShowPriceResult] = useState(false);

  const isHindi = language === "hi";
  const isMarathi = language === "mr";
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Frontend-only reference rates for the internal prototype.
  const MATERIAL_RATES = {
    "Mobile": { ratePerKg: 120, unit: "piece" },
    "Laptop / Computer": { ratePerKg: 250, unit: "piece" },
    "CRT TV": { ratePerKg: 8, unit: "kg" },
    "LCD / LED": { ratePerKg: 300, unit: "piece" },
    "PCB": { ratePerKg: 180, unit: "kg" },
    "Cable / Wire": { ratePerKg: 120, unit: "kg" },
    "Battery": { ratePerKg: 80, unit: "kg" },
    "Printer": { ratePerKg: 15, unit: "kg" },
    "Large Appliance": { ratePerKg: 12, unit: "kg" },
    "Other E-waste": { ratePerKg: 50, unit: "kg" },
  };


  const ALLOWED_CATEGORIES = Object.keys(MATERIAL_RATES);



  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCapturedImage(reader.result);
      setAiAnalysis(null);
      setAnalysisError("");
      setShowPriceResult(false);
    };

    reader.readAsDataURL(file);
  };


  /* --------------------------------
     OPEN CAMERA
  -------------------------------- */

  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Camera is not supported by this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraOpen(true);

      // Give React time to render the video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current
            .play()
            .catch((error) => {
              console.error("Video play error:", error);
            });
        }
      }, 100);

    } catch (error) {
      console.error("Camera error:", error);

      alert(
        "Camera access was blocked. Please allow camera permission and try again."
      );
    }
  };


  /* --------------------------------
     CLOSE CAMERA
  -------------------------------- */

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  };


  /* --------------------------------
     CAPTURE IMAGE
  -------------------------------- */

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (!video.videoWidth || !video.videoHeight) {
      alert("Camera is still loading. Please try again.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL(
      "image/jpeg",
      0.9
    );

    setCapturedImage(image);

    closeCamera();
  };


  /* --------------------------------
     RETAKE PHOTO
  -------------------------------- */

  const retakePhoto = () => {
    setCapturedImage(null);
    setShowPriceResult(false);

    openCamera();
  };


  /* --------------------------------
     AI MATERIAL CLASSIFICATION
  -------------------------------- */

  const analyzeMaterial = async () => {
    if (!capturedImage) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setAnalysisError(
        "Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env file."
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError("");
    setShowPriceResult(false);

    try {
      const [header, base64Data] = capturedImage.split(",");
      const mimeType = header.match(/data:(.*);base64/)?.[1] || "image/jpeg";

      const prompt = `
You are an e-waste classification assistant for Kabadiwala Connect.

Analyze this image and choose EXACTLY ONE category from this list:
${ALLOWED_CATEGORIES.map((item) => `- ${item}`).join("\n")}

Return ONLY valid JSON:
{
  "category": "one allowed category",
  "subcategory": "specific item type",
  "confidence": 0.0,
  "condition": "working | non-working | unknown",
  "reason": "short visual reason"
}

Rules:
- Never invent a category outside the allowed list.
- confidence must be between 0 and 1.
- If uncertain, lower the confidence.
- Do not estimate price.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType,
                      data: base64Data,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.1,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Gemini returned an empty response.");
      }

      const result = JSON.parse(rawText);
      const rateInfo = MATERIAL_RATES[result.category];

      if (!rateInfo) {
        throw new Error("Unsupported material category returned by AI.");
      }

      setAiAnalysis({
        material: result.category,
        subcategory: result.subcategory || result.category,
        confidence: Math.round(Number(result.confidence || 0) * 100),
        ratePerKg: rateInfo.ratePerKg,
        unit: rateInfo.unit,
        condition: result.condition || "unknown",
        reason: result.reason || "",
      });

      setShowPriceResult(true);
    } catch (error) {
      console.error("Material analysis error:", error);
      setAnalysisError(
        "Could not analyze the image. Please try another clear photo."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* --------------------------------
     CONTINUE TO PRICE RESULT
  -------------------------------- */

  const continueToPrice = () => {
    if (!aiAnalysis) {
      analyzeMaterial();
      return;
    }
    setShowPriceResult(true);
  };


  /* --------------------------------
     BACK FROM PRICE RESULT
  -------------------------------- */

  const goBackFromPrice = () => {
    setShowPriceResult(false);
  };


  /*
   * IMPORTANT:
   * If Continue was clicked,
   * show the price/result screen instead
   * of rendering the Home page.
   */
  if (showPriceResult) {
    return (
      <PriceResult
        analysis={aiAnalysis}
        capturedImage={capturedImage}
        onBack={goBackFromPrice}
        language={language}
      />
    );
  }


  return (
    <main className="home">

      {/* ==================================
          HEADER
      ================================== */}

      <header className="home-header">

        <div className="home-brand">

          <div className="brand-mark">
            ♻
          </div>

          <div>
            <h1>
              Kabadiwala <span>Connect</span>
            </h1>

            <p>
              Scrap se Samriddhi tak
            </p>
          </div>

        </div>


        {/* LANGUAGE TOGGLE */}

        {/* LANGUAGE TOGGLE */}

        <div className="language-toggle">

          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => {
              console.log("English clicked");
              setLanguage("en");
            }}
          >
            EN
          </button>

          <button
            type="button"
            className={language === "hi" ? "active" : ""}
            onClick={() => {
              console.log("Hindi clicked");
              setLanguage("hi");
            }}
          >
            हिन्दी
          </button>

          <button
            type="button"
            className={language === "mr" ? "active" : ""}
            onClick={() => {
              console.log("Marathi clicked");
              setLanguage("mr");
            }}
          >
            मराठी
          </button>

        </div>

      </header>


      {/* ==================================
          HERO
      ================================== */}

      <section className="home-hero">

        <div className="hero-copy">

          <div className="welcome-pill">
            <span />
            {isHindi
              ? "आज का कबाड़, कल की कीमत"
              : isMarathi
                ? "आजचा भंगार, उद्याची किंमत"
                : "Turn scrap into value"}
          </div>


          <h2>
            {isHindi ? (
              <>
                अपने कबाड़ की
                <br />
                <span>तस्वीर लें।</span>
              </>
            ) : isMarathi ? (
              <>
                तुमच्या भंगाराचा
                <br />
                <span>फोटो घ्या.</span>
              </>
            ) : (
              <>
                Turn your scrap
                <br />
                <span>into value.</span>
              </>
            )}
          </h2>


          <p>
            {isHindi
              ? "कबाड़ की फोटो लें और हम उसकी पहचान, अनुमानित कीमत और सही रिसाइकलर खोजने में आपकी मदद करेंगे।"
              : isMarathi
                ? "भंगाराचा फोटो घ्या आणि आम्ही त्याची ओळख, अंदाजे किंमत आणि योग्य रिसायकलर शोधण्यात मदत करू."
                : "Take a photo of your scrap. We'll identify it, estimate its value and help you find the right recycler."
            }
          </p>

        </div>


        {/* ==================================
            CAMERA CARD
        ================================== */}

        {!capturedImage ? (
          <>

          <button
            type="button"
            className="camera-card"
            onClick={openCamera}
          >

            <div className="camera-glow" />

            <div className="camera-icon">
              <Camera
                size={42}
                strokeWidth={1.8}
              />
            </div>

            <div className="camera-text">

              <strong>
                {isHindi
                  ? "कबाड़ की फोटो लें"
                  : isMarathi
                    ? "भंगाराचा फोटो घ्या"
                    : "Take a photo of your scrap"}
              </strong>

              <span>
                {isHindi
                  ? "कैमरा खोलने के लिए टैप करें"
                  : isMarathi
                    ? "कॅमेरा उघडण्यासाठी टॅप करा"
                    : "Tap to open camera"}
              </span>

            </div>

            <div className="camera-arrow">
              →
            </div>

          </button>

          <label
            htmlFor="scrap-image-upload"
            style={{
              display: "block",
              marginTop: "12px",
              textAlign: "center",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Or upload a photo from your device
          </label>

          <input
            id="scrap-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          </>
        ) : (

          /* ==================================
             CAPTURED IMAGE
          ================================== */

          <div className="captured-card">

            <div className="captured-image-wrapper">

              <img
                src={capturedImage}
                alt="Captured scrap"
              />

              <div className="image-badge">
                <CheckCircle2 size={16} />
                Photo captured
              </div>

            </div>


            <div className="captured-actions">

              <button
                type="button"
                className="retake-button"
                onClick={retakePhoto}
              >
                <RotateCcw size={17} />
                Retake
              </button>


              <button
                type="button"
                className="continue-button"
                onClick={analyzeMaterial}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Material"}
                <span>{isAnalyzing ? "…" : "→"}</span>
              </button>

            </div>

          </div>

        )}


        {/* ==================================
            QUICK BENEFITS
        ================================== */}

        <div className="benefits">

          <div className="benefit">

            <div className="benefit-icon price">
              <IndianRupee size={20} />
            </div>

            <div>
              <strong>
                {isHindi ? "उचित कीमत" : isMarathi ? "योग्य किंमत" : "Fair Price"}
              </strong>

              <span>
                {isHindi
                  ? "बाज़ार दरों पर आधारित"
                  : isMarathi
                    ? "बाजारातील दरांवर आधारित"
                    : "Based on market rates"}
              </span>
            </div>

          </div>


          <div className="benefit">

            <div className="benefit-icon location">
              <MapPin size={20} />
            </div>

            <div>
              <strong>
                {isHindi ? "नज़दीकी रिसाइकलर" : isMarathi ? "जवळचा रिसायकलर" : "Nearby Recycler"}
              </strong>

              <span>
                {isHindi
                  ? "सत्यापित रिसाइकलर"
                  : isMarathi
                    ? "सत्यापित रिसायकलर"
                    : "Verified recyclers"}
              </span>
            </div>

          </div>


          <div className="benefit">

            <div className="benefit-icon safe">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>
                {isHindi ? "सुरक्षित और पारदर्शी" : isMarathi ? "सुरक्षित आणि पारदर्शक" : "Safe & Transparent"}
              </strong>

              <span>
                {isHindi
                  ? "हर हैंडओवर का रिकॉर्ड"
                  : isMarathi
                    ? "प्रत्येक हस्तांतरणाचा रेकॉर्ड"
                    : "Track every handover"}
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ==================================
          CAMERA MODAL
      ================================== */}

      {cameraOpen && (

        <div className="camera-modal">

          <div className="camera-window">

            {/* TOP BAR */}

            <div className="camera-topbar">

              <button
                type="button"
                onClick={closeCamera}
              >
                <X size={22} />
              </button>

              <span>
                {isHindi
                  ? "कबाड़ की फोटो लें"
                  : "Take Photo"}
              </span>

              <div />

            </div>


            {/* VIDEO */}

            <div className="camera-preview">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />


              {/* SCANNING FRAME */}

              <div className="scan-frame">

                <i className="corner top-left" />
                <i className="corner top-right" />
                <i className="corner bottom-left" />
                <i className="corner bottom-right" />

              </div>


              <div className="camera-hint">
                {isMarathi
                  ? "तुमचा स्क्रॅप फ्रेमच्या आत ठेवा"
                  : isHindi
                    ? "कचरे को फ्रेम के अंदर रखें"
                    : "Keep your scrap inside the frame"
                }
              </div>

            </div>


            {/* CAMERA CONTROLS */}

            <div className="camera-controls">

              <div className="camera-side-button" />

              <button
                type="button"
                className="shutter"
                onClick={capturePhoto}
              >
                <span />
              </button>

              <div className="camera-side-button" />

            </div>

          </div>

        </div>

      )}


      {/* ==================================
          HIDDEN CANVAS
      ================================== */}

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </main>
  );
}
