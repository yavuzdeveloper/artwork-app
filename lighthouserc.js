// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ["https://artwork-app-wine.vercel.app/"], // Production or preview URL
      numberOfRuns: 3,
      startServerCommand: "",
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "temporary-public-storage", // temporary-public-storage
    },
  },
};
