// Array to store logged exercises
/*var loggedExercises = [];

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

// Function to fetch and display exercise details
async function showExercise() {
    // Get the exercise name from the input field
    var exerciseName = document.getElementById('search').value.trim();

    if (exerciseName === '') {
        alert('Please enter an exercise name.');
        return;
    }

    try {
        // Make a fetch request to the backend API
        const response = await fetch(`/api/get/${exerciseName}`);
        const data = await response.json();

        if (response.ok) {
            // Display the exercise details in the designated area
            var exerciseDetails = document.getElementById('exerciseDetails');
            exerciseDetails.innerHTML = `<strong>Name:</strong> ${data.task}, <strong>Sets:</strong> ${data.sets}`;
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to fetch exercise details: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error fetching exercise details:', error);
        alert('An error occurred while fetching exercise details. Please try again later.');
    }
}

// Function to delete exercise
async function deleteExercise() {
    var exerciseName = document.getElementById('search').value.trim();

    if (exerciseName === '') {
        alert('Please enter an exercise name.');
        return;
    }

    try {
        // Make a fetch request to the backend API to delete the exercise
        const response = await fetch(`/api/delete/${exerciseName}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Exercise deleted successfully.');
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to delete exercise: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
        alert('An error occurred while deleting exercise. Please try again later.');
    }
}

// Function to fetch and display all exercises
async function showWorkout() {
    try {
        // Make a fetch request to the backend API to get all exercises
        const response = await fetch('/api/list');
        const data = await response.json();

        if (response.ok) {
            // Display the list of exercises in the designated area
            var exerciseList = document.getElementById('exerciseList');
            exerciseList.innerHTML = '<strong>Logged Exercises:</strong><br>';

            data.forEach(function(exercise) {
                exerciseList.innerHTML += `<div>${exercise.task} - Sets: ${exercise.sets}</div>`;
            });
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to fetch exercises: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error fetching exercises:', error);
        alert('An error occurred while fetching exercises. Please try again later.');
    }
}

// Function to delete all exercises
async function deleteWorkout() {
    try {
        // Make a fetch request to the backend API to delete all exercises
        const response = await fetch('/api/delete/all', {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('All exercises deleted successfully.');
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to delete exercises: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting exercises:', error);
        alert('An error occurred while deleting exercises. Please try again later.');
    }
} */

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
        task: exercise,
        sets: sets,
        reps: []
    };

    // Push exercise object to the loggedExercises array
    loggedExercises.push(exerciseObj);

    // Clear input fields after adding exercise





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
        for (var i = 1; i <= 1; i++) {
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
    var tabelaPonovitev=[];
    // Calculate total reps for all exercises
    loggedExercises.forEach(function(exercise) {
        exercise.reps.forEach(function(input) {
            var reps = parseInt(input.value.trim());
            if (!isNaN(reps) && reps > 0) {
                totalReps += reps;
                tabelaPonovitev.push(reps);
            }
            else(alert(' 0 is not appropriate number of reps u lazy cunt'))
        });
    });

    var exerciseInput = document.getElementById('exercise');
    var setsInput = document.getElementById('sets');

    var exercise = exerciseInput.value;
    var sets = parseInt(setsInput.value);

    var telovadbaObj = {
        task: exercise,
        sets: sets,
        reps: totalReps
    };


    pushObjectToApi('/api/add',telovadbaObj);


    alert('Workout logged -  - - : Total reps = ' + totalReps);

    // Clear logged exercises array
    loggedExercises = [];

    // Update displayed exercises after logging workout
    displayExercises();
}



async function pushObjectToApi(url, object) {
    try {
        console.log(JSON.stringify(object))
        const response = await fetch(url, {
            method: 'POST', // or 'PUT' if you want to update an existing resource
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)

            
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch and display exercise details
async function showExercise() {
    // Get the exercise name from the input field
    var exerciseName = document.getElementById('search').value.trim();

    if (exerciseName === '') {
        alert('Please enter an exercise name.');
        return;
    }

    try {
        // Make a fetch request to the backend API
        const response = await fetch(`/api/get/${exerciseName}`);
        const data = await response.json();

        if (response.ok) {
            // Display the exercise details in the designated area
            var exerciseDetails = document.getElementById('exerciseDetails');
            exerciseDetails.innerHTML = `<strong>Name:</strong> ${data.task}, <strong>Sets:</strong> ${data.sets}`;
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to fetch exercise details: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error fetching exercise details:', error);
        alert('An error occurred while fetching exercise details. Please try again later.');
    }
}

// Function to delete exercise
async function deleteExercise() {
    var exerciseName = document.getElementById('search').value.trim();

    if (exerciseName === '') {
        alert('Please enter an exercise name.');
        return;
    }

    try {
        // Make a fetch request to the backend API to delete the exercise
        const response = await fetch(`/api/delete/${exerciseName}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Exercise deleted successfully.');
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to delete exercise: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
        alert('An error occurred while deleting exercise. Please try again later.');
    }
}

// Function to fetch and display all exercises
async function showWorkout() {
    try {
        // Make a fetch request to the backend API to get all exercises
        const response = await fetch('/api/list');
        const data = await response.json();

        if (response.ok) {
            // Display the list of exercises in the designated area
            var exerciseList = document.getElementById('exerciseList');
            exerciseList.innerHTML = '<strong>Logged Exercises:</strong><br>';

            data.forEach(function(exercise) {
                exerciseList.innerHTML += `<div>${exercise.task} - Sets: ${exercise.sets}</div>`;
            });
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to fetch exercises: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error fetching exercises:', error);
        alert('An error occurred while fetching exercises. Please try again later.');
    }
}

// Function to delete all exercises
async function deleteWorkout() {
    try {
        // Make a fetch request to the backend API to delete all exercises
        const response = await fetch('/api/delete/all', {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('All exercises deleted successfully.');
        } else {
            // Handle error responses from the API
            const errorMessage = await response.text();
            alert(`Failed to delete exercises: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting exercises:', error);
        alert('An error occurred while deleting exercises. Please try again later.');
    }
}

