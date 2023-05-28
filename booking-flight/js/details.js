let seats = JSON.parse(localStorage.getItem("seat"))
let flight = JSON.parse(localStorage.getItem("selectedFlight"));

const detailContainer = document.querySelector(".details-container");
const btnSendDetails = document.getElementById("send-details")
const renderBookingForm = (seats) => {
  detailContainer.innerHTML = '';
  let htmlString = '';
  for (let i = 0; i < seats; i++) {
    htmlString += `
    <div class="mt-4">
      <h2>Traveler Details of Passenger ${i + 1}</h2>
      <form>
        <div class="form-group">
          <label for="name-${i}">Họ và Tên</label>
          <input required type="text" id="name-${i}" name="name-${i}" class="form-control" placeholder="Nhập họ và tên">
        </div>

        <div class="form-group">
          <label for="birthday-${i}">Ngày sinh</label>
          <i class="bi bi-calendar3"></i>
          <input type="text" name="birthday-${i}" class="date-picker" placeholder="Ngày sinh" id="birthday-${i}" />
        </div>

        <div class="form-group">
          <label for="gmail-${i}">Email</label>
          <input required type="text" id="gmail-${i}" name="gmail-${i}" class="form-control" placeholder="Nhập Email">
        </div>

        <div class="form-group">
          <label for="Cmnd-${i}">Chứng minh thư:</label>
          <input required type="text" id="Cmnd-${i}" name="Cmnd-${i}" class="form-control" placeholder="Nhập chứng minh thư">
        </div>

        <div class="form-group">
          <label for="NC-${i}">Nơi cấp:</label>
          <input required type="text" name="NC-${i}" list="NC-list-${i}" class="form-control" placeholder="Nơi cấp">
          <datalist id="NC-list-${i}">
            <option value="Đà Nẵng"></option>
            <option value="Quảng Trị"></option>
            <option value="Khánh Hòa"></option>
            <option value="Đà Lạt"></option>
            <option value="Hà Nội"></option>
            <option value="Sài Gòn"></option>
          </datalist>
        </div>

        <div class="form-group">
          <label for="QT-${i}">Quốc tịch:</label>
          <input required type="text" name="QT-list-${i}" list="QT-list-${i}" class="form-control" placeholder="Chọn quốc tịch">
          <datalist id="QT-list-${i}">
            <option value="Việt Nam"></option>
            <option value="Hoa Kỳ"></option>
            <option value="Thái Lan"></option>
            <option value="Trung Quốc"></option>
            <option value="Nhật Bản"></option>
            <option value="Mexico"></option>
          </datalist>
        </div>

        <div class="form-group">
          <label for="NN-${i}">Ngoại ngữ</label>
          <ul id="NN-${i}">
            <li><input type="checkbox" id="NN" name="NN1">English</li>
            <li><input type="checkbox" id="NN" name="NN2">Tiếng Việt</li>
            <li><input type="checkbox" id="NN" name="NN3">Tiếng Trung</li>
            <li><input type="checkbox" id="NN" name="NN3">Tiếng Thái</li>
          </ul>
        </div>
      </form>
    </div>
    `
  }
  detailContainer.innerHTML = htmlString;
}

btnSendDetails && btnSendDetails.addEventListener('click', () => {
  let passengers = []
  for (let i = 0; i < seats; i++) {
    let passenger = {};
    passenger[`name`] = document.getElementById(`name-${i}`).value
    passenger[`dob`] = document.getElementById(`birthday-${i}`).value
    passenger[`idCard`] = document.getElementById(`Cmnd-${i}`).value
    passenger[`gmail`] = document.getElementById(`gmail-${i}`).value
    passengers.push(passenger)
  }
  let data = {
    macb: flight.id,
    giodi: flight.departure_time,
    gioden: flight.departure_time,
    sbdi: flight.departure_airport,
    masbdi: flight.departure_airport_id,
    sbden: flight.arrival_airport,
    masbden: flight.arrival_airport_id,
    passengers,
  }
  console.log(data);
  fetch("https://airline-gx52.onrender.com/flight/add/available_seats", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((data) => {
    window.location.replace(`${origin}/thanks.html`);
    window.location.href = `${origin}/thanks.html`;
  
  })
  .catch((e) => {
    Toastify({
      text: "Đã có lỗi trong quá trình đặt vé",
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
  })
  
})


const init = () => {
  if (!seats && seats == 0) {

  }
  else {          
    renderBookingForm(seats)
   
  }
}
init();