# HelloMart - Modern E-commerce Website

A modern, responsive e-commerce website built with React and Bootstrap, featuring a clean UI with glass morphism effects and smooth animations.

## 📸 Screenshots

### Desktop View
![Homepage Desktop](screenshots/desktop-home.png)
![Product Grid](screenshots/desktop-products.png)
![Shopping Cart](screenshots/desktop-cart.png)

### Mobile View
![Homepage Mobile](screenshots/mobile-home.png)
![Mobile Navigation](screenshots/mobile-cart.png)

## 🚀 Features

- **Modern UI Design**: True glass morphism effects, gradient backgrounds, and smooth animations
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop devices
- **Product Catalog**: Browse products by categories with pagination and hover effects
- **Search Functionality**: Real-time product search with filtering and responsive results
- **Enhanced Shopping Cart**: Modern table design with glass effects, quantity controls, and persistent storage
- **Checkout Process**: Multi-step form with gradient headers and glass morphism cards
- **Interactive Carousel**: Hero section with smooth navigation and real product images
- **Toast Notifications**: Animated alerts with shake effect and smooth fade-out
- **Dynamic Text Truncation**: Responsive product titles that adapt to container width

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router DOM
- **Styling**: Bootstrap 5, Custom CSS with modern effects
- **Icons**: Font Awesome
- **API**: Fake Store API for product data
- **Storage**: Local Storage for cart persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation bar with search
│   ├── ProductCard.js     # Product display card
│   └── Toast.js           # Notification component
├── pages/
│   ├── Home.js            # Homepage with carousel and products
│   ├── Cart.js            # Shopping cart page
│   ├── Checkout.js        # Checkout form page
│   ├── ProductDetail.js   # Individual product page
│   └── SearchPage.js      # Search results page
├── App.js                 # Main app component
├── App.css               # Custom styles and animations
└── index.js              # App entry point
```

## 🎨 Design Features

- **True Glass Morphism**: Semi-transparent elements (25% opacity) with 15px backdrop blur
- **Gradient Backgrounds**: Modern color schemes with smooth transitions
- **Micro-Animations**: Hover effects, shake notifications, and smooth transitions
- **Enhanced Tables**: Glass effect cart table with gradient headers
- **Responsive Grid**: Adaptive layout (2/3/4 columns) for all screen sizes
- **Modern Typography**: Clean hierarchy with dynamic text truncation
- **Visual Feedback**: Animated toasts, hover states, and loading indicators

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (2 columns product grid)
- **Tablet**: 768px - 992px (3 columns product grid)
- **Desktop**: > 992px (4 columns product grid)

## 🛒 Enhanced Cart Features

- **Modern Table Design**: Glass morphism with gradient headers
- **Persistent Storage**: localStorage with real-time navbar updates
- **Smart Quantity Controls**: Glass effect buttons with instant updates
- **Dynamic Product Display**: Responsive image containers and text truncation
- **Visual Hierarchy**: Color-coded prices and totals
- **Smooth Interactions**: Hover effects and animated feedback
- **Order Summary**: Glass effect cards with detailed breakdowns

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 🌐 API Integration

Uses [Fake Store API](https://fakestoreapi.com/) for:
- Product listings
- Product categories
- Individual product details
- Product images and descriptions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@hellomart.com or create an issue in this repository.

---

Made with ❤️ using React and Bootstrap