function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function updatePage(title, header, buttons) {
  document.title = title + " | ExpHost - Z";
  document.getElementById("title").innerHTML = title;
  document.getElementById("header").innerHTML = header;
  document.getElementById("buttons").innerHTML = buttons;
}

function resetPage() {
  history.pushState("", document.title, window.location.pathname + window.location.search);
  updatePage("Exp Selection", "505", firmwares);
}

function getFirmwares() {
  var firmwareSpoofs = {
    "5.51": "4.55",
    "5.07": "5.05"
  };
  var ua = navigator.userAgent;
  var currentFirmware = ua.substring(ua.indexOf("5.0 (") + 19, ua.indexOf(") Apple"));
  if (firmwareSpoofs.hasOwnProperty(currentFirmware)) {
    currentFirmware = firmwareSpoofs[currentFirmware];
  }
  var firmwares = "";
  x = 0;
  for (var i = 0, len = data["firmwares"].length; i < len; i++) {
    x += 1;
    if (currentFirmware == data["firmwares"][i]) {
      firmwares += "<a href=\"#" + data["firmwares"][i] + "\"><button class=\"btn btn-main\">" + data["firmwares"][i] + "</button></a>";
    } else {
      firmwares += "<a href=\"#" + data["firmwares"][i] + "\"><button class=\"btn btn-disabled\">" + data["firmwares"][i] + "</button></a>";
    }
    if (x >= 3) {
      firmwares += "<br>";
      x = 0;
    }
  }
  return firmwares;
}

function getExploits() {
  var hash = window.location.hash.substr(1);
  var exploits = "";
  x = 0;
  for (var i = 0, len = data[hash].length; i < len; i++) {
    x += 1;
    if (data[hash][i] == "[Back]") {
      exploits += "<a href=\"#back\"><button class=\"btn btn-main\">" + data[hash][i] + "</button></a>";
    } else {
      exploits += "<a href=\"." + exploitBase + hash + "/" + data[hash][i] + "/index.html\"><button class=\"btn btn-main\">" + data[hash][i] + "</button></a>";
    }
    if (x >= 3) {
      exploits += "<br>";
      x = 0;
    }
  }
  return exploits;
}

function firmwareSelected() {
  var hash = window.location.hash.substr(1);
  if (!isInArray(hash, firmwares)) {
    resetPage();
  } else {
    var exploits = getExploits();
    updatePage("Exploit Selection", hash, exploits);
  }
}