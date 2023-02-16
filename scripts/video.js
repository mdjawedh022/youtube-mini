let videoPlayer = document.querySelector("#videoPlayer");
let title = document.querySelector("#title");

window.addEventListener("load", () => {
    var url = new URL(location.href);
    let videoId = url.searchParams.get("v");
    title.innerText = url.searchParams.get("t");

    videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
});
