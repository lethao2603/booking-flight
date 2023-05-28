const getTimeFromDate = (date) => {
    return new Date(date).toLocaleTimeString("vi-Vn", { hour: "2-digit", minute: "2-digit" });
};

const formatCurrency = (price, locale) => {
    return new Intl.NumberFormat(locale, { style: "currency", currency: "VND" }).format(price);
};

const seats = localStorage.getItem("seat");
function init() {
    // lay du lieu tim kiem tu localStorage
    let data = JSON.parse(localStorage.getItem("searchResults"));
    searchData = [...data];
    const htmlContainer = document.querySelector(".search_list");
    renderSearchResults(searchData, htmlContainer);
    document.getElementById(
        "total-search"
    ).innerHTML = `${searchData.length} flights in ${searchData[0].arrival_province}`;
}

const chooseFlight = (selectedFlight) => {
    localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
    window.location.replace(`${origin}/contact.html`);
    window.location.href = `${origin}/contact.html`;
};

function renderSearchResults(data, htmlContainer) {
    htmlContainer.innerHTML = "";
    let htmlString = "";
    data.forEach((result) => {
        htmlString += `                            
    <div class="search_item">
      <div class="row">
          <div class="col-4 search_img">
              <img src="./images/maybay.jpg" alt="" width="100%" />
          </div>
          <div class="col-8 search_content">
              <h3>${`${result.departure_province} (${result.departure_airport_id})`} → ${`${result.arrival_province} (${result.arrival_airport_id})`}</h3>
              <div class="search_review d-flex gap-4 align-items-center">
                  
              </div>

              <div class="facility d-flex gap-5 mt-3 align-items-center">
                  <div class="time_from">
                      ${getTimeFromDate(result.departure_time)}
                      <p>${result.departure_airport_id}</p>
                  </div>
                  <i class="bi bi-arrow-right-square-fill"></i>
                  <div class="time_to">
                      ${getTimeFromDate(result.arrival_time)}
                      <p>${result.arrival_airport_id}</p>
                  </div>
              </div>

              <div class="search_item_price text-end">
                  <p class="new-price mt-2 mb-4 ">${formatCurrency(result.price * seats, "vi-VN")}</p>
              </div>

              <div class="text-end row">
                      <ul class="d-flex col-8 g-4 gap-4">
                          <li><a href="#">Hotels</a></li>
                          <li><a href="#">Flights</a></li>
                          <li><a href="#">Flight + Hotel</a></li>
                          <li><a href="#">Locations</a></li>
                      </ul>
                  <button class="btn-main btn-view-rooms col-3" onclick='chooseFlight(${JSON.stringify(
                      result
                  )})'>Choose</button>
              </div>
          </div>
      </div>
  </div>`;
        htmlContainer.innerHTML = htmlString;
    });
}

// ----------------------------------------------------------------
let searchData = [];
init();
