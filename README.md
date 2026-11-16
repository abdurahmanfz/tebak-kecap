# 🏞️ Tebak Kecap Sunda

> Traditional Sundanese word guessing game built with React, TypeScript, and love for Sundanese culture 🎋

A modern web implementation of the classic hangman-style game featuring Sundanese vocabulary, traditional Pelog-scale music, and cultural trivia. Guess the word before all the snacks (*lalawuh*) in the bamboo tray (*nyiru*) disappear!

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

### 🎮 Gameplay
- **45 Sundanese Words** across 4 cultural categories
- **Lives System**: 6 traditional snacks in a bamboo tray
- **Scoring**: Base points + bonus per remaining life
- **Hint System**: Reveal a random letter for 15 points
- **Combo System**: Consecutive correct guesses build momentum
- **Physical Keyboard Support**: Play with A-Z keys, Enter for hint, Space for next round

### 🎨 User Interface
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Smooth Animations**: Powered by Framer Motion
- **Bamboo Theme**: Authentic Sundanese aesthetic
- **Category Filtering**: Food, Culture, Language, Nature
- **Sound Toggle**: Mute/unmute game audio

### 🎵 Audio Experience
- **Pelog-Scale Melodies**: Traditional Sundanese pentatonic scale
- **Dynamic Feedback**: Different sounds for correct/wrong guesses
- **Victory & Defeat Music**: Celebratory and consoling sequences
- **Web Audio API**: High-quality synthesized bamboo sounds

### 🏛️ Cultural Learning
- **Bilingual Clues**: Sundanese and English
- **Cultural Trivia**: Learn about each word's significance
- **Category System**: Organized by cultural domains
  - **Kadaharan**: Food & Culinary
  - **Budaya & Seni**: Culture & Arts
  - **Basa & Paribasa**: Language & Wisdom
  - **Tempat & Alam**: Places & Nature

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tebak-kecap-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

---

## 🐳 Docker Deployment

### Quick Deploy with Docker

```bash
# Build the Docker image
docker build -t tebak-kecap-sunda .

# Run the container
docker run -p 8080:80 tebak-kecap-sunda
```

Access the game at `http://localhost:8080`

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

---

## 📁 Project Structure

```
tebak-kecap-react/
├── src/
│   ├── features/game/              # Main game feature module
│   │   ├── components/             # Game UI components
│   │   │   ├── Header/            # Score, streak, sound toggle
│   │   │   ├── CategoryBar/       # Category filter
│   │   │   ├── NyiruTray/        # Lives display (snacks)
│   │   │   ├── ClueCard/         # Word clues
│   │   │   ├── WordDisplay/      # Letter slots
│   │   │   ├── Keyboard/         # On-screen keyboard
│   │   │   ├── ResultModal/      # Win/loss modal
│   │   │   └── Game.tsx          # Main game component
│   │   ├── constants/            # Game configuration
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useBambooAudio.ts    # Audio system
│   │   │   ├── useWords.ts          # Data fetching
│   │   │   └── useKeyboardInput.ts  # Physical keyboard
│   │   ├── services/             # API services
│   │   ├── state/                # State management
│   │   │   ├── game.context.tsx     # Context provider
│   │   │   ├── game.reducer.ts      # State reducer
│   │   │   ├── game.hooks.ts        # State hooks
│   │   │   └── game.types.ts        # State types
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Utility functions
│   ├── shared/                   # Reusable components
│   │   ├── components/           # Button, Card, Badge, Modal
│   │   └── types/               # Shared types
│   ├── data/                    # Static data
│   │   └── words.json          # 45 Sundanese words
│   ├── App.tsx                 # Root component
│   ├── main.tsx               # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── Dockerfile               # Docker configuration
├── docker-compose.yml      # Docker Compose config
├── nginx.conf             # Nginx configuration
└── README.md             # This file
```

---

## 🛠️ Tech Stack

### Core
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite 4.5**: Lightning-fast build tool

### State & Data
- **Context API + useReducer**: Lightweight state management
- **TanStack Query v4**: Powerful data fetching and caching

### Styling & Animation
- **Tailwind CSS v3**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions

### Audio
- **Web Audio API**: Real-time audio synthesis
- **Pelog Scale**: Traditional Sundanese pentatonic melodies

---

## 🎮 How to Play

1. **Start the Game**: A random Sundanese word is selected
2. **Read the Clues**: Available in both Sundanese and English
3. **Guess Letters**:
   - Click on-screen keyboard OR
   - Press A-Z keys on your physical keyboard
4. **Watch Your Lives**: 6 snacks in the bamboo tray
   - Correct guess: Letter reveals + musical note
   - Wrong guess: One snack disappears
5. **Use Hints** (Optional):
   - Press Enter or click the hint button
   - Costs 15 points
6. **Win or Lose**:
   - **Win**: Guess all letters before running out of lives
   - **Lose**: Snacks run out (0 lives remaining)
7. **Learn**: Read the word meaning and cultural trivia
8. **Next Round**: Press Space or click button for a new word

---

## 🎯 Scoring System

- **Base Points**: 25 points per completed word
- **Life Bonus**: +5 points per remaining life
- **Hint Cost**: -15 points per hint used
- **Streak Bonus**: Consecutive wins tracked

### Example Score Calculation
```
Word completed with 4 lives remaining:
= 25 (base) + (4 × 5) (life bonus)
= 25 + 20
= 45 points
```

---

## 🌐 Environment Variables

Create a `.env` file in the project root:

```bash
# Data source mode
VITE_USE_API=false              # false = local JSON, true = API

# API endpoint (when VITE_USE_API=true)
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🧪 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Type check without building
npm run type-check

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter (if configured)
npm run lint
```

### Adding New Words

Edit `src/data/words.json`:

```json
{
  "display": "ANGKLUNG",
  "category": "Budaya & Seni",
  "clueSu": "Alat musik tradisional Sunda tina awi.",
  "clueEn": "Traditional Sundanese bamboo musical instrument.",
  "trivia": "Angklung was recognized by UNESCO as a Masterpiece of Oral and Intangible Heritage of Humanity in 2010."
}
```

### Category Options
- `Kadaharan` - Food & Culinary
- `Budaya & Seni` - Culture & Arts
- `Basa & Paribasa` - Language & Wisdom
- `Tempat & Alam` - Places & Nature

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Maintain clean architecture (feature-based structure)
4. Write meaningful component and variable names
5. Add comments for complex logic

---

## 📜 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- Inspired by traditional Sundanese culture and language
- Built with modern web technologies
- Audio system uses the Sundanese Pelog pentatonic scale
- All Sundanese words and cultural information are for educational purposes

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation in `/docs`

---

**Wilujeng Mios!** (Happy Playing!) 🎋✨
