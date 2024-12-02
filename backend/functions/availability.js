import firebaseApp from "../config.js";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Create Availability Slot
export async function createAvailability(req, res) {
  const { facultyId, status, startTime, endTime } = req.body;

  // Validate input fields
  if (!facultyId || !status || !startTime || !endTime) {
    return res.status(400).json({ error: "All fields (facultyId, status, startTime, endTime) are required" });
  }

  // Validate status
  const validStatuses = ["available", "unavailable"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value. Valid values are 'available' or 'unavailable'" });
  }

  try {
    // Prepare the availability data
    const availabilityData = {
      facultyId,
      status,
      startTime: new Date(startTime).toISOString(), // Ensure valid date format
      endTime: new Date(endTime).toISOString(),     // Ensure valid date format
    };

    // Add the availability to Firestore
    const availabilityRef = await addDoc(collection(db, "availability"), availabilityData);

    res.status(201).json({ success: true, slotId: availabilityRef.id });
  } catch (error) {
    console.error("Error creating availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get All Availability Slots
export async function getAvailability(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "availability"));
    const slots = querySnapshot.docs.map((doc) => ({
      slotId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching availability slots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update Availability Slot
export async function updateAvailability(req, res) {
  const { slotId, facultyId, status, startTime, endTime } = req.body;

  // Validate input
  if (!slotId || !facultyId || !status || !startTime || !endTime) {
    return res.status(400).json({ error: "All fields (slotId, facultyId, status, startTime, endTime) are required" });
  }

  const validStatuses = ["available", "unavailable"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value. Valid values are 'available' or 'unavailable'" });
  }

  try {
    const slotRef = doc(db, "availability", slotId);

    // Update the Firestore document
    await updateDoc(slotRef, {
      facultyId,
      status,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });

    res.status(200).json({ success: true, message: "Availability updated successfully" });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Availability Slot
export async function deleteAvailability(req, res) {
  const { slotId } = req.body;

  if (!slotId) {
    return res.status(400).json({ error: "Slot ID is required for deletion" });
  }

  try {
    const slotRef = doc(db, "availability", slotId);

    // Delete the document from Firestore
    await deleteDoc(slotRef);

    res.status(200).json({ success: true, message: "Availability slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
