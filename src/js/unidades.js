/* ==========================================================================
   Interactive Units Map & Search Engine — Grupo +B (Teaser + Modal Mode)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // --- Elementos do DOM ---
  const teaserSection = document.getElementById('store-locator-teaser');
  const modalOverlay = null;
  const closeBtn = null;
  
  // Elementos do Localizador (na própria página principal)
  const modalSearchInput = document.getElementById('teaser-search-input');
  const modalClearSearchBtn = document.getElementById('teaser-clear-search-btn');
  const modalStoresListContainer = document.getElementById('teaser-stores-list-container');
  const modalResultsInfo = document.getElementById('teaser-results-info');
  const modalDetailView = document.getElementById('teaser-panel-detail-view');
  const modalListView = document.getElementById('teaser-panel-list-view');
  const modalDetailCardContent = document.getElementById('teaser-detail-card-content');
  const modalBackToListBtn = document.getElementById('teaser-back-to-list-btn');

  // Lightbox
  const lightbox = document.getElementById('album-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // --- Estado da Aplicação ---
  let mapTeaser = null;
  let mapModal = null;
  let markersModal = {};
  let activeFilters = []; // E.g. ['farma', 'wine']
  let filterOpenNow = false;
  let searchQuery = '';
  let activeUnitId = null;
  let currentAlbumImages = [];
  let currentAlbumIndex = 0;

  // --- Geolocalização e Coordenadas de Bairros ---
  let userCoords = null; // [lat, lng]
  let userLocationLabel = ''; // e.g. "você" ou "Telégrafo"
  let routeLine = null; // Linha da rota desenhada no mapa


  const neighborhoodCoords = {
    'telégrafo': [-1.4390, -48.4900],
    'cremação': [-1.450284, -48.479532],
    'são brás': [-1.452655, -48.468202],
    'tapanã': [-1.353381, -48.468711],
    'umarizal': [-1.4420, -48.4850],
    'nazaré': [-1.4520, -48.4870],
    'batista campos': [-1.4600, -48.4900],
    'pedreira': [-1.4300, -48.4750],
    'marco': [-1.4350, -48.4600]
  };

  // Cálculo de distância por Haversine (km)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Desenhar rota entre origem e destino usando OSRM
  function drawRoute(origin, destination) {
    if (!mapModal) return Promise.resolve(null);
    
    if (routeLine) {
      mapModal.removeLayer(routeLine);
      routeLine = null;
    }
    
    // OSRM expects: longitude,latitude
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;
    
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const geometry = route.geometry;
          const duration = route.duration; // em segundos
          const distance = route.distance; // em metros
          
          const latLngs = geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          routeLine = L.polyline(latLngs, {
            color: '#C89223',
            weight: 4,
            opacity: 0.9,
            dashArray: '8, 8',
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(mapModal);
          
          mapModal.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
          
          return {
            duration: Math.round(duration / 60),
            distance: (distance / 1000).toFixed(1).replace('.', ',')
          };
        }
        return null;
      })
      .catch(err => {
        console.error("OSRM Routing Error:", err);
        return null;
      });
  }

  // --- Função: Verificar se a loja está aberta agora ---
  function isStoreOpenNow(unit) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeDecimal = currentHour + (currentMinute / 60);
    const day = now.getDay(); // 0 = Domingo, 1-6 = Segunda-Sábado
    
    const hoursDetail = unit.hoursDetail;
    if (!hoursDetail) return true; // fallback
    
    let hoursStr = "";
    if (day === 0) {
      hoursStr = hoursDetail.sunday;
    } else {
      hoursStr = hoursDetail.weekday;
    }
    
    const parts = hoursStr.split(" - ");
    if (parts.length === 2) {
      const startParts = parts[0].split(":");
      const endParts = parts[1].split(":");
      
      const startVal = parseInt(startParts[0], 10) + (parseInt(startParts[1] || 0, 10) / 60);
      const endVal = parseInt(endParts[0], 10) + (parseInt(endParts[1] || 0, 10) / 60);
      
      return currentTimeDecimal >= startVal && currentTimeDecimal < endVal;
    }
    return true;
  }

  // --- Ícone Customizado do Mapa ---
  // --- Ícone Customizado do Mapa (Identidade Fiel à footer.png) ---
  function createCustomIcon(unit) {
    return L.divIcon({
      className: `custom-map-pin-container pin-${unit.id}`,
      html: `
        <div class="custom-pin-wrapper">
          <svg class="custom-pin-svg" viewBox="0 0 40 54" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="pin-shadow-${unit.id}" x="-20%" y="-10%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
              </filter>
              <linearGradient id="gold-b-grad-${unit.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FCE09B"/>
                <stop offset="60%" stop-color="#D4A017"/>
                <stop offset="100%" stop-color="#B88308"/>
              </linearGradient>
            </defs>
            <path d="M20 0C8.95 0 0 8.95 0 20c0 14.5 18.2 32.2 19.1 33.1a1.4 1.4 0 0 0 1.8 0C21.8 52.2 40 34.5 40 20 40 8.95 31.05 0 20 0z" fill="#0C0C0D" stroke="#262626" stroke-width="1.2" filter="url(#pin-shadow-${unit.id})" />
            <circle cx="20" cy="20" r="13" fill="#050505" />
            <text x="20" y="25" font-family="'DM Sans', Georgia, sans-serif" font-size="14" font-weight="900" font-style="italic" fill="url(#gold-b-grad-${unit.id})" text-anchor="middle">+B</text>
          </svg>
        </div>
      `,
      iconSize: [40, 54],
      iconAnchor: [20, 54]
    });
  }

  // Helper para renderizar estrelas SVG
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += `
          <svg class="star-icon active" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; display: inline-block; vertical-align: -1px; margin-right: 2px;">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        `;
      } else {
        starsHTML += `
          <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; display: inline-block; vertical-align: -1px; margin-right: 2px;">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        `;
      }
    }
    return starsHTML;
  }

  // --- Inicialização do Mapa Principal (100% Interativo com Scroll Zoom Ativável) ---
  function initModalMapOnce() {
    if (mapModal || !window.units || typeof L === 'undefined') return;
    const container = document.getElementById('teaser-unidades-map');
    if (!container) return;

    try {
      mapModal = L.map('teaser-unidades-map', {
        center: [-1.448, -48.472], 
        zoom: 13.5,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
        dragging: true,
        doubleClickZoom: true,
        touchZoom: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapModal);

      window.units.forEach(unit => {
        const marker = L.marker(unit.coords, {
          icon: createCustomIcon(unit)
        }).addTo(mapModal);

        marker.unitId = unit.id;
        markersModal[unit.id] = marker;

        marker.on('click', () => {
          selectUnit(unit.id, true);
        });
      });

      // --- Lógica do Scroll Overlay (Click-to-Activate Zoom) ---
      const mapWrapper = container.closest('.panel-map-wrapper');
      const scrollOverlay = document.getElementById('map-scroll-overlay');

      if (mapWrapper && scrollOverlay) {
        // Se clicar em qualquer parte do mapa, ativa o zoom por scroll
        mapModal.on('click', () => {
          mapModal.scrollWheelZoom.enable();
          scrollOverlay.classList.add('activated');
        });

        // Ao clicar no overlay, ativa o zoom por scroll
        scrollOverlay.addEventListener('click', function(e) {
          e.stopPropagation();
          mapModal.scrollWheelZoom.enable();
          scrollOverlay.classList.add('activated');
        });
      }

    } catch (e) {
      console.error('Error initializing units map:', e);
    }
  }

  // Pílulas de filtro do localizador (com suporte a multi-seleção de submarcas)
  function syncFilterPills() {
    document.querySelectorAll('#store-locator-teaser .panel-filter-pill').forEach(pill => {
      const filter = pill.getAttribute('data-filter');
      if (filter === 'super' || filter === 'farma') {
        pill.classList.add('active'); // as pílulas base ficam sempre com visual ativo
      } else if (filter === 'open') {
        pill.classList.toggle('active', filterOpenNow);
      } else {
        pill.classList.toggle('active', activeFilters.includes(filter));
      }
    });
  }

  document.querySelectorAll('#store-locator-teaser .panel-filter-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      if (filter === 'super' || filter === 'farma') return; // as pílulas base são desabilitadas / não clicáveis
      
      if (filter === 'open') {
        filterOpenNow = !filterOpenNow;
      } else {
        const idx = activeFilters.indexOf(filter);
        if (idx > -1) {
          activeFilters.splice(idx, 1);
        } else {
          activeFilters.push(filter);
        }
      }
      syncFilterPills();
      applyFiltersAndSearch();
    });
  });

  // --- JavaScript do Localizador (Lógica Principal) ---

  // Gerenciamento de busca
  if (modalSearchInput) {
    modalSearchInput.addEventListener('input', function() {
      searchQuery = this.value.trim();
      const container = this.closest('.search-input-container');
      if (container) {
        if (searchQuery.length > 0) {
          container.classList.add('has-text');
        } else {
          container.classList.remove('has-text');
        }
      }
      if (modalClearSearchBtn) {
        modalClearSearchBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      applyFiltersAndSearch();
    });
  }

  if (modalClearSearchBtn) {
    modalClearSearchBtn.addEventListener('click', function() {
      if (modalSearchInput) {
        modalSearchInput.value = '';
        modalSearchInput.focus();
        const container = modalSearchInput.closest('.search-input-container');
        if (container) {
          container.classList.remove('has-text');
        }
      }
      searchQuery = '';
      this.style.display = 'none';
      applyFiltersAndSearch();
    });
  }

  // Botão GPS de Localização por Proximidade
  const gpsBtn = document.getElementById('teaser-gps-btn');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', function() {
      if (!navigator.geolocation) {
        alert("Geolocalização não é suportada pelo seu navegador.");
        return;
      }

      gpsBtn.classList.add('pulse-active');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userCoords = [position.coords.latitude, position.coords.longitude];
          userLocationLabel = 'você';
          
          const container = gpsBtn.closest('.search-input-container');
          if (container) {
            container.classList.add('gps-active');
          }
          gpsBtn.classList.add('active');
          
          if (modalDetailView) modalDetailView.style.display = 'none';
          if (modalListView) modalListView.style.display = 'block';
          activeUnitId = null;
          if (routeLine && mapModal) {
            mapModal.removeLayer(routeLine);
            routeLine = null;
          }
          
          applyFiltersAndSearch();
          
          if (mapModal) {
            mapModal.setView(userCoords, 14, { animate: true });
            
            // Adicionar ou mover marcador azul de GPS do usuário
            if (window.userMarker) {
              window.userMarker.setLatLng(userCoords);
            } else {
              const gpsIcon = L.divIcon({
                className: 'user-gps-marker',
                html: '<div class="gps-dot"></div><div class="gps-pulse"></div>',
                iconSize: [20, 20]
              });
              window.userMarker = L.marker(userCoords, { icon: gpsIcon }).addTo(mapModal);
            }
          }
          gpsBtn.classList.remove('pulse-active');
        },
        (error) => {
          console.error("Erro ao obter geolocalização:", error);
          alert("Não foi possível obter sua localização. Digite seu bairro para encontrar as unidades mais próximas.");
          gpsBtn.classList.remove('pulse-active');
        }
      );
    });
  }

  // --- Sistema de Autocomplete Assistente Inteligente ---
  const autocompletePanel = document.getElementById('teaser-search-autocomplete');

  const searchSuggestions = [
    // Unidades
    { text: "Matriz Alcindo Cacela", value: "Alcindo Cacela", type: "unidade" },
    { text: "Unidade Tapanã", value: "Tapanã", type: "unidade" },
    { text: "Unidade Plaza (São Brás)", value: "São Brás", type: "unidade" },
    
    // Bairros
    { text: "Lojas no bairro Cremação", value: "Cremação", type: "bairro" },
    { text: "Lojas no bairro São Brás", value: "São Brás", type: "bairro" },
    { text: "Lojas na Rodovia Tapanã", value: "Tapanã", type: "bairro" },
    
    // Submarcas / Marcas
    { text: "Farma +B (Farmácia)", value: "Farma", type: "marca" },
    { text: "The Wine Experience (Adega)", value: "Wine", type: "marca" },
    { text: "Villa Plaza Restaurante", value: "Plaza", type: "marca" },
    { text: "Villa Plaza Park Infantil", value: "Park", type: "marca" },
    
    // Serviços / Comodidades
    { text: "Unidades com farmácia", value: "farma", type: "servico" },
    { text: "Unidades com adega", value: "wine", type: "servico" },
    { text: "Unidades com parquinho / lazer", value: "park", type: "servico" },
    { text: "Estacionamento gratuito / subterrâneo", value: "Estacionamento", type: "servico" },
    { text: "Caixas de autoatendimento", value: "Autoatendimento", type: "servico" },
    { text: "Retirada em loja (Click & Collect)", value: "Retirada", type: "servico" },
    { text: "Buffet / Restaurante self-service", value: "Restaurante", type: "servico" },
    
    // Ações rápidas / Fotos
    { text: "Ver fotos da Alcindo Cacela", action: "photo-alcindo", type: "foto" },
    { text: "Ver fotos da Unidade São Brás", action: "photo-plaza", type: "foto" },
    { text: "Ver fotos da Unidade Tapanã", action: "photo-tapana", type: "foto" },
    
    // Dúvidas comuns
    { text: "Quais unidades abrem no domingo?", value: "domingo", type: "duvida" },
    { text: "Horário de funcionamento das lojas", value: "funcionamento", type: "duvida" }
  ];

  function showAutocomplete(query = '') {
    if (!autocompletePanel) return;

    let filtered = [];
    if (query === '') {
      // Exibe sugestões padrão quando vazio
      filtered = searchSuggestions.slice(0, 6);
    } else {
      const q = query.toLowerCase();
      filtered = searchSuggestions.filter(item => 
        item.text.toLowerCase().includes(q) || 
        item.value?.toLowerCase().includes(q) || 
        item.type.toLowerCase().includes(q)
      ).slice(0, 6);

      // Procurar se bate com nomes de bairros
      Object.keys(neighborhoodCoords).forEach(key => {
        if (key.includes(q) || q.includes(key)) {
          const name = key.charAt(0).toUpperCase() + key.slice(1);
          filtered.unshift({
            text: `Encontrar unidades mais próximas de: ${name}`,
            action: `geo-neighborhood-${key}`,
            type: "bairro"
          });
        }
      });

      // Se o termo de busca não bate com nenhuma chave de bairro fixo
      const matchesFixedNeighborhood = Object.keys(neighborhoodCoords).some(key => key === q || q.includes(key));
      if (!matchesFixedNeighborhood && q.length >= 2) {
        const capitalizedQuery = query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        filtered.unshift({
          text: `Encontrar unidades mais próximas de: ${capitalizedQuery}`,
          action: `nominatim-search-${query}`,
          type: "bairro"
        });
      }
    }

    if (filtered.length === 0) {
      autocompletePanel.style.display = 'none';
      return;
    }

    // Gerar HTML com SVGs modernosoutlined
    autocompletePanel.innerHTML = filtered.map(item => {
      let iconSvg = '';
      if (item.type === 'unidade' || item.type === 'bairro') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      } else if (item.type === 'marca') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      } else if (item.type === 'servico') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
      } else if (item.type === 'foto') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;
      } else if (item.type === 'duvida') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      } else {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
      }

      return `
        <div class="autocomplete-item" data-value="${item.value || ''}" data-action="${item.action || ''}">
          <span class="autocomplete-item-icon">${iconSvg}</span>
          <span class="autocomplete-item-text">${item.text}</span>
          <span class="autocomplete-item-type">${item.type}</span>
        </div>
      `;
    }).join('');

    autocompletePanel.style.display = 'block';

    // Capturar cliques nos itens
    autocompletePanel.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        const val = this.getAttribute('data-value');
        const act = this.getAttribute('data-action');

        if (act) {
          executeAutocompleteAction(act);
        } else {
          modalSearchInput.value = val;
          searchQuery = val;
          if (modalClearSearchBtn) {
            modalClearSearchBtn.style.display = 'flex';
          }
          applyFiltersAndSearch();
        }
        autocompletePanel.style.display = 'none';
      });
    });
  }

  function executeAutocompleteAction(action) {
    if (action.startsWith('geo-neighborhood-')) {
      const neighborhoodKey = action.replace('geo-neighborhood-', '');
      const coords = neighborhoodCoords[neighborhoodKey];
      if (coords) {
        userCoords = coords;
        userLocationLabel = neighborhoodKey.charAt(0).toUpperCase() + neighborhoodKey.slice(1);
        
        const container = modalSearchInput.closest('.search-input-container');
        if (container) {
          container.classList.remove('has-text');
          container.classList.add('gps-active');
        }
        if (gpsBtn) {
          gpsBtn.classList.add('active');
        }

        if (modalDetailView) modalDetailView.style.display = 'none';
        if (modalListView) modalListView.style.display = 'block';
        activeUnitId = null;
        if (routeLine && mapModal) {
          mapModal.removeLayer(routeLine);
          routeLine = null;
        }

        applyFiltersAndSearch();
        if (mapModal) {
          mapModal.setView(coords, 14, { animate: true });
          
          // Adicionar marcador especial no mapa
          if (window.userMarker) {
            window.userMarker.setLatLng(coords);
          } else {
            const gpsIcon = L.divIcon({
              className: 'user-gps-marker',
              html: '<div class="gps-dot"></div><div class="gps-pulse"></div>',
              iconSize: [20, 20]
            });
            window.userMarker = L.marker(coords, { icon: gpsIcon }).addTo(mapModal);
          }
        }
      }
      modalSearchInput.value = '';
      searchQuery = '';
      if (modalClearSearchBtn) modalClearSearchBtn.style.display = 'none';
      return;
    }

    if (action.startsWith('nominatim-search-')) {
      const queryText = action.replace('nominatim-search-', '');
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryText)}, Belém, PA, Brasil&format=json&limit=1`;
      
      if (gpsBtn) gpsBtn.classList.add('pulse-active');
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (gpsBtn) gpsBtn.classList.remove('pulse-active');
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const coords = [lat, lon];
            
            const formattedLabel = queryText.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            
            userCoords = coords;
            userLocationLabel = formattedLabel;
            
            neighborhoodCoords[queryText.toLowerCase()] = coords;
            
            const container = modalSearchInput.closest('.search-input-container');
            if (container) {
              container.classList.remove('has-text');
              container.classList.add('gps-active');
            }
            if (gpsBtn) {
              gpsBtn.classList.add('active');
            }
            
            if (modalDetailView) modalDetailView.style.display = 'none';
            if (modalListView) modalListView.style.display = 'block';
            activeUnitId = null;
            if (routeLine && mapModal) {
              mapModal.removeLayer(routeLine);
              routeLine = null;
            }

            applyFiltersAndSearch();
            
            if (mapModal) {
              mapModal.setView(coords, 14, { animate: true });
              if (window.userMarker) {
                window.userMarker.setLatLng(coords);
              } else {
                const gpsIcon = L.divIcon({
                  className: 'user-gps-marker',
                  html: '<div class="gps-dot"></div><div class="gps-pulse"></div>',
                  iconSize: [20, 20]
                });
                window.userMarker = L.marker(coords, { icon: gpsIcon }).addTo(mapModal);
              }
            }
          } else {
            alert(`Não encontramos o local "${queryText}" em Belém. Tente buscar de outra forma.`);
          }
        })
        .catch(err => {
          if (gpsBtn) gpsBtn.classList.remove('pulse-active');
          console.error("Nominatim API Error:", err);
          alert("Erro ao buscar a localização. Verifique sua conexão e tente novamente.");
        });
      
      modalSearchInput.value = '';
      searchQuery = '';
      if (modalClearSearchBtn) modalClearSearchBtn.style.display = 'none';
      return;
    }

    if (action === 'photo-alcindo') {
      selectUnit('alcindo', true);
    } else if (action === 'photo-plaza') {
      selectUnit('plaza', true);
    } else if (action === 'photo-tapana') {
      selectUnit('tapana', true);
    }
    // Limpar busca e input após selecionar a unidade
    modalSearchInput.value = '';
    searchQuery = '';
    if (modalClearSearchBtn) modalClearSearchBtn.style.display = 'none';
    applyFiltersAndSearch();
  }

  if (modalSearchInput) {
    modalSearchInput.addEventListener('focus', function() {
      showAutocomplete(this.value.trim());
    });

    modalSearchInput.addEventListener('click', function(e) {
      e.stopPropagation();
      showAutocomplete(this.value.trim());
    });

    modalSearchInput.addEventListener('keyup', function() {
      showAutocomplete(this.value.trim());
    });
  }

  // Fechar autocomplete ao clicar fora
  document.addEventListener('click', function(e) {
    if (autocompletePanel && !e.target.closest('.search-input-container')) {
      autocompletePanel.style.display = 'none';
    }
  });

  // Filtro e busca principal (Refatorado com Multi-Seleção e Ordenação por Distância)
  function applyFiltersAndSearch() {
    if (!window.units) return;

    let filtered = window.units.filter(unit => {
      const matchesSearch = searchQuery === '' || 
        unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.aboutText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.services.some(srv => srv.toLowerCase().includes(searchQuery.toLowerCase())) ||
        unit.subbrands.some(brd => brd.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filtro de Aberto agora
      if (filterOpenNow && !isStoreOpenNow(unit)) return false;

      // Filtro de submarcas selecionadas (lógica OR)
      if (activeFilters.length > 0) {
        const matchesBrand = activeFilters.some(filter => unit.subbrands.includes(filter));
        if (!matchesBrand) return false;
      }
      
      return true;
    });

    // Calcular distâncias e ordenar se houver coordenadas de origem (GPS ou Bairro)
    if (userCoords) {
      filtered.forEach(unit => {
        unit.distance = calculateDistance(userCoords[0], userCoords[1], unit.coords[0], unit.coords[1]);
      });
      filtered.sort((a, b) => a.distance - b.distance);
      if (modalStoresListContainer) {
        modalStoresListContainer.classList.add('distance-sorted');
      }
    } else {
      filtered.forEach(unit => {
        delete unit.distance;
      });
      if (modalStoresListContainer) {
        modalStoresListContainer.classList.remove('distance-sorted');
      }
    }

    updateMapMarkersVisibility(filtered);
    renderModalStoresList(filtered);
  }

  function updateMapMarkersVisibility(visibleUnits) {
    if (!mapModal) return;
    const visibleIds = visibleUnits.map(u => u.id);

    Object.keys(markersModal).forEach(id => {
      const marker = markersModal[id];
      const pinElement = marker.getElement();
      const pinWrapper = pinElement ? pinElement.querySelector('.custom-pin-wrapper') : null;

      if (pinWrapper) {
        if (id === activeUnitId) {
          pinWrapper.classList.add('active');
        } else {
          pinWrapper.classList.remove('active');
        }
        
        if (visibleIds.includes(id)) {
          marker.setOpacity(1.0);
          pinWrapper.classList.remove('inactive');
          pinWrapper.style.pointerEvents = 'auto';
        } else {
          marker.setOpacity(0.15);
          pinWrapper.classList.add('inactive');
          pinWrapper.style.pointerEvents = 'none';
        }
      }
    });
  }

  function renderModalStoresList(stores) {
    if (!modalStoresListContainer) return;
    modalStoresListContainer.innerHTML = '';
    
    const count = stores.length;
    if (modalResultsInfo) {
      modalResultsInfo.innerText = `TOTAL DE UNIDADES EM BELÉM DO PARÁ: ${count}`;
    }

    if (stores.length === 0) {
      modalStoresListContainer.innerHTML = `
        <div class="no-results">
          <p>Nenhuma loja corresponde aos seus filtros de busca.</p>
        </div>
      `;
      return;
    }

    // Limita a exibição às 3 principais unidades para manter a altura compacta idêntica ao Print 2
    const displayStores = stores.slice(0, 3);

    displayStores.forEach(store => {
      // Nome simplificado da unidade (ex: UNIDADE ALCINDO CACELA)
      let simpleTitle = `UNIDADE ${store.shortName ? store.shortName.toUpperCase() : store.name.replace(/\+B Supermercado|\(|\)/gi, '').trim().toUpperCase()}`;
      if (store.id === 'alcindo') simpleTitle = 'UNIDADE ALCINDO CACELA';
      if (store.id === 'tapana') simpleTitle = 'UNIDADE TAPANÃ';
      if (store.id === 'plaza') simpleTitle = 'UNIDADE VILLA PLAZA';

      // Pílulas das submarcas presentes na unidade
      const brandLabels = {
        'super': 'SUPERMERCADOS +B',
        'wine': 'THE WINE EXPERIENCE',
        'plaza': 'VILLA PLAZA',
        'park': 'VILLA PLAZA PARK',
        'farma': '+B FARMA'
      };

      const pillsHTML = (store.subbrands || [])
        .filter(sub => brandLabels[sub])
        .map(sub => `<span class="unit-subbrand-pill sub-${sub}">${brandLabels[sub]}</span>`)
        .join('');

      const card = document.createElement('div');
      card.className = `store-list-card ${activeUnitId === store.id ? 'selected' : ''}`;
      card.setAttribute('data-id', store.id);
      
      card.innerHTML = `
        <div class="store-card-thumbnail">
          <img src="${store.images.cover}" alt="${simpleTitle}" loading="lazy">
        </div>
        <div class="store-card-body">
          <div class="store-card-header">
            <h3 class="unit-card-title">${simpleTitle}</h3>
            <span class="store-rating-teaser">★ ${store.rating.toFixed(1).replace('.', ',')}</span>
          </div>
          <p class="store-address-teaser">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${store.address.split('-')[0].trim()}
          </p>
          <div class="store-card-footer">
            <div class="unit-subbrands-pills-row">
              ${pillsHTML}
            </div>
            <a href="${store.googleMapsUrl || `https://maps.google.com/?q=${store.coords[0]},${store.coords[1]}`}" target="_blank" rel="noopener" class="btn-unit-ver-mais" onclick="event.stopPropagation();">VER NO GOOGLE MAPS</a>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        selectUnit(store.id, true);
      });

      modalStoresListContainer.appendChild(card);
    });
  }

  function selectUnit(unitId, zoomTo = false) {
    activeUnitId = unitId;
    const unit = window.units.find(u => u.id === unitId);
    if (!unit) return;

    // Destacar item selecionado na lista
    document.querySelectorAll('#store-locator-teaser .store-list-card').forEach(card => {
      if (card.getAttribute('data-id') === unitId) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // Atualizar mapa (zoom e pin selecionado)
    if (mapModal && markersModal[unitId]) {
      const coords = unit.coords;
      if (zoomTo) {
        mapModal.setView(coords, 14, { animate: true, duration: 1.0 });
      }

      // Estilizar pin selecionado
      Object.keys(markersModal).forEach(id => {
        const pinElement = markersModal[id].getElement();
        if (pinElement) {
          const pinWrapper = pinElement.querySelector('.custom-pin-wrapper');
          if (pinWrapper) {
            if (id === unitId) {
              pinWrapper.classList.add('active');
            } else {
              pinWrapper.classList.remove('active');
            }
          }
        }
      });
    }

    renderStoreDetails(unit);
    
    // Desenhar rota e exibir info de trajeto se houver origem ativa (GPS ou Bairro)
    if (userCoords) {
      const routeInfoEl = document.getElementById('route-navigation-info');
      if (routeInfoEl) {
        routeInfoEl.style.display = 'block';
        routeInfoEl.innerHTML = `
          <div class="route-loading">
            <span class="route-spinner"></span>
            Calculando melhor rota de carro...
          </div>
        `;
      }
      
      drawRoute(userCoords, unit.coords)
        .then(result => {
          if (result && routeInfoEl) {
            routeInfoEl.innerHTML = `
              <div class="route-info-content">
                <svg class="car-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; color: #3b82f6; flex-shrink: 0; margin-top: 2px;">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div class="route-details-text">
                  <strong>Rota recomendada (Carro)</strong>
                  <span>Tempo estimado: <strong>${result.duration} min</strong> (${result.distance} km) de <strong>${userLocationLabel}</strong></span>
                </div>
              </div>
            `;
          } else if (routeInfoEl) {
            routeInfoEl.style.display = 'none';
          }
        });
    } else {
      if (routeLine && mapModal) {
        mapModal.removeLayer(routeLine);
        routeLine = null;
      }
    }
    
    if (modalListView) modalListView.style.display = 'none';
    if (modalDetailView) modalDetailView.style.display = 'block';

    if (modalListView) modalListView.scrollTop = 0;
    if (modalDetailView) modalDetailView.scrollTop = 0;
  }

  // Voltar para a lista no modal
  if (modalBackToListBtn) {
    modalBackToListBtn.addEventListener('click', () => {
      if (modalDetailView) modalDetailView.style.display = 'none';
      if (modalListView) modalListView.style.display = 'block';
      activeUnitId = null;
      
      Object.keys(markersModal).forEach(id => {
        const pinElement = markersModal[id].getElement();
        if (pinElement) {
          const pinWrapper = pinElement.querySelector('.custom-pin-wrapper');
          if (pinWrapper) {
            pinWrapper.classList.remove('active');
          }
        }
      });

      // Limpar linha de rota ao voltar para a lista
      if (routeLine && mapModal) {
        mapModal.removeLayer(routeLine);
        routeLine = null;
      }

      if (mapModal) {
        mapModal.setView([-1.450, -48.472], 12, { animate: true });
      }
    });
  }

  // Renderizar Detalhes da Loja no Modal
  function renderStoreDetails(unit) {
    const isOpen = isStoreOpenNow(unit);
    const statusClass = isOpen ? 'open' : 'closed';
    const statusText = isOpen ? 'Aberto agora' : 'Fechado no momento';

    const brandBadges = unit.subbrands.map(sub => {
      let label = sub;
      let imgUrl = "";
      if (sub === 'super') { label = 'Supermercados'; imgUrl = "./assets/Icones Submarcas/icon-b-supermercadoo.png"; }
      if (sub === 'farma') { label = 'Farma +B'; imgUrl = "./assets/Icones Submarcas/icon-b-farmaa.png"; }
      if (sub === 'wine') { label = 'Wine Experience'; imgUrl = "./assets/Icones Submarcas/icon-the-winee.png"; }
      if (sub === 'plaza') { label = 'Villa Plaza'; imgUrl = "./assets/Icones Submarcas/icon-vila-plaza.png"; }
      if (sub === 'park') { label = 'Plaza Park'; imgUrl = "./assets/Icones Submarcas/icon-vila-plaza.png"; }
      if (sub === 'atacarejo') { label = 'Atacarejo'; imgUrl = "./assets/Icones Submarcas/icon-b-supermercadoo.png"; }
      
      const imgTag = imgUrl ? `<img src="${imgUrl}" alt="${label}" class="brand-badge-icon">` : '';
      return `<div class="detail-brand-badge">${imgTag}<span>${label}</span></div>`;
    }).join('');

    const servicesHTML = unit.services.map(srv => {
      return `
        <li class="service-list-item">
          <span class="service-item-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          ${srv}
        </li>`;
    }).join('');

    const reviewsHTML = unit.googleReviews.map(rev => {
      const stars = renderStars(rev.rating);
      return `
        <div class="google-review-card">
          <div class="review-card-header">
            <div class="review-author-info">
              <span class="review-author-avatar">${rev.author.charAt(0)}</span>
              <strong>${rev.author}</strong>
            </div>
            <span class="review-date">${rev.date}</span>
          </div>
          <div class="review-rating-row">
            <span class="review-stars-visual">${stars}</span>
          </div>
          <p class="review-text">"${rev.text}"</p>
        </div>
      `;
    }).join('');

    currentAlbumImages = unit.images.album;
    const albumHTML = unit.images.album.map((img, index) => {
      return `
        <div class="album-thumb-container" data-index="${index}">
          <img src="${img.url}" alt="${img.title}" loading="lazy" class="album-thumb-img">
          <div class="thumb-hover-overlay">
            <span class="thumb-zoom-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; stroke: #ffffff;">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>
      `;
    }).join('');

    modalDetailCardContent.innerHTML = `
      <div class="detail-header-cover" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.95) 100%), url('${unit.images.cover}');">
        <div class="detail-cover-text">
          <span class="detail-kicker">Loja Oficial</span>
          <h2>${unit.name}</h2>
          <div class="detail-rating-row">
            <span class="rating-stars-visual">${renderStars(unit.rating)}</span>
            <span class="rating-value">${unit.rating.toString().replace('.', ',')}</span>
            <span class="reviews-count">(${unit.reviewsCount} avaliações no Google)</span>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <!-- Status e Horário Rápido -->
        <div class="detail-status-stripe">
          <span class="status-indicator-pill ${statusClass}">
            <span class="indicator-dot"></span>
            ${statusText}
          </span>
          <span class="detail-today-hours">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; margin-right: 4px; opacity: 0.7;">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${unit.hours}
          </span>
        </div>

        <!-- Botões de Ação Rápida -->
        <div class="detail-actions-grid">
          <a href="${unit.googleMapsUrl}" target="_blank" class="action-btn-link routes-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                <line x1="9" y1="3" x2="9" y2="18"></line>
                <line x1="15" y1="6" x2="15" y2="21"></line>
              </svg>
            </span>
            <span>Como Chegar</span>
          </a>
          <a href="tel:${unit.phone.replace(/[^0-9]/g, '')}" class="action-btn-link call-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
            <span>Ligar</span>
          </a>
          <button type="button" class="action-btn-link share-btn" id="btn-share-store">
            <span class="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </span>
            <span>Compartilhar</span>
          </button>
        </div>

        <!-- Rota de Navegação -->
        <div id="route-navigation-info" class="route-navigation-info" style="display: none;"></div>

        <!-- Endereço e Contatos -->
        <div class="detail-info-block">
          <div class="info-row">
            <span class="info-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <div class="info-row-text">
              <strong>Endereço</strong>
              <p>${unit.address}</p>
            </div>
          </div>
          <div class="info-row">
            <span class="info-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
            <div class="info-row-text">
              <strong>Telefone</strong>
              <p>${unit.phone}</p>
            </div>
          </div>
          <div class="info-row">
            <span class="info-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <div class="info-row-text">
              <strong>E-mail de Contato</strong>
              <p>${unit.email}</p>
            </div>
          </div>
        </div>

        <!-- Sistema de Abas Detalhadas -->
        <div class="detail-tabs-container">
          <div class="tabs-header">
            <button type="button" class="tab-header-btn active" data-tab="about">+B Informações</button>
            <button type="button" class="tab-header-btn" data-tab="google">Google Info</button>
            <button type="button" class="tab-header-btn" data-tab="album">Álbum de Fotos</button>
          </div>
          
          <div class="tabs-content">
            <!-- Aba 1: Sobre +B -->
            <div class="tab-pane-content active" id="modal-tab-pane-about">
              <p class="store-description-brand">${unit.aboutText}</p>
              
              <h4 class="section-title-inside">Marcas Presentes na Loja</h4>
              <div class="detail-brands-container">
                ${brandBadges}
              </div>

              <h4 class="section-title-inside">Serviços Disponíveis</h4>
              <ul class="store-services-list">
                ${servicesHTML}
              </ul>
            </div>

            <!-- Aba 2: Google Info -->
            <div class="tab-pane-content" id="modal-tab-pane-google">
              <div class="google-score-card">
                <div class="score-main">
                  <span class="score-number">${unit.rating.toString().replace('.', ',')}</span>
                  <div class="score-stars-col">
                    <span class="score-stars-visual">${renderStars(unit.rating)}</span>
                    <span class="score-reviews-label">${unit.reviewsCount} avaliações</span>
                  </div>
                </div>
                <div class="score-google-verified">
                  <span class="google-verified-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; margin-right: 4px;">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Dados Integrados com Google Maps
                  </span>
                </div>
              </div>

              <h4 class="section-title-inside">Avaliações Recentes</h4>
              <div class="google-reviews-list">
                ${reviewsHTML}
              </div>
            </div>

            <!-- Aba 3: Álbum de Fotos -->
            <div class="tab-pane-content" id="modal-tab-pane-album">
              <p class="album-intro-text">Fotos oficiais e bastidores da equipe do Grupo Mais Barato nesta unidade.</p>
              
              <button type="button" class="btn-view-full-album" id="btn-view-full-album">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px; display: inline-block; vertical-align: -2px; margin-right: 6px;">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Abrir Álbum em Tela Cheia
              </button>

              <div class="album-grid">
                ${albumHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Compartilhar
    const shareBtn = document.getElementById('btn-share-store');
    if (shareBtn) {
      shareBtn.addEventListener('click', function() {
        const textToShare = `${unit.name}\nEndereço: ${unit.address}\nTelefone: ${unit.phone}\nHorário: ${unit.hours}`;
        
        if (navigator.share) {
          navigator.share({
            title: unit.name,
            text: textToShare,
            url: window.location.href
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(textToShare).then(() => {
            const labelSpan = shareBtn.querySelector('span:not(.btn-icon)');
            const originalText = labelSpan.innerText;
            labelSpan.innerText = "Copiado!";
            setTimeout(() => {
              labelSpan.innerText = originalText;
            }, 2000);
          }).catch(err => {
            console.error('Falha ao copiar:', err);
          });
        }
      });
    }

    // Gerenciador de Abas Interno no Modal
    const tabButtons = modalDetailCardContent.querySelectorAll('.tab-header-btn');
    const tabPanes = modalDetailCardContent.querySelectorAll('.tab-pane-content');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        this.classList.add('active');
        modalDetailCardContent.querySelector(`#modal-tab-pane-${targetTab}`).classList.add('active');
      });
    });

    // Abrir álbum inteiro em tela cheia (primeira foto)
    const btnFullAlbum = document.getElementById('btn-view-full-album');
    if (btnFullAlbum) {
      btnFullAlbum.addEventListener('click', () => {
        openLightbox(0);
      });
    }

    // Clique em thumbs individuais
    modalDetailCardContent.querySelectorAll('.album-thumb-container').forEach(thumb => {
      thumb.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'), 10);
        openLightbox(index);
      });
    });
  }

  // --- Lightbox ---
  function openLightbox(index) {
    if (currentAlbumImages.length === 0) return;
    
    currentAlbumIndex = index;
    updateLightboxImage();
    
    if (lightbox) lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');

    document.addEventListener('keydown', handleLightboxKeydown);
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
    if (modalOverlay && modalOverlay.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', handleLightboxKeydown);
  }

  function updateLightboxImage() {
    if (!lightboxImg || !lightboxCaption) return;
    const item = currentAlbumImages[currentAlbumIndex];
    lightboxImg.src = item.url;
    lightboxCaption.innerText = `${item.title} — ${currentAlbumIndex + 1} de ${currentAlbumImages.length}`;
  }

  function nextLightboxImage() {
    currentAlbumIndex = (currentAlbumIndex + 1) % currentAlbumImages.length;
    updateLightboxImage();
  }

  function prevLightboxImage() {
    currentAlbumIndex = (currentAlbumIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
    updateLightboxImage();
  }

  function handleLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // --- Cliques nos atalhos das submarcas no resto do site (filtra localizador e rola até a seção) ---
  document.querySelectorAll('.brand-filter-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const brand = this.getAttribute('data-brand');
      
      // Aplicar o filtro
      if (brand === 'open') {
        filterOpenNow = true;
        activeFilters = [];
      } else {
        filterOpenNow = false;
        activeFilters = [brand];
      }
      syncFilterPills();
      applyFiltersAndSearch();
      
      // Rolar suavemente até a seção do localizador
      if (teaserSection) {
        teaserSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Função global para selecionar marca e rolar até o localizador
  window.selectBrandLocator = function(brandId) {
    if (!brandId) return;
    
    // Ajustar filtros
    if (brandId === 'open') {
      filterOpenNow = true;
      activeFilters = [];
    } else if (brandId === 'super' || brandId === 'farma') {
      filterOpenNow = false;
      activeFilters = []; // super/farma são as marcas base, limpa sub-filtros
    } else {
      filterOpenNow = false;
      activeFilters = [brandId];
    }
    
    // Resetar para a visualização de lista caso a de detalhes esteja ativa
    if (modalDetailView) modalDetailView.style.display = 'none';
    if (modalListView) modalListView.style.display = 'block';
    activeUnitId = null;
    
    // Limpar rota ativa do mapa se houver
    if (routeLine && mapModal) {
      mapModal.removeLayer(routeLine);
      routeLine = null;
    }
    
    // Resetar visualização do mapa para Belém geral
    if (mapModal) {
      mapModal.setView([-1.450, -48.472], 12, { animate: true });
    }
    
    syncFilterPills();
    applyFiltersAndSearch();
    
    // Rolar suavemente até o localizador
    if (teaserSection) {
      teaserSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Clique no atalho "Nossas Unidades" no menu (rola até o localizador e foca a busca) ---
  document.querySelectorAll('#menu-link-unidades').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      if (teaserSection) {
        teaserSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (modalSearchInput) modalSearchInput.focus();
        }, 800);
      }
    });
  });

  // --- Clique em "Ver localização" nos cards de marcas ---
  document.querySelectorAll('.open-map-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const brandCard = this.closest('.brand-detail-card');
      if (brandCard) {
        const brand = brandCard.getAttribute('data-brand');
        if (brand && typeof window.selectBrandLocator === 'function') {
          window.selectBrandLocator(brand);
          return;
        }
      }
      if (teaserSection) {
        teaserSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Helper to dynamically load Leaflet CSS and JS ---
  function loadLeafletAssets() {
    return new Promise((resolve, reject) => {
      if (typeof L !== 'undefined') {
        resolve();
        return;
      }

      // Load CSS
      const cssId = 'leaflet-css';
      if (!document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Leaflet.js'));
      document.body.appendChild(script);
    });
  }

  // --- Auto-init para inicializar o mapa e a lista na página principal ---
  if (teaserSection && document.getElementById('teaser-unidades-map')) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadLeafletAssets()
            .then(() => {
              initModalMapOnce();
              applyFiltersAndSearch();
              if (mapModal) mapModal.invalidateSize();
            })
            .catch(err => console.error(err));
          mapObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });

    mapObserver.observe(teaserSection);

    // Fallback se já estiver visível
    const rect = teaserSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => {
        loadLeafletAssets()
          .then(() => {
            initModalMapOnce();
            applyFiltersAndSearch();
            if (mapModal) mapModal.invalidateSize();
          })
          .catch(err => console.error(err));
      }, 300);
    }
  }
});
