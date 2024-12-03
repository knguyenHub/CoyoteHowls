import firebaseApp from "../config.js";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Create a new appointment
export async function createAppointment(req, res) {
  const { studentId, facultyId, slotId, status } = req.body;

  if (!studentId || !facultyId || !slotId || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const appointmentData = {
      studentId,
      facultyId,
      slotId,
      status,
      requestTime: new Date().toISOString(),
    };

    const appointmentRef = await addDoc(collection(db, "appointments"), appointmentData);

    res.status(201).json({ success: true, appointmentId: appointmentRef.id });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all appointments
export async function getAppointment(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointments = querySnapshot.docs.map((doc) => ({
      appointmentId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an appointment
export async function updateAppointment(req, res) {
  const { status } = req.body;
  const { appointmentId } = req.params; // Read from URL params

  console.log("Request Params:", req.params); // Log the params
  console.log("Request Body:", req.body); // Log the request body

  // Validate input
  if (!appointmentId || !status) {
    console.error("Validation Failed. Missing Fields:", { appointmentId, status });
    return res.status(400).json({ error: "Appointment ID and status are required" });
  }

  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    console.error("Invalid Status:", status);
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    // Log the appointment ID and Firestore document reference
    console.log("Updating Appointment with ID:", appointmentId);
    const appointmentRef = doc(db, "appointments", appointmentId);
    console.log("Firestore Document Reference:", appointmentRef.path);

    // Update the Firestore document
    await updateDoc(appointmentRef, {
      status,
    });

    console.log("Appointment Updated Successfully");
    res.status(200).json({ success: true, message: "Appointment updated successfully" });
  } catch (error) {
    console.error("Error Updating Appointment:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteAppointment(req, res) {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res.status(400).json({ error: "Appointment ID is required" });
  }

  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await deleteDoc(appointmentRef);
    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

