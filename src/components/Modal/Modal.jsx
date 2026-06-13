import { useEffect } from 'react';
import styles from './Modal.module.css';

export function Modal({ item, tipo, onClose }) {
  // Fechar com ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">✕</button>

        <div className={styles.imageWrapper}>
          <img
            src={item.imagem}
            alt={`${item.marca} ${item.modelo}`}
            className={styles.image}
            style={{ objectFit: tipo === 'veiculo' ? 'cover' : 'contain' }}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.titulo}>{item.marca} {item.modelo}</h2>

          {tipo === 'moto' && (
            <>
              <p className={styles.detalhe}>🏍️ Cilindrada: <strong>{item.cilindrada} cc</strong></p>
            </>
          )}

          {tipo === 'veiculo' && (
            <>
              <p className={styles.detalhe}>📅 Ano: <strong>{item.ano}</strong></p>
            </>
          )}

          <p className={styles.preco}>R$ {item.preco.toLocaleString('pt-BR')}</p>

          <button className={styles.btnInteresse}>
            Tenho interesse
          </button>
        </div>

      </div>
    </div>
  );
}