# ⌨️ WASD Trainer

A desktop application for mastering WASD keyboard controls with real-time performance tracking.

## 🎮 Features

- **2 Training Modes**
  - 🎲 **Speedcube Mode**: Realistic speedcubing patterns
  - 🎯 **General Training**: Random WASD sequences

- **4 Difficulty Levels**
  - 🟢 **Easy**: Slow pace, 5-10 keys
  - 🟡 **Medium**: Normal pace, 10-15 keys
  - 🔴 **Hard**: Fast pace, 15-20 keys
  - ⚫ **Expert**: Extreme speed, 20+ keys

- **Real-Time Statistics**
  - Accuracy percentage
  - Speed (presses per minute)
  - Total key presses
  - Elapsed time

- **Visual Feedback**
  - Animated WASD keyboard display
  - Color-coded key responses (Green ✓ / Red ✗)
  - Pattern sequence display
  - Next key indicator

- **Full Controls**
  - Pause/Resume training
  - Reset progress
  - Back to menu

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

```bash
# Clone or navigate to the repository
cd wasd-trainer

# Install dependencies
npm install

# Start the app
npm start
```

## 📁 Project Structure

```
WASD-train/
├── main.js          # Electron application entry point
├── preload.js       # Electron security layer
├── index.html       # Application UI
├── styles.css       # Styling and animations
├── trainer.js       # Game logic and state management
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## 🎯 How to Use

1. **Launch the app** with `npm start`
2. **Select a mode**: Speedcube or General Training
3. **Choose difficulty**: Easy, Medium, Hard, or Expert
4. **Start training**: Follow the pattern displayed and press the correct keys
5. **Monitor stats**: Watch your accuracy and speed improve in real-time
6. **Pause/Reset**: Use controls as needed

## 🔧 Controls

- **W, A, S, D**: Main training keys
- **Pause Button**: Pause/resume training
- **Reset Button**: Restart the current session
- **Close Button (✕)**: End training and return to menu

## 📊 Statistics Explained

- **Accuracy**: Percentage of correct key presses vs total presses
- **Speed**: Key presses per minute (PPM)
- **Presses**: Total number of keys you've pressed
- **Time**: Elapsed time in seconds

## 🎨 UI Features

- Beautiful gradient design with purple and blue tones
- Smooth animations and transitions
- Responsive layout
- Visual key press feedback with animations
- Real-time feedback messages

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🎓 Tips for Training

1. Start with **Easy** mode to get comfortable
2. Focus on **accuracy** before speed
3. Practice **consistency** over long sessions
4. Gradually increase difficulty as you improve
5. Take breaks to avoid fatigue

---

**Made for speedcubers and keyboard enthusiasts!** ⌨️✨
