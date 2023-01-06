/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   xs: { max: "575px" }, // Mobile (iPhone 3 - iPhone XS Max).
    // },
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
      height: {
        chatH: "85vh",
      },
      width: {
        chatW: "85vw",
        wNinety: "90%",
      },
      gridTemplateRows: {
        chatContainer: "10% 75% 15%",
        messages: "10% 80% 10%",
      },
      minHeight: {
        contactH: "5rem",
      },
      gap: {
        chat: "0.1rem",
      },
      gridTemplateColumns: {
        contactsContainer: "25% 75%",
        contactsContainerSmall: "30% 70%",
        chatInput: "5% 95%",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "5rem",
      },
      borderWidth: {
        6: "0.4rem",
      },
      padding: {
        avatar: "0.4rem",
      },
    },
  },
  plugins: [],
};
