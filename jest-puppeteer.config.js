module.exports = {
  launch: {
    args: ['--no-sandbox'],
    dumpio: true,
    headless: process.env.HEADLESS !== "false" ? "new" : false,
  },
}
