<template>
    <div class="not-found-container">
        <h1>4</h1>
        <img src="@assets/not-found.jpeg" alt="" class="not-found" />
        <h1>4</h1>
    </div>
    <p class="p1">Oops! There seems to be a problem with that page.</p>
    <p class="p2">
        Either the URL was mistyped, never existed, or once existed but was
        mysteriously lost.
    </p>
    <!-- <h1>404 Not Found</h1> -->
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
    font-size: 200px;
}

.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.not-found-container h1 {
    margin: 0;
}
.not-found {
    width: 160px;
    height: 160px;
    border: 8px solid #303d4e;
    border-radius: 50%;
}
.p1 {
    font-size: 32px;
}
</style>
