//CONST: lo uso para declarar las variables que sé q no van a cambiar, por ejemplos los elementos como botones, inputs, etc
//LET: para variables que pueden cambiar, no suelen ser variables que porvienen de elementos del dom, son variables creadas acá mismo

document.addEventListener("DOMContentLoaded", () => {
    //esto es para no tener problemas con que no se carguen los elementos xqel DOMContentLoaded espera a que el HTML esté completamente cargado antes de ejecutar este codigo

    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA LOGIN ---------------------------------------//
    //-------------------------------------------------------------------------------------------//

    //tomo las variables 
    const usuario = document.getElementById('usuario');//input
    const contra = document.getElementById('contrasenia');//input
    const enviar = document.getElementById('btn-submit-comienzo');

    //seteo al local los valores del usuario y la contraseña que yo quiero usar
    localStorage.setItem("usuario", "caro");//clave,valor
    localStorage.setItem("contrasenia", "12345");//clave, valor

    if (enviar) { //if para confirmar que existe ese boton y recien ahi hacer la accion, para evitar cualquier mal funcionaiento
        enviar.addEventListener("click", inicioSesion); //cuando hgo click se ejecuta la funcion
    }

    function inicioSesion() {
        let user = localStorage.getItem("usuario"); //recupero desde el local el usuario y la contra por sus claves, los guardo en variable
        let pass = localStorage.getItem("contrasenia");


        //si los datos ingresados en los inputs coinciden con los valores del local redirijo la pag al inicio.html, si no son correctos (esto incluye a si están vacios tambien) pongo el borde en rojo y muestro un alert
        if (user=== usuario.value && pass === contra.value) {
            window.location.href = "inicio.html"; //el window.location da informacion sobre la url actual de la pagina
            contra.style.border = "2px solid green";
            usuario.style.border = "2px solid green";
        } else {
            usuario.style.border = "2px solid red";
            contra.style.border = "2px solid red";
            alert("Datos incorrectos y/o campos vacios.")
        }
    }

    //variable para cerrar sesion cuando hago click se redirija al login.html
    const cerrar = document.getElementById('cerrar');
    if (cerrar) {
        cerrar.addEventListener("click", cerrarSesion);
    }

    function cerrarSesion() {
        window.location.href = "login.html";
    }



    //-------------------------------------------------------------------------------------------//
    //---------------------------- CÓDIGO PARA MODO OSCURO/CLARO --------------------------------//
    //-------------------------------------------------------------------------------------------//

    //tomo las variables
    const boton_modo = document.getElementById('btn-modo');
    const body = document.body;
    const titulo = document.getElementById('titulo-h1');
    let oscuro = false; //bandera;o sea que inicialmente esté claro

    if (boton_modo) { //si apreto el boton se ejecuta la fncion de abajo
        boton_modo.addEventListener("click", cambiarModo);
    }

    function cambiarModo() {
        if (!oscuro) {//si se hace esta funcion es xq el usuario dio click al boton, por lo que quiere que el modo esté oscuro, por ende la condicion seria true acá
            body.style.backgroundColor = "rgb(63, 63, 63)";
            titulo.style.color = "white";
            oscuro = true;
        } else { //si apretase otra vez, el oscuro=false otra vez porque quiere que sea claro
            body.style.backgroundColor = "#F4EFE6";
            titulo.style.color = "rgb(148, 64, 71)";
            oscuro = false;
        }
    }


    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA EL TITULO -----------------------------------//
    //-------------------------------------------------------------------------------------------//

    //hago esto porque quiero que cuando se cliquee sobre el titulo (preferentemente estando en otras pestañas) se redirija a la pestaña de inicio
    const btn_titulo = document.getElementById('titulo-h1');

    if (btn_titulo) {
        btn_titulo.addEventListener('click', redirigir);

    }

    function redirigir() {
        window.location.href = "file:///C:/Users/caro/Desktop/caro-facultad/tasques_V4_Otermin/tasques_V4_Otermin/HTML/inicio.html";
    }


    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA TAREAS -------------------------------------//
    //-------------------------------------------------------------------------------------------//

    //tomo las variables
    const p_crear_nota_tarea = document.getElementById('p-crear-nota-tarea');
    const cont_nota_nueva = document.getElementsByClassName('agregar-nota')[0];
    const textarea_crear_tarea = document.getElementById('textarea-crear-tarea');
    const contenedor_lista_tareas = document.getElementById('contenedor-lista-tareas');
    const form_crear_nota_tarea = document.getElementById('form-main-tarea');
    const btn_submit_tarea = document.getElementById('submit-tarea-btn');
    const lista_completadas_tareas = document.getElementById('contenedor-hechas-tareas');

    const tareas = JSON.parse(localStorage.getItem("tareas")) || []; //con esto recupero lo que se haya guardado en el local storage para las tareas, si no hay nada creado, hago un array vacio (vi q es buena pratica hacerlo)
    tareas.forEach(tarea => crearTarea(tarea)); //recorrido q por cada objeto tarea dentro del array tareas, implementa la funcion crear tarea (la crea visiblemente)

    if (form_crear_nota_tarea) { //el formulario aparece invisible al principio porque tiene que visibilizarse una vez que se se apreta el p
        form_crear_nota_tarea.style.display = "none";
    }

    if (p_crear_nota_tarea) { 
        p_crear_nota_tarea.addEventListener("click", () => { //cuando apreto sobre el "tenes tareas pendientes?..." aparece el form para escribir la nota
        //() => es una sintaxis más corta y concisa para definir funciones
            p_crear_nota_tarea.style.display = "none"; //oculto el texto de la pregunta porqeu tiene que aparecer el que esta atras
            cont_nota_nueva.remove(); //esto hace que cuando se aprete el boton desaparezca el contenedor del cartel que pregunta, que no desaparecia
            form_crear_nota_tarea.style.display = "block"; //aparece en bloque el elemento, es lo mismo que poner inline porque en este caso no hay diferencia visible
        });
    }

    if (btn_submit_tarea) {
        btn_submit_tarea.addEventListener("click", agregarTarea); //boton con la accion, la funcion esa revisa q no este vacio el lugar, crea al objeto y llama a la otra funcion
    }

    function agregarTarea(event) {//el event es el click del boton
        event.preventDefault(); //esto evita que se recargue el formulario cuando hago click porque el boton est dentro del form, entonces ni bien lo toque se recarga el form

        const tarea_reciente = textarea_crear_tarea.value.trim(); //tomo lo que se escriba en el txtarea

        if (tarea_reciente === "") { //si est vacio el textarea no puede agregarse la tarea
            textarea_crear_tarea.style.border = "1px solid red";
            alert("La tarea no puede estar vacia.");
        } else { 
            //si NO está vacio, permito q se escriba la tarea
            textarea_crear_tarea.style.border = "1px solid";

            //hago un objeto que representa UNA sola tarea, le pongo el texto y el estado que por defecto es false porque en el momento en que se crea la tarea, no está completada
            let unaTarea = {
                "text": tarea_reciente,
                "completada": false
            };
            tareas.push(unaTarea); //al array de tareas de le hago un push con la tarea nueva
            localStorage.setItem("tareas", JSON.stringify(tareas));//guardo-seteo-actualizo el array de tareas del local storage
            crearTarea(unaTarea); //llamo a la function que crea visualmente a la tarea xq en este punto ya estpa todo bien
        }
    }

    function crearTarea(tarea) {
        //esto lo pongo para que cuando no existen esos elementos (divs) no pase nada y se detenga la ejecucion el js, porque me pasó que al no existir en algunas pestañas, me rompia el js de algunas otras partes, no me gusta el return ahi pero bueno, no encontré otra forma de parar la ejecucion
        if (!contenedor_lista_tareas || !lista_completadas_tareas) return;

        const li = document.createElement('li');  //creo un elemento para despues meterlo en el ul contenedor-lista que est en tareas pendientes

        const checkbox = document.createElement('input'); //creo el checkbox
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox-tarea';
        checkbox.style.margin = "10px";
        checkbox.checked = tarea.completada;//tarea y unaTarea es el mismo objeto, solo que en funciones diferentes pero hago referencia al mismo objeto; acá estoy llamando a la otra propiedad dentro del obbjeto y lo q hago es decir que si completada: true, el checkbox tiene que estar tildado; si no lo pongo los checkboxs aparecen como destildados

        const span = document.createElement('span'); //creo el elemento span que va a contener al texto
        span.textContent = tarea.text;//al span que creo le paso lo que sea que se escribio en el txtarea, xq va a ser el nuevo contenedor de ese texto

        const cruz = document.createElement('span'); //creo otro elemento span porque siento que es mejor que hacer mas divs, los siento como mss compactos
        cruz.textContent = "❌";
        cruz.id = "cruz-eliminar";
        cruz.addEventListener("click", () => { //cuando se cliquee sobre la cruz, se ejecuta esto:

            let rta = confirm("¿Está seguro de eliminar la tarea? Esta acción no se puede deshacer."); //es como un alert pero este tiene la opcion de cancerlar o aceptar
            if (rta) { //si el usuario pone 'aceptar' borro el li
                li.remove();//para borrar el elemtnto li del dom, deja de ser visible en el div

                //esta parte la hago para que se elimine el evento del arreglo del local stoage y setear la actualizacion del array
                const index = tareas.indexOf(tarea); //objeto tarea, con el indexOf puedo encontrar la posicion de ese objeto en particular dentro del arreglo de tareas, para poder eliminarlo directamente


                if (index !== -1) { //acá es diferente de -1 porque el indexOf devuelve el elemento q busca o -1 si no lo encntró, esto lo hago para verificar que se encuentra xq sino puede borrar el ultimo elemento del arreglo y no es lo que yo quiero
                    tareas.splice(index, 1); //como estoy trabajando con arreglos y objetos ahora, tengo q usar el splice(el remove ya no es suficiente) que recibe el indice y la cantidad de elementos a eliminar
                }
                localStorage.setItem("tareas", JSON.stringify(tareas)); //actualizo el local storage porque borré elementos, entonces tengo que actualizarlo 
            }
        });

        //le hago el appendchild al elemento de lista cuidando el orden en que pongo los elementos porque así se van a mostrar en la pagina
        li.appendChild(checkbox); //al elemento lista que hice ms arriba le paso el checkbox y el span
        li.appendChild(span); // el texto
        li.appendChild(cruz);//la cruz
        li.id = "espacio-tarea"; //le di un id para el css

        tildado(); //tengo que llamar a la funcion de mover las tareas de lugar segun tengan la propiedad checked true

        textarea_crear_tarea.value = ""; //limpio el textarea

        checkbox.addEventListener('change', () => { //esta parte es cuando el usuario APRETA el checkbox
            tarea.completada = checkbox.checked; // actualizo el valor de completada porque el usuario puede tildar o destildar el checkbox
            localStorage.setItem("tareas", JSON.stringify(tareas)); // guardo los cambios, en este caso cambio el estado de la propiedad "completada" del objeto tarea, el stringify pasa los objetos a strings para q se puedan guardar en el local
            tildado(); //llamo a la funcion para poder ubicar al elemento li evaluando su estado de checked
        });


        //caro del futuro: se que vas a querer sacar esta funcion fuera de la funcion crearTareas porque pensas que tiene sentido tener todo ordenado por funcones, pero acordate que los elementos que estan en esta funcion no existen por fuera de crearTareas, entonces si la sacas te van a dar errores de uncaught
        function tildado() {//esta funcion es para que si el checkbox está tildado, la tarea se pase a la parte de hechas, y si no está tildado, la tarea se quede en la parte de pendientes
            if (checkbox.checked) {
                lista_completadas_tareas.appendChild(li);
            } else {
                contenedor_lista_tareas.appendChild(li);
            }
        }
    }


    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA EXTRAS -------------------------------------//
    //-------------------------------------------------------------------------------------------//

    //tomo la variable
    const mostrar_frases = document.getElementById('mostrar-frases');
    let arreglo_frases = [];
    arreglo_frases = [ //hago un arreglo indexado con algunas frases
        "'Los límites que establezco esta semana me protegerán a mí y a mis relaciones.'",
        "'Me prometo amor, paciencia y amabilidad esta semana.'",
        "'Darme prioridad es algo productivo.'",
        "'Me permitiré descansar cuando mi cuerpo lo necesite.'",
        "'Hoy va a ser un gran día.'",
        "'No saberlo todo es normal y no tiene nada de malo.'",
        "'Todos mis problemas tienen solución.'",
    ];
    let cantidadFrases = arreglo_frases.length;
    let indice_aleatorio = Math.floor(Math.random() * cantidadFrases); //con esto agarro un numero random y se la asigno a indice_aleatorio; math floor redondea un numero y math random es para elegir un numero random del cero hasta el largo del arreglo de frases

    if (mostrar_frases) {
        mostrar_frases.textContent = arreglo_frases[indice_aleatorio];
    } //al espacio le agrego la frase como tengo que se va a ir cambiando


    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA LA FECHA -------------------------------------//
    //-------------------------------------------------------------------------------------------//
    //tomo la variable
    const la_fecha = document.getElementById('la-fecha');
    function actualizarFecha() {
        const fecha = new Date(); //esto tira la fecha actaul

        let anio = fecha.getFullYear(); //obtengo el año actual de la fecha actual y lo asigno a una variable anio
        let mes = String(fecha.getMonth() + 1).padStart(2, '0'); //obtengo el mes actual y le sumo 1 porque los meses del date van del 0 al 11, el string hace que el numero pase a ser cadena para poder usar el pad start que funciona con strings no integers, el pad lo uso para que si es un solo digito, me complete con un cero 2 -> 02
        let dia = String(fecha.getDate()).padStart(2, '0');
        let horas = String(fecha.getHours()).padStart(2, '0');
        let minutos = String(fecha.getMinutes()).padStart(2, '0');

        //los puntos son operadores de acceso a las propiedades o metodos js, me permite encadenar las operaciones!!

        let formato_fecha = dia + "/" + mes + "/" + anio; //formateo el texto que quiero pasar con la fecha
        let formato_horas = horas + ":" + minutos; //lo mimso pero con la hora

        if (la_fecha) {
            la_fecha.textContent = "Fecha: " + formato_fecha + ". Hora: " + formato_horas;
        }//paso el texto completo
    }

    actualizarFecha(); // llamo acá al final a la funcion porque sino no carga nada
    setInterval(actualizarFecha, 60000); // esto es para que la funcion se ejecute en un intervalo de un minuto (1000 milesimas (1s) * 60 sgs)



    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA EVENTOS -------------------------------------//
    //-------------------------------------------------------------------------------------------//

    //tomo las variables
    const p_crear_nota_evento = document.getElementById('p-crear-nota-evento');
    const form_crear_evento = document.getElementById('form-main-evento');
    const textarea_crear_evento = document.getElementById('textarea-crear-evento');
    const fecha_evento = document.getElementById('date-evento');
    const btn_submit_evento = document.getElementById('submit-evento-btn');
    const eventos_por_vencer = document.getElementsByClassName('eventos-por-vencer')[0];
    const contenedor_lista_eventos = document.getElementById('contenedor-lista-eventos');

    const losEventos = JSON.parse(localStorage.getItem("eventos")) || []; //con esto cuando se carga la pagina se lee lo que tiene el array en el local storage, y si no existe se crea un array vacio
    losEventos.forEach(unEvento => crearEvento(unEvento)); //esto es para q sobre cada obj evento (cada elemento del array) se ejecute la funcion esa de crear evento

    //mucha parte del codigo es lo mismo de lo q esta en la seccion de tareas porque tuve que separar el html, tengo que repetir el mismo funcionamiento en la parte de eventos, q en un inicio era compartida para no repetir codigo pero bueno no se puede todo
    if (form_crear_evento) {
        form_crear_evento.style.display = "none";
    }

    if (p_crear_nota_evento) {
        p_crear_nota_evento.addEventListener("click", () => {
            p_crear_nota_evento.style.display = "none";
            cont_nota_nueva.remove();//esto hace que cuando se aprete el boton desaparezca el contenedor del cartel que pregunta, es un elemento compartido con la parte de tareas, es el div que engloba el p
            form_crear_evento.style.display = "inline"; //puede ser tambien block pero lo q yo quiero es que se muestre el lemento asi que en este momento cualquiera de los dos sirve
        });
    }

    if (btn_submit_evento) {
        btn_submit_evento.addEventListener("click", agregarEvento); //esta funcion se encarga de verificar q el usuario no deje los campos vacios, hace el objeto y despues llama a la funcion q crea visiblemente los eventos
    }


    function agregarEvento(event) {//el event es el boton
        event.preventDefault();

        const evento_texto = textarea_crear_evento.value.trim(); //recupero el texto q puso el usuario
        let fecha_texto = fecha_evento.value;// saco el texto del input fecha, o sea la fecha que diga el usuario

        if (evento_texto === "" || fecha_texto === "") { //para evitar que no se ponga una fecha o tarea
            textarea_crear_evento.style.border = "1px solid red";
            fecha_evento.style.border = "1px solid red";
            alert("El evento o la fecha no pueden estar vacios.");
        } else {
            //limpio los campos
            textarea_crear_evento.value = "";
            fecha_evento.value = "";
            textarea_crear_evento.style.border = "";
            fecha_evento.style.border = "";
            const unEvento = { //hago un objeto evento con esa info
                "text": evento_texto,
                "fecha": fecha_texto,
            };

            losEventos.push(unEvento); //pusheo ese obj evento al array de eventos del local storage
            localStorage.setItem('eventos', JSON.stringify(losEventos)); //hago el set item, q es guardar la info en el local storage con clave y valor

            crearEvento(unEvento); //llamo a la funcion que crea de forma visible al evento
        }
    }


    function calcularDiasRestantes(fecha) { //es la funcion q clacula los dias que quedan desde el evento del usuario a la fecha de hoy
        const hoy = new Date(); //esto permite que se actualice todo el tiempo la cantidad de dias, porque cada vez q abro la pagina, se carga todo y se vuelve a hacer el calculo con los datos actuales del sistema, lo que permite que el conteo de dias se refresque
        const fecha_evento_obj = new Date(fecha); //la fecha que entra por parametro es la misma q le paso al objeto date, cuando use esta funcion seria la fecha del evento en particular
        const diferencia = fecha_evento_obj - hoy;//diferencia de dias entre una fecha y otra aunque el resultado da en milisegundos, o sea la cantidad de días pero son en milisegundos
        const diasFaltantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // acá tengo que convertir esos milisegundos en días: 1000 son milisegundos * 60 que hacen un minuto * 60 que hacen una hora * 24 que es un día ; y el math ceil que redondea para arriba, por eso lo uso en lugar del math floor
        return diasFaltantes; // retorno los días 
    }


    function crearEvento(evento) { //funcion que crea el evento, los li, la cruz, el span con el texto, borra el evento, etc
        if (!contenedor_lista_eventos) return;

        let li = document.createElement('li');
        li.style.margin = "5px";
        li.id = "li-evento";

        let fecha = evento.fecha;
        let partes = fecha.split("-"); //hago esto porque la fecha que da el input date es a/m/d y yo quiero q sea d/m/a, entonces la tengo que descomponer y reordenar:

        let anio = partes[0];
        let mes = partes[1];
        let dia = partes[2];

        li.textContent = "📅 " + dia + "/" + mes + "/" + anio + " : " + evento.text; //quedó reorganizada y formateada la fehca, y le concateno el evento del ususario

        const cruz = document.createElement('span');
        cruz.textContent = "❌";
        cruz.id = "cruz-eliminar-evento";
        cruz.style.marginLeft = "10px";
        cruz.style.cursor = "pointer";

        cruz.addEventListener("click", () => { //le doy la accion a la cruz

            let res = confirm("¿Desea borrar el evento? Esta acción no se puede deshacer."); //acá se guarda el true(aceptar) o false(cancelar) de ese evento de ventana
            if (res) { //o sea si el usuario apretó en 'aceptar'
                li.remove();

                //como en tareas, esta parte es porque estoy trabajando con un arreglo del lcal storage, entonces tengo q borrar el elemento del arreglo tambien
                const index = losEventos.indexOf(evento);
                if (index !== -1) {//tiene que ser distinto de -1 porque ese es el resultado que el indexOf da en caso de que no se encuentre el elemento y así evito que se borre el ultimo elemento
                    losEventos.splice(index, 1); //splice xq trabajo con array, le paso el indice y la cantidad de elementos que quiero borrar
                    localStorage.setItem("eventos", JSON.stringify(losEventos)); //guardo la nueva informacion con el evento borrado del array

                    //hago eso mismo pero con los eventos que se cumplen de acá a 7 dias, esto me di cuenta que no afecta al funcionamiento, quedó obsoleto pero no lo borro x las dudas
                    // const urgenteIndex = losEventos.indexOf(evento);
                    // if (urgenteIndex !== -1) {
                    //     losEventos.splice(urgenteIndex, 1);
                    // }

                }
            }
        });

        li.appendChild(cruz); //al li que contiene la tarea le agrego el span cruz
        contenedor_lista_eventos.appendChild(li); //al div que contiene a todo ese espacio le agrego el elemento li con el span texto y la cruz 


        //lo siguiente es para hacer lo de los eventos que estan por vencer, en el widget del costadito
        const diasRestantesActuales = calcularDiasRestantes(evento.fecha);//llamo a la funcion que calcula los dias restantes con la fecha que quiero calcular y se lo asigno a esa variable
        if (diasRestantesActuales <= 7 && diasRestantesActuales >= 0) { //si el resultado se encuentra entre estos valores:
            let elmto_vencer = document.createElement('li'); //creo otro elemento li para mostrarlo en el div del costado
            elmto_vencer.style.margin = "5px"; //margenes

            if (diasRestantesActuales == 0) { //para cuando los eventos son ese mismo dia
                elmto_vencer.textContent = "'" + evento.text + "'" + ": 🔔 ¡ES HOY!"; //formateo el texto que quiero mostrar
                eventos_por_vencer.appendChild(elmto_vencer); //al div general de elementos x vencer le hago un appendchild con el elemento que recién cree
            } else {//si es cualquier dia menos hoy
                elmto_vencer.textContent = "'" + evento.text + "'" + " en " + diasRestantesActuales + " día(s), con fecha: " + dia + "/" + mes + "/" + anio; //formateo el texto que quiero mostrar
                eventos_por_vencer.appendChild(elmto_vencer);//al div general de elementos x vencer le hago un appendchild con el elemento que recién cree
            }
        }
    }

    //como tuve que hacer esta diferenciacion de partes x el local storage, voy a tener que poner esto para que se puedan mostrar los eventos x vencer en cada pestaña especificamente, esto pasa porque los elementos del html que están en recordatorios no existen o no están con elmismo nombre en las otras pestañas, entonces no se cargan en el resto de las pestañas
    if ((document.body.classList.contains('pestania-inicio')) ||
        (document.body.classList.contains('pestania-contacto')) ||
        (document.body.classList.contains('pestania-conocer'))) {
        //document.body: para acceder al body del html
        //classList: devuelve como una lista de las clases q hay, en este caso en el body
        //contains: es para ver si se contiene lo que se pasa x parametro

        if (eventos_por_vencer) {//si existe el div de eventos x vencer
            losEventos.forEach(unEvento => {//ppor cada objeto del array de eventos:
                const diasRestantes = calcularDiasRestantes(unEvento.fecha); //recupero el numero que retorna esa funcion, o sea la cantidad de dias entre ambas fechas
                if (diasRestantes <= 7 && diasRestantes >= 0) { //si el numero está entre ese rango:
                    let fecha = unEvento.fecha; //tomo la fecha del objeto
                    let partes = fecha.split("-"); //con esto puedo dividir la fecha en todas las partes que hayan un -, en este caso hay tres

                    let anio = partes[0];
                    let mes = partes[1];
                    let dia = partes[2];
                    const elmto_vencer = document.createElement('li'); //genero un elemento de lista
                    elmto_vencer.style.margin = "5px";
                    if (diasRestantes == 0) { //si la cantidad de dias es igual a cero (o sea el evento es ese dia)
                        elmto_vencer.textContent = "'" + unEvento.text + "'" + ": 🔔 ¡ES HOY!";
                    } else { //si la cantidad de dias es cualquiera menos cero
                        elmto_vencer.textContent = "'" + unEvento.text + "'" + " en " + diasRestantes + " día(s), con fecha: " + dia + "/" + mes + "/" + anio; //en el texto pongo la fecha asi para que quede más legible
                    }
                    eventos_por_vencer.appendChild(elmto_vencer); //al div mayor le agrego el elemento de lista que tiene la info del evento
                }
            });
        }

        //esto lo pongo dentro de ese gran if porque en la pestaña de opiniones no existe el div de eventos por vencer xq da un error uncaught, entonces para que no pase hago que esto de redirigir solo pase en las otras pestañas que si lotienen
        const btn_div = document.getElementsByClassName('tareas-vencer')[0]; //esto es para que cada vez que se toque el div de eventos x vencer (desde fuera de la pestaña de recordatorios) se redirija a esa pestaña
        btn_div.addEventListener('click', redireccionar);
        function redireccionar() {
            window.location.href = "file:///C:/Users/caro/Desktop/caro-facultad/tasques_V4_Otermin/tasques_V4_Otermin/HTML/recordatorios.html";
        }
    }



    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA RELOJES -------------------------------------//
    //-------------------------------------------------------------------------------------------//

    /////////////////cronometro
    const cronometro = document.getElementById('cronometro');
    const btn_play = document.getElementById('play');
    const btn_stop = document.getElementById('stop');
    const btn_reset = document.getElementById('reset');

    let interval; //variable a la quee le asigno el tiempo actual x lo qe se actualiza todo el tiempo
    let seconds = 0;
    function formatoTiempo(seconds) {
        //segun los segundos que entran por parametros es que se calculan las hs, minutos y segs, el math floor es para redondear, el to string es para pasar a string y poder operar con padstart que lo que hace es poner un cero delante cuando el numero queda de un digito
        const h = Math.floor(seconds / 3600).toString().padStart(2, "0"); //ej: 60 seg / 3600 = 0 minutos y está bien
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0"); //ej: 60seg MOD 60 = 1 y 1 / 60 = 1 minuto
        const s = (seconds % 60).toString().padStart(2, "0"); //ej 60 seg MOD 60 = 60 segundos
        let tiempo_calculado = h + ":" + m + ":" + s; //ej: (de los ejemplos) 00: 01: 60 (aunque tendria q ser 00:02:00)
        return tiempo_calculado; //retorno el tiempo ya con el formato que yo quiero
    }

    function comenzarCronometro() {
        interval = setInterval(() => { //al intervalo le paso el set inverval donde incremento los segundos y al texto del cronometro lo formateo con la hora que me da lafuncion de arriba; el set interval toma una funcion y la ejecuta en el tiempo que le paso, o sea un segundo, cada un segundo la ejecuta... 1s=1000miliseg
            seconds++; //esto es un contador y va contando segundos
            cronometro.textContent = formatoTiempo(seconds); //los segundos de arriba son los que le paso a la funcion y que funcionan como texto del p 'cronometro'
        }, 1000);
    }

    function pararCronometro() {
        clearInterval(interval); //clear sirve para parar lo que se haya empezado con setinterval, o sea que acá para de contar
    }

    function resetearCronometro() {
        pararCronometro();
        seconds = 0; //reseteo los segundos, vuelve a cero
        cronometro.textContent = "00:00:00"; //limpio el txt del p 'cronometro' y lo dejo como al principio
    }

    btn_play.addEventListener("click", comenzarCronometro); //paso las funciones a los botones
    btn_stop.addEventListener("click", pararCronometro);
    btn_reset.addEventListener("click", resetearCronometro);


    /////////////////pomodoro
    const pomodoro = document.getElementById('pomodoro');
    const btn_comenzar = document.getElementById('comenzar');
    const btn_parar = document.getElementById('parar');
    const btn_resetear = document.getElementById('resetear');

    let tiempo_queda = 1500; //cantidad total de segundos en 25 min (60*25)
    let intervalo; //le asigno el tiempo actual x lo qe se actualiza todo el tiempo

    function actualizarPom() {
        const minutos = Math.floor(tiempo_queda / 60); //cuantos minutos hay dentro de los 1500, el math floor para redondear
        const segundos = Math.floor(tiempo_queda % 60); //para obtener los segundos

        pomodoro.textContent = minutos + ":" + segundos.toString().padStart(2, "0"); //no me importa que no queden dos digitos cuando baja de 10, excepto por la segunda parte entonces padstart para que quede con dos digitos y si queda uno solo se le pone el cero y para que pad funcione tengo que poner el toSrting porqueno funciona con integers
    }

    function parar() {
        clearInterval(intervalo); //para lo que se inciio con set interval
    }

    function comenzar() {
        intervalo = setInterval(() => {
            tiempo_queda--; //resto 1 porque no es un cronometro, sino que el tiempo disminuye
            actualizarPom(); //llamo a la funcion que hace los calculos del tiempo
            if (tiempo_queda === 0) { //si el tiempo q queda es igual a cero, muestro el alert 
                alert("Se terminó el tiempo!");
                resetear(); //llamo a la funcion porque lo que hago acá es basicamente esa funcion, si no pongo esto sigue contando pero ahora con numeros negativos
            }
        }, 1000); //setinterval es una funcion que recibe como param una funcion y el tiempo, que es el que depende la funcion para ejecutarse, 1000 milisegundos = 1sg, o sea que cada 1 segundo se va a ejecutar lo que yo ponga dentro de la funcion anonima que en este caso es el conteo hacia abajo del tiempo
    }

    function resetear() {
        parar();
        tiempo_queda = 1500; //reseteo el valor del tiempo
        actualizarPom(); //acualizo la funcion que calcula todo
    }


    btn_comenzar.addEventListener("click", comenzar); //botones con las acciones
    btn_parar.addEventListener("click", parar);
    btn_resetear.addEventListener("click", resetear);



    //-------------------------------------------------------------------------------------------//
    //--------------------------------- CÓDIGO PARA CONTACTO ------------------------------------//
    //-------------------------------------------------------------------------------------------//

    //no le pongo más js porque el profe dijo que esta parte era más estatica, entonces coloco lo necesario de js para que no quede sin hacer nada cuando se manda el form
    const boton_enviar = document.getElementById('btn-submit');

    if (boton_enviar) {
        boton_enviar.addEventListener('click', () => {
            alert("Comentario enviado.");
        });
    }


    /***/
});
