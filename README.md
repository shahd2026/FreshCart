<!-- @format -->

# Final Project

## Project Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd Final-Project
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Configuration

### Vercel Configuration

The `vercel.json` file contains rewrite rules to handle routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" },
    { "source": "/api/(.*)", "destination": "/api/index.js" }
  ]
}
```

### Vite Configuration

The `vite.config.js` file is configured to handle chunk splitting and adjust the chunk size warning limit:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
```

### CSS Styles

The `index.css` file includes custom styles and a loading spinner:

```css
/* Full-screen white overlay */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensures it stays on top */
}

/* Spinner */
.spinner {
  width: 70px;
  text-align: center;
  display: flex;
  gap: 5px;
}

/* Dots */
.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #0aad0ac0; /* Dark color */
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

/* Bounce delays */
.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

/* Animation */
@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
```
