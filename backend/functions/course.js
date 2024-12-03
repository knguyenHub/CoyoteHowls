import firebaseApp from "../config.js";
import { getFirestore, collection, addDoc, getDocs, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Create Course
export async function createCourse(req, res) {
  const { professorId, description, schedule, availability, courseName } = req.body;

  // Validate input fields
  if (!professorId || !description || !schedule || !availability || !courseName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Prepare the course data
    const courseData = {
      professorId,
      description,
      schedule,
      availability,
      courseName,
    };

    // Add the course to the Firestore Courses collection
    const courseRef = await addDoc(collection(db, "courses"), courseData);

    res.status(201).json({ success: true, courseId: courseRef.id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get All Courses
export async function getCourse(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = querySnapshot.docs.map((doc) => ({
      courseId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update Course
export async function updateCourse(req, res) {
  const { courseId, professorId, description, schedule, availability, courseName } = req.body;

  // Validate input fields
  if (!courseId || !professorId || !description || !schedule || !availability || !courseName) {
    return res.status(400).json({ error: "All fields (courseId, professorId, description, schedule, availability, courseName) are required" });
  }

  try {
    const courseRef = doc(db, "courses", courseId);

    // Update the document
    await updateDoc(courseRef, {
      facultyId,
      description,
      schedule,
      availability,
      courseName,
    });

    res.status(200).json({ success: true, message: "Course updated successfully" });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Course
export async function deleteCourse(req, res) {
  const { courseId } = req.body;

  // Validate input fields
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const courseRef = doc(db, "courses", courseId);

    // Delete the document
    await deleteDoc(courseRef);

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

