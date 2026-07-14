// Variables globales
let ultimoProblema = "";
let paso = 0;
let historial = [];
let esperandoRespuesta = false;

function mostrarMenu(){

    let chat = document.getElementById("chat");

    chat.innerHTML += `
    <div class="bot">
        <strong>Chatbot:</strong><br><br>

        👋 ¡Bienvenido al Chatbot de Soporte Técnico!<br><br>

        Soy un asistente virtual del Telebachillerato Comunitario Núm. 29.<br><br>

        Selecciona una opción:
    </div>

    <div class="menu">

        <button onclick="respuestaBoton('institucion')">🏫 Conocer la institución</button>

        <button onclick="respuestaBoton('equipo')">💻 Problemas con mi equipo</button>

        <button onclick="respuestaBoton('internet')">🌐 Problemas de Internet</button>

        <button onclick="respuestaBoton('impresora')">🖨️ Problemas con la impresora</button>

        <button onclick="respuestaBoton('office')">📄 Microsoft Office</button>

        <button onclick="respuestaBoton('soporte')">📞 Contactar soporte técnico</button>

    </div>
    `;

}
function respuestaBoton(opcion){

    document.getElementById("mensaje").value = opcion;

    enviarMensaje();

}
function enviarMensaje() {

    let input = document.getElementById("mensaje");
    let chat = document.getElementById("chat");

    let mensaje = input.value.trim();

    
        if(mensaje==="") return;

// Guardar el mensaje del usuario
historial.push({
    quien:"usuario",
    mensaje:mensaje
});

    chat.innerHTML += `<div class="usuario"><strong>Tú:</strong> ${mensaje}</div>`;

    let texto = mensaje.toLowerCase();

    // Corregir errores comunes
    texto = texto.replace(/internte/g,"internet");
    texto = texto.replace(/internt/g,"internet");
    texto = texto.replace(/wifi/g,"wi-fi");
    texto = texto.replace(/wi fi/g,"wi-fi");
    texto = texto.replace(/contrasena/g,"contraseña");
    texto = texto.replace(/raton/g,"mouse");
    texto = texto.replace(/compu/g,"computadora");

    let respuestas = [];

    // OPCIONES DEL MENÚ

if(texto=="institucion"){

    respuestas.push("🏫 El Telebachillerato Comunitario Núm. 29 ofrece educación media superior y cuenta con un servicio de soporte técnico para atender incidencias de los equipos de cómputo.");

}

if(texto=="equipo"){

    respuestas.push("💻 ¿Qué problema presenta tu equipo?");
    respuestas.push("Puedes escribir:");
    respuestas.push("• Computadora lenta");
    respuestas.push("• No enciende");
    respuestas.push("• Sin sonido");

}

if(texto=="soporte"){

    respuestas.push("📱 Puedes comunicarte con el área de soporte técnico mediante WhatsApp.");

    respuestas.push("<a href='https://wa.me/527226958110?text=Hola,%20necesito%20ayuda%20con%20mi%20equipo%20de%20cómputo.' target='_blank'>Abrir WhatsApp</a>");

}
    // SALUDOS
    if(texto.includes("hola") || texto.includes("buenas") || texto.includes("buenos dias") || texto.includes("buenas tardes")){
        respuestas.push("👋 Hola. Soy tu asistente de soporte técnico. ¿Cuál es el problema que presenta tu equipo?");
    }

    if(esperandoRespuesta){

    if(texto=="si" || texto=="sí"){

        respuestas.push("✅ Excelente. Me alegra haber solucionado tu problema.");
        respuestas.push("Si necesitas otra cosa, aquí estaré.");

        esperandoRespuesta=false;
        ultimoProblema="";
    }

    else if(texto=="no"){

        if(ultimoProblema=="internet"){
            respuestas.push("📶 Reinicia el módem durante 30 segundos y vuelve a conectarlo.");
        }

        if(ultimoProblema=="lenta"){
            respuestas.push("🐢 Abre el Administrador de tareas y revisa qué programa consume más CPU.");
        }

        if(ultimoProblema=="impresora"){
            respuestas.push("🖨️ Reinicia la impresora e imprime una página de prueba.");
        }

        if(ultimoProblema=="office"){
            respuestas.push("📄 Comprueba que la licencia esté activa y que tengas conexión a Internet.");
        }

        respuestas.push("❓ ¿Ahora sí quedó solucionado?");
        respuestas.push("Escribe: Sí o ¿Cómo?");
    }

    else if(texto=="como" || texto=="cómo"){

        if(ultimoProblema=="internet"){
            respuestas.push("1. Apaga el módem.\n2. Espera 30 segundos.\n3. Enciéndelo nuevamente.\n4. Espera que prendan todas las luces.");
        }

        if(ultimoProblema=="lenta"){
            respuestas.push("1. Presiona Ctrl + Shift + Esc.\n2. Abre el Administrador de tareas.\n3. Ordena por CPU.\n4. Cierra programas que no utilices.");
        }

        if(ultimoProblema=="impresora"){
            respuestas.push("1. Abre Configuración.\n2. Impresoras.\n3. Quita la impresora.\n4. Agrégala nuevamente.");
        }

        if(ultimoProblema=="office"){
            respuestas.push("1. Abre Word.\n2. Archivo.\n3. Cuenta.\n4. Inicia sesión.\n5. Comprueba la licencia.");
        }

        respuestas.push("❓ Después de realizar los pasos, ¿se solucionó?");
        respuestas.push("Escribe: Sí o No.");
    }

    respuestas.forEach(function(respuesta){
    chat.innerHTML += `<div class="bot"><strong>Chatbot:</strong> ${respuesta}</div>`;
});

input.value="";
input.focus();

chat.scrollTop = chat.scrollHeight;

return;
    
}

    // INTERNET
    if(texto.includes("internet") || texto.includes("wi-fi")){
        ultimoProblema="internet";
        esperandoRespuesta = true;
        respuestas.push("📶 Verifica que el cable de red esté conectado correctamente o reinicia el módem/router.");
        respuestas.push("❓ ¿Se solucionó el problema?");
        respuestas.push("Escribe: Sí, No o ¿Cómo?");
    }

    // COMPUTADORA LENTA
    if(texto.includes("lenta") || texto.includes("lentitud")){
        ultimoProblema="lenta";
        esperandoRespuesta = true;
        respuestas.push("🐢 Cierra programas innecesarios, elimina archivos temporales y reinicia la computadora.");
        respuestas.push("❓ ¿Se solucionó el problema?");
        respuestas.push("Escribe: Sí, No o ¿Cómo?");
    }

    // IMPRESORA
    if(texto.includes("impresora") || texto.includes("imprime")){
        ultimoProblema="impresora";
        esperandoRespuesta = true;
        respuestas.push("🖨️ Revisa que la impresora esté encendida, conectada, tenga papel y suficiente tinta.");
        respuestas.push("❓ ¿Se solucionó el problema?");
        respuestas.push("Escribe: Sí, No o ¿Cómo?");
    }

    // AUDIO
    if(texto.includes("audio") || texto.includes("sonido")){
        ultimoProblema="audio";
        esperandoRespuesta = true;
        respuestas.push("🔊 Revisa el volumen y verifica que las bocinas estén conectadas.");
        respuestas.push("❓ ¿Se solucionó el problema?");
        respuestas.push("Escribe: Sí, No o ¿Cómo?");
    }

    // NO ENCIENDE
    if(texto.includes("no enciende") || texto.includes("no prende")){
        ultimoProblema="noenciende";
        esperandoRespuesta = true;
        respuestas.push("🔌 Comprueba que el cable de alimentación esté conectado correctamente.");
        respuestas.push("❓ ¿Se solucionó el problema?");
        respuestas.push("Escribe: Sí, No o ¿Cómo?");
    }
     // MICROSOFT OFFICE
    if(
texto.includes("office") ||
texto.includes("microsoft office") ||
texto.includes("word") ||
texto.includes("excel") ||
texto.includes("powerpoint") ||
texto.includes("outlook") ||
texto.includes("activacion") ||
texto.includes("activar") ||
texto.includes("activar office") ||
texto.includes("producto sin licencia") ||
texto.includes("licencia") ||
texto.includes("no puedo activar") ||
texto.includes("error de activacion")
){
    ultimoProblema="office";
    respuestas.push("📄 Verifica que hayas iniciado sesión con la cuenta de Microsoft con la que se activó Office. Si aparece el mensaje 'Producto sin licencia', revisa que tu licencia o suscripción siga vigente.");
}

    // YA LO HICE
    if(texto.includes("ya lo hice") || texto.includes("ya hice eso") || texto.includes("sigue igual")){

        if(ultimoProblema=="internet"){
            respuestas.push("📶 Si el problema continúa, verifica si otros dispositivos tienen Internet. Si ninguno tiene conexión, comunícate con tu proveedor.");
        }

        if(ultimoProblema=="lenta"){
            respuestas.push("🐢 Abre el Administrador de tareas con Ctrl + Shift + Esc y revisa qué programa consume más recursos.");
        }

        if(ultimoProblema=="impresora"){
            respuestas.push("🖨️ Intenta apagar la impresora durante un minuto y vuelve a encenderla. Después imprime una página de prueba.");
        }

        if(ultimoProblema=="audio"){
            respuestas.push("🔊 Ejecuta el solucionador de problemas de sonido desde la configuración de Windows.");
        }

        if(ultimoProblema=="noenciende"){
            respuestas.push("🔌 Si no enciende después de revisar el cable, prueba otro contacto eléctrico o revisa la fuente de poder.");
        }

        if(ultimoProblema=="office"){
    respuestas.push("📄 Comprueba que tu equipo esté conectado a Internet, cierra todas las aplicaciones de Office y vuelve a abrir Word o Excel. Si el problema continúa, verifica que no tengas varias versiones de Office instaladas y confirma que la licencia corresponda a la cuenta con la que iniciaste sesión."); 
    }
    }

    
   // COMO LO HAGO
if(texto.includes("como") || texto.includes("cómo")){

    if(ultimoProblema=="lenta"){
        respuestas.push("1. Presiona Ctrl + Shift + Esc.\n2. Abre el Administrador de tareas.\n3. En Procesos, ordena por CPU.\n4. Cierra únicamente los programas que consumen muchos recursos y que conozcas.");
    }

    if(ultimoProblema=="internet"){
        respuestas.push("1. Apaga el módem por 30 segundos.\n2. Enciéndelo nuevamente.\n3. Espera que todas las luces se estabilicen.\n4. Intenta navegar otra vez.");
    }

    if(ultimoProblema=="impresora"){
        respuestas.push("1. Abre Configuración.\n2. Ve a Impresoras y escáneres.\n3. Selecciona la impresora.\n4. Elige 'Quitar dispositivo'.\n5. Agrégala nuevamente.");
    }

    if(ultimoProblema=="audio"){
        respuestas.push("1. Haz clic derecho en el icono de sonido.\n2. Selecciona 'Solucionar problemas de sonido'.\n3. Sigue las instrucciones.");
    }

    // MICROSOFT OFFICE
    if(ultimoProblema=="office"){
        respuestas.push(
            "1. Abre Word o Excel.\n" +
            "2. Ve a Archivo > Cuenta.\n" +
            "3. Verifica que hayas iniciado sesión con tu cuenta de Microsoft.\n" +
            "4. Comprueba que la licencia esté activa y que no aparezca 'Producto sin licencia'.\n" +
            "5. Si el problema continúa, actualiza Office y reinicia el equipo."
        );
    }
}
    

    // RESPUESTA POR DEFECTO
    if(respuestas.length==0){
        respuestas.push("🤖 No comprendí completamente tu problema. ¿Podrías describirlo con más detalle? Por ejemplo: 'No tengo Internet', 'La impresora no imprime' o 'La computadora está lenta'.");
    }

    respuestas.forEach(function(respuesta){
        chat.innerHTML += `<div class="bot"><strong>Chatbot:</strong> ${respuesta}</div>`;
    });

    // Guardar las respuestas del chatbot
    respuestas.forEach(function(respuesta){
        historial.push({
            quien: "chatbot",
            mensaje: respuesta
    });
    });

    input.value="";
    input.focus();

    chat.scrollTop=chat.scrollHeight;
    }

    document.getElementById("mensaje").addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        enviarMensaje();
    }

    window.onload=function(){

    mostrarMenu();

}
});


