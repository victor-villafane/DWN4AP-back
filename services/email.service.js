import nodemailler from 'nodemailer'
import jwt from 'jsonwebtoken'

const transporter = nodemailler.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "victor.villafane@davinci.edu.ar",
        pass: "lhjptgmfirdvjqnp" //contraseña de aplicacion
    }
})

export function recuperarCuenta(mail){
    const token = jwt.sign({mail}, "RECUPERAR", {expiresIn: '1h'})

    const resetLink = `http://localhost:5173/reset-password/${token}`

    const mailOptions = {
        from: "victor.villafane@davinci.edu.ar", //este es el nuestro
        to:  mail,
        subject: "Recuperacion de contraseña",
        text: "Hace click en el link para recuperar tu cuenta: " + resetLink,
        html: `<p>Hace click en el link para recuperar tu cuenta <a href="${resetLink}" >recuperar</a> </p>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error("No se pudo enviar", error)
        }else{
            console.log("Enviado")
        }
    })
}