<template>
    <div class="not-found-container">
        <h1>4</h1>
        <img
            src="@assets/not-found/not-found.jpeg"
            alt=""
            class="img-not-found"
        />
        <h1>4</h1>
    </div>
    <div class="not-found-prompt">
        <p class="p1">Oops! There seems to be a problem with that page.</p>
        <p class="p2">
            Either the URL was mistyped, never existed, or once existed but was
            mysteriously lost.
        </p>
    </div>

    <!-- <h1>404 Not Found</h1> -->
</template>

<script>
export default {};
</script>

<style scoped>
/* font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    color: #2c3e50;
    margin-top: 60px; */

h1 {
    font-size: 200px;
}

.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.not-found-container h1 {
    margin: 0;
}

.not-found-prompt {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}
.img-not-found {
    width: 160px;
    height: 160px;
    border: 8px solid #303d4e;
    border-radius: 50%;
}

.p1 {
    font-size: 32px;
}
</style>
