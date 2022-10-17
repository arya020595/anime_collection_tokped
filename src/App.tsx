import './App.css';
import Header  from "./components/Header";
import AnimeList from './components/Products';
import { Routes, Route } from "react-router-dom";
import AnimeDetail from './components/ProductDetail';
import Collections from './components/Collections';
import CollectionDetail from './components/CollectionDetail';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="product/:productId" element={<AnimeDetail />} />
        <Route path="my-collection/" element={<Collections />} />
        <Route path="my-collection/:collectionId" element={<CollectionDetail />} />
      </Routes>
    </>
  );
}

export default App;
