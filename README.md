<h1 id="title" align="center">ValAce Inventory</h1>

<p id="description">a client-side application for Valenzuela City Library inventory system</p>

<h2>🔨 Installation</h2>

<p>Install packages</p>

```
npm install --force
```

<h2>⚙️ Setup</h2>

<p>Create <code>.env</code> file in root with these:</p>

| Keys                      | Example                   | Description                           |
|---------------------------|---------------------------|---------------------------------------|
| VITE_POCKETBASE_ADDRESS   | http://170.10.31.175:8090 | Address of pocketbase instance        |
| VITE_BACKEND_ADDRESS      | http://172.17.0.1:3002    | Address of back-end operations server |
| ADMIN_EMAIL (Optional)    | admin1@email.com          | Admin email for generating types      |
| ADMIN_PASSWORD (Optional) | admin1password            | Admin password for generating types   |

<h2>🏃 Run</h2>

```
npm run host
```

<h2>💻 Built with</h2>

- React
- Pocketbase
- Tailwind
- DaisyUI
