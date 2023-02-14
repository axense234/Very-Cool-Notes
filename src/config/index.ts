const env = process.env.NODE_ENV;

const server =
  env === "production"
    ? "https://notes-api-netppr-ca.onrender.com"
    : "http://localhost:4000";

const siteUrl =
  env === "production"
    ? "https://very-cool-notes-ca.netlify.app"
    : "http://localhost:3000";

export { server, siteUrl };
