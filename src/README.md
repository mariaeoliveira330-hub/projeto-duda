# Manual de Construção — Base Project
### Aplicação React com autenticação, CRUD e carrosséis

---

## Sobre este manual

Este manual guia você na construção de uma aplicação web completa usando **React + Vite**. Ao final, você terá uma aplicação com:

- Login com autenticação
- Rotas protegidas
- Header com dark mode
- Footer com ícones sociais
- Home com carrosséis dinâmicos e modal
- CRUD completo de Motos e Veículos
- Banco de dados fake com JSON Server

> **Pré-requisitos:** Node.js instalado (versão 18 ou superior). Para verificar, rode `node -v` no terminal.

---

## Índice

1. [Criando o projeto](#1-criando-o-projeto)
2. [Instalando dependências](#2-instalando-dependências)
3. [Estrutura de pastas](#3-estrutura-de-pastas)
4. [Configurando o banco de dados fake](#4-configurando-o-banco-de-dados-fake)
5. [Configurando os estilos globais](#5-configurando-os-estilos-globais)
6. [Serviço de API (Axios)](#6-serviço-de-api-axios)
7. [Autenticação com Context API](#7-autenticação-com-context-api)
8. [Rotas e navegação](#8-rotas-e-navegação)
9. [Componentes globais](#9-componentes-globais)
10. [Páginas](#10-páginas)
11. [Executando o projeto](#11-executando-o-projeto)

---

## 1. Criando o projeto

O **Vite** é uma ferramenta moderna para criar projetos React. É mais rápido que o Create React App e é o padrão do mercado atualmente.

```bash
npm create vite@latest base-project -- --template react
cd base-project
npm install
```

Após criar, abra o projeto no VS Code:
```bash
code .
```

---

## 2. Instalando dependências

Instale todas as bibliotecas necessárias de uma vez:

```bash
npm install react-router-dom axios swiper react-icons
npm install -D json-server
```

**O que cada uma faz:**

| Biblioteca | Para que serve |
|---|---|
| `react-router-dom` | Navegação entre páginas (rotas) |
| `axios` | Fazer requisições HTTP para a API |
| `swiper` | Carrosséis de imagens |
| `react-icons` | Biblioteca de ícones (Font Awesome, etc.) |
| `json-server` | Cria um banco de dados fake em JSON |

---

## 3. Estrutura de pastas

Dentro de `src/`, crie a seguinte estrutura:

```bash
mkdir -p src/api
mkdir -p src/components/Card
mkdir -p src/components/Footer
mkdir -p src/components/Header
mkdir -p src/components/Modal
mkdir -p src/components/PrivateRoute
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/pages/Home
mkdir -p src/pages/Login
mkdir -p src/pages/Motos
mkdir -p src/pages/NotFound
mkdir -p src/pages/Veiculos
mkdir -p src/routes
mkdir -p src/services
```

A estrutura final:

```
src/
├── api/
│   └── apiServices.js        → funções de CRUD (motos e veículos)
├── components/
│   ├── Card/                 → card reutilizável com imagem
│   ├── Footer/               → rodapé com ícones sociais
│   ├── Header/               → cabeçalho com navegação e dark mode
│   ├── Modal/                → modal de detalhes do item
│   └── PrivateRoute/         → protege rotas autenticadas
├── context/
│   ├── AuthContext.js        → cria o contexto de autenticação
│   └── AuthProvider.jsx      → provê o estado de autenticação
├── hooks/
│   └── useAuth.js            → hook para consumir o contexto
├── pages/
│   ├── Home/                 → página inicial com carrosséis
│   ├── Login/                → página de login
│   ├── Motos/                → CRUD de motos
│   ├── NotFound/             → página 404
│   └── Veiculos/             → CRUD de veículos
├── routes/
│   └── AppRoutes.jsx         → configuração central das rotas
├── services/
│   └── api.js                → instância do Axios
├── App.css                   → estilos globais e variáveis CSS
├── App.jsx                   → layout principal (Header + Outlet + Footer)
├── index.css                 → reset CSS (Meyer Reset)
└── main.jsx                  → ponto de entrada da aplicação
```

---

## 4. Configurando o banco de dados fake

O **JSON Server** simula uma API REST usando um arquivo `.json`. É perfeito para aprender sem precisar de um backend real.

Crie o arquivo `db.json` na **raiz do projeto** (fora de `src/`):

```json
{
  "users": [
    {
      "id": "1",
      "email": "paulo@email.com",
      "password": "123456",
      "name": "Paulo Eduardo"
    }
  ],
  "motos": [
    {
      "id": "1",
      "marca": "Royal Enfield",
      "modelo": "Shotgun 650",
      "cilindrada": 650,
      "preco": 45000,
      "imagem": "https://royal-api.s3-sa-east-1.amazonaws.com/Product/ProductImage/d-shotgun650-stencilwhite.webp"
    }
  ],
  "veiculos": [
    {
      "id": "1",
      "marca": "Honda",
      "modelo": "Civic",
      "ano": 2023,
      "preco": 145000,
      "imagem": "https://www.honda.com.br/automoveis/sites/hab/files/2023-06/1920x700_desktop.jpg"
    }
  ]
}
```

Adicione os scripts no `package.json`:

```json
"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 3001"
}
```

> **Como funciona:** o JSON Server lê o `db.json` e cria automaticamente as rotas:
> - `GET /motos` → lista todas as motos
> - `POST /motos` → cadastra uma moto
> - `PUT /motos/:id` → atualiza uma moto
> - `DELETE /motos/:id` → exclui uma moto

---

## 5. Configurando os estilos globais

### `src/index.css` — Meyer Reset

O reset CSS zera os estilos padrão do navegador, garantindo consistência entre diferentes browsers.

```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body { line-height: 1; }
ol, ul { list-style: none; }
blockquote, q { quotes: none; }
blockquote:before, blockquote:after,
q:before, q:after { content: ''; content: none; }
table { border-collapse: collapse; border-spacing: 0; }
```

### `src/App.css` — Variáveis e estilos globais

As **variáveis CSS** (`--bg`, `--accent`, etc.) permitem que o dark mode funcione: quando adicionamos a classe `.dark` no `body`, as variáveis mudam e toda a aplicação atualiza automaticamente.

```css
/* ===== COMPLEMENTO MODERNO ===== */
*, *::before, *::after {
  box-sizing: border-box;
}

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

/* ===== VARIÁVEIS ===== */
:root {
  --bg: #0f1117;
  --bg-card: #1c2333;
  --bg-input: #252d3d;
  --border: #2e3a4e;
  --text: #a0aec0;
  --text-heading: #ffffff;
  --text-muted: #6b7a99;
  --accent: #4a90e2;
  --accent-hover: #357abd;
  --danger: #ff6b6b;
  --success: #68d391;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
}

/* ===== DARK MODE ===== */
body.dark {
  --bg: #070a0f;
  --bg-card: #111827;
  --bg-input: #1a2030;
  --border: #1e293b;
  --text: #9ca3af;
  --text-heading: #f3f4f6;
}

/* ===== BASE ===== */
body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.5;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== TIPOGRAFIA ===== */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-heading);
  font-weight: 600;
  line-height: 1.2;
}

h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.1rem; }

p {
  line-height: 1.6;
  color: var(--text);
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover { color: var(--accent-hover); }

/* ===== LAYOUT DA APP ===== */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app > main {
  flex: 1;
  padding: 2rem 1.5rem;
}

/* ===== FORMULÁRIOS ===== */
input, select, textarea {
  background-color: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-heading);
  font-size: 0.95rem;
  padding: 0.65rem 1rem;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  outline: none;
}

/* ===== UTILITÁRIOS ===== */
.alert-error {
  color: var(--danger);
  background-color: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.alert-success {
  color: var(--success);
  background-color: rgba(104, 211, 145, 0.1);
  border: 1px solid rgba(104, 211, 145, 0.3);
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

/* ===== SWIPER CUSTOM ===== */
.swiper-button-next,
.swiper-button-prev {
  color: var(--accent) !important;
}

.swiper-pagination-bullet-active {
  background: var(--accent) !important;
}
```

---

## 6. Serviço de API (Axios)

### `src/services/api.js`

O **Axios** é uma biblioteca para fazer requisições HTTP. Aqui criamos uma instância com a URL base da nossa API.

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export default api;
```

### `src/api/apiServices.js`

Centralizamos todas as chamadas de API em funções separadas. Isso facilita a manutenção — se a URL mudar, alteramos em um só lugar.

```js
import api from '../services/api';

export const consultarMoto = async () => {
  const response = await api.get('/motos');
  return response.data;
};

export const cadastrarMoto = async (moto) => {
  const response = await api.post('/motos', moto);
  return response.data;
};

export const atualizarMoto = async (id, moto) => {
  const response = await api.put(`/motos/${id}`, moto);
  return response.data;
};

export const apagarMoto = async (id) => {
  const response = await api.delete(`/motos/${id}`);
  return response.data;
};

export const consultarVeiculo = async () => {
  const response = await api.get('/veiculos');
  return response.data;
};

export const cadastrarVeiculo = async (veiculo) => {
  const response = await api.post('/veiculos', veiculo);
  return response.data;
};

export const atualizarVeiculo = async (id, veiculo) => {
  const response = await api.put(`/veiculos/${id}`, veiculo);
  return response.data;
};

export const apagarVeiculo = async (id) => {
  const response = await api.delete(`/veiculos/${id}`);
  return response.data;
};
```

---

## 7. Autenticação com Context API

A **Context API** do React permite compartilhar dados (como o usuário logado) entre componentes sem precisar passar props manualmente por toda a árvore.

### `src/context/AuthContext.js`

Cria o contexto — pense nele como um "recipiente vazio" que será preenchido pelo Provider.

```js
import { createContext } from 'react';

export const AuthContext = createContext();
```

### `src/context/AuthProvider.jsx`

O Provider é o componente que fornece os dados do contexto para toda a aplicação. Separamos em arquivo próprio para seguir a regra do ESLint que exige que cada arquivo exporte apenas componentes.

```jsx
import { useState } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  );

  async function login(email, password) {
    const { data } = await api.get('/users', {
      params: { email },
    });

    if (data.length === 0 || data[0].password !== password) {
      throw new Error('Credenciais inválidas');
    }

    const loggedUser = data[0];
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

> **Por que o `localStorage`?** Para que o usuário continue logado mesmo após recarregar a página. O `useState` é inicializado lendo do `localStorage`.

### `src/hooks/useAuth.js`

Um **hook customizado** que simplifica o consumo do contexto. Em vez de importar `useContext` e `AuthContext` em todo componente, importamos apenas `useAuth`.

```js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
```

---

## 8. Rotas e navegação

### `src/components/PrivateRoute/PrivateRoute.jsx`

Protege as rotas autenticadas. Se o usuário não estiver logado, redireciona para `/login`. O `<Outlet />` renderiza a rota filha quando o usuário está autenticado.

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
```

### `src/routes/AppRoutes.jsx`

Centraliza todas as rotas da aplicação. A estrutura de rotas aninhadas (`nested routes`) permite que o `App` (com Header e Footer) envolva apenas as páginas autenticadas.

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/Login/Login';
import { Home } from '../pages/Home/Home';
import { Motos } from '../pages/Motos/Motos';
import { Veiculos } from '../pages/Veiculos/Veiculos';
import { NotFound } from '../pages/NotFound/NotFound';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/motos" element={<Motos />} />
          <Route path="/veiculos" element={<Veiculos />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### `src/App.jsx`

O layout principal das páginas autenticadas. O `<Outlet />` é onde o React Router renderiza a página atual (Home, Motos ou Veículos).

```jsx
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

### `src/main.jsx`

Ponto de entrada da aplicação. O `BrowserRouter` habilita o roteamento e o `AuthProvider` disponibiliza o contexto de autenticação para toda a árvore de componentes.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

---

## 9. Componentes globais

### `src/components/Header/Header.jsx`

O Header usa `NavLink` (que adiciona classe `active` automaticamente na rota atual), `useAuth` para obter os dados do usuário logado, e controla o dark mode adicionando/removendo a classe `.dark` no `body`.

```jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className={styles.header}>
      <strong className={styles.brand}>MyApp</strong>

      <nav className={styles.nav}>
        <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : styles.link}>
          Home
        </NavLink>
        <NavLink to="/motos" className={({ isActive }) => isActive ? styles.active : styles.link}>
          Motos
        </NavLink>
        <NavLink to="/veiculos" className={({ isActive }) => isActive ? styles.active : styles.link}>
          Veículos
        </NavLink>
      </nav>

      <div className={styles.actions}>
        {user && (
          <div className={styles.userInfo}>
            <FaUserCircle size={20} className={styles.userIcon} />
            <span className={styles.userName}>{user.name}</span>
          </div>
        )}

        <button
          className={styles.themeToggle}
          onClick={() => setDarkMode(prev => !prev)}
          aria-label={darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
          {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>

        <button className={styles.logout} onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
```

### `src/components/Header/Header.module.css`

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--bg-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  font-size: 1.2rem;
  color: var(--accent);
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.link {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.link:hover { color: var(--text-heading); }

.active {
  color: var(--accent);
  font-weight: bold;
  text-decoration: none;
  font-size: 0.95rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.userInfo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background-color: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 2rem;
}

.userIcon { color: var(--accent); }

.userName {
  color: var(--text-heading);
  font-size: 0.875rem;
  font-weight: 500;
}

.themeToggle {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  color: var(--text);
  padding: 0.35rem 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.themeToggle:hover { color: var(--text-heading); border-color: var(--accent); }

.logout {
  padding: 0.4rem 1rem;
  background-color: transparent;
  color: var(--danger);
  border: 1px solid var(--danger);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.logout:hover { background-color: var(--danger); color: #ffffff; }
```

### `src/components/Footer/Footer.jsx`

```jsx
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.link} aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer" className={styles.link} aria-label="X">
          <FaXTwitter />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.link} aria-label="TikTok">
          <FaTiktok />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.link} aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.link} aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>
      <span className={styles.copy}>© {new Date().getFullYear()} MyApp</span>
    </footer>
  );
}
```

### `src/components/Footer/Footer.module.css`

```css
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  background-color: var(--bg-card);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
  margin-top: auto;
}

.socials {
  display: flex;
  gap: 1rem;
}

.link {
  color: var(--text);
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

.link:hover { color: var(--accent); }

.copy {
  color: var(--text-muted);
  font-size: 0.8rem;
}
```

### `src/components/Card/Card.jsx`

O componente `Card` recebe props para personalizar a exibição da imagem (`objectFit` e `bgColor`) e uma função `onSaibaMais` que será chamada ao clicar no botão.

```jsx
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
```

### `src/components/Card/Card.module.css`

```css
.card {
  width: 100%;
  background-color: var(--bg-card);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
}

.cardContent {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card h3 {
  font-size: 1rem;
  color: var(--text-heading);
}

.card p {
  color: var(--text-muted);
  line-height: 1.5;
  font-size: 0.9rem;
}

.card button {
  margin-top: auto;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: var(--accent-hover);
  color: white;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.card button:hover { background-color: var(--accent); }
.card button:active { transform: scale(0.98); }
```

### `src/components/Modal/Modal.jsx`

O Modal usa `useEffect` para fechar ao pressionar `ESC` e para o clique no overlay. O `e.stopPropagation()` impede que o clique dentro do modal feche ele.

```jsx
import { useEffect } from 'react';
import styles from './Modal.module.css';

export function Modal({ item, tipo, onClose }) {
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
            <p className={styles.detalhe}>🏍️ Cilindrada: <strong>{item.cilindrada} cc</strong></p>
          )}

          {tipo === 'veiculo' && (
            <p className={styles.detalhe}>📅 Ano: <strong>{item.ano}</strong></p>
          )}

          <p className={styles.preco}>R$ {item.preco.toLocaleString('pt-BR')}</p>

          <button className={styles.btnInteresse}>Tenho interesse</button>
        </div>
      </div>
    </div>
  );
}
```

### `src/components/Modal/Modal.module.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

.modal {
  background-color: var(--bg-card);
  border-radius: 1rem;
  max-width: 560px;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.25s ease;
}

.imageWrapper {
  width: 100%;
  height: 280px;
  background-color: var(--bg-input);
}

.image {
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.titulo {
  font-size: 1.4rem;
  color: var(--text-heading);
}

.detalhe {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.detalhe strong { color: var(--text-heading); }

.preco {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
}

.btnInteresse {
  padding: 0.75rem;
  background-color: var(--accent);
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 0.5rem;
}

.btnInteresse:hover { background-color: var(--accent-hover); }
.btnInteresse:active { transform: scale(0.98); }

.closeBtn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  z-index: 1;
}

.closeBtn:hover { background-color: rgba(0, 0, 0, 0.7); }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 10. Páginas

### `src/pages/Login/Login.jsx`

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/home');
    } catch {
      setError('E-mail ou senha inválidos.');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
```

### `src/pages/NotFound/NotFound.jsx`

```jsx
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
```

### `src/pages/Home/Home.jsx`

A Home busca motos e veículos da API e os exibe em carrosséis. O hero é construído dinamicamente com as motos cadastradas.

```jsx
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
                  <img src={moto.imagem} alt={`${moto.marca} ${moto.modelo}`} className={styles.heroImage} />
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

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🏍️ Motos em destaque</h2>
        {loadingMotos ? (
          <p className={styles.loading}>Carregando motos...</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
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

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🚗 Veículos em destaque</h2>
        {loadingVeiculos ? (
          <p className={styles.loading}>Carregando veículos...</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
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
```

### `src/pages/Home/Home.module.css`

```css
.container { width: 100%; }

.hero { width: 100%; margin-bottom: 3rem; }

.heroSwiper { width: 100%; height: 280px; }

.heroSlide { position: relative; width: 100%; height: 280px; }

.heroImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--bg);
}

.heroOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.heroTitulo { font-size: 2rem; color: #ffffff; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
.heroSubtitulo { font-size: 1rem; color: rgba(255,255,255,0.85); }

.section { max-width: 1100px; margin: 0 auto 3rem; padding: 0 1.5rem; }

.sectionTitle { font-size: 1.4rem; color: var(--text-heading); margin-bottom: 1.5rem; }

.swiper { padding: 0 2.5rem 2.5rem !important; }

.loading { color: var(--text-muted); text-align: center; padding: 2rem; }
```

> Os arquivos `Motos.jsx`, `Motos.module.css`, `Veiculos.jsx` e `Veiculos.module.css` seguem o mesmo padrão de CRUD. Consulte os arquivos do projeto de referência.

---

## 11. Executando o projeto

Você precisará de **dois terminais** abertos simultaneamente:

**Terminal 1 — Frontend (React):**
```bash
npm run dev
```
Acesse: `http://localhost:5173`

**Terminal 2 — Backend (JSON Server):**
```bash
npm run server
```
API disponível em: `http://localhost:3001`

**Credenciais de acesso:**
- E-mail: `paulo@email.com`
- Senha: `123456`

---

## Conceitos React utilizados neste projeto

| Conceito | Onde foi usado |
|---|---|
| `useState` | Gerenciar estados locais (form, loading, error) |
| `useEffect` | Buscar dados da API ao carregar o componente |
| `useContext` | Consumir o contexto de autenticação |
| `createContext` | Criar o contexto de autenticação |
| Context API | Compartilhar o usuário logado globalmente |
| React Router DOM | Navegação entre páginas e rotas protegidas |
| CSS Modules | Estilos escopados por componente |
| Variáveis CSS | Dark mode automático com `body.dark` |
| Hooks customizados | `useAuth` para simplificar o uso do contexto |
| Props | Customizar comportamento dos componentes |
| Renderização condicional | Exibir loading, erros e itens da lista |

---

*Manual gerado para fins didáticos. Projeto desenvolvido com React + Vite + JSON Server.*