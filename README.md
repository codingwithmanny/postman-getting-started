# Getting Started With Postman

Details coming soon...

---

## Requirements

- pnpm
- NVM or node 18.16.1

---

## Local Setup

```bash
# FROM: ./

cp .env.example .env;
pnpm install;
pnpm db:generate;
pnpm db:seed;
```

---

## Local Testing

```bash
# FROM: ./

pnpm test:newman;
```

---

## Local Development

```bash
# FROM: ./

pnpm dev;
```