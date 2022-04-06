<template>
    <div class="home-container">
        <h1>Welcome to Pets Tracking App</h1>
        <img alt="Vue logo" src="@assets/home-logo.jpeg" class="home-logo" />
        <hr />
        <a href="https://sites.google.com/view/pets-techlauncher-2022/home"
            >Landing Page</a
        >
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    msg: String,
});

const count = ref(0);
</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

a {
    color: #3b8075;
}

.home-logo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    animation-name: rotate;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
</style>
