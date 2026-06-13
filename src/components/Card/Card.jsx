import styles from './Card.module.css';

export function Card({ titulo, descricao, imagem, objectFit = 'contain', bgColor = '#ffffff', onSaibaMais }) {
  return (
    <div className={styles.card}>
      <img
        src={imagem}
        alt={titulo}
        style={{ objectFit, backgroundColor: bgColor }}
      />
      <div className={styles.cardContent}>
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <button type="button" onClick={onSaibaMais}>
          Saiba mais
        </button>
      </div>
    </div>
  );
}