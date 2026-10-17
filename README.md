Aqui está uma versão limpa e formatada, ideal para você **copiar e colar** diretamente no seu arquivo `README.md` no GitHub:

```markdown
# PokéTimes API

API RESTful para gerenciamento de usuários e times de Pokémon.

---

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **MongoDB** / Mongoose
- **JWT** (JSON Web Token)

---

## 💻 Como Rodar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/rodrigobgarcia/pokemonApi-triple-backend.git](https://github.com/rodrigobgarcia/pokemonApi-triple-backend.git)

```

2. **Acessar a pasta do projeto:**
```bash
cd pokemonApi-triple-backend

```


3. **Instalar as dependências:**
```bash
npm install

```


4. **Executar em modo de desenvolvimento:**
```bash
npm run dev

```



> **Nota:** O servidor iniciará por padrão em `http://localhost:3000`.

---

## 🔐 Autenticação

Para acessar as rotas protegidas, inclua o cabeçalho HTTP com o token recebido no login:

```http
Authorization: Bearer <seu_token_jwt>

```

---

## 🚦 Rotas da API

### 👤 Autenticação e Usuários

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `POST` | `/signup` | Pública | Cadastra um novo usuário. |
| `POST` | `/signin` | Pública | Realiza login e retorna o token JWT. |
| `GET` | `/users/me` | Protegida | Retorna os dados do usuário autenticado. |

### 🐉 Times (`/teams`)

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `GET` | `/teams` | Protegida | Lista os times do usuário logado. |
| `POST` | `/teams` | Protegida | Cria um novo time. |
| `PATCH` | `/teams/:teamId` | Protegida (Dono) | Atualiza o nome de um time. |
| `DELETE` | `/teams/:teamId` | Protegida (Dono) | Remove um time. |
| `POST` | `/teams/:teamId/members` | Protegida (Dono) | Adiciona um Pokémon ao time. |
| `DELETE` | `/teams/:teamId/members/:pokemonId` | Protegida (Dono) | Remove um Pokémon do time. |

---

## 📝 Formato dos Objetos

### Pokémon (Membro do Time)

```json
{
  "id": 25,
  "name": "pikachu",
  "image": "[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)",
  "types": ["electric"]
}

```

> **Observação:** O parâmetro `id` corresponde ao número do Pokémon na PokéAPI, enquanto a propriedade `_id` representa o identificador gerado pelo MongoDB para cada time.

---

## 👤 Autor

Desenvolvido por **[Rodrigo B. Garcia]

Link to deploy: https://pokemon-api-tripleten-frontend.vercel.app/
