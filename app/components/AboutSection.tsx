"use client";

import BuBinaPortrait from "./BuBinaPortrait";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      style={{
        backgroundColor: "#FDF9F4",
        padding: "48px 20px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background warm texture — layered organic shapes */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(196,90,58,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(91,127,58,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative brush stroke */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40px",
          right: "20px",
          width: "80px",
          height: "6px",
          borderRadius: "3px",
          background:
            "linear-gradient(to right, rgba(196,90,58,0.25), rgba(179,131,95,0.15))",
          transform: "rotate(-5deg)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 6vw, 30px)",
              fontWeight: 700,
              color: "#4E2E1E",
              margin: "0 0 8px 0",
              lineHeight: 1.15,
            }}
          >
            Tentang{" "}
            <em style={{ color: "#C45A3A", fontStyle: "italic" }}>
              Waroeng Bu Bina
            </em>
          </h2>
          <div
            style={{
              width: "36px",
              height: "3px",
              backgroundColor: "#C45A3A",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {/* Bu Bina portrait — animated, reusable */}
          <div style={{ position: "relative" }}>
            <BuBinaPortrait size={100} variant="card" withLeafBadge={true} />
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: "#7A5240",
                margin: "8px 0 0 0",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              Bu Bina
            </p>
          </div>

          {/* Text content */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#4E2E1E",
                lineHeight: 1.8,
                margin: "0 0 16px 0",
              }}
            >
              Waroeng Bu Bina hadir untuk membantu Anda mendapatkan masakan
              rumahan yang rasanya seperti dimasakkan sendiri. Setiap hidangan
              disiapkan dengan bahan segar dan penuh perhatian, sesuai kebutuhan
              Anda.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#4E2E1E",
                lineHeight: 1.8,
                margin: "0 0 20px 0",
              }}
            >
              Dari makan siang sehari-hari hingga kebutuhan acara,{" "}
              <strong style={{ fontWeight: 600, color: "#4E2E1E" }}>
                Bu Bina
              </strong>{" "}
              siap membantu menyiapkan makanan yang tepat untuk setiap momen
              Anda.
            </p>

            {/* Signature quote */}
            <div
              style={{
                padding: "16px 18px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E8D8C8",
                boxShadow: "0 3px 12px rgba(78,46,30,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background:
                    "linear-gradient(to bottom, #C45A3A, #5B7F3A)",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: "#4E2E1E",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                "Kalau punya kebutuhan makan, tinggal bilang."
              </p>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "2px",
                    backgroundColor: "#C45A3A",
                    borderRadius: "1px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    color: "#9B7060",
                    fontWeight: 500,
                  }}
                >
                  — Bu Bina, Pendiri Waroeng Bu Bina
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
