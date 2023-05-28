
let selectedFlight = null;
const btnVerify = document.getElementById("verify-code");
const btnSendBookingInfo = document.getElementById("sendBookingInfo");
const flghtDetailContainer = document.querySelector(".flight-details");
var verifyModal = document.getElementById('verifyModal')

const getFullname = (firstName, lastName) => {
    if (firstName == null) firstName = "";
    if (lastName == null) lastName = "";
    return firstName + " " + lastName;
};

const getDayFromDate = (date) => {
  return new Date(date).toLocaleDateString("vi-Vn");
};

const getTimeFromDate = (date) => {
  return new Date(date).toLocaleTimeString("vi-Vn", { hour: "2-digit", minute: "2-digit" });
};

const getDiffTime = (date1, date2) => {
  var diff = Math.abs((new Date(date1) - new Date(date2))) / 60000
  var h = Math.floor(diff / 60);
  var m = diff % 60;
  return `${h}h${m}m`;
}



const renderFlightDetails = (flight) => {
  flghtDetailContainer.innerHTML = "";
  const htmlString = `
  <div class="icon-text"><i class="fas fa-plane" style="font-size: 13px; color: #4099e1;"></i><span
    id="flight-info"> ${flight.departure_province} -> ${flight.arrival_province}</span>
  <p id="flight-departure">Departure - ${getDayFromDate(flight.departure_time)}</p>
  <p id="flight-airline">Vietnam Airlines</p>
  <p id="flight-time"> ${getTimeFromDate(flight.departure_time)} (${flight.departure_airport_id})
      --- ${getDiffTime(flight.departure_time, flight.arrival_time)} (direct)---> ${getTimeFromDate(flight.arrival_time)} (${flight.arrival_airport_id})</p>
  <div class="icon-text"><i class="fas fa-check-circle" id="flight-refundable"
      style="font-size: 13px; color: #4099e1;"></i><span style="font-size: 15px; color: #4099e1;">
      Refundable</span>
  </div>
  <div class="icon-text"><i class="fas fa-check-circle" id="flight-refundable"
      style="font-size: 13px; color: #4099e1;"></i><span style="font-size: 15px; color: #4099e1;">
      Reschedule available</span>
  </div>
  `
  flghtDetailContainer.innerHTML = htmlString;
}

let verifiedCode = "";

btnSendBookingInfo &&
    btnSendBookingInfo.addEventListener("click", () => {
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const data = {
            name: getFullname(fname, lname),
            gmail: email,
        };
        verifyModal.classList.remove("show")
        // send api to get mail verified
        fetch("https://airline-gx52.onrender.com/gmail/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                Toastify({
                    text: "Mã xác thực đã được gửi về mail!",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#2E7D32",
                        fontSize: "15px",
                    },
                    onClick: function () {}, // Callback after click
                }).showToast();
                verifyModal.classList.add("show")
                console.log(data);
                verifiedCode = data.code;
            })
            .catch((e) => {
                Toastify({
                    text: "Đã có lỗi xảy ra",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#D32F2F",
                        fontSize: "15px",
                    },
                    onClick: function () {}, // Callback after click
                }).showToast();
            });
    });

btnVerify &&
    btnVerify.addEventListener("click", () => {
        const userCode = document.getElementById("codeInp").value;
        if (userCode != verifiedCode) {
            Toastify({
                text: "Mã xác thực không chính xác",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#D32F2F",
                    fontSize: "15px",
                },
                onClick: function () {}, // Callback after click
            }).showToast();
        } else {
            window.location.replace(`${origin}/detail.html`);
            window.location.href = `${origin}/detail.html`;
        }
    });


const init = () => {
    // get selected flight from local storage
    selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
    if (!selectedFlight) {
        window.location.replace(`${origin}/index.html`);
        window.location.href = `${origin}/index.html`;
    }
    else {
      renderFlightDetails(selectedFlight);
    }
};
init();