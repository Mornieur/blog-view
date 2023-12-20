import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from '../pages/Post';
import Home from '../pages/Home';
import Error404 from '../pages/404';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
