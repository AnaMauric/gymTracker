// Array to store logged exercises
var loggedExercises = [];



// Function to add exercise to loggedexercise list, reps are empty. kliče displayexercise.
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

    // Update the displayed exercises
    displayExercises();
}




// za vsak set naredi okence za vpis repsov. repse shrani v loggedExercise. kliče log workout
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
    logButton.textContent = 'Log Exercise';
    logButton.className = 'log-button';
    logButton.style.backgroundColor = '#9966ff';
    logButton.onclick = function() {
        logWorkout();
    };
    logButtonContainer.appendChild(logButton);
}



// Function to log the workout
function logWorkout() {
    // Convert the reps from input elements to numbers
    const exercisesToSend = loggedExercises.map(exercise => {
        return {
            task: exercise.task,
            sets: exercise.sets,
            reps: exercise.reps.map(repInput => parseInt(repInput.value))
        };
    });

    // Define the API endpoint
    const apiEndpoint = "http://212.101.137.108:8000/api/log-workout"; 

    // Send a POST request to the API endpoint
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exercisesToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        //alert("Workout logged successfully!");
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to log workout.");
    });
}



function deleteExercise() {
    // Get exercise name from input field and trim whitespace
    var exerciseName = document.getElementById('search').value.trim();

    // Check if exerciseName is not empty
    if (exerciseName === '') {
        alert('Please enter exercise name to delete.');
        return;
    }

    // Endpoint URL for deleting exercise
    var endpoint = `http://212.101.137.108:8000/api/delete-exercise/${exerciseName}`;

    // Fetch API request to delete exercise
    fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful response
        console.log(data); // Log the response data
        alert(`Exercise '${exerciseName}' deleted successfully.`);
        // Optionally update UI or perform any additional actions
    })
    .catch(error => {
        // Handle error cases
        console.error('Error:', error);
        alert(`Failed to delete exercise '${exerciseName}'. Please try again.`);
    });
}


function showExercise() {
    // Get exercise name from input field and trim whitespace
    var exerciseName = document.getElementById('search').value.trim();

    // Check if exerciseName is not empty
    if (exerciseName === '') {
        alert('Please enter exercise name to search.');
        return;
    }

    // Endpoint URL for fetching exercise details
    var endpoint = `http://212.101.137.108:8000/api/get-exercise/${exerciseName}`;

    // Fetch API request to get exercise details
    fetch(endpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful response
        console.log(data); // Log the response data
        // Example: Update UI to display exercise details
        var exerciseDetailsDiv = document.getElementById('exerciseDetails');
        exerciseDetailsDiv.innerHTML = `
            <p><strong>Exercise Name:</strong> ${data.task}</p>
            <p><strong>Sets:</strong> ${data.sets}</p>
            <p><strong>Reps:</strong> ${data.reps.join(', ')}</p>
        `;
        // Optionally update UI or perform any additional actions
    })
    .catch(error => {
        // Handle error cases
        console.error('Error:', error);
        alert(`Failed to fetch exercise '${exerciseName}'. Please try again.`);
    });
}


function resetInputFields() {
    document.getElementById('exercise').value = ''; // Clear exercise input
    document.getElementById('sets').value = ''; // Clear sets input
    document.getElementById('search').value = ''; // Clear search input
}


// Reset input fields when the page loads
document.addEventListener('DOMContentLoaded', function() {
    resetInputFields();
});