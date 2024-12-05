import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requests: [],
};

const infraSlice = createSlice({
    name: "infra",
    initialState,
    reducers: {
        addRequest(state, action) {
            const  {id, requestType, description, status, userEmail } = action.payload;
            
            if (!id || !requestType || !description || !status || !userEmail) {
                console.error("Invalid payload:", action.payload);
                return;
            }
            state.requests.push({ id, requestType, description, status, userEmail });
        },

        deleteRequest(state, action) {
            const { id } = action.payload;

            if (!id) {
                console.error("Request ID is required for deletion:", action.payload);
                return;
            }

            const requestIndex = state.requests.findIndex((req) => req.id === id);
            if (requestIndex === -1) {
                console.error(`Request ID with ${id} not found`);
                return;
            }

            state.requests.splice(requestIndex, 1);
        },

        updateRequestStatus(state, action) {
            const { id, status } = action.payload;

            if (!id || !["Approved", "Rejected"].includes(status)) {
                console.error("Invalid payload or status:", action.payload);
                return;
            }

            const requestIndex = state.requests.findIndex((req) => req.id === id);

            if (requestIndex === -1) {
                console.error(`Request with ID ${id} not found`);
                return;
            }

            state.requests[requestIndex] = {
                ...state.requests[requestIndex],
                status,
            };
        },
    },
});

export const { addRequest, deleteRequest, updateRequestStatus } = infraSlice.actions;
export default infraSlice.reducer;