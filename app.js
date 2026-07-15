const screens = {
  agenda: ["assets/screens/agenda.png", "Tela de agenda da Enna", "Compromissos organizados por data e horário."],
  sessions: ["assets/screens/sessions.png", "Tela de sessões da Enna", "Histórico de sessões ligado ao cadastro do paciente."],
  finance: ["assets/screens/finance.png", "Tela financeira da Enna", "Recebimentos, pendências e despesas no mesmo fechamento."],
  agent: ["assets/screens/agent.png", "Painel da agente da Enna", "Uma solicitação administrativa feita em linguagem natural."],
  whatsapp: ["assets/screens/whatsapp.png", "Configuração de WhatsApp da Enna", "Conexão por QR code com capacidades isoladas para pacientes."]
};

document.querySelectorAll('[role="tab"]').forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll('[role="tab"]').forEach((item) => item.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    const [src, alt, caption] = screens[tab.dataset.screen];
    const image = document.querySelector("#demo-image");
    image.src = src;
    image.alt = alt;
    document.querySelector("#demo-caption").textContent = caption;
  });
});

const utm = new URLSearchParams(location.search);
const attribution = {
  source: utm.get("utm_source") || "direct",
  medium: utm.get("utm_medium") || "",
  campaign: utm.get("utm_campaign") || "",
  content: utm.get("utm_content") || "",
  version: "1.0.0-beta.1"
};

const recordLandingEvent = (event) => {
  if (location.protocol !== "https:") return;
  const payload = JSON.stringify({event, ...attribution});
  navigator.sendBeacon?.(
    "https://enna.13-140-147-146.sslip.io/metrics/landing",
    new Blob([payload], {type: "text/plain"})
  );
};

document.querySelectorAll(".download-link").forEach((link) => {
  link.addEventListener("click", () => {
    recordLandingEvent("download_click");
  });
});

recordLandingEvent("page_view");
