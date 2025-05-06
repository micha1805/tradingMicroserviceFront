# Trading Microservice Frontend

A Next.js-based frontend application for the trading microservice platform.

## Environment Setup

The application supports four different environments:

1. Local with mocks (`dev:mock`)
2. Local without mocks (`dev:nomock`)
3. Staging (`dev:staging`)
4. Production (`dev:prod`)

### Environment Files

Create the following environment files in your project root:

```bash
.env.local.mock      # Local development with mock API
.env.local.nomock    # Local development with real API
.env.staging         # Staging environment
.env.production      # Production environment
```

The appropriate environment file will be copied to `.env.local` when running the corresponding npm script. Next.js will then automatically load the environment variables from `.env.local`.

Example environment file structure:
```env
NEXT_PUBLIC_API_URL=<api-url>
NEXT_PUBLIC_USE_MOCK=true|false
```

### Available Scripts

Development:
```bash
# Run locally with mock API
npm run dev:mock

# Run locally with real API
npm run dev:nomock

# Run with staging configuration
npm run dev:staging

# Run with production configuration
npm run dev:prod
```

Build and Start:
```bash
# Build for staging
npm run build:staging

# Build for production
npm run build:prod

# Start staging build
npm run start:staging

# Start production build
npm run start:prod
```

Other Commands:
```bash
# Run linter
npm run lint
```

## Mock Data & Features

When running in mock mode (`dev:mock`), the application provides a fully functional experience without requiring a backend connection.

### Mock Data Includes

- **User Profile**: 
  - Email: `test@example.com`
  - Password: `password`
  - Name: John Doe
  - Full profile information

- **Trading Data**:
  - Initial Balance: $1,000.00
  - Open Trades:
    - AAPL: 100 shares at $187.50
    - GOOGL: 50 shares at $1,412.00
    - MSFT: 75 shares at $410.50
  - Closed Trades:
    - TSLA: 30 shares (Profit)
    - NVDA: 25 shares (Loss)
    - META: 40 shares (Loss)

### Mock Features

All features work with mock data:
- Authentication (login/signup)
- Trading operations
- Balance tracking
- P&L calculations
- Wire transfers

## Dependencies

- Next.js 14.1.0
- React 18.2.0
- Tailwind CSS
- HeadlessUI
- Axios
- React Hook Form
- Zustand

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create the necessary environment files as described above
4. Run the development server with your preferred environment configuration

## Best Practices

- Never commit environment files to the repository
- Use `.env.example` as a template for required environment variables
- Always use the appropriate environment script for your development context

## Project Structure

```
├── .env.local.mock      # Local mock environment config
├── .env.local.nomock    # Local real API environment config
├── .env.staging         # Staging environment config
├── .env.production      # Production environment config
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   └── lib/           # Utilities and API clients
│       ├── api.ts     # API client with real/mock switching
│       └── mockApi.ts # Mock implementations
├── public/             # Static files
└── package.json        # Project dependencies and scripts
```

## Features

- 📈 Real-time trading dashboard
- 💰 Portfolio management
- 📊 P&L tracking
- 💸 Wire transfer functionality
- 🔒 Secure authentication
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Zustand

## Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd tradingMicroserviceFront
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create the necessary environment files as described above
4. Run the development server with your preferred environment configuration:
```bash
# Using pnpm
pnpm dev:mock      # Local with mocks
pnpm dev:nomock    # Local without mocks
pnpm dev:staging   # Staging environment
pnpm dev:prod      # Production environment

# Or using npm
npm run dev:mock
npm run dev:nomock
npm run dev:staging
npm run dev:prod
```

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── auth/           # Authentication pages
│   └── dashboard/      # Dashboard and trading pages
├── components/         # Reusable React components
├── lib/               # Utilities and API clients
│   ├── api.ts         # API client with real/mock switching
│   └── mockApi.ts     # Mock implementations
├── store/             # Zustand state management
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 