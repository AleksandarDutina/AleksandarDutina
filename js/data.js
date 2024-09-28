window.onload = init();

function init() {
  // The username and password
  // DO NOT store credentials in your JS file like this
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);

  // Authenticate (dummy API)
  fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      console.log(data);

      const patients = data;

      const patientsLink = document.getElementById("fetch-patient-data");

      // Event listener for the "Patients" navbar link
      patientsLink.addEventListener("click", () => {
        const container = document.getElementById("patient-container");

        // Clear the left-aside (patient list)
        container.innerHTML = "";

        // Dynamically create patient elements from data.js
        patients.forEach((patient, index) => {
          const patientDiv = document.createElement("div");
          patientDiv.className = "patient";
          patientDiv.dataset.index = index;
          patientDiv.innerHTML = `
              <img class="patient-photo" src="${patient.profile_picture}" alt="${patient.name}" />
              <div class="patient-details">
                <span class="patient-name">${patient.name}</span>
                <span class='patient-info'>${patient.gender}, ${patient.age}</span>
              </div>
              <img class="patient-more" src="./img/more_horiz_FILL0_wght300_GRAD0_opsz24.png" alt="More info" />
            `;

          // Append each patient to the container
          container.appendChild(patientDiv);

          // Attach click event to each dynamically added patient
          patientDiv.addEventListener("click", () => {
            displayPatientData(patient);
          });

          // Click event to add Diagnostic List
          patientDiv.addEventListener("click", () => {
            displayDiagnosticList(patient);
          });

          // Click event to add Lab Results
          patientDiv.addEventListener("click", () => {
            displayLabResults(patient);
          });

          // Click event to add Diagnostic History
          patientDiv.addEventListener("click", () => {
            displayDiagnosticHistory(patient);
          });
        });
      });
      // });
    })
    .catch((error) => {
      console.warn(error);
    });
}

// Function to display patient data in the top-aside
function displayPatientData(patient) {
  const topAside = document.querySelector(".top-aside");

  topAside.innerHTML = `
    <img class="big" src="${patient.profile_picture}" alt="${patient.name}" />
    <h1>${patient.name}</h1>
    <div class="patient-dd">
      <div class="patient">
        <img class="patient-photo" src="./img/BirthIcon.png" alt="Birth Icon" />
        <div class="patient-details">
          <span class="patient-name">Date Of Birth</span>
          <span class="patient-info">${new Date(
            patient.date_of_birth
          ).toLocaleDateString()}</span>
        </div>
      </div>
      <div class="patient">
        <img class="patient-photo" src="./img/FemaleIcon.png" alt="Gender Icon" />
        <div class="patient-details">
          <span class="patient-name">Gender</span>
          <span class="patient-info">${patient.gender}</span>
        </div>
      </div>
      <div class="patient">
        <img class="patient-photo" src="./img/PhoneIcon.png" alt="Phone Icon" />
        <div class="patient-details">
          <span class="patient-name">Contact Info.</span>
          <span class="patient-info">${patient.phone_number}</span>
        </div>
      </div>
      <div class="patient">
        <img class="patient-photo" src="./img/PhoneIcon.png" alt="Emergency Contact Icon" />
        <div class="patient-details">
          <span class="patient-name">Emergency Contacts</span>
          <span class="patient-info">${patient.emergency_contact}</span>
        </div>
      </div>
      <div class="patient">
        <img class="patient-photo" src="./img/InsuranceIcon.png" alt="Insurance Icon" />
        <div class="patient-details">
          <span class="patient-name">Insurance Provider</span>
          <span class="patient-info">${patient.insurance_type}</span>
        </div>
      </div>
    </div>
    <a href="#"><h4>Show All Information</h4></a>
  `;
}

// Function to add the Diagnostic List
function displayDiagnosticList(patient) {
  const bottomSection = document.getElementById("bottom-section");

  bottomSection.innerHTML = "";

  patient.diagnostic_list.forEach((diagnostic) => {
    bottomSection.innerHTML += `
    <tr>
      <td>${diagnostic.name}</td>
      <td>${diagnostic.description}</td>
      <td>${diagnostic.status}</td>
    </tr>
  `;
  });
}

// Function to add the Lab Results
function displayLabResults(patient) {
  const bottomAside = document.getElementById("bottom-aside");

  bottomAside.innerHTML = "";

  patient.lab_results.forEach((result) => {
    bottomAside.innerHTML += `
      <div class="lab-result">
        <h5>${result}</h5>
        <img
            src="./img/download_FILL0_wght300_GRAD0_opsz24 (1).png"
            alt=""
        />
      </div>
    `;
  });
}

// Function to add the diagnostic history
function displayDiagnosticHistory(patient) {
  const topSection = document.getElementById("top-section");

  topSection.innerHTML = "";

  patient.diagnosis_history.forEach((history) => {
    topSection.innerHTML = `
      <div class="patient-detail">
        <img src="./img/respiratory rate.svg" alt="" />
        <h3>Respiratory Rate</h3>
        <h1>${history.respiratory_rate.value} bpm</h1>
        <h4>${history.respiratory_rate.levels}</h4>
      </div>
      <div class="patient-detail">
        <img src="./img/temperature.svg" alt="" />
        <h3>Temperature</h3>
        <h1>${history.temperature.value}°F</h1>
        <h4>${history.temperature.levels}</h4>
      </div>
      <div class="patient-detail">
        <img src="./img/HeartBPM.svg" alt="" />
        <h3>Heart Rate</h3>
        <h1>${history.heart_rate.value} bpm</h1>
        <div class="arrow-down">
        <span><img class="arrDown" src="./img/ArrowDown.svg" alt=""
                /></span>
        <span class="">${history.heart_rate.levels}</span>
        </div>
      </div>
    `;
  });
}
