import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Comic } from '../../interfaces/comic';
import { Character } from '../../interfaces/character';

interface CharacterModalProps {
  character: Character;
  comics: Comic[];
  onClose: () => void;
}

const CharacterModal: FC<CharacterModalProps> = ({ character, comics, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{character.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {comics.map((comic) => (
            <li key={comic.id} className="list-group-item">{comic.title}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CharacterModal;