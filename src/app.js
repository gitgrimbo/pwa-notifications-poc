import * as sw from "./register-service-worker";
import * as notifications from "./notifications";
import * as push from "./push";

sw.init(document.getElementById("service-worker"));
push.init(document.getElementById("push"));
notifications.init(document.getElementById("notifications"));

// see if fetch is working
setInterval((e) => {
  fetch("./intercept-me.html?" + Date.now());
}, 5000);
