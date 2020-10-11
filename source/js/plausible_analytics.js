// From https://docs.plausible.io/custom-event-goals
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

// Global click event listener https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/
document.addEventListener('click', function (event) {

	// If the clicked element isn't a tracked link, ignore.
	if (!event.target.closest('.tracked')) return;

    // If the clicked element or parent element doesn't have a href value, ignore.
    if (!event.target.hasAttribute("href") && !event.target.parentElement.hasAttribute("href")) return;

    var href = event.target.getAttribute("href") || event.target.parentElement.getAttribute("href")

    // Log the link click event in plausible.
    switch (href) {
        case "https://www.buymeacoffee.com/ndsn" :
            plausible("bmac")
            break;
        case "https://www.linkedin.com/in/th0masanderson/" :
            plausible("linkedin")
            break;
        case "https://dev.to/ndsn" :
            plausible("devto")
            break;
        case "https://github.com/Driminary" :
            plausible("github")
            break;
        default :
            plausible("link")
    }

}, false);