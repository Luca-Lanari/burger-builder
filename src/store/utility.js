/*File che serve per ristruttare i reducers e renderli più snelli */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};