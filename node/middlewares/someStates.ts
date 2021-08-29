export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const { clients: { lead } } = ctx

  const email = "willamys@gmail.com"
  // GET dados API AWS
  const clienteInfos = await lead.getLead(email)
  console.log(clienteInfos);
  // PUT  dados API AWS
  // if (clienteInfos.lenght && validateOrder.lenght) {
  //   const clienteDados = { "TableName": "clientes", "Item": { "clienteId": "1", "email": email, "nome": nome, "telefone": telefone } };
  //   const clienteAtualizado = await lead.updateLead(email, clienteDados)
  //   console.log(clienteAtualizado);
  // }

  await next()
}
