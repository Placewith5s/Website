'use strict';(function(){class MenuManager{constructor(drawerId,menuIconId){this.drawer=document.getElementById(drawerId);this.menuIcon=document.getElementById(menuIconId);this.drawer.setAttribute('aria-hidden','true');this.menuIcon.setAttribute('aria-expanded','false');this.handleDrawerClick=(event)=>{const isLinkClick=event.target.tagName==='A';if(isLinkClick||event.target.id==='hideDrawerBtn'){this.closeDrawer()}};this.handleScroll=()=>{const isOpen=this.drawer.classList.contains('opened');this.drawer.style.position=isOpen?'fixed':'';this.drawer.style.top=isOpen?'50px':''}}
initializeMenu(){this.menuIcon.addEventListener('click',()=>{const isExpanded=this.drawer.classList.toggle('opened');this.drawer.setAttribute('aria-hidden',!isExpanded);this.menuIcon.setAttribute('aria-expanded',isExpanded);this.handleScroll()},{passive:!0});this.drawer.addEventListener('click',this.handleDrawerClick,{passive:!0});window.addEventListener('scroll',this.handleScroll,{passive:!0})}
closeDrawer(){this.drawer.classList.remove('opened');this.drawer.setAttribute('aria-hidden','true');this.menuIcon.setAttribute('aria-expanded','false')}}
const myMenuManager=new MenuManager('drawer','menuIcon');myMenuManager.initializeMenu()})()