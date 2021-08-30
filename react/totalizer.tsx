import React, { FC } from 'react';
import { Progress } from 'vtex.styleguide';
import ALL_CLIENTES from './graphql/gTotalLeads.gql'
import { useQuery } from 'react-apollo';
const Totalizer: FC = () => {

  const { loading, data } = useQuery(ALL_CLIENTES);


  // function countType(type: any) {
  //   /*ARRUMAR WILL PFV - Se possível retornar do GRAPHQL
  //   OBEJTIVO DESTA CHAMADA É RETORNAR O TOTAL DE USUARIOS CADASTRADOS POR TIPO lead ou prospect */
  //   const countTypes = data.find(lead => lead.tipo === type);
  //   return countTypes;
  // }
  return <>
    {loading ? (<Progress type="steps" steps={['inProgress']} />) :
      (
        `{[
          {
            label: 'Total',
            value: ${data.leads.length},
          }
        ]}`
      )}
  </>
}

export default Totalizer
