import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import AboutCard from '../components/AboutCard/AboutCard';
import GroupInfo from '../images&Info/GroupInfo';
import Footer from '../components/Footer/Footer';

function AboutInfo() {
  return (
    <div
      className="sticky top-0 w-full z-50"
    >
      <NavBar />
      <h1
        className="font-bold text-lg mb-6 bg-yellow px-4 py-1.5
          rounded-sm text-center drop-shadow-md"
      >
        GRUPO 13
      </h1>
      <div
        className="m-12 bg-slate-50 rounded-lg p-6 shadow-2xl"
      >
        <section className="flex flex-col text-center">
          <h1
            className="p-5 font-extrabold bg-yellow w-36
            place-self-center rounded-xl mb-4 shadow-md"
          >
            Sobre nós
          </h1>
          <p
            className="mx-20 mb-12 font-medium"
          >
            Este é um projeto Full Stack desenvolvido ao final do
            módulo de Back End no curso da Trybe. O objetivo é
            exercitar e colocar em prática nossas Hard e Soft Skills.
            Para a construção do Back End em Node.js com Express foi
            usado o banco relacional MySQL com SequelizeORM e para o
            Front End usamos o React com a estilização em Tailwind CSS.
            Utilizamos aqui nosso aprendizado relacionado à
            Metodologias Ágeis, fazendo uso principalmente do sistema
            Kanban para a melhor organização e divisão de tarefas.
          </p>
        </section>
        <div
          className="grid grid-cols-5 place-self-center justify-items-center px-24 pb-24"
        >
          {
            GroupInfo && GroupInfo.map((contact) => (
              <AboutCard key={ contact.id } contact={ contact } />
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutInfo;
