import React, { useState, useEffect } from 'react';
import { Character } from './interfaces/character';
import { Comic } from './interfaces/comic';
import { fetchCharacters, fetchCharacterComics, fetchRandomCharacters } from './Services/marvelAPi';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (searchTerm: string = '') => {
    setLoading(true);
    setError(null);

    try {
      const results = searchTerm ? await fetchCharacters(searchTerm) : await fetchRandomCharacters();
      setCharacters(results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching characters');
      setLoading(false);
    }
  };

  const handleOpenModal = async (character: Character) => {
    setLoading(true);
    setError(null);

    try {
      const results = await fetchCharacterComics(character.id);
      setComics(results);
      setSelectedCharacter(character);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      setError('Error fetching comics');
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setComics([]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchInitialCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await fetchRandomCharacters();
        setCharacters(results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching characters');
        setLoading(false);
      }
    };

    fetchInitialCharacters();
  }, []);

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingComponent message={''} />}
      {error && <ErrorComponent message={error} />}

      <div className="row">
        {!loading &&
          !error &&
          characters.map((character) => (
            <div key={character.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <CharacterCard character={character} onOpenModal={() => handleOpenModal(character)} />
            </div>
          ))}
      </div>

      {isModalOpen && selectedCharacter && (
        <CharacterModal character={selectedCharacter} comics={comics} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;