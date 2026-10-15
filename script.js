  const giftScreen = document.getElementById("giftScreen");
  const skinScreen = document.getElementById("skinScreen");
  const lobbyLoadingScreen = document.getElementById("lobbyLoadingScreen");
  const lobbySoloScreen = document.getElementById("lobbySoloScreen");
  const lobbyCatScreen = document.getElementById("lobbyCatScreen");
  const wardrobeScreen = document.getElementById("wardrobeScreen");
  const gameScreen = document.getElementById("gameScreen");
  const returnLobbyButton = document.getElementById("returnLobbyButton");
  const memoryMapOverlay = document.getElementById("memoryMapOverlay");
  const gameLightFlash = document.getElementById("gameLightFlash");
  const secretRewardScreen = document.getElementById("secretRewardScreen");
  const secretRescueButton = document.getElementById("secretRescueButton");
  const secretRewardScreen2 = document.getElementById("secretRewardScreen2");
  const secretRescueButton2 = document.getElementById("secretRescueButton2");
  const secretRewardScreen3 = document.getElementById("secretRewardScreen3");
  const secretEquipButton3 = document.getElementById("secretEquipButton3");
  const secretRescueButton3 = document.getElementById("secretRescueButton3");
  const returnLobbyMapButton = document.getElementById("returnLobbyMapButton");
  const closeMemoryMap = document.getElementById("closeMemoryMap");
  const memoryMapImageWrap = document.querySelector(".memoryMapImageWrap");
  const memoryMapCanvas = document.getElementById("memoryMapCanvas");
  const memoryDetailOverlay = document.getElementById("memoryDetailOverlay");
  const memoryDetailClose = document.getElementById("memoryDetailClose");
  const memoryDetailTitle = document.getElementById("memoryDetailTitle");
  const memoryDetailText = document.getElementById("memoryDetailText");
  const memoryDetailMedia = document.getElementById("memoryDetailMedia");
  const memoryDetailNostalgia = document.getElementById("memoryDetailNostalgia");
  const memoryDetailNostalgiaPanel = document.getElementById("memoryDetailNostalgiaPanel");
  const memoryDetailNoteHeading = document.getElementById("memoryDetailNoteHeading");
  const memoryHotspots = [...document.querySelectorAll(".memoryHotspot")];
  const lobbyLoadingArt = document.getElementById("lobbyLoadingArt");
  const lobbyLoadingProgress = document.getElementById("lobbyLoadingProgress");

  const giftButton = document.getElementById("giftButton");
  const faceChoice = document.getElementById("faceChoice");
  const catChoice = document.getElementById("catChoice");
  const equipButton = document.getElementById("equipButton");
  const playSoloButton = document.getElementById("playSoloButton");
  const playCatButton = document.getElementById("playCatButton");
  const panelSoloButton = document.getElementById("panelSoloButton");
  const panelCatButton = document.getElementById("panelCatButton");
  const wardrobeSoloButton = document.getElementById("wardrobeSoloButton");
  const wardrobeCatButton = document.getElementById("wardrobeCatButton");
  const wardrobePlayButton = document.getElementById("wardrobePlayButton");
  const closeWardrobe = document.getElementById("closeWardrobe");
  const wardrobeGrid = document.getElementById("wardrobeGrid");
  const wardrobeHover = document.getElementById("wardrobeHover");
  const wardrobeHoverClose = document.getElementById("wardrobeHoverClose");
  const wardrobeHoverTitle = document.getElementById("wardrobeHoverTitle");
  const wardrobeHoverImage = document.getElementById("wardrobeHoverImage");
  const wardrobeDownload = document.getElementById("wardrobeDownload");
  const wardrobeTabs = [...document.querySelectorAll(".wardrobeTab")];

  const fadeOverlay = document.getElementById("fadeOverlay");
  const shineOverlay = document.getElementById("shineOverlay");
  const bgMusic = document.getElementById("bgMusic");
  const lobbyMusic = document.getElementById("lobbyMusic");
  const skinChoiceImage = document.getElementById("skinChoiceImage");

  const panelModal = document.getElementById("panelModal");
  const closePanel = document.getElementById("closePanel");


  const secretCode = document.getElementById("secretCode");
  const unlockSecret = document.getElementById("unlockSecret");

  // "solo" = Morgana sem gato | "gato" = Morgana com gato
  let selectedSkin = "solo";
  let hack3Equipped = sessionStorage.getItem("hack3Equipped") === "1";
  let gameMapTimer = null;
  const unlockedHacks = {
    1: sessionStorage.getItem("hackUnlocked1") === "1",
    2: sessionStorage.getItem("hackUnlocked2") === "1",
    3: sessionStorage.getItem("hackUnlocked3") === "1"
  };

  const skinImages = {
    solo: "assets/rewards/presente_padrao.png",
    gato: "assets/rewards/presente_gato.png"
  };

  let musicFadeTimer = null;

  // Troca a tela principal do fluxo. Esta função é usada por todas as
  // transições (carregamento, presente, lobby, vestiário e mapa).
  function showScreen(target) {
    if (!target) return;
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.toggle("active", screen === target);
    });
  }

  function fadeAudio(audio, target, duration = 700) {
    if (!audio) return;
    if (musicFadeTimer) clearTimeout(musicFadeTimer);
    const start = Number.isFinite(audio.volume) ? audio.volume : 0;
    const startedAt = performance.now();
    const step = () => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * progress));
      if (progress < 1) musicFadeTimer = setTimeout(step, 30);
      else musicFadeTimer = null;
    };
    step();
  }

  function startMusic() {
    if (lobbyMusic && !lobbyMusic.paused) return;
    bgMusic.volume = 0.65;
    bgMusic.play().catch(() => {});
  }

  function stopOpeningMusicWithFade() {
    if (!bgMusic || bgMusic.paused) return;
    fadeAudio(bgMusic, 0, 900);
    setTimeout(() => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume = 0;
    }, 950);
  }

  function startLobbyMusic() {
    if (!lobbyMusic) return;

    // Nunca deixe a música da abertura e a I Love You tocarem juntas.
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume = 0;
    }

    lobbyMusic.volume = 0;
    lobbyMusic.currentTime = 0;
    lobbyMusic.play().then(() => {
      fadeAudio(lobbyMusic, 0.65, 1200);
    }).catch(() => {});
  }

  // Mantém a mesma música emocional ao sair do lobby e entrar na tela do jogo.
  // Não reinicia a faixa: ela continua exatamente de onde estava para acompanhar
  // a abertura do mapa de memórias.
  function keepLobbyMusicPlaying() {
    if (!lobbyMusic) return;
    if (!lobbyMusic.paused) return;
    lobbyMusic.volume = Math.max(lobbyMusic.volume || 0, 0.65);
    lobbyMusic.play().catch(() => {});
  }


  window.addEventListener("load", () => {
    setTimeout(() => showScreen(giftScreen), 20000);
  });

  function abrirPresente() {
    startMusic();
    selectedSkin = "solo";
    skinChoiceImage.src = skinImages.solo;

    shineOverlay.classList.remove("shine");
    void shineOverlay.offsetWidth;
    shineOverlay.classList.add("shine");

    setTimeout(() => showScreen(skinScreen), 360);
  }

  giftButton.addEventListener("click", abrirPresente);
  giftButton.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirPresente();
    }
  });

  window.addEventListener("pointerdown", startMusic, { once: true });
  window.addEventListener("keydown", startMusic, { once: true });

  function selectSkin(choice) {
    if (selectedSkin === choice) return;

    selectedSkin = choice;
    skinChoiceImage.classList.add("choice-changing");

    setTimeout(() => {
      skinChoiceImage.src = skinImages[choice];
      const reveal = () => skinChoiceImage.classList.remove("choice-changing");

      if (skinChoiceImage.complete) {
        requestAnimationFrame(reveal);
      } else {
        skinChoiceImage.addEventListener("load", reveal, { once: true });
      }
    }, 140);
  }

  faceChoice.addEventListener("click", () => selectSkin("solo"));
  catChoice.addEventListener("click", () => selectSkin("gato"));

  function keyboardSelect(element, choice) {
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectSkin(choice);
      }
    });
  }
  keyboardSelect(faceChoice, "solo");
  keyboardSelect(catChoice, "gato");

  // Há dois comportamentos diferentes:
  // 1) Na abertura inicial, a arte "LOBBY" pode aparecer uma única vez.
  // 2) Ao sair da partida, NUNCA usamos a arte "LOBBY": usamos apenas as telas
  //    de carregamento com CARREGANDO + barra de progresso.
  const returnLobbyLoadingImages = [
    "assets/loading/tela_carregamento_1.png",
    "assets/loading/tela_carregamento_2.png",
    "assets/loading/tela_carregamento_3.png"
  ];

  function randomLobbyLoading() {
    const chosen = returnLobbyLoadingImages[Math.floor(Math.random() * returnLobbyLoadingImages.length)];
    lobbyLoadingArt.src = chosen;

    const lobbyHud = document.querySelector('.lobbyLoadingHud');
    // A arte "LOBBY" inicial é limpa. Nas telas de carregamento usadas
    // para voltar ao lobby, o HUD aparece sempre.
    const isLobbyArt = chosen.endsWith('lobby_loading.png');
    lobbyHud.style.display = isLobbyArt ? 'none' : 'block';

    return chosen;
  }

  // EQUIPAR -> carregamento aleatório inicial -> lobby 10s -> lobby final.
  let lobbyLoadingAnimationFrame = null;

  function updateLobbyArt() {
    const soloArt = document.getElementById("lobbySoloArt");
    const catArt = document.getElementById("lobbyCatArt");
    if (soloArt) soloArt.src = hack3Equipped ? "assets/lobby/lobby_sem_gato_homii.png" : "assets/lobby/lobby_sem_gato.png";
    if (catArt) catArt.src = hack3Equipped ? "assets/lobby/lobby_com_gato_homii.png" : "assets/lobby/lobby_com_gato.png";
  }

  function showSelectedLobby() {
    updateLobbyArt();
    showScreen(selectedSkin === "gato" ? lobbyCatScreen : lobbySoloScreen);
  }

  function transitionToSelectedLobby(isReturn = false) {
    const finalScreen = selectedSkin === "gato" ? lobbyCatScreen : lobbySoloScreen;
    const finalImage = finalScreen.querySelector(".lobbyFinalTransition");

    if (lobbyLoadingAnimationFrame) {
      cancelAnimationFrame(lobbyLoadingAnimationFrame);
      lobbyLoadingAnimationFrame = null;
    }

    // EQUIPAR: primeiro mostra a arte "LOBBY" em zoom por 5 segundos.
    // Essa é uma etapa visual de entrada e NÃO é uma tela de carregamento:
    // sem CARREGANDO e sem barra de progresso. Depois dela, entra no lobby final.
    if (!isReturn) {
      // Na entrada, usa apenas a arte do lobby, sem HUD de carregamento.
      lobbyLoadingArt.src = "assets/lobby/lobby_loading.png";
      document.querySelector('.lobbyLoadingHud').style.display = 'none';
      lobbyLoadingScreen.classList.remove("pullback");
      finalImage.classList.remove("revealed");
      showScreen(lobbyLoadingScreen);

      setTimeout(() => {
        finalImage.classList.add("revealed");
        lobbyLoadingScreen.classList.add("pullback");

        setTimeout(() => {
          updateLobbyArt();
          showScreen(finalScreen);
          finalImage.classList.add("revealed");
          lobbyLoadingScreen.classList.remove("pullback");

          // Segurança: a música da abertura já deve ter terminado pelo fade-out.
          if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            bgMusic.volume = 0;
          }
          startLobbyMusic();
        }, 1050);
      }, 5000);
      return;
    }

    // Retorno da partida: aqui sim usamos uma tela de carregamento.
    randomLobbyLoading();
    finalImage.classList.remove("revealed");
    lobbyLoadingScreen.classList.remove("pullback");
    lobbyLoadingProgress.style.width = "0%";
    showScreen(lobbyLoadingScreen);

    const startedAt = performance.now();
    const duration = 10000;

    function animateLobbyLoading(now) {
      const elapsed = Math.min(now - startedAt, duration);
      const percent = elapsed / duration;
      lobbyLoadingProgress.style.width = `${(percent * 100).toFixed(2)}%`;

      if (elapsed < duration) {
        lobbyLoadingAnimationFrame = requestAnimationFrame(animateLobbyLoading);
      } else {
        lobbyLoadingAnimationFrame = null;

        requestAnimationFrame(() => {
          lobbyLoadingScreen.classList.add("pullback");
          finalImage.classList.add("revealed");
        });

        setTimeout(() => {
          showScreen(finalScreen);
          finalImage.classList.add("revealed");
          lobbyLoadingScreen.classList.remove("pullback");
        }, 1050);
      }
    }

    lobbyLoadingAnimationFrame = requestAnimationFrame(animateLobbyLoading);
  }

  function equiparSkin() {
    // A música da abertura sai com fade-out antes da I Love You entrar no lobby.
    stopOpeningMusicWithFade();

    // Na entrada do lobby usamos um brilho, não um fade preto.
    shineOverlay.classList.remove("shine");
    void shineOverlay.offsetWidth;
    shineOverlay.classList.add("shine");

    setTimeout(() => {
      transitionToSelectedLobby(false);
    }, 650);
  }

  equipButton.addEventListener("click", equiparSkin);
  equipButton.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      equiparSkin();
    }
  });

  // ===== MAPA DE MEMÓRIAS =====
  // Conteúdo baseado no export de WhatsApp (15/06 a 11/10/2026).
  // A origem em 2025, durante uma live de Fortnite no TikTok, foi informada por você;
  // ela não aparece no arquivo exportado, que começa em junho de 2026.
  // Para adicionar mídias: assets/memories/media/<pasta>/ e complete o array "media" abaixo.
  const memoryPlaces = {
    "Banco do HOMII SAFADO": {
      title:"BANCO DO HOMII SAFADO",
      text:"Há quem jure que, atrás desta porta blindada, não existe dinheiro nenhum — só planos mirabolantes, teorias improváveis e uma dupla que consegue transformar uma conversa aleatória numa missão digna de filme. O banco ficou famoso depois de uma ideia suspeita envolvendo bancos de ricos. Desde então, todo visitante precisa passar pelo detector de risadas antes de entrar. KKKKK.",
      nostalgia:"Algumas das melhores histórias começam com uma ideia que não devia sair do papel.",
      media: []
    },
    "Reino dos 30 Gatos": {
      title:"REINO DOS 30 GATOS",
      text:"Bem-vindo ao reino onde trinta pequenos soberanos decidem a rotina, o espaço no sofá e quem merece atenção primeiro. Cada um tem seu jeitinho, sua história e seu lugar nessa família de bigodes. A ideia de um gatil continua sendo um sonho que vale cuidar com paciência: nem todo objetivo se realiza de uma vez, mas cada passo responsável já conta. O importante é não perder o carinho nem desistir do que faz sentido.",
      nostalgia:"Sonhos grandes também crescem um passo de cada vez — e às vezes vêm acompanhados de trinta miados.",
      media: []
    },
    "Distrito Morgaday": {
      title:"DISTRITO MORGADAY",
      text:"Todo dia 21 de outubro, as luzes deste distrito se acendem mais fortes. A cidade prepara uma festa para Gabriela Leon — conhecida por muita gente como Morgana e salva no meu WhatsApp como Morgada. Há música, carinho, planos bons para o novo ciclo e uma lei municipal muito importante: ninguém chama a aniversariante de velha. Aqui, o título oficial é experiente, com orgulho e direito a muita zoeira.",
      nostalgia:"Hoje é dia de celebrar a pessoa por trás de todos esses nomes — e tudo de bom que ainda vem pela frente.",
      media: []
    },
    "Vila da Experiência": {
      title:"VILA DA EXPERIÊNCIA",
      text:"Nesta vila, cada ano vivido desbloqueia uma habilidade nova: responder à zoeira na mesma moeda, rir das próprias histórias e seguir em frente sem perder a leveza. A placa na entrada deixa tudo claro: “Véia não, experiente”. Os moradores levam essa regra muito a sério — exceto quando surge uma oportunidade perfeita para provocar alguém KKKKK.",
      nostalgia:"Que nunca falte motivo pra rir, aprender e continuar colecionando histórias.",
      media: []
    },
    "Refúgio Morgaday": {
      title:"REFÚGIO MORGADAY",
      text:"No coração deste mundo existe um refúgio que nasceu de um encontro improvável: uma live no TikTok, uma partida de Fortnite em 2025 e duas pessoas que ainda nem imaginavam quantas conversas viriam depois. Com o tempo, surgiram os “homii”, as brincadeiras, os assuntos aleatórios, as trocas de carinho e aquele jeito próprio de fazer uma conversa virar parte do dia. Este lugar guarda essa amizade do jeito que ela é: espontânea, divertida e importante, sem precisar ser perfeita nem parecer história de filme.",
      nostalgia:"Feliz aniversário, Gabriela Leon! 💜🎂\n\nMorgana pra quem te acompanha por aí, Morgada aqui no meu WhatsApp — mas, independente do nome, tu é uma pessoa que fico feliz de ter conhecido. Quem diria que uma live no TikTok e uma partida de Fortnite lá em 2025 iam acabar rendendo tanta conversa, tanta zoeira e esse tanto de “homii” KKKKK.\n\nQuero te desejar muita saúde, paz, felicidade e força pra continuar correndo atrás do que tu sonha. Que as coisas aconteçam no tempo certo, que os dias difíceis não te façam esquecer do que tu é capaz e que tu nunca precise abandonar aquilo que faz teu olho brilhar. Nem todo plano se realiza de uma vez; às vezes é um passo de cada vez — e isso também é progresso.\n\nQue não falte carinho na tua vida, nem motivos pra rir das nossas besteiras. Que teus bichinhos continuem te dando aquele amor sincero: os trinta gatinhos, cada um com sua história, e também o Thor e a Akira, que fazem parte da tua família de quatro patas. Espero que tu consiga realizar teus planos e, quem sabe, ver aquele sonho dos gatos crescendo do jeito responsável e possível, sem perder a paixão que te move.\n\nObrigado pelas conversas, pelas brincadeiras e por ser tu mesma comigo. Gosto desse jeito espontâneo que a nossa amizade tem, sem precisar forçar nada: a gente conversa, zoa, fala de mil coisas e vai construindo as lembranças no caminho. Torço de verdade pra que esse novo ciclo te traga oportunidades boas, pessoas que te valorizem e muita coisa da qual tu possa se orgulhar.\n\nAproveita teu dia, dona Morgada. Hoje a experiente é a estrela principal, então pode aceitar parabéns, carinho e um pouquinho de bajulação sem reclamar KKKKK. Feliz Morgaday! Que venham muitos capítulos bons pela frente. 💜✨",
      media: []
    },
    "Refúgio do Gordão": {
      title:"REFÚGIO DO GORDÃO",
      text:"Dizem que o Gordão é o guardião deste santuário, responsável por fiscalizar cochilos, exigir carinho e aparecer bem na hora em que alguém precisa sorrir. Mas ele não está sozinho: por aqui também se celebram Thor e Akira, os cães que fazem parte da vida da Morgana e deixam suas próprias marcas nessa família cheia de patas. Cada um tem seu espaço, seu jeito e uma história que merece ser cuidada.",
      nostalgia:"Que nunca faltem patinhas por perto, histórias pra contar e motivos pra cuidar de quem depende da gente.",
      media: []
    },
    "Jardins da Celebração": {
      title:"JARDINS DA CELEBRAÇÃO",
      text:"Este jardim floresce sempre que alguém prepara uma surpresa pensando com carinho em outra pessoa. As trilhas foram feitas para caminhar sem pressa, reparar nos pequenos detalhes e lembrar que um presente também carrega o tempo, a intenção e o cuidado de quem o preparou. No fim do caminho, não existe obrigação de achar palavras perfeitas: basta receber a surpresa sabendo que ela foi feita com carinho.",
      nostalgia:"Que este cantinho te lembre de que tu também merece ser celebrada.",
      media: []
    },
    "Vale das Grandes Conquistas": {
      title:"VALE DAS GRANDES CONQUISTAS",
      text:"O caminho por este vale nem sempre é reto. Às vezes a subida cansa, os planos demoram e parece que falta muito para chegar. Mas cada passo ensina alguma coisa, e descansar não significa desistir. As luzes ao longo da trilha lembram que os sonhos podem ser construídos aos poucos, com cuidado, persistência e espaço para mudar a rota quando for preciso.",
      nostalgia:"Não precisa resolver a vida toda hoje. Continua no teu ritmo — cada passo conta.",
      media: []
    },
    "Praça da Morgana": {
      title:"PRAÇA DA MORGANA",
      text:"Toda aventura precisa de um lugar onde a história começa. Esta praça foi construída em homenagem àquela live no TikTok e à partida de Fortnite em 2025 que acabou abrindo espaço para uma amizade. Ninguém sabia o que viria dali; talvez seja justamente isso que torna o começo tão especial. O resto foi acontecendo aos poucos, entre conversas, piadas internas e momentos que foram encontrando seu lugar.",
      nostalgia:"Às vezes, uma partida qualquer acaba virando o começo de uma história muito boa.",
      media: []
    },
    "O Desconhecido": {
      title:"O DESCONHECIDO",
      text:"Além da última curva do mapa existe um lugar guardado para o que ainda está por vir. Não há placa explicando tudo, porque algumas coisas perdem a graça quando são reveladas antes da hora. A única pista é continuar explorando: a vida ainda tem encontros, planos e capítulos que ninguém consegue prever por completo.",
      nostalgia:"Que o futuro te surpreenda com coisas boas que hoje tu nem imagina.",
      media: []
    }
  };

  function openMemoryPlace(placeName) {
    const data = memoryPlaces[placeName] || memoryPlaces["Refúgio Morgaday"];
    memoryDetailTitle.textContent = data.title;
    memoryDetailText.textContent = data.text;
    memoryDetailNostalgia.textContent = data.nostalgia;
    const oldGallery = memoryDetailNostalgiaPanel.querySelector(".memoryExtraGallery");
    if (oldGallery) oldGallery.remove();
    if (memoryDetailNoteHeading) memoryDetailNoteHeading.textContent = placeName === "Refúgio Morgaday" ? "FELIZ MORGADAY, GABRIELA" : "UM RECADO PRA TI";
    const landscapeFiles = {
      "Banco do HOMII SAFADO":"banco_do_homii_safado.png",
      "Reino dos 30 Gatos":"catastrofe_dos_30.png",
      "Distrito Morgaday":"distrito_21_10.png",
      "Vila da Experiência":"vila_dos_experientes.png",
      "Refúgio Morgaday":"lobby_central.png",
      "Refúgio do Gordão":"santuario_dos_gatos.png",
      "Jardins da Celebração":"area_do_presente.png",
      "Vale das Grandes Conquistas":"vale_voce_e_incrivel.png",
      "Praça da Morgana":"praca_morgana.png",
      "O Desconhecido":"lugar_secreto.png"
    };
    const landscapeFile = landscapeFiles[placeName] || "paisagem.png";
    const configuredMedia = (data.media || []).map(item => {
      const src = typeof item === "string" ? item : item.src;
      const type = typeof item === "string" ? "image" : (item.type || "image");
      const caption = typeof item === "string" ? "" : (item.caption || "");
      if (!src) return "";
      if (type === "video") return `<figure class="memoryExtraMedia"><video controls preload="metadata" src="${src}"></video>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
      return `<figure class="memoryExtraMedia"><img loading="lazy" src="${src}" alt="${caption || data.title}">${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
    }).join("");
    const extras = configuredMedia ? `<div class="memoryExtraGallery">${configuredMedia}</div>` : "";
    memoryDetailMedia.innerHTML = `<img src="assets/memories/landscapes/${landscapeFile}" alt="Paisagem de ${data.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"><div class="memoryMediaPlaceholder" style="display:none">ADICIONE A PAISAGEM EM<br>assets/memories/landscapes/${landscapeFile}</div>`;
    memoryDetailNostalgia.innerHTML = data.nostalgia.replace(/\n/g, "<br>");
    if (extras) memoryDetailNostalgiaPanel.insertAdjacentHTML("beforeend", extras);
    memoryDetailOverlay.classList.add("open");
    memoryDetailOverlay.setAttribute("aria-hidden","false");
    returnLobbyMapButton.classList.add("memory-detail-hidden");
  }

  memoryHotspots.forEach(button => button.addEventListener("click", () => {
    if (memoryMapImageWrap.dataset.dragged === "true") return;
    openMemoryPlace(button.dataset.memoryPlace);
  }));
  memoryDetailClose.addEventListener("click", () => {
    memoryDetailOverlay.classList.remove("open");
    memoryDetailOverlay.setAttribute("aria-hidden","true");
    returnLobbyMapButton.classList.remove("memory-detail-hidden");
  });
  memoryDetailOverlay.addEventListener("click", e => {
    if (e.target === memoryDetailOverlay) memoryDetailClose.click();
  });

  // ===== ZOOM DO MAPA + ATALHO M =====
  let memoryMapZoom = 1;
  let mapDrag = null;

  function applyMemoryMapZoom(nextZoom, anchorX = null, anchorY = null) {
    if (!memoryMapCanvas || !memoryMapImageWrap) return;
    const rect = memoryMapImageWrap.getBoundingClientRect();
    const x = anchorX == null ? rect.width / 2 : anchorX;
    const y = anchorY == null ? rect.height / 2 : anchorY;
    const oldWidth = Math.max(1, memoryMapCanvas.getBoundingClientRect().width);
    const oldHeight = Math.max(1, memoryMapCanvas.getBoundingClientRect().height);
    const focusX = (memoryMapImageWrap.scrollLeft + x) / oldWidth;
    const focusY = (memoryMapImageWrap.scrollTop + y) / oldHeight;

    memoryMapZoom = Math.max(1, Math.min(3.5, nextZoom));
    const baseWidth = Math.max(1, memoryMapImageWrap.clientWidth);
    const baseHeight = Math.max(1, memoryMapImageWrap.clientHeight);
    memoryMapCanvas.style.width = `${baseWidth * memoryMapZoom}px`;
    memoryMapCanvas.style.height = `${baseHeight * memoryMapZoom}px`;

    requestAnimationFrame(() => {
      const newWidth = memoryMapCanvas.getBoundingClientRect().width;
      const newHeight = memoryMapCanvas.getBoundingClientRect().height;
      memoryMapImageWrap.scrollLeft = memoryMapZoom === 1 ? 0 : Math.max(0, focusX * newWidth - x);
      memoryMapImageWrap.scrollTop = memoryMapZoom === 1 ? 0 : Math.max(0, focusY * newHeight - y);
    });
  }

  function setMapCanvasBaseSize() {
    if (!memoryMapCanvas || !memoryMapImageWrap) return;
    const w = Math.max(1, memoryMapImageWrap.clientWidth);
    const h = Math.max(1, memoryMapImageWrap.clientHeight);
    memoryMapCanvas.style.width = `${w * memoryMapZoom}px`;
    memoryMapCanvas.style.height = `${h * memoryMapZoom}px`;
  }

  memoryMapImageWrap.addEventListener("wheel", event => {
    if (!memoryMapOverlay.classList.contains("open") || memoryDetailOverlay.classList.contains("open")) return;
    event.preventDefault();
    const rect = memoryMapImageWrap.getBoundingClientRect();
    const next = memoryMapZoom + (event.deltaY < 0 ? 0.18 : -0.18);
    applyMemoryMapZoom(next, event.clientX - rect.left, event.clientY - rect.top);
  }, { passive: false });

  memoryMapImageWrap.addEventListener("pointerdown", event => {
    if (event.button !== 0 || event.target.closest(".memoryHotspot") || memoryMapZoom <= 1) return;
    mapDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: memoryMapImageWrap.scrollLeft,
      scrollTop: memoryMapImageWrap.scrollTop,
      moved: false
    };
    memoryMapImageWrap.classList.add("is-dragging");
    memoryMapImageWrap.setPointerCapture(event.pointerId);
  });

  memoryMapImageWrap.addEventListener("pointermove", event => {
    if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;
    const dx = event.clientX - mapDrag.startX;
    const dy = event.clientY - mapDrag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) mapDrag.moved = true;
    memoryMapImageWrap.scrollLeft = mapDrag.scrollLeft - dx;
    memoryMapImageWrap.scrollTop = mapDrag.scrollTop - dy;
  });

  function finishMapDrag(event) {
    if (!mapDrag || (event && event.pointerId !== mapDrag.pointerId)) return;
    memoryMapImageWrap.classList.remove("is-dragging");
    if (mapDrag.moved) {
      // Avoid accidental clicks on a location after dragging across the map.
      memoryMapImageWrap.dataset.dragged = "true";
      setTimeout(() => delete memoryMapImageWrap.dataset.dragged, 0);
    }
    mapDrag = null;
  }
  memoryMapImageWrap.addEventListener("pointerup", finishMapDrag);
  memoryMapImageWrap.addEventListener("pointercancel", finishMapDrag);

  function toggleMemoryMap() {
    if (memoryDetailOverlay.classList.contains("open")) {
      memoryDetailOverlay.classList.remove("open");
      memoryDetailOverlay.setAttribute("aria-hidden", "true");
      returnLobbyMapButton.classList.remove("memory-detail-hidden");
    }
    const isOpen = memoryMapOverlay.classList.contains("open");
    if (isOpen) {
      memoryMapOverlay.classList.remove("open");
      memoryMapOverlay.setAttribute("aria-hidden", "true");
    } else {
      memoryMapOverlay.classList.add("open");
      memoryMapOverlay.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => {
        setMapCanvasBaseSize();
        applyMemoryMapZoom(memoryMapZoom);
      });
    }
  }

  window.addEventListener("resize", () => {
    if (!memoryMapOverlay.classList.contains("open")) return;
    const oldLeft = memoryMapImageWrap.scrollLeft;
    const oldTop = memoryMapImageWrap.scrollTop;
    setMapCanvasBaseSize();
    requestAnimationFrame(() => {
      memoryMapImageWrap.scrollLeft = oldLeft;
      memoryMapImageWrap.scrollTop = oldTop;
    });
  });

  window.addEventListener("keydown", event => {
    if (event.key.toLowerCase() !== "m" || event.ctrlKey || event.altKey || event.metaKey) return;
    const target = event.target;
    if (target && (target.matches("input, textarea, select") || target.isContentEditable)) return;
    event.preventDefault();
    toggleMemoryMap();
  });

  // ===== TELA CHEIA =====
  // F11 não pode ser acionado por JavaScript por segurança do navegador.
  // O navegador, porém, permite requestFullscreen() após uma interação do usuário.
  let fullscreenRequested = false;

  async function enterFullscreen() {
    if (fullscreenRequested) return;
    fullscreenRequested = true;

    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      // O site continua funcionando normalmente se o navegador bloquear fullscreen.
    }
  }

  // A primeira interação da pessoa com o presente/site coloca a experiência
  // em fullscreen. Depois disso não tentamos novamente.
  document.addEventListener("pointerdown", enterFullscreen, { once: true });
  document.addEventListener("keydown", enterFullscreen, { once: true });
  document.addEventListener("touchstart", enterFullscreen, { once: true });


  // ===== JOGAR → PARTIDA ENCONTRADA → CARREGAMENTO =====
  const matchFoundScreen = document.getElementById("matchFoundScreen");
  const matchCountdownText = document.getElementById("matchCountdownText");
  const matchCountdownNumber = document.getElementById("matchCountdownNumber");
  const matchLoadingScreen = document.getElementById("matchLoadingScreen");
  const matchProgress = document.getElementById("matchProgress");

  let matchSequenceTimer = null;
  let matchCountdownInterval = null;
  let loadingAnimationFrame = null;

  function stopMatchSequence() {
    if (matchSequenceTimer) {
      clearTimeout(matchSequenceTimer);
      matchSequenceTimer = null;
    }
    if (matchCountdownInterval) {
      clearInterval(matchCountdownInterval);
      matchCountdownInterval = null;
    }
    if (loadingAnimationFrame) {
      cancelAnimationFrame(loadingAnimationFrame);
      loadingAnimationFrame = null;
    }
  }

  function startMatchLoading() {
    matchFoundScreen.classList.remove("open");
    matchFoundScreen.setAttribute("aria-hidden", "true");

    matchLoadingScreen.classList.add("open");
    matchLoadingScreen.setAttribute("aria-hidden", "false");
    matchProgress.style.width = "0%";

    const startedAt = performance.now();
    const duration = 10000;

    function animate(now) {
      const elapsed = Math.min(now - startedAt, duration);
      const percent = elapsed / duration;

      matchProgress.style.width = `${(percent * 100).toFixed(2)}%`;

      if (elapsed < duration) {
        loadingAnimationFrame = requestAnimationFrame(animate);
      } else {
        loadingAnimationFrame = null;
        matchLoadingScreen.classList.remove("open");
        matchLoadingScreen.setAttribute("aria-hidden", "true");

        // Entra na tela de jogo com um clarão suave de luz.
        // A música do lobby continua tocando durante o mapa de memórias.
        keepLobbyMusicPlaying();
        showScreen(gameScreen);
        gameLightFlash.classList.remove("open");
        void gameLightFlash.offsetWidth;
        gameLightFlash.classList.add("open");
        gameLightFlash.setAttribute("aria-hidden", "false");

        if (gameMapTimer) clearTimeout(gameMapTimer);
        gameMapTimer = setTimeout(() => {
          memoryMapOverlay.classList.add("open");
          memoryMapOverlay.setAttribute("aria-hidden", "false");
        }, 20000);
      }
    }

    loadingAnimationFrame = requestAnimationFrame(animate);
  }

  function startMatchSequence() {
    stopMatchSequence();

    // Cada busca sorteia uma duração entre 30 e 60 segundos.
    const searchDuration = Math.floor(Math.random() * 31) + 30;
    let elapsed = 0;

    matchCountdownText.textContent = "PROCURANDO PARTIDA";
    matchCountdownNumber.textContent = `00:${String(elapsed).padStart(2, "0")}`;
    matchFoundScreen.classList.add("open");
    matchFoundScreen.setAttribute("aria-hidden", "false");

    matchCountdownInterval = setInterval(() => {
      elapsed += 1;
      matchCountdownNumber.textContent = `00:${String(elapsed).padStart(2, "0")}`;

      if (elapsed >= searchDuration) {
        clearInterval(matchCountdownInterval);
        matchCountdownInterval = null;

        matchCountdownText.textContent = "PARTIDA ENCONTRADA";
        matchCountdownNumber.textContent = "";

        // Mantém o aviso por um instante antes da tela de carregamento.
        matchSequenceTimer = setTimeout(startMatchLoading, 1800);
      }
    }, 1000);
  }

  [playSoloButton, playCatButton].forEach(button => {
    if (!button) return;

    button.addEventListener("click", startMatchSequence);

    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startMatchSequence();
      }
    });
  });


  // ===== VOLTAR AO LOBBY =====
  function returnToSelectedLobby() {
    if (gameMapTimer) {
      clearTimeout(gameMapTimer);
      gameMapTimer = null;
    }

    memoryMapOverlay.classList.remove("open");
    memoryMapOverlay.setAttribute("aria-hidden", "true");
    memoryDetailOverlay.classList.remove("open");
    memoryDetailOverlay.setAttribute("aria-hidden", "true");
    returnLobbyMapButton.classList.remove("memory-detail-hidden");

    stopMatchSequence();
    if (lobbyLoadingAnimationFrame) {
      cancelAnimationFrame(lobbyLoadingAnimationFrame);
      lobbyLoadingAnimationFrame = null;
    }
    matchFoundScreen.classList.remove("open");
    matchFoundScreen.setAttribute("aria-hidden", "true");
    matchLoadingScreen.classList.remove("open");
    matchLoadingScreen.setAttribute("aria-hidden", "true");

    // Ao sair da partida, também passa por uma das duas telas de carregamento do lobby.
    fadeOverlay.classList.add("fade-in");

    setTimeout(() => {
      fadeOverlay.classList.remove("fade-in");
      transitionToSelectedLobby(true);
    }, 650);
  }

  returnLobbyButton.addEventListener("click", returnToSelectedLobby);
  returnLobbyMapButton.addEventListener("click", returnToSelectedLobby);


  // ===== CÓDIGOS DO HACK =====
  // Cada código abre uma recompensa gráfica diferente.
  const SECRET_CODE_1 = "HOMIISAFADO";
  const SECRET_CODE_2 = "21/10";
  const SECRET_CODE_3 = "VOCEÉINCRIVEL";

  function openHackReward(reward = 1) {
    panelModal.classList.remove("open");
    panelModal.setAttribute("aria-hidden", "true");

    if (reward === 3) {
      secretRewardScreen3.classList.add("open");
      secretRewardScreen3.setAttribute("aria-hidden", "false");
    } else if (reward === 2) {
      secretRewardScreen2.classList.add("open");
      secretRewardScreen2.setAttribute("aria-hidden", "false");
    } else {
      secretRewardScreen.classList.add("open");
      secretRewardScreen.setAttribute("aria-hidden", "false");
    }
  }

  function rescueHackReward(screen) {
    screen.classList.remove("open");
    screen.setAttribute("aria-hidden", "true");

    // RESGATAR: volta exatamente ao lobby escolhido anteriormente.
    showSelectedLobby();
  }

  secretRescueButton.addEventListener("click", () => rescueHackReward(secretRewardScreen));
  secretRescueButton2.addEventListener("click", () => rescueHackReward(secretRewardScreen2));
  secretEquipButton3.addEventListener("click", () => {
    // Equipar é uma ação persistente na sessão; desbloquear não equipa automaticamente.
    hack3Equipped = true;
    sessionStorage.setItem("hack3Equipped", "1");
    updateLobbyArt();
    rescueHackReward(secretRewardScreen3);
  });
  secretRescueButton3.addEventListener("click", () => rescueHackReward(secretRewardScreen3));



  // ===== VESTIÁRIO =====
  const wardrobeItems = {
    skins: [
      {name:"Morgana",src:"assets/wardrobe/skins/morgana.png",type:"skin"},
      {name:"Morgana + Gordão",src:"assets/wardrobe/skins/morgana_gato.png",type:"skin"}
    ],
    loading: [
      {name:"Tela de Carregamento 1",src:"assets/loading/tela_carregamento_1.png",type:"loading"},
      {name:"Tela de Carregamento 2",src:"assets/loading/tela_carregamento_2.png",type:"loading"},
      {name:"Tela de Carregamento 3",src:"assets/loading/tela_carregamento_3.png",type:"loading"}
    ],
    hacks: [
      {name:"Hack Lobby 1",src:"assets/wardrobe/hacks/hack_1.png",type:"hack",id:1},
      {name:"Hack Lobby 2",src:"assets/wardrobe/hacks/hack_2.png",type:"hack",id:2}
    ]
  };
  let wardrobeCategory="skins";
  function openWardrobe(){renderWardrobe();showScreen(wardrobeScreen)}
  function renderWardrobe(){
    wardrobeGrid.innerHTML="";
    wardrobeTabs.forEach(t=>t.classList.toggle("active",t.dataset.wardrobeCategory===wardrobeCategory));
    const items = wardrobeCategory === "hacks"
      ? [...wardrobeItems.hacks, ...(unlockedHacks[3] ? [{name:"Hack Lobby 3",src:"assets/wardrobe/hacks/hack_3.png",type:"hack",id:3}] : [])]
      : wardrobeItems[wardrobeCategory];
    items.forEach(item=>{
      const unlocked=item.type!=="hack"||unlockedHacks[item.id];
      const card=document.createElement("button"); card.type="button"; card.className="wardrobeCard"+(unlocked?"":" locked");
      const img=document.createElement("img"); img.src=item.src; img.alt=item.name; card.appendChild(img);
      if(!unlocked){const q=document.createElement("div");q.className="wardrobeQuestion";q.textContent="?";card.appendChild(q);const tag=document.createElement("div");tag.className="wardrobeLockedTag";tag.textContent="BLOQUEADO";card.appendChild(tag)}
      const name=document.createElement("div");name.className="wardrobeCardName";name.textContent=item.name;card.appendChild(name);
      if(unlocked) card.addEventListener("click",()=>openWardrobeHover(item));
      wardrobeGrid.appendChild(card);
    });
  }
  function openWardrobeHover(item){
    wardrobeHoverTitle.textContent=item.name; wardrobeHoverImage.src=item.src; wardrobeHoverImage.alt=item.name;
    if(item.type==="loading"){wardrobeDownload.href=item.src;wardrobeDownload.download=item.src.split("/").pop();wardrobeDownload.style.display="block"}else wardrobeDownload.style.display="none";
    wardrobeHover.classList.add("open");wardrobeHover.setAttribute("aria-hidden","false");
  }
  function closeWardrobeHover(){wardrobeHover.classList.remove("open");wardrobeHover.setAttribute("aria-hidden","true")}
  wardrobeTabs.forEach(t=>t.addEventListener("click",()=>{wardrobeCategory=t.dataset.wardrobeCategory;renderWardrobe()}));
  wardrobeSoloButton.addEventListener("click",openWardrobe); wardrobeCatButton.addEventListener("click",openWardrobe);
  [wardrobeSoloButton,wardrobeCatButton].forEach(b=>b.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openWardrobe()}}));
  wardrobePlayButton.addEventListener("click",showSelectedLobby);
  wardrobePlayButton.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showSelectedLobby()}});
  closeWardrobe.addEventListener("click",showSelectedLobby);
  wardrobeHoverClose.addEventListener("click",closeWardrobeHover);
  wardrobeHover.addEventListener("click",e=>{if(e.target===wardrobeHover)closeWardrobeHover()});

  // ===== PAINEL / CÓDIGO SECRETO =====
  const secretScreen = document.getElementById("secretScreen");
  const closeSecret = document.getElementById("closeSecret");

  function openPanel() {
    panelModal.classList.add("open");
    panelModal.setAttribute("aria-hidden", "false");

    secretCode.value = "";
    requestAnimationFrame(() => secretCode.focus());
  }

  function closePanelModal() {
    panelModal.classList.remove("open");
    panelModal.setAttribute("aria-hidden", "true");

    // CANCELAR: fecha o modal e mostra o mesmo lobby de onde ele veio.
    showSelectedLobby();
  }

  panelSoloButton.addEventListener("click", openPanel);
  panelCatButton.addEventListener("click", openPanel);

  [panelSoloButton, panelCatButton].forEach(button => {
    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPanel();
      }
    });
  });

  function trySecretCode() {
    const entered = secretCode.value.trim().toUpperCase();

    if (entered === SECRET_CODE_1) {
      unlockedHacks[1] = true; sessionStorage.setItem("hackUnlocked1", "1");
      openHackReward(1);
    } else if (entered === SECRET_CODE_2) {
      unlockedHacks[2] = true; sessionStorage.setItem("hackUnlocked2", "1");
      openHackReward(2);
    } else if (entered === SECRET_CODE_3) {
      unlockedHacks[3] = true; sessionStorage.setItem("hackUnlocked3", "1");
      openHackReward(3);
      // Depois de descobrir o código, o Hack 3 passa a existir no Vestiário.
      if (wardrobeCategory === "hacks") renderWardrobe();
    } else {
      // A arte não ganha mensagem extra: apenas um pequeno feedback visual.
      secretCode.classList.remove("codeError");
      void secretCode.offsetWidth;
      secretCode.classList.add("codeError");
    }
  }

  unlockSecret.addEventListener("click", trySecretCode);
  closePanel.addEventListener("click", closePanelModal);

  secretCode.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      trySecretCode();
    }
  });


  closeSecret.addEventListener("click", () => {
    secretScreen.classList.remove("open");
    secretScreen.setAttribute("aria-hidden", "true");
    showSelectedLobby();
  });

  // ESC no painel volta para o lobby; ESC na mensagem secreta também.
  window.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (secretRewardScreen3.classList.contains("open")) {
      secretRewardScreen3.classList.remove("open");
      secretRewardScreen3.setAttribute("aria-hidden", "true");
      showSelectedLobby();
      return;
    }

    if (secretRewardScreen2.classList.contains("open")) {
      secretRewardScreen2.classList.remove("open");
      secretRewardScreen2.setAttribute("aria-hidden", "true");
      showSelectedLobby();
      return;
    }

    if (secretRewardScreen.classList.contains("open")) {
      secretRewardScreen.classList.remove("open");
      secretRewardScreen.setAttribute("aria-hidden", "true");
      showSelectedLobby();
      return;
    }

    if (secretScreen.classList.contains("open")) {
      secretScreen.classList.remove("open");
      secretScreen.setAttribute("aria-hidden", "true");
      showSelectedLobby();
      return;
    }

    if (panelModal.classList.contains("open")) {
      closePanelModal();
    }
  });


  // Fechamentos.
  closeMemoryMap.addEventListener("click", () => {
    memoryMapOverlay.classList.remove("open");
    memoryMapOverlay.setAttribute("aria-hidden", "true");
    memoryDetailOverlay.classList.remove("open");
    memoryDetailOverlay.setAttribute("aria-hidden", "true");
    returnLobbyMapButton.classList.remove("memory-detail-hidden");
  });

  window.addEventListener("keydown",event=>{
    if(event.key!=="Escape")return;
    if(wardrobeHover.classList.contains("open")){closeWardrobeHover();return}
    if(wardrobeScreen.classList.contains("active")){showSelectedLobby()}
  });
