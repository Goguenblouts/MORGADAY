VERSÃO 43 — GUIA DE MÍDIAS DO MAPA

O texto das memórias foi organizado a partir do export de WhatsApp fornecido, que cobre 15/06/2026 a 11/10/2026. O começo em 2025 (conheceram-se no Fortnite, durante uma live dela no TikTok) foi informado pelo dono do projeto; esse trecho não está no export.

IMPORTANTE SOBRE FOTOS, PRINTS E VÍDEOS
O TXT do WhatsApp substitui anexos por “<Mídia oculta>”; ele não contém os arquivos de imagem/vídeo. Por isso, nenhuma foto ou print foi inventado nem extraído do texto. Coloque aqui os arquivos originais que você quiser usar.

PAISAGENS
Copie suas 10 imagens para assets/memories/landscapes/ com estes nomes:
- banco_do_homii_safado.png
- catastrofe_dos_30.png
- distrito_21_10.png
- vila_dos_experientes.png
- lobby_central.png  (agora exibida no ponto Refúgio Morgaday)
- santuario_dos_gatos.png
- area_do_presente.png (agora exibida em Jardins da Celebração)
- vale_voce_e_incrivel.png
- praca_morgana.png
- lugar_secreto.png

MÍDIA ADICIONAL
Pastas sugeridas:
- media/origem/ — Fortnite e lembranças do começo em 2025
- media/banco/ — prints da piada do banco, 17 e 18/07/2026
- media/gatos/ e media/gordao/ — gatos, Gordão e o gatil
- media/aniversario/ e media/presente/ — aniversário, presente e códigos
- media/experiencia/ — “Véia não, experiente”
- media/conquistas/ — mensagens de apoio
- media/praca/ — primeira conversa exportada e fotos
- media/secreto/ — material reservado para a surpresa

COMO EXIBIR FOTOS/PRINTS/VÍDEOS
No index.html, localize `const memoryPlaces`. Dentro do lugar desejado, adicione caminhos ao array `media`. Exemplo:

media: [
  { type: "image", src: "assets/memories/media/banco/print-banco.png", caption: "A piada do banco — 18/07/2026" },
  { type: "video", src: "assets/memories/media/origem/fortnite.mp4", caption: "Lembrança do Fortnite" }
]

Use type "image" para foto/print e type "video" para vídeo. Os caminhos são relativos à pasta do site. Os arquivos não precisam ser renomeados para esses exemplos; atualize o caminho no array para combinar com o nome real.

REFÚGIO MORGADAY
O ponto central substituiu Lobby Central e fica reservado para a mensagem de aniversário que você ainda vai escrever. A mensagem não foi inventada. A Área do Presente foi renomeada para Jardins da Celebração.
