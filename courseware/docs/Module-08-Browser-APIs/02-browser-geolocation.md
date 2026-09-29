# Browser Geolocation API

The **Geolocation API** lets a web page ask the browser **where the user is**: their latitude and
longitude, and sometimes altitude, heading, and speed. It powers "find stores near me," delivery
tracking, weather-by-location, and map centering.

Because location is sensitive, the browser **always asks the user for permission** first, and the API
only works over a **secure context** (HTTPS, or `localhost` during development).

---

## Is it available?

Geolocation lives on the `navigator` object. Check for it before using it, since not every
environment provides it.

```js
if ("geolocation" in navigator) {
  console.log("Geolocation is supported");
} else {
  console.log("Geolocation is not available");
}
```

---

## Getting the current position

`navigator.geolocation.getCurrentPosition(success, error, options)` requests the location **once**.
It's asynchronous: you pass a **success callback** and (recommended) an **error callback**.

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log("You are at:", latitude, longitude);
  },
  (error) => {
    console.error("Could not get location:", error.message);
  }
);
```

The first time this runs, the browser shows a permission prompt. Nothing happens until the user
chooses **Allow** or **Block**.

---

## The position and coords object

The success callback receives a `GeolocationPosition` object with two parts:

* `position.timestamp`: when the reading was taken (milliseconds since 1970).
* `position.coords`: a `GeolocationCoordinates` object with the actual data.

```js
navigator.geolocation.getCurrentPosition((position) => {
  const c = position.coords;

  console.log("latitude:", c.latitude);   // e.g. 47.6062
  console.log("longitude:", c.longitude); // e.g. -122.3321
  console.log("accuracy:", c.accuracy);   // radius of uncertainty in meters
  console.log("altitude:", c.altitude);   // meters, or null if unavailable
  console.log("heading:", c.heading);     // degrees, or null
  console.log("speed:", c.speed);         // meters/second, or null
  console.log("taken at:", position.timestamp);
});
```

`latitude`, `longitude`, and `accuracy` are always present. The others (`altitude`, `heading`,
`speed`) are often `null` on devices without the right sensors, since a laptop usually can't report speed.

---

## Error handling and permissions

The error callback receives a `GeolocationPositionError` with a numeric `code` and a `message`. Handle
each case so the user understands what went wrong.

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Got it:", position.coords.latitude);
  },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User blocked location access.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request timed out.");
        break;
      default:
        console.log("An unknown error occurred.");
    }
  }
);
```

* `PERMISSION_DENIED`: the user declined, or the page isn't on HTTPS.
* `POSITION_UNAVAILABLE`: no position could be determined (no signal, sensor failure).
* `TIMEOUT`: no position arrived within the `timeout` you set (see options below).

You can also inspect permission state ahead of time with the Permissions API, without triggering a
prompt:

```js
const status = await navigator.permissions.query({ name: "geolocation" });
console.log(status.state); // "granted", "denied", or "prompt"
```

---

## Options: accuracy, timeout, and caching

All three methods accept an optional **options object** as the last argument.

```js
const options = {
  enableHighAccuracy: true, // ask for the most precise reading available
  timeout: 5000,            // give up after 5000 ms and call the error callback
  maximumAge: 0,            // don't reuse a cached position; get a fresh one
};

navigator.geolocation.getCurrentPosition(
  (position) => console.log(position.coords.latitude),
  (error) => console.error(error.message),
  options
);
```

* **`enableHighAccuracy`**: `true` requests GPS-level precision. It's slower and uses more battery,
  so only turn it on when you truly need it (e.g. turn-by-turn navigation).
* **`timeout`**: maximum time (ms) to wait before failing with a `TIMEOUT` error. Without it, a
  request can hang indefinitely.
* **`maximumAge`**: how old (ms) a cached position may be before a fresh reading is required. `0`
  always fetches new; a larger value returns a recent cached fix instantly if available.

---

## Watching position: `watchPosition` and `clearWatch`

When you need **continuous** updates (following a user on a map, tracking a run),
`watchPosition` calls your success callback **every time the location changes**. It returns a
**watch id** you later pass to `clearWatch` to stop.

```js
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log("Moved to:", position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    console.error("Watch error:", error.message);
  },
  { enableHighAccuracy: true }
);

// later, when you no longer need updates:
navigator.geolocation.clearWatch(watchId);
```

Always call `clearWatch` when you're done, because an active watch keeps sensors running and drains
battery. It's the geolocation equivalent of clearing an interval.

---

## A complete example

Putting it together: request a location, show it, and handle every outcome.

```html
<!DOCTYPE html>
<html>
  <body>
    <button id="locate">Find my location</button>
    <p id="result">Location not requested yet.</p>

    <script>
      const button = document.getElementById("locate");
      const result = document.getElementById("result");

      button.addEventListener("click", () => {
        if (!("geolocation" in navigator)) {
          result.textContent = "Geolocation is not supported.";
          return;
        }

        result.textContent = "Locating...";

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            result.textContent = `You are at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          },
          (error) => {
            result.textContent = "Error: " + error.message;
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
    </script>
  </body>
</html>
```

---

## Summary

* The **Geolocation API** lives on `navigator.geolocation` and needs **user permission** and a
  **secure context** (HTTPS or `localhost`).
* **`getCurrentPosition(success, error, options)`** requests the location **once**.
* The success callback gets a **position** object; the real data is in **`position.coords`**
  (`latitude`, `longitude`, `accuracy`, and possibly `altitude`/`heading`/`speed`).
* Always provide an **error callback** and handle `PERMISSION_DENIED`, `POSITION_UNAVAILABLE`, and
  `TIMEOUT`.
* Tune behavior with **options**: `enableHighAccuracy`, `timeout`, and `maximumAge`.
* **`watchPosition`** streams continuous updates; stop it with **`clearWatch(id)`**.
