# Momentum

Momentum is a simple offline-first gamified habit tracker.

It runs as a static web app with no build step:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`

## Run Locally

Open `index.html` in a browser.

For full PWA behavior, serve it from a local or hosted web server instead of opening it as a `file://` page.

## Publish With GitHub Pages

1. Create a new GitHub repository.
2. Push this folder to that repository.
3. In GitHub, open the repository settings.
4. Go to `Pages`.
5. Set the source to `GitHub Actions`.
6. The included workflow will deploy the site automatically.

After deployment, open the GitHub Pages URL on iPhone Safari and use:

`Share` -> `Add to Home Screen`

That gives Momentum an app-like launcher and standalone display.

## Notes

The app stores data in browser storage on the device. If you clear site data or switch browsers/devices, that local progress will not automatically sync.
