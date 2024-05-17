<script setup>
  import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
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

    // Agrega más sonidos aquí
  ]);

  const selectedSound = ref(sounds.value); // Selecciona el primer sonido por defecto
  const isPlaying = ref(false);
  const audio = ref(new Audio());

  const volume = ref(0.25);

  const playSelectedSound = () => {
    // Aquí no reconfiguramos el manejador onloadeddata
    audio.value
      .play()
      .then(() => (isPlaying.value = true))
      .catch((error) => console.error("Error al reproducir:", error));
  };

  const pauseSound = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  function onChangeSound() {
    if (selectedSound.value) {
      if (!audio.value.paused) {
        audio.value.pause();
      }
      audio.value.src = selectedSound.value.file;
      audio.value.load(); // Asegúrate de cargar el nuevo recurso de audio.
      playSelectedSound(); // Intenta reproducir el nuevo sonido seleccionado.
    }
  }

  watch(selectedSound, (newValue) => {
    if (newValue && newValue.file) {
      // Establece el nuevo src
      audio.value.src = newValue.file;

      // Establece el volumen nuevamente ya que al cambiar src podría reiniciarse
      audio.value.volume = volume.value;

      // Agrega el manejador para el evento `loadeddata`
      audio.value.onloadeddata = () => {
        // Espera al siguiente "tick" para asegurarse de que el DOM esté actualizado
        nextTick(() => {
          audio.value
            .play()
            .then(() => {
              isPlaying.value = true;
            })
            .catch((error) => {
              console.error("Error al reproducir:", error);
              isPlaying.value = false;
            });
        });
      };

      // Para asegurar que el manejador onloadeddata se llame incluso si el archivo ya está en caché,
      // llamar a `load` puede forzar al navegador a recargar el recurso.
      audio.value.load();
    }
  });

  watch(volume, (newVolume) => {
    if (audio.value) {
      audio.value.volume = newVolume;
    }
  });
  function adjustVolume() {
    audio.value.volume = volume.value;
  }

  onMounted(() => {
    // Añadir un listener para cuando el audio finalice.
    audio.value.addEventListener("ended", handleNextSound);
  });

  const handleNextSound = () => {
    const currentIndex = sounds.value.findIndex(
      (sound) => sound.file === selectedSound.value.file
    );
    const nextIndex = (currentIndex + 1) % sounds.value.length; // Esto asegura el bucle.

    // Establecer el siguiente sonido como seleccionado.
    selectedSound.value = sounds.value[nextIndex];

    // Ya que onChangeSound carga y reproduce el nuevo sonido seleccionado,
    // puedes llamarlo directamente si está definido para hacer este proceso.
    onChangeSound();
  };

  onUnmounted(() => {
    if (audio.value) {
      audio.value.removeEventListener("ended", handleNextSound);
    }
  });
</script>

<template>
  <div class="ambient-sound-container">
    <!-- Selector de sonido ambiental -->
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
    <!-- Botones de control -->
    <button @click="playSelectedSound">Reproducir</button>
    <button @click="pauseSound">Pausar</button>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      @input="adjustVolume" />
    <!-- Indicación de estado -->
    <p v-if="isPlaying">Reproduciendo...</p>
    <p v-else>No se está reproduciendo sonido</p>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
</template>
<style lang="scss" scoped>
 @import "../assets/_styles.scss";
  .ambient-sound-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    background: url("../assets/img/Designer-1.jpeg") no-repeat center center;
    background-size: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    select,
    button,
    input[type="range"] {
      z-index: 10;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid darkgray;
      &:focus {
        outline: none;
        border-color: deepskyblue;
      }
    }

    button {
      cursor: pointer;
      background-color: deepskyblue;
      color: white;
      &:hover {
        background-color: dodgerblue;
      }
    }

    input[type="range"] {
      width: 100%;
    }

    .wave {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 200%;
      height: 100px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 0.7;
      animation: wave 4s infinite linear;

      &:nth-of-type(2) {
        bottom: 10px;
        background: rgba(255, 255, 255, 0.3);
        animation: wave 6s infinite linear;
      }

      &:nth-of-type(3) {
        bottom: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: wave 8s infinite linear;
      }
    }

    @keyframes wave {
      0% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(10px);
      }
      100% {
        transform: translateX(-50%) translateY(0);
      }
    }
  }
</style>
