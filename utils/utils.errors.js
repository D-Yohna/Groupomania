module.exports.signUpErrors = (err) => {
    let errors = {pseudo : '', email : '', password: ''}
    if (err.code == '11000') {
        if (err.message.includes('pseudo')) {
            errors.pseudo = "le pseudo est déjà pris"
        }
        if (err.message.includes('email')) {
            errors.email = "Cet email est déjà lié à un utilisateur"
        }
    }
    if (err.name = "ValidatorError") {
        if (err.message.includes('pseudo') && errors.pseudo == "") {
            errors.pseudo = "Votre pseudo doit contenir au moins 3 caractères"
        }
        if (err.message.includes('email') && errors.email == "" ) {
            errors.email = "Email incorrect"
        }
        if (err.message.includes('password')) {
            errors.password = "Votre mot de passe doit contenir au moins 8 caractères"
        }
    }

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email : '', password : ''}
    console.log(err)
    if (err == 'Error: 1'){
        errors.password = "Mot de passe incorrect"
    }
    if (err == 'Error: 2') {
        errors.email = "Email inconnu"
    }

    return errors
}