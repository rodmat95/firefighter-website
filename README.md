# Sitio Web de Bomberos

Este documento narra la historia, el propósito y la tecnología detrás del sitio web de la asociación de bomberos.
Para instrucciones técnicas de despliegue e instalación, por favor consulta [DEPLOY.md](./DEPLOY.md).

## ¿Qué es este proyecto?

Este proyecto es una plataforma web integral diseñada para modernizar la presencia digital de la asociación de bomberos. No es solo una página informativa, sino una herramienta interactiva que sirve como puente entre el cuerpo de bomberos y la comunidad. El sitio actúa como un centro de información, una galería histórica y una ventana virtual a las instalaciones de la estación, permitiendo a los ciudadanos explorar y conectar con la institución de una manera nunca antes posible.

## ¿Por qué se construyó?

La asociación de bomberos necesitaba una forma más efectiva de comunicarse con la comunidad y gestionar sus recursos digitales. Las motivaciones principales fueron:

1.  **Transparencia y Acercamiento**: La comunidad a menudo desconoce el equipamiento y las instalaciones con las que cuentan sus bomberos. Se necesitaba una forma de abrir las puertas de la estación las 24 horas del día.
2.  **Modernización**: La presencia web anterior era limitada y no reflejaba el profesionalismo de la institución. Era necesario adoptar tecnologías modernas "mobile-first" para llegar a los ciudadanos en sus dispositivos preferidos.
3.  **Gestión Interna**: Se requería un sistema que permitiera a la administración actualizar información crítica y gestionar el contenido del sitio sin depender constantemente de desarrolladores externos.
4.  **Preservación Histórica**: La necesidad de digitalizar y mostrar la historia y los protagonistas del cuerpo de bomberos para las futuras generaciones.

## ¿Cómo se construyó?

El desarrollo del proyecto se centró en la robustez, el rendimiento y la experiencia de usuario inmersiva. Se eligió un stack tecnológico de vanguardia:

*   **Next.js y React**: Utilizamos Next.js como el núcleo para garantizar una carga rápida y un SEO óptimo, permitiendo que la información vital sea accesible instantáneamente.
*   **Marzipano (Visita Virtual)**: Para la experiencia inmersiva, integramos Marzipano, creando un recorrido de 360° personalizado. Desarrollamos editores propios (Hotspot, Path y North Offset Editors) que permiten a los administradores crear y modificar el recorrido sin tocar código.
*   **Tailwind CSS y Diseño Responsivo**: Maquetamos cada interfaz pensando primero en dispositivos móviles, asegurando que la experiencia sea fluida tanto en un teléfono durante una emergencia como en una pantalla de escritorio.
*   **Cloudflare R2 y Sharp**: Implementamos un sistema de optimización de imágenes "on-the-fly" y almacenamiento en la nube para manejar la gran cantidad de medios del recorrido virtual sin sacrificar el rendimiento del sitio.
*   **i18n (Internacionalización)**: Construimos una arquitectura bilingüe (Español/Inglés) desde cero para servir a una comunidad diversa.

## ¿Qué se consiguió?

El resultado es una plataforma viva y autogestionable que ha transformado la imagen digital de la asociación:

*   **Inmersión Total**: Los usuarios ahora pueden caminar virtualmente por la estación, ver los camiones por dentro y entender el equipamiento, fomentando un mayor respeto y conexión con la labor de los bomberos.
*   **Autonomía**: La administración cuenta con un panel seguro desde donde pueden actualizar noticias, gestionar el recorrido virtual y recibir mensajes de la comunidad.
*   **Alcance Global**: Gracias al soporte bilingüe, la historia y labor de la asociación pueden ser apreciadas por una audiencia internacional.
*   **Rendimiento y Escalabilidad**: El sitio es extremadamente rápido y está preparado para crecer con nuevas funcionalidades en el futuro.