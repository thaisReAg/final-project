import { defineStore } from "pinia";

export const usePomodoroStore = defineStore("pomodoro", {
  state: () => ({
    timeLeft: 25 * 60,
    workTime: 25 * 60,
    breakTime: 5 * 60,
    isActive: false,
    isWorkTime: true,
    worksCompleted: 0,
    breaksCompleted: 0,
    totalTime: 0,
  }),
  actions: {
    setWorkTime(seconds) {
      this.workTime = seconds;
      if (this.isWorkTime) {
        this.timeLeft = seconds;
      }
    },
    setBreakTime(seconds) {
      this.breakTime = seconds;
      if (!this.isWorkTime) {
        this.timeLeft = seconds;
      }
    },
    start() {
      if (!this.isActive && this.timeLeft > 0) {
        this.isActive = true;
        this.startCountdown();
      }
    },
    pause() {
      this.isActive = false;
      clearInterval(this.interval);
    },
    restart() {
      this.isActive = false;

      this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
      clearInterval(this.interval);
    },
    toggleMode() {
      this.isWorkTime = !this.isWorkTime;
      this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
      this.isActive = false;
      clearInterval(this.interval);
    },
    completeWork() {
      this.worksCompleted += 1;
      this.totalTime += this.workTime;
      this.saveStats();
    },
    completeBreak() {
      this.breaksCompleted += 1;
      this.totalTime += this.breakTime;
      this.saveStats();
    },
    saveStats() {
      localStorage.setItem("worksCompleted", this.worksCompleted.toString());
      localStorage.setItem("breaksCompleted", this.breaksCompleted.toString());
      localStorage.setItem("totalTime", this.totalTime.toString());
    },
    loadStats() {
      const savedWorks = localStorage.getItem("worksCompleted");
      const savedBreaks = localStorage.getItem("breaksCompleted");
      const savedTime = localStorage.getItem("totalTime");

      if (savedWorks) {
        this.worksCompleted = parseInt(savedWorks, 10);
      }

      if (savedBreaks) {
        this.breaksCompleted = parseInt(savedBreaks, 10);
      }

      if (savedTime) {
        this.totalTime = parseInt(savedTime, 10);
      }
    },
    startCountdown() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.interval);
          if (this.isWorkTime) {
            this.completeWork();
          } else {
            this.completeBreak();
          }
          this.toggleMode();
        }
      }, 1000);
    },
    completeWork() {
      this.worksCompleted += 1;
      this.totalTime += this.workTime;
      this.saveStats();
    },
    completeBreak() {
      this.breaksCompleted += 1;
      this.totalTime += this.breakTime;
      this.saveStats();
    },
    resetStats() {
      this.worksCompleted = 0;
      this.breaksCompleted = 0;
      this.totalTime = 0;
      localStorage.removeItem("worksCompleted");
      localStorage.removeItem("breaksCompleted");
      localStorage.removeItem("totalTime");
    },
  },
});
