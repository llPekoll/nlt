<!-- https://codepen.io/nikhil8krishnan/pen/rVoXJa?editors=1100 -->

<script lang="ts">
    export let version=1;
</script>
{#if version == 1}
<svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
<circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
<line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
  <animateTransform 
       attributeName="transform" 
       dur="2s"
       type="rotate"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
</line>
<line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
  <animateTransform 
       attributeName="transform" 
       dur="15s"
       type="rotate"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
</line>
</svg>
{:else if version == 2 }
<svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
<circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
  <circle fill="#fff" stroke="#e74c3c" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
    
  </circle>
</svg>
{:else if version == 3 }

<svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin="0.1"/>    
  </circle>
  <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.2"/>       
  </circle>
  <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite" 
      begin="0.3"/>     
  </circle>
</svg>

{:else if version == 4 }


<svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 15 ; 0 -15; 0 15" 
       repeatCount="indefinite" 
       begin="0.1"/>
  </circle>
  <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 10 ; 0 -10; 0 10" 
       repeatCount="indefinite" 
       begin="0.2"/>
  </circle>
  <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 5 ; 0 -5; 0 5" 
       repeatCount="indefinite" 
       begin="0.3"/>
  </circle>
</svg>

{:else}



<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>

{/if}