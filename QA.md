- Tailwind styles don't load when using remote federated componen, possible race condition? Can mitigate for now by including tailwind <script src="https://cdn.tailwindcss.com"></script> in index file but likely a better option available once integrated properly

- Vite had issues building when using node version 14.X.X (maybe unsuprsingly), works fine with 18.X.X
