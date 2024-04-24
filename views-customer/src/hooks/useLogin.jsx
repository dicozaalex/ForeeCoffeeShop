import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const useLogin = async (inputs, backendUrl) => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  let message = "Unknown error";
  const response = await fetch(`${backendUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(inputs),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    message = errorData.message;
  }

  signIn({
    auth: {
      token: response.data.token,
    },
    userState: { name: response.data.username },
  });
  message = response.data.message;

  if (response.ok) {
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }
  return message;
};

export default useLogin