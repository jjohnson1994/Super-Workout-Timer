import intervalTypes from '@/helpers/IntervalTypes';

const workout1 = { 
  id: 1,
  title: 'Workout A',
  exercises: [
    // {
    //   title: 'Dead Hang',
    //   intervalType: intervalTypes.forTime,
    //   timeOn: 7,
    //   timeOff: 3,
    //   sets: 6,
    //   rest: 30,
    // },
    {
      title: 'Pull Ups',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60,
    },
    {
      title: 'Scapula Shrugs',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60,
    },
    {
      title: 'Offset Pullups',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60,
    },
    {
      title: 'Knee Tucks',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60
    },
    {
      title: 'Front Lever Kicks',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60
    },
    {
      title: 'Toes to bar',
      intervalType: intervalTypes.forReps,
      reps: 8,
      sets: 3,
      rest: 60
    },
    {
      title: 'Floor Leg Lifts',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    },
    {
      title: 'Upper Ab Crunch',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    },
    {
      title: 'Twisting Sit Ups',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    },
    {
      title: 'TRX Pushups',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    },
    {
      title: 'TRX Fly',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    },
    {
      title: 'TRX Rollouts',
      intervalType: intervalTypes.forReps,
      reps: 30,
      sets: 3,
      rest: 60
    }
  ]
};

export default workout1;
