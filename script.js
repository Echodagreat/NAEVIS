// #placeholder: Later, this can point to the Python backend endpoint.
// Example: const API_URL = "http://127.0.0.1:5000/predict";
const API_URL = "";

let probabilityChart;
let featureChart;

// #placeholder: These values are ONLY for the frontend preview.
// They must be replaced by the real prediction probabilities from the backend.
const placeholderProbabilities = {
    "Good Condition": 70,
    "Monitor": 20,
    "Needs Maintenance": 10
};

// #placeholder: Create the probability chart using placeholder values.
function createProbabilityChart() {
    const ctx = document.getElementById("probabilityChart");

    probabilityChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(placeholderProbabilities),
            datasets: [{
                data: Object.values(placeholderProbabilities),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#8fa2ba",
                        padding: 18
                    }
                }
            }
        }
    });
}

// #placeholder: Create feature chart for the frontend design.
// Actual feature values can be displayed here after backend integration.
function createFeatureChart() {
    const ctx = document.getElementById("featureChart");

    featureChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Mileage",
                "Fuel",
                "Temperature",
                "Maintenance",
                "Usage",
                "Load",
                "Age",
                "Breakdown"
            ],
            datasets: [{
                label: "Input Value",
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: "#8fa2ba"
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#8fa2ba"
                    },
                    grid: {
                        color: "#21334c"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#8fa2ba"
                    }
                }
            }
        }
    });
}

// #placeholder: Collect the exact nine model input fields.
function getFormData() {
    return {
        vehicle_type: document.getElementById("vehicle_type").value,
        mileage: document.getElementById("mileage").value,
        fuel_consumption: document.getElementById("fuel_consumption").value,
        engine_temperature: document.getElementById("engine_temperature").value,
        maintenance_history: document.getElementById("maintenance_history").value,
        usage_frequency: document.getElementById("usage_frequency").value,
        load_weight: document.getElementById("load_weight").value,
        vehicle_age: document.getElementById("vehicle_age").value,
        breakdown_history: document.getElementById("breakdown_history").value
    };
}

// #placeholder: This currently shows the prepared frontend only.
// Later this function will send getFormData() to the Python API.
async function showPlaceholder() {
    const data = getFormData();

    document.getElementById("predictionLabel").textContent = "Placeholder Result";
    document.getElementById("predictionText").textContent =
        "The actual NAEVIS model is not connected yet.";

    document.getElementById("resultIcon").textContent = "P";
    document.getElementById("recommendationText").textContent =
        "Placeholder recommendation. The real recommendation will be generated from the model output.";

    // #placeholder: Future backend request:
    // const response = await fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    // });
    //
    // const result = await response.json();
    // updateResults(result);

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });

    updateFeatureChart(data);
}

// #placeholder: This function will receive the real prediction response later.
function updateResults(result) {
    document.getElementById("predictionLabel").textContent = result.prediction;
    document.getElementById("predictionText").textContent =
        "Prediction returned by the NAEVIS model.";

    // #placeholder: Replace these with values returned by the backend.
    if (result.probabilities) {
        probabilityChart.data.datasets[0].data = [
            result.probabilities["Good Condition"] || 0,
            result.probabilities["Monitor"] || 0,
            result.probabilities["Needs Maintenance"] || 0
        ];

        probabilityChart.update();
    }

    document.getElementById("recommendationText").textContent =
        result.recommendation || "No recommendation returned.";
}

// #placeholder: Update the preview chart using entered values.
function updateFeatureChart(data) {
    featureChart.data.datasets[0].data = [
        Number(data.mileage) || 0,
        Number(data.fuel_consumption) || 0,
        Number(data.engine_temperature) || 0,
        Number(data.maintenance_history) || 0,
        Number(data.usage_frequency) || 0,
        Number(data.load_weight) || 0,
        Number(data.vehicle_age) || 0,
        Number(data.breakdown_history) || 0
    ];

    featureChart.update();
}

// #placeholder: Keep the input summary synchronized with the form.
function updateSummary() {
    const fields = [
        "vehicle_type",
        "mileage",
        "fuel_consumption",
        "engine_temperature",
        "maintenance_history",
        "usage_frequency",
        "load_weight",
        "vehicle_age",
        "breakdown_history"
    ];

    fields.forEach(field => {
        const value = document.getElementById(field).value;
        document.getElementById("sum_" + field).textContent = value || "-";
    });
}

function clearForm() {
    document.getElementById("assessmentForm").reset();
    updateSummary();

    document.getElementById("predictionLabel").textContent =
        "Awaiting Assessment";

    document.getElementById("predictionText").textContent =
        "Run an assessment to receive the vehicle condition prediction.";

    document.getElementById("resultIcon").textContent = "?";

    document.getElementById("recommendationText").textContent =
        "Model recommendation placeholder. This area will contain maintenance guidance returned by the backend.";

    featureChart.data.datasets[0].data =
        [0, 0, 0, 0, 0, 0, 0, 0];

    featureChart.update();
}

function goTo(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("assessmentForm").addEventListener("input", updateSummary);

document.getElementById("assessmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // #placeholder: Keep this as showPlaceholder() until the Python model API is ready.
    showPlaceholder();
});

createProbabilityChart();
createFeatureChart();
updateSummary();
