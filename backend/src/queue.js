/**
 * A fila executa em um processo separado do nosso servidor
 */

import 'dotenv/config';
import Queue from './lib/Queue';

Queue.processQueue();
