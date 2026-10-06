const { NODE_ENV, JWT_SECRET } = process.send;

module.exports = {
    JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
};