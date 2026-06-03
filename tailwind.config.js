export default {
  content: ["./index.html", "./chaveamento.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#020403",
        pitch2: "#07110f",
        neon: "#00ff88",
        cyanline: "#5ee7ff",
        signal: "#d8ff4f",
        panel: "rgba(7, 18, 18, 0.72)"
      },
      boxShadow: {
        glow: "0 0 34px rgba(0, 255, 136, 0.22)",
        panel: "0 22px 70px rgba(0, 0, 0, 0.38)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};
