import { defineStore } from "pinia";

export const usePomodoroStore = defineStore("pomodoro", {
  state: () => ({
    timeLeft: 25 * 60, // tiempo inicial en segundos
    workTime: 25 * 60,
    breakTime: 5 * 60,
    isActive: false,
    isWorkTime: true, // true para tiempo de trabajo, false para descanso
  }),
  actions: {
    setWorkTime(seconds) {
      this.workTime = seconds;
      if (this.isWorkTime) {
        this.timeLeft = seconds; // Ajusta timeLeft si estamos en workTime
      }
    },
    setBreakTime(seconds) {
      this.breakTime = seconds;
      if (!this.isWorkTime) {
        this.timeLeft = seconds; // Ajusta timeLeft si estamos en breakTime
      }
    },
    iniciar() {
      if (!this.isActive && this.timeLeft > 0) {
        this.isActive = true;
        // La lógica de cuenta regresiva deberá ser implementada en el componente, usando este estado para controlar.
      }
    },
    pausar() {
      this.isActive = false;
      // Detiene el temporizador sin reiniciar el tiempo. La implementación exacta del intervalo será en el componente.
    },
    reiniciar() {
      this.isActive = false;
      // Ajusta el tiempo restante dependiendo del estado actual (trabajo/descanso)
      this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
    },
    toggleMode() {
      // Cambia entre modos de trabajo y descanso, ajustando timeLeft apropiadamente.
      this.isWorkTime = !this.isWorkTime;
      this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
      this.isActive = false; // Opcionalmente, reinicia el estado activo a falso al cambiar de modo.
    },
  },
});
