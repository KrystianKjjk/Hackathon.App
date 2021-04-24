import * as express from 'express';
import MessagesController from '../controllers/messagesController';

const messagesRoutes = (messagesController: MessagesController, router: express.Router) => {

    return () => {
        router.get('/messages/:gid', messagesController.fetchMessages);
        router.post('/messages', messagesController.sendMessage);
        return router;
    }
};
export default messagesRoutes;