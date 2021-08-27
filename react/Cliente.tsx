class Cliente {
  public nome: string;
  public email: string;
  public telefone: string;
  public tipo: string;

  constructor(nome: string, email: string, telefone: string, tipo: string) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
  }
}