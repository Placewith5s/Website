'use strict';(function(){class SummaryElement{constructor(){this.element=document.querySelector('summary');this.element.setAttribute('aria-expanded','false');this.element.addEventListener('click',()=>{this.toggleExpanded()},{passive:!0})}
toggleExpanded(){const isExpanded=this.element.getAttribute('aria-expanded')==='true';this.element.setAttribute('aria-expanded',!isExpanded)}}
const summary=new SummaryElement()})()