import React, { FC } from 'react';
import { Character } from '../../interfaces/character';

interface CharacterCardProps {
  character: Character;
  onOpenModal: () => void;
}

const CharacterCard: FC<CharacterCardProps> = ({ character, onOpenModal }) => {
  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">{character.description}</p>
        <button className="btn btn-primary" onClick={onOpenModal}>
          View More
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;