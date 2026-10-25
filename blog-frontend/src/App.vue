<template>
  <Navbar />
  <RouterView />

</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body {
    background-color: #f6f6f6;
  }
  .page {
    padding-top: 0;
  }
</style>
