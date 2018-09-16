console.log("app.sw.js");

console.log("navigator.serviceWorker", navigator.serviceWorker);

window.addEventListener("load", onLoad);

function onLoad() {
  function printRegistration(registration) {
    const { active, installing, waiting } = registration;
    console.log(registration);
    console.log("  active", active);
    console.log("  installing", installing);
    console.log("  waiting", waiting);
  }

  navigator.serviceWorker.addEventListener("controllerchange", (e) => {
    console.log("navigator.serviceWorker.oncontrollerchange has fired", e);
  });

  navigator.serviceWorker.ready.then((registration) => {
    console.log("navigator.serviceWorker.ready has resolved");
    printRegistration(registration);
  });

  (function (btn) {
    function register() {
      const controller = navigator.serviceWorker.controller;
      if (controller) {
        navigator.serviceWorker.controller.onstatechange = (e) => {
          console.log("controller state change", e);
        };
      }
      return navigator.serviceWorker.register("sw.js")
        .then((reg) => {
          reg.onupdatefound = (e) => {
            btn.innerHTML = "Update";
            btn.onclick = (e) => {
              window.location.reload();
            };
          };
          console.log("post register", reg);
          printRegistration(reg);
          if (!reg.installing && !reg.waiting) {
            btn.innerHTML = "No updates found";
          }
        })
        .catch((err) => showError(err));
    }

    if (navigator.serviceWorker.controller) {
      btn.innerHTML = "Check for updates";
      register();
    } else {
      btn.onclick = (e) => {
        log("No existing sw");
        register();
      };
    }
  })(document.getElementById("sw-register-btn"));

  (function (btn, input) {
    navigator.serviceWorker.ready.then((registration) => {
      btn.onclick = function () {
        console.log("Can post messages to",
          "active", !!registration.active, "installing",
          !!registration.installing, "waiting",
          !!registration.waiting);
        if (registration.active) registration.active.postMessage(input.value);
        if (registration.installing) registration.installing.postMessage(input.value);
        if (registration.waiting) registration.waiting.postMessage(input.value);
      };
    });
  })(document.getElementById("sw-postmessage-btn"), document.getElementById("sw-message-input"));

  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log("navigator.serviceWorker.message", e);
  });
}

setInterval((e) => {
  fetch("./intercept-me.html?" + Date.now());
}, 5000);
