// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-9xl font-bold text-primary-600">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button>
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;