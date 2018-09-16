console.log("sw.js");

function postMessage(msg) {
  self.clients.matchAll().then((clients) => {
    console.log("postMessage", "matched clients", clients);
    clients.forEach((client) => {
      client.postMessage(msg);
    });
  });
}

function askForNotificationPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then((permissionResult) => {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
}

self.addEventListener("install", (e) => {
  console.log("sw.install", e);
  postMessage("install");
});

self.addEventListener("activate", (e) => {
  console.log("sw.activate", e);
  postMessage("activate");
});

self.addEventListener("fetch", (e) => {
  console.log("sw.fetch");
});

self.addEventListener("message", (e) => {
  console.log("message", e);
});

//updated1
