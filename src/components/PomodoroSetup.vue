<script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from "vue";
  import { usePomodoroStore } from "../stores/pomodoro.js";
  import alarmSoundPath from "../assets/alarma.mp3";
  import AmbientSound from "./AmbientSound.vue";

  const pomodoroStore = usePomodoroStore();
  const alarmSound = new Audio(alarmSoundPath);

  const timeLeft = computed(() => pomodoroStore.timeLeft);
  const isWorking = computed(() => pomodoroStore.isWorkTime);
  const isActive = computed(() => pomodoroStore.isActive);
  const worksCompleted = computed(() => pomodoroStore.worksCompleted);
  const breaksCompleted = computed(() => pomodoroStore.breaksCompleted);
  const totalTime = computed(() => pomodoroStore.totalTime / 60);

  const workTimeInput = ref(pomodoroStore.workTime / 60);
  const breakTimeInput = ref(pomodoroStore.breakTime / 60);

  function updateWorkTime() {
    if (workTimeInput.value > 0) {
      pomodoroStore.setWorkTime(workTimeInput.value * 60);
    }
  }

  function updateBreakTime() {
    if (breakTimeInput.value > 0) {
      pomodoroStore.setBreakTime(breakTimeInput.value * 60);
    }
  }

  function startTimer() {
    pomodoroStore.start();
  }

  function pauseTimer() {
    pomodoroStore.pause();
  }

  function resetTimer() {
    pomodoroStore.restart();
  }

  function toggleMode() {
    pomodoroStore.toggleMode();
  }
  function completeWork() {
    pomodoroStore.completeWork();
  }

  function completeBreak() {
    pomodoroStore.completeBreak();
  }

  function resetStats() {
    pomodoroStore.resetStats();
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
    (newVal) => {
      if (newVal === 0) {
        playAlarm();
      }
    },
    { flush: "pre" }
  );

  onMounted(() => {
    pomodoroStore.loadStats();
  });

  onUnmounted(() => {
    pomodoroStore.pausar();
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
        <button @click="startTimer">Start</button>
        <button @click="pauseTimer">Pause</button>
        <button @click="resetTimer">Restart</button>
      </div>
      <button
        class="toggle-btn"
        @click="toggleMode">
        {{ isWorking ? "Switch to Break" : "Switch to Work" }}
      </button>
      <div class="minutes-container">
        <label for="work-time">Working time:</label>
        <input
          id="work-time"
          type="number"
          v-model.number="workTimeInput"
          @change="updateWorkTime"
          min="1" />
      </div>
      <div class="minutes-container">
        <label for="break-time">Break time:</label>
        <input
          id="break-time"
          type="number"
          v-model.number="breakTimeInput"
          @change="updateBreakTime"
          min="1" />
      </div>
      <div class="ciclos-container">
        <p>Completed Work: {{ worksCompleted }}</p>
        <p>Completed Break: {{ breaksCompleted }}</p>
        <p>Total Time: {{ totalTime }} minutes</p>
        <div class="ciclos-btn">
          <button @click="completeWork(25)">Complete Work</button>
          <button @click="completeBreak(5)">Complete Break</button>
          <button @click="resetStats">Reset Statistics</button>
        </div>
      </div>
    </div>
    <AmbientSound />
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
