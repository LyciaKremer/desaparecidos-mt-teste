# Desaparecidos MT — SPA | PSS 02/2025/SEPLAG

Por: **Lycia da Costa Kremer**  
Email: [lyciakremer@gmail.com](mailto:lyciakremer@gmail.com)

Aplicação desenvolvida como parte do desafio técnico da Secretaria de Estado de Planejamento e Gestão de Mato Grosso (SEPLAG-MT), com o objetivo de facilitar o acesso e a colaboração cidadã em casos de pessoas desaparecidas no estado.

---

## Objetivo

- Permitir a consulta pública de dados sobre pessoas desaparecidas ou localizadas.
- Proporcionar um meio acessível para cidadãos enviarem informações relevantes.
- Interface moderna, responsiva e amigável.
- Integração com a [API pública da Polícia Judiciária Civil de Mato Grosso](https://api-desaparecidos.pjc.mt.gov.br/).

---

## Arquitetura e Boas Práticas

- Single Page Application com React + Vite.
- Componentização reutilizável e modular.
- Lazy loading via React Router.
- Separação de responsabilidades: componentes, páginas e serviços.
- Formulários com validações.
- Estilização com TailwindCSS.
- Utilização de hooks (`useEffect`, `useCallback`) com gerenciamento de dependências.
- Linting e tipagens para melhor manutenção.

---

## Funcionalidades

### Tela Inicial
- Lista paginada com até 10 desaparecidos por página.
- Filtros por nome, cidade e status (desaparecido/localizado).
- Carregamento rápido com exibição de cards e thumbnails.

### Tela de Detalhamento
- Informações completas de cada desaparecido.
- Destaque visual para situação (desaparecido ou localizado).
- Dados como idade, cidade, data do desaparecimento e observações.

### Tela de Inclusão de Informações
- Formulário para envio de pistas com campos validados.
- Upload de imagens.

---

## Tecnologias Utilizadas

- React + Vite
- TailwindCSS
- React Router
- Axios
- Docker

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/LyciaKremer/desaparecidos-mt-teste.git
cd projeto-desaparecidos

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Acesse a aplicação
```LINK AQUI```

## Licença
Este projeto é de uso exclusivo para fins avaliativos no processo seletivo da SEPLAG-MT (PSS 02/2025).