let clients = [
  {
    id: "1",
    companyName: "Alpha Consultoria Ltda",
    tradeName: "Alpha Consultoria",
    cnpj: "12.345.678/0001-01",
    email: "contato@alphaconsultoria.com",
    phone: "11987654321",
    status: "ACTIVE",
    createdAt: "2026-03-01"
  },
  {
    id: "2",
    companyName: "Beta Soluções Financeiras Ltda",
    tradeName: "Beta Soluções",
    cnpj: "12.345.678/0001-02",
    email: "atendimento@betasolucoes.com",
    phone: "11987654322",
    status: "INACTIVE",
    createdAt: "2026-03-02"
  },
  {
    id: "3",
    companyName: "Gamma Tech Serviços Ltda",
    tradeName: "Gamma Tech",
    cnpj: "12.345.678/0001-03",
    email: "suporte@gammatech.com",
    phone: "11987654323",
    status: "ACTIVE",
    createdAt: "2026-03-03"
  },
  {
    id: "4",
    companyName: "Delta Investimentos Ltda",
    tradeName: "Delta Invest",
    cnpj: "12.345.678/0001-04",
    email: "contato@deltainvest.com",
    phone: "11987654324",
    status: "ACTIVE",
    createdAt: "2026-03-04"
  },
  {
    id: "5",
    companyName: "Orion Tecnologia Empresarial Ltda",
    tradeName: "Orion Tech",
    cnpj: "12.345.678/0001-05",
    email: "contato@oriontech.com",
    phone: "11987654325",
    status: "INACTIVE",
    createdAt: "2026-03-05"
  },
  {
    id: "6",
    companyName: "Safira Crédito Empresarial Ltda",
    tradeName: "Safira Crédito",
    cnpj: "12.345.678/0001-06",
    email: "contato@safiracredito.com",
    phone: "11987654326",
    status: "ACTIVE",
    createdAt: "2026-03-06"
  },
  {
    id: "7",
    companyName: "Prime Gestão Financeira Ltda",
    tradeName: "Prime Gestão",
    cnpj: "12.345.678/0001-07",
    email: "contato@primegestao.com",
    phone: "11987654327",
    status: "ACTIVE",
    createdAt: "2026-03-07"
  },
  {
    id: "8",
    companyName: "Atlas Cobrança e Serviços Ltda",
    tradeName: "Atlas Serviços",
    cnpj: "12.345.678/0001-08",
    email: "contato@atlasservicos.com",
    phone: "11987654328",
    status: "INACTIVE",
    createdAt: "2026-03-08"
  },
  {
    id: "9",
    companyName: "Horizonte Invest Comercial Ltda",
    tradeName: "Horizonte Invest",
    cnpj: "12.345.678/0001-09",
    email: "contato@horizonteinvest.com",
    phone: "11987654329",
    status: "ACTIVE",
    createdAt: "2026-03-09"
  },
  {
    id: "10",
    companyName: "Nova Era Distribuidora Ltda",
    tradeName: "Nova Era",
    cnpj: "12.345.678/0001-10",
    email: "contato@novaera.com",
    phone: "11987654330",
    status: "ACTIVE",
    createdAt: "2026-03-10"
  },
  {
    id: "11",
    companyName: "Vision Partners Consultoria Ltda",
    tradeName: "Vision Partners",
    cnpj: "12.345.678/0001-11",
    email: "contato@visionpartners.com",
    phone: "11987654331",
    status: "INACTIVE",
    createdAt: "2026-03-11"
  },
  {
    id: "12",
    companyName: "Fortebank Intermediações Ltda",
    tradeName: "Fortebank",
    cnpj: "12.345.678/0001-12",
    email: "contato@fortebank.com",
    phone: "11987654332",
    status: "ACTIVE",
    createdAt: "2026-03-12"
  },
  {
    id: "13",
    companyName: "Vale Azul Logística Ltda",
    tradeName: "Vale Azul",
    cnpj: "12.345.678/0001-13",
    email: "contato@valeazul.com",
    phone: "11987654333",
    status: "ACTIVE",
    createdAt: "2026-03-13"
  },
  {
    id: "14",
    companyName: "Nexus Capital Soluções Ltda",
    tradeName: "Nexus Capital",
    cnpj: "12.345.678/0001-14",
    email: "contato@nexuscapital.com",
    phone: "11987654334",
    status: "INACTIVE",
    createdAt: "2026-03-14"
  },
  {
    id: "15",
    companyName: "Elite Serviços Corporativos Ltda",
    tradeName: "Elite Serviços",
    cnpj: "12.345.678/0001-15",
    email: "contato@eliteservicos.com",
    phone: "11987654335",
    status: "ACTIVE",
    createdAt: "2026-03-15"
  },
  {
    id: "16",
    companyName: "Maximus Gestão Empresarial Ltda",
    tradeName: "Maximus Gestão",
    cnpj: "12.345.678/0001-16",
    email: "contato@maximus.com",
    phone: "11987654336",
    status: "ACTIVE",
    createdAt: "2026-03-16"
  },
  {
    id: "17",
    companyName: "Pinnacle Investimentos Ltda",
    tradeName: "Pinnacle Invest",
    cnpj: "12.345.678/0001-17",
    email: "contato@pinnacle.com",
    phone: "11987654337",
    status: "INACTIVE",
    createdAt: "2026-03-17"
  },
  {
    id: "18",
    companyName: "Core Business Solutions Ltda",
    tradeName: "Core Solutions",
    cnpj: "12.345.678/0001-18",
    email: "contato@coresolutions.com",
    phone: "11987654338",
    status: "ACTIVE",
    createdAt: "2026-03-18"
  },
  {
    id: "19",
    companyName: "Summit Consultoria Financeira Ltda",
    tradeName: "Summit Consultoria",
    cnpj: "12.345.678/0001-19",
    email: "contato@summit.com",
    phone: "11987654339",
    status: "ACTIVE",
    createdAt: "2026-03-19"
  },
  {
    id: "20",
    companyName: "Blue Ocean Negócios Ltda",
    tradeName: "Blue Ocean",
    cnpj: "12.345.678/0001-20",
    email: "contato@blueocean.com",
    phone: "11987654340",
    status: "INACTIVE",
    createdAt: "2026-03-20"
  }
];

module.exports = { clients };