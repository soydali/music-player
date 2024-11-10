var play = false
bar = $(".progress")
button = $("#play")
var player;
var first = false
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



$("#search-button").click(async function () {
    videoId = await $("#search").val()
    if (videoId.includes("v=")){
        if(videoId.includes("&")){
            videoId = videoId.split("=")[1]
            videoId = videoId.split("&")[0]
        }
        else{
            videoId = videoId.split("=")[1]
        }
    }if(videoId.includes("youtu.be/")){
        videoId = videoId.split("youtu.be/")[1]
    }
    if (!first) {
        $(".search-box").css({ "position": "absolute" })
        $(".search-box").animate({ top: "10px" }, "slow")
        $(".player").css({ "display": "flex" })
        first = true
    }


    if (player) {
        player.destroy();
    }

    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });

})


function onPlayerReady() {
    var videoData = player.getVideoData();
    var videoId = videoData.video_id;
    var bg = `http://img.youtube.com/vi/${videoId}/0.jpg`;
    $(".player-image").css({ "background": `url(${bg})`, "background-size": "cover", "background-position": "center" });
    $(".bg-image").css({ "background": `url(${bg})`, "background-size": "cover", "background-position": "center" });
    $(".player-info h1").text(videoData.title.length > 25 ? videoData.title.slice(0, 25) + "..." : videoData.title)
}



$("#play").click(function () {

    if (play) {
        button.removeClass("fa-pause")
        button.addClass("fa-play")
        play = false
        player.pauseVideo()
    } else {
        button.removeClass("fa-play")
        button.addClass("fa-pause")
        play = true
        player.playVideo()
        function fresh() {
            barLength = (player.getCurrentTime() * 100) / player.getDuration()
            bar.css({ "width": `${barLength}%` })
            requestAnimationFrame(fresh)
            if (barLength >= 100) {
                button.removeClass("fa-pause")
                button.addClass("fa-play")
                player.pauseVideo()
                player.seekTo(0, true);
                play = false
            }
        }
        requestAnimationFrame(fresh)
    }

});


$(".player-progress").click(function (e) {
    progressBar = $(this)
    if (!play) {
        button.click()
    }
    let x = e.offsetX;
    width = progressBar.innerWidth()
    newTime = player.getDuration() / width * x
    player.seekTo(newTime, true);
    barLength = (newTime * 100) / player.getDuration();
    bar.css({ "width": `${barLength}%` });
})



// AS SOON POSSİBLE
//index = 0

// $(".fa-forward").click(function () {
//     $.get("./data.json", function (data) {
//         if (index == (data.length - 1)) {
//             index = 0
//         } else {
//             index = index + 1
//         }
//         play = false
//         button.removeClass("fa-pause")
//         button.addClass("fa-play")
//         $(".player-info h1").text(data[index].name)
//         $(".player-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//         $(".bg-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//         music.src = data[index].src
//     });
// })

// $(".fa-backward").click(function () {
//     $.get("./data.json", function (data) {
//         if (index != 0) {
//             index = index - 1
//             play = false
//             button.removeClass("fa-pause")
//             button.addClass("fa-play")
//             $(".player-info h1").text(data[index].name)
//             $(".player-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//             $(".bg-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//             music.src = data[index].src
//         } else {
//             index = data.length - 1
//             play = false
//             button.removeClass("fa-pause")
//             button.addClass("fa-play")
//             $(".player-info h1").text(data[index].name)
//             $(".player-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//             $(".bg-image").css({ "background": `url(${data[index].img})`, "background-size": "cover", "background-position": "center" })
//             music.src = data[index].src
//         }
//     });
// })