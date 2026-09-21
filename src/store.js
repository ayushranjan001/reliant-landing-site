import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: { status: 'idle', error: null },
  reducers: {
    submitEnquiryRequest: (state) => { state.status = 'submitting'; state.error = null; },
    submitEnquirySuccess: (state) => { state.status = 'success'; },
    submitEnquiryFailure: (state, action) => { state.status = 'error'; state.error = action.payload; },
    resetEnquiry: (state) => { state.status = 'idle'; state.error = null; },
  },
});

const { submitEnquiryRequest, submitEnquirySuccess, submitEnquiryFailure } = enquirySlice.actions;

function* submitEnquiryWorker(action) {
  try {
    yield call(() => new Promise((resolve) => setTimeout(resolve, 450)));
    yield put(submitEnquirySuccess(action.payload));
  } catch (error) {
    yield put(submitEnquiryFailure(error.message || 'Something went wrong.'));
  }
}

function* rootSaga() {
  yield all([takeLatest(submitEnquiryRequest.type, submitEnquiryWorker)]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { enquiry: enquirySlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export { submitEnquiryRequest };