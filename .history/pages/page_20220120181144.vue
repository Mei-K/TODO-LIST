<template>
  <div class="container">
    <div class="card">
      <span class="masking-tape-stripe"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 3rem;
}
//カード
.card {
  position: relative;
  width: 20rem;
  padding: 5rem 0;
  border: 2px solid black;
  background-color: whitesmoke;

  //マスキングテープ風　ストライプ
  .masking-tape-stripe {
    position: absolute;
    top: -1em;
    left: 30%;
    width: 100px;
    height: 30px;
    background-image: linear-gradient(
      -45deg,
      rgba(203, 64, 66, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba(203, 64, 66, 0.5) 50%,
      rgba(203, 64, 66, 0.5) 75%,
      transparent 75%,
      transparent 100%
    );
    background-repeat: repeat;
    background-size: 20px 20px;
    background-position: 0 0, 20px 20px;
    border-left: 2px dotted rgba(0, 0, 0, 0.1);
    border-right: 2px dotted rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 0.25em 2em;
    background-color: white;
    transform: rotate(-4deg);
  }
}
</style>
