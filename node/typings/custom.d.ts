export interface Lead {
  clienteId: String
  nome: String
  email: String
  telefone: String
  tipo: String
  created_at: String
  updated_at: String
}

export interface LeadInput {
  email: string
}

export type Maybe<T> = T | void
