/* eslint-disable max-len */
/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState } from 'react';
import './Strength.css';

function Strength() {
  const MAX_NUMBER_OF_ATTEMP = 10;
  const [word, setWord] = useState('');
  const [hiddenWord, setHiddenWord] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_NUMBER_OF_ATTEMP);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [message, setMessage] = useState('');
  const [hiden, setHiden] = useState('');
  const [notHiden, setNotHiden] = useState('hidden');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const letterOrWord = e.target.letterOrWord.value.toUpperCase();
    const secretWord = e.target.secretWord.value;
    await setWord(secretWord.toUpperCase());
    setHiddenWord(hiddenWord.length < 1 ? '_ '.repeat(secretWord.length) : hiddenWord);
    setHiden('hidden');
    setNotHiden('');
    setValue('');

    if (!word) {
      setMessage('Informe a palavra secreta primeiro');
      return;
    }
    if (letterOrWord.length === 1 && remainingAttempts > 0) {
      if (correctLetters.includes(letterOrWord)) {
        setMessage('Você já informou esta a letra');
      } else if (word.includes(letterOrWord)) {
        let newHiddenWord = '';
        for (let i = 0; i < word.length; i += 1) {
          if (word[i] === letterOrWord) {
            newHiddenWord += `${letterOrWord} `;
          } else {
            newHiddenWord += hiddenWord[i * 2];
            newHiddenWord += hiddenWord[i * 2 + 1];
          }
        }
        setHiddenWord(newHiddenWord);
        setCorrectLetters([...correctLetters, letterOrWord]);
        setMessage('Você acertou uma letra');
      } else {
        setRemainingAttempts(remainingAttempts - 1);
        setMessage('Você errou');
      }
    } else if ((word === letterOrWord && remainingAttempts > 0) || word === hiddenWord.split(' ').join('')) {
      setHiddenWord(word.replace(/./g, '$& '));
      setMessage('Você acertou a palavra completa e ganhou');
    } else if (remainingAttempts > 0) {
      setRemainingAttempts(remainingAttempts - 1);
      setMessage('Você errou');
    } else {
      setMessage('Você perdeu!');
    }
  };

  return (
    <div className="container">
      <h2>Jogo da Forca</h2>
      <br />
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="secretWord"
          placeholder="Informe a palavra secreta"
          className={ hiden }
        />
        <input
          type="text"
          name="letterOrWord"
          placeholder="Informe uma letra ou uma palavra completa"
          className={ notHiden }
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
        <button className="btn" type="submit">Enviar</button>
      </form>
      <p className={ notHiden }>
        Palavra:
        {' '}
        <strong>{hiddenWord}</strong>
      </p>
      <br />
      <p className={ notHiden }>
        Tentativas restantes:
        {' '}
        <span className="red">{remainingAttempts}</span>
      </p>
      <br />
      <p>{message}</p>
    </div>
  );
}

export default Strength;
