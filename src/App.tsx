import LandingPage from './LandingPage';

export default function App() {
  const handleEnterApp = () => {
    // This would navigate to the app in a real implementation
    console.log('Entering app...');
  };

  return <LandingPage onEnterApp={handleEnterApp} />;
}
