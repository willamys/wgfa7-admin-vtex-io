import React, { FC } from 'react';
import { Layout, PageBlock, Table, Tag, PageHeader, IconUser, Progress } from 'vtex.styleguide';
import ALL_CLIENTES from './graphql/gAllLeads.gql'
import { useQuery } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

const AdminExample: FC = () => {

  const { loading, data } = useQuery(ALL_CLIENTES);
  console.log(data);
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
        cellRenderer: ({ cellData }: any) => <Status tipo={cellData} />,
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

  function Status({ tipo }: any) {
    const type = tipo === 'cliente' ? 'success' : 'neutral'
    return <Tag type={type}>{tipo}</Tag>
  }

  // function countType(type: any) {
  //   /*ARRUMAR WILL PFV - Se possível retornar do GRAPHQL
  //   OBEJTIVO DESTA CHAMADA É RETORNAR O TOTAL DE USUARIOS CADASTRADOS POR TIPO lead ou prospect */
  //   const countTypes = data.find(lead => lead.tipo === type);
  //   return countTypes;
  // }
  return <>
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="leadpage.title" />}
        />
      }
    >
      <PageBlock variation="full">
        <div className="container">
          {loading ? (<Progress type="steps" steps={['inProgress']} />) :
            (

              < Table
                fullWidth
                schema={defaultSchema}
                items={data.leads}
                density="high"
                totalizers={[
                  {
                    label: 'Total',
                    value: data.totalLeads,
                  },
                  {
                    label: 'Clientes',
                    value: data.totalClientes,
                    iconBackgroundColor: '#ebebeb',
                    icon: <IconUser color="#79B03A" size={14} />,
                  },
                  {
                    label: 'Prospects',
                    value: data.totalProspectos,
                    iconBackgroundColor: '#eafce3',
                    icon: <IconUser color="#798999" size={14} />,
                  }
                ]}
              />
            )}
        </div>
      </PageBlock>
    </Layout >
  </>
}

export default AdminExample
