<template>
  <el-main>
    <el-row>
      <el-card class="box-card">
        <h1>{{ currentExercise.title || workout.title }}</h1>
        <h1 id="timerText">
          <span v-if="currentExercise.reps !== undefined">{{ currentExercise.reps }} REPS</span>
          <span v-else>{{ formattedTimeRemaining }}</span>
        </h1>
        <p id="informationText">
          <span>{{ currentExercise.state === 'working' ? 'GO' : 'REST' }} </span>
          <span>Set {{ currentExercise.setIndex }} of {{ currentExercise.sets }}</span>
        </p>
        <el-progress
          :percentage="(currentExercise.setIndex - 1) / currentExercise.sets * 100"
          :show-text="false"
          :color="currentExercise.state === 'working' ? '#FF0000' : '#00FF00'"
        />
        <el-button @click="start" :disabled="isRunning">Start</el-button>
        <el-button id="btnContinue">Continue</el-button>
      </el-card>
    </el-row>    
    <hr>
    <el-row>
      <el-card class="box-card">
        <el-table :data="workout.exercises">
          <el-table-column
            prop="title"
            label="Title"
          />
          <el-table-column
            prop="intervalType"
            label="Type"
          />
          <el-table-column
            prop="timeOn"
            label="Time On"
          />
          <el-table-column
            prop="timeOff"
            label="Time Off"
          />
          <el-table-column
            prop="reps"
            label="Reps"
          />
          <el-table-column
            prop="sets"
            label="Sets"
          />
          <el-table-column
            prop="rest"
            label="Rest"
          />
        </el-table>
      </el-card>
    </el-row>
  </el-main>
</template>

<script>
import intervalTypes from '@/helpers/IntervalTypes';
import workout from '@/helpers/ExampleWorkouts';
import timer from '@/helpers/Timer';
import states from '@/helpers/WorkoutStates';

const millsToSeconds = 1000;
const expandExercisesIntoArray = exercises => {
  return exercises.reduce((acc, exercise, index) => {
    for (let i = 0; i < exercise.sets; i++) {
      const baseDescription = {
        title: exercise.title,
        sets: exercise.sets,
        exerciseIndex: index,
        setIndex: i + 1,
        intervalType: exercise.intervalType
      };

      if (exercise.intervalType === intervalTypes.forTime) {
        acc.push({
          state: states.working,
          time: exercise.timeOn,
          ...baseDescription,
        });

        acc.push({
          state: states.resting,
          rest: exercise.timeOff,
          ...baseDescription
        });
      } else if (exercise.intervalType === intervalTypes.forReps) {
        acc.push({
          state: states.working,
          reps: exercise.reps,
          ...baseDescription
        });

        acc.push({
          state: states.resting,
          rest: exercise.rest,
          ...baseDescription
        });
      }

      if (i >= exercise.sets) {
        if (exercise.intervalType === intervalTypes.forTime) {
          acc.push({
            state: states.resting,
            rest: exercise.rest,
            ...baseDescription
          })
        }
      } 
    }

    return acc;
  }, []);
}

export default {
  name: 'WorkoutPlayer',
  data() {
    return {
      workout,  
      currentExercise: {},
      exercisesArray: [],
      timeRemaining: 0,
      isRunning: false,
    };
  },
  computed: {
    formattedTimeRemaining() {
      const duration = this.timeRemaining;

      let milliseconds = parseInt((duration%1000)/100);
      let seconds = parseInt((duration/1000)%60);
      let minutes = parseInt((duration/(1000*60))%60);
      let hours = parseInt((duration/(1000*60*60))%24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    },
  },
  methods: {
    start() {
      if (this.isRunning) {
        return;
      }

      this.isRunning = true;
      this.exercisesArray = expandExercisesIntoArray(this.workout.exercises);

      const play = async () => {
        const exercise = this.exercisesArray.shift();
        this.currentExercise = exercise;

        if (exercise.intervalType === intervalTypes.forTime && exercise.state === states.working) {
          await timer({
            waitFor: exercise.time * millsToSeconds,
            onTick: ({ remaining }) => {
              this.timeRemaining = remaining;
            },
          });
        } else if (exercise.state === states.working) {
          await new Promise(resolve => {
            const btnStart = document.getElementById('btnContinue');
            btnStart.addEventListener('click', () => {
              resolve();
            });
          });
        } else if (exercise.state === states.resting) {
          await timer({
            waitFor: exercise.rest * millsToSeconds,
            onTick: ({ remaining }) => {
              this.timeRemaining = remaining;
            },
          });
        }

        if (this.exercisesArray.length) {
          play();
        } else {
          this.isRunning = false;
        }
      };

      play();
    },
  },
}
</script>

<style>
  #timerText {
    text-align: center;
    font-size: 60px;
  }
</style>
