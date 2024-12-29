# Online Art Gallery

## 🌟 Overview

Online Art Gallery - platform for sharing and managing artworks.

## 🌟 Project Setup

1. Clone the repository
2. Run the `init.ps1` script to set up the project environment.
3. Set up the `.env` file.

## 🛠 Technology Stack

### API (Backend)

- **Core**

  - [Bun](https://bun.sh) - High-performance JavaScript runtime
  - [Express](https://expressjs.com) - Web framework
  - [TypeScript](https://www.typescriptlang.org/) - Type safety

- **Database & Storage**
  - [MongoDB](https://www.mongodb.com) - Primary database
    - [Mongoose](https://mongoosejs.com) - ODM
    - [@typegoose/typegoose](https://typegoose.github.io/typegoose/) - TypeScript models
  - [Redis](https://redis.io) (Upstash) - Cache & OTP storage
    - [@upstash/redis](https://docs.upstash.com/redis) - Redis client

[//]: # "    - [ioredis](https://github.com/luin/ioredis) - Redis ORM"

- **Authentication & Security**

  - [JWT](https://jwt.io/) - Token-based auth
  - [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
  - [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)
  - [cookie-parser](https://github.com/expressjs/cookie-parser)
  - [cors](https://github.com/expressjs/cors)

- **Real-time**

  - [Socket.IO](https://socket.io) - WebSocket implementation

- **Validation & Error Handling**

  - [Zod](https://zod.dev) - Schema validation
  - [http-errors](https://github.com/jshttp/http-errors)
  - [envalid](https://github.com/af/envalid) - Environment validation

- **Logging & Monitoring**
  - [Pino](https://getpino.io) - Logger
  - [pino-http](https://github.com/pinojs/pino-http)
  - [pino-pretty](https://github.com/pinojs/pino-pretty)

### Client (Frontend)

- **Core**

  - [Next.js 14](https://nextjs.org) - React framework
  - [TypeScript](https://www.typescriptlang.org/)
  - [React](https://reactjs.org)

- **State Management & Data Fetching**

  - [Zustand](https://zustand-demo.pmnd.rs/) - Client state
  - [Axios](https://axios-http.com) - HTTP client

- **UI & Styling**

  - [Tailwind CSS](https://tailwindcss.com)
  - [Shadcn/ui](https://ui.shadcn.com) - UI components
  - [Radix UI](https://www.radix-ui.com) - Headless components
  - [Lucide Icons](https://lucide.dev)

- **Forms & Validation**

  - [React Hook Form](https://react-hook-form.com)
  - [Zod](https://zod.dev)

- **Authentication**

  - [NextAuth.js](https://next-auth.js.org)
  - [JWT](https://jwt.io/)

- **Internationalization**
  - [next-intl](https://next-intl-docs.vercel.app)

## 📁 Project Structure

```plaintext
art-vault/
├── api/ # Express Backend
│ ├── src/
│ │ ├── configs/ # App configurations
│ │ ├── controllers/# Request handlers
│ │ ├── middlewares/# Custom middlewares
│ │ ├── models/ # Database models
│ │ ├── routers/ # Route definitions
│ │ ├── schemas/ # Validation schemas
│ │ ├── services/ # Business logic
│ │ ├── types/ # TypeScript types
│ │ └── utils/ # Helper functions
│ └── package.json
│
├── client/ # Next.js Frontend
│ ├── src/
│ │ ├── app/ # App router pages
│ │ ├── components/# Reusable components
│ │ ├── hooks/ # Custom hooks
│ │ ├── lib/ # Utilities
│ │ ├── services/ # API services
│ │ ├── store/ # State management
│ │ └── types/ # TypeScript types
│ └── package.json
│
└── package.json # Root package.json
```
