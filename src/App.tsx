import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Loading = lazy(() => import("./pages/Loading"));
const Room = lazy(() => import("./pages/ChatRoom"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App(): JSX.Element {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
