<template>
    <div class="song-list">
        <ul>
            <li v-for="(song, index) in songs" :key="index"></li>
        </ul>
    </div>
</template>
