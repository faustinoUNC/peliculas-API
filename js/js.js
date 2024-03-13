let container = document.getElementById('catalogo')

let divAlbumbCardsA = document.createElement("div");
divAlbumbCardsA.className = "album py-5";
container.append(divAlbumbCardsA)

let divAlbumCardsB = document.createElement("div");
divAlbumCardsB.className = "container text-center ";
divAlbumbCardsA.append(divAlbumCardsB)

let divPaginacion = document.createElement("div");
divPaginacion.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 d-flex justify-content-around";
divAlbumCardsB.append(divPaginacion)

let divAlbumbCardsC = document.createElement("div");
divAlbumbCardsC.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 d-flex justify-content-around";
divAlbumCardsB.append(divAlbumbCardsC)

let apikey = '98c7a8196e8faeaedfe87f7a6ce27886'
let paginaActual = 1



//Opcion 1
/* async function cargarPeliculas(paginaActual) {
    //Jay que esperar a que la promesa se resuelva como fulfilled o rejected
    //Para esperar a que se resuelva la promesa usamos await que solo puede ser usado dentro de una funcion async
    //Uso de try y catch para manejar errores en promesas

    try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=es-ES&page=${paginaActual}`)

        console.log(respuesta)//Respuesta de la promesa

        //Ejecuto un mensaje de error en base al status de la respuesta
        if (respuesta.status === 200) {
            //Paso la respuesta de la promesa a un objeto json para poder manipularlo comoo objetos
            let datosPasadosAjson = await respuesta.json()
            console.log(datosPasadosAjson.results)

            divAlbumbCardsC.innerHTML = "";
            datosPasadosAjson.results.forEach(pelicula => {
                let card = document.createElement("div");
                card.className = "col";
                card.innerHTML = `<div class="card shadow-sm" style="max-width: 12rem; height: 100%;"> 
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="bd-placeholder-img card-img-top" width="100%" height="225"  role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title></rect></img>

                <div class="card-body">
                 <h5 class="card-title">${pelicula.title}</h5>
                </div>
              </div>`
                divAlbumbCardsC.append(card)
            });
        } else if (respuesta.status === 401) {
            console.log('No estas autorizado')
        } else if (respuesta.status === 404) {
            console.log('No se encontro la pagina')
        } else {
            console.log('Error desconocido')
        }

    } catch (error) {
        console.log(error)
    }
}

let paginacion = document.createElement("div");
paginacion.className = "mt-5 d-flex justify-content-around";
divAlbumCardsB.append(paginacion)

let botonAnterior = document.createElement("button");
botonAnterior.className = "btn btn-primary";
botonAnterior.innerHTML = "Anterior";
paginacion.append(botonAnterior)

let botonSiguiente = document.createElement("button");
botonSiguiente.className = "btn btn-primary";
botonSiguiente.innerHTML = "Siguiente";
paginacion.append(botonSiguiente)

botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--
        cargarPeliculas(paginaActual)
    }
})

botonSiguiente.addEventListener("click", () => {
    if (paginaActual < 500) {
        paginaActual++
        cargarPeliculas(paginaActual)
    }
})

cargarPeliculas(paginaActual) */



//Opcion 2
let listaPeliculas = []//Prefiero declarar la variable a modo global para poder usarla en cualquier funcion

function cargarPeliculas(paginaActual) {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=es-ES&page=${paginaActual}`)

        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401) {
                console.log('No estas autorizado')
            } else if (response.status === 404) {
                console.log('No se encontro la pagina')
            } else {
                console.log('Error desconocido')
            }
        })
        .then(data => {
            listaPeliculas = data.results
            renderCatalogo(listaPeliculas, paginaActual)
            return data
        })
        .catch(error => {
            console.log(error)
        })
}

function renderCatalogo(peliculasParaRenderizar) {
    divAlbumbCardsC.innerHTML = "";
    divAlbumbCardsC.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 d-flex justify-content-around";

    peliculasParaRenderizar.forEach((pelicula) => {
        let card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `<div class="card shadow-sm" style="max-width: 14rem; height: 100%;"> 
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="bd-placeholder-img card-img-top" width="100%" height="225"  role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title></img>

        <div class="card-body">
         <h5 class="card-title">${pelicula.title}</h5>
        </div>

      </div>`
        divAlbumbCardsC.append(card)

        let paginacion = document.createElement("div");
        paginacion.className = "mt-5 d-flex justify-content-around fixed-bottom bg-primary-subtle p-3";
        divAlbumCardsB.append(paginacion)

        let botonAnterior = document.createElement("button");
        botonAnterior.className = "btn btn-primary";
        botonAnterior.innerHTML = "Anterior";
        paginacion.append(botonAnterior)

        let marcadorPagina = document.createElement("p");
        marcadorPagina.className = "text-black";
        marcadorPagina.innerHTML = `Pagina: ${paginaActual}`;
        paginacion.append(marcadorPagina)

        let botonSiguiente = document.createElement("button");
        botonSiguiente.className = "btn btn-primary";
        botonSiguiente.innerHTML = "Siguiente";
        paginacion.append(botonSiguiente)
        marcadorPagina.innerHTML = `Pagina: ${paginaActual}`;

        botonAnterior.addEventListener("click", () => {
            if (paginaActual > 1) {
                paginaActual--
                cargarPeliculas(paginaActual)
            }
        })

        botonSiguiente.addEventListener("click", () => {
            if (paginaActual < 500) {
                paginaActual++
                cargarPeliculas(paginaActual)
            }
        })
    });
}
cargarPeliculas(1)