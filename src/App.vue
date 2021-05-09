<template>
  <v-app>
    <div id="pageContainer">
      <v-app-bar
          dark
          color="blue">

        <v-toolbar-title color="white">Vue</v-toolbar-title>
      </v-app-bar>
      <v-container
          class="d-flex  justify-center my-10">
        <ImageCard></ImageCard>
      </v-container>

    </div>
    <!--  </div>-->
  </v-app>
</template>

<script>

import ImageCard from "@/components/ImageCard";

export default {
  name: 'App',
  components: {
    ImageCard
  },

}

</script>

<style>
#pageContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
