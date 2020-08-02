var axios = require("axios");
var api_url = process.env.DEVTO_APIURL || "https://dev.to/api/articles?username=ndsn";

module.exports = (async () => {
  try {
    let response = await axios.get(api_url);
    return { feed: api_url, posts: response.data };
  } catch (e) {
    console.error(e);
  }
})();
