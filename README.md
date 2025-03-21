# GlamHaven - Lebanese Dress Rental Gallery

A beautiful dress rental gallery website built with Next.js and React. Features a paper-like grain effect, beautiful hero section, and a responsive gallery.

## Features

- Beautiful hero section with a stunning background image
- Responsive gallery with category filters
- Image lightbox for detailed views
- Paper-like grain texture throughout the site
- Mobile-friendly design
- Clean, organized component structure for future expandability

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Testing**: Jest and React Testing Library
- **Code Quality**: ESLint, Prettier
- **SEO**: Next SEO
- **CI/CD**: GitHub Actions

## Installation

To install the required dependencies, run:

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run analyze` - Analyze the bundle size

## Production Build

To create a production build:

```bash
npm run build
```

And to start the production server:

```bash
npm start
```

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Navbar.tsx        # Navigation component
│   ├── Hero.tsx          # Hero section component
│   ├── Gallery.tsx       # Gallery component
│   └── Footer.tsx        # Footer component
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── store/                # Zustand state management
├── utils/                # Utility functions
├── .github/              # GitHub Actions workflows
├── public/               # Static assets
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Testing

We use Jest and React Testing Library for testing. Run tests with:

```bash
npm test
```

## Deployment

The application is automatically deployed through GitHub Actions when changes are pushed to the main branch.

## Future Enhancements

- Add authentication for admin uploads
- Implement a booking system
- Add a dress detail page
- Integrate a CMS for content management
- Add more animations and interactive elements

## License

MIT 