import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Layout, QueryResult, ModuleDetail } from '../components';

/** GET_TRACK gql query to retrieve a specific track by its ID */
const GET_MODULE_PAGE = gql`
  query getModulePage ($moduleId: ID!, $trackId: ID!) {
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
  }
`;

/**
 * Module Page fetches a module's data from the gql query GET_MODULE_PAGE
 * Additionally it still shows the module list for the overarching Track.
 */
const Module = () => {
  const { trackId = "", moduleId = "" } = useParams();
  const { loading, error, data } = useQuery(GET_MODULE_PAGE, {
    variables: { trackId, moduleId },
  });

  console.log('data -->', data)

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;