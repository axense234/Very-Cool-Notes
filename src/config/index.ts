const env = process.env.NODE_ENV;

const server =
  env === "production"
    ? "https://notes-api-netppr-ca.onrender.com"
    : "http://localhost:4000";

const siteUrl = env === "production" ? "" : "http://localhost:3000";

export { server, siteUrl };
