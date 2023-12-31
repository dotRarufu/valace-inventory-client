/// <reference types="vite/client" />

interface ImportMetaEnv {
  // readonly VITE_URL: string;
  readonly VITE_POCKETBASE_ADDRESS: string;
  readonly VITE_BACKEND_ADDRESS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
