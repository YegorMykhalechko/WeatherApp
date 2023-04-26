<script setup>
import { onMounted, ref } from 'vue'
//Icons
import BaseIcon from './IconVue/BaseIcon.vue'

const scrolledNav = ref(null)
const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
  window.addEventListener('scroll', updateScroll)
})

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

const checkScreen = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 750) {
    mobile.value = true
    return
  }
  mobile.value = false
  mobileNav.value = false
  return
}

const updateScroll = () => {
  const scrollPosition = window.scrollY
  if (scrollPosition > 50) {
    scrolledNav.value = true
    return
  }
  scrolledNav.value = false
}
</script>

<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <RouterLink to="/" class="logo">
          <BaseIcon icon="logo" alt="logo" />
        </RouterLink>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><RouterLink to="/" class="link">Home</RouterLink></li>
        <li><RouterLink to="/" class="link">Favorites</RouterLink></li>
      </ul>
      <div class="icon" :class="{ 'icon-active': mobileNav }">
        <BaseIcon @click="toggleMobileNav" v-show="mobile" icon="burger" alt="burger" />
      </div>
      <Transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><RouterLink to="/" class="link">Home</RouterLink></li>
          <li><RouterLink to="/" class="link">Favorites</RouterLink></li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  top: 0;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link {
      font-weight: 500;
      color: #fff;
      list-style: none;
      text-decoration: none;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #00afea;
        border-color: #00afea;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      transition: 0.5s ease all;
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      cursor: pointer;
      transition: 0.8s ease all;
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 200px;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .link {
          color: #000;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-200px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}

.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    padding: 8px 0;
  }
}
</style>
