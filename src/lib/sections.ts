// Lista centralizada de identificadores de secciones para evitar typos
export const SECTIONS = {
  NAVBAR: "sec-navbar",
  HERO: "sec-hero",
  NOSOTROS_MISION: "sec-nosotros-mision",
  NOSOTROS_EQUIPO: "sec-nosotros-equipo",
  SERVICIOS_LISTADO: "sec-servicios-listado",
  VOLUNTARIOS_BENEFICIOS: "sec-voluntarios-beneficios",
  CONTACTO_INFO: "sec-contacto-info",
  OVERLAY_PREFIX: "sec-", // usar junto a `{sectionId}-overlay`
  // Page-specific
  CONTACT_PAGE: "sec-contact-page",
  FACILITIES_PAGE: "sec-facilities-page",
  SERVICES_PAGE: "sec-services-page",
  TEAM_PAGE: "sec-team-page",
  VOLUNTEER_PAGE: "sec-volunteer-page",
} as const;

export type SectionKey = keyof typeof SECTIONS;
