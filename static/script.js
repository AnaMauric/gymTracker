// Array to store logged exercises
var loggedExercises = [];

// Function to add exercise to the list
function addExercise() {
    var exerciseInput = document.getElementById('exercise');
    var setsInput = document.getElementById('sets');

    var exercise = exerciseInput.value;
    var sets = parseInt(setsInput.value);

    if (exercise.trim() === '' || isNaN(sets) || sets <= 0) {
        alert('Please enter valid exercise and number of sets.');
        return;
    }

    // Create exercise object
    var exerciseObj = {
        name: exercise,
        sets: sets,
        reps: []
    };

    // Push exercise object to the loggedExercises array
    loggedExercises.push(exerciseObj);

    // Clear input fields after adding exercise
    exerciseInput.value = '';
    setsInput.value = '';

    // Update the displayed exercises
    displayExercises();
}

// Function to update the displayed exercises
function displayExercises() {
    var exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = ''; // Clear previous exercises

    // Iterate through logged exercises
    loggedExercises.forEach(function(exercise, index) {
        var exerciseItem = document.createElement('div');
        exerciseItem.className = 'exercise-item';

        var exerciseName = document.createElement('strong');
        exerciseName.textContent = exercise.name;
        exerciseItem.appendChild(exerciseName);

        // Display sets and reps
        for (var i = 1; i <= exercise.sets; i++) {
            var repsInput = document.createElement('input');
            repsInput.type = 'number';
            repsInput.placeholder = 'Reps for Set ' + i;
            repsInput.style.marginLeft = '10px';
            exerciseItem.appendChild(repsInput);
            exercise.reps.push(repsInput); // Add reps input to exercise object
        }

        exerciseList.appendChild(exerciseItem);
    });

    // Add "Log Workout" button
    var logButtonContainer = document.getElementById('logButtonContainer');
    logButtonContainer.innerHTML = ''; // Clear previous button

    var logButton = document.createElement('button');
    logButton.textContent = 'Log Workout';
    logButton.className = 'log-button';
    logButton.style.backgroundColor = '#9966ff';
    logButton.onclick = function() {
        logWorkout();
    };
    logButtonContainer.appendChild(logButton);
}

// Function to log workout
function logWorkout() {
    var totalReps = 0;

    // Calculate total reps for all exercises
    loggedExercises.forEach(function(exercise) {
        exercise.reps.forEach(function(input) {
            var reps = parseInt(input.value.trim());
            if (!isNaN(reps) && reps > 0) {
                totalReps += reps;
            }
        });
    });

    alert('Workout logged: Total reps = ' + totalReps);

    // Clear logged exercises array
    loggedExercises = [];

    // Update displayed exercises after logging workout
    displayExercises();
}
