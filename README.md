# Historical Map: Napoleonic Wars 1805

An interactive web application for exploring the major battles of the Napoleonic Wars through an immersive map-based interface. This project enables virtual journeys through historical events, visualizing the War of the Third Coalition in 1805.

## 🎯 Project Overview

This application serves as a research tool for exploring historical narratives through interactive geographic visualization. Users can navigate through significant battles chronologically, viewing their locations on an interactive map while learning about each event's historical context.

**Academic Context:** This project is part of research on virtual time travel and historical narrative experiences, demonstrating how interactive mapping technologies can enhance understanding of historical events through spatial and temporal exploration.

## ✨ Features

- **Interactive Map Navigation**: Explore battles on a dynamic Leaflet.js map with smooth animations
- **Chronological Timeline**: Navigate through events in historical sequence
- **Rich Event Details**: View battle descriptions, dates, and historical images from Wikidata
- **Keyboard Controls**: Navigate efficiently using arrow keys (←/→/↑/↓, Home/End)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data-Driven**: All historical data sourced from Wikidata for accuracy and verifiability

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd historical-map

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Leaflet.js** - Interactive mapping library
- **React-Leaflet** - React components for Leaflet
- **Wikidata** - Historical data source

## 📁 Project Structure

```
historical-map/
├── src/
│   ├── components/
│   │   ├── MapController.jsx    # Map animation controller
│   │   └── StoryCard.jsx        # Event display component
│   ├── config/
│   │   └── leafletConfig.js     # Leaflet marker configuration
│   ├── utils/
│   │   ├── imageUtils.js        # Image validation utilities
│   │   └── parseCoordinates.js  # Wikidata coordinate parser
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Application styles
│   └── main.jsx                 # Application entry point
├── data.json                    # Historical battle data (Wikidata)
├── index.html
└── package.json
```

## 🎮 Usage

### Navigation Controls

- **Next/Previous Battle**: Use the on-screen buttons or arrow keys (←/→ or ↑/↓)
- **Jump to First/Last**: Use Home/End keys
- **Interact with Map**: Click any marker to view that battle's details
- **Zoom/Pan**: Use mouse wheel and drag gestures on the map

### Data Format

Historical events are stored in `data.json` with the following structure:

```json
{
  "event": "Q123456",
  "eventLabel": "Battle Name",
  "eventDescription": "Description of the battle",
  "date": "1805-12-02T00:00:00Z",
  "coord": "Point(16.7575 49.0019)",
  "image": "https://commons.wikimedia.org/..."
}
```

## 📊 Data Source

All historical data is sourced from [Wikidata](https://www.wikidata.org/), ensuring:

- **Verifiability**: All data points are traceable to their sources
- **Accuracy**: Community-maintained and peer-reviewed information
- **Rich Media**: Historical images and detailed descriptions

## 🔧 Development

### Code Quality

```bash
# Run ESLint
npm run lint
```

### Component Architecture

The application follows modern React best practices:

- Functional components with hooks
- Memoization for performance optimization
- Separated concerns (components, utils, config)
- Clean, maintainable code structure

## 📝 Research Application

This project demonstrates the potential of interactive web technologies for:

- **Historical Education**: Making history more engaging and accessible
- **Spatial Cognition**: Understanding historical events through geographic context
- **Narrative Exploration**: Non-linear storytelling through interactive timelines
- **Digital Humanities**: Combining technology and historical scholarship

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional historical periods and conflicts
- Enhanced visualization options
- Multi-language support
- Additional data sources and cross-references

## 📄 License

This project is available for academic and educational use.

## 🙏 Acknowledgments

- Historical data provided by Wikidata and its contributors
- Map tiles from OpenStreetMap
- Built with React, Vite, and Leaflet.js
