import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import HomePage from './pages/HomePage';
import AddCoinPage from './pages/AddCoinPage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import PortfolioPage from './pages/PortfolioPage';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getUserStatus } from './api/axios';
import { login } from './slices/userSlice';

function App() {
  const dispatch = useDispatch();
  useQuery('user', getUserStatus, {
    onSuccess: (data) => {
      const { id, name, _email: email } = data;
      dispatch(login({ id, name, email }));
    },
    onError: (error) => {
      const user = {
        id: null,
        name: null,
        email: null,
      };
      dispatch(login(user));
    },
  });

  return (
    <Box as="main" px={5} mx="auto" maxW="1402px">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/addcoin" element={<AddCoinPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
