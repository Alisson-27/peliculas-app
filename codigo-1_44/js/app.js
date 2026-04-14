$(document).ready(function () {

  $("#spinner").show();

  let peliculasGlobal = []; // 👈 para buscador/filtros

  $.ajax({
    url: "data/peliculas.json",
    method: "GET",
    dataType: "json",

    success: function (peliculas) {

      peliculasGlobal = peliculas;

      renderPeliculas(peliculas);

    },

    error: function () {
      $("#lista-peliculas").html(`
        <div class="col-12 text-danger text-center">
          Error al cargar películas
        </div>
      `);
    },

    complete: function () {
      $("#spinner").hide();
    }

  });

  // 🎬 FUNCIÓN RENDER
  function renderPeliculas(peliculas) {

    let html = "";
    let hoy = new Date();

    peliculas.forEach(function (peli) {

      let estreno = new Date(peli.estreno);
      let esEstreno = estreno > hoy;

      let precio = esEstreno
        ? peli.precios.estreno
        : peli.precios.normal;

      html += `
        <div class="col-md-4 pelicula-item">
          <div class="card shadow h-100">

            <img src="img/${peli.imagen}" class="card-img-top">

            <div class="card-body text-dark">

              <h5 class="fw-bold titulo-peli">${peli.titulo}</h5>

              <p>${peli.sinopsis.substring(0, 90)}...</p>

              <span class="badge bg-primary">
                ${peli.genero.join(" / ")}
              </span>

              <p class="mt-2"><b>💰 $${precio}</b></p>

              <span class="badge ${esEstreno ? "bg-success" : "bg-secondary"}">
                ${esEstreno ? "Estreno" : "Cartelera"}
              </span>

              <br><br>

              <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary w-100">
                Ver más 🎬
              </a>

            </div>
          </div>
        </div>
      `;
    });

    $("#lista-peliculas").html(html);
  }

  // 🔍 BUSCADOR
  $(document).on("keyup", "#buscar", function () {

    let texto = $(this).val().toLowerCase();

    $(".pelicula-item").each(function () {

      let titulo = $(this).find(".titulo-peli").text().toLowerCase();

      if (titulo.includes(texto)) {
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });

});

$(document).on("change", "#filtroGenero", function () {
  let genero = $(this).val();

  $(".card").each(function () {
    let texto = $(this).text();

    if (genero === "todos" || texto.includes(genero)) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
});