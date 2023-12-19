import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from '../Post';
import Home from '../Home';

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
