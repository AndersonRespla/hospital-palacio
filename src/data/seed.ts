import type { PacienteVirtual, Internacao, RegistroMedico } from "../models/models";

export const pacientes: PacienteVirtual[] = [
  {
    id: "HTA-001",
    nomeFicticio: "Hipertenso Tomás Alves",
    siglaDoenca: "HTA",
    grupo: "cronico",
    idade: 63,
    sexo: "M",
    etnia: "mulato claro",
    urlImagem: "https://ia.exemplo/hipertenso-tomas.png",
    comorbidades: ["tabagismo", "dislipidemia"],
    custoPorCamaMes: 5500,
  },
  {
    id: "DM2-002",
    nomeFicticio: "Diabético Marina Souza",
    siglaDoenca: "DM2",
    grupo: "cronico",
    idade: 57,
    sexo: "F",
    etnia: "parda",
    urlImagem: "https://ia.exemplo/diabetica-marina.png",
    comorbidades: ["sedentarismo", "hipertensao"],
    custoPorCamaMes: 6000,
  },
  {
    id: "IAM-003",
    nomeFicticio: "Infartado Ícaro Melo",
    siglaDoenca: "IAM",
    grupo: "emergencia",
    idade: 58,
    sexo: "M",
    etnia: "branco",
    urlImagem: "https://ia.exemplo/infartado-icaro.png",
    comorbidades: ["hipertensao", "dislipidemia"],
    custoPorCamaMes: 12000,
  },
];

export const internacoes: Internacao[] = pacientes.map(p => ({
  internoId: p.id,
  dataAdmissao: "2025-04-19",
  dataPrevisaoAlta: "2025-04-25",
  setor: p.grupo === "emergencia" ? "UTI" : "Clinica Medica",
  cama: `Ala 1 - Cama ${p.id.split("-")[1]}`,
  equipeResponsavel: ["Dr. Marcos Aurélio", "Enf. Paula Souza"],
}));

export const registros: RegistroMedico[] = [
  {
    internoId: "HTA-001",
    dataHora: "2025-04-19T08:00:00",
    tipoRegistro: "evolucao",
    conteudo: { sinaisVitais: { PA: "160/100", FC: 82, SatO2: "96%" }, queixaPrincipal: "Cefaléia há 2 dias" },
    autor: "Dr. Marcos Aurélio",
  },
  {
    internoId: "HTA-001",
    dataHora: "2025-04-19T08:15:00",
    tipoRegistro: "prescricao",
    conteudo: { medicamento: "Losartana 50mg", via: "VO", freq: "1x/dia", duracao: "30 dias" },
    autor: "Dr. Marcos Aurélio",
  },
  // Pode adicionar registros para DM2 e IAM conforme o mesmo padrão
];
