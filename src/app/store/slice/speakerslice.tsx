// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // Interface for SoftwareApplication state
// interface SoftwareApplicationState {
//   loading: boolean;
//   softwareApplications: SoftwareApplication[]; // Assuming SoftwareApplication interface exists elsewhere
//   error: string | null;
//   message: string | null;
// }

// // Interface for SoftwareApplication (if needed)
// interface SoftwareApplication {
//   // Define properties of a software application
// }

// const speakerSlice = createSlice<SoftwareApplicationState>({
//   name: "softwareApplications",
//   initialState: {
//     loading: false,
//     softwareApplications: [],
//     error: null,
//     message: null,
//   },
//   reducers: {
//     getAllsoftwareApplicationsRequest(state) {
//       state.softwareApplications = [];
//       state.error = null;
//       state.loading = true;
//     },
//     getAllsoftwareApplicationsSuccess(state, action) {
//       state.softwareApplications = action.payload;
//       state.error = null;
//       state.loading = false;
//     },
//     getAllsoftwareApplicationsFailed(state, action) {
//       state.softwareApplications = []; // Might be better to keep the existing data
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addNewsoftwareApplicationsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     addNewsoftwareApplicationsSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     addNewsoftwareApplicationsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     deletesoftwareApplicationsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     deletesoftwareApplicationsSuccess(state, action) {
//       state.error = null;
//       state.loading = false;
//       state.message = action.payload;
//     },
//     deletesoftwareApplicationsFailed(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//       state.message = null;
//     },
//     resetspeakerSlice(state) {
//       state.error = null;
//       state.softwareApplications = []; // Reset to initial state
//       state.message = null;
//       state.loading = false;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//     },
//   },
// });

// export const getAllSpeaker = () => async (dispatch) => {
//   dispatch(speakerSlice.actions.getAllsoftwareApplicationsRequest());
//   try {
//     const response = await axios.get(
//       "https://mern-stack-portfolio-backend-code.onrender.com/api/v1/softwareapplication/getall",
//       { withCredentials: true }
//     );
//     dispatch(
//       speakerSlice.actions.getAllsoftwareApplicationsSuccess(
//         response.data.softwareApplications
//       )
//     );
//     dispatch(speakerSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       speakerSlice.actions.getAllsoftwareApplicationsFailed(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const addNewSpeaker = (data: any) => async (dispatch) => { // Consider defining an interface for data
//   dispatch(speakerSlice.actions.addNewsoftwareApplicationsRequest());
//   try {
//     const response = await axios.post(
//       "https://mern-stack-portfolio-backend-code.onrender.com/api/v1/softwareapplication/add",
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     dispatch(
//       speakerSlice.actions.addNewsoftwareApplicationsSuccess(
//         response.data.message
//       )
//     );
//     dispatch(speakerSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       speakerSlice.actions.addNewsoftwareApplicationsFailed(
//         error.response.data.message
//       )
//     );
//   }
// };

// export const deleteSpeaker = (id: string) => async (dispatch) => {
//   dispatch(speakerSlice.