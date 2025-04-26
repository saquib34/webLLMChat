// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-8 mb-6">
          <span className="block">Chat with AI using</span>
          <span className="block text-primary-600">WebLLM in your browser</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Experience the power of large language models running directly in your browser.
          No server required, your data stays private.
        </p>
        <div className="mt-8 flex justify-center">
          {isSignedIn ? (
            <Link to="/chat">
              <Button size="lg">Start Chatting</Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/sign-up">
                <Button size="lg">Sign Up for Free</Button>
              </Link>
              <Link to="/sign-in">
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <Card.Content>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Privacy-First AI</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  All processing happens locally in your browser. Your conversations never leave your device.
                </p>
              </div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Content>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Multiple Models</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Choose from a variety of state-of-the-art language models optimized for different tasks.
                </p>
              </div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Content>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Fully Responsive</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Chat on any device with a responsive design that works on desktop, tablet, and mobile.
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-20 mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          How it works
        </h2>
        
        <Card>
          <Card.Content>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sign up for a free account</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Create an account to save your conversations and customize your experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select an AI model</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Choose from different language models based on your needs and preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Start chatting</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Ask questions, get creative responses, code assistance, and more - all in your browser.
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Home;