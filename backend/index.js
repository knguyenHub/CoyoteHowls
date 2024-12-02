import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as functions from './functions/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', functions.test);
app.post('/login', functions.login);
app.post('/register', functions.register);
app.get('/signout', functions.signout);

app.post('/appointments', functions.createAppointment);
app.post('/courses', functions.createCourse);
app.post('/enrollments', functions.createEnrollment);
app.post('/notifications', functions.createNotification);
app.post('/availability', functions.createAvailability);

app.get('/appointments', functions.getAppointment);
app.get('/courses', functions.getCourse);
app.get('/enrollments', functions.getEnrollment);
app.get('/notifications', functions.getNotification);
app.get('/availability', functions.getAvailability);


app.delete('/appointments/:appointmentId', functions.deleteAppointment);
app.delete('/courses/:courseId', functions.deleteCourse);
app.delete('/enrollments/:enrollmentId', functions.deleteEnrollment);
app.delete('/notifications/:notificationId', functions.deleteNotification);
app.delete('/availability/:slotId', functions.deleteAvailability);

app.put('/appointments/:appointmentId', functions.updateAppointment);
app.put('/availability/:slotId', functions.updateAvailability);


app.listen(3001, () => {
    console.log('Server running on port 3001');
}
);

