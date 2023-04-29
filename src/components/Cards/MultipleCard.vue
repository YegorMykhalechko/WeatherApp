<script setup>
//Composables
import useBuildDate from '../../composables/useBuildDate'

const props = defineProps(['weather', 'city'])
</script>

<template>
  <div class="wrapper">
    <div class="location-box">
      <div class="location">{{ city }}</div>
      <div class="date">{{ useBuildDate(weather?.dt) }}</div>
    </div>
    <div class="weather-box">
      <div class="temp">{{ Math.round(weather?.temp?.day) }}°C</div>
      <div class="weather">{{ weather?.weather[0]?.main }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 90%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 24px 12px;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.25);
  margin: 16px;

  @media only screen and (min-width: 1024px) {
      width: auto;
    }
  .location-box {
    text-align: center;
    .location {
      color: #000;
      font-size: 24px;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .date {
      color: #000;
      font-size: 18px;
      font-weight: 300;
      font-style: italic;
      text-align: center;
    }
  }

  .weather-box {
    text-align: center;
    .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #000;
      font-size: 32px;
      font-weight: 900;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0px;
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }

    .weather {
      color: #000;
      font-size: 28px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
