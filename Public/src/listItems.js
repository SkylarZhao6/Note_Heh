// expand list
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// checking checkbox
const all_checkbox = document.querySelectorAll(".checkBox");

all_checkbox.forEach((box, index) => {
    box.addEventListener("change", function (e) {
        e.preventDefault();

        const checked = box.checked;
        const list_id = box.getAttribute("list_id");

        $.ajax({
            type: "post",
            url: "/secure/list",
            data: {
                itemID: index,
                is_checked: checked,
                list_Id: list_id,
            },
            success: (res) => {},
            error: (err) => {
                console.log(err);
            },
        });
    });
});
