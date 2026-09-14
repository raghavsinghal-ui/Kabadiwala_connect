import { useRef, useState } from "react";
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

  const isHindi = language === "hi";

  /* --------------------------------
     OPEN CAMERA
  -------------------------------- */

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL("image/jpeg", 0.9);

    setCapturedImage(image);

    closeCamera();
  };


  /* --------------------------------
     RETAKE
  -------------------------------- */

  const retakePhoto = () => {
    setCapturedImage(null);
    openCamera();
  };


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

        <div className="language-toggle">

          <button
            className={!isHindi ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>

          <button
            className={isHindi ? "active" : ""}
            onClick={() => setLanguage("hi")}
          >
            हिन्दी
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
            {isHindi ? "आज का कबाड़, कल की कीमत" : "Turn scrap into value"}
          </div>


          <h2>
            {isHindi ? (
              <>
                अपने कबाड़ की
                <br />
                <span>तस्वीर लें।</span>
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
              : "Take a photo of your scrap. We'll identify it, estimate its value and help you find the right recycler."
            }
          </p>

        </div>


        {/* ==================================
            CAMERA CARD
        ================================== */}

        {!capturedImage ? (

          <button
            className="camera-card"
            onClick={openCamera}
          >

            <div className="camera-glow" />

            <div className="camera-icon">
              <Camera size={42} strokeWidth={1.8} />
            </div>

            <div className="camera-text">

              <strong>
                {isHindi
                  ? "कबाड़ की फोटो लें"
                  : "Take a photo of your scrap"
                }
              </strong>

              <span>
                {isHindi
                  ? "कैमरा खोलने के लिए टैप करें"
                  : "Tap to open camera"
                }
              </span>

            </div>

            <div className="camera-arrow">
              →
            </div>

          </button>

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
                className="retake-button"
                onClick={retakePhoto}
              >
                <RotateCcw size={17} />
                Retake
              </button>

              <button
                className="continue-button"
              >
                Continue
                <span>→</span>
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
                {isHindi ? "उचित कीमत" : "Fair Price"}
              </strong>

              <span>
                {isHindi ? "बाज़ार दरों पर आधारित" : "Based on market rates"}
              </span>
            </div>

          </div>


          <div className="benefit">

            <div className="benefit-icon location">
              <MapPin size={20} />
            </div>

            <div>
              <strong>
                {isHindi ? "नज़दीकी रिसाइकलर" : "Nearby Recycler"}
              </strong>

              <span>
                {isHindi ? "सत्यापित कलेक्टर" : "Verified collectors"}
              </span>
            </div>

          </div>


          <div className="benefit">

            <div className="benefit-icon safe">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>
                {isHindi ? "सुरक्षित और पारदर्शी" : "Safe & Transparent"}
              </strong>

              <span>
                {isHindi ? "हर हैंडओवर का रिकॉर्ड" : "Track every handover"}
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

              <button onClick={closeCamera}>
                <X size={22} />
              </button>

              <span>
                {isHindi ? "कबाड़ की फोटो लें" : "Take Photo"}
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

              {/* scanning frame */}

              <div className="scan-frame">

                <i className="corner top-left" />
                <i className="corner top-right" />
                <i className="corner bottom-left" />
                <i className="corner bottom-right" />

              </div>

              <div className="camera-hint">
                {isHindi
                  ? "कबाड़ को फ्रेम के अंदर रखें"
                  : "Keep your scrap inside the frame"
                }
              </div>

            </div>


            {/* CAMERA CONTROLS */}

            <div className="camera-controls">

              <div className="camera-side-button" />

              <button
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


      {/* hidden canvas */}

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </main>
  );
}