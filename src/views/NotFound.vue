2 lines (21 sloc) 694 Bytes
<script setup></script>

<template>
  <div class="box">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The Page you are looking for doesn't exist or an other error occured. Go to
      <RouterLink to="/">Home Page.</RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 80px;
  font-weight: 800;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}
h2 {
  font-size: 25px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-top: -40px;
}
p {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
}
</style>
