<template>
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
</template>

<script>
const API_URL = "http://localhost:5000/quoteimgs";
export default {
name: "ImageCard",
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

<style scoped>

</style>