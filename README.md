# pokemonApi-triple-backend

API do PokéTimes. Em desenvolvimento local: `http://localhost:3000`.

## Rotas

| Método | Rota | Precisa de token? | Corpo | Responde |
|---|---|---|---|---|
| POST | `/signup` | não | `{ name, email, password }` | `201` usuário (sem senha) |
| POST | `/signin` | não | `{ email, password }` | `200 { token }` |
| GET | `/users/me` | sim | | `200` usuário |
| GET | `/teams` | sim | | `200` só os times do dono |
| POST | `/teams` | sim | `{ name, member? }` | `201` time |
| PATCH | `/teams/:teamId` | sim (dono) | `{ name }` | `200` time |
| DELETE | `/teams/:teamId` | sim (dono) | | `200` time apagado |
| POST | `/teams/:teamId/members` | sim (dono) | `{ id, name, image, types }` | `200` time atualizado |
| DELETE | `/teams/:teamId/members/:pokemonId` | sim (dono) | | `200` time atualizado |

Um membro tem o formato `{ id, name, image, types }`. O `id` é o número do Pokémon. O `_id` é o id que o MongoDB dá para o time.

Rotas protegidas usam o header `Authorization: Bearer <token>`.
