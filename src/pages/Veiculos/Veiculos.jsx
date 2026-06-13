import { useEffect, useState } from 'react';
import {
  apagarVeiculo,
  atualizarVeiculo,
  cadastrarVeiculo,
  consultarVeiculo,
} from '../../api/apiServices';
import styles from './Veiculos.module.css';

export function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ marca: '', modelo: '', ano: '', preco: '', imagem: '' }); // ← imagem
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const veiculosCadastrados = await consultarVeiculo();
        setVeiculos(veiculosCadastrados);
      } catch {
        setError('Não foi possível carregar os veículos.');
      } finally {
        setLoading(false);
      }
    };
    carregarVeiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limparFormulario = () => {
    setForm({ marca: '', modelo: '', ano: '', preco: '', imagem: '' }); // ← imagem
    setEditingId(null);
  };

  const validarFormulario = () => {
    if (!form.marca.trim() || !form.modelo.trim() || !form.ano || !form.preco) {
      setError('Preencha todos os campos corretamente.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validarFormulario()) return;

    const payload = {
      marca: form.marca,
      modelo: form.modelo,
      ano: Number(form.ano),
      preco: Number(form.preco),
      imagem: form.imagem, // ← imagem
    };

    if (editingId) {
      setUpdatingId(editingId);
      try {
        const veiculoAtualizado = await atualizarVeiculo(editingId, payload);
        setVeiculos((prev) =>
          prev.map((v) => (v.id === editingId ? veiculoAtualizado : v))
        );
        limparFormulario();
        setSuccess('Veículo atualizado com sucesso.');
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Erro ao atualizar veículo.');
      } finally {
        setUpdatingId(null);
      }
      return;
    }

    setSaving(true);
    try {
      const novoVeiculo = await cadastrarVeiculo(payload);
      setVeiculos((prev) => [...prev, novoVeiculo]);
      limparFormulario();
      setSuccess('Veículo cadastrado com sucesso.');
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Erro ao cadastrar veículo.');
    } finally {
      setSaving(false);
    }
  };

  const iniciarEdicao = (veiculo) => {
    setEditingId(veiculo.id);
    setForm({
      marca: veiculo.marca || '',
      modelo: veiculo.modelo || '',
      ano: veiculo.ano || '',
      preco: veiculo.preco || '',
      imagem: veiculo.imagem || '', // ← imagem
    });
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma exclusão deste veículo?')) return;
    setDeletingId(id);
    setError(null);
    setSuccess(null);
    try {
      await apagarVeiculo(id);
      setVeiculos((prev) => prev.filter((v) => v.id !== id));
      setSuccess('Veículo excluído com sucesso.');
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Erro ao excluir veículo.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando veículos...</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Veículos</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>
          {editingId ? 'Editar Veículo' : 'Cadastrar Veículo'}
        </h2>

        <div className={styles.formRow}>
          <input className={styles.input} name="marca" type="text" placeholder="Marca" value={form.marca} onChange={handleChange} />
          <input className={styles.input} name="modelo" type="text" placeholder="Modelo" value={form.modelo} onChange={handleChange} />
        </div>

        <div className={styles.formRow}>
          <input className={styles.input} name="ano" type="number" placeholder="Ano" value={form.ano} onChange={handleChange} />
          <input className={styles.input} name="preco" type="number" placeholder="Preço (R$)" value={form.preco} onChange={handleChange} />
        </div>

        {/* ← campo de imagem */}
        <div className={styles.formRow}>
          <input
            className={styles.input}
            name="imagem"
            type="url"
            placeholder="URL da imagem (https://...)"
            value={form.imagem}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formActions}>
          <button
            className={styles.btnPrimary}
            type="submit"
            disabled={saving || (editingId && updatingId === editingId)}
          >
            {editingId
              ? updatingId === editingId ? 'Salvando...' : 'Salvar'
              : saving ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          {editingId && (
            <button className={styles.btnGhost} type="button" onClick={limparFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <div className={styles.grid}>
        {veiculos.map((veiculo) => (
          <article className={styles.card} key={veiculo.id}>

            {/* ← imagem no card */}
            {veiculo.imagem && (
              <img
                src={veiculo.imagem}
                alt={`${veiculo.marca} ${veiculo.modelo}`}
                className={styles.cardImage}
              />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{veiculo.marca} {veiculo.modelo}</h3>
              <p className={styles.muted}>Ano: {veiculo.ano}</p>
              <p className={styles.price}>R$ {veiculo.preco?.toLocaleString('pt-BR') ?? '—'}</p>
              <div className={styles.cardActions}>
                <button className={styles.btnGhost} onClick={() => iniciarEdicao(veiculo)}>
                  Editar
                </button>
                <button
                  className={styles.btnDanger}
                  onClick={() => handleDelete(veiculo.id)}
                  disabled={deletingId === veiculo.id}
                >
                  {deletingId === veiculo.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}