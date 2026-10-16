# DavanteDent - Sistema de Gestión de Citas

Aplicación web desarrollada como Trabajo de Enfoque para el módulo de Desarrollo Web en Entorno Cliente del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW)

## Descripción del Proyecto
Sistema web monopuesto diseñado para la gestión interna de citas en las sedes de la clínica dental DavanteDent. Permite el registro, validación estricta, modificación y borrado de citas de pacientes de forma local, garantizando el aislamiento de datos entre las diferentes sedes mediante el almacenamiento en el navegador.

## Tecnologías y Estándares
* **HTML5**: Estructuración semántica de la interfaz (cabecera con logotipo corporativo, formulario interactivo y tabla de registros dinámica).
* **CSS3**: Maquetación moderna con Flexbox/Grid, variables corporativas y diseño adaptable.
* **JavaScript (ES6+)**: 
  * Programación Orientada a Objetos mediante la clase `Cita`.
  * Manipulación avanzada y dinámica del DOM.
  * Validación en cliente con retroalimentación visual de errores sin pérdida de datos.
  * Gestión de persistencia local mediante cookies del navegador.

## Funcionalidades Principales
1. **Control de Citas**: Alta, baja y modificación de registros vinculados a un identificador único basado en el instante exacto de registro (`Date.now()`), mantenido oculto para el usuario.
2. **Validación en Cliente**: Verificación de campos obligatorios, formatos de DNI y restricciones numéricas (como evitar cadenas de texto en campos telefónicos).
3. **Persistencia Local y Gestión de Vistas**: Sincronización automática con cookies del navegador y control dinámico de la fila vacía en la tabla según el estado de los registros.

## Autor
Adrián Pineda Torrejón - Trabajo enfoque Desarrollo entorno cliente DAW Online
