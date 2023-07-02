  export type Address ={
    nomeEvento: string,
    webSite: string,
    data: Date,
    numeroMaxCandidato: 0,
    endereco: {
      map(arg0: (endereco: any) => any): unknown
      logradouro: string,
      bairro: string,
      cidade: string,
      complemento: string,
      numero: string,
      uf: string,
      cep: string
    },
    imageUrl: string
  }