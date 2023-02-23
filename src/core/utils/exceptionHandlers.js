import toastr from "toastr";

export const handleBusinessException = (error) => {
    toastr.error(error.Detail);
}
export const handleValidationException = (error) => {
    error.Failures.forEach(fail => {
        toastr.error(fail.ErrorMessage);
    })
}
export const handleAuthException = () => {
    //TODO: Tokenin süresi geçti mi? Refresh etmeye çalış, edemez isek logout ol..
}

export const handleDefaultException = (error) => {
    //TODO: Backend ile bir örneklem oluştur.
    toastr.error(error.Detail);
}