"use client";

import RevealOnScroll from "./RevealOnScroll";

export default function BrandValues() {
  const values = [
    {
      title: "Masakan rumahan",
      subtitle: "Rasa seperti di rumah",
      description:
        "Setiap hidangan memiliki rasa yang sama seperti masakan yang dimasak dengan cinta di dapur rumah sendiri.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* House */}
          <path d="M6 18L20 6l14 12v17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V18z" fill="#F0E6D8" stroke="#4E2E1E" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Roof */}
          <path d="M20 4L4 18M20 4l16 14" stroke="#4E2E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Door */}
          <rect x="16" y="26" width="8" height="11" rx="1" stroke="#C45A3A" strokeWidth="1.5" fill="none"/>
          {/* Window */}
          <rect x="10" y="22" width="5" height="5" rx="1" stroke="#4E2E1E" strokeWidth="1.5" fill="#EEF5E8"/>
          {/* Heart above door */}
          <path d="M20 14s-2-1.5-4-1.5C12 12.5 10 14 10 15.5c0 3 4 6 10 9 6-3 10-6 10-9 0-1.5-2-3-6-3-2 0-4 1.5-4 1.5z" fill="#C45A3A" opacity="0.2" stroke="#C45A3A" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      ),
      accent: "#C45A3A",
    },
    {
      title: "Bahan berkualitas",
      subtitle: "Segar dan terpilih",
      description:
        "Kami hanya menggunakan bahan-bahan segar pilihan, dari pemasok terpercaya untuk setiap hidangan.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Leaf circle */}
          <circle cx="20" cy="20" r="14" fill="#EEF5E8" stroke="#5B7F3A" strokeWidth="1.5"/>
          {/* Left leaf */}
          <path d="M20 8c0 0-7 5-7 12s7 12 7 12" stroke="#5B7F3A" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Right leaf */}
          <path d="M20 8c0 0 7 5 7 12s-7 12-7 12" stroke="#5B7F3A" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Center vein */}
          <path d="M20 10v20" stroke="#7AA852" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Dots */}
          <circle cx="20" cy="12" r="1.5" fill="#5B7F3A"/>
          <circle cx="20" cy="20" r="1.5" fill="#5B7F3A"/>
          <circle cx="20" cy="28" r="1.5" fill="#5B7F3A"/>
        </svg>
      ),
      accent: "#5B7F3A",
    },
    {
      title: "Bisa disesuaikan",
      subtitle: "Sesuai kebutuhan Anda",
      description:
        "Tidak ada kebutuhan yang sama. Setiap pesanan disesuaikan dengan jumlah porsi, preferensi, dan kesempatan Anda.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Heart */}
          <path d="M20 34S7 25 7 16.5C7 11 11 7 16.5 7c3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4C29 7 33 11 33 16.5 33 25 20 34 20 34z" fill="#FDECE9" stroke="#C45A3A" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Gear inside */}
          <circle cx="20" cy="18" r="5" stroke="#C45A3A" strokeWidth="1.5" fill="none"/>
          <path d="M20 14v8M17 15l6 5M23 15l-6 5" stroke="#C45A3A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      ),
      accent: "#C45A3A",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#FDF9F4",
        padding: "48px 20px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative shapes */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30px",
          left: "-30px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(91,127,58,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <RevealOnScroll delay={0}>
        <div style={{ marginBottom: "36px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 5.5vw, 28px)",
              fontWeight: 700,
              color: "#4E2E1E",
              margin: "0 0 8px 0",
              lineHeight: 1.2,
            }}
          >
            Kenapa Waroeng Bu Bina?
          </h2>
          <div
            style={{
              width: "36px",
              height: "3px",
              backgroundColor: "#5B7F3A",
              borderRadius: "2px",
            }}
          />
        </div>
      </RevealOnScroll>

      {/* Three value blocks — editorial treatment */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {values.map((value, index) => (
          <RevealOnScroll key={value.title} delay={100 + index * 120}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px 0",
                borderBottom:
                  index < values.length - 1
                    ? "1px solid #F0E6D8"
                    : "none",
                alignItems: "flex-start",
              }}
            >
            {/* Left: icon + number */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #E8D8C8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(78,46,30,0.06)",
                  transition:
                    "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {value.icon}
              </div>
              {/* Number indicator */}
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: value.accent,
                  opacity: 0.5,
                }}
              >
                0{index + 1}
              </span>
            </div>

            {/* Right: text */}
            <div style={{ flex: 1, paddingTop: "2px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#4E2E1E",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {value.title}
                </h3>
                <div
                  style={{
                    width: "20px",
                    height: "2px",
                    borderRadius: "1px",
                    backgroundColor: value.accent,
                    opacity: 0.4,
                    flexShrink: 0,
                    marginTop: "auto",
                    marginBottom: "3px",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: value.accent,
                  margin: "0 0 6px 0",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {value.subtitle}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#9B7060",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {value.description}
              </p>
            </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
