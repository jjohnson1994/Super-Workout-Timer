<template>
  <el-main>
    <el-header><el-button>Create Workout</el-button></el-header>
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
              @click="goToWorkoutEditor(scope.row.id)"
            >
              Edit
            </el-button>
            <el-button
              size="mini"
              @click="goToWorkoutPlayer(scope.row.id)"
            >
              Play
            </el-button>
          </template>
        </el-table-column>
      </el-card>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: 'Workouts',
  data() {
    return {
      workouts: [
        { id: 1, title: 'Workout 1' },
      ],
    };
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
  },
}
</script>

<style>

</style>
