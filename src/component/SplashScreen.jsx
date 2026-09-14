import { Recycle } from "lucide-react";
import "./SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash">

      <div className="splash-glow" />

      <div className="particles">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="splash-content">

        {/* BRAND ICON */}
        <div className="brand-icon">
          <Recycle size={58} strokeWidth={2} />
        </div>

        {/* BRAND */}
        <div className="brand-text">
          <h1>
            Kabadiwala <span>Connect</span>
          </h1>

          <p>Scrap se Samriddhi tak</p>
        </div>


        {/* CART */}
        <div className="cart-stage">

          <div className="speed-line speed-1" />
          <div className="speed-line speed-2" />
          <div className="speed-line speed-3" />

          <div className="ground" />

          <div className="kabadi-cart">

            {/* =========================
                SCRAP LOAD
            ========================= */}

            <div className="scrap-load">

              {/* cardboard */}
              <div className="cardboard box-1" />
              <div className="cardboard box-2" />
              <div className="cardboard box-3" />

              {/* circuit boards */}
              <div className="circuit board-1">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="circuit board-2">
                <span />
                <span />
              </div>

              {/* bottles */}
              <div className="bottle bottle-1">
                <div className="bottle-neck" />
                <div className="bottle-cap" />
                <div className="bottle-label" />
              </div>

              <div className="bottle bottle-2">
                <div className="bottle-neck" />
                <div className="bottle-cap" />
              </div>

              <div className="bottle bottle-3">
                <div className="bottle-neck" />
                <div className="bottle-cap" />
                <div className="bottle-label" />
              </div>

              <div className="bottle bottle-4">
                <div className="bottle-neck" />
                <div className="bottle-cap" />
              </div>

              {/* cans */}
              <div className="can can-1" />
              <div className="can can-2" />

              {/* cables */}
              <div className="cable cable-1" />
              <div className="cable cable-2" />
              <div className="cable cable-3" />

              {/* metal */}
              <div className="metal metal-1" />
              <div className="metal metal-2" />

              {/* plastic bag */}
              <div className="plastic-bag" />

            </div>


            {/* =========================
                CART BODY
            ========================= */}

            <div className="cart-body">

              <div className="cart-inner-shadow" />

              <div className="cart-rim" />

              <div className="cart-rib rib-1" />
              <div className="cart-rib rib-2" />
              <div className="cart-rib rib-3" />

              <div className="cart-label">
                <Recycle size={24} />
              </div>

            </div>


            {/* HANDLE */}
            <div className="cart-handle" />


            {/* WHEELS */}
            <div className="cart-wheel wheel-left">
              <div className="wheel-center" />
            </div>

            <div className="cart-wheel wheel-right">
              <div className="wheel-center" />
            </div>

          </div>
        </div>


        {/* TAGLINE */}
        <div className="value-message">
          <span>FROM SCRAP</span>
          <strong>TO VALUE</strong>
        </div>


        {/* LOADING */}
        <div className="loading">
          <div className="loading-progress" />
        </div>

      </div>
    </div>
  );
}