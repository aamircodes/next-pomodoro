import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Timer from './components/Timer';

export default function Home() {
  return (
    <div className='bg-base-300 min-h-screen'>
      <div className='max-w-4xl min-h-screen mx-auto flex flex-col space-y-8'>
        <Navigation />
        <Timer />
        <Footer />
      </div>
    </div>
  );
}
