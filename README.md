# Linzo Meet - Integrated Sign Language Video Conferencing 

A comprehensive video conferencing platform that combines real-time communication with sign language translation for inclusive communication between hearing and deaf participants.

## Features

### 🎥 Video Conferencing
- High-quality peer-to-peer video calls
- Screen sharing capabilities
- Microphone and camera controls
- Real-time participant management

### 🤟 Sign Language Integration
- **Real-time Speech Recognition**: Convert spoken words to text instantly
- **3D Avatar Animation**: Animated 3D characters perform sign language gestures
- **Text Input Support**: Manual text entry for precise communication
- **Multiple Avatar Options**: Choose between different 3D character models
- **Accessibility Focused**: Designed for inclusive communication

### 🔧 Technical Features
- WebRTC-based peer-to-peer communication
- Socket.IO for real-time signaling
- Three.js for 3D avatar rendering
- Speech recognition API integration
- Responsive design for all devices

## Getting Started

### Prerequisites
- Node.js 16+ 
- MongoDB
- Modern web browser (Chrome, Edge, Safari recommended for speech recognition)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Linzo-Meet
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both `server/` and `client/` directories:
   
   **Server (.env):**
   ```env
   MONGO_URI=mongodb://localhost:27017/linzo_meet
   JWT_SECRET=your_jwt_secret_here
   CLIENT_ORIGIN=http://localhost:5173
   PORT=5000
   ``` 
   
   **Client (.env):**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SIGNALING_URL=http://localhost:5000
   ```

5. **Start the application**
   
   **Terminal 1 - Start server:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Open http://localhost:5173 in your browser
   - Register/Login to access the dashboard
   - Create or join meetings

## Usage

### Creating Meetings

1. **Regular Meeting**: Standard video conferencing without sign language
2. **Sign Language Meeting**: Enhanced meeting with real-time translation

### Using Sign Language Features

1. **Enable Sign Language Panel**: Click "Show Sign Language" button
2. **Choose Avatar**: Select between XBOT and YBOT 3D models
3. **Speech Recognition**: Click "Start Listening" to convert speech to sign language
4. **Text Input**: Type text manually for precise translation
5. **Real-time Translation**: Watch the 3D avatar perform sign language gestures

### Meeting Controls

- **Microphone**: Toggle audio on/off
- **Camera**: Toggle video on/off
- **Screen Share**: Share your screen with participants
- **Sign Language Panel**: Show/hide the translation interface

## Architecture

### Frontend (React + Vite)
- **Components**: Modular React components for maintainability
- **State Management**: React hooks for local state
- **3D Rendering**: Three.js for avatar animations
- **Speech Recognition**: Web Speech API integration

### Backend (Node.js + Express)
- **WebRTC Signaling**: Socket.IO for peer connection management
- **Authentication**: JWT-based user authentication
- **Database**: MongoDB for user and meeting data
- **Real-time Communication**: WebSocket support

### Sign Language System
- **Animation Engine**: Custom animation system for hand gestures
- **Gesture Library**: Pre-defined sign language animations
- **Real-time Processing**: Instant text-to-sign conversion
- **Accessibility**: Designed for inclusive communication

## Browser Support

- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Safari**: Full support
- **Firefox**: Limited speech recognition support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Sign Language Animations**: Based on Indian Sign Language (ISL) gestures
- **3D Models**: Custom avatar models for sign language representation
- **WebRTC**: Real-time communication technology
- **Accessibility**: Focus on inclusive design principles

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review browser compatibility requirements

---

**Note**: This system is designed for educational and accessibility purposes. For production use, ensure proper security measures and compliance with relevant accessibility standards.
