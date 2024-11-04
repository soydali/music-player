var play = false
bar = $(".progress")
music = $("audio")[0]
button = $("#play")

$("#play").click(function () {
    


    if (play) {
        button.removeClass("fa-pause")
        button.addClass("fa-play")
        play = false
        music.pause()
    } else {
        button.removeClass("fa-play")
        button.addClass("fa-pause")
        play = true
        music.play()
        function fresh() {
            barLength = (music.currentTime * 100) / music.duration
            bar.css({ "width": `${barLength}%` })
            requestAnimationFrame(fresh)
            if (barLength == 100) {
                button.removeClass("fa-pause")
                button.addClass("fa-play")
                music.pause()
                music.currentTime = 0
                play = false
            }
        }
        requestAnimationFrame(fresh)
    }
});

$(".player-progress").click(function (e) {
    progressBar = $(this)
    let x = e.offsetX;
    width = progressBar.innerWidth()
    music.currentTime = music.duration / width * x
    bar.css({ "width": `${(music.currentTime * 100) / music.duration}%` })

})

index = 0

$(".fa-forward").click(function () {
    $.get("./data.json", function (data) {
        if (index == (data.length - 1)){
            index = 0
        }else{
            index = index + 1
        }
        play = false
        button.removeClass("fa-pause")
        button.addClass("fa-play")
        $(".player-info h1").text(data[index].name)
        $(".player-image").css({"background":`url(${data[index].img})`, "background-size": "cover", "background-position": "center"})
        $(".bg-image").css({"background":`url(${data[index].img})`, "background-size": "cover", "background-position": "center"})
        music.src = data[index].src
    });
})

