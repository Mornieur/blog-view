import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from '../pages/Post';
import Home from '../pages/Home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
