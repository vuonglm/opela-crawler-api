import fs from 'fs';
import async from 'async';
import Queue from 'bull';
import { EventEmitter } from 'events';
import { redisConfig } from '../../configs/redis';

const QUEUE_EVENTS = ['error', 'waiting', 'active', 'stalled', 'progress', 'completed', 'failed', 'paused', 'resumed', 'cleaned', 'drained', 'removed'];
const QUEUE_PRIORITIES = ['critical', 'high', 'medium', 'normal', 'low'];

const _initializeEvents = Symbol('initializeEvents');
const _registerJobs = Symbol('registerJobs');
const _getQueueName = Symbol('getQueueName');

export default class PriorityQueue extends EventEmitter {
    constructor() {
        super();
        const self = this;
        self.keyPrefix = 'crawler';
        self.queues = [];
        self.jobs = {};
        self.started = false;
		// self.createClient = createRedisClient;
        const queueOpts = {
            redis: redisConfig,
            prefix: self.keyPrefix
        };
        for (let i = 0, length = QUEUE_PRIORITIES.length; i < length; i++) {
            const queueName = self[_getQueueName](QUEUE_PRIORITIES[i]);
            const queue = new Queue(queueName, queueOpts);
            self.queues.push(queue);
        }
        self[_initializeEvents]();
    }
    // private methods
    [_getQueueName](priority) {
        const self = this;
        return `${self.keyPrefix}:prio:${priority}`;
    }

    [_initializeEvents]() {
        const self = this;
        for (let i = 0, length = self.queues.length; i < length; i++) {
            const queue = self.queues[i];
            for (let i = 0, length = QUEUE_EVENTS.length; i < length; i++) {
                queue.on(QUEUE_EVENTS[i], self.emit.bind(self, QUEUE_EVENTS[i]));
            }
        }
    }

    // public methods
    getQueue(priority) {
        const self = this;
        if (!priority || !_.isString(priority) || !QUEUE_PRIORITIES.includes(priority.toLowerCase())) {
            priority = DEFAULT_QUEUE_PRIORITY;
        }
        return self.queues[QUEUE_PRIORITIES.indexOf(priority.toLowerCase())];
    }

    [_registerJobs]() {
        const self = this;
        const jobNames = Object.keys(self.jobs);
        if (jobNames.length > 0) {
            return;
        }
        self.on('error', (error) => {
            console.error(`Queue got error of type %s`, error);
        });
        self.on('active', (job) => {
            console.log(`BULL QUEUE: Job %s active of type %s, %s`, job.id, job.data && job.data._type, job.data && job.data.title);
        });
        self.on('stalled', (job) => {
            // Job that was considered stalled. Useful for debugging job workers that crash or pause the event loop.
            console.log(`BULL QUEUE: Job %s stalled of type %s, %s`, job.id, job.data && job.data._type, job.data && job.data.title);
        });
        self.on('progress', (job, progress) => {
            // Job progress updated!
            console.log(`BULL QUEUE: Job %s progress of type %s with progess %s`, job.id, job.data && job.data._type, progress);
        });
        self.on('completed', (job) => {
            console.log(`BULL QUEUE: Job %s completed of type %s, %s`, job.id, job.data && job.data._type, job.data && job.data.title);
        });
        self.on('failed', (job, err) => {
            console.log(`BULL QUEUE: Job %s failed of type %s with error %s`, job.id, job.data && job.data._type, err);
        });
    }

    startArena() {
        const self = this;
        const queues = [];
        for (let i = 0, length = QUEUE_PRIORITIES.length; i < length; i++) {
            queues.push({
                name: self[_getQueueName](QUEUE_PRIORITIES[i]),
                hostId: `${self.keyPrefix}`,
                redis: redisConfig,
                prefix: self.keyPrefix
            });
        }
        const Arena = require('bull-arena');
        Arena({
            queues
        }, {
            port: 3006
        });
    }

    start(cb) {
        const self = this;
        if (self.started) {
            return cb();
        }
        self.started = true;
        self[_registerJobs]();
        const jobNames = Object.keys(self.jobs);
        const initQueue = (queue, _cb) => {
            queue.isReady().then(function() {
                for (let i = 0, length = jobNames.length; i < length; i++) {
                    queue.process(jobNames[i], (job, done) => {
                        self.jobs[jobNames[i]](job, done);
                    });
                }
                _cb();
            });
        };
        const methods = {};
        for (let i = 0, length = self.queues.length; i < length; i++) {
            methods[`queue_${i}`] = function(_cb) {
                initQueue(self.queues[i], _cb);
            };
        }
        async.parallel(methods, (err) => {
            if (err) {
                return cb(err);
            }
			for(let i = 0, length = self.queues.length; i < length; i++) {
	            const queue = self.queues[i];
	            console.log(`BULL STATUS:`, queue.name, queue.client.status);
	        }
            self.startArena();
            cb();
        });
    }

    add(data, options) {
        if (!_.isObject(data) || !data._type) {
            return Promise.reject(new Error('Invalid job data'));
        }
        const self = this;
        const jobName = data._type;
        options = options || {};
        const queue = self.getQueue(options.priority);
        delete options.priority;
        return queue.add(jobName, data, options).then(function(job) {
            return job;
        });
    }

    repeat(data, options) {
        if (!_.isObject(data) || !data._type) {
            return Promise.reject(new Error('Invalid job data'));
        }
        const self = this;
        const jobName = data._type;
        options = options || {};
        const queue = self.getQueue(options.priority);
        delete options.priority;
        options.repeat = {
            every: options.delay
        };
        return queue.add(jobName, data, options).then(function(job) {
            return job;
        });
    }

    empty() {
        const self = this;
        return Promise.map(self.queues, function(queue) {
            return queue.empty();
        });
    }

    clean(grace, type, limit) {
        const self = this;
        return Promise.map(self.queues, function(queue) {
            return queue.clean(grace, type, limit);
        }).then(function (results) {
            const jobs = [].concat.apply([], results);
            const tp = type || 'completed';
            self.emit('cleaned', jobs, tp);
            return Promise.resolve(jobs);
        });
    }

    fixJob(job) {
        return migrateJob(job);
    }
}
