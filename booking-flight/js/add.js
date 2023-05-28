document.addEventListener("DOMContentLoaded", function () {
    var loginLink = document.getElementById("login-link");
    var loginPopup = document.getElementById("login-popup");
    var flightInfo = document.getElementById("flight-info");
    var flightDeparture = document.getElementById("flight-departure");
    var flightAirline = document.getElementById("flight-airline");
    var flightTime = document.getElementById("flight-time");
    var flightRefundable = document.getElementById("flight-refundable");
    var flightReschedule = document.getElementById("flight-reschedule");
  
    // Báº¯t sá»± kiá»‡n click cho dÃ²ng mÃ£ login
    loginLink.addEventListener("click", function () {
      // Hiá»ƒn thá»‹ báº£ng Ä‘Äƒng nháº­p
      loginPopup.style.display = "block";
    });
  
    // Báº¯t sá»± kiá»‡n click bÃªn ngoÃ i báº£ng Ä‘Äƒng nháº­p Ä‘á»ƒ Ä‘Ã³ng báº£ng
    window.addEventListener("click", function (event) {
      if (event.target == loginPopup) {
        loginPopup.style.display = "none";
      }
    });
  
    // Báº¯t sá»± kiá»‡n click cho dÃ²ng mÃ£ chi tiáº¿t chuyáº¿n bay
    flightInfo.addEventListener("click", function () {
      // Gá»i API hoáº·c thá»±c hiá»‡n xá»­ lÃ½ tÆ°Æ¡ng á»©ng
      // VÃ­ dá»¥:
      fetchFlightDetails();
    });
    // HÃ m gá»i API Ä‘á»ƒ láº¥y chi tiáº¿t chuyáº¿n bay
    function fetchFlightDetails() {
      // Gá»i API táº¡i Ä‘Ã¢y vÃ  xá»­ lÃ½ káº¿t quáº£ tráº£ vá»
      // VÃ­ dá»¥:
      fetch("https://airline-gx52.onrender.com")
        .then(response => response.json())
        // .then(json => console.log(json)) {
        //   // Xá»­ lÃ½ dá»¯ liá»‡u tráº£ vá» tá»« API
        //   flightInfo.textContent = data.info;
        //   flightDeparture.textContent = data.departure;
        //   flightAirline.textContent = data.airline;
        //   flightTime.textContent = data.time;
        //   flightRefundable.textContent = data.refundable;
        //   flightReschedule.textContent = data.reschedule;
        // })
        // .catch(error => {
        //   // Xá»­ lÃ½ lá»—i náº¿u cÃ³
        //   console.error(error);
        // });
    }
  
    const url = "https://airline-gx52.onrender.com";
     const getFlight = async (payload, option = {})=>{
      const api = `${url}/light/search`;
      const res = await fetch(api, {
        method:"POST",
        headers: {
          "Content-Type": "aplication/json",
          Accept: "application/json",
          //token
          ...option,
        },
        body: JSON.stringify({
          "sbdi" : "SGN",
          "sbden" : "DAD",
          "time" : "2023/05/21"
        }),
      });
      const data = await res.json();
  
      return data;
    }
     const addUser = async (payload, option = {}) => {
      const api = `${url}//user/add`;
      const res = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //tonken
            ...option,
  
          },
          body: JSON.stringify({
            "tenkh" : `BuiLeHuy`,
            'ngaysinh' : "YYYY/MM/DD",
            "gmail" : "builehuy21@gmail.com",
            "cmnd" : "64646846464",
            "noicap" : "Da Nang",
            "quoctich": "vietnam",
            "ngonngu": "Tiengviet"
          }),
      });
      const data = await res.json();
  
      return data;
    }
  
  });
  