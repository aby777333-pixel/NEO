window.FXAB = window.FXAB || {};
FXAB.inject = function inject(){
  const tick = document.getElementById('sharedTicker');
  const head = document.getElementById('sharedHeader');
  const foot = document.getElementById('sharedFooter');

  if (tick) {
    tick.innerHTML = `
      <div class="topTicker">
        <div class="container tickerRail" aria-label="Live market ticker">
          <div class="tickerTrack">
            ${mk('EUR/USD','1.0847','+0.18%','up')}
            ${mk('GBP/USD','1.2612','-0.11%','dn')}
            ${mk('USD/JPY','149.32','+0.02%','up')}
            ${mk('XAU/USD','2056.8','-0.34%','dn')}
            ${mk('BTC/USD','43195','+0.08%','up')}
            ${mk('ETH/USD','2316','+0.28%','up')}
            ${mk('NAS100','17120','-0.05%','dn')}
            ${mk('DXY','103.18','-0.11%','dn')}
            ${mk('EUR/USD','1.0847','+0.18%','up')}
            ${mk('GBP/USD','1.2612','-0.11%','dn')}
            ${mk('USD/JPY','149.32','+0.02%','up')}
            ${mk('XAU/USD','2056.8','-0.34%','dn')}
            ${mk('BTC/USD','43195','+0.08%','up')}
            ${mk('ETH/USD','2316','+0.28%','up')}
            ${mk('NAS100','17120','-0.05%','dn')}
            ${mk('DXY','103.18','-0.11%','dn')}
          </div>
        </div>
      </div>`;
  }

  if (head) {
    head.innerHTML = `
    <header>
      <div class="container nav">
        <a class="brand" href="/">
          <div class="logo" aria-hidden="true"></div>
          <div>
            <div class="name">FXAB</div>
            <div class="tag">Swiss‑clean UX • precision execution</div>
          </div>
        </a>

        <nav class="primary" aria-label="Primary">
          ${menu('Markets','markets', markets())}
          ${menu('Accounts','accounts', accounts())}
          ${menu('Platforms','platforms', platforms())}
          ${menu('Partners','partners', partners())}
          ${menu('Resources','resources', resources())}
          <a href="/about.html">About</a>
          <a href="/contact.html">Support</a>
        </nav>

        <button class="hamb" id="hamb" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
          <span></span><span></span><span></span>
        </button>

        <div class="actions">
          <button class="btn" id="modeBtn" type="button">Dark mode</button>
          <a class="btn ghost" href="#" onclick="return false">Client Login</a>
          <a class="btn primary" href="#" onclick="return false">Open Account</a>
        </div>
      </div>

      <div class="mobileNav" id="mobileNav" aria-label="Mobile menu">
        <div class="mobileTop">
          <div style="font-weight:900; letter-spacing:.06em">FXAB</div>
          <button class="btn" id="mobClose" style="padding:10px 12px">Close</button>
        </div>
        <div style="margin-top:12px; display:flex; gap:10px">
          <a class="btn primary" href="#" onclick="return false">Open Account</a>
          <a class="btn ghost" href="#" onclick="return false">Login</a>
        </div>
        <div class="mobileLinks">
          <details><summary>Markets</summary>
            <a href="/forex.html">Forex</a>
            <a href="#" onclick="return false">Metals</a>
            <a href="#" onclick="return false">Indices</a>
            <a href="#" onclick="return false">Commodities</a>
            <a href="#" onclick="return false">Cryptos</a>
            <a href="#" onclick="return false">CFDs</a>
          </details>
          <details><summary>Accounts</summary>
            <a href="/accounts.html">Standard</a>
            <a href="/accounts.html">Pro</a>
            <a href="/accounts.html">ECN</a>
            <a href="/accounts.html">VIP</a>
          </details>
          <details><summary>Platforms</summary>
            <a href="/platforms.html">FXAB Raptor (Web)</a>
            <a href="/platforms.html">Desktop</a>
            <a href="/platforms.html">Mobile</a>
            <a href="/platforms.html">API/FIX</a>
          </details>
          <details><summary>Partners</summary>
            <a href="/introducing-brokers.html">Introducing Brokers</a>
            <a href="#" onclick="return false">Money Managers</a>
          </details>
          <details><summary>Resources</summary>
            <a href="/academy.html">Academy</a>
            <a href="/calendar.html">Economic calendar</a>
            <a href="#" onclick="return false">Calculators</a>
            <a href="#" onclick="return false">Market analysis</a>
          </details>
          <a href="/about.html">About</a>
          <a href="/contact.html">Support</a>
        </div>
        <div class="mobileBottom">
          <div class="pill">EN</div>
          <div class="pill">ES</div>
          <div class="pill">AR</div>
          <div class="pill">HI</div>
        </div>
      </div>
    </header>`;
  }

  if (foot) {
    foot.innerHTML = `
    <footer>
      <div class="container">
        <div class="footerGrid">
          <div>
            <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px">
              <div class="logo" aria-hidden="true" style="width:36px; height:36px"></div>
              <div>
                <div style="font-weight:900; letter-spacing:.06em">FXAB</div>
                <div style="color: rgba(100,116,139,.92); font-size:12px">Where precision trading meets technology</div>
              </div>
            </div>
            <div style="color: rgba(30,41,59,.74); line-height:1.85; font-size:13px">
              Built as a product: execution‑led infrastructure, transparent conditions, and trader‑first education.
            </div>
          </div>

          <div>
            <h4>Markets</h4>
            <a href="/forex.html">Forex</a>
            <a href="#" onclick="return false">Metals</a>
            <a href="#" onclick="return false">Indices</a>
            <a href="#" onclick="return false">Commodities</a>
            <a href="#" onclick="return false">Cryptos</a>
            <a href="#" onclick="return false">CFDs</a>
          </div>

          <div>
            <h4>Trading</h4>
            <a href="/accounts.html">Account types</a>
            <a href="/platforms.html">Platforms</a>
            <a href="/copy-trading.html">Copy trading</a>
            <a href="#" onclick="return false">PAMM/MAM</a>
            <a href="/calendar.html">Economic calendar</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/about.html">About</a>
            <a href="#" onclick="return false">Regulation</a>
            <a href="#" onclick="return false">Security</a>
            <a href="#" onclick="return false">Awards</a>
            <a href="/contact.html">Contact</a>
          </div>

          <div>
            <h4>Resources</h4>
            <a href="/academy.html">Academy</a>
            <a href="/help.html">Help center</a>
            <a href="/sitemap.xml">Sitemap</a>
            <a href="#" onclick="return false">Blog</a>
            <a href="#" onclick="return false">Analysis</a>
          </div>
        </div>

        <div class="footerNote">
          <div><b>Risk warning:</b> Forex and CFDs are leveraged products and may not be suitable for all investors. You may lose more than your initial deposit. Past performance is not indicative of future results.</div>
          <div style="margin-top:10px">© <span id="y"></span> FXAB. <a href="/terms.html">Terms</a> • <a href="/privacy.html">Privacy</a> • <a href="/risk.html">Risk disclosure</a></div>
        </div>
      </div>
    </footer>`;
  }

  function mk(sym, price, chg, dir){
    return `<span class="tick">${sym} <span style="opacity:.82">${price}</span> <span class="${dir}">${chg}</span></span>`;
  }

  function menu(label, id, inner){
    return `<div class="navItem" data-menu="${id}">
      <a href="#" onclick="return false">${label}</a>
      <div class="mega" id="mega-${id}">
        ${inner}
      </div>
    </div>`;
  }

  function markets(){
    return `<div class="megaGrid">
      <div>
        <div class="megaTitle">Markets</div>
        <a class="megaLink" href="/forex.html">Forex</a>
        <a class="megaLink" href="#" onclick="return false">Metals</a>
        <a class="megaLink" href="#" onclick="return false">Indices</a>
        <a class="megaLink" href="#" onclick="return false">Commodities</a>
        <a class="megaLink" href="#" onclick="return false">Cryptos</a>
        <a class="megaLink" href="#" onclick="return false">CFDs</a>
      </div>
      <div>
        <div class="megaTitle">Most traded this week</div>
        <div class="megaBox">
          <div class="featRow"><span>EUR/USD</span><span style="color: rgba(0,185,128,1)">+0.18%</span></div>
          <div class="featRow"><span>XAU/USD</span><span style="color: rgba(0,185,128,1)">+0.45%</span></div>
          <div class="featRow"><span>USD/JPY</span><span style="color: rgba(0,185,128,1)">+0.02%</span></div>
          <div class="featRow"><span>BTC/USD</span><span style="color: rgba(0,185,128,1)">+0.08%</span></div>
        </div>
        <a class="btn primary" style="margin-top:12px" href="/forex.html">View all markets</a>
      </div>
    </div>`;
  }

  function accounts(){
    return `<div class="megaGrid" style="grid-template-columns:1fr 1fr 1fr">
      <div>
        <div class="megaTitle">Account types</div>
        <a class="megaLink" href="/accounts.html">Standard</a>
        <a class="megaLink" href="/accounts.html">Pro</a>
        <a class="megaLink" href="/accounts.html">ECN</a>
        <a class="megaLink" href="/accounts.html">VIP</a>
        <a class="megaLink" href="/accounts.html">Compare all</a>
      </div>
      <div>
        <div class="megaTitle">Features</div>
        <a class="megaLink" href="#" onclick="return false">Funding & withdrawals</a>
        <a class="megaLink" href="/copy-trading.html">Copy trading</a>
        <a class="megaLink" href="#" onclick="return false">PAMM/MAM</a>
        <a class="megaLink" href="#" onclick="return false">VPS hosting</a>
      </div>
      <div>
        <div class="megaTitle">Platforms</div>
        <a class="megaLink" href="/platforms.html"><b>FXAB Raptor</b> (Web)</a>
        <a class="megaLink" href="/platforms.html">Desktop app</a>
        <a class="megaLink" href="/platforms.html">Mobile apps</a>
        <a class="megaLink" href="/platforms.html">API/FIX</a>
        <div class="megaBox" style="margin-top:10px">Platform preview (placeholder)</div>
      </div>
    </div>`;
  }

  function platforms(){
    return `<div class="megaGrid">
      <div>
        <div class="megaTitle">Raptor suite</div>
        <a class="megaLink" href="/platforms.html">Web platform</a>
        <a class="megaLink" href="/platforms.html">Desktop</a>
        <a class="megaLink" href="/platforms.html">Mobile</a>
        <a class="megaLink" href="/platforms.html">API/FIX</a>
      </div>
      <div>
        <div class="megaTitle">Highlights</div>
        <div class="megaBox" style="font-family:JetBrains Mono; font-size:12px; line-height:1.7; color: rgba(30,41,59,.78)">
          multi-chart layouts • depth ladder • alerts • advanced orders
        </div>
        <a class="btn" style="margin-top:12px" href="/platforms.html">Explore platform</a>
      </div>
    </div>`;
  }

  function partners(){
    return `<div class="megaGrid">
      <div>
        <div class="megaTitle">Introducing brokers</div>
        <div class="megaBox">Earn up to <b>$8/lot</b> (demo). Tracking dashboard, payouts, and attribution.</div>
        <a class="btn primary" style="margin-top:12px" href="/introducing-brokers.html">Become an IB</a>
      </div>
      <div>
        <div class="megaTitle">Money managers</div>
        <div class="megaBox">PAMM/MAM solutions (demo). Multi-account allocation workflows.</div>
        <a class="btn" style="margin-top:12px" href="#" onclick="return false">Apply as MM</a>
      </div>
    </div>`;
  }

  function resources(){
    return `<div class="megaGrid" style="grid-template-columns:1fr 1fr 1fr">
      <div>
        <div class="megaTitle">Learn</div>
        <a class="megaLink" href="/academy.html">Academy</a>
        <a class="megaLink" href="#" onclick="return false">eBooks</a>
        <a class="megaLink" href="#" onclick="return false">Video library</a>
        <a class="megaLink" href="#" onclick="return false">Webinars</a>
        <a class="megaLink" href="#" onclick="return false">Glossary</a>
      </div>
      <div>
        <div class="megaTitle">Tools</div>
        <a class="megaLink" href="/calendar.html">Economic calendar</a>
        <a class="megaLink" href="#" onclick="return false">Trading calculator</a>
        <a class="megaLink" href="#" onclick="return false">Pip calculator</a>
        <a class="megaLink" href="#" onclick="return false">Margin calculator</a>
        <a class="megaLink" href="#" onclick="return false">Profit calculator</a>
      </div>
      <div>
        <div class="megaTitle">Analysis</div>
        <a class="megaLink" href="#" onclick="return false">Daily market analysis</a>
        <a class="megaLink" href="#" onclick="return false">Technical reports</a>
        <a class="megaLink" href="#" onclick="return false">Weekly forecast</a>
        <a class="megaLink" href="#" onclick="return false">Trading signals</a>
        <a class="megaLink" href="#" onclick="return false">Blog</a>
      </div>
    </div>`;
  }
};
