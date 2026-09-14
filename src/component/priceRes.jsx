import { useState } from "react";
import { recyclers } from "../data/recycler";
import "./priceRes.css";

function PriceResult({ analysis, onBack }) {
  const [weight, setWeight] = useState("");
  const [collectorPrice, setCollectorPrice] = useState("");
  const [showRecyclers, setShowRecyclers] = useState(false);

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

  return (
    <div className="price-page">

      {/* HEADER */}
      <div className="price-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>

        <div>
          <span className="eyebrow">AI ANALYSIS</span>
          <h1>Your scrap value</h1>
          <p>Review the detected material and enter your lot details.</p>
        </div>
      </div>

      {/* AI RESULT */}
      <div className="analysis-card">

        <div className="analysis-icon">
          ✓
        </div>

        <div className="analysis-info">
          <span>AI detected</span>

          <h2>{material}</h2>

          <div className="confidence">
            <span>●</span>
            {analysis.confidence}% confidence
          </div>
        </div>

        <div className="ai-rate">
          <span>AI market rate</span>
          <strong>₹{aiRate}</strong>
          <small>/ kg</small>
        </div>

      </div>


      {/* INPUT SECTION */}
      <div className="details-card">

        <div className="section-title">
          <span>01</span>
          <div>
            <h3>Lot details</h3>
            <p>Tell us how much scrap you have.</p>
          </div>
        </div>


        <div className="input-grid">

          {/* WEIGHT */}
          <div className="input-group">
            <label>Weight</label>

            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                placeholder="e.g. 5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <span>kg</span>
            </div>
          </div>


          {/* COLLECTOR PRICE */}
          <div className="input-group">
            <label>Your expected price</label>

            <div className="input-wrapper">
              <span>₹</span>

              <input
                type="number"
                min="0"
                placeholder="e.g. 3000"
                value={collectorPrice}
                onChange={(e) => setCollectorPrice(e.target.value)}
              />
            </div>
          </div>

        </div>


        {/* CALCULATED VALUE */}
        <div className="value-box">

          <div>
            <span>Estimated fair value</span>

            <p>
              Based on AI market rate of ₹{aiRate}/kg
            </p>
          </div>

          <strong>
            ₹{estimatedValue.toLocaleString("en-IN")}
          </strong>

        </div>

      </div>


      {/* FIND RECYCLER */}
      <div className="recycler-section">

        <div className="section-title">
          <span>02</span>

          <div>
            <h3>Find a recycler</h3>
            <p>
              Connect with verified recyclers near you.
            </p>
          </div>
        </div>


        <button
          className="find-button"
          onClick={handleFindRecycler}
          disabled={!weight}
        >
          Find Nearby Recyclers
          <span>→</span>
        </button>


        {/* RECYCLER RESULTS */}
        {showRecyclers && (
          <div className="recycler-results">

            <div className="results-heading">
              <h3>
                {matchingRecyclers.length} recyclers found
              </h3>

              <span>Sorted by distance</span>
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

                  <div className="recycler-main">

                    <div className="recycler-avatar">
                      {recycler.name.charAt(0)}
                    </div>

                    <div className="recycler-info">

                      <div className="recycler-name">
                        <h4>{recycler.name}</h4>

                        {recycler.verified && (
                          <span className="verified">
                            ✓ Verified
                          </span>
                        )}
                      </div>

                      <p>
                        📍 {recycler.location}
                      </p>

                      <div className="recycler-tags">

                        <span>
                          {recycler.distance} km away
                        </span>

                        {recycler.pickup && (
                          <span>
                            Pickup available
                          </span>
                        )}

                      </div>

                    </div>

                  </div>


                  <div className="offer">

                    <span>Offer</span>

                    <strong>
                      ₹{recyclerValue.toLocaleString("en-IN")}
                    </strong>

                    <small>
                      ₹{recyclerRate}/kg
                    </small>

                  </div>


                  <button className="contact-button">
                    Contact →
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