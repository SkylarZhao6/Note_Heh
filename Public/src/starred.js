const starAlbum = document.querySelectorAll(".star");

starAlbum.forEach((star) => {
    star.addEventListener("click", function (e) {
        e.preventDefault();

        const album_id = star.getAttribute("album_id");

        $.ajax({
            type: "post",
            url: "/secure/image",
            data: {
                starred: true,
                album_id: album_id,
            },
            success: (res) => {},
            error: (err) => {
                console.log(err);
            },
        });
    });
});
