import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { consultarMoto, consultarVeiculo } from '../../api/apiServices';
import { Card } from '../../components/Card/Card';
import { Modal } from '../../components/Modal/Modal';
import styles from './Home.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Home() {
  const [motos, setMotos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [loadingMotos, setLoadingMotos] = useState(true);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);
  const [modalItem, setModalItem] = useState(null);
  const [modalTipo, setModalTipo] = useState(null);

  function abrirModal(item, tipo) {
    setModalItem(item);
    setModalTipo(tipo);
  }

  function fecharModal() {
    setModalItem(null);
    setModalTipo(null);
  }

  useEffect(() => {
    consultarMoto()
      .then(setMotos)
      .catch(() => {})
      .finally(() => setLoadingMotos(false));

    consultarVeiculo()
      .then(setVeiculos)
      .catch(() => {})
      .finally(() => setLoadingVeiculos(false));
  }, []);

  return (
    <div className={styles.container}>

      {/* ===== HERO DINÂMICO ===== */}
      {!loadingMotos && motos.length > 0 && (
        <section className={styles.hero}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className={styles.heroSwiper}
          >
            {motos.map((moto) => (
              <SwiperSlide key={moto.id}>
                <div className={styles.heroSlide}>
                  <img
                    src={moto.imagem}
                    alt={`${moto.marca} ${moto.modelo}`}
                    className={styles.heroImage}
                  />
                  <div className={styles.heroOverlay}>
                    <h2 className={styles.heroTitulo}>{moto.marca} {moto.modelo}</h2>
                    <p className={styles.heroSubtitulo}>{moto.cilindrada}cc · R$ {moto.preco.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* ===== CARROSSEL DE MOTOS ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🏍️ Motos em destaque</h2>
        {loadingMotos ? (
          <p className={styles.loading}>Carregando motos...</p>
        ) : motos.length === 0 ? (
          <p className={styles.loading}>Nenhuma moto cadastrada.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {motos.map((moto) => (
              <SwiperSlide key={moto.id}>
                <Card
                  titulo={`${moto.marca} ${moto.modelo}`}
                  descricao={`${moto.cilindrada}cc · R$ ${moto.preco.toLocaleString('pt-BR')}`}
                  imagem={moto.imagem}
                  onSaibaMais={() => abrirModal(moto, 'moto')}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* ===== CARROSSEL DE VEÍCULOS ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🚗 Veículos em destaque</h2>
        {loadingVeiculos ? (
          <p className={styles.loading}>Carregando veículos...</p>
        ) : veiculos.length === 0 ? (
          <p className={styles.loading}>Nenhum veículo cadastrado.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {veiculos.map((veiculo) => (
              <SwiperSlide key={veiculo.id}>
                <Card
                  titulo={`${veiculo.marca} ${veiculo.modelo}`}
                  descricao={`Ano: ${veiculo.ano} · R$ ${veiculo.preco.toLocaleString('pt-BR')}`}
                  imagem={veiculo.imagem}
                  objectFit="cover"
                  bgColor="transparent"
                  onSaibaMais={() => abrirModal(veiculo, 'veiculo')}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <Modal item={modalItem} tipo={modalTipo} onClose={fecharModal} />
    </div>
  );
}