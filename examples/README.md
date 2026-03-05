# Examples (v0.1)

This folder contains **native-first** examples only.

## Business scenario (React)
- `examples/react/LoginVipNativeFirst.tsx`
- `examples/react/LoginPage.tsx`
- `examples/react/HomePage.tsx`

## Shared mock/open API layer
- `examples/scenario/mockBusinessApi.ts`

## Scenario flow
1. get QR code
2. user inputs account/password/captcha and clicks login
3. login + token retrieval
4. navigate to home
5. fetch notices/list/VIP in parallel on home page
6. generate VIP renewal tip
