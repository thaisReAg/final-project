<script setup>
  import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
  import { usePomodoroStore } from "../stores/pomodoro.js";
  import alarmSoundPath from "../assets/alarma.mp3";
  import AmbientSound from "./AmbientSound.vue";
  import AmbientSound2 from "./AmbientSound2.vue";

  const pomodoroStore = usePomodoroStore();
  const alarmSound = new Audio(alarmSoundPath);

  // Computadas para reaccionar al cambio de tiempo y estado

  const timeLeft = computed(() => pomodoroStore.timeLeft);
  const isWorking = computed(() => pomodoroStore.isWorkTime);
  const isActive = computed(() => pomodoroStore.isActive);

  const workTimeInput = ref(pomodoroStore.workTime / 60); // Convertimos segundos a minutos para la entrada del usuario
  const breakTimeInput = ref(pomodoroStore.breakTime / 60); // Convertimos segundos a minutos para la entrada del usuario

  // Funciones para actualizar los tiempos en el pomodoroStore
  function updateWorkTime() {
    if (workTimeInput.value > 0) {
      pomodoroStore.setWorkTime(workTimeInput.value * 60); // Convertimos minutos a segundos al actualizar
    }
  }

  function updateBreakTime() {
    if (breakTimeInput.value > 0) {
      pomodoroStore.setBreakTime(breakTimeInput.value * 60); // Convertimos minutos a segundos al actualizar
    }
  }

  let interval = null;

  // Inicia el temporizador
  function startTimer() {
    if (!isActive.value && timeLeft.value > 0) {
      pomodoroStore.iniciar();
      interval = setInterval(() => {
        if (pomodoroStore.timeLeft > 0) {
          pomodoroStore.timeLeft -= 1;
        } else {
          clearInterval(interval);
          pomodoroStore.toggleMode(); // Cambia entre trabajo y descanso automáticamente
        }
      }, 1000); // Decrementa cada segundo
    }
  }

  // Pausa el temporizador
  function pauseTimer() {
    pomodoroStore.pausar();
    clearInterval(interval);
  }

  // Reinicia el temporizador
  function resetTimer() {
    pomodoroStore.reiniciar();
    clearInterval(interval);
  }

  // Asegurarse de limpiar el intervalo cuando el componente se desmonta
  onUnmounted(() => {
    clearInterval(interval);
  });

  // Observa el isActive para manejar pausas y resumes
  watch(isActive, (newValue) => {
    if (!newValue) {
      clearInterval(interval);
    }
  });

  // Función para alternar el modo manualmente
  function toggleMode() {
    pomodoroStore.toggleMode();
    // Se podría llamar a resetTimer() aquí si deseas resetear el tiempo al cambiar de modo,
    // o asegurarte de que el temporizador se detenga si está activo.
    resetTimer(); // Opcional, dependiendo del comportamiento deseado.
  }

  function playAlarm() {
    alarmSound
      .play()
      .catch((error) =>
        console.error("Error al reproducir el sonido de la alarma:", error)
      );
  }

  watch(
    () => pomodoroStore.timeLeft,
    (newVal, oldVal) => {
      if (newVal === 0) {
        playAlarm();

        // Asegúrate de que esta lógica se ejecute antes de que se llame a toggleMode.
        if (pomodoroStore.isWorkTime) {
          // Acabamos un pomodoro de trabajo
          completeWork();
        } else {
          // Acabamos un break
          completeBreak();
        }

        // Mueve la llamada a toggleMode dentro de la próxima ejecución en la cola de eventos
        // para asegurar que completeWork o completeBreak se ejecuten antes de cambiar el modo.
        nextTick(() => {
          pomodoroStore.toggleMode();
        });
      }
    },
    { flush: "pre" } // Este modificador asegura que la lógica en el watcher se ejecute antes de que los efectos DOM sean aplicados
  );

  /* ---- ALMACENAR POMODOROS ---- */

  const worksCompleted = ref(0);
  const breaksCompleted = ref(0);
  const totalTime = ref(0); // Podrías querer almacenarlo en minutos

  // Función para cargar las estadísticas guardadas al iniciar el componente
  function loadStats() {
    const savedPomodoros = localStorage.getItem(
      "worksCompleted",
      "breaksCompleted"
    );
    const savedTime = localStorage.getItem("totalTime");

    if (savedPomodoros) {
      worksCompleted.value = parseInt(savedPomodoros, 10);
      breaksCompleted.value = parseInt(savedPomodoros, 10);
    }
    if (savedTime) {
      totalTime.value = parseInt(savedTime, 10);
    }
  }

  // Función para guardar estadísticas en localStorage
  function saveStats() {
    localStorage.setItem("worksCompleted", worksCompleted.value.toString());
    localStorage.setItem("breaksCompleted", breaksCompleted.value.toString());
    localStorage.setItem("totalTime", totalTime.value.toString());
  }
  function completeWork() {
    worksCompleted.value += 1;
    totalTime.value += workTimeInput.value; // Uso de la duración configurada por el usuario

    saveStats();
  }
  function completeBreak() {
    breaksCompleted.value += 1;
    totalTime.value += breakTimeInput.value; // Uso de la duración configurada por el usuario

    saveStats();
  }
  function resetStats() {
    worksCompleted.value = 0;
    breaksCompleted.value = 0;
    totalTime.value = 0;

    localStorage.removeItem("worksCompleted");
    localStorage.removeItem("breaksCompleted");
    localStorage.removeItem("totalTime");
  }
  // Llamar loadStats en onMounted para cargar estadísticas al cargar el componente
  onMounted(() => {
    loadStats();
  });
</script>
<template>
  <div class="container">
    <div class="pomodoro-setup">
      <h2>{{ isWorking ? "Working time" : "Break time" }}</h2>
      <div class="timer">
        <p>
          {{ Math.floor(timeLeft / 60) }}:{{
            String(timeLeft % 60).padStart(2, "0")
          }}
        </p>
      </div>
      <div class="btn-container">
        <button @click="startTimer">Iniciar</button>
        <button @click="pauseTimer">Pausar</button>
        <button @click="resetTimer">Reiniciar</button>
      </div>
      <button
        class="toggle-btn"
        @click="toggleMode">
        {{ isWorking ? "Cambiar a Descanso" : "Cambiar a Trabajo" }}
      </button>
      <div class="minutes-container">
        <label for="work-time">Tiempo de Trabajo:</label>
        <input
          id="work-time"
          type="number"
          v-model.number="workTimeInput"
          @change="updateWorkTime"
          min="1" />
      </div>
      <div class="minutes-container">
        <label for="break-time">Tiempo de Descanso:</label>
        <input
          id="break-time"
          type="number"
          v-model.number="breakTimeInput"
          @change="updateBreakTime"
          min="1" />
      </div>
      <div class="ciclos-container">
        <p>Ciclos de Pomodoro completados: {{ worksCompleted }}</p>
        <p>Ciclos de Descanso completados: {{ breaksCompleted }}</p>
        <p>Tiempo total: {{ totalTime }} minutos</p>
        <div class="ciclos-btn">
          <button @click="completeWork(25)">Completar Pomodoro</button>
          <button @click="completeBreak(5)">Completar Descanso</button>
          <button @click="resetStats">Reiniciar Estadísticas</button>
        </div>
      </div>
    </div>
    <AmbientSound2 />
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/_styles.scss";
  .container {
    margin-top: 40px;
    max-width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 20px;

    .pomodoro-setup {
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        margin-top: 10px;
        color: $secondary-color;
        font-size: 30px;
        font-weight: bold;
      }

      .timer {
        margin: 20px auto;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: $light-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: $dark-color;
        border: 5px solid $primary-color;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        p {
          margin: 0;
        }
      }
      .btn-container {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 0;
      }
      .minutes-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        width: 100%;
        align-self: center;
        input {
          font-size: 1em;
          width: 70px;
          padding: 10px;
          border: 2px solid $secondary-color;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.582);
          color: $dark-color;
          transition: border-color 0.3s, box-shadow 0.3s;

          &:hover {
            border-color: darken($secondary-color, 10%);
          }

          &:focus {
            border-color: $primary-color;
            box-shadow: 0 0 8px rgba($primary-color, 0.5);
            outline: none;
          }
        }
      }
      .ciclos-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }
      .ciclos-btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 0;
        gap: 20px;
      }
      button {
        margin-bottom: 20px;
        font-size: 1em;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        background-color: lighten($primary-color, 30%);
        color: $primary-color;
        &:hover {
          color: darken($primary-color, 20%);
          transform: scale(1.05);
        }
        &:active {
          background-color: darken($primary-color, 20%);
        }
      }
      p,
      label {
        color: $primary-color;
        transition: color 0.3s;
        &:hover {
          color: $secondary-color;
        }
      }
    }
  }
</style>
