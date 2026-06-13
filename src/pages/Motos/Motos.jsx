import { useEffect, useState } from "react";
import {
  apagarMoto,
  atualizarMoto,
  cadastrarMoto,
  consultarMoto,
} from "../../api/apiServices";
import styles from "./Motos.module.css";

export function Motos() {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    cilindrada: "",
    preco: "",
    imagem: "",
  });
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const carregarMotos = async () => {
      try {
        const motosCadastradas = await consultarMoto();
        setMotos(motosCadastradas);
      } catch {
        setError("Não foi possível carregar as motos.");
      } finally {
        setLoading(false);
      }
    };
    carregarMotos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limparFormulario = () => {
    setForm({ marca: "", modelo: "", cilindrada: "", preco: "", imagem: "" });
    setEditingId(null);
  };

  const validarFormulario = () => {
    if (
      !form.marca.trim() ||
      !form.modelo.trim() ||
      !form.cilindrada ||
      !form.preco
    ) {
      setError("Preencha todos os campos corretamente.");
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
      cilindrada: Number(form.cilindrada),
      preco: Number(form.preco),
      imagem: form.imagem,
    };

    if (editingId) {
      setUpdatingId(editingId);
      try {
        const motoAtualizada = await atualizarMoto(editingId, payload);
        setMotos((prev) =>
          prev.map((m) => (m.id === editingId ? motoAtualizada : m)),
        );
        limparFormulario();
        setSuccess("Moto atualizada com sucesso.");
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Erro ao atualizar moto.",
        );
      } finally {
        setUpdatingId(null);
      }
      return;
    }

    setSaving(true);
    try {
      const novaMoto = await cadastrarMoto(payload);
      setMotos((prev) => [...prev, novaMoto]);
      limparFormulario();
      setSuccess("Moto cadastrada com sucesso.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Erro ao cadastrar moto.",
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (moto) => {
    setEditingId(moto.id);
    setForm({
      marca: moto.marca || "",
      modelo: moto.modelo || "",
      cilindrada: moto.cilindrada || "",
      preco: moto.preco || "",
      imagem: moto.imagem || "",
    });
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirma exclusão desta moto?")) return;
    setDeletingId(id);
    setError(null);
    setSuccess(null);
    try {
      await apagarMoto(id);
      setMotos((prev) => prev.filter((m) => m.id !== id));
      setSuccess("Moto excluída com sucesso.");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Erro ao excluir moto.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando motos...</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Motos</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>
          {editingId ? "Editar Moto" : "Cadastrar Moto"}
        </h2>

        <div className={styles.formRow}>
          <input
            className={styles.input}
            name="marca"
            type="text"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="modelo"
            type="text"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <input
            className={styles.input}
            name="cilindrada"
            type="number"
            placeholder="Cilindrada (cc)"
            value={form.cilindrada}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="preco"
            type="number"
            placeholder="Preço (R$)"
            value={form.preco}
            onChange={handleChange}
          />
        </div>

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
              ? updatingId === editingId
                ? "Salvando..."
                : "Salvar"
              : saving
                ? "Cadastrando..."
                : "Cadastrar"}
          </button>
          {editingId && (
            <button
              className={styles.btnGhost}
              type="button"
              onClick={limparFormulario}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <div className={styles.grid}>
        {motos.map((moto) => (
          <article className={styles.card} key={moto.id}>
            {moto.imagem && (
              <img
                src={moto.imagem}
                alt={`${moto.marca} ${moto.modelo}`}
                className={styles.cardImage}
              />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>
                {moto.marca} {moto.modelo}
              </h3>
              <p className={styles.muted}>Cilindrada: {moto.cilindrada} cc</p>
              <p className={styles.price}>
                R$ {moto.preco.toLocaleString("pt-BR")}
              </p>
              <div className={styles.cardActions}>
                <button
                  className={styles.btnGhost}
                  onClick={() => startEdit(moto)}
                >
                  Editar
                </button>
                <button
                  className={styles.btnDanger}
                  onClick={() => handleDelete(moto.id)}
                  disabled={deletingId === moto.id}
                >
                  {deletingId === moto.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
