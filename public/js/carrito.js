
function añadirAlCarrito(idProducto) {
  try {
    let carrito = localStorage.getItem("Carrito de compras");
    try {
      carrito = JSON.parse(carrito);
    } catch (error) {
      console.log("Entró a crear el carrito")
      localStorage.setItem("Carrito de compras", "[]");
      return añadirAlCarrito(idProducto);
    }
    if (carrito === null || carrito.length === 0) carrito = [];
    // For para verificar si existe el articulo en el carrito
    let found = false;
    for (const item of carrito) {
      if (item.idProducto === idProducto) {
        if (item.cantidad <= 0) {
          item.cantidad = 1;
        } else {
          item.cantidad += 1;
        }
        found = true;
        break;
      }
    }

    // Articulo no existente en el carrito
    if (!found) {
      // Añadir producto al carrito
      let producto = {
        idProducto,
        cantidad: 1,
      };
      carrito.push(producto);
    }

    // Guardar carrito
    localStorage.setItem("Carrito de compras", JSON.stringify(carrito));

    // Mostrar al usuario
    alert("producto añadido correctamente");
  } catch (error) {
    console.log("No se pudo agregar");
    alert("No se pudo agregar" + error);
  }
}

function cambiarCantidad(index) {
	// Obtención de carrito de localStorage
	let carrito = localStorage.getItem("Carrito de compras");

	try {
		carrito = JSON.parse(carrito);
	} catch (error) {
		localStorage.setItem("Carrito de compras", '[]');
		return mostrarCarrito();
	}

	if (isNaN(carrito[index].cantidad)) {
		carrito[index].cantidad = 1;
		return localStorage.setItem("Carrito de compras", JSON.stringify(carrito));
	}

	carrito[index].cantidad = parseInt(document.querySelectorAll(".contador")[index].value);
  let disponibilidad = parseInt( document.querySelectorAll(".disponibilidadItem")[index].innerHTML)

  console.log(disponibilidad)
	if (carrito[index].cantidad >= disponibilidad) {
		carrito[index].cantidad = disponibilidad;
	} else if (carrito[index].cantidad <= 0 || isNaN(carrito[index].cantidad)) {
		carrito[index].cantidad = 1
	}

	document.querySelectorAll(".contador")[index].setAttribute("value", carrito[index].cantidad);
	document.querySelectorAll(".contador")[index].value = carrito[index].cantidad;

	// Guardar carrito en el localStorage
	localStorage.setItem("Carrito de compras", JSON.stringify(carrito));
}


function eliminarProducto(indice) {
	try {
		// Obtención de carrito de localStorage
		let carrito = localStorage.getItem("Carrito de compras");
		carrito = JSON.parse(carrito);

		// Si el carrito es nulo o solo tiene un producto
		if (carrito === null || carrito.length <= 1) {
			localStorage.removeItem("Carrito de compras");
		} else {
			// Eliminar producto del carrito
			carrito.splice(indice, 1);
			localStorage.setItem("Carrito de compras", JSON.stringify(carrito));

			let contenido = document.getElementById("#carritoContendio");
			contenido.removeChild(contenido.children[indice]);

		}
		mostrarCarrito();
	} catch (error) {
		console.log(error);
	}
}


async function mostrarCarrito() {
  // Obtenemos el carrito del localstorage
  let carrito = localStorage.getItem("Carrito de compras");

  let contenido = document.getElementById("#contenidoCarrito");

  try {
    carrito = JSON.parse(carrito);
  } catch (error) {
    localStorage.setItem("Carrito de compras", "[]");
    return mostrarCarrito(idProducto);
  }

  if (carrito === null || carrito.length === 0) {
    // Validar si el carro está vacio
    contenido.innerHTML = `
			<div class="row">
                <h2>No existen productos en el carrito</h2>
            </div>
		`;
    localStorage.setItem("Carrito de compras", JSON.stringify(carrito));
    return console.log("No hay productos");
  }

  // En caso de tener productos los mostraremos en la página
  contenido.innerHTML = `
    <div class="row">
        <h2 class="text-center">No olvides adquirir tus productos</h2>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 mb-2 mb-md-0">
            <label for="pago" class="form-label">Método de pago</label>
            <select class="form-select" id="tipoPago">
                <option disabled selected>Seleccione un método de pago</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
            </select>
        </div>
        <div class="col-12 col-md-6 mb-2 mb-md-0">
			<label for="precio" class="form-label">Total</label>
			<div class="input-group">
				<span class="input-group-text">$</span>
				<input type="text" id="#totalCarrito" class="form-control" disabled required />
			</div>
		</div>
    </div>
    <table class="table table-light table-hover mt-2 mb-3">
      <thead>
        <tr>
          <th scope="col" style="min-width: 125px" class="text-center">Imagen</th>
          <th scope="col" style="min-width: 200px" class="text-center">Nombre</th>
          <th scope="col" style="min-width: 100px" class="text-center">Precio</th>
          <th scope="col" style="min-width: 200px" class="text-center">Cantidad</th>
          <th scope="col" style="min-width: 100px" class="text-center"></th>
        </tr>
      </thead>
      <tbody id="#carritoContendio" class="table-group-divider align-middle">
		  </tbody>
	  </table>`;
    let tabla = document.getElementById("#carritoContendio");

    // For para obtener informacion de cada item del inventario
	let i = 0;
	let errores = [];
	let total = 0;
	for (const objeto of carrito) {
		try {
			let  producto  = await axios.post('/obtenerProducto', {
				idProducto: objeto.idProducto
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
      console.log(producto.data )
			//if (typeof producto === "string") {
			//	window.location.pathname = "/login";
			//}

			
      total += parseFloat(producto.data.precio) * parseInt(objeto.cantidad)
      console.log(total)
      tabla.innerHTML += `<tr>
				<td class="text-center p-0">
					<img class="w-100" src="http://res.cloudinary.com/dpxkp2hie/image/upload/w_150,h_150,c_fill,q_90/${producto.data.img}"/>
				</td>
				<td class="text-center" scope="row">
					${producto.data.nombreProducto}
				</td>
				<td class="text-center">
					$${producto.data.precio}
				</td>
				<td class="text-center">
					<div class="d-flex justify-content-center gap-2">
						
						<input type="number" class="form-control contador" min="0" max="${producto.data.cantidad}" value="${objeto.cantidad}" onChange="cambiarCantidad(${i})">
						
					</div>
					<p class="mb-0 mt-2 p-0">Disponibles: <span class="disponibilidadItem">${producto.data.cantidad}</span></p>
				</td>
				<td class="text-center p-0">
					<button class="btn btn-danger" onclick="(eliminarProducto(${i}))">eliminar</button>
				</td>
			</tr>`;

      

    } catch (error) {
			console.error(error);
			errores.push(i);
		}
		i++;
	}
  // Poner total correspondiente
  document.getElementById("#totalCarrito").value = total;
}
