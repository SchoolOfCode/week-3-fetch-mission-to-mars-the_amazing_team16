// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);

    const response2 = await fetch("/api/personnel/8");
    const data2 = await response2.json();
    console.log(data2);

    const response3 = await fetch("/message/to");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });
