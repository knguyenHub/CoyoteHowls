import firebaseApp from "../config.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

// Create Notification
export async function createNotification(req, res) {
  const { userId, message } = req.body;

  // Validate input fields
  if (!userId || !message) {
    return res.status(400).json({ error: "Both userId and message are required" });
  }

  try {
    // Prepare the notification data
    const notificationData = {
      userId,
      message,
      type: "general", // You can customize the notification type if needed
      isRead: false,   // Default to unread
      timestamp: new Date().toISOString(), // Record the creation time
    };

    // Add the notification to the Firestore Notifications collection
    const notificationRef = await addDoc(collection(db, "notifications"), notificationData);

    res.status(201).json({ success: true, notificationId: notificationRef.id });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get All Notifications
export async function getNotification(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "notifications"));
    const notifications = querySnapshot.docs.map((doc) => ({
      notificationId: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Notification
export async function deleteNotification(req, res) {
  const { notificationId } = req.body;

  // Validate input fields
  if (!notificationId) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  try {
    const notificationRef = doc(db, "notifications", notificationId);

    // Delete the document from Firestore
    await deleteDoc(notificationRef);

    res.status(200).json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}