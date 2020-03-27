import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  const logged = localStorage.getItem('ongId');

  useEffect(() => {
    if(logged) {
      history.push('/profile');
    }
  }, [logged, history]);

  async function handleLogin(e){
    e.preventDefault();

    try {
      const res = await api.post('/sessions', { id })

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');
    } catch(err) {
      alert('Falha no login');
    }
  }

  return (
    <>
      <div className="logon-container">
        <section className="form">
          <img src={logo} alt="Be the Hero" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>

            <input 
              type="text" 
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
              required
            />
            <button className="button" type="submit">Entrar</button>

            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
    </>
  );
}
