module.exports = function() {
    
    var platform = process.env.PLATFORM || "Unspecified";
    var platformprefix = process.env.PLATFORMPREFIX || "U";
    var commit = process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "development"

    return {
      platform: platform,
      platformprefix: platformprefix,
      commit: commit
    };
  };