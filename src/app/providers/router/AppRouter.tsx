import { routeCongig } from "@/shared";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeCongig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}
