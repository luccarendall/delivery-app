import React from 'react';

export default function Footer() {
  return (
    <footer
      className="bg-yellow fixed bottom-0 w-screen z-50"
    >
      <div
        className="p-2.5 flex place-content-between mx-6"
      >
        <div>
          <span>© 2023 Grupo 13 T21A - Trybe.</span>
        </div>
        <div>
          <a
            href="/about"
            className="bg-white p-2 rounded-md font-semibold
            hover:bg-trueWhite hover:shadow-xl"
          >
            Sobre nós
          </a>
        </div>
      </div>
    </footer>
  );
}
