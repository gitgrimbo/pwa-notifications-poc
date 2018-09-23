console.log("sw.js");

function postMessage(msg) {
  self.clients.matchAll().then((clients) => {
    console.log("postMessage", "matched clients", clients);
    clients.forEach((client) => {
      client.postMessage(msg);
    });
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
