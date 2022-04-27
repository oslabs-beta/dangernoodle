import React from 'react';
import axios from 'axios';
import { useQueries } from 'react-query';
import { Queries } from '../../types';
import { Col } from '@themesberg/react-bootstrap';
import PartitionData from '../chart_components/PartitionData';
import InOutData from '../chart_components/InOutData';
import ProducerData from '../chart_components/ProducerData';
import TopicData from '../chart_components/TopicData';
import ZookeeperData from '../chart_components/ZookeeperData';
import ConsumerData from '../chart_components/ConsumerData';
import CounterWidget from './Widgets';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const GeneralMetric = () => {
  const endpoints: string[] = [
    '/partition/total-count',
    '/partition/offline-count',
    '/producer/total-request-count',
    '/producer/total-failed-count',
    '/topic/total-count',
    '/topic/metrics',
    '/consumer/consumer-lag',
    //'/consumer/consumer-total-time',
    '/zookeeper/avg-latency',
    // add endpoint here and destructure result from the invocation of "useQueries" function below
  ];

  const queries: Queries[] = endpoints.map((endpoint) => ({
    queryKey: endpoint,
    queryFn: () => axiosClient.get(endpoint).then((res) => res.data),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  }));

  const [
    partitionTotalCount,
    partitionOfflineCount,
    producerTotalReqCount,
    producerTotalFailCount,
    topicTotalCount,
    topicMetrics,
    consumerLag,
    //consumerTotalTime,
    avgLatency,
    // destructure result here
  ] = useQueries(queries);

  return (
    <>
      {/* {topicMetrics.isLoading ? <>Loading</> : <InOutData topicMetrics={topicMetrics.data} />} */}
      <PartitionData
        partitionTotalCount={partitionTotalCount}
        partitionOfflineCount={partitionOfflineCount}
      />
      <ProducerData
        producerTotalReqCount={producerTotalReqCount}
        producerTotalFailCount={producerTotalFailCount}
      />
      <TopicData topicTotalCount={topicTotalCount} />
      <InOutData topicMetrics={topicMetrics} />
      <ConsumerData consumerLag={consumerLag} />
      <ZookeeperData avgLatency={avgLatency} />
      <Col xs={12} sm={6} xl={4} className='mb-4'>
        <CounterWidget category='Revenue' title='Test Widget' value='999' percentage={28.4} />
      </Col>
    </>
  );
};

export default GeneralMetric;
