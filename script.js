class NavigationBar extends HTMLElement {
  connectedCallback() {
    const currentURL = window.location.href;
    const parts = currentURL.split('?');
    const pathSegments = parts[0].split('/').filter(Boolean);
    const breadcrumbItems = [];

    if (pathSegments.length > 2) {
      breadcrumbItems.push('<a aria-label="Home Landing Page" role="link" href="../">Home</a>');
    } else {
      breadcrumbItems.push('<a aria-label="Home Landing Page" role="link" href="./">Home</a>');
    }
    for (let i = 2; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      //    const segmentPath = pathSegments.slice(0, i + 1).join('/');
      breadcrumbItems.push(` > ${segment}`);
    }
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.style.display = 'inline-block';
    breadcrumbContainer.innerHTML = breadcrumbItems.join('');
    this.innerHTML = `
      <header>
        <div class="w-100 d-flex" style="justify-content: space-between; align-items: center;">
          <span style="display: inline-block; width: 80%; font-weight: bold; font-size: var(--size-3);">
            <div style="display: block; font-size: var(--size-5);">DOOR.AHOXY.COM</div> ${breadcrumbContainer.outerHTML} </span>
          <span style="display: inline-block;>
            <button class="theme-toggle" id="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <mask id="moon">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <circle cx="40" cy="8" r="11" fill="black" />
                </mask>
                <circle id="sun" cx="12" cy="12" r="11" mask="url(#moon)"/>
                <g id="sun-beams">
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
              </svg>
            </button>
          </span>
        </div>
      </header>
    `;
  }
}

customElements.define('navigation-bar', NavigationBar);

class FooterBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div class="text-center p-1 mt-3" id="donation">
        <a href='https://ko-fi.com/O4O1M87EI' target='_blank'><img id='donor' height='40' style='border:0px;height:40px;vertical-align: middle; margin-right: 16px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
        <a class="btn btn-primary ms-2" href="https://toss.me/tqqq3">후원하기</a>
      </div>
  
      <div class="text-center p-1 mt-3 d-flex flex-column" id="advertisement">
        <div id="advertisement" class="p-1">
          <iframe src="https://coupa.ng/cd9WUq" width="340" height="75" frameborder="0" scrolling="no"
            referrerpolicy="unsafe-url"></iframe>
        </div>
        <div class="p-1">
          <iframe src="https://ads-partners.coupang.com/widgets.html?id=676776&template=carousel&trackingCode=AF4299611&subId=&width=340&height=180&tsource=" width="340" height="180" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>
        </div>
      </div>
      <div class="alert alert-success text-bg-success alert-fix-bottom" role="alert" id="alert">
        <p id="alertMsg" class="text-truncate">
        </p>
      </div>
    </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);

const getColorPreference = () => {
  if (localStorage.getItem('theme-preference')) {
    return localStorage.getItem('theme-preference');
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
};

const setPreference = () => {
  localStorage.setItem('theme-preference', theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
};

const theme = {
  value: getColorPreference(),
};

reflectPreference();

window.onload = () => {
  reflectPreference();

  document.querySelector('#theme-toggle').addEventListener('click', e => {
    theme.value = theme.value === 'light'
      ? 'dark'
      : 'light';

    setPreference();
  });
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });



export function showAlertMessage(message) {
  const alert = document.getElementById('alert');
  const alertMsg = document.getElementById('alertMsg');
  if(message) {
    alertMsg.textContent = message;
    alert.classList.add('active');
    setTimeout(function () {
      alert.classList.remove('active');
      alertMsg.textContent = '';
    }, 2000);
  }
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      showAlertMessage("COPIED : " + text);
    }
  );
}

export function detectUserLanguage() {
  const userLanguage = navigator.language.split('-')[0];
  return userLanguage === 'ko' ? userLanguage : 'en';
}



