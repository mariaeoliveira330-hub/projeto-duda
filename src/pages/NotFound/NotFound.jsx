import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <button onClick={() => navigate('/login')}>Voltar para o início</button>
    </div>
  );
}