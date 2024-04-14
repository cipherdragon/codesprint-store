import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-6xl font-bold">
          <span className="text-green-600">Launching</span> Soon !!!
        </h1>

        <p className="mt-3 text-2xl">
          We are working hard to bring you our new site. Stay tuned!
        </p>
      </main>
    </div>
  );
}
