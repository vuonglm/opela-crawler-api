import QueueService from '../common/services/queue/QueueService';

let priorityQueue;
const initQueueServer = (callback) => {
	priorityQueue = new QueueService();
	priorityQueue.start(callback);
};

export { initQueueServer };

export default priorityQueue;
