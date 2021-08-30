interface LeadInput {
  email: string
}
// interface Lead {
//   clienteId: String
//   nome: String
//   email: String
//   telefone: String
//   tipo: String
//   created_at: String
//   updated_at: String
// }

export const lead = async (
  _: any,
  args: LeadInput,
  ctx: Context
) => {
  const data = await ctx.clients.lead.getLead(args.email);
  return data
}

export const leads = (
  _: any,
  __: any,
  { clients: { lead: LeadClient } }: Context
) => LeadClient.getAllLeads()


export const totalLeads = (
  _: any,
  __: any,
  { clients: { lead: LeadClient } }: Context
) => LeadClient.getAllLeads().then(res => res.length)

export const totalClientes = (
  _: any,
  __: any,
  { clients: { lead: LeadClient } }: Context
) => LeadClient.getAllLeads().then(res => res.filter((x: { tipo: string; }) => x.tipo === 'cliente').length)

export const totalProspectos = (
  _: any,
  __: any,
  { clients: { lead: LeadClient } }: Context
) => LeadClient.getAllLeads().then(res => res.filter((x: { tipo: string; }) => x.tipo === 'prospecto').length)

interface Args {
  from: number
  to: number
}

export const leadsMock = (
  _: any,
  args: Args,
  ctx: Context
) => ctx.clients.lead.leadsMock(args)
