<script>
  import { getStores } from '$app/stores';
  const { page } = getStores();
  const routes = [
    { title: 'Home', href: '/' },
    { title: 'Stats', href: '/stats' }
  ];
  let view = '';
  page.subscribe(({ path }) => (view = path));
</script>

<header class="header">
  <button class="btn menu-btn">Menu</button>
  <a class="center" href="/" tabindex="0"><h1>Pong Tracker</h1></a>
  <nav>
    {#each routes as { href, title }}
      <a {href} {title} class:active={view === href}>{title}</a>
    {/each}
  </nav>
</header>

<style>
  .header {
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    padding: 0 1rem;
    background: var(--primary);
    box-shadow: var(--subtle-shadow);
    z-index: 3;
  }
  .header a {
    text-decoration: none;
  }
  .header a:focus {
    outline: none;
  }
  .header h1 {
    margin: 0 1rem 0 0;
    padding: 0;
    font-size: 24px;
    line-height: 56px;
    font-weight: 400;
    color: var(--secondary);
  }
  .header nav {
    font-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
  }
  .header nav > a,
  .header nav > .faux-link,
  .header nav .dropdown-header {
    display: flex;
    align-items: center;
    padding: 0 15px;
    min-width: 50px;
    text-align: center;
    background: rgba(255, 255, 255, 0);
    text-decoration: none;
    color: var(--secondary);
    cursor: pointer;
    will-change: background-color;
  }
  .header nav > a:hover,
  .header nav > .faux-link:hover,
  .header nav .dropdown-header:hover,
  .header nav > a:focus,
  .header nav > .faux-link:focus,
  .header nav .dropdown-header:focus,
  .header nav > a:active,
  .header nav > .faux-link:active,
  .header nav .dropdown-header:active {
    color: #fff;
  }
  .header nav > a.active,
  .header nav > .faux-link.active,
  .header nav .dropdown-header.active {
    background: var(--tertiary);
    color: var(--activeLinkColor);
  }
  .header nav > a.larger,
  .header nav > .faux-link.larger,
  .header nav .dropdown-header.larger {
    display: none;
  }
  .header nav > a.dropdown-header,
  .header nav > .faux-link.dropdown-header,
  .header nav .dropdown-header.dropdown-header {
    display: flex;
  }
  .header nav > a.dropdown-header:before,
  .header nav > .faux-link.dropdown-header:before,
  .header nav .dropdown-header.dropdown-header:before {
    margin-right: 0;
  }
  .btn.menu-btn {
    display: none;
  }
  .nav-modal-backdrop {
    display: none;
  }
  @media (min-width: 800px) {
    .header nav {
      flex-direction: row;
      flex-grow: 0;
      flex-shrink: 0;
      margin-left: auto;
    }
    .header nav > a {
      display: block;
      height: 56px;
      line-height: 56px;
      flex-grow: 0;
    }
    .header nav > a.larger,
    .header nav .faux-link.larger {
      display: block;
    }
    .header nav > a.smaller,
    .header nav .faux-link.smaller {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .header nav {
      flex-direction: column;
      position: fixed;
      left: -200px;
      top: 56px;
      bottom: 0;
      width: 200px;
      background-color: var(--primary);
      transition: transform 0.15s ease-in-out;
    }
    .header nav.show {
      transform: translateX(200px);
      box-shadow: 0px 0px 10px #333;
    }
    .header nav > a,
    .header nav .order-last-smaller {
      height: 50px;
      line-height: 50px;
      order: 2;
    }
    .header nav .order-last-smaller {
      order: 100;
      border-top: 1px solid var(--secondary);
      border-bottom: 1px solid var(--secondary);
    }
    .header nav .flex-pull-right {
      display: flex;
      flex-direction: column;
      margin-left: initial;
      width: 200px;
    }
    .header h1 {
      margin-left: auto;
    }
    .header .dropdown-wrapper.larger .dropdown-header {
      padding: 0;
    }
    .header .dropdown-wrapper.larger .dropdown-header:before {
      display: none;
    }
    .header .order-first-smaller {
      order: 1;
      height: 70px;
      line-height: 50px;
      justify-content: center;
      border-bottom: 1px solid var(--secondary);
    }
    .btn.menu-btn {
      display: inline-flex;
      height: 34px;
      background-color: var(--secondary);
      color: var(--primary);
      border: none;
    }
    .nav-modal-backdrop.show {
      display: flex;
      position: fixed;
      background-color: rgba(56, 56, 56, 0.5);
      left: 0;
      top: 56px;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
  }
</style>
