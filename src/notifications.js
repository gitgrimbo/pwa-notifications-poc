export function supported() {
  return "Notification" in window;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
// requestPermission() used to be callback based, but is now Promise based.
// this function handles both.
function requestPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((permission) => {
      resolve(permission);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  });
}

export function init(container) {
  container.querySelector(".js-supported-msg").innerHTML = "Notifications is " + (supported() ? "" : "not ") + "supported.";

  container.querySelector(".js-supported").style.display = supported() ? "" : "none";
  container.querySelector(".js-unsupported").style.display = !supported() ? "" : "none";

  if (!supported()) {
    return;
  }

  const askForNotificationPermissionBtn = container.querySelector(".js-ask-for-permission-btn");
  const permissionResultEl = container.querySelector(".js-permission-result");

  permissionResultEl.innerHTML = "Initial permission: " + Notification.permission;

  askForNotificationPermissionBtn.addEventListener("click", (e) => {
    requestPermission((permission) => {
      permissionResultEl.innerHTML = permissionResult;
    });
  });

  const sendNotificationBtn = container.querySelector(".js-send-notification-btn");
  const notificationInput = container.querySelector(".js-notification-input");
  sendNotificationBtn.addEventListener("click", (e) => {
    const n = new Notification((notificationInput.value || "New Notification") + "\n" + new Date());
    console.log(n);
  });
}
