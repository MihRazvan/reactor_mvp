# π-Core Reactor Builder

A fast-clicking reactor building game where players click colored reactor layers to generate energy points and unlock π digits. Built with React + TypeScript + Vite, designed for future blockchain integration.

## 🎮 Game Concept

- **Fast-clicking reactor building game** where players click colored reactor layers
- **Only clicking the correct colored layer** generates energy points
- **Wrong color clicks** generate no points but don't break the game
- **Each correct click = 1 energy point** and triggers a FastSet claim
- **Goal is to unlock π digits** by reaching energy thresholds
- **Colors change speed increases** with each π stage

## 🎯 Core Mechanics

### Reactor System
- **Multi-layered circular reactor** with 4-5 colored concentric rings
- **Target color indicator** shows which ring to click
- **Progressive energy requirements**: 
  - "3" needs 15 points
  - "3.1" needs 25 points
  - "3.14" needs 40 points
  - And so on...

### Color Change Speeds
- Stage "3" = 4 seconds
- Stage "3.1" = 3 seconds
- Stage "3.14" = 2 seconds
- Down to 0.7 seconds for advanced stages

### Energy System
- **Energy decays** if no clicking
- **Resets π progress** to "3" if energy reaches 0
- **Instant restart capability**

## 🎨 Visual Features

- **Reactor rings change appearance/complexity** as π digits unlock
- **Correct clicks = bright energy pulse**
- **Wrong clicks = dim flash**
- **π progress display**: "Building π = 3.1415926..."
- **Current energy counter, target color indicator, stage display**
- **Smooth color transitions** between targets

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reactor_mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Deployment

#### Vercel Deployment (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Or simply connect your GitHub repository to Vercel for automatic deployments.

3. **Manual Deployment**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically build and deploy your app

#### Other Deployment Options

- **Netlify**: Connect your GitHub repo to Netlify
- **GitHub Pages**: Use `npm run build` and deploy the `dist` folder
- **Firebase Hosting**: Use Firebase CLI to deploy the `dist` folder

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Game.tsx          # Main game component
│   ├── Reactor.tsx       # Reactor visualization
│   ├── GameUI.tsx        # Game interface
│   └── *.css             # Component styles
├── hooks/
│   └── useGameState.ts   # Game logic hook
├── services/
│   └── fastSetService.ts # FastSet API integration
├── types/
│   └── game.ts          # TypeScript interfaces
├── utils/
│   └── gameConfig.ts    # Game configuration
└── styles/
    └── *.css            # Global styles
```

### Key Features

#### 🎮 Game Logic (`useGameState.ts`)
- **State management** for energy, π progression, colors
- **Click detection** and scoring system
- **Energy decay** mechanics
- **Color change intervals** based on π stage
- **π progression** logic

#### 🔧 FastSet Integration (`fastSetService.ts`)
- **Mock API calls** using fetch()
- **Retry logic** with exponential backoff
- **Error handling** and validation
- **Ready for blockchain integration**

#### 🎨 Visual Effects
- **CSS animations** for reactor effects
- **Responsive design** for desktop screens
- **Smooth transitions** and hover effects
- **Background particle effects**

## 🔗 Future Blockchain Integration

### Prepared Architecture
- **Component structure** ready for wallet connections
- **State management** handles both game and blockchain state
- **API structure** ready for on-chain leaderboards
- **TypeScript interfaces** for blockchain data types

### Planned Features
- **Wallet connection** (MetaMask, WalletConnect)
- **On-chain energy claims** via FastSet
- **Leaderboards** with blockchain verification
- **NFT rewards** for π milestones
- **Decentralized governance** for game parameters

### FastSet Integration
- **Energy point claims** on every correct click
- **Transaction verification** and confirmation
- **Claim history** and validation
- **Error handling** and retry mechanisms

## 🎯 Game Stages

| Stage | Energy Required | Color Speed | Description |
|-------|----------------|-------------|-------------|
| 3     | 15 points      | 4.0s        | Building π = 3... |
| 3.1   | 25 points      | 3.0s        | Building π = 3.1... |
| 3.14  | 40 points      | 2.0s        | Building π = 3.14... |
| 3.141 | 60 points      | 1.5s        | Building π = 3.141... |
| 3.1415| 85 points      | 1.2s        | Building π = 3.1415... |
| 3.14159| 115 points     | 1.0s        | Building π = 3.14159... |
| 3.141592| 150 points     | 0.8s        | Building π = 3.141592... |
| 3.1415926| 200 points   | 0.7s        | Building π = 3.1415926... |

## 🛠️ Technical Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling and animations
- **ESLint** - Code linting

## 🎨 Design System

### Color Palette
- **Primary**: `#4ECDC4` (Teal)
- **Secondary**: `#FF6B6B` (Red)
- **Accent**: `#45B7D1` (Blue)
- **Success**: `#96CEB4` (Green)
- **Warning**: `#FFEAA7` (Yellow)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🚀 Development Roadmap

### Phase 1: Core Game ✅
- [x] React + TypeScript + Vite setup
- [x] Reactor visualization
- [x] Game logic and state management
- [x] Visual effects and animations
- [x] Responsive design

### Phase 2: FastSet Integration ✅
- [x] Mock FastSet API service
- [x] Energy claim system
- [x] Error handling and retry logic
- [x] Claim validation

### Phase 3: Blockchain Integration (Planned)
- [ ] Wallet connection
- [ ] Real FastSet API integration
- [ ] On-chain transactions
- [ ] Leaderboard system
- [ ] NFT rewards

### Phase 4: Advanced Features (Planned)
- [ ] Multiplayer support
- [ ] Tournament system
- [ ] Advanced animations
- [ ] Sound effects
- [ ] Mobile optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **FastSet Team** for blockchain integration inspiration
- **π (Pi)** for mathematical inspiration

---

**Ready to build the future of gaming on the blockchain! 🚀**
