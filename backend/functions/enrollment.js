import firebaseApp from "../config.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Create Enrollment
export async function createEnrollment(req, res) {
  const { courseId, studentId } = req.body;

  // Validate input fields
  if (!courseId || !studentId) {
    return res.status(400).json({ error: "Both courseId and studentId are required" });
  }

  try {
    // Prepare the enrollment data
    const enrollmentData = {
      courseId,
      studentId,
    };

    // Add the enrollment to the Firestore Enrollments collection
    const enrollmentRef = await addDoc(collection(db, "enrollments"), enrollmentData);

    res.status(201).json({ success: true, enrollmentId: enrollmentRef.id });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get All Enrollments
export async function getEnrollment(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "enrollments"));
    const enrollments = querySnapshot.docs.map((doc) => ({
      enrollmentId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Enrollment
export async function deleteEnrollment(req, res) {
  const { enrollmentId } = req.body;

  // Validate input fields
  if (!enrollmentId) {
    return res.status(400).json({ error: "Enrollment ID is required" });
  }

  try {
    const enrollmentRef = doc(db, "enrollments", enrollmentId);

    // Delete the document from Firestore
    await deleteDoc(enrollmentRef);

    res.status(200).json({ success: true, message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
