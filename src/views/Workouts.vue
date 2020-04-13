<template>
  <el-main>
    <el-header><el-button @click="btnNewWorkoutOnClick">Create Workout</el-button></el-header>
    <el-card>
      <el-table :data="workouts">
        <el-table-column
          prop="title"
          label="Workout"
        />
        <el-card class="box-card">
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="goToWorkoutPlayer(scope.row.id)"
              >
                Play
              </el-button>
              <el-button
                size="mini"
                @click="goToWorkoutEditor(scope.row.id)"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-card>
      </el-table>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: 'Workouts',
  data() {
    return {
      workouts: [],
    };
  },
  mounted() {
    this.workouts = JSON.parse(window.localStorage.getItem('workouts'));
  },
  methods: {
    goToWorkoutEditor(workoutId) {
      this.$router.push({
        name: 'WorkoutEditor',
        params: { id: workoutId }
      });
    },
    goToWorkoutPlayer(workoutId) {
      this.$router.push({
        name: 'WorkoutPlayer',
        params: { id: workoutId }
      });
    },
    btnNewWorkoutOnClick() {
      this.$router.push({
        name: 'WorkoutEditor',
        params: { id: 'new' }
      });
    },
  },
}
</script>

<style>

</style>
