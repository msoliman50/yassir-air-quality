import Application from './app';

const application = new Application();
application.bootstrap().then(() => application.startCronJobs());
