import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useEffect } from 'react';

export default function ProtectedRoutes() {
  const currentUser = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id === null) {
      navigate('/');
    }
  }, [currentUser.id, navigate]);

  return currentUser.id ? <Outlet /> : null;
}
