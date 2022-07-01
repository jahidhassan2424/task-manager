module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: "#37cdbe", // add your own color
          secondary: "#FFA100", // add your own color
          accent: "#FF8C00", // add your own color
          neutral: "#3d4451", // add your own color
          "base-100": "#ffffff",// add your own color
        },
      },
      "cupcake",
    ],
  },
  plugins: [require("daisyui"),
  function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
    addVariant('xs', '@media (max-width: 639px){}');

  }
  ],
}