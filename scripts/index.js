let apiKey = "AIzaSyD-dxrjbmAr543PA_2NPaGwkogDA5ydpOU";

let container = document.querySelector("#container");
let search = document.querySelector("#search");
let query_input = document.querySelector("#query");

let filter = document.querySelector("#filter");

let isASearch = false;

query_input.addEventListener("focus", () => {
    search.style.borderColor = "rgb(51, 98, 136)";
});

query_input.addEventListener("focusout", () => {
    search.style.borderColor = "rgb(88, 88, 88)";
});

filter.addEventListener("change", () => {
    if (isASearch) {
        Search();
    } else {
        MostPopularVideos("IN");
    }
});

function Search(e) {
    if (e) e.preventDefault();
    let query = query_input.value;

    if (query.length > 0) {
        Query(query);
    }
}

async function Query(query) {
    try {
        isASearch = true;
        let res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?q=${query}&maxResults=20&part=snippet&type=video&videoDuration=${filter.value}&key=${apiKey}`
        );
        let { items } = await res.json();
        appendData(items);
    } catch (e) {
        alert(e);
    }
}

window.addEventListener("load", () => {
    MostPopularVideos("IN");
});

async function MostPopularVideos(region) {
    try {
        let res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?chart=mostPopular&regionCode=${region}&part=snippet&maxResults=30&type=video&videoDuration=${filter.value}&key=${apiKey}`
        );
        let { items } = await res.json();
        appendData(items);
    } catch (e) {
        alert(e);
    }
}

function appendData(list) {
    container.innerHTML = null;
    console.log(list);

    list.forEach(
        ({
            snippet: {
                title,
                thumbnails: {
                    high: { url },
                },
            },
            id,
        }) => {
            let div = ce("div");
            let title_text = ce("p");
            let thumb = ce("img");

            if (id.kind.includes("channel")) {
                div.setAttribute("id", "channel_div");
            } else {
                div.addEventListener("click", () => {
                    window.location.href = `./video.html?v=${id.videoId}&t=${title}`;
                });
            }

            title_text.innerText = title;
            thumb.src = url;

            div.append(thumb, title_text);
            container.append(div);
        }
    );
}

function ce(tag) {
    return document.createElement(tag);
}
