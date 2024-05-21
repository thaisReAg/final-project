<script setup>
  import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
  import {
    PlayIcon,
    PauseIcon,
    ForwardIcon,
    BackwardIcon,
  } from "@heroicons/vue/24/outline";
  import softRain from "../assets/music/soft-rain.mp3";
  import deepFuture from "../assets/music/deep-future.mp3";
  import goodNight from "../assets/music/good-night.mp3";
  import lofiStudy from "../assets/music/lofi-study.mp3";
  import onceInParis from "../assets/music/once-in-paris.mp3";
  import rainThunder from "../assets/music/rain-and-thunder.mp3";
  import rainyDay from "../assets/music/rainy-day.mp3";

  const sounds = ref([
    { label: "Soft Rain", file: softRain },
    { label: "Deep Future", file: deepFuture },
    { label: "Goodnight", file: goodNight },
    { label: "Lofy Study", file: lofiStudy },
    { label: "Once in Paris", file: onceInParis },
    { label: "Rain & Thunder", file: rainThunder },
    { label: "Rainy Day", file: rainyDay },
  ]);

  const selectedSound = ref(sounds.value[0]);
  const isPlaying = ref(false);
  const audio = ref(new Audio(selectedSound.value.file));

  const volume = ref(0.25);

  const playSelectedSound = () => {
    audio.value
      .play()
      .then(() => (isPlaying.value = true))
      .catch((error) => console.error("Error al reproducir:", error));
  };

  const pauseSound = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  const togglePlayPause = () => {
    if (isPlaying.value) {
      pauseSound();
    } else {
      playSelectedSound();
    }
  };

  const onChangeSound = () => {
    if (selectedSound.value) {
      audio.value.pause();
      audio.value.src = selectedSound.value.file;
      audio.value.load();
      playSelectedSound();
    }
  };

  const nextSound = () => {
    const currentIndex = sounds.value.findIndex(
      (sound) => sound.file === selectedSound.value.file
    );
    const nextIndex = (currentIndex + 1) % sounds.value.length;
    selectedSound.value = sounds.value[nextIndex];
  };

  const previousSound = () => {
    const currentIndex = sounds.value.findIndex(
      (sound) => sound.file === selectedSound.value.file
    );
    const prevIndex =
      (currentIndex - 1 + sounds.value.length) % sounds.value.length;
    selectedSound.value = sounds.value[prevIndex];
  };

  watch(selectedSound, (newValue) => {
    if (newValue && newValue.file) {
      audio.value.src = newValue.file;
      audio.value.volume = volume.value;
      audio.value.onloadeddata = () => {
        nextTick(() => {
          if (isPlaying.value) {
            audio.value
              .play()
              .then(() => {
                isPlaying.value = true;
              })
              .catch((error) => {
                console.error("Error al reproducir:", error);
                isPlaying.value = false;
              });
          }
        });
      };
      audio.value.load();
    }
  });

  watch(volume, (newVolume) => {
    if (audio.value) {
      audio.value.volume = newVolume;
    }
  });

  const adjustVolume = () => {
    audio.value.volume = volume.value;
  };

  onMounted(() => {
    audio.value.addEventListener("ended", nextSound);
    audio.value.volume = volume.value;
  });

  onUnmounted(() => {
    if (audio.value) {
      audio.value.removeEventListener("ended", nextSound);
    }
  });
</script>

<template>
  <div class="div-container">
    <div class="ambient-sound-container">
      <select
        v-model="selectedSound"
        @change="onChangeSound">
        <option
          v-for="sound in sounds"
          :key="sound.label"
          :value="sound">
          {{ sound.label }}
        </option>
      </select>

      <div class="controls">
        <button @click="previousSound">
          <BackwardIcon
            class="size-6 text-500 .navbar-brand icon"></BackwardIcon>
        </button>
        <button @click="togglePlayPause">
          <component
            :is="isPlaying ? PauseIcon : PlayIcon"
            class="h-6 w-6" />
        </button>
        <button @click="nextSound">
          <ForwardIcon class="size-6 text-500 .navbar-brand icon"></ForwardIcon>
        </button>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @input="adjustVolume" />
      <div class="waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .div-container {
    width: 800px;
    height: 800px;
    .ambient-sound-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
      height: 100%;
      padding: 20px;
      background: url("../assets/img/Designer-4.jpeg") no-repeat;
      background-size: cover;
      border-radius: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      color: white;

      select,
      button,
      input[type="range"] {
        z-index: 10;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid $light-color;
        &:focus {
          outline: none;
          border-color: $secondary-color;
        }
      }
      .controls {
        display: flex;
        gap: 10px;
      }
      p {
        z-index: 10;
        color: $dark-color;
      }
      button {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        border-radius: 50%;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        &:focus {
          outline: none;
        }
      }

      select {
        margin-top: 40px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }

      input[type="range"] {
        width: 100%;
        accent-color: $secondary-color;
      }
    }
  }
</style>
