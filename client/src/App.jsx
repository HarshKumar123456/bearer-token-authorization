import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthSession } from './hook/auth';
import { Link } from 'react-router-dom';

function App() {

  const [auth,setAuth] = useAuthSession();
  const [authStatus,setAuthStatus] = useState(false);
  const serverURI = import.meta.env.VITE_SERVER_URI;

  const getResponse = async () => {

    try {
      const response = await axios.get(`${serverURI}/api/v1/authrized-routes`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setAuthStatus(true);
      }
      else {
        toast.error("Error....")
        toast.error(`${response.data.message}`);
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Error....")
      toast.error(`${error.message}`);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  };

  useEffect(() => {
    getResponse();
  }, [auth]);

  return (
    <>
      <Layout>
        <div className="min-h-80 max-h-fit p-8">
          <div className="hero-text-container py-8">
            <h2 className="text-4xl font-bold">
              {authStatus ? 
              <>
              Congratulations !! You have accessed API </> 
              :
              <>
              Sorry !! You are not authorized to access API. Please  <Link to={"/sign-up"} className="text-blue-500">Register yourself</Link></>} 
            </h2>
          </div>


        </div>
      </Layout>
    </>
  )
}

export default App
