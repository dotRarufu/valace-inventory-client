#!/usr/bin/bash

npx pocketbase-typegen --url $VITE_POCKETBASE_ADDRESS --email $ADMIN_EMAIL --password $ADMIN_PASSWORD --out pocketbase-types.ts