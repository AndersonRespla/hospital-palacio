export interface PacienteVirtual {
  id: string;                  // ex: "HTA-001"
  nomeFicticio: string;        // ex: "Hipertenso Tomás Alves"
  siglaDoenca: string;         // ex: "HTA"
  grupo: "cronico" | "agudo" | "emergencia";
  idade: number;
  sexo: "M" | "F";
  etnia: string;
  urlImagem: string;
  comorbidades: string[];
  custoPorCamaMes: number;
}

export interface Internacao {
  internoId: string;           // FK → PacienteVirtual.id
  dataAdmissao: string;        // formato YYYY-MM-DD
  dataPrevisaoAlta: string;    // formato YYYY-MM-DD
  setor: string;               // ex: "Clinica Medica", "UTI"
  cama: string;                // ex: "A3-C07"
  equipeResponsavel: string[];
}

export interface RegistroMedico {
  internoId: string;           // FK → PacienteVirtual.id
  dataHora: string;            // ISO datetime
  tipoRegistro: "evolucao" | "prescricao" | "exame" | "notaEnfermagem";
  conteudo: Record<string, any>;
  autor: string;
}
