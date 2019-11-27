window.onload = function() {
  var request = new XMLHttpRequest();
  request.open("GET", "cards.txt", true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let cards = document.createElement("div");
      cards.innerHTML = this.response;
      const cardEl = document.getElementById("team");
      cardEl.appendChild(cards);
    } else {
    }
  };
  request.send();
};

// var request = new XMLHttpRequest();
// request.open("GET", "cards.txt", true);

// request.onload = function() {
//   if (this.status >= 200 && this.status < 400) {
//     var cards = this.response;
//     const cardEl = document.getElementById("team");
//     cardEl.appendChild(cards);
//   } else {
//   }
// };
// request.send();
