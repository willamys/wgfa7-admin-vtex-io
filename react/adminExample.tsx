import React, { FC, useState, useEffect } from 'react';
import { Layout, PageBlock, Table } from 'vtex.styleguide';
import ClientService from './ClientService';

const AdminExample: FC = () => {
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  const fetchData = async () => {
    const { data } = await ClientService.getAllCliente();
    console.log(data);
    setClientes(data.Items);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const defaultSchema = {
    properties: {
      nome: {
        title: 'Name',
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
    },
  }

  return <Layout>
    <PageBlock title=""
      variation="full">
      <h1>Admin Landing</h1>
      <div className="container">
        <div className="container">
          <h3>Todos os Clientes</h3>
          <Table
            fullWidth
            schema={defaultSchema}
            items={clientes}
            density="high"
          />
        </div>
      </div>
    </PageBlock>
  </Layout >
}

export default AdminExample