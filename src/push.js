export function supported() {
  return "PushManager" in window;
}

export function init(container) {
  container.querySelector(".js-supported-msg").innerHTML = "Push Manager is " + (supported() ? "" : "not ") + "supported.";

  container.querySelector(".js-supported").style.display = supported() ? "" : "none";
  container.querySelector(".js-unsupported").style.display = !supported() ? "" : "none";

  if (!supported()) {
    return;
  }
}
