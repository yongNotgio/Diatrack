import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import "./SecretaryDashboard.css";
import logo from "../picture/logo.png"; // Import the logo image

// Import Chart.js components - These will no longer be directly used for the bars but might be used elsewhere
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2'; // Doughnut will be removed for the bars

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


const PatientSummaryWidget = ({ totalPatients, pendingLabResults, preOp, postOp, lowRisk, moderateRisk, highRisk }) => {

  // Calculate percentages for Patient Categories
  const totalPatientCategories = preOp + postOp;
  const preOpPercentage = totalPatientCategories > 0 ? (preOp / totalPatientCategories) * 100 : 0;
  const postOpPercentage = totalPatientCategories > 0 ? (postOp / totalPatientCategories) * 100 : 0;

  // Calculate percentages for Pre-Op Risk Classes
  const totalRiskClasses = lowRisk + moderateRisk + highRisk;
  const lowRiskPercentage = totalRiskClasses > 0 ? (lowRisk / totalRiskClasses) * 100 : 0;
  const moderateRiskPercentage = totalRiskClasses > 0 ? (moderateRisk / totalRiskClasses) * 100 : 0;
  const highRiskPercentage = totalRiskClasses > 0 ? (highRisk / totalRiskClasses) * 100 : 0;


  return (
    <>
      <div className="summary-widget-grid">
        <div className="summary-widget total-patients">
          <div className="summary-widget-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="summary-widget-content">
            <h3>Total Patients</h3>
            <p className="summary-number">{totalPatients}</p>
            <p className="summary-subtitle">Patients who have been registered to the system</p>
          </div>
        </div>
        <div className="summary-widget pending-lab-results">
          <div className="summary-widget-icon">
            <i className="fas fa-hourglass-half"></i>
          </div>
          <div className="summary-widget-content">
            <h3>Pending Lab Results</h3>
            <p className="summary-number">{pendingLabResults}</p>
            <p className="summary-subtitle">Patients who have consulted the doctor, but still haven't turned over test results</p>
          </div>
        </div>
      </div>
      <div className="patient-categories-widget"> {/* Replaced inline style with class */}
        <h3>
          Patient Categories
        </h3>
        <div className="progress-bars-container"> {/* Replaced inline style with class */}
          {/* Pre-Op Bar */}
          <div className="progress-bar-row"> {/* Replaced inline style with class */}
            <span className="progress-count">{preOp}</span> {/* Replaced inline style with class */}
            <div className="progress-bar-background"> {/* Replaced inline style with class */}
              <div className="progress-bar-fill progress-bar-pre-op" style={{ width: `${preOpPercentage}%` }}></div> {/* Replaced inline style with class, kept width */}
            </div>
          </div>
          {/* Post-Op Bar */}
          <div className="progress-bar-row"> {/* Replaced inline style with class */}
            <span className="progress-count">{postOp}</span> {/* Replaced inline style with class */}
            <div className="progress-bar-background"> {/* Replaced inline style with class */}
              <div className="progress-bar-fill progress-bar-post-op" style={{ width: `${postOpPercentage}%` }}></div> {/* Replaced inline style with class, kept width */}
            </div>
          </div>
        </div>
        <div className="legend-container"> {/* Replaced inline style with class */}
          <div className="legend-item"> {/* Replaced inline style with class */}
            <span className="legend-color-box legend-color-pre-op"></span> {/* Replaced inline style with class */}
            Pre-Op
          </div>
          <div className="legend-item"> {/* Replaced inline style with class */}
            <span className="legend-color-box legend-color-post-op"></span> {/* Replaced inline style with class */}
            Post-Op
          </div>
        </div>
      </div>

      <div className="risk-classes-widget"> {/* Replaced inline style with class */}
        <h3>

          Pre-Op Risk Classes
        </h3>
        <div className="progress-bars-container"> {/* Replaced inline style with class */}
          {/* Low Risk Bar */}
          <div className="progress-bar-row"> {/* Replaced inline style with class */}
            <span className="progress-count">{lowRisk}</span> {/* Replaced inline style with class */}
            <div className="progress-bar-background"> {/* Replaced inline style with class */}
              <div className="progress-bar-fill progress-bar-low-risk" style={{ width: `${lowRiskPercentage}%` }}></div> {/* Replaced inline style with class, kept width */}
            </div>
          </div>
          {/* Moderate Risk Bar */}
          <div className="progress-bar-row"> {/* Replaced inline style with class */}
            <span className="progress-count">{moderateRisk}</span> {/* Replaced inline style with class */}
            <div className="progress-bar-background"> {/* Replaced inline style with class */}
              <div className="progress-bar-fill progress-bar-moderate-risk" style={{ width: `${moderateRiskPercentage}%` }}></div> {/* Replaced inline style with class, kept width */}
            </div>
          </div>
          {/* High Risk Bar */}
          <div className="progress-bar-row"> {/* Replaced inline style with class */}
            <span className="progress-count">{highRisk}</span> {/* Replaced inline style with class */}
            <div className="progress-bar-background"> {/* Replaced inline style with class */}
              <div className="progress-bar-fill progress-bar-high-risk" style={{ width: `${highRiskPercentage}%` }}></div> {/* Replaced inline style with class, kept width */}
            </div>
          </div>
        </div>
        <div className="legend-container"> {/* Replaced inline style with class */}
          <div className="legend-item"> {/* Replaced inline style with class */}
            <span className="legend-color-box legend-color-low-risk"></span> {/* Replaced inline style with class */}
            Low Risk
          </div>
          <div className="legend-item"> {/* Replaced inline style with class */}
            <span className="legend-color-box legend-color-moderate-risk"></span> {/* Replaced inline style with class */}
            Moderate Risk
          </div>
          <div className="legend-item"> {/* Replaced inline style with class */}
            <span className="legend-color-box legend-color-high-risk"></span> {/* Replaced inline style with class */}
            High Risk
          </div>
        </div>
      </div>
    </>
  );
};

// ... (rest of the SecretaryDashboard component remains unchanged) ...
const SecretaryDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [linkedDoctors, setLinkedDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    contactInfo: "",
    middleName: "",
    gender: "",
    address: "",
    emergencyContactNumber: "",
    diabetesType: "",
    allergies: "",
    footUlcersAmputation: "",
    eyeIssues: "",
    kidneyIssues: "",
    stroke: "",
    heartAttack: "",
    hypertensive: "",
    smokingStatus: "",
    monitoringFrequencyGlucose: "",
    lastDoctorVisit: "",
    lastEyeExam: "",
    preparedBy: "", // This will be set by the secretary's ID
  });
  const [medications, setMedications] = useState([{ drugName: "", dosage: "", frequency: "", prescribedBy: "" }]);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [labEntryStep, setLabEntryStep] = useState(1); // Corrected to use useState
  const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPatientStep, setCurrentPatientStep] = useState(0);

  // State for chart data (dynamically fetched)
  const [totalPatientsCount, setTotalPatientsCount] = useState(0);
  const [pendingLabResultsCount, setPendingLabResultsCount] = useState(0);
  const [preOpCount, setPreOpCount] = useState(0);
  const [postOpCount, setPostOpCount] = useState(0);
  const [lowRiskCount, setLowRiskCount] = useState(0);
  const [moderateRiskCount, setModerateRiskCount] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);

  const [appointmentsToday, setAppointmentsToday] = useState([]);

  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    time: "",
    notes: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPatientConfirmationModal, setShowPatientConfirmationModal] = useState(false);

  // New state for lab result inputs
  const [labResults, setLabResults] = useState({
    selectedPatientForLab: null, // To store the patient object selected for lab entry
    dateSubmitted: "",
    hba1c: "", // Keep this lowercase for the state variable
    creatinine: "",
    gotAst: "",
    gptAlt: "",
    cholesterol: "",
    triglycerides: "",
    hdlCholesterol: "",
    ldlCholesterol: "",
  });


  const steps = [
    "Demographics",
    "Diabetes History",
    "Complication History",
    "Lifestyle",
    "Assignment",
  ];

  useEffect(() => {
    if (user && user.secretary_id) {
      const initializeDashboard = async () => {
        await fetchLinkedDoctors();
        await fetchAppointmentsToday();
        // fetchPatients will be called by the linkedDoctors useEffect
      };
      initializeDashboard();
    } else {
      console.error("User or secretary_id is undefined");
      setMessage("Error: Secretary account not loaded properly.");
    }
  }, [user]);

  // This useEffect will run when linkedDoctors changes, and then fetch patients and update counts
  useEffect(() => {
    if (linkedDoctors.length > 0 && user && user.secretary_id) {
      fetchPatients();
    } else if (linkedDoctors.length === 0 && user && user.secretary_id) {
      // Reset all patient-related states if no doctors are linked
      setPatients([]);
      setTotalPatientsCount(0);
      setPreOpCount(0);
      setPostOpCount(0);
      setLowRiskCount(0);
      setModerateRiskCount(0);
      setHighRiskCount(0);
      setPendingLabResultsCount(0);
    }
  }, [linkedDoctors, user]); // Dependencies ensure it runs when doctors are fetched

  const fetchLinkedDoctors = async () => {
    const { data, error } = await supabase
      .from("secretary_doctor_links")
      .select("*, doctors (doctor_id, first_name, last_name)")
      .eq("secretary_id", user.secretary_id);

    if (!error && data) {
      const uniqueDoctors = data
        .filter(d => d.doctors)
        .map(d => ({
          doctor_id: d.doctors.doctor_id,
          doctor_name: `${d.doctors.first_name} ${d.doctors.last_name}`
        }));
      setLinkedDoctors(uniqueDoctors);
    } else {
      console.error(error);
      setMessage("Error fetching linked doctors or no links found");
    }
  };

  const fetchPatients = async () => {
    const doctorIds = linkedDoctors.map(d => d.doctor_id);
    if (doctorIds.length === 0) {
      setPatients([]);
      setTotalPatientsCount(0);
      setPreOpCount(0);
      setPostOpCount(0);
      setLowRiskCount(0);
      setModerateRiskCount(0);
      setHighRiskCount(0);
      setPendingLabResultsCount(0);
      return;
    }

    const { data, error } = await supabase
      .from("patients")
      // Select all patient fields. Ensure 'phase', 'risk_classification', 'lab_status' are selected.
      .select("*, doctors (doctor_id, first_name, last_name)");

    if (!error) {
      const filtered = data.filter(patient => doctorIds.includes(patient.preferred_doctor_id));
      setPatients(filtered);
      setTotalPatientsCount(filtered.length);

      // Calculate counts for charts
      let preOp = 0;
      let postOp = 0;
      let lowRisk = 0;
      let moderateRisk = 0;
      let highRisk = 0;
      let pendingLabs = 0; // Keep this, as it still reflects a UI count

      filtered.forEach(patient => {
          // *** ADD THIS console.log to see the actual value of patient.phase ***
          console.log(`Patient: ${patient.first_name} ${patient.last_name}, Phase: ${patient.phase}`);

          // Patient Categories (using 'phase' column as per your instruction)
          // CORRECTED: Now checks for "Pre-Operative" and "Post-Operative" exactly
          if (patient.phase === 'Pre-Operative') { // Corrected from 'Pre-Operative Phase'
              preOp++;
          } else if (patient.phase === 'Post-Operative') { // Corrected from 'Post-Operative Phase'
              postOp++;
          }

          // Risk Classification (remains as is, assuming 'low', 'medium', 'high' lowercase in DB or handled by .toLowerCase())
          const risk = (patient.risk_classification || '').toLowerCase();
          if (risk === 'low') {
              lowRisk++;
          } else if (risk === 'medium') { // Assuming 'Medium' for moderate risk
              moderateRisk++;
          } else if (risk === 'high') {
              highRisk++;
          }

          // Pending Lab Results (keeping this logic for now, even if lab_status column is not yet in DB)
          // It will just count patients where this property might be 'Awaiting' or undefined.
          if (patient.lab_status === 'Awaiting') {
              pendingLabs++;
          }
      });

      // *** ADD THIS console.log to see the final counts before setting state ***
      console.log(`Final Pre-Op Count: ${preOp}, Final Post-Op Count: ${postOp}`);

      setPreOpCount(preOp);
      setPostOpCount(postOp);
      setLowRiskCount(lowRisk);
      setModerateRiskCount(moderateRisk);
      setHighRiskCount(highRisk);
      setPendingLabResultsCount(pendingLabs);

    }
    else console.error(error);
  };

  const fetchAppointmentsToday = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        appointment_id,
        appointment_datetime,
        notes,
        patients (first_name, last_name),
        doctors (first_name, last_name)
      `)
      .eq("secretary_id", user.secretary_id)
      .gte("appointment_datetime", today.toISOString())
      .lt("appointment_datetime", tomorrow.toISOString())
      .order("appointment_datetime", { ascending: true });

    if (error) {
      console.error("Error fetching appointments:", error);
      setMessage(`Error fetching appointments: ${error.message}`);
    } else {
      setAppointmentsToday(data.map(app => ({
        ...app,
        patient_name: app.patients ? `${app.patients.first_name} ${app.patients.last_name}` : 'Unknown Patient',
        doctor_name: app.doctors ? `${app.doctors.first_name} ${app.doctors.last_name}` : 'Unknown Doctor',
        time: new Date(app.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })));
    }
  };

  const handleInputChange = (field, value) => {
    setPatientForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAppointmentChange = (field, value) => {
    setAppointmentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { drugName: "", dosage: "", frequency: "", prescribedBy: "" }]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const savePatient = async () => {
    const patientData = {
        first_name: patientForm.firstName,
        last_name: patientForm.lastName,
        email: patientForm.email,
        password: patientForm.password, // Consider hashing in production
        preferred_doctor_id: selectedDoctorId,
        date_of_birth: patientForm.dateOfBirth,
        contact_info: patientForm.contactInfo,
        gender: patientForm.gender,
        address: patientForm.address,
        emergency_contact: patientForm.emergencyContactNumber,
        diabetes_type: patientForm.diabetesType,
        allergies: patientForm.allergies,
        medication: JSON.stringify(medications), // Store medications as a JSON string
        complication_history: [
          patientForm.footUlcersAmputation && "Foot Ulcers/Amputation",
          patientForm.eyeIssues && "Eye Issues",
          patientForm.kidneyIssues && "Kidney Issues",
          patientForm.stroke && "Stroke",
          patientForm.heartAttack && "Heart Attack",
          patientForm.hypertensive && "Hypertensive",
        ].filter(Boolean).join(", ") || null,
        smoking_status: patientForm.smokingStatus,
        monitoring_frequency: patientForm.monitoringFrequencyGlucose,
        last_doctor_visit: patientForm.lastDoctorVisit,
        last_eye_exam: patientForm.lastEyeExam,
      };

      let error;
      if (editingPatientId) {
        // Update existing patient
        const { error: updateError } = await supabase
          .from("patients")
          .update(patientData)
          .eq("patient_id", editingPatientId);
        error = updateError;
      } else {
        // Create new patient
        const { error: insertError } = await supabase
          .from("patients")
          .insert([patientData]);
        error = insertError;
      }

      if (error) {
        setMessage(`Error saving patient: ${error.message}`);
      } else {
        // Only clear message and refresh patient list. No success modal or immediate page navigation.
        setMessage(""); // Clear any previous messages
        fetchPatients(); // Refresh patient list and chart data
      }
    };

    const handleSavePatientWithConfirmation = () => {
      if (currentPatientStep < steps.length - 1) {
        setMessage("Please complete all steps before saving the patient.");
        return;
      }
      if (!selectedDoctorId) {
        setMessage("Please select a doctor to assign the patient to.");
        return;
      }
      setMessage(""); // Clear any previous messages
      setShowPatientConfirmationModal(true); // Show the confirmation modal
    };

    const confirmAndSavePatient = async () => {
      setShowPatientConfirmationModal(false); // Hide confirmation modal
      await savePatient(); // Proceed with saving the patient
      // After save, the patient creation/edit form will remain open.
      // If the user wants to clear the form or navigate, they can use the "Cancel" button.
      // Reset form and navigate after confirmed action, so it's ready for a new entry
      setPatientForm({
        firstName: "", lastName: "", email: "", password: "", dateOfBirth: "", contactInfo: "",
        middleName: "", gender: "", address: "", emergencyContactNumber: "", diabetesType: "", allergies: "",
        footUlcersAmputation: false, eyeIssues: false, kidneyIssues: false, stroke: false,
        heartAttack: false, hypertensive: false, smokingStatus: "", monitoringFrequencyGlucose: "", lastDoctorVisit: "",
        lastEyeExam: "", preparedBy: ""
      });
      setMedications([{ drugName: "", dosage: "", frequency: "", prescribedBy: "" }]);
      setSelectedDoctorId("");
      setEditingPatientId(null);
      setCurrentPatientStep(0);
      setActivePage("patient-list"); // Navigate to patient list after successful confirmation and save
    };


  const handleEditPatient = (patient) => {
    setPatientForm({
      firstName: patient.first_name || "",
      lastName: patient.last_name || "",
      email: patient.email || "",
      password: patient.password || "", // In a real app, never pre-fill password
      dateOfBirth: patient.date_of_birth || "",
      contactInfo: patient.contact_info || "",
      middleName: patient.middle_name || "",
      gender: patient.gender || "",
      address: patient.address || "",
      emergencyContactNumber: patient.emergency_contact || "",
      diabetesType: patient.diabetes_type || "",
      allergies: patient.allergies || "",
      footUlcersAmputation: patient.complication_history?.includes("Foot Ulcers/Amputation") || false,
      eyeIssues: patient.complication_history?.includes("Eye Issues") || false,
      kidneyIssues: patient.complication_history?.includes("Kidney Issues") || false,
      stroke: patient.complication_history?.includes("Stroke") || false,
      heartAttack: patient.complication_history?.includes("Heart Attack") || false,
      hypertensive: patient.complication_history?.includes("Hypertensive") || false,
      smokingStatus: patient.smoking_status || "",
      monitoringFrequencyGlucose: patient.monitoring_frequency || "",
      lastDoctorVisit: patient.last_doctor_visit || "",
      lastEyeExam: patient.last_eye_exam || ""
    });
    try {
      setMedications(patient.medication ? JSON.parse(patient.medication) : [{ drugName: "", dosage: "", frequency: "", prescribedBy: "" }]);
    } catch (e) {
      console.error("Error parsing medications:", e);
      setMedications([{ drugName: "", dosage: "", frequency: "", prescribedBy: "" }]); // Fallback
    }

    setSelectedDoctorId(patient.preferred_doctor_id || "");
    setEditingPatientId(patient.patient_id);
    setCurrentPatientStep(0); // Start from the first step for editing
    setActivePage("create-patient");
  };

  const handleDeletePatient = async (patientId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("patients").delete().eq("patient_id", patientId);
    if (error) setMessage(`Error deleting patient: ${error.message}`);
    else {
      setMessage("Patient deleted successfully!");
      fetchPatients(); // Refresh patient list and chart data
    }
  };

  const handleNextStep = () => {
    // Basic validation before moving to the next step
    if (currentPatientStep === 0) { // Demographics
      if (!patientForm.firstName || !patientForm.lastName || !patientForm.email || !patientForm.password || !patientForm.dateOfBirth || !patientForm.contactInfo) {
        setMessage("Please fill in all required demographic fields.");
        return;
      }
    }
    // Add more validation for other steps if needed
    if (currentPatientStep < steps.length - 1) {
      setCurrentPatientStep(currentPatientStep + 1);
      setMessage(""); // Clear message on step change
    }
  };

  const handlePreviousStep = () => {
    if (currentPatientStep > 0) {
      setCurrentPatientStep(currentPatientStep - 1);
      setMessage(""); // Clear message on step change
    }
  };

  const createAppointment = async () => {
    if (!appointmentForm.doctorId || !appointmentForm.patientId || !appointmentForm.date || !appointmentForm.time) {
      setMessage("Please fill in all required appointment fields.");
      return;
    }

    const appointmentDateTime = new Date(`${appointmentForm.date}T${appointmentForm.time}`);

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          doctor_id: appointmentForm.doctorId,
          patient_id: appointmentForm.patientId,
          secretary_id: user.secretary_id,
          appointment_datetime: appointmentDateTime.toISOString(),
          notes: appointmentForm.notes,
        },
      ]);

    if (error) {
      console.error("Error creating appointment:", error);
      setMessage(`Error scheduling appointment: ${error.message}`);
    } else {
      setMessage("Appointment scheduled successfully!");
      setAppointmentForm({ doctorId: "", patientId: "", date: "", time: "", notes: "" });
      fetchAppointmentsToday();
    }
  };

  const filteredPatients = patients.filter((pat) =>
    `${pat.first_name} ${pat.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLabInputChange = (field, value) => {
    setLabResults(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectPatientForLab = (patient) => {
    setLabResults(prev => ({ ...prev, selectedPatientForLab: patient }));
    setLabEntryStep(2);
    // Optionally pre-fill date if desired, or leave it for manual entry
    setLabResults(prev => ({ ...prev, dateSubmitted: new Date().toISOString().slice(0, 10) }));
  };


  const handleFinalizeLabSubmission = async () => {
    // --- Start Debugging ---
    console.log("handleFinalizeLabSubmission called.");

    if (!labResults.selectedPatientForLab) {
      setMessage("Please select a patient to submit lab results for.");
      console.error("No patient selected for lab results.");
      return;
    }

    // Validate if required fields have values before parsing
    if (!labResults.dateSubmitted ||
        labResults.hba1c === "" ||
        labResults.creatinine === "" ||
        labResults.gotAst === "" ||
        labResults.gptAlt === "" ||
        labResults.cholesterol === "" ||
        labResults.triglycerides === "" ||
        labResults.hdlCholesterol === "" ||
        labResults.ldlCholesterol === "") {
        setMessage("Please fill in all lab result fields.");
        console.error("Missing lab result fields.");
        return;
    }

    // Prepare data for insertion into the 'patient_labs' table
    const dataToInsert = {
      patient_id: labResults.selectedPatientForLab.patient_id,
      date_submitted: labResults.dateSubmitted,
      // !!! IMPORTANT CHANGE HERE: Use 'HbA1c' to match your database column name exactly !!!
      Hba1c: parseFloat(labResults.hba1c) || null,
      creatinine: parseFloat(labResults.creatinine) || null,
      got_ast: parseFloat(labResults.gotAst) || null,
      gpt_alt: parseFloat(labResults.gptAlt) || null,
      cholesterol: parseFloat(labResults.cholesterol) || null,
      triglycerides: parseFloat(labResults.triglycerides) || null,
      hdl_cholesterol: parseFloat(labResults.hdlCholesterol) || null,
      ldl_cholesterol: parseFloat(labResults.ldlCholesterol) || null,
    };

    console.log("Attempting to insert lab data:", dataToInsert);
    // --- End Debugging ---

    const { error: labInsertError } = await supabase
      .from("patient_labs") // Targeting the correct table
      .insert([dataToInsert]);

    if (labInsertError) {
      console.error("Error inserting lab results:", labInsertError);
      setMessage(`Error submitting lab results: ${labInsertError.message}`);
    } else {
      console.log("Lab results successfully submitted.");
      setMessage("Lab results successfully submitted!");
      setShowSuccessModal(true);
      // Clear the lab input form after successful submission
      setLabResults({
        selectedPatientForLab: null,
        dateSubmitted: "",
        hba1c: "",
        creatinine: "",
        gotAst: "",
        gptAlt: "",
        cholesterol: "",
        triglycerides: "",
        hdlCholesterol: "",
        ldlCholesterol: "",
      });
      // No fetchPatients() here as we are not updating patient_status yet.
      // If you want to see the patient list update for *other reasons*, you might keep it.
      // For now, let's keep it minimal as requested.
    }
  };


  return (
    <div className="dashboard-container">
      <div className="top-navbar">
        <h1 className="app-title">
          <img src={logo} alt="DiaTrack Logo" className="app-logo" />
          <span style={{ color: 'var(--primary-blue)' }}>Dia</span>
          <span style={{ color: 'var(--secondary-orange)' }}>Track</span>
        </h1>
        <ul className="navbar-menu">
          <li className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li className={activePage === "patient-list" ? "active" : ""} onClick={() => setActivePage("patient-list")}>Patient List</li>
          <li className={activePage === "appointments" ? "active" : ""} onClick={() => setActivePage("appointments")}>Appointments</li>
          <li className={activePage === "reports" ? "active" : ""} onClick={() => setActivePage("reports")}>Reports</li>
        </ul>
        <div className="navbar-right">
          <div className="user-profile">
            <img src="https://placehold.co/40x40/aabbcc/ffffff?text=User" alt="User Avatar" className="user-avatar" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/aabbcc/ffffff?text=User"; }}/>
            <div className="user-info">
              <span className="user-name">{user ? `${user.first_name} ${user.last_name}` : 'Maria Batumbakal'}</span>
              <span className="user-role">Secretary</span>
            </div>
          </div>
          <div className="header-icons">
            <i className="fas fa-bell"></i>
            <i className="fas fa-envelope"></i>
            <button className="signout-button" onClick={() => {
              if (window.confirm("Are you sure you want to sign out?")) onLogout();
            }}><i className="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="dashboard-header-section">
          <h2 className="welcome-message">Welcome Back, {user ? user.first_name : 'Maria'} 👋</h2>
          <p className="reports-info">Patient reports here always update in real time</p>
          {(activePage === "dashboard" || activePage === "patient-list") && ( // Conditional rendering for search bar and create patient button
            <div className="header-actions">
              <div className="search-bar">
                <input type="text" placeholder="Search for patients here" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <i className="fas fa-search"></i>
              </div>
              <button className="create-new-patient-button" onClick={() => {
                setActivePage("create-patient");
                setPatientForm({ // Reset all fields
                  firstName: "", lastName: "", email: "", password: "", dateOfBirth: "", contactInfo: "",
                  middleName: "", gender: "", address: "", emergencyContactNumber: "", diabetesType: "", allergies: "",
                  footUlcersAmputation: "", eyeIssues: "", kidneyIssues: "", stroke: "",
                  heartAttack: "", hypertensive: "", smokingStatus: "", monitoringFrequencyGlucose: "", lastDoctorVisit: "",
                  lastEyeExam: "", preparedBy: ""
                });
                setMedications([{ drugName: "", dosage: "", frequency: "", prescribedBy: "" }]); // Reset medications state
                setSelectedDoctorId("");
                setEditingPatientId(null);
                setCurrentPatientStep(0); // Reset step
              }}>
                <i className="fas fa-plus"></i> Create New Patient
              </button>
            </div>
          )}
        </div>

        <div className="dashboard-content">
          {activePage === "dashboard" && (
            <div className="dashboard-columns-container">
              <div className="dashboard-left-column">
                <div className="quick-links">
                  <h3>Quick links</h3>
                  <div className="quick-links-grid">
                    <div className="quick-link-item" onClick={() => setActivePage("lab-result-entry")}>
                      <div className="quick-link-icon lab-result">
                        <i className="fas fa-flask"></i>
                      </div>
                      <span>Lab Result Entry</span>
                    </div>
                    <div className="quick-link-item" onClick={() => setActivePage("appointments")}>
                      <div className="quick-link-icon set-appointment">
                        <i className="fas fa-calendar-plus"></i>
                      </div>
                      <span>Set Appointment</span>
                    </div>
                  </div>
                </div>

                <div className="widgets">
                  <h3>Widgets</h3>
                  <PatientSummaryWidget
                    totalPatients={totalPatientsCount}
                    pendingLabResults={pendingLabResultsCount}
                    preOp={preOpCount}
                    postOp={postOpCount}
                    lowRisk={lowRiskCount}
                    moderateRisk={moderateRiskCount}
                    highRisk={highRiskCount}
                  />
                </div>
              </div>

              <div className="dashboard-right-column">
                <div className="appointments-today">
                  <h3>Appointments Today</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Patient Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentsToday.length > 0 ? (
                        appointmentsToday.map((appointment) => (
                          <tr key={appointment.appointment_id}>
                            <td>{appointment.time}</td>
                            <td>{appointment.patient_name}</td>
                            <td className="appointment-actions">
                              No actions available without status
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No appointments today.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activePage === "create-patient" && (
            <div className="create-patient-section">
              <div className="create-patient-header">
                <h2>{editingPatientId ? "Edit Patient Account" : "Create Patient Account"}</h2>
                <button className="close-form-button" onClick={() => setActivePage("dashboard")}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="progress-indicator">
                {steps.map((step, index) => (
                  <React.Fragment key={step}>
                    <div className={`step ${index === currentPatientStep ? "active" : ""} ${index < currentPatientStep ? "completed" : ""}`}>
                      <div className="step-number"></div>
                      <div className="step-name">{step}</div>
                    </div>
                    {index < steps.length - 1 && <div className={`progress-line ${index < currentPatientStep ? "completed" : ""}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <div className="patient-form-content">
                {currentPatientStep === 0 && (
                  <div className="form-step demographics-form-step">
                    <h3>Demographics</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name:</label>
                        <input className="patient-input" placeholder="First Name" value={patientForm.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Middle Name (Optional):</label>
                        <input className="patient-input" placeholder="Middle Name" value={patientForm.middleName} onChange={(e) => handleInputChange("middleName", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Last Name:</label>
                        <input className="patient-input" placeholder="Last Name" value={patientForm.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email:</label>
                        <input className="patient-input" placeholder="Email" type="email" value={patientForm.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input className="patient-input" placeholder="Password" type="password" value={patientForm.password} onChange={(e) => handleInputChange("password", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Gender:</label>
                        <select className="patient-input" value={patientForm.gender} onChange={(e) => handleInputChange("gender", e.target.value)}>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Date of Birth:</label>
                        <input className="patient-input" placeholder="Date of Birth" type="date" value={patientForm.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Contact Info:</label>
                        <input className="patient-input" placeholder="Contact Info" value={patientForm.contactInfo} onChange={(e) => handleInputChange("contactInfo", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Address:</label>
                        <input className="patient-input" placeholder="Address" value={patientForm.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Emergency Contact Number:</label>
                        <input className="patient-input" placeholder="Emergency Contact Number" value={patientForm.emergencyContactNumber} onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {currentPatientStep === 1 && (
                  <div className="form-step diabetes-history-form-step">
                    <h3>Diabetes History</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Diabetes Type:</label>
                        <select className="patient-input" value={patientForm.diabetesType} onChange={(e) => handleInputChange("diabetesType", e.target.value)}>
                          <option value="">Select Type</option>
                          <option value="Type 1">Type 1</option>
                          <option value="Type 2">Type 2</option>
                          <option value="Gestational">Gestational</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Allergies:</label>
                        <input className="patient-input" placeholder="Allergies" value={patientForm.allergies} onChange={(e) => handleInputChange("allergies", e.target.value)} />
                      </div>
                    </div>

                    <div className="medications-table-container">
                      <label>Current Medications:</label>
                      <table className="medications-table">
                        <thead>
                          <tr>
                            <th>Drug Name</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Prescribed by</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medications.map((med, index) => (
                            <tr key={index}>
                              <td><input type="text" className="med-input" value={med.drugName} onChange={(e) => handleMedicationChange(index, "drugName", e.target.value)} /></td>
                              <td><input type="text" className="med-input" value={med.dosage} onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)} /></td>
                              <td><input type="text" className="med-input" value={med.frequency} onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)} /></td>
                              <td><input type="text" className="med-input" value={med.prescribedBy} onChange={(e) => handleMedicationChange(index, "prescribedBy", e.target.value)} /></td>
                              <td className="med-actions">
                                {medications.length > 1 && (
                                  <button type="button" className="remove-med-button" onClick={() => handleRemoveMedication(index)}>
                                    <i className="fas fa-minus-circle"></i>
                                  </button>
                                )}
                                {index === medications.length - 1 && (
                                  <button type="button" className="add-med-button" onClick={handleAddMedication}>
                                    <i className="fas fa-plus-circle"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {currentPatientStep === 2 && (
                  <div className="form-step complication-history-form-step">
                    <h3>Complication History</h3>
                    <div className="form-row">
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="footUlcers" checked={patientForm.footUlcersAmputation} onChange={(e) => handleInputChange("footUlcersAmputation", e.target.checked)} />
                        <label htmlFor="footUlcers">Foot Ulcers/Amputation</label>
                      </div>
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="eyeIssues" checked={patientForm.eyeIssues} onChange={(e) => handleInputChange("eyeIssues", e.target.checked)} />
                        <label htmlFor="eyeIssues">Eye Issues</label>
                      </div>
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="kidneyIssues" checked={patientForm.kidneyIssues} onChange={(e) => handleInputChange("kidneyIssues", e.target.checked)} />
                        <label htmlFor="kidneyIssues">Kidney Issues</label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="stroke" checked={patientForm.stroke} onChange={(e) => handleInputChange("stroke", e.target.checked)} />
                        <label htmlFor="stroke">Stroke</label>
                      </div>
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="heartAttack" checked={patientForm.heartAttack} onChange={(e) => handleInputChange("heartAttack", e.target.checked)} />
                        <label htmlFor="heartAttack">Heart Attack</label>
                      </div>
                      <div className="form-group checkbox-group">
                        <input type="checkbox" id="hypertensive" checked={patientForm.hypertensive} onChange={(e) => handleInputChange("hypertensive", e.target.checked)} />
                        <label htmlFor="hypertensive">Hypertensive</label>
                      </div>
                    </div>
                  </div>
                )}

                {currentPatientStep === 3 && (
                  <div className="form-step lifestyle-form-step">
                    <h3>Lifestyle</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Smoking Status:</label>
                        <select className="patient-input" value={patientForm.smokingStatus} onChange={(e) => handleInputChange("smokingStatus", e.target.value)}>
                          <option value="">Select Status</option>
                          <option value="Never Smoked">Never Smoked</option>
                          <option value="Former Smoker">Former Smoker</option>
                          <option value="Current Smoker">Current Smoker</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Monitoring Frequency (Glucose):</label>
                        <input className="patient-input" placeholder="e.g., Daily, Weekly" value={patientForm.monitoringFrequencyGlucose} onChange={(e) => handleInputChange("monitoringFrequencyGlucose", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Last Doctor Visit:</label>
                        <input className="patient-input" type="date" value={patientForm.lastDoctorVisit} onChange={(e) => handleInputChange("lastDoctorVisit", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Last Eye Exam:</label>
                        <input className="patient-input" type="date" value={patientForm.lastEyeExam} onChange={(e) => handleInputChange("lastEyeExam", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {currentPatientStep === 4 && (
                  <div className="form-step assignment-form-step">
                    <h3>Assignment</h3>
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Assign Doctor:</label>
                        <select className="doctor-select" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
                          <option value="">Select Doctor</option>
                          {linkedDoctors.map((doc) => (
                            <option key={doc.doctor_id} value={doc.doctor_id}>{doc.doctor_name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Prepared By:</label>
                        <input className="patient-input" type="text" value={user ? `${user.first_name} ${user.last_name}` : ''} readOnly />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {message && <p className="form-message">{message}</p>}

              <div className="form-navigation-buttons">
                {currentPatientStep > 0 && (
                  <button className="previous-step-button" onClick={handlePreviousStep}>Previous</button>
                )}
                {currentPatientStep < steps.length - 1 && (
                  <button className="next-step-button" onClick={handleNextStep}>Next</button>
                )}
                {currentPatientStep === steps.length - 1 && (
                  <button className="next-step-button" onClick={handleSavePatientWithConfirmation}>
                    {editingPatientId ? "Update Patient" : "Create Patient"}
                  </button>
                )}
                <button className="cancel-button" onClick={() => setActivePage("dashboard")}>Cancel</button>
              </div>
            </div>
          )}

          {activePage === "patient-list" && (
            <div className="patient-list-section">
              <h2>My Patients</h2>
              <table className="patient-table">
                <thead>
                  <tr>
                  <th>Patient Name</th>
                  <th>Age/Sex</th>
                  <th>Assigned Doctor</th>
                  <th>Classification</th>
                  <th>Lab Status</th>
                  <th>Profile Status</th>
                  <th>Last Visit</th>
                  <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((pat) => (
                      <tr key={pat.patient_id}>
                        <td>{pat.first_name} {pat.last_name}</td>
                        <td>{pat.date_of_birth ? `${Math.floor((new Date() - new Date(pat.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000))}/${pat.gender}` : 'N/A'}</td>
                        <td>{pat.doctors ? `${pat.doctors.first_name} ${pat.doctors.last_name}` : 'Unknown'}</td>
                        <td className={`risk-classification-${(pat.risk_classification || 'N/A').toLowerCase()}`}>
                            {pat.risk_classification || 'N/A'}
                        </td>
                        <td>{pat.lab_status || 'N/A'}</td> {/* Display actual lab status */}
                        <td>{pat.profile_status || 'N/A'}</td> {/* Display actual profile status */}
                        <td>{pat.last_doctor_visit || 'N/A'}</td> {/* Corrected line */}
                        <td className="patient-actions-cell">
                          <button className="view-button" onClick={() => setSelectedPatientDetail(pat)}>View</button>
                          <button className="edit-button" onClick={() => handleEditPatient(pat)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDeletePatient(pat.patient_id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No patients found.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {selectedPatientDetail && (
                <div className="patient-detail-card">
                  <h3>Patient Details</h3>
                  <p><strong>Name:</strong> {selectedPatientDetail.first_name} {selectedPatientDetail.last_name}</p>
                  <p><strong>Email:</strong> {selectedPatientDetail.email}</p>
                  <p><strong>Date of Birth:</strong> {selectedPatientDetail.date_of_birth}</p>
                  <p><strong>Contact Info:</strong> {selectedPatientDetail.contact_info}</p>
                  <p><strong>Middle Name:</strong> {selectedPatientDetail.middle_name || 'N/A'}</p>
                  <p><strong>Gender:</strong> {selectedPatientDetail.gender || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedPatientDetail.address || 'N/A'}</p>
                  <p><strong>Emergency Contact:</strong> {selectedPatientDetail.emergency_contact || 'N/A'}</p>
                  <p><strong>Diabetes Type:</strong> {selectedPatientDetail.diabetes_type || 'N/A'}</p>
                  <p><strong>Allergies:</strong> {selectedPatientDetail.allergies || 'N/A'}</p>
                  <p><strong>Current Medications:</strong></p>
                  {selectedPatientDetail.medication && JSON.parse(selectedPatientDetail.medication).length > 0 ? (
                    <ul>
                      {JSON.parse(selectedPatientDetail.medication).map((med, idx) => (
                        <li key={idx}>
                          {med.drugName} - {med.dosage} ({med.frequency}) by {med.prescribedBy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>N/A</p>
                  )}

                  <p><strong>Complication History:</strong> {selectedPatientDetail.complication_history || 'N/A'}</p>
                  <p><strong>Smoking Status:</strong> {selectedPatientDetail.smoking_status || 'N/A'}</p>
                  <p><strong>Glucose Monitoring Frequency:</strong> {selectedPatientDetail.monitoring_frequency || 'N/A'}</p>
                  <p><strong>Last Doctor Visit:</strong> {selectedPatientDetail.last_doctor_visit || 'N/A'}</p>
                  <p><strong>Last Eye Exam:</strong> {selectedPatientDetail.last_eye_exam || 'N/A'}</p>
                  <button className="close-details-button" onClick={() => setSelectedPatientDetail(null)}>Close Details</button>
                </div>
              )}
              {message && <p className="form-message">{message}</p>}
            </div>
          )}

          {activePage === "appointments" && (
            <div className="appointments-section">
              <h2>Schedule New Appointment</h2>
              <div className="form-group">
                <label>Select Doctor:</label>
                <select value={appointmentForm.doctorId} onChange={(e) => handleAppointmentChange("doctorId", e.target.value)}>
                  <option value="">Select Doctor</option>
                  {linkedDoctors.map(doc => (
                    <option key={doc.doctor_id} value={doc.doctor_id}>{doc.doctor_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Patient:</label>
                <select value={appointmentForm.patientId} onChange={(e) => handleAppointmentChange("patientId", e.target.value)}>
                  <option value="">Select Patient</option>
                  {patients.map(pat => (
                    <option key={pat.patient_id} value={pat.patient_id}>{pat.first_name} {pat.last_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date:</label>
                <input type="date" value={appointmentForm.date} onChange={(e) => handleAppointmentChange("date", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input type="time" value={appointmentForm.time} onChange={(e) => handleAppointmentChange("time", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Notes (optional):</label>
                <textarea placeholder="Notes (optional)" value={appointmentForm.notes} onChange={(e) => handleAppointmentChange("notes", e.target.value)} />
              </div>
              <button onClick={createAppointment}>Schedule Appointment</button>
              {message && <p className="form-message">{message}</p>}

            </div>
          )}

          {activePage === "lab-result-entry" && (
            <>
              <div className="lab-result-entry-section">
                <h2>Enter Patient Lab Results</h2>
                <p style={{ marginBottom: "25px", color: "#666", fontSize: "15px" }}>
                  Input the patient's baseline laboratory values to support risk classification and care planning. Once submitted, values will be locked for data integrity.
                </p>

                <div className="lab-stepper">
                  <div className={`step ${labEntryStep >= 1 ? "completed" : ""} ${labEntryStep === 1 ? "active" : ""}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Search Patient</div>
                  </div>
                  <div className="divider"></div>
                  <div className={`step ${labEntryStep >= 2 ? "completed" : ""} ${labEntryStep === 2 ? "active" : ""}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Lab Input Form</div>
                  </div>
                  <div className="divider"></div>
                  <div className={`step ${labEntryStep >= 3 ? "completed" : ""} ${labEntryStep === 3 ? "active" : ""}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Lock-in Data</div>
                  </div>
                </div>


                {labEntryStep === 1 && (<div className="lab-patient-search">
                  <div className="search-header">
                    <h4>Patient List</h4>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input type="text" placeholder="Search by name or Patient ID" />
                      <button><i className="fas fa-filter" style={{ marginRight: "5px" }}></i> Filter</button>
                    </div>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Age/Sex</th>
                        <th>Classification</th>
                        <th>Lab Status</th>
                        <th>Profile Status</th>
                        <th>Last Visit</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {patients.length > 0 ? (
                      patients.map((p, i) => {
                        const fullName = `${p.first_name || "N/A"} ${p.last_name || ""}`;
                        const age = p.date_of_birth
                          ? Math.floor((new Date() - new Date(p.date_of_birth)) / (365.25 * 24 * 60 * 60 * 1000))
                          : "N/A";
                        const sex = p.gender || "N/A";
                        const classification = p.risk_classification || "Not Available";

                        const labStatus = p.lab_status || "N/A"; // Display N/A as we're not using 'Awaiting' for now
                        const profileStatus = p.profile_status || "Pending";
                        const lastVisit = p.last_doctor_visit || "N/A";
                        // labStatus is not being updated, so always show "N/A" or whatever is in DB if column exists
                        const isAwaiting = false; // Temporarily set to false, as we are not relying on lab_status for this logic
                        const actionLabel = "✏️ Enter Labs"; // Always allow entry

                        return (
                          <tr key={p.patient_id || i}>
                            <td>{fullName}</td>
                            <td>{age}/{sex}</td>
                            <td className={`risk-classification-${(classification === "Not Available" ? "not-available" : classification).toLowerCase()}`}>
                                {classification}
                            </td>
                            {/* Adjusted display for lab_status since we're not managing it here yet */}
                            <td>{labStatus === "N/A" ? "N/A" : `Currently: ${labStatus}`}</td>
                            <td>🟡 {profileStatus}</td>
                            <td>{lastVisit}</td>
                            <td>
                              <button
                                className="action-button"
                                onClick={() => handleSelectPatientForLab(p)}
                              >
                                {actionLabel}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7">No patients available.</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>)}

                {labEntryStep === 2 && (
                  <div className="lab-input-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Patient Name</label>
                        <input type="text" value={labResults.selectedPatientForLab ? `${labResults.selectedPatientForLab.first_name} ${labResults.selectedPatientForLab.last_name}` : ""} readOnly />
                      </div>
                      <div className="form-group">
                        <label>Date Submitted</label>
                        <input type="date" value={labResults.dateSubmitted} onChange={(e) => handleLabInputChange("dateSubmitted", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>HbA1c (%)</label>
                        <input type="number" step="0.01" value={labResults.hba1c} onChange={(e) => handleLabInputChange("hba1c", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Creatinine (umol/L)</label>
                        <input type="number" step="0.01" value={labResults.creatinine} onChange={(e) => handleLabInputChange("creatinine", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>GOT (AST) - U/L</label>
                        <input type="number" step="0.01" value={labResults.gotAst} onChange={(e) => handleLabInputChange("gotAst", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>GPT (ALT) - U/L</label>
                        <input type="number" step="0.01" value={labResults.gptAlt} onChange={(e) => handleLabInputChange("gptAlt", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Cholesterol (mmol/L)</label>
                        <input type="number" step="0.01" value={labResults.cholesterol} onChange={(e) => handleLabInputChange("cholesterol", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Triglycerides (mmol/L)</label>
                        <input type="number" step="0.01" value={labResults.triglycerides} onChange={(e) => handleLabInputChange("triglycerides", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>HDL Cholesterol (mmol/L)</label>
                        <input type="number" step="0.01" value={labResults.hdlCholesterol} onChange={(e) => handleLabInputChange("hdlCholesterol", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>LDL Cholesterol (mmol/L)</label>
                        <input type="number" step="0.01" value={labResults.ldlCholesterol} onChange={(e) => handleLabInputChange("ldlCholesterol", e.target.value)} />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button className="previous-button" onClick={() => setLabEntryStep(1)}>Previous Step</button>
                      <button className="next-button" onClick={() => setLabEntryStep(3)}>Next Step</button>

                    </div>
                  </div>
                )}
              </div>

              {labEntryStep === 3 && (
                <div className="lab-lock-confirm">
                  <div className="lock-container">
                    <div className="lock-image">
                      <img
                        src="picture/padlock.png"
                        alt="Locked Padlock"
                        className="lock-image-icon"
                      />
                    </div>
                    <div className="lock-text">
                      <h2 className="lock-title">Confirm Lab Result Submission</h2>
                      <p className="lock-description">
                        Please take a moment to <strong>review all entered laboratory values</strong>.<br />
                        If you need to make any corrections, you may go back to the previous step.<br /><br />
                        <span className="lock-warning">
                          Once you finalize this entry, the <strong>lab results will be permanently locked</strong> and can no longer be edited.
                        </span>
                        This ensures clinical accuracy and audit compliance.
                      </p>
                      <div className="lock-buttons">
                        <button
                          className="cancel-button"
                          style={{ padding: '12px 30px' }}
                          onClick={() => setLabEntryStep(2)}
                        >
                          Go Back to Edit
                        </button>
                        <button
                          className="create-new-patient-button"
                          style={{ padding: '12px 30px' }}
                          onClick={handleFinalizeLabSubmission}
                        >
                          Confirm & Finalize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {showSuccessModal && (
              <div className="lab-success-modal-overlay">
                <div className="lab-success-modal">
                  <button className="modal-close"
                    onClick={() => setShowSuccessModal(false)}>
                    ✖
                  </button>
                    <img src="picture/lab-success.png" alt="Doctor Success" className="modal-doctor-image"/>
                  <h2 className="modal-title"> Lab Results Successfully<br />Submitted & Locked</h2>
                    <p className="modal-subtext">
                      The laboratory data has been securely stored and is now locked for editing to ensure accuracy and audit compliance.<br /><br />
                      You may now proceed to finalize the patient profile with the attending doctor.
                    </p>
                    <button className="modal-green-button"
                      onClick={() => {
                      setShowSuccessModal(false);
                      setLabEntryStep(1); // Go back to the patient search step
                     }}>
                      Go to Patient Profile
                      </button>
                    </div>
                  </div>
                    )}
            </>
          )}

          {/* Patient Profile Confirmation Modal (appears BEFORE saving) */}
          {showPatientConfirmationModal && (
            <div className="lab-success-modal-overlay"> {/* Reusing common modal styling */}
              <div className="lab-success-modal">
                  <img src="picture/confirm.png" alt="Confirmation Icon" className="modal-doctor-image"/> {/* Placeholder for a confirmation icon */}
                <h2 className="modal-title"> Finalize Patient Profile?</h2>
                  <p className="modal-subtext">
                    Are you sure you want to finalize this patient's profile?
                    Please ensure all details are accurate before proceeding.
                    <br /><br />
                    This action will {editingPatientId ? "update the existing" : "create a new"} patient record.
                  </p>
                  <div className="modal-buttons">
                    <button className="cancel-button"
                      onClick={() => setShowPatientConfirmationModal(false)}>
                      Go Back to Edit
                    </button>
                    <button className="modal-green-button"
                      onClick={confirmAndSavePatient}>
                      Yes, Continue
                    </button>
                  </div>
                </div>
              </div>
          )}

          {activePage === "reports" && (
            <div className="reports-section">
              <h2>Reports</h2>
              <p>This section is a placeholder for generating various patient reports.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;