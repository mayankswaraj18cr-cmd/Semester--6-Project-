# E-Commerce Market Portal

A mobile-friendly e-commerce portal prototype for browsing products, managing a cart, placing orders, and viewing admin data.

## Overview

This semester project demonstrates the core workflow of an online marketplace in a self-contained browser application. The prototype models a full-stack architecture with an HTML/CSS interface, a JavaScript state layer, PHP backend examples, and MySQL database concepts while keeping the demo easy to run locally.

## Features

- User login form with status feedback
- Product browsing and cart quantity controls
- Order history and admin views
- Stock-aware cart controls and checkout validation
- Admin product creation and deletion
- Architecture and implementation notes inside the demo

## JavaScript Programming

The interactive behavior lives in [src/app.js](src/app.js), loaded by [ecommerce_portal.html](ecommerce_portal.html). It uses browser APIs and plain modern JavaScript without a framework or build step.

### Main responsibilities

- Maintains in-memory product, cart, order, user, and session state
- Switches between login, products, cart, orders, and admin views
- Renders each view from the current state after user actions
- Validates login credentials and admin product input
- Prevents adding or incrementing items beyond available stock
- Calculates cart totals and creates confirmed orders
- Shows the PHP login example included in the admin view

### Data model

Products use `id`, `name`, `price`, `qty`, and `icon` fields. Cart entries store a `productId` and quantity, while orders store an order number, product summary, quantity, total, and status. This mirrors the tables that a future PHP/MySQL backend can persist.

The current data is intentionally in memory, so refreshing the page resets products, cart contents, login state, and orders. The demo credential is `mayank@store.com` with password `pass123`.

## Project Structure

```
.
├── ecommerce_portal.html                    # interactive e-commerce portal demo
├── src/
│   ├── app.js                                # portal state, rendering, and event handlers
│   └── .gitkeep                               # keeps the source directory in Git
├── assets/                                  # reserved for images and diagrams
│   ├── .gitkeep                               # keeps the assets directory in Git
├── docs/
│   ├── Ecommerce_Portal_Research_Paper.pdf  # research and problem framing
│   └── Ecommerce_Portal_Presentation.pptx   # project presentation
├── LICENSE
└── README.md
```

## Getting Started

```bash
git clone https://github.com/mayankswaraj18cr-cmd/Semester--6-Project-.git
cd Semester--6-Project-
```

Open `ecommerce_portal.html` in a browser to run the interactive prototype. No package installation, build step, or server is required for the current demo.

For a local server, run one of these commands from the repository root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/ecommerce_portal.html
```

Using a local server is useful when adding more modules or testing browser loading behavior. The current page works directly from the filesystem as well.

## User Flows

1. Log in with the demo credential.
2. Browse products and add items to the cart.
3. Open the cart to change quantities within stock limits.
4. Check out and open Orders to view the confirmed order.
5. Open Admin to add or remove products and inspect the PHP example.

## Development Notes

The front end is deliberately dependency-free. Keep UI state and rendering logic in `src/app.js`, keep presentation markup and styles in `ecommerce_portal.html`, and place future images or diagrams in `assets/`. A production version should move authentication, inventory checks, order creation, and credentials to a server-side API rather than trusting browser state.

Before committing changes, check JavaScript syntax and whitespace:

```bash
node --check src/app.js
git diff --check
```

The browser is the behavior test surface for this prototype: verify login, navigation, stock limits, cart totals, checkout, admin add/delete, and the PHP example toggle.

## Documentation

- [Research Paper](docs/Ecommerce_Portal_Research_Paper.pdf) - background and problem framing
- [Project Presentation](docs/Ecommerce_Portal_Presentation.pptx) - project overview and design summary

## Roadmap

- [ ] Connect login and checkout to a PHP backend
- [ ] Add persistent MySQL product, user, cart, and order data
- [ ] Move product and order state from memory to API responses
- [ ] Add automated browser tests for the main user flows

## Branches

- `main` - stable project branch
- `develop` - integration branch for completed work
- `docs/updates` - documentation and presentation updates
- `feature/javascript` - JavaScript behavior and browser interaction work
- `feature/ui` - layout, accessibility, and visual improvements
- `test/portal-flows` - manual and automated flow checks

## License

MIT - see [LICENSE](LICENSE)

## Contact

Mayank Swaraj - [mayankswaraj18cr@gmail.com](mailto:mayankswaraj18cr@gmail.com)