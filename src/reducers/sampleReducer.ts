export const initialState: any = {
    name: "sample",
};

const sampleReducer = (state = initialState, action: any) => {
    switch (action?.type) {
        default:
            return state;
    }
};

export default sampleReducer;
