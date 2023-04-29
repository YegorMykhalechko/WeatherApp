<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import dateBuilder from '../../composables/useBuildDate'

const props = defineProps(['tempPoints', 'id', 'step'])
const labels = ref([])
const temps = ref([])

onMounted(() => {
  if (props.step) {
    labels.value = props.tempPoints.map((el) => {
      const date = new Date(el.dt * 1000)
      const hours = date.getHours()
      const minutes = '0' + date.getMinutes()
      const formattedTime = hours + ':' + minutes.substr(-2)
      return formattedTime
    })

    temps.value = props.tempPoints.map((el) => {
      return Math.round(el.temp)
    })
  } else {
    labels.value = props.tempPoints.map((el) => {
      const date = new Date(el.dt)
      return dateBuilder(date)
    })

    temps.value = props.tempPoints.map((el) => {
      return Math.round(el.temp.day)
    })
  }

  const ctx1 = document.getElementById(props.id).getContext('2d')

  const gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50)

  gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)')
  gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)')
  gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)')

  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: labels.value,
      datasets: [
        {
          label: 'Temperature',
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: '#4BB543',
          backgroundColor: gradientStroke1,
          borderWidth: 3,
          fill: true,
          data: temps.value,
          maxBarThickness: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5]
          },
          ticks: {
            display: true,
            padding: 10,
            color: '#fbfbfb',
            font: {
              size: 11,
              family: 'Open Sans',
              style: 'normal',
              lineHeight: 2
            }
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5]
          },
          ticks: {
            display: true,
            color: '#ccc',
            padding: 20,
            font: {
              size: 11,
              family: 'Open Sans',
              style: 'normal',
              lineHeight: 2
            }
          }
        }
      }
    }
  })
})
</script>

<template>
  <div>
    <canvas :id="id" class="chart-canvas" height="300"></canvas>
  </div>
</template>

<style lang="scss"></style>
