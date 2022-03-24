import express from 'express';
import partitionController from '../controllers/partitionController';
import promPortController from '../controllers/promPortController';
const router = express.Router();

router.get('/total-count', promPortController.getSavedPortFromElectronStore, partitionController.totalPartitionCount, (req: any, res: any) => {
  return res.status(200).json(res.locals.totalPartitionCount);
});

router.get('/offline-count', promPortController.getSavedPortFromElectronStore, partitionController.offlinePartitionCount, (req: any, res: any) => {
  return res.status(200).json(res.locals.offlinePartitionCount);
});

router.get('/under-replicated', promPortController.getSavedPortFromElectronStore, partitionController.underReplicated, (req: any, res: any) => {
  return res.status(200).json(res.locals.underReplicated);
});

export default router;