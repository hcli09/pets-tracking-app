<!-- https://codepen.io/angro/pen/bGdVqXv -->
<template>
<div class="close">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <svg viewBox="0 0 36 36" class="circle">
    <path
      stroke-dasharray="100, 100"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
  </svg>
</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
*{margin:0;padding:0;border:none;}
body{
  background: #263238;
  display:grid;
  place-items:center;
}
.close{
  $size: 40px;
  $borderSize: 2px;
  $borderColor: rgba(white,1);
  $speed: .5s;
  width:$size;
  height:$size;
  position: relative;
  margin: 0% 50%;
  background: #76553f;
  opacity: 0.25;
  border-radius:50%;
  box-shadow: 0 0 20px -5px rgba(white,.5);
//   transition: .25s ease-in-out;
//   cursor: pointer;
//   animation: fade-in $speed ease-out .25s both;
//   @keyframes fade-in {
//     from { opacity: 0; transform:scale(1.1) }
//   }
  .circle {
    path {
      stroke: $borderColor;
      fill: none;
      stroke-width: calc($borderSize/2);
      stroke-linecap: round;
    //   animation: progress $speed ease-out .25s both;
    //   @keyframes progress {
    //     from { stroke-dasharray: 0 100; }
    //   }
    }
  }
  span{
    display:block;
    width:(calc($size/4)) - 2px;
    height:$borderSize;
    background: $borderColor;
    box-shadow: 0 0 20px -5px rgba(white,.5);
    border-radius: 20px;
    position: absolute;
    $padding: calc($size/3);
    // transition: .25s ease-in-out;
    // animation: slide-in $speed ease-in-out .25s both;
    // @keyframes slide-in {
    //   from { width:0; }
    // }
    &:nth-child(1){
      top:($padding - calc($borderSize/2));
      left:$padding;
      transform:rotate(45deg);
      transform-origin: top left;
    }
    &:nth-child(2){
      top:($padding - (calc(($borderSize/2))));
      right:$padding;
      transform:rotate(-45deg);
      transform-origin: top right;
    }
    &:nth-child(3){
      bottom:($padding - (calc($borderSize/2)));
      left:$padding;
      transform:rotate(-45deg);
      transform-origin: bottom left;
    }
    &:nth-child(4){
      bottom:($padding - (calc($borderSize/2)));
      right:$padding;
      transform:rotate(45deg);
      transform-origin: bottom right;
    }
  }
  &:hover{
    background: #76553f;
    opacity: 0.5;
    span{
      width:(calc($size/4));
    }
  }
}
</style>

