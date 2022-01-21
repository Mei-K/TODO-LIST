<template>
  <v-app>
    <div class="card">
      <span class="masking-tape"></span>
    </div>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss">
.card {
  width: 30%;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  //マスキングテープ風
  .masking-tape {
    position: absolute;
    top: -1em;
    left: 30%;
    width: 100px;
    height: 30px;
    background-image: linear-gradient(
      -45deg,
      $pink-clear 25%,
      transparent 25%,
      transparent 50%,
      $pink-clear 50%,
      $pink-clear 75%,
      transparent 75%,
      transparent 100%
    );
    background-size: 20px 20px;
    background-size: 20px 20px;
    background-position: 0 0, 20px 20px;
    background-repeat: repeat;
    border-left: 2px dotted rgba(0, 0, 0, 0.1);
    border-right: 2px dotted rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 0.25em 2em;
    background-color: white;
    transform: rotate(-4deg);
  }
}
</style>
