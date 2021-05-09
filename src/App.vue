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
        <v-card class="col-12 col-lg-4 mx-auto"
                max-width="450">
          <v-img
              contain
              class="align-self-center"
              max-height="400"
              :src="selectedImage"
          ></v-img>
<!--          <v-img>{{ message }}</v-img>-->
          <v-card-actions class="justify-center ma-4">
            <v-btn color="primary" outlined @click="randomizePicture">
              Repeat
              <v-icon
                  right
                  dark
              >
                mdi-replay
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
    <!--  </div>-->
  </v-app>
</template>

<script>

const API_URL = "http://localhost:5000/quoteimgs";
// import axios from "axios";

// const context = require.context('./assets/init_img', true, /\.jpg$|.jpeg$|.png$/);
// console.log('context', context);
// console.log('keys', context.keys());
// console.log('map keys', [...context.keys()].map(k => context(k)));
// const imgPaths = [...context.keys()].map(k => context(k));

export default {
  name: 'App',
  data() {
    return {
      images: [],
      // selectedImage:  require('@/assets/init_img/image.jpg'),
      selectedImage: API_URL,
    }
  },
  methods: {
    randomizePicture() {
      this.selectedImage = this.makeRandomImgURL();
    },
    makeRandomImgURL(){
      return `${API_URL}?_=${~~(Math.random()*100000)}`;
    }

  }
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
