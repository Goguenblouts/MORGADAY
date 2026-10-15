# MORGADAY — Universo de aniversário inspirado em Fortnite 💜🎮

> Um site interativo de aniversário criado por **Homii** para **Gabriela Leon**, conhecida no TikTok como **Morgana** e salva no WhatsApp como **Morgada**.

O projeto transforma uma amizade virtual em um pequeno universo explorável, com lobby, vestiário, recompensas, mapa de memórias, referências internas e uma surpresa escondida. A proposta é pessoal e bem-humorada: misturar a estética de um jogo com lembranças e mensagens de amizade.

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [A história por trás do site](#a-história-por-trás-do-site)
- [Linha do tempo do desenvolvimento](#linha-do-tempo-do-desenvolvimento)
- [Experiência e funcionalidades](#experiência-e-funcionalidades)
- [Mapa de memórias](#mapa-de-memórias)
- [Lugar secreto e presente interativo](#lugar-secreto-e-presente-interativo)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Como executar localmente](#como-executar-localmente)
- [Como editar textos, posições e mídias](#como-editar-textos-posições-e-mídias)
- [Áudio](#áudio)
- [Verificações e limitações conhecidas](#verificações-e-limitações-conhecidas)
- [Publicação no GitHub](#publicação-no-github)
- [Créditos e privacidade](#créditos-e-privacidade)

---

## Sobre o projeto

**MORGADAY** é uma experiência web estática, feita com HTML, CSS e JavaScript. A navegação imita partes de uma experiência de jogo: telas de carregamento, lobby, seleção de visual, hacks/recompensas e um mapa com pontos interativos.

O site foi pensado para ser explorado pela aniversariante. Cada local tem uma identidade própria, um pequeno texto narrativo e um recado pessoal. As referências vêm das brincadeiras, conversas e interesses compartilhados; o tom alterna entre carinho, incentivo e zoeira.

### Pessoas e nomes usados no projeto

- **Gabriela Leon** — nome da aniversariante.
- **Morgana** — nome usado por ela no TikTok e identidade usada no universo do site.
- **Morgada** — nome carinhoso usado como contato no WhatsApp.
- **Homii** — assinatura do criador e forma de tratamento usada nas mensagens.

## A história por trás do site

A amizade começou em **2025**, no Fortnite, durante uma live que Morgana fazia no TikTok. Esse detalhe foi contado pelo criador do projeto; ele não aparece no arquivo de exportação de WhatsApp usado posteriormente.

A conversa exportada disponibilizada para orientar o projeto cobre **15 de junho a 11 de outubro de 2026**. O arquivo de texto inclui mensagens, mas substitui anexos por marcadores como `<Mídia oculta>`. Portanto, as imagens, capturas de tela e vídeos originais que estavam nesses anexos não puderam ser recuperados a partir do TXT.

O site usa referências compartilhadas pelo criador, incluindo:
- a amizade que começou numa partida de Fortnite;
- brincadeiras e apelidos recorrentes, incluindo “Véia não, experiente”;
- a piada sobre assaltar um banco;
- o gatil e os 30 gatos;
- os gatos da Morgana e o **Gordão**;
- os cachorros **Thor** e **Akira**;
- o aniversário de **21 de outubro** e o nome “Morgaday”;
- mensagens de apoio e incentivo aos objetivos dela.

O objetivo não é representar cada conversa literalmente, e sim transformar referências reais em cenários e recados que façam sentido dentro do mapa. Textos narrativos de ambientação podem ser ficcionais, mas não devem ser confundidos com fatos biográficos. Fotos, prints e vídeos pessoais devem ser escolhidos e adicionados pelo criador.

---

## Linha do tempo do desenvolvimento

Este histórico reúne as etapas documentadas nas conversas e nos relatórios que acompanham o projeto. Os números de versão refletem os nomes dos arquivos/relatórios disponíveis; nem toda alteração intermediária teve um changelog independente.

### Primeira fase — estrutura do universo
- Criação da experiência de aniversário com inspiração visual em Fortnite.
- Organização de telas de entrada/carregamento e lobby.
- Inclusão de variantes do lobby com e sem o gato, incluindo versões com o personagem/elemento Homii.
- Separação de recursos em pastas para áudio, mapa, paisagens, recompensas e vestiário.
- Adição de recompensas/hacks e de opções de visual.

### Fase do mapa de memórias
- Definição de um mapa oficial em `assets/game/mapa_memorias.png`.
- Criação de dez pontos de interesse, cada um associado a uma paisagem própria.
- As telas dos locais passaram a ocupar a tela toda, com paisagem à esquerda e conteúdo à direita; em telas estreitas, o conteúdo fica empilhado.
- Os nomes dos pontos foram ajustados para ficarem como texto clicável, sem caixas de fundo nem bordas em volta dos rótulos.
- Os textos foram pensados em duas partes: uma história curta do local e um recado pessoal no painel lateral.
- Foi definido que o ponto central, anteriormente chamado “Lobby Central”, seria o **Refúgio Morgaday**, reservado à mensagem principal de aniversário. “Área do Presente” passou a se chamar **Jardins da Celebração**.

### Versões 43 e 47 — documentação e organização
- O README anterior registrava a organização dos textos com base no export de WhatsApp e a distinção entre informações do arquivo e o início da amizade em 2025, informado pelo criador.
- Os guias de mídia documentaram os nomes esperados para as dez paisagens e o modo de associar fotos, prints e vídeos a cada ponto.
- O CSS e o JavaScript foram separados em `style.css` e `script.js` para facilitar ajustes manuais sem misturar estilos e lógica no HTML.
- Os controles do Painel receberam bordas luminosas para facilitar a visualização e o ajuste manual das áreas clicáveis.
- O código antigo de um carrossel de cinco memórias, que apontava para elementos removidos, foi retirado. Também foram removidas referências a IDs inexistentes e estilos sem uso relacionados a esse componente.
- Foi corrigida a coexistência do título, texto e galeria de mídia de cada local, além de um evento duplicado do botão CANCELAR.
- Foi adicionada uma surpresa no ponto **O Desconhecido**: uma caixa de presente estilizada em CSS 3D, que abre ao clicar e revela a mensagem aprovada pelo criador.
- Na correção mais recente documentada da V47, o estado do Hack 3 passou a ser guardado em `sessionStorage`; a área clicável de Equipar recebeu prioridade em relação à área de Resgatar, e Resgatar ganhou borda luminosa para facilitar o ajuste manual.

### Mensagem do presente secreto

> A gente nunca precisou estar no mesmo lugar para construir boas lembranças. Tudo começou numa partida, continuou em conversas e virou uma amizade que ganhou até um universo próprio. E essa aventura ainda não acabou, Homii.
>
> **-Homii.**

A mensagem aparece quando o presente do ponto secreto é aberto. O espaço para futuras fotos, prints e vídeo é uma área reservada; esses conteúdos só estarão disponíveis depois que forem adicionados pelo criador.

---

## Experiência e funcionalidades

A implementação exata pode variar conforme o código da versão publicada, mas a estrutura atual do projeto contém:

- **Telas de carregamento** com artes próprias.
- **Lobby** com variantes com e sem gato, incluindo variantes com Homii.
- **Áudio de abertura e música do lobby**, usando os arquivos locais.
- **Vestiário** com fundo e opções de skin/hack.
- **Sistema de recompensas/hacks**, incluindo desbloqueio e equipamento.
- **Painel de códigos/recompensas**, com controles cuja posição pode ser ajustada manualmente.
- **Mapa de memórias** com dez locais clicáveis.
- **Tela de memória em tamanho amplo**, com paisagem e painel de texto/mídia.
- **Lugar secreto** com presente 3D clicável e revelação de mensagem.
- **Área preparada para mídias extras**, associadas a locais específicos.

### Hack 3

O fluxo pretendido é separar duas ações:
1. **Desbloquear/resgatar** o Hack 3.
2. **Equipar** o Hack 3.

Equipar deve atualizar o lobby para a variante correta, com ou sem Gordão/Homii, sem exigir um segundo desbloqueio. A correção documentada guarda a escolha durante a sessão do navegador. Como usa `sessionStorage`, não se deve presumir que a escolha persista indefinidamente depois que a sessão do navegador termina.

---

## Mapa de memórias

As dez paisagens ficam em `assets/memories/landscapes/`. Os nomes de arquivo foram mantidos para não quebrar as referências existentes, mesmo quando o título mostrado no mapa foi renomeado.

| Nome exibido / tema | Arquivo da paisagem | Ideia central |
|---|---|---|
| **Banco do HOMII SAFADO** | `banco_do_homii_safado.png` | Piada interna sobre assaltar um banco e a criatividade das conversas. |
| **Reino dos 30 Gatos** | `catastrofe_dos_30.png` | Os 30 gatos e a dedicação ao gatil. |
| **Distrito Morgaday** | `distrito_21_10.png` | Aniversário em 21 de outubro e brincadeiras sobre experiência/idade. |
| **Vila da Experiência** | `vila_dos_experientes.png` | A brincadeira “Véia não, experiente”. |
| **Refúgio Morgaday** | `lobby_central.png` | Ponto central do universo; reservado para a mensagem principal de aniversário. |
| **Refúgio do Gordão / tema dos gatos** | `santuario_dos_gatos.png` | Carinho pelos gatos e pelo Gordão. |
| **Jardins da Celebração** | `area_do_presente.png` | Surpresa, presente e celebração. |
| **Vale das Grandes Conquistas** | `vale_voce_e_incrivel.png` | Incentivo, persistência e objetivos pessoais. |
| **Praça da Morgana** | `praca_morgana.png` | Homenagem à identidade e ao universo da aniversariante. |
| **O Desconhecido** | `lugar_secreto.png` | Ponto secreto com o presente interativo. |

> Os nomes de arquivo são referências técnicas. Se renomear uma imagem, atualize também o caminho no código.

### Textos de cada local

Os textos foram planejados com duas funções:
- **História do local:** apresenta o cenário como uma breve narrativa.
- **Recado pessoal:** fala diretamente com a aniversariante, usando carinho, incentivo ou humor conforme o tema.

A mensagem principal de aniversário pertence ao Refúgio Morgaday; a mensagem “De uma partida para uma história” pertence ao presente de O Desconhecido.

---

## Lugar secreto e presente interativo

No local **O Desconhecido**, o painel tradicional é substituído por uma experiência curta:
1. Aparece o convite para abrir o presente.
2. Uma caixa roxa/rosa construída com CSS tem brilho e aparência tridimensional.
3. Ao clicar, a tampa anima e a mensagem é revelada.
4. A mensagem termina com a assinatura `-Homii.`.
5. Há um espaço visual reservado para futuras fotos, prints e vídeo.

A caixa 3D é feita com CSS, sem dependência obrigatória de biblioteca 3D externa. O espaço reservado para mídias é apenas um ponto de extensão visual até que arquivos reais sejam adicionados.

---

## Estrutura de arquivos

```text
MORGADAY V47/
├── index.html
├── style.css
├── script.js
├── check.js
├── README.md
├── RELATORIO-CORRECAO-HACK3-RESGATAR.txt
├── RELATORIO-CORRECOES-V46.txt
└── assets/
    ├── audio/
    │   ├── i-love-you-billie-eilish.mp3
    │   └── musica.mp3
    ├── game/
    │   ├── mapa_memorias.png
    │   └── tela_jogo.png
    ├── initial/
    │   └── loading.png
    ├── loading/
    │   ├── tela_carregamento_1.png
    │   ├── tela_carregamento_2.png
    │   └── tela_carregamento_3.png
    ├── lobby/
    │   ├── lobby_com_gato.png
    │   ├── lobby_com_gato_homii.png
    │   ├── lobby_loading.png
    │   ├── lobby_sem_gato.png
    │   └── lobby_sem_gato_homii.png
    ├── memories/
    │   ├── LEIA-ME.txt
    │   ├── README-MIDIAS.txt
    │   └── landscapes/
    │       └── [10 paisagens do mapa]
    ├── rewards/
    │   ├── hack_1.png
    │   ├── hack_2.png
    │   ├── hack_3.png
    │   ├── presente.png
    │   ├── presente_aberto.png
    │   ├── presente_gato.png
    │   └── presente_padrao.png
    ├── ui/
    │   └── modal_painel.png
    └── wardrobe/
        ├── background/
        │   └── vestiario.png
        ├── hacks/
        │   ├── hack_1.png
        │   ├── hack_2.png
        │   └── hack_3.png
        └── skins/
            ├── morgana.png
            └── morgana_gato.png
```

---

## Como executar localmente

1. Baixe ou clone o repositório.
2. Mantenha a estrutura de pastas e os nomes dos arquivos.
3. Abra `index.html` no navegador.

Como é um site estático, não há processo de build obrigatório documentado. Para uma experiência mais próxima de hospedagem web, também é possível iniciar um servidor local simples a partir da pasta do projeto:

```bash
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador.

---

## Como editar textos, posições e mídias

### Arquivos principais

- `index.html` — estrutura dos elementos e telas.
- `style.css` — aparência, efeitos, dimensões, posições e responsividade.
- `script.js` — lógica dos botões, navegação, recompensas, mapa e conteúdo das memórias.

O projeto foi separado dessa forma para permitir que ajustes de estilo sejam feitos em `style.css` e ajustes de comportamento em `script.js`.

### Ajustar posições manualmente

Se precisar mover uma área clicável, localize no CSS a regra correspondente ao botão/elemento e altere as coordenadas ou dimensões existentes. Faça uma alteração de cada vez e teste em tela cheia e em janela redimensionada. Como alguns botões usam áreas clicáveis sobre uma arte, uma mudança de tamanho/posição pode afetar a correspondência visual.

### Adicionar fotos, prints ou vídeos

Os anexos do export de WhatsApp não estão incluídos no TXT: aparecem como `<Mídia oculta>`. Para mostrar mídias reais, copie os arquivos escolhidos para uma pasta dentro de `assets/memories/` e configure o array `media` do local correspondente em `script.js`.

Exemplo ilustrativo de configuração (ajuste os nomes dos arquivos e o local conforme necessário):

```javascript
media: [
  {
    type: "image",
    src: "assets/memories/media/banco/print-banco.png",
    caption: "Uma lembrança dessa conversa"
  },
  {
    type: "video",
    src: "assets/memories/media/origem/fortnite.mp4",
    caption: "Uma lembrança do Fortnite"
  }
]
```

- Use `type: "image"` para imagem ou print.
- Use `type: "video"` para vídeo.
- `src` deve apontar para o caminho real do arquivo dentro do projeto.
- As legendas devem descrever o material escolhido, sem atribuir a ele um contexto que não seja verdadeiro.

Sugestões de organização (crie essas pastas apenas se for usar esse conteúdo):
- `assets/memories/media/origem/` — Fortnite e começo da amizade;
- `assets/memories/media/banco/` — piada do banco;
- `assets/memories/media/gatos/` — gatos e gatil;
- `assets/memories/media/gordao/` — Gordão;
- `assets/memories/media/aniversario/` — aniversário e presente;
- `assets/memories/media/experiencia/` — brincadeiras sobre “experiente”;
- `assets/memories/media/conquistas/` — mensagens de incentivo;
- `assets/memories/media/praca/` — imagens para a Praça da Morgana;
- `assets/memories/media/secreto/` — conteúdo reservado para a surpresa.

Essas pastas são sugestões; não são todas criadas por padrão.

---

## Áudio

Os arquivos de áudio locais são:
- `assets/audio/musica.mp3`
- `assets/audio/i-love-you-billie-eilish.mp3`

O comportamento planejado ao longo do desenvolvimento foi evitar que as músicas se sobreponham: a música de abertura deve sair durante a transição, e a faixa do lobby deve tocar sem reiniciar ao navegar do lobby para o mapa. Verifique o comportamento no navegador de destino, pois a reprodução automática pode ser bloqueada pelas políticas do próprio navegador até haver uma interação do usuário.

---

## Verificações e limitações conhecidas

Relatórios incluídos nesta versão registram:
- verificação sintática do JavaScript com `node --check`;
- remoção de referências antigas a elementos de carrossel que já não existiam;
- revisão de referências a IDs, eventos duplicados e regras CSS sem uso;
- preservação intencional das artes, paisagens, áudios e posições personalizadas;
- correção pontual do estado do Hack 3 durante a sessão;
- realce visual da área de Resgatar para facilitar ajuste manual.

**Importante:** verificações estáticas não substituem um teste manual completo no navegador. Antes de publicar, teste o fluxo de entrada, áudio, vestiário, desbloqueio/equipamento de hacks, mapa, retorno ao lobby e abertura do presente secreto.

Limitações de conteúdo:
- As fotos, os prints e os vídeos reais devem ser adicionados manualmente pelo criador.
- A exportação de texto do WhatsApp não inclui os anexos originais.
- O estado de equipamento documentado para o Hack 3 é mantido em `sessionStorage`, ou seja, durante a sessão atual do navegador.
- O início da amizade em 2025 é informação fornecida pelo criador e não pode ser verificado pelo TXT exportado.
- A experiência não é afiliada, patrocinada ou endossada pela Epic Games/Fortnite; usa inspiração temática de jogo e recursos fornecidos para este projeto.

---

## Publicação no GitHub

Antes do primeiro envio:
1. Confira se o projeto abre localmente.
2. Confirme que `index.html`, `style.css`, `script.js` e toda a pasta `assets/` estão no repositório.
3. Não inclua arquivos privados, credenciais, tokens, dados de conta ou conversas completas que não devam ficar públicos.
4. Confira o tamanho dos arquivos de áudio/imagem; limites do GitHub podem exigir otimização ou Git LFS para arquivos grandes.
5. Faça commit e push para o repositório.

Exemplo básico, caso o repositório já esteja inicializado:

```bash
git add .
git commit -m "Documenta o projeto Morgaday"
git push
```

Para GitHub Pages, configure a fonte de publicação para a branch/pasta onde o `index.html` está localizado. Se a estrutura do repositório colocar o site dentro de uma subpasta, confirme se o serviço está configurado para publicar essa pasta.

---

## Créditos e privacidade

- **Concepção, seleção de referências pessoais e conteúdo final:** Homii.
- **Pessoa homenageada:** Gabriela Leon (Morgana / Morgada).
- **Tecnologias:** HTML, CSS e JavaScript.
- **Recursos gráficos e sonoros:** arquivos incluídos na pasta `assets/`.

Este projeto contém referências a uma amizade privada. Se o repositório for público, publique apenas as imagens, prints, áudios e vídeos que você tem autorização e vontade de compartilhar. Considere manter mídias pessoais fora do Git público ou em um repositório privado.

Feito com carinho, criatividade e muitas referências internas. 💜
