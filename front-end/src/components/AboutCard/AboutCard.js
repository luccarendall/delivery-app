import React from 'react';
import propTypes from 'prop-types';
import linkedIn from '../../images&Info/linkedin.svg';
import github from '../../images&Info/square-github.svg';

function AboutCard({ contact }) {
  const { name, urlImage, urlGithub, urlLinkedin } = contact;

  return (
    <section
      className="flex flex-col w-60 h-80 items-stretch rounded-lg
      justify-between bg-trueWhite"
    >
      <div
        className="flex flex-col rounded-t-lg"
      >
        <div className="flex w-full h-64 rounded-md">
          <img
            className="object-cover rounded-t-md"
            src={ urlImage }
            alt={ name }
          />
        </div>
      </div>
      <div
        className="text-center bg-yellow p-4 rounded-b-lg w-full border-black
        drop-shadow-xl"
      >
        <p
          className="text-xl"
        >
          { name }
        </p>
        <div className="inline-flex justify-between">
          <button
            className="mx-6 m-2 w-8 h-8"
            type="button"
            onClick={ (e) => {
              e.preventDefault();
              console.log(urlLinkedin);
              window.open(urlLinkedin);
            } }
          >
            <img
              src={ linkedIn }
              alt="linkedin logo"
            />
          </button>
          <button
            className="mx-6 my-2 w-8 h-8"
            type="button"
            onClick={ (e) => {
              e.preventDefault();
              window.open(urlGithub);
            } }
          >
            <img
              src={ github }
              alt="github logo"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

AboutCard.propTypes = {
  contact: propTypes.shape({
    name: propTypes.string,
    urlImage: propTypes.string,
    urlGithub: propTypes.string,
    urlLinkedin: propTypes.string,
  }).isRequired,
};

export default AboutCard;
