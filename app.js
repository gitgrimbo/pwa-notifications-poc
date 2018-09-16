console.log("app.js");

function showError(str) {
  document.getElementById("error").innerHTML = str;
}

function log(str) {
  document.getElementById("log").innerHTML += str + "\n";
}

var swSupported = "serviceWorker" in navigator;
var pushSupported = "PushManager" in window;

document.getElementById("service-worker-supported").innerHTML = "Service Worker is " + (swSupported ? "" : "not ") + "supported.";

document.getElementById("push-manager-supported").innerHTML = "Push Manager is " + (pushSupported ? "" : "not ") + "supported.";

(function(registerServiceWorkerBtn) {
  if (!swSupported) {
    registerServiceWorkerBtn.disabled = true;
    return;
  }
})(document.getElementById("sw-register-btn"));
