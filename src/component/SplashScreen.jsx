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

            {/* =================================================
                MOBILE + ELECTRONIC WASTE
            ================================================= */}

            <div className="scrap-load">

              {/* ELECTRONIC CHIPS */}
<div className="chip chip-1">
  <span className="chip-pin pin-1" />
  <span className="chip-pin pin-2" />
  <span className="chip-pin pin-3" />
  <span className="chip-pin pin-4" />
  <span className="chip-center" />
</div>

<div className="chip chip-2">
  <span className="chip-pin pin-1" />
  <span className="chip-pin pin-2" />
  <span className="chip-pin pin-3" />
  <span className="chip-pin pin-4" />
  <span className="chip-center" />
</div>

<div className="chip chip-3">
  <span className="chip-pin pin-1" />
  <span className="chip-pin pin-2" />
  <span className="chip-pin pin-3" />
  <span className="chip-pin pin-4" />
  <span className="chip-center" />
</div>

<div className="chip chip-4">
  <span className="chip-pin pin-1" />
  <span className="chip-pin pin-2" />
  <span className="chip-pin pin-3" />
  <span className="chip-pin pin-4" />
  <span className="chip-center" />
</div>

              {/* MOBILE PHONES */}
              <div className="ewaste-phone phone-1">
                <div className="phone-screen" />
                <div className="phone-button" />
              </div>

              <div className="ewaste-phone phone-2">
                <div className="phone-screen" />
                <div className="phone-camera" />
              </div>

              <div className="ewaste-phone phone-3">
                <div className="phone-screen" />
                <div className="phone-button" />
              </div>


              {/* OLD MOBILE BATTERIES */}
              <div className="battery battery-1">
                <div className="battery-top" />
              </div>

              <div className="battery battery-2">
                <div className="battery-top" />
              </div>

              <div className="battery battery-3">
                <div className="battery-top" />
              </div>


              {/* CIRCUIT BOARDS */}
              <div className="circuit board-1">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="circuit board-2">
                <span />
                <span />
                <span />
              </div>

              <div className="circuit board-3">
                <span />
                <span />
                <span />
              </div>


              {/* COMPUTER RAM */}
              <div className="ram ram-1">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="ram ram-2">
                <span />
                <span />
                <span />
              </div>


              {/* COMPUTER CHIP */}
              <div className="chip chip-1">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chip chip-2">
                <span />
                <span />
                <span />
                <span />
              </div>


              {/* USB / ELECTRONIC CONNECTORS */}
              <div className="usb usb-1">
                <div />
              </div>

              <div className="usb usb-2">
                <div />
              </div>


              {/* HEADPHONE */}
              <div className="headphone">
                <span />
              </div>


              {/* CHARGER */}
              <div className="charger charger-1">
                <div className="charger-wire" />
              </div>

              <div className="charger charger-2">
                <div className="charger-wire" />
              </div>


              {/* EARPHONES */}
              <div className="earphone earphone-1">
                <span />
              </div>

              <div className="earphone earphone-2">
                <span />
              </div>


              {/* CABLES */}
              <div className="cable cable-1" />
              <div className="cable cable-2" />
              <div className="cable cable-3" />
              <div className="cable cable-4" />


              {/* METAL SCRAP */}
              <div className="metal metal-1" />
              <div className="metal metal-2" />
              <div className="metal metal-3" />


              {/* SMALL ELECTRONIC PARTS */}
              <div className="electronic-piece piece-1" />
              <div className="electronic-piece piece-2" />
              <div className="electronic-piece piece-3" />
              <div className="electronic-piece piece-4" />
              <div className="electronic-piece piece-5" />


              {/* OLD SIM / MEMORY CARDS */}
              <div className="memory-card memory-1" />
              <div className="memory-card memory-2" />


              {/* SMALL SPEAKER */}
              <div className="speaker">
                <span />
                <span />
                <span />
              </div>

            </div>


            {/* =================================================
                CART BODY
            ================================================= */}

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