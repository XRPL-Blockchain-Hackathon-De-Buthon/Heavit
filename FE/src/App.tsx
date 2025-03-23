import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import A from "./pages/a";
import B from "./pages/b";
import C from "./pages/c";
import D from "./pages/d";
import E from "./pages/e";
import F from "./pages/f";
import G from "./pages/g";
import H from "./pages/h";
import I from "./pages/i";
import J from "./pages/j";
import K from "./pages/k";
import testh from "./pages/test.html";

import TB from "./pages/c";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<A />} />
        <Route path="/a" element={<A />} />
        <Route path="/b" element={<B />} />
        <Route path="/c" element={<C />} />
        <Route path="/d" element={<D />} />
        <Route path="/e" element={<E />} />
        <Route path="/f" element={<F />} />
        <Route path="/g" element={<G />} />
        <Route path="/h" element={<H />} />
        <Route path="/i" element={<I />} />
        <Route path="/j" element={<J />} />
        <Route path="/k" element={<K />} />
        <Route path="/tb" element={<TB />} />
        <Route
          path="/test"
          element={<div dangerouslySetInnerHTML={{ __html: testh }} />}
        />
      </Routes>
    </Router>
  );
}