import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AuthPage = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const role = "USER"

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(email + password);
        
        const response = isLogin ? await axios.post('http://localhost:5000/login', {email,password})  : await axios.post(`http://localhost:5000/signup`, {email,password,role})

        if (response){
            if (!isLogin){
                alert('Signup successful !! Login ...')
                navigate("/login")
            }else{
                console.log(response.data.msg);
                localStorage.setItem('token', response.data.token);
                const userRole = response.data.role;
                if(userRole === 'USER'){
                    navigate('/')
                }else if(userRole === 'ADMIN'){
                  navigate("/admin")
                }
            }
        }

        
    } catch (error) {
        console.log(error);
        alert("Error occured ")
    }


    // Handle login or signup logic here
    console.log(isLogin ? 'Login' : 'Signup', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Log in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-orange-300 group-hover:text-orange-200" aria-hidden="true" />
              </span>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a href={isLogin ? "/signup" : "/login"} className="font-medium text-orange-600 hover:text-orange-500 ml-1">
              {isLogin ? 'Sign up' : 'Log in'}
            </a>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
      <div className="absolute bottom-0 right-0 w-1/2 max-w-md">
        <svg className="w-full h-auto text-orange-200 opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M100 100V0L0 100z" />
        </svg>
      </div>
    </div>
  );
};

const LoginPage = () => <AuthPage isLogin={true} />;
const SignupPage = () => <AuthPage isLogin={false} />;

export { LoginPage, SignupPage };