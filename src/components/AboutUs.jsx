import { CONFIG } from "../data/config";

export default function AboutUs() {
  return (
    <div className="about-page">

      {/* ── Hero Banner ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-badge">🍕 Desde 2018</div>
          <h1 className="about-hero-title">
            Feito com <span className="about-hero-accent">paixão</span>,<br />
            servido com <span className="about-hero-accent">sabor</span>
          </h1>
          <p className="about-hero-sub">
            O {CONFIG.storeName} traz o melhor da culinária artesanal direto para sua mesa.
            Pizzas, crepes e muito mais — preparados com ingredientes frescos todo dia.
          </p>
          <div className="about-stats-row">
            <div className="about-stat">
              <span className="about-stat-num">+500</span>
              <span className="about-stat-label">Pedidos / mês</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-num">4.9★</span>
              <span className="about-stat-label">Avaliação média</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-num">+30</span>
              <span className="about-stat-label">Itens no cardápio</span>
            </div>
          </div>

          {/* ── Trophy Card ── */}
          <div className="trophy-cards">
            <div className="trophy-outlinePage">
              <svg className="trophy-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                <path d="M469.333333 682.666667h85.333334v128h-85.333334zM435.2 810.666667h153.6c4.693333 0 8.533333 3.84 8.533333 8.533333v34.133333h-170.666666v-34.133333c0-4.693333 3.84-8.533333 8.533333-8.533333z" fill="#ea9518"/>
                <path d="M384 853.333333h256a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667H341.333333v-42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#6e4a32"/>
                <path d="M213.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256H213.333333zM170.666667 213.333333h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333zM725.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256h-85.333334z m-42.666666-42.666667h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333z" fill="#f4ea2a"/>
                <path d="M298.666667 85.333333h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v341.333333a256 256 0 1 1-512 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#f2be45"/>
                <path d="M512 469.333333l-100.309333 52.736 19.157333-111.701333-81.152-79.104 112.128-16.298667L512 213.333333l50.176 101.632 112.128 16.298667-81.152 79.104 19.157333 111.701333z" fill="#FFF2A0"/>
              </svg>
              <p className="trophy-rank-num">1<span className="trophy-rank-word">°</span></p>
              <div className="trophy-splitLine" />
              <svg className="trophy-avatar" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                <path d="M512 0C228.693 0 0 228.693 0 512s228.693 512 512 512 512-228.693 512-512S795.307 0 512 0z m0 69.973c244.053 0 442.027 197.973 442.027 442.027 0 87.04-25.6 168.96-69.973 237.227-73.387-78.507-170.667-133.12-281.6-151.893 69.973-34.133 119.467-105.813 119.467-187.733 0-116.053-93.867-209.92-209.92-209.92s-209.92 93.867-209.92 209.92c0 83.627 47.787 155.307 119.467 187.733-110.933 20.48-208.213 75.093-281.6 153.6-44.373-68.267-69.973-150.187-69.973-238.933 0-244.053 197.973-442.027 442.027-442.027z" fill="#8a8a8a"/>
              </svg>
              <p className="trophy-username">Divino Crepe</p>
            </div>
            <div className="trophy-detailPage">
              <svg className="trophy-medals" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
                <path d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z" fill="#ea9518"/>
                <path d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z" fill="#f2be45"/>
                <path d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z" fill="#ea9518"/>
              </svg>
              <div className="trophy-gradesBox">
                <p className="trophy-gradesLabel">NOTA</p>
                <p className="trophy-gradesNum">4.9 ★</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nossa História ── */}
      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-text">
            <span className="about-section-tag">Nossa História</span>
            <h2 className="about-section-title">
              Uma história de <br />sabor e dedicação
            </h2>
            <p className="about-story-p">
              O Divino Crepe nasceu da paixão por oferecer uma experiência gastronômica
              única em Natal. Começamos pequenos, com receitas artesanais que encantaram
              os primeiros clientes.
            </p>
            <p className="about-story-p">
              Hoje, somos referência em pizzas artesanais, crepes suíços e kalzones na
              região. Cada prato é preparado com ingredientes selecionados, garantindo
              frescor e qualidade a cada pedido.
            </p>
            <a
              href={`https://wa.me/${CONFIG.phoneE164}`}
              target="_blank"
              rel="noreferrer"
              className="about-wa-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale Conosco
            </a>
          </div>
          <div className="about-story-img">
            <img src="/images/pizzas/calabresa.webp" alt="Pizza Divino Crepe" />
            <div className="about-story-badge">
              <span>🏆</span>
              <div>
                <strong>Qualidade</strong>
                <span>Garantida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diferenciais ── */}
      <section className="about-features">
        <div className="about-features-inner">
          <span className="about-section-tag center-tag">Nossos diferenciais</span>
          <h2 className="about-section-title center">Por que escolher o Divino Crepe?</h2>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">🌿</div>
              <h3>Ingredientes Frescos</h3>
              <p>Selecionamos diariamente os melhores ingredientes para garantir sabor e qualidade em cada prato.</p>
            </div>
            <div className="about-feature-card">
              <div className="truck-anim-wrap">
                <div className="truckWrapper">
                  <div className="truckBody">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
                      <path strokeWidth="3" stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"/>
                      <path strokeWidth="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"/>
                      <path strokeWidth="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"/>
                      <rect strokeWidth="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"/>
                      <rect strokeWidth="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193"/>
                      <rect strokeWidth="3" stroke="#282828" fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5"/>
                      <rect strokeWidth="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"/>
                    </svg>
                  </div>
                  <div className="truckTires">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                      <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"/>
                      <circle fill="#DFDFDF" r="7" cy="15" cx="15"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                      <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"/>
                      <circle fill="#DFDFDF" r="7" cy="15" cx="15"/>
                    </svg>
                  </div>
                  <div className="road"></div>
                  <svg viewBox="0 0 453.459 453.459" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="lampPost">
                    <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"/>
                  </svg>
                </div>
              </div>
              <h3>Entrega Rápida</h3>
              <p>Preparamos e entregamos seu pedido com agilidade, para você aproveitar enquanto está quentinho.</p>
            </div>
            <div className="about-feature-card">
              <div className="pizza-anim-wrap">
                <svg width="120" height="113" viewBox="0 0 168 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="pizza">
                    <rect width="168" height="158" fill="none"/>
                    <g id="slice6">
                      <g id="slice"><mask id="path-1-inside-1_7_2" fill="white"><path d="M110 34.8997C118.513 39.4198 125.582 45.921 130.497 53.75C135.412 61.579 138 70.4598 138 79.5L82 79.5L110 34.8997Z"/></mask><path d="M110 34.8997C118.513 39.4198 125.582 45.921 130.497 53.75C135.412 61.579 138 70.4598 138 79.5L82 79.5L110 34.8997Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-1-inside-1_7_2)"/></g>
                      <g id="pepperoni"><circle cx="114" cy="63" r="6" fill="#F12424"/></g>
                      <g id="mushroom"><path d="M96.3127 75.3748C93.8388 74.3499 93.5395 72.1249 96.4349 66.9246C100.861 64.107 105.48 66.5248 103.603 67.4062C101.726 68.2876 101.517 69.215 101.78 69.3984C101.78 69.3984 105.126 71.2856 104.991 72.8193C104.856 74.353 103.753 74.1725 103.409 74.5483C103.066 74.9242 99.9579 71.3905 99.9579 71.3905C96.0194 74.1256 98.7867 76.3997 96.3127 75.3748Z" fill="#E3DDDD"/><path d="M99.9579 71.3905C96.0194 74.1256 98.7867 76.3997 96.3127 75.3748C93.8388 74.3499 93.5395 72.1249 96.4349 66.9246C100.861 64.107 105.48 66.5248 103.603 67.4062C101.726 68.2876 101.517 69.215 101.78 69.3984M99.9579 71.3905C99.9579 71.3905 103.066 74.9242 103.409 74.5483C103.753 74.1725 104.856 74.353 104.991 72.8193C105.126 71.2856 101.78 69.3984 101.78 69.3984M99.9579 71.3905L101.78 69.3984" stroke="black"/></g>
                      <path id="onion" d="M129.841 65.2587C127.54 64.2211 127.021 63.5697 127.016 62.3249C127.666 61.9214 128.094 61.8629 129.071 62.3249C130.14 62.8474 130.783 63.5952 131.961 65.2587C131.313 66.9451 130.895 67.8704 129.392 69.2403C131.161 70.4193 131.537 72.3751 131.961 72.3837C132.384 72.3923 129.231 76.9243 129.071 77.9719C127.662 78.0881 127.229 77.8597 127.016 76.994C126.863 74.9998 127.829 74.044 129.841 72.3837C128.109 71.4403 127.329 70.8249 127.016 69.2403C126.968 67.7728 127.329 66.9206 129.841 65.2587Z" fill="#FFFBFB" stroke="black"/>
                      <path id="pepper" d="M121.34 55.4341C123.716 54.3509 124.645 54.4077 125.824 55.2995C125.811 56.107 125.607 56.4894 124.578 56.9337C123.436 57.4079 122.34 57.3806 120.055 57.1194C118.855 55.39 118.235 54.3915 117.853 52.2096C115.667 52.7671 113.592 51.6583 113.327 51.9889C113.062 52.3195 110.695 46.5489 109.803 45.6669C110.547 44.4628 111.025 44.2833 111.972 44.7368C113.948 46.0515 114.265 47.5081 114.612 50.3036C116.554 49.6053 117.608 49.4283 119.294 50.32C120.708 51.3389 121.295 52.2392 121.34 55.4341Z" fill="#1EAA07" stroke="#FDDBA9"/>
                    </g>
                    <g id="slice5">
                      <g id="slice_2"><mask id="path-7-inside-2_7_2" fill="white"><path d="M54 34.8997C62.5131 30.3796 72.1699 28 82 28C91.8301 28 101.487 30.3796 110 34.8997L82 79.5L54 34.8997Z"/></mask><path d="M54 34.8997C62.5131 30.3796 72.1699 28 82 28C91.8301 28 101.487 30.3796 110 34.8997L82 79.5L54 34.8997Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-7-inside-2_7_2)"/></g>
                      <g id="pepperoni_2"><circle cx="82" cy="56" r="6" fill="#F12424"/></g>
                      <path id="onion_2" d="M70.8415 37.2587C68.5397 36.2211 68.0212 35.5697 68.0156 34.3249C68.6658 33.9214 69.0936 33.8629 70.0708 34.3249C71.1402 34.8474 71.783 35.5952 72.9609 37.2587C72.3132 38.9451 71.8954 39.8704 70.3919 41.2403C72.1607 42.4193 72.5374 44.3751 72.9609 44.3837C73.3844 44.3923 70.2313 48.9243 70.0708 49.9719C68.6618 50.0881 68.2293 49.8597 68.0156 48.994C67.8631 46.9998 68.8294 46.044 70.8415 44.3837C69.109 43.4403 68.3292 42.8249 68.0156 41.2403C67.9682 39.7728 68.3287 38.9206 70.8415 37.2587Z" fill="#FFFBFB" stroke="black"/>
                    </g>
                    <g id="slice1">
                      <g id="slice_3"><mask id="path-13-inside-3_7_2" fill="white"><path d="M138 79.5C138 88.5401 135.412 97.421 130.497 105.25C125.582 113.079 118.513 119.58 110 124.1L82 79.5H138Z"/></mask><path d="M138 79.5C138 88.5401 135.412 97.421 130.497 105.25C125.582 113.079 118.513 119.58 110 124.1L82 79.5H138Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-13-inside-3_7_2)"/></g>
                      <g id="pepperoni_3"><circle cx="119" cy="99" r="6" fill="#F12424"/></g>
                    </g>
                    <g id="slice2">
                      <g id="slice_4"><mask id="path-17-inside-4_7_2" fill="white"><path d="M110 124.1C101.487 128.62 91.8301 131 82 131C72.1699 131 62.5131 128.62 54 124.1L82 79.5L110 124.1Z"/></mask><path d="M110 124.1C101.487 128.62 91.8301 131 82 131C72.1699 131 62.5131 128.62 54 124.1L82 79.5L110 124.1Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-17-inside-4_7_2)"/></g>
                      <g id="pepperoni_4"><circle cx="78" cy="103" r="6" fill="#F12424"/></g>
                    </g>
                    <g id="slice4">
                      <g id="slice_5"><mask id="path-23-inside-5_7_2" fill="white"><path d="M26 79.5C26 70.4599 28.5876 61.579 33.5026 53.75C38.4176 45.921 45.4869 39.4198 54 34.8997L82 79.5L26 79.5Z"/></mask><path d="M26 79.5C26 70.4599 28.5876 61.579 33.5026 53.75C38.4176 45.921 45.4869 39.4198 54 34.8997L82 79.5L26 79.5Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-23-inside-5_7_2)"/></g>
                      <g id="pepperoni_5"><circle cx="64" cy="70" r="6" fill="#F12424"/></g>
                    </g>
                    <g id="slice3">
                      <g id="slice_6"><mask id="path-29-inside-6_7_2" fill="white"><path d="M54 124.1C45.4869 119.58 38.4176 113.079 33.5026 105.25C28.5876 97.421 26 88.5401 26 79.5L82 79.5L54 124.1Z"/></mask><path d="M54 124.1C45.4869 119.58 38.4176 113.079 33.5026 105.25C28.5876 97.421 26 88.5401 26 79.5L82 79.5L54 124.1Z" fill="#FDDBA9" stroke="#EE9758" strokeWidth="2" mask="url(#path-29-inside-6_7_2)"/></g>
                      <g id="pepperoni_6"><circle cx="42" cy="99" r="6" fill="#F12424"/></g>
                    </g>
                  </g>
                </svg>
              </div>
              <h3>Variedade Única</h3>
              <p>Do clássico ao premium — pizzas, crepes, kalzones, açaí e muito mais para todos os gostos.</p>
            </div>
            <div className="pj-card">
              <div className="pj-content">
                <img src="/images/pizzas/calabresa.webp" alt="Pizza Artesanal" className="pj-img" />
                <div className="pj-description">
                  <p className="pj-title"><strong>Pizzas Artesanais</strong></p>
                  <p className="pj-info">Seg–Sex · Promoção</p>
                  <p className="pj-price">R$ 24,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mapa + Contato ── */}
      <section className="about-location">
        <div className="about-location-inner">
          <div className="about-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.1831791016393!2d-35.20210093073774!3d-5.829779784467551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ffc5201293fd%3A0xf0864e914e338cd8!2sDivino%20Crepe!5e0!3m2!1spt-BR!2sbr!4v1774114321234!5m2!1spt-BR!2sbr"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Divino Crepe"
            />
          </div>
          <div className="about-contact-panel">
            <span className="about-section-tag">Onde estamos</span>
            <h2 className="about-section-title">Venha nos visitar</h2>
            <div className="about-contact-list">
              <div className="about-contact-item">
                <div className="about-contact-icon">📍</div>
                <div className="about-contact-text">
                  <strong>Endereço</strong>
                  <span>{CONFIG.address}, Natal — RN</span>
                </div>
              </div>
              <div className="about-contact-item">
                <div className="about-contact-icon">⏰</div>
                <div className="about-contact-text">
                  <strong>Horário</strong>
                  <span>{CONFIG.hours} — todos os dias</span>
                </div>
              </div>
              <div className="about-contact-item">
                <div className="about-contact-icon">📱</div>
                <div className="about-contact-text">
                  <strong>WhatsApp</strong>
                  <a href={`https://wa.me/${CONFIG.phoneE164}`} target="_blank" rel="noreferrer" className="about-contact-link">
                    Clique para chamar
                  </a>
                </div>
              </div>
              <div className="about-contact-item">
                <div className="about-contact-icon">📸</div>
                <div className="about-contact-text">
                  <strong>Instagram</strong>
                  <a href={`https://instagram.com/${CONFIG.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" className="about-contact-link">
                    {CONFIG.instagram}
                  </a>
                </div>
              </div>
            </div>
            <div className="about-promo-banner">
              <span>🎉</span>
              <p>{CONFIG.promoNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>Pronto para pedir?</h2>
          <p>Explore nosso cardápio completo e monte o seu pedido agora mesmo.</p>
          <a
            href="#cardapio"
            className="about-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("navigate-menu"));
            }}
          >
            Ver Cardápio Completo 🍕
          </a>
        </div>
      </section>

    </div>
  );
}
