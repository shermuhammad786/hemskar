import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    quiz: any; // Define the shape of your quiz data
}

const initialState: QuizState = {
    quiz: {},
};

const quizSlice = createSlice({
    name: 'quizData',
    initialState,
    reducers: {
        getQuizData: (state, action: PayloadAction<any[]>) => {
            state.quiz = action.payload;
        },

    },
});

export const { getQuizData } = quizSlice.actions;
export default quizSlice.reducer;
