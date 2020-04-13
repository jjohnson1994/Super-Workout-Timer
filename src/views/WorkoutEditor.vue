<template>
  <el-main>
    <el-card>
      <el-form v-model="workout" :rules="rules">
        <el-form-item label="Workout Title" prop="title">
          <el-input v-model="workout.title" />
        </el-form-item>
        <el-collapse accordion>
          <template v-for="(exercise, index) in workout.exercises">
            <el-collapse-item :key="index" :title="exercise.title || `New Exercise ${index}`" :name="index">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Exercise Title">
                    <el-input v-model="exercise.title" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Interval Type">
                    <el-select v-model="exercise.intervalType" placeholder="please select your zone">
                      <el-option label="Timed" value="FOR_TIME"></el-option>
                      <el-option label="Reps" value="FOR_REPS"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <template v-if="exercise.intervalType === 'FOR_TIME'">
                  <el-col :span="12">
                    <el-form-item label="Time On (secs)">
                      <el-input v-model="exercise.timeOn" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Time Off (secs)">
                      <el-input v-model="exercise.timeOff" />
                    </el-form-item>
                  </el-col>
                </template>
                <el-col :span="12">
                  <el-form-item v-if="exercise.intervalType === 'FOR_REPS'" label="Reps">
                    <el-input v-model="exercise.reps" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Sets">
                    <el-input v-model="exercise.sets" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Rest (secs)">
                    <el-input v-model="exercise.rest" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>  
          </template>
        </el-collapse>
        <el-button @click="btnAddExerciseOnClick">Add Exercise</el-button>
        <el-button @click="btnSaveWorkoutOnClick">Save Workout</el-button>
      </el-form>
    </el-card>
  </el-main>  
</template>

<script>
const newRandomId = () =>  Math.random().toString(36).substr(2, 9);

export default {
  name: 'WorkoutEditor',
  data() {
    return {
      workout: {
        title: '',
        exercises: [],
      },
      rules: {
        title: [
          { required: true, message: 'A Workout Title is required', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const { id: workoutId } = this.$route.params;

    if (workoutId !== 'new') {
      const workout = JSON.parse(window.localStorage.getItem('workouts')).find(({ id }) => id === workoutId);
      this.workout = workout;
    }
  },
  methods: {
    btnAddExerciseOnClick() {
      this.workout.exercises.push({

      });
    },
    btnSaveWorkoutOnClick() {
      const { id: workoutId } = this.$route.params;
      const workouts = JSON.parse(window.localStorage.getItem('workouts'));

      if (workoutId === 'new') {
        const newWorkouts = [...workouts, {
          id: newRandomId(),
          ...this.workout,
        }];

        window.localStorage.setItem('workouts', JSON.stringify(newWorkouts));
      } else {
        const newWorkouts = [ ...workouts.filter(({ id }) => id !== workoutId), this.workout ];
        window.localStorage.setItem('workouts', JSON.stringify(newWorkouts));
      }
    },
  },
}
</script>

<style>

</style>
