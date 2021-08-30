import React, { FC } from 'react';
import { Layout, PageBlock, Table } from 'vtex.styleguide';
import ALL_CLIENTES from './graphql/gAllLeads.gql'
import { useQuery } from 'react-apollo';

const AdminExample: FC = () => {

  const { loading, data } = useQuery(ALL_CLIENTES);

  const defaultSchema = {
    properties: {
      nome: {
        title: 'Nome',
        width: 300,
      },
      email: {
        title: 'Email',
        minWidth: 200,
      },
      telefone: {
        title: 'Telefone',
        minWidth: 100,
      },
      tipo: {
        title: 'Tipo',
        minWidth: 100,
      },
      created_at: {
        title: 'Created At',
        minWidth: 100,
      },
      updated_at: {
        title: 'Updated At',
        minWidth: 100,
      }
    },
  }

  return <>
    <Layout >
      <PageBlock title=""
        variation="full">
        <h1>Admin Landing</h1>
        <div className="container">
          <div className="container">
            <h3>Todos os Clientes</h3>
            {loading ? (<p>Loading ...</p>) :
              (
                < Table
                  fullWidth
                  schema={defaultSchema}
                  items={data.leads}
                  density="high"
                />
              )}
          </div>
        </div>

      </PageBlock>
    </Layout >
  </>
}

export default AdminExample