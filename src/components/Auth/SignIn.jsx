// src/components/Auth/SignIn.jsx
import { useNavigate } from 'react-router-dom';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to continue to your account</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <ClerkSignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
            redirectUrl="/chat"
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none p-0',
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                formFieldInput: 'dark:bg-gray-700 dark:text-white',
                footerActionLink: 'text-primary-600 hover:text-primary-700',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;