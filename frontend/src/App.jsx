// import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Library from "./pages/Library.jsx";

// App component that includes Header, Welcome, and SearchSection components
function App() {

  const [selectedBook, setSelectedBook] = useState(null);
  
  return (
    <>

      <Routes>
        <Route path="/" element={<Home setSelectedBook={setSelectedBook} />} />
        <Route path="/BookDetail" element={<BookDetail book={selectedBook} />} />
        <Route path="/Library" element={<Library />} /> 
      </Routes>

    </>
  );
}

export default App;
