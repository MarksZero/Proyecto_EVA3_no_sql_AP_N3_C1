# no_sql_AP_N3_C1

Proyecto de la Evaluación N°3 de Bases de Datos No Estructuradas.

El sistema permite registrar usuarios en MongoDB y asociarlos con cuentas bancarias mediante una relación 1:N.

```txt
Usuario 1:N CuentaBancaria
```

---

## Estructura del proyecto

```txt
no_sql_AP_N3_C1
│
├── backend
│   ├── package.json
│   ├── package-lock.json
│   └── servidor.js
│
├── frontend
│   ├── assets
│   │   ├──imagenes
│   │   │  └── ඞඞඞඞamongusඞඞඞඞ
│   ├── css
│   │   ├── brite.css
│   │   ├── cyborg.css
│   │   └── estilos.css
│   │
│   ├── scripts
│   │   ├── ap_n3_c1.js
│   │   ├── comunas_chile.js
│   │   ├── jQuery v4.0.0.js
│   │   └── paises.js
│   │
│   ├── cuentas_bancarias.html
│   ├── formulario.html
│   ├── inicio.html
│   └── registro_cuenta.html
│
├── fondo_blanco.txt
└── README.md
```

---

## Instalación

Entrar a la carpeta del backend:

```powershell
cd backend
```

Instalar dependencias:

```powershell
npm install
```

---

## Ejecutar servidor

Desde la carpeta `backend`, ejecutar:

```powershell
node servidor.js
```

El servidor funciona en:

```txt
http://localhost:3000
```

La base de datos utilizada es:

```txt
AP_N3_C1
```

---

## Cargar países y comunas

Antes de usar el formulario, se deben cargar los datos iniciales con `mongosh`.

Desde la carpeta raíz del proyecto:

```powershell
mongosh "mongodb://localhost:27017" --file ".\frontend\scripts\paises.js"
```

```powershell
mongosh "mongodb://localhost:27017" --file ".\frontend\scripts\comunas_chile.js"
```

Esto crea y llena las colecciones:

```txt
paises
comunas
```

---

## Colecciones principales

```txt
usuarios
cuentas_bancarias
paises
comunas
```

---

## Usuario

El objeto Usuario contiene:

```txt
nombre
rut
correo
telefono
fechaNacimiento
nacionalidad
genero
direccion
contrasena
fechaRegistro
activo
```

La dirección se guarda como objeto:

```txt
direccion: {
  comuna,
  calle,
  numero,
  departamento
}
```

La contraseña se almacena encriptada con `bcrypt`.

---

## CuentaBancaria

La entidad asignada fue `CuentaBancaria`.

Campos utilizados:

```txt
usuario
banco
tipoCuenta
numeroCuenta
moneda
saldo
fechaApertura
estado
sucursal
titular
```

El campo `usuario` almacena el `_id` del usuario asociado.

---


## Vistas HTML

```txt
frontend/inicio.html
```

Página principal.

```txt
frontend/formulario.html
```

Formulario para registrar usuarios.

```txt
frontend/registro_cuenta.html
```

Formulario para registrar cuentas bancarias y asociarlas a un usuario.

```txt
frontend/cuentas_bancarias.html
```

Tabla que muestra usuarios y cuentas bancarias asociadas.

---

## Prueba de uso

1. Ejecutar MongoDB.
2. Cargar países y comunas.
3. Ejecutar el servidor con `node servidor.js`.
4. Abrir `formulario.html` y registrar un usuario.
5. Abrir `registro_cuenta.html` y registrar una cuenta bancaria.
6. Abrir `cuentas_bancarias.html` para ver la relación entre usuario y cuenta bancaria.
