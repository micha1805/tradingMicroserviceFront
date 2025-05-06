# Trading Microservice Frontend

A modern trading platform frontend built with Next.js 14, TypeScript, Tailwind CSS, and Zustand for state management.

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
```

3. Set up environment:

Create a `.env.local` file in the project root:

```env
# For mock data (recommended for development)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_ENABLE_MOCK=true

# For real API (when ready)
# NEXT_PUBLIC_API_URL=your-api-url
# NEXT_PUBLIC_ENABLE_MOCK=false
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Development with Mock Data

The application includes a comprehensive mock implementation that simulates all API endpoints. This is useful for development and testing without a backend.

### Mock Credentials

Use these credentials to log in:
- Email: `test@example.com`
- Password: `password`

### Mock Data Includes

- **User Profile**: John Doe with complete profile information
- **Balance**: $1,000.00 initial balance
- **Open Trades**:
  - AAPL: 100 shares at $187.50
  - GOOGL: 50 shares at $1,412.00
  - MSFT: 75 shares at $410.50
- **Closed Trades**:
  - TSLA: 30 shares (Profit)
  - NVDA: 25 shares (Profit)
  - META: 40 shares (Loss)
- **Wire Transfers**: Fully mocked functionality

### Features Available in Mock Mode

1. **Authentication**
   - Login/Signup with mock credentials
   - Token-based authentication simulation
   - Protected routes

2. **Trading**
   - View open positions
   - Create new trades
   - Close existing trades
   - Real-time P&L calculations

3. **Portfolio Management**
   - View current balance
   - Track open and closed positions
   - Monitor P&L

4. **Wire Transfers**
   - Deposit funds
   - Transaction history

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── auth/           # Authentication pages
│   └── dashboard/      # Dashboard and trading pages
├── components/         # Reusable React components
├── lib/               # Utilities and API clients
├── store/             # Zustand state management
└── types/             # TypeScript type definitions
```

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Run production build
- `pnpm lint`: Run ESLint

## Switching to Real API

1. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_ENABLE_MOCK=false
```

2. Restart the development server

The application will now use the real API endpoints instead of mock data.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 