# BookHub 📚

Uma plataforma moderna e responsiva para descobrir, explorar e comprar livros online. BookHub oferece uma experiência de usuário intuitiva tanto em desktop quanto em mobile.

## 🚀 Funcionalidades

- **Exploração de Livros**: Navegue por categorias e visualize detalhes completos de cada livro
- **Busca Dinâmica**: Encontre livros rapidamente usando a barra de busca integrada
- **Categorias**: Filtre livros por gênero (Ação, Aventura, Fantasia, Romance, etc.)
- **Menu Responsivo**: Interface adaptada para desktop, tablet e mobile com animações suaves
- **Detalhes do Livro**: Acesse informações completas como autor, classificação, preço e descrição
- **Links de Compra**: Integração direta com Amazon e outras plataformas
- **Newsletter**: Inscrição em newsletter literária
- **Redes Sociais**: Links para seguir nas redes sociais

## 📁 Estrutura do Projeto

```
BookHub/
├── index.html                       # Página inicial
├── app.js                           # Arquivo principal (movido para js/)
├── README.md                        # Este arquivo
├── assets/                          # Arquivos estáticos
│   ├── fonts/                       # Fontes personalizadas
│   │   ├── SFPRODISPLAYREGULAR.OTF
│   │   ├── SFPRODISPLAYMEDIUM.OTF
│   │   └── SFPRODISPLAYBOLD.OTF
│   └── imgs/                        # Imagens (logos, capas de livros, etc.)
├── js/                              # Scripts JavaScript
│   ├── app.js                       # Lógica principal (banco de dados, funções)
│   ├── formHandler.js               # Manipulação de formulários de contato
│   ├── loadSvgs.js                  # Carregamento de SVGs
│   └── openMenu.js                  # Controle do menu mobile
├── pages/                           # Páginas do site
│   ├── about.html                   # Página sobre
│   ├── book.html                    # Detalhes do livro
│   ├── categories.html              # Página de categorias
│   ├── contact.html                 # Formulário de contato
│   ├── politics.html                # Políticas de privacidade
│   └── support.html                 # Suporte e FAQ
└── styles/                          # Folhas de estilo
    └── style.css                    # Estilos principais (responsivo)
```

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica do site
- **CSS3**: Estilos responsivos e animações
- **JavaScript (Vanilla)**: Interatividade e lógica
- **Font Awesome**: Ícones para redes sociais
- **Fontes SF Pro**: Tipografia premium

## 🎨 Design Responsivo

O site é totalmente responsivo com breakpoints em:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: até 768px

### Recursos Mobile
- Menu hamburger com animações suaves
- Dropdown com transições (slideDown/slideUp)
- Grid adaptável de livros
- Interface otimizada para toque

## 🔧 Scripts e Funções

### `app.js`
- `goToBook(id)`: Navega para página de detalhes do livro
- `loadBook(id)`: Carrega dados do livro na página de detalhes
- `goBack()`: Volta à página anterior
- `buyBook()`: Abre link de compra do livro
- `renderAllBooks()`: Renderiza todos os livros
- `renderBooksByCategory()`: Filtra e renderiza livros por categoria
- `filterByCategory(category)`: Aplica filtro de categoria

### `openMenu.js`
- Controla abertura/fechamento do menu mobile
- Anima transições com slideDown/slideUp

### `formHandler.js`
- Valida e processa formulário de contato
- Exibe mensagens de sucesso

## 🎯 Categorias Disponíveis

- Novos Lançamentos
- Mais Populares
- Recomendados para você

## 🚧 Melhorias Futuras

- [ ] Sistema de autenticação de usuários
- [ ] Sistema de avaliações e comentários
- [ ] Recomendações personalizadas com IA
- [ ] Dark mode
- [ ] Múltiplos idiomas
- [ ] Backend com banco de dados real (Node.js/Express, Python/Flask)
