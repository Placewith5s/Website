(()=>{"use strict";document.addEventListener("DOMContentLoaded",(()=>{class t{static activationInfo(){console.info("SummaryElement activated!")}constructor(){this.element=document.querySelector("summary"),this.element.setAttribute("aria-expanded","false"),document.addEventListener("click",(t=>{const e=t.target;if("SUMMARY"===e.tagName){const t="true"===e.getAttribute("aria-expanded");e.setAttribute("aria-expanded",!t)}}),{passive:!0})}}new t;t.activationInfo()}))})();