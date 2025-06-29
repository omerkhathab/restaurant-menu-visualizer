# Restaurant Menu Visualizer

Ever been at a restaurant staring at a menu full of unfamiliar dish names? Wondering what "Tandoori Chicken" or "Samosas" actually looks like? This app solves that problem!

Simply upload an image of any restaurant menu, and the app will extract all the food items from the menu and show you actual photos of what each dish looks like

## Tech Stack

### Backend
- **Flask** - Python web framework
- **Tesseract OCR** - Text extraction from images
- **Groq API** - AI-powered menu item parsing
- **DuckDuckGo Search** - Image search functionality

### Frontend
- **React + TypeScript + Tailwind CSS** - UI
- **Lucide React** - Icons
- **Axios** - HTTP client

## Prerequisites

Before running this application, make sure you have:

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Tesseract OCR installed on your system
- Groq API key

### Installing Tesseract OCR

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

**macOS:**
```bash
brew install tesseract
```

**Windows:**
Download and install from: https://github.com/UB-Mannheim/tesseract/wiki

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/omerkhathab/restaurant-menu-visualizer.git
cd restaurant-menu-visualizer
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your Groq API key
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install
# or
yarn install
```

## Configuration

### Environment Variables

Visit [Groq Console](https://console.groq.com/) and get your API key
Create a `.env` file in the `backend` directory:

```env
GROQ_API_KEY=YOUR_API_KEY
```

## Usage

### 1. Start the Backend Server
```bash
cd backend
python app.py
```
The Flask server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The React app will start on `http://localhost:5173`