// import Joi from "joi-browser";

// const validate = (formData, schema) => {
//     const { error } = Joi.validate(formData, schema, {
//         abortEarly: false
//     });

//     if (!error)
//         return {errors: {}, hasError: false };

//     const errors = {};

//     error.details.forEach(item => {
//         errors[item.path[0]] = item.message;
//     });

//     console.log("VALIDATION ERRORS", errors);

//     return {errors, hasError: true};
// }

// export default {
//     validate
// }