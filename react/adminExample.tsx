import React, { FC, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, Table, PageHeader, IconUser, Tag } from 'vtex.styleguide';
import ClientService from './ClientService';

const AdminExample: FC = () => {
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  const fetchData = async () => {
    const { data } = await ClientService.getAllCliente();
    setClientes(data.Items);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const defaultSchema = {
    properties: {
      nome: {
        title: 'Name'
      },
      email: {
        title: 'Email'
      },
      telefone: {
        title: 'Telefone'
      },
      tipo: {
        id: 'tipo',
        title: 'Status',
        cellRenderer: ({ cellData }: any) => <Status tipo={cellData} />,
      },
    },
  }

  function Status({ tipo }: any) {
    const type = tipo === 'prospecto' ? 'success' : 'neutral'
    return <Tag type={type}>{tipo}</Tag>
  }

  function countType(type: any) {
    const countTypes = clientes.filter(item => item.tipo === type);
    return countTypes.length;
  }

  return <Layout
    pageHeader={
      <PageHeader
        title={<FormattedMessage id="leadpage.title" />}
      />
    }
  >
    <PageBlock variation="full">
      <div className="container">
        <Table
          fullWidth
          schema={defaultSchema}
          items={clientes}
          density="high"
          totalizers={[
            {
              label: 'Total',
              value: clientes.length,
            },
            {
              label: 'Leads',
              value: countType('cliente'),
              iconBackgroundColor: '#ebebeb',
              icon: <IconUser color="#79899" size={14} />,
            },
            {
              label: 'Prospects',
              value: countType('prospecto'),
              iconBackgroundColor: '#eafce3',
              icon: <IconUser color="#79B03A" size={14} />,
            },
          ]}
        />
      </div>
    </PageBlock>
  </Layout >
}

export default AdminExample