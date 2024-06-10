"use strict";
function MenuManager(drawerId, menuIconId) {
  this.drawer = document.getElementById(drawerId);
  this.menuIcon = document.getElementById(menuIconId);
  this.drawer.setAttribute('aria-hidden', 'true');
  this.menuIcon.setAttribute('aria-expanded', 'false');
  this.handleDrawerClick = function(event) {
    const isLinkClick = event.target.tagName === 'A';
    if (isLinkClick || event.target.id === 'hideDrawerBtn') {
      this.closeDrawer();
    }
  };
  this.handleScroll = function() {
    const isOpen = this.drawer.classList.contains('opened');
    this.drawer.style.position = isOpen ? 'fixed' : '';
    this.drawer.style.top = isOpen ? '50px' : '';
  };
  this.initializeMenu = function() {
    this.drawer.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1');
    });
    this.menuIcon.addEventListener('click', () => {
      const isExpanded = this.drawer.classList.toggle('opened');
      this.drawer.setAttribute('aria-hidden', !isExpanded);
      this.menuIcon.setAttribute('aria-expanded', isExpanded);

      this.drawer.querySelectorAll('a').forEach(link => {
        link.setAttribute('tabindex', isExpanded ? '0' : '-1');
      });
      this.handleScroll();
    });
    this.drawer.addEventListener('click', this.handleDrawerClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
  };
  this.closeDrawer = function() {
    this.drawer.classList.remove('opened');
    this.drawer.setAttribute('aria-hidden', 'true');
    this.menuIcon.setAttribute('aria-expanded', 'false');
    this.drawer.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
  };
}
const myMenuManager = new MenuManager('drawer', 'menuIcon');
myMenuManager.initializeMenu();