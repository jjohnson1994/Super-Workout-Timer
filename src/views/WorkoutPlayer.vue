<template>
  <el-main>
    <el-row>
      <el-card class="box-card">
        <h1>{{ currentExercise.title || workout.title }}</h1>
        <p>{{ formattedTimeRemaining }}</p>
        <p v-if="currentExercise.reps !== undefined">{{ currentExercise.reps }}</p>
        <p>{{ currentExercise.state }}</p>
        <p>Set {{ currentExercise.setIndex }} of {{ currentExercise.sets }}</p>
        <el-progress :percentage="currentExercise.setIndex / currentExercise.sets * 100" :color="currentExercise.state === 'working' ? '#FF0000' : '#00FF00'"/>
        <el-button @click="start">Start</el-button>
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
const intervalTypes = {
  forTime: 'FOR_TIME',
  forReps: 'FOR_REPS',
};

const workout = { 
  title: 'Workout A',
  exercises: [
    {
      title: 'Dead Hang',
      intervalType: intervalTypes.forTime,
      timeOn: 7,
      timeOff: 3,
      sets: 6,
      rest: 30,
    },
    {
      title: 'Pushups',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 30
    },
    {
      title: 'Sit Ups',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 30
    },
    {
      title: 'Squats',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 30
    }
  ]
};

function* exerciseGenerator(exercises) {
  let exerciseIndex = 0;
  let setIndex = 0;

  while (exerciseIndex < exercises.length) {
    const exercise = exercises[exerciseIndex];

    setIndex += 1;

    const baseDescription = {
      title: exercise.title,
      sets: exercise.sets,
      exerciseIndex,
      setIndex,
      intervalType: exercise.intervalType
    };

    if (exercise.intervalType === intervalTypes.forTime) {
      yield {
        state: states.working,
        time: exercise.timeOn,
        ...baseDescription,
      }

      yield {
        state: states.resting,
        rest: exercise.timeOff,
        ...baseDescription
      }
    } else if (exercise.intervalType === intervalTypes.forReps) {
      yield {
        state: states.working,
        reps: exercise.reps,
        ...baseDescription
      }

      yield {
        state: states.resting,
        rest: exercise.rest,
        ...baseDescription
      }
    }

    if (setIndex >= exercise.sets) {
      exerciseIndex += 1;
      setIndex = 0;

      if (exercise.intervalType === intervalTypes.forTime) {
        yield {
          state: states.resting,
          rest: exercise.rest,
          ...baseDescription
        }
      }
    }
  }

  yield {
    title: 'Workout Complete!'
  }
}

const states = {
  notStarted: 'not_started',
  working: 'working',
  resting: 'resting',
};

const millsToSeconds = 100;

const timer = ({ waitFor, onTick, intervalLength = 25 }) => {
  let waited = 0;

  return new Promise((resolve) => {
    const windowInterval = window.setInterval(() => {
      waited += intervalLength;
      onTick({ waited, remaining: waitFor - waited });

      if (waited >= waitFor) {
        resolve();
        window.clearInterval(windowInterval);
      }
    }, intervalLength);
  });
};

export default {
  name: 'WorkoutPlayer',
  data() {
    return {
      workout,  
      currentExercise: {},
      timeRemaining: 0,
    };
  },
  computed: {
    formattedTimeRemaining() {
      const formattedTimeRemaining = `${Math.round((this.timeRemaining / 1000) * 100) / 100}`.padEnd(5, '0');
      return formattedTimeRemaining;
    },
  },
  methods: {
    start() {
      const generator = exerciseGenerator(this.workout.exercises);
      const play = async exercise => {
        this.currentExercise = exercise;

        if (exercise.intervalType === intervalTypes.forTime && exercise.state === states.working) {
          await timer({
            waitFor: exercise.time * millsToSeconds,
            onTick: ({ waited, remaining }) => {
              console.log(waited, remaining);
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
            onTick: ({ waited, remaining }) => {
              console.log(waited, remaining);
              this.timeRemaining = remaining;
            },
          });
        }

        const { value: nextExercise } = generator.next();
        if (nextExercise) {
          play(nextExercise);
        }
      };

      const exercise = generator.next().value;
      play(exercise);
    },
  },
}
</script>
