import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
//import { find, findIndex, propEq } from 'ramda'
import type { Lead, /*Lead,  Maybe*/ } from '../../typings/custom'
import mock from './mock'
export class LeadClient extends ExternalClient {

  private results = mock;

  private routes = {
    getAllLeads: () => `/clientes`,
    getlead: (email: string) => `/clientes/${email}`,
    updatelead: (email: string) => `/clientes/${email}`,
  }
  //SE HOUVER AUTENTICAÇÃO ADICIONAR NO HEADERS 'Authorization' 
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('https://2rfmtwqnye.execute-api.us-east-1.amazonaws.com', ctx, {
      ...options,
      retries: 3,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  public createLead({ ...leadData }) {
    return this.http.post(
      this.routes.getAllLeads(),
      leadData,
      {
        metric: 'lead-create',
      }
    )
  }
  public updateLead(email: string, { ...leadData }) {
    return this.http.put(
      this.routes.updatelead(email),
      leadData,
      {
        metric: 'lead-atualizado',
      }
    )
  }
  public async getLead(email: string): Promise<Lead> {
    const response = await this.get(
      this.routes.getlead(email),
      {
        metric: 'lead-get',
      }
    )
    return response
  }

  public leadsMock = ({ from, to }: { from: number; to: number }) =>
    this.results.slice(Math.max(from, 0), Math.min(to, this.results.length))



  public async getAllLeads() {
    return await this.get(this.routes.getAllLeads(),
      {
        metric: 'leads-get',
      }
    )
  }

  private get(url: string, config?: RequestConfig) {
    return this.http.get(url, {
      ...config,
      headers: {
        Accept: 'application/json',
        //'Authorization': this.token,
        'Content-Type': 'application/json',
      },
    })
  }

  public totalLeads = () => this.results.length
}
