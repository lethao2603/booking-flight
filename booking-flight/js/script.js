
$(document).ready(function () {
    // khi user click nut search
    $("#btn-search").click(function (event) {
        event.preventDefault();
        const seats = document.getElementById('booking-place1').value;
        localStorage.setItem('seat',seats);
        var data = {
            sbdi: $("#selectFrom").val().split("(")[1].slice(0, 3),
            sbden: $("#selectTo").val().split("(")[1].slice(0, 3),
            time: $("#departure-time").val(),
        };
        // gọi api
        $.ajax({
            type: "POST",
            url: "https://airline-gx52.onrender.com/flight/search",
            data: JSON.stringify(data),
            contentType: "application/json",
        }).done(function (data) { // khi gọi api thành công, lưu dữ liệu search và chuyển qua trang search.html
            localStorage.setItem("searchResults", JSON.stringify(data.data));
            window.location.replace(`${origin}/search.html`);
            window.location.href = `${origin}/search.html`;
        });
    });
});

const btnViewRooms = document.querySelectorAll(".btn-view-rooms");
const btnLogin = document.getElementById("btn-login");
const login = document.querySelector(".header__login");
const btnSearch = document.getElementById("btn-search");
const btntest = document.querySelector(".btn-main");


const renderDropdownAirports = (listAirport, dropdownTag) => {
    let targetInput = "";

    if (dropdownTag.id == "from-dropdown-list") {
        targetInput = "selectFrom";
    } else targetInput = "selectTo";

    let htmlString = "";
    dropdownTag.classList.add("show");
    listAirport.forEach((airport) => {
        htmlString += `<li onclick="selectFromFunc(event, ${targetInput})">${
            airport.tinh + " (" + airport.masanbay + ")"
        }</li>`;
    });
    dropdownTag.innerHTML = htmlString;
};

const btnSelectFrom = document.getElementById("selectFrom");
btnSelectFrom.addEventListener("focus", () => {
    // hiển thị danh sách sân bay đến
    const fromDopdown = document.getElementById("from-dropdown-list");
    renderDropdownAirports(listAirport, fromDopdown);
});

const btnSelectTo = document.getElementById("selectTo");
btnSelectTo.addEventListener("focus", () => {
    // hiển thị danh sách sân bay đi
    const toDopdown = document.getElementById("to-dropdown-list");
    renderDropdownAirports(listAirport, toDopdown);
});

// -------------------------------- Glogbal Var --------------------------------
let listAirport = [];

function init() {
  const data = JSON.parse(localStorage.getItem('listAirports'));
  if (data != undefined) {
    listAirport = [...data];
    return;
  }
    // get list of airport
    fetch("https://airline-gx52.onrender.com/location/list", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => {
            const x = response.json();
            return x;
        })
        .then((data) => {
            listAirport = data.data;
        });
}

// ----------------------------------------------------------------
init();
